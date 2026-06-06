import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { authErrorCode, authErrorStatus, requireAdmin } from "@/lib/firebase/server";
import type {
  AnswerRecord,
  AnswerRatingRecord,
  AnswerViewRecord,
  AuditLogRecord,
  ConsultRequestRecord,
  OrganizationRecord,
  PointLedgerRecord,
  PointTransactionRecord,
  UserRecord,
} from "@/lib/firebase/schema";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: authErrorCode(err) },
      { status: authErrorStatus(err) }
    );
  }

  const db = adminDb();
  const [
    userSnapshot,
    requestSnapshot,
    answerSnapshot,
    ratingSnapshot,
    answerViewSnapshot,
    organizationSnapshot,
    ledgerSnapshot,
    pointTransactionSnapshot,
    auditSnapshot,
  ] = await Promise.all([
    db.collection("users").orderBy("createdAt", "desc").get(),
    db.collection("consultRequests").orderBy("createdAt", "desc").get(),
    db.collection("answers").orderBy("createdAt", "desc").get(),
    db.collection("answerRatings").orderBy("updatedAt", "desc").get(),
    db.collection("answerViews").orderBy("createdAt", "desc").get(),
    db.collection("organizations").orderBy("updatedAt", "desc").get(),
    db.collection("pointLedger").orderBy("createdAt", "desc").get(),
    db.collection("point_transactions").orderBy("createdAt", "desc").get(),
    db.collection("auditLogs").orderBy("createdAt", "desc").get(),
  ]);

  const users = userSnapshot.docs
    .map((doc) => doc.data() as UserRecord)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const requests = requestSnapshot.docs.map(
    (doc) => doc.data() as ConsultRequestRecord
  ).sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const answers = answerSnapshot.docs
    .map((doc) => doc.data() as AnswerRecord)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const ratings = ratingSnapshot.docs
    .map((doc) => doc.data() as AnswerRatingRecord)
    .sort((a, b) => (b.updatedAt ?? b.createdAt ?? "").localeCompare(a.updatedAt ?? a.createdAt ?? ""));
  const organizations = organizationSnapshot.docs.map(
    (doc) => doc.data() as OrganizationRecord
  ).sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
  const ledger = ledgerSnapshot.docs
    .map((doc) => doc.data() as PointLedgerRecord)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const pointTransactions = pointTransactionSnapshot.docs
    .map((doc) => doc.data() as PointTransactionRecord)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const auditLogs = auditSnapshot.docs
    .map((doc) => doc.data() as AuditLogRecord)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const answerViews = answerViewSnapshot.docs
    .map((doc) => doc.data() as AnswerViewRecord)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));

  return NextResponse.json({
    ok: true,
    users,
    requests,
    answers,
    answerViews,
    ratings,
    organizations,
    ledger,
    pointTransactions,
    auditLogs,
  });
}
