"use client";

import Navbar from "@/layout/userLayout/Navbar";
import Sidebar from "@/layout/userLayout/Sidebar";
import { useState } from "react";


interface UserLayoutClientProps {
  children: React.ReactNode;
}

const UserLayout = ({
  children,
}: UserLayoutClientProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0B0804]">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Navbar */}
      <div className="lg:pl-67.5 sticky top-0 z-50 ">
        <Navbar setMobileOpen={setMobileOpen} />
      </div>

      {/* Outlet */}
      <main className="min-h-[calc(100vh-4rem)] bg-[#0B0804] lg:ml-67.5">
        <div className="min-h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;