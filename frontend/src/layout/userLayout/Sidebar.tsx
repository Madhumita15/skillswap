"use client";

import {
  GitPullRequest,
  HandCoins,
  Handshake,
  ShieldPlus,
  Star,
  Telescope,
  User2,
  LayoutDashboard,
  X,
  ChevronRight,
  History,
  LogOut,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useProfile } from "@/hooks/useProfile";
import { useAppDispatch } from "@/services/helper/redux";
import { logout } from "@/store/slices/auth.slice";
import { toast } from "sonner";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { data } = useProfile();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const sidebarMenu = [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Discovery",
      path: "/user/discovery",
      icon: Telescope,
    },
    {
      name: "My Match",
      path: "/user/my-match",
      icon: Handshake,
    },
    {
      name: "My Sent Request",
      path: "/user/my-sent-request",
      icon: GitPullRequest,
    },
    {
      name: "My Received Request",
      path: "/user/my-received-request",
      icon: HandCoins,
    },
    {
      name: "Active Swap",
      path: "/user/active-swap",
      icon: ShieldPlus,
    },
    {
      name: "Swap History",
      path: "/user/swap-history",
      icon: History,
    },
    {
      name: "My Reviews",
      path: "/user/my-reviews",
      icon: Star,
    },
    {
      name: "My Profile",
      path: "/user/profile",
      icon: User2,
    },
  ];

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout()).unwrap();
      console.log("response", response);
      if (response?.success === true) {
        toast.success(response?.message);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: mobileOpen ? 0 : undefined,
        }}
        className={`
          fixed left-0 top-0 z-70
          flex h-screen w-67.5
          flex-col
          border-r border-[#52291A]/70
          bg-[#1B100B]
          shadow-2xl shadow-black/30
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Section */}

        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#52291A]/60 px-5">
          <Link
            href="/user/dashboard"
            onClick={handleNavigation}
            className="group flex items-center"
          >
            <Image
              src="/images/watermarked_img_4340371330782871677-removebg-preview.png"
              alt="SkillSwap Logo"
              width={50}
              height={45}
              className="h-auto w-12.5 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="
      flex h-9 w-9 items-center justify-center
      rounded-lg
      text-[#A8A29E]
      transition-all duration-200
      hover:bg-[#2A170D]
      hover:text-[#F97316]
      lg:hidden
    "
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#52291A]">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#78716C]">
            Workspace
          </p>

          <div className="space-y-1.5">
            {sidebarMenu.map((menu, index) => {
              const Icon = menu.icon;

              const isActive =
                pathname === menu.path || pathname.startsWith(`${menu.path}/`);

              return (
                <motion.div
                  key={menu.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.035,
                  }}
                >
                  <Link
                    href={menu.path}
                    onClick={handleNavigation}
                    className={`
                      group relative flex items-center gap-3
                      overflow-hidden rounded-xl
                      px-3.5 py-2.5
                      text-[13px] font-medium
                      transition-all duration-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#F97316]/40
                      ${
                        isActive
                          ? "bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] shadow-lg shadow-[#F97316]/10"
                          : "text-[#A8A29E] hover:bg-[#25140B] hover:text-[#FFF7ED]"
                      }
                    `}
                  >
                    {/* Hover background */}
                    {!isActive && (
                      <span
                        className="
                          absolute inset-y-0 left-0 w-0
                          bg-linear-to-r
                          from-[#F97316]/10
                          to-transparent
                          transition-all duration-300
                          group-hover:w-full
                        "
                      />
                    )}

                    {/* Active left indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="active-sidebar-indicator"
                        className="
                          absolute left-0 top-1/2
                          h-7 w-1
                          -translate-y-1/2
                          rounded-r-full
                          bg-[#FFF7ED]
                        "
                      />
                    )}

                    <Icon
                      className={`
                        relative z-10 h-4.5 w-4.5 shrink-0
                        transition-all duration-300
                        ${
                          isActive
                            ? "text-[#1C1008]"
                            : "text-[#78716C] group-hover:scale-110 group-hover:text-[#F97316]"
                        }
                      `}
                    />

                    <span className="relative z-10 flex-1 truncate">
                      {menu.name}
                    </span>

                    {/* Arrow */}
                    <ChevronRight
                      className={`
                        relative z-10 h-4 w-4
                        transition-all duration-300
                        ${
                          isActive
                            ? "translate-x-0 opacity-100 text-[#1C1008]"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#F97316]"
                        }
                      `}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Bottom User Area */}
        <div className="shrink-0 border-t border-[#52291A]/60 p-3">
          <Link
            href="/user/profile"
            onClick={handleNavigation}
            className="
              group flex items-center gap-3
              rounded-xl
              border border-transparent
              bg-[#140B05]
              p-3
              transition-all duration-300
              hover:border-[#52291A]
              hover:bg-[#211309]
            "
          >
            <div
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full
                border border-[#6B3515]
                bg-[#1C1008]
                text-sm font-bold text-[#F97316]
                transition-all duration-300
                group-hover:border-[#F97316]
                group-hover:shadow-md
                group-hover:shadow-[#F97316]/10
              "
            >
              {data ? (
                <Image
                  src={data?.data[0].avatar_image}
                  className="object-cover h-8 w-8 rounded-full"
                  width={20}
                  height={20}
                  alt="alter"
                />
              ) : (
                <UserRound className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#FFF7ED]">
                My Account
              </p>

              <p className="truncate text-[10px] text-[#78716C]">
                Manage profile
              </p>
            </div>

            <ChevronRight
              className="
                h-4 w-4
                text-[#57504C]
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:text-[#F97316]
              "
            />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="
  cursor-pointer
    group flex w-full items-center gap-3
    rounded-xl px-4 py-3
    text-sm font-medium
    border-2 border-gray-800
    text-[#dcd6d3]
    transition-all duration-300
    bg-red-700/10
    hover:text-red-400
  "
          >
            <LogOut
              className="
      h-5 w-5
      transition-transform duration-300
      group-hover:-translate-x-0.5
    "
            />

            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
