
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  UserCircle,
  LogOut,
  X,
  Menu,
} from "lucide-react";

import { useState } from "react";

import { adminMenuItems } from "./adminMenu";



type AdminSidebarProps = {
  user?: {
    name?: string;
    email?: string ;
    avatar_image?: string ;
  } | null
  onLogout?: () => void;
};

export default function AdminSidebar({
  user,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }

    router.push("/login");
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      
      {/* MOBILE MENU BUTTON */}
     
      <motion.button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        whileTap={{ scale: 0.92 }}
        className="
          fixed left-4 top-4 z-50
          flex h-11 w-11 items-center justify-center
          rounded-xl
          border border-[#6B3515]
          bg-[#120A05]/95
          text-[#F59E0B]
          shadow-lg shadow-orange-950/30
          backdrop-blur-xl
          transition-all
          hover:border-[#F59E0B]
          hover:text-[#FDBA74]
          hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]
          lg:hidden
        "
        aria-label="Open menu"
      >
        <Menu size={22} />
      </motion.button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="
              fixed inset-0 z-40
              bg-black/70
              backdrop-blur-sm
              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className={`
          fixed left-0 top-0 z-50
          flex h-screen
          w-[290px] flex-col
          border-r border-[#3D2110]
          bg-[#120A05]
          text-white

          shadow-[10px_0_40px_rgba(0,0,0,0.35)]

          transition-transform duration-300

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        <div
          className="
            relative
            flex h-20 shrink-0
            items-center
            justify-between
            border-b border-[#3D2110]
            px-6
          "
        >
          {/* Subtle top glow */}
          <div
            className="
              pointer-events-none
              absolute left-1/2 top-0
              h-px w-3/4
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#F59E0B]
              to-transparent
              opacity-60
              blur-[1px]
            "
          />

          <Link
            href="/admin/dashboard"
            onClick={closeMobileMenu}
            className="group flex items-center gap-4"
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="
                relative
                flex h-12 w-12
                shrink-0
                items-center
                justify-center
              "
            >
              {/* Logo glow */}
              <div
                className="
                  absolute inset-0
                  rounded-full
                  bg-[#F59E0B]/10
                  blur-xl
                  transition-all
                  duration-300
                  group-hover:bg-[#F59E0B]/25
                "
              />

              <Image
                src="/images/watermarked_img_4340371330782871677-removebg-preview.png"
                width={60}
                height={60}
                alt="SkillSwap Logo"
                priority
                className="
                  relative
                  h-12 w-12
                  object-contain
                "
              />
            </motion.div>
          </Link>

          {/* Mobile close button */}

          <motion.button
            type="button"
            onClick={closeMobileMenu}
            whileTap={{ scale: 0.9 }}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              border border-[#3D2110]
              text-[#A8A29E]
              transition-all
              hover:border-[#F59E0B]
              hover:bg-[#241207]
              hover:text-[#F59E0B]
              lg:hidden
            "
            aria-label="Close menu"
          >
            <X size={19} />
          </motion.button>
        </div>

      
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p
            className="
              mb-4 px-3
              text-[11px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#78716C]
            "
          >
            Management
          </p>

          <div className="space-y-2">
            {adminMenuItems.map((item, index) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.25,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="group relative block"
                  >
                    {/* ================================================= */}
                    {/* ACTIVE GLOW */}
                    {/* ================================================= */}

                    {isActive && (
                      <motion.div
                        layoutId="activeMenuGlow"
                        className="
                          absolute
                          inset-0
                          rounded-xl
                          bg-gradient-to-r
                          from-[#F59E0B]/30
                          via-[#F97316]/15
                          to-transparent
                          blur-md
                        "
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* ================================================= */}
                    {/* MENU ITEM */}
                    {/* ================================================= */}

                    <motion.div
                      whileHover={{
                        x: 3,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className={`
                        relative
                        flex
                        items-center
                        gap-3
                        overflow-hidden
                        rounded-xl
                        border
                        px-3
                        py-3
                        text-sm
                        font-medium
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              border-[#F59E0B]/60
                              bg-gradient-to-r
                              from-[#F59E0B]
                              via-[#F97316]
                              to-[#EA580C]
                              text-[#180C03]
                              shadow-[0_0_20px_rgba(245,158,11,0.20)]
                            `
                            : `
                              border-transparent
                              text-[#A8A29E]

                              hover:border-[#F97316]/50
                              hover:bg-gradient-to-r
                              hover:from-[#241207]
                              hover:via-[#1D0E06]
                              hover:to-[#120A05]

                              hover:text-[#FFF7ED]

                              hover:shadow-[0_0_18px_rgba(249,115,22,0.12)]
                            `
                        }
                      `}
                    >
                      {/* Hover fluorescent line */}

                      <span
                        className={`
                          absolute
                          left-0
                          top-1/2
                          h-0
                          w-[2px]
                          -translate-y-1/2
                          rounded-full
                          bg-[#F59E0B]
                          shadow-[0_0_10px_#F59E0B]
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "h-7"
                              : "group-hover:h-7"
                          }
                        `}
                      />

                      {/* Icon */}

                      <motion.div
                        animate={
                          isActive
                            ? {
                                scale: 1.05,
                              }
                            : {
                                scale: 1,
                              }
                        }
                        whileHover={{
                          scale: 1.12,
                          rotate: 2,
                        }}
                      >
                        <Icon
                          size={19}
                          strokeWidth={isActive ? 2.4 : 2}
                          className={`
                            shrink-0
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "text-[#180C03]"
                                : "text-[#A8A29E] group-hover:text-[#F59E0B] group-hover:drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]"
                            }
                          `}
                        />
                      </motion.div>

                      <span className="relative">
                        {item.label}
                      </span>

                      {/* Active right glow */}

                      {isActive && (
                        <motion.span
                          layoutId="activeDot"
                          className="
                            ml-auto
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[#180C03]
                            shadow-[0_0_8px_rgba(24,12,3,0.8)]
                          "
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* ================================================= */}
        {/* BOTTOM USER SECTION */}
        {/* ================================================= */}

        <div
          className="
            shrink-0
            border-t
            border-[#3D2110]
            bg-gradient-to-b
            from-transparent
            to-[#0D0704]/40
            p-4
          "
        >
          {/* ================================================= */}
          {/* USER PROFILE */}
          {/* ================================================= */}

          <Link
            href="/profile"
            onClick={closeMobileMenu}
            className="group mb-3 block"
          >
            <motion.div
              whileHover={{
                y: -1,
              }}
              className="
                relative
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-transparent
                p-2
                transition-all
                duration-300

                group-hover:border-[#6B3515]
                group-hover:bg-[#241207]
                group-hover:shadow-[0_0_18px_rgba(249,115,22,0.08)]
              "
            >
              {/* Avatar */}

              <div
                className="
                  relative
                  h-11 w-11
                  shrink-0
                  overflow-hidden
                  rounded-full
                  border
                  border-[#6B3515]
                  bg-[#E59A0B]
                  shadow-[0_0_12px_rgba(245,158,11,0.15)]
                  transition-all
                  duration-300
                  group-hover:border-[#F59E0B]
                  group-hover:shadow-[0_0_18px_rgba(245,158,11,0.3)]
                "
              >
                {user?.avatar_image ? (
                  <Image
                    src={user.avatar_image}
                    alt={user.name || "Admin"}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="
                      flex h-full w-full
                      items-center justify-center
                      font-semibold
                      text-[#180C03]
                    "
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                )}
              </div>

              {/* User Details */}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#FFF7ED]">
                  {user?.name || "Admin"}
                </p>

                <p className="truncate text-xs text-[#A8A29E]">
                  {user?.email || "admin@skillswap.com"}
                </p>
              </div>

              <UserCircle
                size={18}
                className="
                  shrink-0
                  text-[#78716C]
                  transition-all
                  duration-300
                  group-hover:text-[#F59E0B]
                  group-hover:drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]
                "
              />
            </motion.div>
          </Link>

          {/* ================================================= */}
          {/* LOGOUT */}
          {/* ================================================= */}

          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{
              x: 2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group
              relative
              flex
              w-full
              cursor-pointer
              items-center
              gap-3
              overflow-hidden
              rounded-xl
              border
              border-transparent
              px-3
              py-3
              text-sm
              font-medium
              text-red-400
              transition-all
              duration-300

              hover:border-red-500/30
              hover:bg-red-500/10
              hover:text-red-300
              hover:shadow-[0_0_18px_rgba(239,68,68,0.08)]
            "
          >
            <LogOut
              size={19}
              className="
                text-red-400
                transition-all
                duration-300
                group-hover:drop-shadow-[0_0_6px_rgba(248,113,113,0.8)]
              "
            />

            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}

