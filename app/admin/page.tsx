import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin · 농협지원센터",
  description: "농협지원센터 운영자 대시보드입니다.",
};

export default function AdminPage() {
  return (
    <main id="main" className="admin-app">
      <AdminDashboard />
    </main>
  );
}
