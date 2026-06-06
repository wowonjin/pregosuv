const STEPS: {
  no: string;
  title: string;
  desc: string;
  icon: "edit" | "eye" | "link" | "check";
}[] = [
  {
    no: "1",
    title: "문의 등록",
    desc: "궁금한 업무 분야와 내용을 작성하고 공개 범위를 선택합니다",
    icon: "edit",
  },
  {
    no: "2",
    title: "답변 확인",
    desc: "마이페이지에서 등록된 답변을 확인합니다",
    icon: "eye",
  },
  {
    no: "3",
    title: "추가 문의",
    desc: "더 궁금한 내용이 있으면 이어서 질문합니다",
    icon: "link",
  },
  {
    no: "4",
    title: "전문가 연결",
    desc: "추가상담·견적진행이 필요하면 연결 절차를 안내받습니다",
    icon: "check",
  },
];

function StepIcon({ name }: { name: "edit" | "eye" | "link" | "check" }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 16,
    height: 16,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20h4l10-10-4-4L4 16v4z" />
          <path d="M14 6l4 4" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12.5 L10 17.5 L19.5 8" />
        </svg>
      );
  }
}

export function ConsultSteps() {
  return (
    <section className="consult-steps" aria-label="상담 진행 절차">
      <div className="consult-steps__inner">
        <span className="consult-steps__kicker">Process</span>
        <ol className="consult-steps__list">
          {STEPS.map((s, idx) => (
            <li key={s.no} className="consult-steps__item">
              <span className="consult-steps__no" aria-hidden="true">
                <StepIcon name={s.icon} />
              </span>
              <div className="consult-steps__body">
                <span className="consult-steps__index">
                  STEP {String(idx + 1).padStart(2, "0")}
                </span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
