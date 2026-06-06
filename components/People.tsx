import Link from "next/link";

type Person = {
  initials: string;
  nameKr: string;
  nameEn: string;
  title: string;
  subtitle: string[];
  contact: { label: string; value: string; href?: string }[];
};

const PEOPLE: Person[] = [
  {
    initials: "김",
    nameKr: "김재경",
    nameEn: "Jaegyeong Kim, CPA",
    title: "Head of Nonghyup Support Center",
    contact: [
      { label: "전화", value: "010-6387-7780 / 02-2037-4684", href: "tel:01063877780" },
      { label: "팩스", value: "02-784-4611" },
      { label: "메일", value: "jaegyeong.kim@insungacc.com", href: "mailto:jaegyeong.kim@insungacc.com" },
      { label: "메일", value: "cheaptaxworld@gmail.com", href: "mailto:cheaptaxworld@gmail.com" },
    ],
    subtitle: [
      "센터장",
      "Director, Insung Accounting Firm",
      "이사, 공인회계사",
    ],
  },
  {
    initials: "노",
    nameKr: "노규호",
    nameEn: "Kyuho Roh, CPA",
    title: "Director of Nonghyup Support Center",
    contact: [
      { label: "전화", value: "010-4911-0544", href: "tel:01049110544" },
      { label: "팩스", value: "02-784-4611" },
      { label: "메일", value: "kyuho@insungacc.com", href: "mailto:kyuho@insungacc.com" },
    ],
    subtitle: [
      "Insung Accounting Firm",
      "이사, 공인회계사",
    ],
  },
];

export function People() {
  return (
    <section className="section section--experts" id="people">
      <div className="section__head">
        <span className="kicker">Experts</span>
        <h2 className="display">
          농협지원센터의 <em>전문가</em>를 소개합니다
        </h2>
        <p className="section__lede">
          세무 자문과 감사 업무 경험을 갖춘 공인회계사가 농협의 문의 접수,
          상담 방향 확인, 필요한 전문가 연결을 지원합니다.
        </p>
      </div>

      <div className="people">
        {PEOPLE.map((p) => (
          <article className="person" key={p.nameKr}>
            <header className="person__head">
              <span className="person__photo person__photo--initial" aria-hidden="true">
                {p.initials}
              </span>
              <div>
                <h3 className="person__name">
                  {p.nameKr} <small>{p.nameEn}</small>
                </h3>
                <p className="person__title">{p.title}</p>
                <ul className="person__subtitle">
                  {p.subtitle.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </header>

            <ul className="person__contact">
              {p.contact.map((c) => (
                <li key={c.label + c.value}>
                  <span>{c.label}</span>
                  {c.href ? <a href={c.href}>{c.value}</a> : <span>{c.value}</span>}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="expert-trust">
        <div className="expert-trust__body">
          <span className="tag">Trust</span>
          <h3>신뢰할 수 있는 전문가</h3>
          <ul>
            <li>4대 회계법인 출신 공인회계사</li>
            <li>농협 및 농업법인 전문 경험 다수</li>
            <li>신속하고 정확한 업무 처리</li>
            <li>24시간 상담 가능한 맞춤형 서비스</li>
          </ul>
          <blockquote>
            “고객의 성공이 곧 우리의 성공입니다”
            <span>인성회계법인 농협지원센터</span>
          </blockquote>
        </div>
        <div className="expert-trust__visual" aria-hidden="true">
          <span className="expert-trust__badge">CPA</span>
          <strong>NH Support Center</strong>
          <em>Tax · Audit · Labor · Legal</em>
        </div>
      </div>

      <div className="expert-address">
        <span aria-hidden="true">⌖</span>
        서울특별시 영등포구 양평로 144
        <small>(선유도역, 영등포 세무서 인근)</small>
      </div>

      <div className="expert-actions" aria-label="전문가 관련 바로가기">
        <Link href="#about">김재경 회계사 소개 바로가기</Link>
        <Link href="/login">법인세 환급 무료조회</Link>
        <Link href="/login">예약·문의 상담 바로가기</Link>
      </div>
    </section>
  );
}
