import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import type { UserRecord } from "@/lib/firebase/schema";
import { isValidKrMobilePhone, normalizeKrMobilePhone } from "@/lib/phone";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  phone?: string;
};

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, Math.min(3, local.length));
  const hidden = "*".repeat(Math.max(2, local.length - visible.length));
  return `${visible}${hidden}@${domain}`;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = normalizeKrMobilePhone(body.phone ?? "");

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (!isValidKrMobilePhone(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const snapshot = await adminDb()
    .collection("users")
    .where("phone", "==", phone)
    .limit(5)
    .get();

  const user = snapshot.docs
    .map((doc) => doc.data() as UserRecord)
    .find((record) => record.name.trim() === name);

  if (!user?.email) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    maskedEmail: maskEmail(user.email),
  });
}
