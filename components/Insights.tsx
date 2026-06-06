import Image from "next/image";

type Post = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readMin: number;
  image: string;
  alt: string;
};

const POSTS: Post[] = [
  {
    category: "감사",
    title: "감사인 검토 체크리스트",
    excerpt:
      "감사 문의 전 확인하면 좋은 법인 현황, 감사자료, 일정 정보를 정리합니다.",
    date: "2026.04.21",
    readMin: 5,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    alt: "사무실 책상 위의 회계 보고서와 펜",
  },
  {
    category: "세무",
    title: "세무 상담 전 준비자료",
    excerpt:
      "세무상담이나 신고 자료 준비 전에 확인할 항목을 안내합니다.",
    date: "2026.04.07",
    readMin: 6,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop",
    alt: "노트북 옆에 펼쳐진 영수증 더미",
  },
  {
    category: "노무",
    title: "노무 문의 전 체크리스트",
    excerpt:
      "급여, 4대보험, 근로계약 문의 전에 정리하면 좋은 정보를 안내합니다.",
    date: "2026.03.18",
    readMin: 4,
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80&auto=format&fit=crop",
    alt: "햇빛 아래 펼쳐진 농촌 들판",
  },
  {
    category: "견적",
    title: "견적 요청 가이드",
    excerpt:
      "상담 후 정식 업무 견적이 필요할 때 요청 범위와 자료를 정리하는 방법을 안내합니다.",
    date: "2026.03.02",
    readMin: 4,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
    alt: "계약 문서와 노트북을 확인하는 장면",
  },
];

export function Insights() {
  return (
    <section className="section" id="insights">
      <div className="section__head">
        <span className="kicker">Insights</span>
        <h2 className="display">
          상담 전 확인하는 <em>자료실</em>
        </h2>
        <p className="section__lede">
          감사, 세무, 노무, 견적 요청 전에 확인할 수 있는 가이드와 체크리스트를
          제공합니다.
        </p>
      </div>

      <div className="insights">
        {POSTS.map((p) => (
          <article className="post" key={p.title}>
            <div className="post__media">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 1080px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="post__body">
              <span className="post__cat">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <div className="post__meta">
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.readMin}분 읽기</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
