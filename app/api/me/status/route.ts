import { NextResponse } from "next/server";
import { getUserRecord, verifyBearerToken } from "@/lib/firebase/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  let decoded;
  try {
    decoded = await verifyBearerToken(req);
  } catch {
    return NextResponse.json(
      { ok: false, error: "missing_or_invalid_token" },
      { status: 401 }
    );
  }

  const user = await getUserRecord(decoded.uid);
  if (!user) {
    return NextResponse.json({ ok: false, error: "profile_not_found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    status: user.status,
    cooperativeName: user.cooperativeName ?? user.manualCooperativeName ?? null,
  });
}
