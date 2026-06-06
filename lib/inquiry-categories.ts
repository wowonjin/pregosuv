import type { ConsultRequestRecord } from "@/lib/firebase/schema";

export const INQUIRY_CATEGORY_AUTO_LABEL = "자동 배정";

/** 고객 상담 신청 · 관리자 답변 시 공통 지원 분야 */
export const INQUIRY_SUPPORT_FIELD_OPTIONS = [
  { value: "TAX", label: "세무·회계" },
  { value: "LEGAL", label: "법률" },
  { value: "LABOR", label: "노무" },
  { value: "REGISTRATION", label: "등기 업무" },
  { value: "APPRAISAL", label: "감정평가" },
  { value: "IP", label: "지식재산" },
  { value: "CUSTOMS", label: "관세/통관" },
  { value: "AUDIT", label: "감사" },
] as const;

export type InquirySupportFieldValue =
  (typeof INQUIRY_SUPPORT_FIELD_OPTIONS)[number]["value"];

const SUPPORT_FIELD_LABELS: Record<string, string> = {
  AUTO: INQUIRY_CATEGORY_AUTO_LABEL,
  ACCOUNTING: "세무·회계",
  ...Object.fromEntries(
    INQUIRY_SUPPORT_FIELD_OPTIONS.map((option) => [option.value, option.label]),
  ),
};

const SUPPORT_FIELD_LABEL_SET: Set<string> = new Set(
  INQUIRY_SUPPORT_FIELD_OPTIONS.map((option) => option.label),
);

export function getInquiryCategoryLabel(keyOrLabel?: string) {
  if (!keyOrLabel?.trim()) return INQUIRY_CATEGORY_AUTO_LABEL;
  const normalized = keyOrLabel.trim().toUpperCase();
  return SUPPORT_FIELD_LABELS[normalized] ?? keyOrLabel.trim();
}

export function getCustomerInquiryTypeLabel(
  request: Pick<ConsultRequestRecord, "internalCategory" | "internal_category">,
) {
  return getInquiryCategoryLabel(
    request.internalCategory ?? request.internal_category,
  );
}

export function isAutoAssignedInquiry(
  request: Pick<ConsultRequestRecord, "internalCategory" | "internal_category">,
) {
  return getCustomerInquiryTypeLabel(request) === INQUIRY_CATEGORY_AUTO_LABEL;
}

export function getAssignedSupportFieldLabel(
  request: Pick<ConsultRequestRecord, "internalCategory" | "internal_category">,
) {
  const raw = request.internalCategory ?? request.internal_category ?? "";
  if (!raw.trim() || raw.trim() === INQUIRY_CATEGORY_AUTO_LABEL) return "";
  return raw.trim();
}

export function isValidSupportFieldLabel(label: string) {
  return SUPPORT_FIELD_LABEL_SET.has(label.trim());
}
