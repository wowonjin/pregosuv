import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { ConsultSteps } from "@/components/ConsultSteps";
import { ConsultForm } from "@/components/ConsultForm";

export const metadata: Metadata = {
  title: "상담 신청 · 농협지원센터",
  description:
    "농협 업무에 필요한 세무·노무·감사·회계 전문가를 쉽고 신뢰감 있게 연결합니다.",
};

export default function ConsultPage() {
  return (
    <>
      <Topbar />
      <main id="main" className="consult-page consult-page--compact">
        <ConsultSteps />
        <section className="consult-shell">
          <header className="consult-shell__head">
            <span className="consult-shell__eyebrow">
              <span className="dot" aria-hidden="true" />
              농협지원센터 문의
            </span>
            <h1 className="consult-shell__title">문의 작성하기</h1>
          </header>

          <ConsultForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
