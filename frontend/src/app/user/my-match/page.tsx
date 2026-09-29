"use client";


import { motion } from "framer-motion";
import {
  Brain,
  GraduationCap,
  RefreshCcw,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetMyMatch } from "@/hooks/useDiscovery";
import MatchSkeleton from "@/components/MatchSkeleton";
import MatchCard from "@/components/MatchCard";
import { MatchedUser } from "@/typescript/interface/skill.interface";



const MyMatch = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMyMatch();

  const matchedUsers: MatchedUser[] = data?.data ?? [];

  return (
    <div className="min-h-full bg-[#0B0804] px-4 py-6 md:px-6 lg:px-8">

      {/* ================= HERO ================= */}

      <section className="relative mb-8 overflow-hidden rounded-3xl border border-[#52291A]/70 bg-[#1C1008]">

        {/* Background glow */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F97316]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#E59A0B]/10 blur-3xl" />

        <div className="relative grid items-center gap-8 p-6 md:p-8 lg:grid-cols-[1.4fr_0.8fr] lg:p-10">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-3 py-1.5 text-xs font-semibold text-[#F97316]">
              <Sparkles className="h-3.5 w-3.5" />
              Personalized Skill Matching
            </div>

            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-[#FFF7ED] md:text-4xl">
              Find people who can{" "}
              <span className="bg-linear-to-r from-[#F97316] to-[#E59A0B] bg-clip-text text-transparent">
                learn from you
              </span>{" "}
              while teaching you.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A8A29E] md:text-base">
              Your matches are based on a two-way skill exchange. We look for
              people whose teaching skills match what you want to learn and
              whose learning skills match what you can teach.
            </p>

            {/* Matching concept */}

            <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">

              <div className="rounded-2xl border border-[#52291A]/70 bg-[#100905]/70 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-[#F97316]/10 p-2">
                    <GraduationCap className="h-4 w-4 text-[#F97316]" />
                  </div>

                  <span className="text-sm font-semibold text-[#FFF7ED]">
                    You want to learn
                  </span>
                </div>

                <p className="text-xs leading-5 text-[#A8A29E]">
                  Their teaching skills should match your learning skills.
                </p>
              </div>

              <div className="rounded-2xl border border-[#52291A]/70 bg-[#100905]/70 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-[#E59A0B]/10 p-2">
                    <Brain className="h-4 w-4 text-[#E59A0B]" />
                  </div>

                  <span className="text-sm font-semibold text-[#FFF7ED]">
                    You can teach
                  </span>
                </div>

                <p className="text-xs leading-5 text-[#A8A29E]">
                  Their learning skills should match your teaching skills.
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT IMAGE / VISUAL */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden min-h-[280px] lg:block"
          >
            <div className="absolute inset-0 flex items-center justify-center">

              <div className="relative flex h-64 w-64 items-center justify-center">

                {/* outer circle */}

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#F97316]/30"
                />

                <div className="absolute h-44 w-44 rounded-full bg-gradient-to-br from-[#F97316]/20 to-[#E59A0B]/10 blur-2xl" />

                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-[#F97316]/30 bg-[#211309] shadow-2xl shadow-orange-950/30">

                  <Users className="h-12 w-12 text-[#F97316]" />

                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-8 -top-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#52291A] bg-[#1C1008]"
                  >
                    <Sparkles className="h-5 w-5 text-[#E59A0B]" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-5 -left-8 flex h-12 w-12 items-center justify-center rounded-xl border border-[#52291A] bg-[#1C1008]"
                  >
                    <Brain className="h-5 w-5 text-[#F97316]" />
                  </motion.div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= MATCHED USERS ================= */}

      <section>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#F97316]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F97316]">
                Personalized for you
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#FFF7ED]">
              Your Skill Matches
            </h2>

            <p className="mt-1 text-sm text-[#A8A29E]">
              People whose skills align with what you teach and want to learn.
            </p>
          </div>

          {!isLoading && !isError && (
            <div className="flex items-center gap-2 rounded-xl border border-[#52291A]/70 bg-[#1C1008] px-4 py-2.5">
              <Users className="h-4 w-4 text-[#F97316]" />

              <span className="text-sm font-semibold text-[#FFF7ED]">
                {matchedUsers.length}
              </span>

              <span className="text-xs text-[#A8A29E]">
                matches found
              </span>
            </div>
          )}

        </div>

        {/* ================= LOADING ================= */}

        {isLoading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <MatchSkeleton key={index} />
            ))}

          </div>
        )}

        {/* ================= ERROR ================= */}

        {isError && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-red-500/20 bg-[#1C1008] px-6 text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
              <RefreshCcw className="h-6 w-6 text-red-400" />
            </div>

            <h3 className="text-lg font-semibold text-[#FFF7ED]">
              We couldnt load your matches
            </h3>

            <p className="mt-2 max-w-md text-sm text-[#A8A29E]">
              Something went wrong while fetching your personalized skill
              matches. Please try again.
            </p>

            <Button
              onClick={() => refetch()}
              className="mt-5 gap-2 bg-linear-to-r from-[#F97316] to-[#E59A0B] text-[#1C1008] hover:opacity-90"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>

            {error instanceof Error && (
              <p className="mt-3 text-xs text-red-400/70">
                {error.message}
              </p>
            )}
          </motion.div>
        )}

        {/* ================= EMPTY ================= */}

        {!isLoading && !isError && matchedUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-[#52291A]/70 bg-[#1C1008] px-6 text-center"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F97316]/10">
              <Sparkles className="h-7 w-7 text-[#F97316]" />
            </div>

            <h3 className="text-xl font-bold text-[#FFF7ED]">
              No matches found yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
              Keep your teaching and learning skills updated. As more users
              join SkillSwap, well find people whose skills complement yours.
            </p>
          </motion.div>
        )}

        {/* ================= MATCH CARDS ================= */}

        {!isLoading && !isError && matchedUsers.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {matchedUsers.map((user, index) => (
              <MatchCard
                key={user._id}
                user={user}
                index={index}
              />
            ))}

          </div>
        )}

      </section>
    </div>
  );
};

export default MyMatch;