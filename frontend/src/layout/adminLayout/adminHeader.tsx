"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";

import { adminMenuItems } from "./adminMenu";

export default function AdminHeader() {
  const pathname = usePathname();

  const activeItem =
    adminMenuItems.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    ) || adminMenuItems[0];

  const Icon = activeItem.icon;

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="
        sticky
        top-0
        z-30
        border-b
        border-[#2D180B]
        bg-[#0F0804]/85
        px-5
        py-5
        backdrop-blur-xl
        sm:px-6
        lg:px-8
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          {/* Breadcrumb / Section */}

          <motion.div
            key={activeItem.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#6B3515]
                bg-gradient-to-br
                from-[#E59A0B]/20
                to-[#F97316]/5
                text-[#F59E0B]
                shadow-[0_0_15px_rgba(245,158,11,0.10)]
              "
            >
              <Icon size={18} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#E59A0B]
                "
              >
                Admin Panel
              </p>

              <motion.h1
                key={activeItem.label}
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  mt-0.5
                  truncate
                  text-xl
                  font-semibold
                  tracking-tight
                  text-[#FFF7ED]
                  sm:text-2xl
                "
              >
                {activeItem.label}
              </motion.h1>
            </div>
          </motion.div>

          {/* Description */}

          <motion.p
            key={`${activeItem.label}-description`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.3,
            }}
            className="
                        mt-2
                        ml-10
                        hidden
                        text-sm
                        text-[#A8A29E]
                        sm:block
                      "
          >
            {activeItem.description}
          </motion.p>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            x: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 0.35,
          }}
          className="
            hidden
            shrink-0
            items-center
            gap-2
            rounded-xl
            border
            border-[#3D2110]
            bg-[#1A0D06]
            px-4
            py-3
            md:flex
          "
        >
          <motion.span
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              flex
              h-2
              w-2
              rounded-full
              bg-emerald-400
              shadow-[0_0_10px_rgba(52,211,153,0.8)]
            "
          />

          <span className="text-sm font-medium text-[#D6D3D1]">
            All systems operational
          </span>

          <CheckCircle2 size={16} className="text-emerald-400" />
        </motion.div>
      </div>
    </motion.header>
  );
}
