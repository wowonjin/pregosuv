const ITEMS = [
  "한 번의 접수",
  "전문가 연결",
  "견적 요청",
  "사후지원",
];

export function Strip() {
  return (
    <section className="strip" aria-label="강점 요약">
      <div className="strip__inner">
        {ITEMS.map((label, i) => (
          <div className="strip__item" key={label}>
            <span className="strip__no">{String(i + 1).padStart(2, "0")}</span>
            <span className="strip__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
