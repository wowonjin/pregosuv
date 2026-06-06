import type { Metadata } from "next";
import { SignupForm } from "@/components/SignupForm";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "회원가입 · 농협지원센터",
  description: "농협 선택, 사용자 인증, 소속 검증 요청을 진행합니다.",
};

export default function SignupPage() {
  return (
    <>
      <Topbar />
      <main id="main" className="signup-page">
        <section className="signup-shell">
          <header className="signup-head">
            <h1 className="signup-head__title">회원가입</h1>
            <p className="signup-head__lede">
              소속 농협을 인증하고 우리 농협 포인트 지갑을 사용해 보세요.
            </p>
            <ol className="signup-progress" aria-label="회원가입 단계">
              <li>
                <span>1</span>
                기본 정보
              </li>
              <li>
                <span>2</span>
                소속 농협
              </li>
              <li>
                <span>3</span>
                담당자
              </li>
              <li>
                <span>4</span>
                약관 동의
              </li>
            </ol>
          </header>

          <SignupForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
