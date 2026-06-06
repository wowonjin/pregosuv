import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { InquiryBoard } from "@/components/InquiryBoard";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "문의 게시판 · 농협지원센터",
  description:
    "농협지원센터 문의 게시판에서 비슷한 사례를 찾아보고, 공개 범위에 맞춰 상담 내용을 확인할 수 있습니다.",
};

export default function InquiriesPage() {
  return (
    <>
      <Topbar />
      <main id="main" className="inquiries-page">
        <section className="inquiries-hero">
          <span className="kicker">Inquiry Board</span>
          <h1 className="inquiries-hero__title">
            <span className="inquiries-hero__line">궁금한 문의,</span>
            <span className="inquiries-hero__line">
              <em>게시판에서 바로</em> 확인하세요
            </span>
          </h1>
          <p>
            비슷한 업무 사례를 먼저 찾아보고, 선택한 공개 범위에 맞춰 본문과
            답변을 편하게 확인할 수 있습니다.
          </p>
        </section>
        <InquiryBoard />
      </main>
      <Footer />
    </>
  );
}
