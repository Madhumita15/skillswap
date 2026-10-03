"use client";

import AdminSidebar from "@/layout/adminLayout/Sidebar";
import AdminHeader from "@/layout/adminLayout/adminHeader";
import { useAppSeletor } from "@/services/helper/redux";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSeletor((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-[#0B0804] text-white">
      {/* SIDEBAR */}
      <AdminSidebar user={user} />

      {/* MAIN AREA */}
      <div className="min-h-screen lg:ml-[290px]">
        {/* HEADER */}
        <AdminHeader />

        {/* PAGE CONTENT */}
        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}