import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";
import {
  customerFeedbackItems,
  partnerAnswerScreenItems,
  partnerBackdataRiskNotes,
  partnerMetrics,
  partnerQueue,
  performanceMetricDefinitions,
  pointWallet,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "파트너 포털 · 농협지원센터",
  description: "파트너 답변 요청, 포인트 예산, 답변 작성, 성과를 확인합니다.",
};

export default function PartnerPage() {
  return (
    <>
      <Topbar />
      <main id="main">
        <section className="page-hero">
          <div className="page-hero__inner">
            <span className="hero__eyebrow">
              <span className="dot" aria-hidden="true" />
              Partner Portal
            </span>
            <h1 className="page-hero__title">
              배정된 요청과 예산을 확인하고
              <br className="br-md" />
              <em>답변을 작성</em>합니다
            </h1>
            <p className="page-hero__lede">
              파트너는 문의 기본정보, 조직 지갑 잔액, 답변 필요 포인트를 확인하고
              제출 전 공개범위와 개인정보 포함 여부를 점검합니다.
            </p>
          </div>
        </section>

        <section className="portal-layout">
          <div className="portal-main">
            <div className="metric-grid">
              {partnerMetrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>

            <div className="portal-section">
              <div className="section__head section__head--left">
                <span className="kicker">Answer Queue</span>
                <h2 className="display">
                  답변 요청 · <em>포인트 확인</em>
                </h2>
              </div>
              <div className="wallet-hero wallet-hero--compact">
                <div>
                  <span className="kicker">Org Wallet</span>
                  <h2>{pointWallet.nonghyup}</h2>
                  <p>
                    사용 가능 포인트와 최근 사용액은 파트너가 답변 필요 포인트를
                    설정할 때 참고하는 운영 정보입니다.
                  </p>
                </div>
                <dl className="wallet-stats">
                  <div>
                    <dt>사용 가능</dt>
                    <dd>{(pointWallet.balance - pointWallet.reserved).toLocaleString()}P</dd>
                  </div>
                  <div>
                    <dt>예약</dt>
                    <dd>{pointWallet.reserved.toLocaleString()}P</dd>
                  </div>
                  <div>
                    <dt>최근 사용</dt>
                    <dd>50,000P</dd>
                  </div>
                </dl>
              </div>
              <div className="table-card">
                <table>
                  <thead>
                    <tr>
                      <th>요청번호</th>
                      <th>문의번호</th>
                      <th>분야</th>
                      <th>공개범위</th>
                      <th>농협명</th>
                      <th>제목</th>
                      <th>답변 필요 포인트</th>
                      <th>권장 포인트</th>
                      <th>마감</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerQueue.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.inquiryId}</td>
                        <td>{item.field}</td>
                        <td>{item.visibility}</td>
                        <td>{item.nonghyup}</td>
                        <td>{item.title}</td>
                        <td>{item.budget.toLocaleString()}P</td>
                        <td>{item.recommendedBudget.toLocaleString()}P</td>
                        <td>{item.due}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="portal-section">
              <div className="section__head section__head--left">
                <span className="kicker">Answer Scope</span>
                <h2 className="display">
                  파트너 답변 화면 <em>표시 항목</em>
                </h2>
              </div>
              <div className="module-grid module-grid--two">
                {partnerAnswerScreenItems.map((item) => (
                  <article className="module-card" key={item.item}>
                    <span className="tag">{item.item}</span>
                    <p>{item.display}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="portal-section">
              <div className="section__head section__head--left">
                <span className="kicker">Draft</span>
                <h2 className="display">
                  답변 작성 · <em>검수 요청</em>
                </h2>
              </div>
              <form className="form form--flat">
                <fieldset className="form__group">
                  <legend>답변 초안</legend>
                  <div className="field">
                    <span className="field__label">문의 선택</span>
                    <select className="field__input" defaultValue={partnerQueue[0].id}>
                      {partnerQueue.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.inquiryId} · {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <span className="field__label">답변 요약</span>
                    <input
                      className="field__input"
                      type="text"
                      placeholder="고객에게 노출될 핵심 답변을 입력"
                    />
                  </div>
                  <div className="field">
                    <span className="field__label">답변 필요 포인트</span>
                    <select className="field__input" defaultValue="30000">
                      <option value="30000">30,000P</option>
                      <option value="50000">50,000P</option>
                      <option value="70000">70,000P</option>
                      <option value="100000">100,000P</option>
                    </select>
                  </div>
                  <div className="field">
                    <span className="field__label">상세 답변</span>
                    <textarea
                      className="field__input field__input--area"
                      rows={6}
                      placeholder="자료 검토 결과, 전제조건, 추가 확인사항을 작성합니다."
                    />
                  </div>
                  <div className="field">
                    <span className="field__label">추가자료 요청</span>
                    <input
                      className="field__input"
                      type="text"
                      placeholder="필요한 경우 고객에게 요청할 추가자료"
                    />
                  </div>
                  <div className="field">
                    <span className="field__label">견적 전환 제안</span>
                    <input
                      className="field__input"
                      type="text"
                      placeholder="정식 업무 견적이 필요한 경우 제안 문구"
                    />
                  </div>
                </fieldset>
                <div className="consent">
                  <label className="consent__row">
                    <input type="checkbox" />
                    <span>
                      공개범위와 개인정보 포함 여부를 확인했습니다.
                    </span>
                  </label>
                  <label className="consent__row">
                    <input type="checkbox" />
                    <span>
                      답변 필요 포인트를 확인했습니다.
                    </span>
                  </label>
                </div>
                <button className="cta cta--solid cta--block" type="button">
                  운영자 검수 요청
                </button>
              </form>
            </div>
          </div>

          <aside className="portal-aside">
            <article className="portal-card">
              <span className="tag tag--gold">Access</span>
              <h3>파트너 열람 원칙</h3>
              <p>
                파트너는 배정된 문의, 고객 동의 자료, 답변 작성에 필요한 최소
                정보만 확인합니다. 농협 전체 포인트 원장과 관리자 검수 메모는
                노출하지 않습니다.
              </p>
            </article>
            <article className="portal-card">
              <h3>성과 기준</h3>
              <ul className="stack-list">
                <li>답변 제출 건수</li>
                <li>평균 처리시간</li>
                <li>채택률과 수정요청 비율</li>
                <li>사용 포인트와 예산 준수율</li>
              </ul>
            </article>
            <article className="portal-card">
              <h3>고객 피드백 수집</h3>
              <ul className="stack-list">
                {customerFeedbackItems.slice(0, 5).map((item) => (
                  <li key={item.item}>
                    {item.item}: {item.input}
                  </li>
                ))}
              </ul>
            </article>
            <article className="portal-card">
              <h3>성과지표 산식</h3>
              <ul className="stack-list">
                {performanceMetricDefinitions.slice(0, 4).map((item) => (
                  <li key={item.metric}>
                    {item.metric}: {item.definition}
                  </li>
                ))}
              </ul>
            </article>
            <article className="portal-card">
              <h3>운영 리스크 완화</h3>
              <ul className="stack-list">
                {partnerBackdataRiskNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </article>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
