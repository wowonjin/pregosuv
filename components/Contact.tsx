type Card = {
  tag: string;
  tagVariant?: "gold";
  name: string;
  rows: { label: string; value: string; href?: string }[];
  address?: { line1: string; line2: string };
  variant?: "office";
};

const CARDS: Card[] = [
  {
    tag: "Request",
    name: "비공개 상담문 접수",
    rows: [
      { label: "방식", value: "신청서 작성" },
      { label: "범위", value: "세무 · 노무 · 감사 · 회계 일반" },
      { label: "원칙", value: "접수 후 상담 방향 안내" },
    ],
  },
  {
    tag: "Privacy",
    tagVariant: "gold",
    name: "개인정보 보호",
    rows: [
      { label: "책임자", value: "김재경" },
      { label: "수집", value: "이름 · 연락처 · 상담내용" },
      { label: "전달", value: "고객 동의 후 전문가 전달" },
    ],
  },
  {
    tag: "Operator",
    name: "주식회사 프리고",
    address: {
      line1: "농협지원센터 운영 주체",
      line2: "전문가 연결 플랫폼",
    },
    rows: [
      { label: "센터장", value: "김지혜" },
      { label: "역할", value: "상담 접수 · 분류 · 운영 관리" },
      { label: "계약", value: "공식 업무는 전문가와 별도 계약" },
    ],
    variant: "office",
  },
];

const TRUST = [
  <>
    <b>검증된 전문가</b> 네트워크
  </>,
  <>
    상담 내용에 맞는 <b>전문가 연결</b>
  </>,
  <>
    <b>비공개 접수</b>와 안전한 자료 전달
  </>,
  <>
    사후지원 <b>기록</b> 관리
  </>,
];

export function Contact() {
  return (
    <section className="section section--contact" id="contact">
      <div className="section__head">
        <span className="kicker">Contact</span>
        <h2 className="display">문의 · 견적 요청</h2>
        <p className="section__lede">
          상담은 먼저 비공개 신청서로 접수합니다. 공식 업무가 필요한 경우
          필요한 경우 고객 동의 후 전문가에게 연결됩니다.
        </p>
      </div>

      <div className="contact">
        {CARDS.map((c) => (
          <article
            key={c.name}
            className={`contact__card${c.variant === "office" ? " contact__card--office" : ""}`}
          >
            <span className={`tag${c.tagVariant === "gold" ? " tag--gold" : ""}`}>
              {c.tag}
            </span>
            <h3>{c.name}</h3>
            {c.address && (
              <p className="contact__addr">
                {c.address.line1}
                <br />
                <small>({c.address.line2})</small>
              </p>
            )}
            <ul>
              {c.rows.map((r, i) => (
                <li key={r.label + r.value + i}>
                  <span>{r.label}</span>
                  {r.href ? <a href={r.href}>{r.value}</a> : <span>{r.value}</span>}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="trust">
        <div className="trust__title">
          <span className="trust__seal" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 2 L19 5 V11 C 19 15.5 15.5 19 11 20 C 6.5 19 3 15.5 3 11 V5 Z"
                fill="white"
                opacity="0.95"
              />
              <path
                d="M7.5 11 L10 13.5 L14.5 8.5"
                stroke="#3182F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <h3>신뢰할 수 있는 전문가</h3>
        </div>
        <ul className="trust__list">
          {TRUST.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
