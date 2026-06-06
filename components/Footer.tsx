import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot__inner">
        <div className="foot__brand">
          <BrandMark size={36} />
          <div>
            <p className="foot__name">농협지원센터 · 주식회사 프리고</p>
            <p className="foot__tag">
              농협 전문 상담 · 전문가 연결 플랫폼
            </p>
          </div>
        </div>

        <div className="foot__cols">
          <div>
            <h5>운영 주체</h5>
            <p>
              주식회사 프리고
              <br />
              <small>서비스명: 농협지원센터</small>
            </p>
          </div>
          <div>
            <h5>정책</h5>
            <p>
              <Link href="/signup">이용약관</Link> ·{" "}
              <Link href="/signup">개인정보처리방침</Link>
              <br />
              <small>개인정보 보호책임자 김지혜</small>
            </p>
          </div>
          <div>
            <h5>문의</h5>
            <p>
              <Link href="/consult">고객문의</Link> ·{" "}
              <Link href="/inquiries">문의게시판</Link>
              <br />
              <Link href="/#about">소개</Link> · <Link href="/signup">회원가입</Link> ·{" "}
              <Link href="/mypage">마이페이지</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="foot__bar">
        <p>© 2026 Prego Inc. · 농협지원센터.</p>
        <p>
          농협 전문 상담 · 전문가 연결 플랫폼
        </p>
      </div>
    </footer>
  );
}
