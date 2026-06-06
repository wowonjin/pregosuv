type Item = {
  title: string;
  desc: string;
  highlight: string;
  illustration: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    title: "농협 업무 이해",
    desc: "농협·조합 관련 법인의 회계, 감사, 세무, 인사노무, 계약 업무 특성을 고려해 문의를 검토합니다.",
    highlight: "NH",
    illustration: (
      <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
        <rect x="14" y="10" width="52" height="60" rx="8" fill="#D7E8FF" />
        <rect x="22" y="20" width="36" height="6" rx="2" fill="#3182F6" />
        <rect x="22" y="32" width="28" height="3" rx="1.5" fill="#7DB2FF" />
        <rect x="22" y="40" width="32" height="3" rx="1.5" fill="#7DB2FF" />
        <rect x="22" y="48" width="22" height="3" rx="1.5" fill="#7DB2FF" />
        <circle cx="58" cy="56" r="10" fill="#3182F6" />
        <path
          d="M53 56 L57 60 L63 53"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "8대 전문직 네트워크",
    desc: "회계사, 세무사, 노무사, 변호사, 법무사, 감정평가사, 변리사, 관세사 등 다양한 전문가와 협업합니다.",
    highlight: "8 Fields",
    illustration: (
      <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
        <rect x="18" y="14" width="44" height="52" rx="6" fill="#D7E8FF" />
        <rect x="26" y="24" width="20" height="4" rx="2" fill="#3182F6" />
        <rect x="26" y="34" width="28" height="3" rx="1.5" fill="#7DB2FF" />
        <rect x="26" y="42" width="22" height="3" rx="1.5" fill="#7DB2FF" />
        <circle cx="56" cy="56" r="14" fill="#FFD43B" />
        <text
          x="56"
          y="61"
          textAnchor="middle"
          fontFamily="'Pretendard Variable', sans-serif"
          fontWeight="800"
          fontSize="14"
          fill="#191F28"
        >
          ₩
        </text>
      </svg>
    ),
  },
  {
    title: "복합 문의 분류",
    desc: "하나의 문의에 여러 분야가 섞여 있어도 필요한 전문 영역을 구분해 안내합니다.",
    highlight: "Classify",
    illustration: (
      <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
        <rect x="10" y="34" width="60" height="36" rx="4" fill="#D7E8FF" />
        <path
          d="M20 34 L30 22 L40 34"
          fill="#3182F6"
          stroke="#3182F6"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="26" y="46" width="8" height="14" fill="#fff" />
        <path
          d="M50 34 C 48 24, 56 18, 62 22 C 64 28, 58 36, 50 34 Z"
          fill="#00A862"
        />
        <line
          x1="50"
          y1="34"
          x2="62"
          y2="22"
          stroke="#087F5B"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "상담과 견적 연결",
    desc: "필요한 경우 후속 상담, 견적, 정식 업무 진행까지 안내합니다.",
    highlight: "Connect",
    illustration: (
      <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true">
        <rect x="14" y="10" width="52" height="60" rx="8" fill="#D7E8FF" />
        <rect x="22" y="20" width="36" height="14" rx="3" fill="#fff" />
        <rect x="22" y="38" width="8" height="8" rx="1.6" fill="#3182F6" />
        <rect x="32" y="38" width="8" height="8" rx="1.6" fill="#7DB2FF" />
        <rect x="42" y="38" width="8" height="8" rx="1.6" fill="#7DB2FF" />
        <rect x="22" y="48" width="8" height="8" rx="1.6" fill="#7DB2FF" />
        <rect x="32" y="48" width="8" height="8" rx="1.6" fill="#3182F6" />
        <rect x="42" y="48" width="8" height="8" rx="1.6" fill="#7DB2FF" />
        <text
          x="40"
          y="30"
          textAnchor="middle"
          fontFamily="'Pretendard Variable', sans-serif"
          fontWeight="800"
          fontSize="9"
          fill="#3182F6"
        >
          %
        </text>
      </svg>
    ),
  },
];

export function Expertise() {
  return (
    <section className="section" id="expertise">
      <div className="section__head">
        <span className="kicker">Expertise</span>
        <h2 className="display">
          농협 업무에 맞춘 <em>전문성</em>
        </h2>
        <p className="section__lede">
          회계와 감사 문의를 구분하고, 복합 문의는 필요한 전문 영역으로 나누어
          상담 또는 견적 절차를 안내합니다.
        </p>
      </div>

      <div className="expertise">
        {ITEMS.map((item) => (
          <article className="expertise__card" key={item.title}>
            <div className="expertise__art">{item.illustration}</div>
            <span className="expertise__highlight">{item.highlight}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
