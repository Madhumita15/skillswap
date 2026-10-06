"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Sparkles } from "lucide-react";

const SkillSwapLoader = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0B0804]">
      <div className="flex flex-col items-center justify-center">
        {/* Logo / Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-24 w-24 items-center justify-center"
        >
          {/* Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-[#F97316] blur-2xl"
          />

          {/* Circle */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] shadow-[0_0_35px_rgba(249,115,22,0.25)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-2 rounded-full border-2 border-dashed border-[#F97316]/50"
            />

            <ArrowLeftRight
              size={30}
              strokeWidth={2}
              className="relative text-[#F97316]"
            />

            <motion.div
              animate={{
                y: [-3, 3, -3],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-1 -top-1"
            >
              <Sparkles
                size={16}
                className="text-[#E59A0B]"
                fill="currentColor"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 text-2xl font-bold tracking-wide text-[#FFF7ED]"
        >
          Skill<span className="text-[#F97316]">Swap</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-2 text-sm text-[#A8A29E]"
        >
          Learn. Share. Swap.
        </motion.p>

        {/* Loading dots */}
        <div className="mt-6 flex items-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
                ease: "easeInOut",
              }}
              className="h-2 w-2 rounded-full bg-[#F97316]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillSwapLoader;