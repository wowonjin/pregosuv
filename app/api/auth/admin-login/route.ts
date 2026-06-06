import { NextResponse } from "next/server";
import { ADMIN_EMAIL, ADMIN_PASSWORD, adminAuth, adminDb } from "@/lib/firebase/admin";

export const runtime = "nodejs";

type Payload = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (email !== ADMIN_EMAIL.toLowerCase() || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const auth = adminAuth();
  const db = adminDb();
  let user;
  try {
    user = await auth.getUserByEmail(ADMIN_EMAIL);
  } catch {
    user = await auth.createUser({
      email: ADMIN_EMAIL,
      emailVerified: true,
      displayName: "관리자",
      disabled: false,
    });
  }

  await auth.setCustomUserClaims(user.uid, { admin: true });
  await db.collection("users").doc(user.uid).set(
    {
      uid: user.uid,
      email: ADMIN_EMAIL,
      name: "관리자",
      role: "admin",
      status: "active",
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  const token = await auth.createCustomToken(user.uid, { admin: true });
  return NextResponse.json({ ok: true, token });
}
