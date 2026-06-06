export const ANSWER_POINT_MIN = 30000;
export const ANSWER_POINT_MAX = 100000;

const pointFormatter = new Intl.NumberFormat("ko-KR");

export function parsePointInput(value: string) {
  return Number(value.replace(/\D/g, ""));
}

/** 답변 포인트 입력 — 천 단위 콤마 자동 표시 (예: 30,000) */
export function formatPointInput(value: string | number) {
  const numericValue =
    typeof value === "number" ? value : parsePointInput(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) return "";
  return pointFormatter.format(numericValue);
}

export function isValidAnswerPointCost(value: number) {
  return (
    Number.isFinite(value) &&
    value >= ANSWER_POINT_MIN &&
    value <= ANSWER_POINT_MAX
  );
}

export function formatAnswerPointRangeLabel() {
  return `${formatPointInput(ANSWER_POINT_MIN)}~${formatPointInput(ANSWER_POINT_MAX)}`;
}
