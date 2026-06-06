export function HeroArt() {
  return (
    <svg
      viewBox="0 0 480 480"
      width="100%"
      height="100%"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D7E8FF" />
          <stop offset="100%" stopColor="#F4F8FF" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F9FAFB" />
        </linearGradient>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#0F1E3C" floodOpacity="0.10" />
        </filter>
        <filter id="floatShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0F1E3C" floodOpacity="0.12" />
        </filter>
        <filter id="coinShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0F1E3C" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* soft round background */}
      <circle cx="240" cy="240" r="220" fill="url(#bgGrad)" />

      {/* main inquiry card */}
      <g filter="url(#cardShadow)" className="hero-art__main">
        <rect x="76" y="92" width="292" height="326" rx="24" fill="url(#cardGrad)" />

        {/* header strip */}
        <rect x="102" y="120" width="98" height="12" rx="4" fill="#191F28" />
        <rect x="102" y="144" width="172" height="8" rx="4" fill="#E5E8EB" />
        <rect x="102" y="160" width="132" height="8" rx="4" fill="#E5E8EB" />

        <g transform="translate(290, 116)">
          <rect width="50" height="50" rx="16" fill="#EAF3FF" />
          <path
            d="M16 27 L23 34 L36 18"
            stroke="#3182F6"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* horizontal divider */}
        <line x1="102" y1="190" x2="342" y2="190" stroke="#F2F4F6" strokeWidth="1.2" />

        {/* inquiry form preview */}
        <g transform="translate(102, 212)">
          <text
            x="0"
            y="0"
            fontFamily="'Pretendard Variable', sans-serif"
            fontWeight="800"
            fontSize="15"
            fill="#191F28"
          >
            문의 접수
          </text>
          <rect x="0" y="18" width="238" height="38" rx="10" fill="#F2F7FF" />
          <rect x="16" y="32" width="112" height="8" rx="4" fill="#3182F6" opacity="0.75" />
          <rect x="0" y="70" width="238" height="76" rx="14" fill="#FFFFFF" stroke="#E5E8EB" />
          <rect x="16" y="90" width="176" height="8" rx="4" fill="#B0B8C1" />
          <rect x="16" y="108" width="204" height="8" rx="4" fill="#D1D6DB" />
          <rect x="16" y="126" width="142" height="8" rx="4" fill="#D1D6DB" />
        </g>

        {/* service chips */}
        <g transform="translate(102, 372)">
          {["세무", "노무", "법률", "감사"].map((label, index) => (
            <g key={label} transform={`translate(${index * 58}, 0)`}>
              <rect width="48" height="22" rx="11" fill="#EAF3FF" />
              <text
                x="24"
                y="15"
                textAnchor="middle"
                fontFamily="'Pretendard Variable', sans-serif"
                fontWeight="800"
                fontSize="10"
                fill="#1B64DA"
              >
                {label}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* expert matching card */}
      <g transform="translate(294, 72)" filter="url(#floatShadow)" className="hero-art__notif">
        <rect width="150" height="78" rx="16" fill="#FFFFFF" />
        <circle cx="30" cy="38" r="18" fill="#EAF3FF" />
        <path d="M24 38a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z" fill="#3182F6" />
        <path d="M19 54c4-7 18-7 22 0" stroke="#3182F6" strokeWidth="3" strokeLinecap="round" fill="none" />
        <rect x="58" y="22" width="68" height="8" rx="4" fill="#191F28" />
        <rect x="58" y="38" width="48" height="6" rx="3" fill="#B0B8C1" />
        <rect x="58" y="52" width="74" height="6" rx="3" fill="#D1D6DB" />
      </g>

      {/* matching route */}
      <g className="hero-art__route">
        <path
          d="M360 172 C414 188 418 248 370 270"
          stroke="#9EC6FF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="8 10"
        />
        <circle cx="374" cy="266" r="8" fill="#3182F6" />
      </g>

      {/* process card */}
      <g transform="translate(318, 284)" filter="url(#floatShadow)" className="hero-art__process">
        <rect width="130" height="96" rx="18" fill="#FFFFFF" />
        <text
          x="22"
          y="30"
          fontFamily="'Pretendard Variable', sans-serif"
          fontWeight="800"
          fontSize="14"
          fill="#191F28"
        >
          전문가 매칭
        </text>
        <g transform="translate(22, 50)">
          <circle cx="0" cy="0" r="8" fill="#3182F6" />
          <circle cx="38" cy="0" r="8" fill="#D7E8FF" />
          <circle cx="76" cy="0" r="8" fill="#D7E8FF" />
          <path d="M10 0 H28 M48 0 H66" stroke="#B4D3FF" strokeWidth="3" strokeLinecap="round" />
        </g>
        <path
          d="M20 75 L28 83 L44 66"
          stroke="#3182F6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="56" y="72" width="48" height="8" rx="4" fill="#E5E8EB" />
      </g>

      {/* leaf accent (agriculture) */}
      <g transform="translate(64, 78) rotate(-22)" filter="url(#coinShadow)" className="hero-art__leaf">
        <path
          d="M0 0 C -10 -28, 22 -42, 48 -22 C 54 6, 22 22, 0 0 Z"
          fill="#00A862"
        />
        <path
          d="M0 0 C 14 -10, 30 -18, 48 -22"
          stroke="#087F5B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* professional network badge */}
      <g transform="translate(76, 380)" filter="url(#coinShadow)" className="hero-art__badge">
        <circle r="42" fill="#FFFFFF" />
        <circle r="36" fill="#EAF3FF" />
        <circle cx="-11" cy="-3" r="9" fill="#3182F6" opacity="0.9" />
        <circle cx="11" cy="-3" r="9" fill="#1B64DA" opacity="0.9" />
        <circle cx="0" cy="16" r="9" fill="#00A862" opacity="0.9" />
        <path d="M-5 2 L5 2 M-6 10 L-1 8 M6 10 L1 8" stroke="#B4D3FF" strokeWidth="3" strokeLinecap="round" />
        <text
          x="0"
          y="-56"
          textAnchor="middle"
          fontFamily="'Pretendard Variable', sans-serif"
          fontWeight="800"
          fontSize="12"
          fill="#1B64DA"
        >
          8대 분야
        </text>
      </g>

      {/* small floating dots */}
      <circle cx="430" cy="220" r="4" fill="#00A862" opacity="0.6" />
      <circle cx="74"  cy="320" r="5" fill="#3182F6" opacity="0.3" />
      <circle cx="60"  cy="180" r="3" fill="#3182F6" opacity="0.5" />
    </svg>
  );
}
