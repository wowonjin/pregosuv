import { visibilityPolicies, type VisibilityLevel } from "@/lib/platform";

const CUSTOMER_FLOW = [
  {
    label: "문의 등록",
    desc: "궁금한 업무 분야와 내용을 작성하고 공개 범위를 선택합니다.",
  },
  {
    label: "답변 확인",
    desc: "마이페이지에서 등록된 답변을 확인합니다.",
  },
  {
    label: "추가 문의",
    desc: "답변 후 더 궁금한 내용이 있으면 이어서 질문합니다.",
  },
  {
    label: "전문가 연결",
    desc: "추가상담·견적진행이 필요하면 적합한 전문가 연결 절차를 안내받습니다.",
  },
];

const VISIBILITY_ORDER: VisibilityLevel[] = ["public", "nonghyup", "private"];

const VISIBILITY_BADGE: Record<VisibilityLevel, { badge: string; tone: string }> = {
  private: { badge: "Private", tone: "private" },
  nonghyup: { badge: "Members", tone: "nonghyup" },
  public: { badge: "Public", tone: "public" },
};

export function InquiryWorkflow() {
  return (
    <section className="section section--compact" aria-label="상담 요청 처리 흐름">
      <div className="section__head">
        <span className="kicker">Request Flow</span>
        <h2 className="display">
          문의 등록부터 전문가 연결까지 <em>한 흐름으로 이어집니다</em>
        </h2>
        <p className="section__lede">
          고객이 무엇을 하면 되고, 이후 어떤 도움을 받을 수 있는지 중심으로
          안내합니다.
        </p>
      </div>

      <ol className="workflow">
        {CUSTOMER_FLOW.map((step, index) => (
          <li className="workflow__item" key={step.label}>
            <span className="workflow__no">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.label}</h3>
            <p>{step.desc}</p>
          </li>
        ))}
      </ol>

      <div className="visibility-panel">
        {VISIBILITY_ORDER.map((key) => {
          const item = visibilityPolicies[key];
          const meta = VISIBILITY_BADGE[key];
          return (
            <article key={key} className={`visibility-card visibility-card--${meta.tone}`}>
              <span className="visibility-card__badge">{meta.badge}</span>
              <h3>{item.label}</h3>
              <p>{item.desc}</p>
              <span className="visibility-card__copy">{item.customerCopy}</span>
            </article>
          );
        })}
      </div>

      <p className="workflow-note">
        1차 답변은 홈페이지 내 답변으로 제공됩니다. 추가 문의나
        추가상담·견적진행이 필요한 경우 답변 이후 이어서 안내드립니다.
      </p>
    </section>
  );
}
