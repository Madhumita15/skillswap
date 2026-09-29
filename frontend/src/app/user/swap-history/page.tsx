"use client";

import { useGetSwapHistory } from "@/hooks/useSwaps";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  History,
  RotateCcw,
  UserRound,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SwapInterface } from "@/typescript/interface/swap.interface";




const SwapHistory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const { data, isLoading, isError, error } = useGetSwapHistory({
    page,
    limit,
  });

 

  const swaps = data?.data || [];
  console.log("swaps", swaps)
  



  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          badge:
            "border-green-500/30 bg-green-500/10 text-green-400",
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        };

      case "cancelled":
        return {
          badge:
            "border-red-500/30 bg-red-500/10 text-red-400",
          icon: <Ban className="h-3.5 w-3.5" />,
        };

      default:
        return {
          badge:
            "border-[#78716C]/30 bg-[#78716C]/10 text-[#A8A29E]",
          icon: <Clock3 className="h-3.5 w-3.5" />,
        };
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDuration = (
    startDate?: string,
    completedDate?: string
  ) => {
    if (!startDate || !completedDate) return null;

    const start = new Date(startDate).getTime();
    const end = new Date(completedDate).getTime();

    const difference = end - start;

    if (difference < 0) return null;

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days === 0) {
      return "Less than a day";
    }

    return `${days} ${days === 1 ? "day" : "days"}`;
  };

  const getPaginationPages = (
    currentPage: number,
    totalPages: number
  ) => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const paginationPages = getPaginationPages(
    page,
    data?.totalPages
  );

  const completedCount = swaps.filter(
    (swap: SwapInterface) => swap.status === "completed"
  ).length;

  const cancelledCount = swaps.filter(
    (swap: SwapInterface) => swap.status === "cancelled"
  ).length;

  return (
    <div className="min-h-screen bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-[#52291A]/70 bg-[#140B05] p-6 sm:p-8">

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F97316]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[#E59A0B]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316]/10">
                  <History className="h-4 w-4 text-[#F97316]" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                  Your Journey
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#FFF7ED] sm:text-3xl">
                Swap History
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8A29E]">
                Look back at the skills you exchanged, the people you
                learned with, and the swaps you have completed or cancelled.
              </p>
            </div>

            {/* Stats */}
            {!isLoading && !isError && swaps.length > 0 && (
              <div className="grid grid-cols-2 gap-3">

                <div className="min-w-28 rounded-2xl border border-green-500/20 bg-green-500/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-lg font-bold text-[#FFF7ED]">
                      {completedCount}
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] text-[#78716C]">
                    Completed
                  </p>
                </div>

                <div className="min-w-28 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Ban className="h-4 w-4 text-red-400" />
                    <span className="text-lg font-bold text-[#FFF7ED]">
                      {cancelledCount}
                    </span>
                  </div>

                  <p className="mt-1 text-[10px] text-[#78716C]">
                    Cancelled
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* ===================================================== */}
        {/* LOADING */}
        {/* ===================================================== */}

        {isLoading && (
          <div className="space-y-5">

            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden border-[#52291A] bg-[#1C1008]"
              >
                <CardContent className="p-5 sm:p-6">

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32 bg-[#52291A]/40" />
                    <Skeleton className="h-7 w-24 rounded-full bg-[#52291A]/40" />
                  </div>

                  <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto_1fr]">

                    <div className="flex items-center gap-4">
                      <Skeleton className="h-14 w-14 rounded-full bg-[#52291A]/40" />

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28 bg-[#52291A]/40" />
                        <Skeleton className="h-3 w-20 bg-[#52291A]/40" />
                        <Skeleton className="h-3 w-36 bg-[#52291A]/40" />
                      </div>
                    </div>

                    <Skeleton className="h-10 w-10 rounded-full bg-[#52291A]/40" />

                    <div className="flex items-center gap-4">
                      <Skeleton className="h-14 w-14 rounded-full bg-[#52291A]/40" />

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28 bg-[#52291A]/40" />
                        <Skeleton className="h-3 w-20 bg-[#52291A]/40" />
                        <Skeleton className="h-3 w-36 bg-[#52291A]/40" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Skeleton className="h-24 rounded-2xl bg-[#52291A]/40" />
                    <Skeleton className="h-24 rounded-2xl bg-[#52291A]/40" />
                  </div>

                  <Skeleton className="mt-5 h-12 rounded-xl bg-[#52291A]/40" />
                </CardContent>
              </Card>
            ))}

          </div>
        )}

        {/* ===================================================== */}
        {/* ERROR */}
        {/* ===================================================== */}

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-red-500/30 bg-[#1C1008]">
              <CardContent className="flex min-h-72 flex-col items-center justify-center px-6 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                  <History className="h-7 w-7 text-red-400" />
                </div>

                <h2 className="text-xl font-semibold text-[#FFF7ED]">
                  Unable to load swap history
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                  Something went wrong while fetching your previous
                  skill exchanges.
                </p>

                {error instanceof Error && (
                  <p className="mt-2 text-xs text-red-400">
                    {error.message}
                  </p>
                )}

                <Button
                  onClick={() => window.location.reload()}
                  className="mt-6 bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90"
                >
                  Try Again
                </Button>

              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ===================================================== */}
        {/* EMPTY */}
        {/* ===================================================== */}

        {!isLoading &&
          !isError &&
          swaps.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-[#52291A] bg-[#1C1008]">
                <CardContent className="flex min-h-80 flex-col items-center justify-center px-6 text-center">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316]/10">
                    <History className="h-7 w-7 text-[#F97316]" />
                  </div>

                  <h2 className="text-xl font-semibold text-[#FFF7ED]">
                    No swap history yet
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                    Once you complete or cancel a skill exchange,
                    it will appear here as part of your learning journey.
                  </p>

                  <Button
                  
                    className="mt-6 bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90"
                  >
                    <Link href="/user/discovery">
                      Discover People
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                </CardContent>
              </Card>
            </motion.div>
          )}

        {/* ===================================================== */}
        {/* HISTORY CARDS */}
        {/* ===================================================== */}

        {!isLoading &&
          !isError &&
          swaps.length > 0 && (
            <div className="space-y-5">

              {swaps.map((swap: SwapInterface, index: number) => {
                const statusStyle = getStatusStyle(
                  swap.status
                );

                const duration = getDuration(
                  swap.startDate,
                  swap.completedDate
                );

                return (
                  <motion.div
                    key={swap._id}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.07,
                      ease: "easeOut",
                    }}
                  >
                    <Card className="group overflow-hidden border-[#52291A] bg-[#1C1008] transition-all duration-300 hover:-translate-y-1 hover:border-[#6B3515] hover:shadow-xl hover:shadow-black/20">

                      {/* Top accent */}
                      <div
                        className={`h-1 ${
                          swap.status === "completed"
                            ? "bg-linear-to-r from-green-500/80 via-[#E59A0B] to-[#52291A]"
                            : "bg-linear-to-r from-red-500/70 via-[#52291A] to-[#1C1008]"
                        }`}
                      />

                      <CardContent className="p-5 sm:p-6">

                        {/* ================================================= */}
                        {/* TOP ROW */}
                        {/* ================================================= */}

                        <div className="flex flex-wrap items-center justify-between gap-4">

                          <div>
                            <div className="flex items-center gap-2">
                              <RotateCcw className="h-4 w-4 text-[#F97316]" />

                              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F97316]">
                                Skill Exchange
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-[#78716C]">
                              Swap ID:{" "}
                              <span className="font-mono text-[#A8A29E]">
                                {swap._id}
                              </span>
                            </p>
                          </div>

                          <Badge
                            className={`${statusStyle.badge} flex items-center gap-1.5 px-3 py-1.5 text-xs capitalize`}
                          >
                            {statusStyle.icon}
                            {swap.status}
                          </Badge>

                        </div>

                        {/* ================================================= */}
                        {/* PARTICIPANTS */}
                        {/* ================================================= */}

                        <div className="relative mt-7 grid gap-6 lg:grid-cols-[1fr_90px_1fr] lg:items-center">

                          {/* Sender */}
                          <div className="rounded-2xl border border-[#52291A]/70 bg-[#100905] p-5">

                            <div className="flex items-center gap-4">

                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#52291A] bg-[#1C1008]">

                                {swap.senderUser?.avatar_image ? (
                                  <Image
                                    src={
                                      swap.senderUser.avatar_image
                                    }
                                    alt={
                                      swap.senderUser.name
                                    }
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <UserRound className="h-7 w-7 text-[#52291A]" />
                                  </div>
                                )}

                              </div>

                              <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#78716C]">
                                  Sender
                                </p>

                                <h3 className="mt-1 truncate text-base font-bold text-[#FFF7ED]">
                                  {swap.senderUser?.name}
                                </h3>

                                {swap.senderUser?.experience && (
                                  <Badge className="mt-1 border-[#F97316]/20 bg-[#F97316]/5 text-[10px] text-[#F97316]">
                                    {swap.senderUser.experience}
                                  </Badge>
                                )}
                              </div>

                            </div>

                            {swap.senderUser?.bio && (
                              <p className="mt-4 line-clamp-2 text-xs leading-5 text-[#A8A29E]">
                                {swap.senderUser.bio}
                              </p>
                            )}

                          </div>

                          {/* Exchange Icon */}
                          <div className="flex justify-center">

                            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] shadow-lg shadow-black/20">

                              <div className="absolute inset-0 rounded-full bg-[#F97316]/5 blur-md" />

                              <RotateCcw className="relative h-5 w-5 text-[#F97316]" />

                            </div>

                          </div>

                          {/* Receiver */}
                          <div className="rounded-2xl border border-[#52291A]/70 bg-[#100905] p-5">

                            <div className="flex items-center gap-4">

                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#52291A] bg-[#1C1008]">

                                {swap.receiverUser?.avatar_image ? (
                                  <Image
                                    src={
                                      swap.receiverUser.avatar_image
                                    }
                                    alt={
                                      swap.receiverUser.name
                                    }
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <UserRound className="h-7 w-7 text-[#52291A]" />
                                  </div>
                                )}

                              </div>

                              <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#78716C]">
                                  Receiver
                                </p>

                                <h3 className="mt-1 truncate text-base font-bold text-[#FFF7ED]">
                                  {swap.receiverUser?.name}
                                </h3>

                                {swap.receiverUser?.experience && (
                                  <Badge className="mt-1 border-[#E59A0B]/20 bg-[#E59A0B]/5 text-[10px] text-[#E59A0B]">
                                    {swap.receiverUser.experience}
                                  </Badge>
                                )}
                              </div>

                            </div>

                            {swap.receiverUser?.bio && (
                              <p className="mt-4 line-clamp-2 text-xs leading-5 text-[#A8A29E]">
                                {swap.receiverUser.bio}
                              </p>
                            )}

                          </div>
                        </div>

                        {/* ================================================= */}
                        {/* SKILL EXCHANGE */}
                        {/* ================================================= */}

                        <div className="mt-5 grid gap-3 md:grid-cols-2">

                          {/* Teaching */}
                          <div className="rounded-2xl border border-[#F97316]/20 bg-[#F97316]/5 p-4">

                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F97316]/10">
                                <BookOpen className="h-4 w-4 text-[#F97316]" />
                              </div>

                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#F97316]">
                                  Skill Exchange
                                </p>

                                <p className="text-xs text-[#A8A29E]">
                                  You teach
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">

                              {swap.teachingSkills?.skill_logo ? (
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#52291A] bg-[#100905]">
                                  <Image
                                    src={
                                      swap.teachingSkills.skill_logo
                                    }
                                    alt={
                                      swap.teachingSkills.name
                                    }
                                    fill
                                    sizes="48px"
                                    className="object-contain p-1.5"
                                  />
                                </div>
                              ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#52291A] bg-[#100905]">
                                  <BookOpen className="h-5 w-5 text-[#F97316]" />
                                </div>
                              )}

                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-[#FFF7ED]">
                                  {swap.teachingSkills?.name}
                                </h4>

                                <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-[#A8A29E]">
                                  {
                                    swap.teachingSkills
                                      ?.description
                                  }
                                </p>
                              </div>

                            </div>
                          </div>

                          {/* Learning */}
                          <div className="rounded-2xl border border-[#E59A0B]/20 bg-[#E59A0B]/5 p-4">

                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E59A0B]/10">
                                <BookOpen className="h-4 w-4 text-[#E59A0B]" />
                              </div>

                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#E59A0B]">
                                  Skill Exchange
                                </p>

                                <p className="text-xs text-[#A8A29E]">
                                  You learn
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">

                              {swap.learningSkills?.skill_logo ? (
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#52291A] bg-[#100905]">
                                  <Image
                                    src={
                                      swap.learningSkills.skill_logo
                                    }
                                    alt={
                                      swap.learningSkills.name
                                    }
                                    fill
                                    sizes="48px"
                                    className="object-contain p-1.5"
                                  />
                                </div>
                              ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#52291A] bg-[#100905]">
                                  <BookOpen className="h-5 w-5 text-[#E59A0B]" />
                                </div>
                              )}

                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-[#FFF7ED]">
                                  {swap.learningSkills?.name}
                                </h4>

                                <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-[#A8A29E]">
                                  {
                                    swap.learningSkills
                                      ?.description
                                  }
                                </p>
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* ================================================= */}
                        {/* DATE INFORMATION */}
                        {/* ================================================= */}

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">

                          <div className="rounded-xl border border-[#52291A]/60 bg-[#100905] p-3">

                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-[#F97316]" />

                              <span className="text-[10px] uppercase tracking-wider text-[#78716C]">
                                Started
                              </span>
                            </div>

                            <p className="mt-2 text-xs font-semibold text-[#FFF7ED]">
                              {formatDate(swap.startDate)}
                            </p>

                          </div>

                          <div className="rounded-xl border border-[#52291A]/60 bg-[#100905] p-3">

                            <div className="flex items-center gap-2">
                              {swap.status === "completed" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <Ban className="h-4 w-4 text-red-400" />
                              )}

                              <span className="text-[10px] uppercase tracking-wider text-[#78716C]">
                                {swap.status === "completed"
                                  ? "Completed"
                                  : "Ended"}
                              </span>
                            </div>

                            <p className="mt-2 text-xs font-semibold text-[#FFF7ED]">
                              {formatDateTime(
                                swap.completedDate
                              )}
                            </p>

                          </div>

                          <div className="rounded-xl border border-[#52291A]/60 bg-[#100905] p-3">

                            <div className="flex items-center gap-2">
                              <Clock3 className="h-4 w-4 text-[#E59A0B]" />

                              <span className="text-[10px] uppercase tracking-wider text-[#78716C]">
                                Duration
                              </span>
                            </div>

                            <p className="mt-2 text-xs font-semibold text-[#FFF7ED]">
                              {duration || "Not available"}
                            </p>

                          </div>

                        </div>

                        {/* ================================================= */}
                        {/* BOTTOM */}
                        {/* ================================================= */}

                        <div className="mt-5 flex flex-col gap-3 border-t border-[#52291A]/50 pt-4 sm:flex-row sm:items-center sm:justify-between">

                          <p className="text-[10px] text-[#57534E]">
                            This swap is part of your SkillSwap history.
                          </p>

                          <div className="flex gap-2">

                            {swap.status === "completed" && (
                              <Button
                               
                                className="bg-linear-to-r from-[#F97316] to-[#E59A0B] text-xs font-semibold text-[#1C1008] hover:opacity-90"
                              >
                                <Link href="/user/reviews">
                                  Review
                                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            )}

                          </div>
                        </div>

                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

        {/* ===================================================== */}
        {/* PAGINATION */}
        {/* ===================================================== */}

        {!isLoading &&
          !isError &&
          data?.totalSwap > 0 && (
            <div className="mt-8 flex flex-col gap-4 border-t border-[#52291A]/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Result information */}

              <p className="text-xs text-[#A8A29E]">
                Showing
                <span className="mx-1 font-semibold text-[#FFF7ED]">
                  {data?.currentPage}-{data?.totalPages}
                </span>
                of
                <span className="mx-1 font-semibold text-[#FFF7ED]">
                  {data?.totalSwap}
                </span>
                swaps
              </p>

              {/* Limit */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A8A29E]">Show</span>

                <Select
                  value={String(limit)}
                  onValueChange={(value) => {
                    setLimit(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-16 border-[#52291A] bg-[#1C1008] text-xs text-[#FFF7ED] focus:border-[#F97316] focus:ring-[#F97316]/20">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="border-[#52291A] bg-[#1C1008] text-[#FFF7ED]">
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-xs text-[#A8A29E]">per page</span>
              </div>

              {/* Pagination */}

              <div className="flex items-center gap-1.5">
                {/* Previous */}
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-[#52291A] bg-[#1C1008] text-[#A8A29E] hover:border-[#F97316] hover:bg-[#F97316]/10 hover:text-[#FFF7ED]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Dynamic pages */}
                {paginationPages.map((pageNumber, index) => {
                  if (pageNumber === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="flex h-9 min-w-9 items-center justify-center text-xs text-[#6F625B]"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`
          flex h-9 min-w-9 items-center justify-center
          rounded-lg px-3 text-xs
          transition-all duration-200
          ${
            page === pageNumber
              ? "bg-linear-to-r from-[#F97316] to-[#E59A0B] font-bold text-[#1C1008] shadow-md shadow-[#F97316]/10"
              : "border border-[#52291A] bg-[#1C1008] font-medium text-[#A8A29E] hover:border-[#F97316]/60 hover:bg-[#F97316]/10 hover:text-[#FFF7ED]"
          }
        `}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next */}
                <Button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, data?.totalPages))
                  }
                  disabled={page === data?.totalPages}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-[#52291A] bg-[#1C1008] text-[#A8A29E] hover:border-[#F97316] hover:bg-[#F97316]/10 hover:text-[#FFF7ED]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default SwapHistory;