import type { Metadata } from "next";
import { MyPageDashboard } from "@/components/MyPageDashboard";

export const metadata: Metadata = {
  title: "마이페이지 · 농협지원센터",
  description: "내 문의, 답변 공개범위, 농협별 통합 포인트 지갑을 확인합니다.",
};

type Props = {
  searchParams?: Promise<{
    tab?: string | string[];
  }>;
};

export default async function MyPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <main id="main" className="admin-app">
      <MyPageDashboard initialTab={params?.tab} />
    </main>
  );
}
