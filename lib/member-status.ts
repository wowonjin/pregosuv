export type MemberStatus = "active" | "pending_cooperative_review" | "rejected";

export const MEMBER_STATUS_LABELS: Record<MemberStatus, string> = {
  active: "활성",
  pending_cooperative_review: "가입 승인 대기",
  rejected: "비활성",
};

/** Members 목록 등 좁은 영역용 짧은 라벨 */
export const MEMBER_STATUS_SHORT_LABELS: Record<MemberStatus, string> = {
  active: "활성",
  pending_cooperative_review: "승인 대기",
  rejected: "비활성",
};

export type MemberStatusTone = "green" | "amber" | "slate";

export const MEMBER_STATUS_TONE: Record<MemberStatus, MemberStatusTone> = {
  active: "green",
  pending_cooperative_review: "amber",
  rejected: "slate",
};

export function getMemberStatusLabel(
  status?: string,
  variant: "full" | "short" = "full",
) {
  const labels =
    variant === "short" ? MEMBER_STATUS_SHORT_LABELS : MEMBER_STATUS_LABELS;
  if (status && status in labels) {
    return labels[status as MemberStatus];
  }
  return variant === "short" ? "승인 대기" : "가입 승인 대기";
}

export function getMemberStatusTone(status?: string): MemberStatusTone {
  if (status && status in MEMBER_STATUS_TONE) {
    return MEMBER_STATUS_TONE[status as MemberStatus];
  }
  return "amber";
}

export function isActiveMember(status?: string) {
  return status === "active";
}

export function isInactiveMember(status?: string) {
  return status === "rejected";
}

export function isPendingMember(status?: string) {
  return status === "pending_cooperative_review";
}
