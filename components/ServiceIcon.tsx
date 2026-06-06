type IconName =
  | "tax"
  | "audit"
  | "subsidy"
  | "ledger"
  | "shield"
  | "feasibility"
  | "valuation"
  | "control"
  | "refund"
  | "investigation"
  | "structure";

type Props = { name: IconName; size?: number };

const COMMON = {
  stroke: "#3182F6",
  fill: "#D7E8FF",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ServiceIcon({ name, size = 28 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="img"
    >
      {render(name)}
    </svg>
  );
}

function render(name: IconName) {
  switch (name) {
    case "tax":
      // 문서 + 체크
      return (
        <g {...COMMON} fill="none">
          <rect x="7" y="4.5" width="16" height="22" rx="2.5" fill={COMMON.fill} />
          <line x1="11" y1="10" x2="19" y2="10" />
          <line x1="11" y1="14" x2="17" y2="14" />
          <path d="M11 20 L14 23 L21 16" stroke={COMMON.stroke} strokeWidth="2" />
        </g>
      );

    case "audit":
      // 돋보기 + 문서
      return (
        <g {...COMMON} fill="none">
          <rect x="5" y="6" width="14" height="18" rx="2" fill={COMMON.fill} />
          <line x1="8.5" y1="11" x2="15.5" y2="11" />
          <line x1="8.5" y1="15" x2="13.5" y2="15" />
          <circle cx="22" cy="20" r="4.2" fill="#fff" />
          <line x1="25.2" y1="23.2" x2="28" y2="26" strokeWidth="2.2" />
        </g>
      );

    case "subsidy":
      // 영수증 + 원화
      return (
        <g {...COMMON} fill="none">
          <path
            d="M8 4 L24 4 L24 28 L21 26 L18 28 L15 26 L12 28 L9 26 L8 28 Z"
            fill={COMMON.fill}
          />
          <line x1="11" y1="11" x2="21" y2="11" />
          <line x1="11" y1="15" x2="21" y2="15" />
          <text
            x="16"
            y="22.4"
            textAnchor="middle"
            fontFamily="'Pretendard Variable', sans-serif"
            fontWeight="800"
            fontSize="9"
            fill={COMMON.stroke}
          >
            ₩
          </text>
        </g>
      );

    case "ledger":
      // 회계 장부 (펼친 책)
      return (
        <g {...COMMON} fill="none">
          <path
            d="M4 8 C8 6 12 6 16 8 C20 6 24 6 28 8 L28 25 C24 23 20 23 16 25 C12 23 8 23 4 25 Z"
            fill={COMMON.fill}
          />
          <line x1="16" y1="8" x2="16" y2="25" />
          <line x1="8" y1="12" x2="13" y2="12" />
          <line x1="8" y1="16" x2="13" y2="16" />
          <line x1="19" y1="12" x2="24" y2="12" />
          <line x1="19" y1="16" x2="24" y2="16" />
        </g>
      );

    case "shield":
      // 방패 + 체크 (외부감사)
      return (
        <g {...COMMON} fill="none">
          <path
            d="M16 3 L26 7 V15 C 26 21 22 26 16 28 C 10 26 6 21 6 15 V7 Z"
            fill={COMMON.fill}
          />
          <path d="M11 15 L14.5 18.5 L21 12" stroke={COMMON.stroke} strokeWidth="2.2" />
        </g>
      );

    case "feasibility":
      // 막대 차트 상승
      return (
        <g {...COMMON} fill="none">
          <rect x="5" y="20" width="5" height="7" rx="1" fill={COMMON.fill} />
          <rect x="13" y="14" width="5" height="13" rx="1" fill={COMMON.fill} />
          <rect x="21" y="8" width="5" height="19" rx="1" fill={COMMON.fill} />
          <path d="M5 12 L12 8 L18 11 L26 4" stroke={COMMON.stroke} strokeWidth="1.8" />
          <circle cx="26" cy="4" r="1.6" fill={COMMON.stroke} />
        </g>
      );

    case "valuation":
      // 저울
      return (
        <g {...COMMON} fill="none">
          <line x1="16" y1="6" x2="16" y2="26" />
          <path d="M7 26 L25 26" />
          <circle cx="16" cy="6" r="1.6" fill={COMMON.stroke} />
          <path d="M5 12 L11 12 L8 19 Z" fill={COMMON.fill} />
          <path d="M21 12 L27 12 L24 19 Z" fill={COMMON.fill} />
          <line x1="8" y1="12" x2="24" y2="12" />
        </g>
      );

    case "control":
      // 자물쇠 + 톱니
      return (
        <g {...COMMON} fill="none">
          <rect x="8" y="13" width="13" height="11" rx="2" fill={COMMON.fill} />
          <path d="M11 13 V10 C11 7 13 5 14.5 5 C16 5 18 7 18 10 V13" />
          <circle cx="14.5" cy="18.5" r="1.4" fill={COMMON.stroke} />
          <g transform="translate(22 22)">
            <circle r="3.4" fill="#fff" stroke={COMMON.stroke} strokeWidth="1.4" />
            <line x1="0" y1="-5" x2="0" y2="-3.6" />
            <line x1="0" y1="3.6" x2="0" y2="5" />
            <line x1="-5" y1="0" x2="-3.6" y2="0" />
            <line x1="3.6" y1="0" x2="5" y2="0" />
          </g>
        </g>
      );

    case "refund":
      // 원형 화살표
      return (
        <g {...COMMON} fill="none">
          <path
            d="M26 10 A 11 11 0 1 0 27 18"
            fill={COMMON.fill}
            stroke={COMMON.stroke}
          />
          <path d="M27 4 L27 11 L20 11" strokeWidth="2" />
          <text
            x="16"
            y="20"
            textAnchor="middle"
            fontFamily="'Pretendard Variable', sans-serif"
            fontWeight="800"
            fontSize="9"
            fill={COMMON.stroke}
          >
            ₩
          </text>
        </g>
      );

    case "investigation":
      // 방패 + 돋보기
      return (
        <g {...COMMON} fill="none">
          <path
            d="M16 3 L26 7 V15 C 26 21 22 26 16 28 C 10 26 6 21 6 15 V7 Z"
            fill={COMMON.fill}
          />
          <circle cx="14" cy="14" r="3.6" fill="#fff" />
          <line x1="16.7" y1="16.7" x2="20" y2="20" strokeWidth="2.2" />
        </g>
      );

    case "structure":
      // 조직도 (구조조정)
      return (
        <g {...COMMON} fill="none">
          <rect x="12" y="4" width="8" height="6" rx="1.5" fill={COMMON.fill} />
          <rect x="4" y="22" width="8" height="6" rx="1.5" fill={COMMON.fill} />
          <rect x="13" y="22" width="8" height="6" rx="1.5" fill={COMMON.fill} />
          <rect x="22" y="22" width="8" height="6" rx="1.5" fill={COMMON.fill} />
          <line x1="16" y1="10" x2="16" y2="16" />
          <line x1="8" y1="22" x2="8" y2="18" />
          <line x1="17" y1="22" x2="17" y2="18" />
          <line x1="26" y1="22" x2="26" y2="18" />
          <line x1="8" y1="18" x2="26" y2="18" />
        </g>
      );
  }
}

export type { IconName };
