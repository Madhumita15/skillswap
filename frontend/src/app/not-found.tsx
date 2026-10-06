"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowLeftRight,
  Compass,
  Home,
  Search,
  Sparkles,
} from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0804] px-6 py-12">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316] blur-[120px]"
      />

      {/* Decorative circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[500px] w-[500px] rounded-full border border-dashed border-[#6B3515]/40"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[650px] w-[650px] rounded-full border border-[#6B3515]/20"
      />

      {/* Floating sparkles */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[20%] top-[25%]"
      >
        <Sparkles className="text-[#E59A0B]" size={22} />
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute right-[20%] top-[30%]"
      >
        <Sparkles className="text-[#F97316]" size={18} />
      </motion.div>

      <motion.div
        animate={{
          y: [-8, 8, -8],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[25%] left-[25%]"
      >
        <Sparkles className="text-[#D99A18]" size={16} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          {/* Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-8 rounded-full border border-[#F97316]/20"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-14 rounded-full border border-dashed border-[#6B3515]/40"
          />

          {/* 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative text-[110px] font-black leading-none tracking-tight text-[#FFF7ED] sm:text-[150px]"
          >
            4
            <span className="relative inline-flex items-center justify-center text-[#F97316]">
              0

              {/* Center icon */}
              <motion.span
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute"
              >
                <ArrowLeftRight
                  size={55}
                  strokeWidth={1.8}
                  className="text-[#F97316] sm:h-[70px] sm:w-[70px]"
                />
              </motion.span>
            </span>
            4
          </motion.h1>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
        >
          <h2 className="text-3xl font-bold text-[#FFF7ED] sm:text-4xl">
            Looks like this skill got lost.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#A8A29E] sm:text-lg">
            The page youre looking for doesnt exist or may have moved.
            Dont worry — there are plenty of skills waiting to be discovered.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E59A0B] px-6 font-semibold text-white shadow-lg shadow-[#E59A0B]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C77D05] hover:shadow-[#E59A0B]/20"
          >
            <Home size={18} />

            <span>Back Home</span>
          </Link>

          <Link
            href="/explore-skill"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#6B3515] bg-[#1C1008] px-6 font-semibold text-[#FFF7ED] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F97316]/50 hover:bg-[#241408]"
          >
            <Compass
              size={18}
              className="transition-transform duration-300 group-hover:rotate-12"
            />

            <span>Explore Skills</span>
          </Link>
        </motion.div>

        {/* Back link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => window.history.back()}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm text-[#78716C] transition-colors hover:text-[#F97316]"
        >
          <ArrowLeft size={15} />

          <span>Go back to previous page</span>
        </motion.button>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#6B3515] bg-[#1C1008]">
            <Search size={15} className="text-[#F97316]" />
          </div>

          <span className="text-sm font-semibold tracking-wide text-[#A8A29E]">
            Skill<span className="text-[#F97316]">Swap</span>
          </span>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;