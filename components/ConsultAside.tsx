const WRITING_TIPS = [
  "상황을 편하게 적어주세요.",
  "관련 자료가 있으면 첨부해주세요.",
  "분야를 몰라도 괜찮습니다.",
];

const ANSWER_GUIDE = [
  "1차 답변은 홈페이지에서 확인합니다.",
  "필요 시 추가 질문을 할 수 있습니다.",
  "상담이나 견적은 답변 이후 진행됩니다.",
];

const SUPPORT_GUIDE = [
  "이용 방법이 어려우면 고객지원으로 문의하세요.",
  "전문 답변은 홈페이지 내 문의를 기준으로 진행됩니다.",
];

export function ConsultAside() {
  return (
    <aside className="consult-aside">
      <article className="consult-aside__card consult-aside__card--note">
        <h4>문의 작성 팁</h4>
        <ul className="consult-aside__notes">
          {WRITING_TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </article>

      <article className="consult-aside__card consult-aside__card--note">
        <h4>답변 안내</h4>
        <ul className="consult-aside__notes">
          {ANSWER_GUIDE.map((guide) => (
            <li key={guide}>{guide}</li>
          ))}
        </ul>
      </article>

      <article className="consult-aside__card consult-aside__card--note">
        <h4>고객지원</h4>
        <ul className="consult-aside__notes">
          {SUPPORT_GUIDE.map((guide) => (
            <li key={guide}>{guide}</li>
          ))}
        </ul>
      </article>

      <article className="consult-aside__card consult-aside__card--quote">
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          aria-hidden="true"
          className="quote-mark"
        >
          <path
            d="M10 8C6 10 4 14 4 19v5h9V14H8c.5-2 2-3.5 4-4.5L10 8zm14 0c-4 2-6 6-6 11v5h9V14h-5c.5-2 2-3.5 4-4.5L24 8z"
            fill="currentColor"
          />
        </svg>
        <p>질문만 남기면 필요한 답변 방향은 농협지원센터가 함께 정리합니다.</p>
        <span>— 농협지원센터</span>
      </article>
    </aside>
  );
}
