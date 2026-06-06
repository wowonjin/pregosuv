export const KR_MOBILE_PHONE_MAX_INPUT_LENGTH = 13;
export const KR_MOBILE_PHONE_DIGIT_LENGTH = 11;

export function normalizeKrMobilePhone(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("8210")) {
    return `0${digits.slice(2)}`;
  }
  return digits;
}

export function formatKrMobilePhoneInput(value: string) {
  const digits = normalizeKrMobilePhone(value).slice(0, KR_MOBILE_PHONE_DIGIT_LENGTH);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function isValidKrMobilePhone(value: string) {
  return /^010\d{8}$/.test(normalizeKrMobilePhone(value));
}

export function toKrMobilePhoneE164(value: string) {
  const normalized = normalizeKrMobilePhone(value);
  if (!isValidKrMobilePhone(normalized)) return null;
  return `+82${normalized.slice(1)}`;
}
