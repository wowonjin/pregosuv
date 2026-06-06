import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { RequestDetailPage } from "@/components/RequestDetailPage";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "문의 상세 · 농협지원센터",
  description: "마이페이지에서 선택한 문의의 상태와 공개범위를 확인합니다.",
};

type Props = {
  params: Promise<{ requestId: string }>;
};

export default async function MyRequestDetail({ params }: Props) {
  const { requestId } = await params;

  return (
    <>
      <Topbar />
      <main id="main" className="request-detail-page">
        <RequestDetailPage requestId={requestId} />
      </main>
      <Footer />
    </>
  );
}
