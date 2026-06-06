import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "로그인 · 농협지원센터",
  description: "농협지원센터 상담·견적 요청은 회원 로그인 후 이용할 수 있습니다.",
};

export default function LoginPage() {
  return (
    <>
      <Topbar />
      <main id="main" className="login-page">
        <section className="login-shell">
          <header className="login-head">
            <span className="login-head__eyebrow">
              <span className="dot" aria-hidden="true" />
              Members only
            </span>
            <h1 className="login-head__title">
              상담·견적 요청은
              <br />
              <em>회원 로그인 후</em> 이용합니다
            </h1>
            <p className="login-head__lede">
              아직 계정이 없다면 회원가입 신청을 통해 소속 농협을 검증해 주세요.
            </p>
          </header>

          <section className="login-card">
            <span className="login-card__tag">로그인</span>
            <h2 className="login-card__title">계정으로 로그인</h2>
            <p className="login-card__lede">
              가입한 이메일과 비밀번호를 입력해 상담 내역과 마이페이지를
              확인하세요.
            </p>
            <LoginForm />
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
