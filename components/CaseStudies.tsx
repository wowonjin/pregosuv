import Link from "next/link";

type Case = {
  tag: string;
  title: string;
  desc: string;
};

const CASES: Case[] = [
  {
    tag: "전체공개",
    title: "다른 농협 사례도 함께 참고",
    desc: "비슷한 업무 고민을 먼저 찾아보고, 필요할 때 바로 문의를 이어갈 수 있습니다.",
  },
  {
    tag: "우리농협공개",
    title: "우리 농협 안에서만 공유",
    desc: "같은 농협 구성원만 본문과 답변을 볼 수 있어, 내부 업무 상담에 적합합니다.",
  },
  {
    tag: "비공개",
    title: "나만 확인하는 비공개 문의",
    desc: "민감한 내용은 작성자와 담당자만 확인할 수 있도록 안전하게 관리합니다.",
  },
];

export function CaseStudies() {
  return (
    <section className="section section--alt" id="cases">
      <div className="section__head">
        <span className="kicker">상담사례</span>
        <h2 className="display">
          궁금한 문의, <em>게시판에서 바로</em> 확인하세요
        </h2>
        <p className="section__lede">
          비슷한 업무 사례를 먼저 살펴보고, 필요한 상담은 원하는 공개 범위를
          선택해 편하게 남길 수 있습니다.
        </p>
        <Link className="cta cta--solid case__cta" href="/inquiries">
          문의 게시판 보기
        </Link>
      </div>

      <div className="cases cases--scope">
        {CASES.map((c) => (
          <article className="case case--scope" key={c.tag}>
            <div className="case__body">
              <span className="case__badge">{c.tag}</span>
              <h3>{c.title}</h3>
              <p className="case__desc">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
