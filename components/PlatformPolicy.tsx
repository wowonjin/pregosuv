import { customerPrinciples, visibilityPolicies } from "@/lib/platform";

const VISIBILITY = Object.values(visibilityPolicies);

export function PlatformPolicy() {
  return (
    <section className="section section--policy" aria-label="고객 노출 콘텐츠 원칙">
      <div className="section__head">
        <span className="kicker">Message</span>
        <h2 className="display">
          고객에게는 <em>이해하기 쉬운 메시지</em>만 전합니다
        </h2>
        <p className="section__lede">
          전문성, 편의성, 신뢰성, 연결성, 성과감을 중심으로 상담 전환에
          필요한 내용만 안내합니다.
        </p>
      </div>

      <div className="policy-grid">
        {customerPrinciples.map((item) => (
          <article className="policy-card" key={item.title}>
            <span className="policy-card__badge">{item.badge}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>

      <div className="policy-note">
        <div>
          <h3>공개범위는 고객이 먼저 선택합니다</h3>
          <p>
            답변 공개 범위는 문의 작성 시 선택합니다. 민감한 내용은 필요한
            담당자에게만 전달되고, 공개 가능한 질문은 고객이 이해하기 쉬운
            형태로 안내합니다.
          </p>
        </div>
        <ul>
          {VISIBILITY.map((policy) => (
            <li key={policy.label}>{policy.label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
