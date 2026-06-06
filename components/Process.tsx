const STEPS = [
  {
    tag: "STEP 01",
    title: "문의 등록",
    desc: "궁금한 업무 분야와 내용을 남기고, 원하는 공개 범위를 선택해 문의를 등록합니다.",
  },
  {
    tag: "STEP 02",
    title: "답변 확인",
    desc: "게시판이나 마이페이지에서 답변을 확인하고, 필요한 내용을 바로 파악할 수 있습니다.",
  },
  {
    tag: "STEP 03",
    title: "추가 문의",
    desc: "답변을 보고도 궁금한 점이 있으면 같은 문의에 추가 질문을 이어갈 수 있습니다.",
  },
  {
    tag: "STEP 04",
    title: "전문가 연결",
    desc: "정식 업무가 필요하면 추가상담·견적진행을 요청해 전문가와 연결할 수 있습니다.",
  },
];

export function Process() {
  return (
    <section className="quote-band" id="process" aria-label="센터의 자세">
      <figure>
        <blockquote>
          고객이 체감하는 <em>질문·답변 경험</em>을 중심으로 안내합니다
        </blockquote>
        <figcaption>
          농협지원센터 <span>· 상담흐름</span>
        </figcaption>
      </figure>

      <ol className="steps">
        {STEPS.map((s) => (
          <li key={s.tag}>
            <span>{s.tag}</span>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
