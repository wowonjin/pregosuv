import { NextResponse } from "next/server";
import type { DecodedIdToken } from "firebase-admin/auth";
import { withoutUndefined } from "@/lib/firebase/clean";
import { resolveBusinessCardUrl } from "@/lib/business-card-url";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { writeAuditLog } from "@/lib/firebase/server";
import type { UserRecord } from "@/lib/firebase/schema";
import { isValidKrMobilePhone, normalizeKrMobilePhone } from "@/lib/phone";
import { nonghyupMaster } from "@/lib/platform";

export const runtime = "nodejs";

type Payload = {
  idToken?: string;
  name?: string;
  phone?: string;
  phoneVerificationIdToken?: string;
  email?: string;
  cooperativeId?: string;
  nh_org_id?: string;
  manualCooperativeName?: string;
  position?: string;
  duty?: string;
  businessCardUrl?: string;
  businessCardPath?: string;
  consents?: UserRecord["consents"];
};

type SignupResult = {
  grantedPoints: number;
  walletBalance: number;
  retried: boolean;
  status: UserRecord["status"];
};

class SignupRequestError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number
  ) {
    super(code);
  }
}

function getVerifiedPhone(decoded: { phone_number?: unknown }) {
  return typeof decoded.phone_number === "string"
    ? normalizeKrMobilePhone(decoded.phone_number)
    : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const phone = normalizeKrMobilePhone(body.phone ?? "");

  if (
    !body.idToken ||
    !body.name?.trim() ||
    !phone ||
    !body.phoneVerificationIdToken ||
    !body.email?.trim() ||
    !(body.cooperativeId ?? body.nh_org_id)?.trim() ||
    !body.position?.trim() ||
    !body.duty?.trim() ||
    !body.consents?.terms ||
    !body.consents?.privacy
  ) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (!isValidKrMobilePhone(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  let decoded: DecodedIdToken;
  try {
    decoded = await adminAuth().verifyIdToken(body.idToken);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
  }

  let phoneDecoded: DecodedIdToken;
  try {
    phoneDecoded = await adminAuth().verifyIdToken(body.phoneVerificationIdToken);
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_phone_verification" },
      { status: 401 }
    );
  }

  const verifiedPhone = getVerifiedPhone(phoneDecoded);
  if (verifiedPhone !== phone || !isValidKrMobilePhone(verifiedPhone)) {
    return NextResponse.json(
      { ok: false, error: "invalid_phone_verification" },
      { status: 400 }
    );
  }

  const phoneAuthTime = phoneDecoded.auth_time;
  const tenMinutesInSeconds = 10 * 60;
  if (
    typeof phoneAuthTime !== "number" ||
    Math.floor(Date.now() / 1000) - phoneAuthTime > tenMinutesInSeconds
  ) {
    return NextResponse.json(
      { ok: false, error: "phone_verification_expired" },
      { status: 400 }
    );
  }

  if (decoded.email?.toLowerCase() !== body.email.trim().toLowerCase()) {
    return NextResponse.json({ ok: false, error: "email_mismatch" }, { status: 400 });
  }

  const db = adminDb();
  const now = new Date().toISOString();
  const uid = decoded.uid;
  const email = body.email.trim();
  const requestedCooperativeId = (body.cooperativeId ?? body.nh_org_id)?.trim() ?? "";
  const selectedCooperative = nonghyupMaster.find(
    (item) => item.cooperative_id === requestedCooperativeId
  );

  if (!selectedCooperative) {
    return NextResponse.json(
      { ok: false, error: "invalid_cooperative_id" },
      { status: 400 }
    );
  }

  let businessCardUrl = body.businessCardUrl?.trim();
  const businessCardPath = body.businessCardPath?.trim();
  if (businessCardPath) {
    try {
      businessCardUrl = await resolveBusinessCardUrl({
        businessCardPath,
        businessCardUrl,
      });
    } catch {
      // keep client-provided URL if server resolution fails
    }
  }

  const baseUserRecord = {
    uid,
    name: body.name.trim(),
    phone,
    email,
    position: body.position.trim(),
    duty: body.duty.trim(),
    businessCardUrl,
    businessCardPath,
    consents: body.consents,
    role: "member",
    createdAt: now,
    updatedAt: now,
  } satisfies Omit<
    UserRecord,
    | "cooperativeId"
    | "cooperativeName"
    | "manualCooperativeName"
    | "status"
  >;

  const orgKey = selectedCooperative.cooperative_id;
  const userRef = db.collection("users").doc(uid);

  let result: SignupResult;
  try {
    result = await db.runTransaction(async (transaction) => {
      const userSnapshot = await transaction.get(userRef);
      const existingUser = userSnapshot.exists
        ? (userSnapshot.data() as UserRecord)
        : null;
      if (existingUser?.cooperativeId === orgKey) {
        writeAuditLog(transaction, db, {
          actorUid: uid,
          actorEmail: email,
          action: "signup.retried",
          targetType: "user",
          targetId: uid,
          metadata: { cooperativeId: orgKey },
          createdAt: now,
        });
        return {
          grantedPoints: 0,
          walletBalance: 0,
          retried: true,
          status: existingUser.status,
        };
      }

      const phoneSnapshot = await transaction.get(
        db.collection("users").where("phone", "==", phone).limit(3)
      );
      const accountCountForPhone = phoneSnapshot.docs.filter((doc) => doc.id !== uid).length;
      if (accountCountForPhone >= 2) {
        throw new SignupRequestError("phone_account_limit_exceeded", 409);
      }

      transaction.set(userRef, withoutUndefined({
        ...baseUserRecord,
        cooperativeId: orgKey,
        nh_org_id: orgKey,
        cooperativeName: selectedCooperative.cooperative_name,
        status: "pending_cooperative_review",
      } satisfies UserRecord));

      writeAuditLog(transaction, db, {
        actorUid: uid,
        actorEmail: email,
        action: "signup.submitted",
        targetType: "user",
        targetId: uid,
        metadata: {
          cooperativeId: orgKey,
          status: "pending_cooperative_review",
        },
        createdAt: now,
      });

      return {
        grantedPoints: 0,
        walletBalance: 0,
        retried: false,
        status: "pending_cooperative_review" as const,
      };
    });
  } catch (error) {
    if (error instanceof SignupRequestError) {
      return NextResponse.json(
        { ok: false, error: error.code },
        { status: error.status }
      );
    }
    throw error;
  }

  return NextResponse.json({
    ok: true,
    completion: {
      cooperativeName: selectedCooperative.cooperative_name,
      status: result.status === "active" ? "active" : "pending",
      walletBalance: result.walletBalance,
      grantedPoints: result.grantedPoints,
    },
  });
}
