import { HeroArt } from "./HeroArt";
import { ConsultRequestLink } from "./ConsultRequestLink";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <span className="hero__eyebrow">
          <span className="dot" aria-hidden="true" />
          농협에 필요한 모든 전문지식을 가장 쉽게 제공합니다
        </span>

        <h1 className="hero__title">
          <span className="line">농협 업무의</span>
          <span className="line">복잡한 전문 문의를</span>
          <span className="line">
            <em>쉽게 풀어갑니다</em>
          </span>
        </h1>

        <p className="hero__lede">
          세무, 회계, 법률, 노무 등 모든 전문 문의를
          <br />
          한 곳에서 시작할 수 있습니다.
        </p>

        <div className="hero__actions">
          <ConsultRequestLink className="cta cta--solid">
            상담·견적 요청하기
          </ConsultRequestLink>
          <a className="cta cta--ghost" href="#services">
            지원분야 보기
          </a>
        </div>
      </div>

      <div className="hero__art">
        <HeroArt />
      </div>

      <div className="hero__kpi">
        <ul className="hero__stats" aria-label="서비스 요약">
          <li>
            <span className="stats__num stats__num--wide">점유율 1위!</span>
            <span className="stats__label">농협 업무 상담 접수</span>
          </li>
          <li>
            <span className="stats__num">8대</span>
            <span className="stats__label">모든 8대 전문직 문의 가능</span>
          </li>
          <li>
            <span className="stats__num">80+</span>
            <span className="stats__label">농협 관련 감사 및 자문 경험</span>
          </li>
          <li>
            <span className="stats__num">원스톱</span>
            <span className="stats__label">상담·견적·전문가 연결</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
