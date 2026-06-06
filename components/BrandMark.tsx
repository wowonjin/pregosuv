type Props = {
  size?: number;
};

export function BrandMark({ size = 36 }: Props) {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      aria-hidden="true"
      role="img"
    >
      <rect width="36" height="36" rx="12" fill="#3182F6" />
      {/* stylized N + leaf */}
      <path
        d="M11 25 L11 12 L17 22 L17 12"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 23 C 22 18, 26 16, 28 13 C 28 18, 25 22, 22 23 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}
