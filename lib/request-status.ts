import type { ConsultRequestRecord } from "@/lib/firebase/schema";

/** 운영 화면에 표시하는 정규화된 문의 상태 */
export type ResolvedRequestStatus =
  | "SUBMITTED"
  | "ANSWERED"
  | "ANSWER_PUBLISHED"
  | "FOLLOWUP"
  | "COMPLETED";

export const REQUEST_STATUS_LABELS: Record<ResolvedRequestStatus, string> = {
  SUBMITTED: "답변 대기",
  ANSWERED: "답변 완료",
  ANSWER_PUBLISHED: "답변 열람",
  FOLLOWUP: "추가 문의",
  COMPLETED: "상담 종료",
};

export const REQUEST_STATUS_TONE: Record<
  ResolvedRequestStatus,
  "amber" | "blue" | "green" | "violet" | "slate"
> = {
  SUBMITTED: "amber",
  ANSWERED: "blue",
  ANSWER_PUBLISHED: "green",
  FOLLOWUP: "violet",
  COMPLETED: "slate",
};

/** 관리자 문의 목록 — 숫자가 작을수록 상단 (답변 대기 우선) */
export const REQUEST_STATUS_SORT_PRIORITY: Record<ResolvedRequestStatus, number> = {
  SUBMITTED: 0,
  FOLLOWUP: 1,
  ANSWERED: 2,
  ANSWER_PUBLISHED: 3,
  COMPLETED: 4,
};

function parseInquirySortTime(value?: string) {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
}

/**
 * 관리자 문의 목록 정렬
 * 1) 상태 우선순위 (답변 대기 → 추가 문의 → …)
 * 2) 동일 상태 내 접수일 오름차순 (오래된 문의 먼저)
 */
export function compareAdminInquiryRows(
  left: {
    createdAt?: string;
    requestNumber?: string;
    status: ResolvedRequestStatus;
  },
  right: {
    createdAt?: string;
    requestNumber?: string;
    status: ResolvedRequestStatus;
  },
) {
  const byStatus =
    getRequestStatusPriority(left.status) -
    getRequestStatusPriority(right.status);
  if (byStatus !== 0) return byStatus;

  const byCreatedAt =
    parseInquirySortTime(left.createdAt) - parseInquirySortTime(right.createdAt);
  if (byCreatedAt !== 0) return byCreatedAt;

  return (left.requestNumber ?? "").localeCompare(
    right.requestNumber ?? "",
    "ko",
  );
}

/** 관리자 문의 목록 상태 필터 */
export const REQUEST_STATUS_FILTER_OPTIONS: {
  value: ResolvedRequestStatus | "";
  label: string;
}[] = [
  { value: "", label: "전체 상태" },
  { value: "SUBMITTED", label: REQUEST_STATUS_LABELS.SUBMITTED },
  { value: "ANSWERED", label: REQUEST_STATUS_LABELS.ANSWERED },
  { value: "ANSWER_PUBLISHED", label: REQUEST_STATUS_LABELS.ANSWER_PUBLISHED },
  { value: "FOLLOWUP", label: REQUEST_STATUS_LABELS.FOLLOWUP },
  { value: "COMPLETED", label: REQUEST_STATUS_LABELS.COMPLETED },
];

type ResolveContext = {
  hasAnswer?: boolean;
  hasAnswerView?: boolean;
};

export function resolveRequestStatus(
  request: Pick<ConsultRequestRecord, "status" | "isFollowUp" | "parentRequestId">,
  context: ResolveContext = {},
): ResolvedRequestStatus {
  const raw = String(request.status ?? "").toUpperCase();

  if (raw === "COMPLETED") return "COMPLETED";
  if (raw === "FOLLOWUP") return "FOLLOWUP";
  if (context.hasAnswerView || raw === "ANSWER_PUBLISHED") return "ANSWER_PUBLISHED";
  if (
    context.hasAnswer ||
    raw === "ANSWERED" ||
    raw === "ANSWER_READY"
  ) {
    return "ANSWERED";
  }
  return "SUBMITTED";
}

export function getRequestStatusLabel(status: ResolvedRequestStatus | string) {
  const key = status as ResolvedRequestStatus;
  return REQUEST_STATUS_LABELS[key] ?? status;
}

export function getRequestStatusTone(status: ResolvedRequestStatus | string) {
  const key = status as ResolvedRequestStatus;
  return REQUEST_STATUS_TONE[key] ?? "slate";
}

export function getRequestStatusPriority(status: ResolvedRequestStatus | string) {
  const key = status as ResolvedRequestStatus;
  return REQUEST_STATUS_SORT_PRIORITY[key] ?? 99;
}

export function matchesRequestStatusFilter(
  resolved: ResolvedRequestStatus,
  filter: string,
) {
  if (!filter) return true;
  const normalized = filter.toUpperCase();
  if (normalized === "ANSWER_READY" || normalized === "ANSWERED") {
    return resolved === "ANSWERED";
  }
  if (
    normalized === "SUBMITTED" ||
    normalized === "SCREENING" ||
    normalized === "ASSIGNED"
  ) {
    return resolved === "SUBMITTED";
  }
  return resolved === normalized;
}

/** 공개 문의 게시판 등 고객용 짧은 라벨 */
export function getPublicInquiryStatusLabel(
  request: Pick<ConsultRequestRecord, "status">,
  hasAnswer: boolean,
) {
  const resolved = resolveRequestStatus(request, { hasAnswer });
  if (resolved === "ANSWER_PUBLISHED" || resolved === "ANSWERED") {
    return "답변 완료";
  }
  if (resolved === "COMPLETED") return "완료";
  if (resolved === "FOLLOWUP") return "추가 문의";
  return "접수 완료";
}
