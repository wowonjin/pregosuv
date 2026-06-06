import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "농협지원센터 · 주식회사 프리고",
  description:
    "농협 대상 상담 접수·분류·전문가 연결 플랫폼. 세무·노무·감사·회계 일반 문의를 안전하게 분류하고 필요한 전문가에게 연결합니다.",
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='%233182F6'/><path d='M20 42 L20 20 L30 38 L30 20' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='none'/><path d='M39 39 C39 31 46 28 50 22 C50 31 46 37 39 39 Z' fill='white' opacity='.9'/></svg>",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#3182F6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <a className="skip" href="#main">
          본문 바로가기
        </a>
        {children}
        <a className="chat-fab" href="/support" aria-label="고객지원">
          <svg width="34" height="34" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M11 3C6.58 3 3 6.07 3 9.86c0 2.12 1.13 4.02 2.9 5.28l-.6 2.62c-.09.39.32.71.67.52l2.78-1.5c.72.17 1.48.26 2.25.26 4.42 0 8-3.07 8-6.86S15.42 3 11 3Z"
              fill="currentColor"
            />
            <path
              d="M7.8 10.1H14.2M7.8 7.9H12.6"
              stroke="#3182F6"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </body>
    </html>
  );
}
