import type { Metadata } from "next";
import Link from "next/link";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "고객지원 · 농협지원센터",
  description: "농협지원센터 이용 문의와 고객지원 안내를 확인합니다.",
};

export default function SupportPage() {
  return (
    <>
      <Topbar />
      <main id="main" className="login-page">
        <section className="login-shell">
          <header className="login-head">
            <span className="login-head__eyebrow">
              <span className="dot" aria-hidden="true" />
              Support
            </span>
            <h1 className="login-head__title">
              농협지원센터
              <br />
              <em>고객지원</em>
            </h1>
            <p className="login-head__lede">
              서비스 이용 중 궁금한 점이 있다면 문의를 남겨 주세요.
            </p>
          </header>

          <section className="login-card">
            <span className="login-card__tag">CS</span>
            <h2 className="login-card__title">상담 문의 안내</h2>
            <p className="login-card__lede">
              로그인한 회원은 문의 작성 화면에서 상담 요청을 등록할 수 있습니다.
              계정이나 승인 상태 관련 문의는 운영자 확인 후 안내됩니다.
            </p>
            <Link className="login-card__primary" href="/consult">
              문의 작성하기
            </Link>
            <Link className="login-card__ghost" href="/mypage">
              마이페이지로 이동
            </Link>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
