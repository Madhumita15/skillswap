"use client";
import { useGetActiveSwap } from "@/hooks/useSwaps";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Mail,
  RefreshCw,
  UserRound,
  XCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ActiveSwap = () => {
  const { data, isLoading, isError, error } =
    useGetActiveSwap();

  console.log("data", data);

  const swap = data?.data?.[0];

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

    return new Date(date).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  
  const handleCancelSwap = async () => {
    console.log("Cancel swap:", swap?._id);
  };

  const handleCompleteSwap = async () => {
    console.log("Complete swap:", swap?._id);
  };

  return (
    <div className="min-h-screen bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-[#52291A]/70 bg-[#140B05] p-6 sm:p-8">

          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#F97316]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[#E59A0B]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316]/10">
                  <Handshake className="h-4 w-4 text-[#F97316]" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                  Current Skill Exchange
                </span>

              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#FFF7ED] sm:text-3xl">
                Your Active Swap
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8A29E]">
                You are currently exchanging skills with another
                SkillSwap member. Continue learning, teaching, and
                collaborating until the exchange is complete.
              </p>
            </div>

            {!isLoading && !isError && swap && (
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 px-5 py-3">

                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                  <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-400/50" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-green-400">
                    Active
                  </p>

                  <p className="text-[10px] text-[#78716C]">
                    Exchange in progress
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

            <Card className="border-[#52291A] bg-[#1C1008]">
              <CardContent className="p-6">

                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32 bg-[#52291A]/40" />
                  <Skeleton className="h-7 w-20 rounded-full bg-[#52291A]/40" />
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_1fr]">

                  <div className="flex flex-col items-center text-center">
                    <Skeleton className="h-24 w-24 rounded-full bg-[#52291A]/40" />
                    <Skeleton className="mt-4 h-5 w-32 bg-[#52291A]/40" />
                    <Skeleton className="mt-2 h-4 w-24 bg-[#52291A]/40" />
                  </div>

                  <Skeleton className="h-12 w-12 rounded-full bg-[#52291A]/40" />

                  <div className="flex flex-col items-center text-center">
                    <Skeleton className="h-24 w-24 rounded-full bg-[#52291A]/40" />
                    <Skeleton className="mt-4 h-5 w-32 bg-[#52291A]/40" />
                    <Skeleton className="mt-2 h-4 w-24 bg-[#52291A]/40" />
                  </div>

                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5 lg:grid-cols-2">

              <Skeleton className="h-48 rounded-2xl bg-[#52291A]/40" />

              <Skeleton className="h-48 rounded-2xl bg-[#52291A]/40" />

            </div>

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
                  <RefreshCw className="h-7 w-7 text-red-400" />
                </div>

                <h2 className="text-xl font-semibold text-[#FFF7ED]">
                  Unable to load active swap
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                  Something went wrong while fetching your current
                  skill exchange.
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
        {/* NO ACTIVE SWAP */}
        {/* ===================================================== */}

        {!isLoading && !isError && !swap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-[#52291A] bg-[#1C1008]">
              <CardContent className="flex min-h-80 flex-col items-center justify-center px-6 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316]/10">
                  <Handshake className="h-7 w-7 text-[#F97316]" />
                </div>

                <h2 className="text-xl font-semibold text-[#FFF7ED]">
                  No active swap
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                  You dont currently have an active skill exchange.
                  Find someone in the community and start a new
                  skill-sharing journey.
                </p>

                <Button
                
                  className="mt-6 bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90"
                >
                  <Link className="flex flex-row gap-1" href="/user/discovery">
                    Discover People
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ===================================================== */}
        {/* ACTIVE SWAP */}
        {/* ===================================================== */}

        {!isLoading && !isError && swap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >

            {/* ================================================= */}
            {/* PARTICIPANTS */}
            {/* ================================================= */}

            <Card className="overflow-hidden border-[#52291A] bg-[#1C1008]">

              <div className="h-1 bg-linear-to-r from-[#F97316] via-[#E59A0B] to-[#52291A]" />

              <CardContent className="p-6 sm:p-8">

                <div className="mb-8 flex flex-col items-center text-center">

                  <Badge className="border-green-500/20 bg-green-500/10 text-green-400">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400" />
                    Active Swap
                  </Badge>

                  <h2 className="mt-3 text-xl font-bold text-[#FFF7ED]">
                    You & Your Learning Partner
                  </h2>

                  <p className="mt-1 text-sm text-[#78716C]">
                    Exchange skills and grow together.
                  </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">

                  {/* ================================================= */}
                  {/* SENDER */}
                  {/* ================================================= */}

                  <div className="rounded-3xl border border-[#F97316]/20 bg-[#F97316]/5 p-6 text-center">

                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#F97316]/50 bg-[#100905] shadow-lg shadow-[#F97316]/5">

                      {swap.senderUser?.avatar_image ? (
                        <Image
                          src={swap.senderUser.avatar_image}
                          alt={swap.senderUser.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <UserRound className="h-10 w-10 text-[#52291A]" />
                        </div>
                      )}

                    </div>

                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                      Sender
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[#FFF7ED]">
                      {swap.senderUser?.name}
                    </h3>

                    {swap.senderUser?.experience && (
                      <Badge className="mt-2 border-[#F97316]/20 bg-[#F97316]/10 text-[#F97316]">
                        {swap.senderUser.experience}
                      </Badge>
                    )}

                    {swap.senderUser?.bio && (
                      <p className="mx-auto mt-4 max-w-sm line-clamp-2 text-xs leading-5 text-[#A8A29E]">
                        {swap.senderUser.bio}
                      </p>
                    )}

                    {swap.senderUser?.email && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#78716C]">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">
                          {swap.senderUser.email}
                        </span>
                      </div>
                    )}

                    {swap.senderUser?._id && (
                      <Button
                       
                        variant="ghost"
                        className="mt-3 text-xs text-[#A8A29E] hover:bg-[#F97316]/5 hover:text-[#F97316]"
                      >
                        <Link
                          href={`/user/users/${swap.senderUser._id}`}
                        >
                          View Profile
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    )}

                  </div>

                  {/* ================================================= */}
                  {/* EXCHANGE */}
                  {/* ================================================= */}

                  <div className="flex flex-col items-center gap-3">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] shadow-lg shadow-black/20">

                      <RefreshCw className="h-6 w-6 text-[#F97316]" />

                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
                      Skill Exchange
                    </span>

                  </div>

                  {/* ================================================= */}
                  {/* RECEIVER */}
                  {/* ================================================= */}

                  <div className="rounded-3xl border border-[#E59A0B]/20 bg-[#E59A0B]/5 p-6 text-center">

                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#E59A0B]/50 bg-[#100905] shadow-lg shadow-[#E59A0B]/5">

                      {swap.receiverUser?.avatar_image ? (
                        <Image
                          src={swap.receiverUser.avatar_image}
                          alt={swap.receiverUser.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <UserRound className="h-10 w-10 text-[#52291A]" />
                        </div>
                      )}

                    </div>

                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
                      Receiver
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[#FFF7ED]">
                      {swap.receiverUser?.name}
                    </h3>

                    {swap.receiverUser?.experience && (
                      <Badge className="mt-2 border-[#E59A0B]/20 bg-[#E59A0B]/10 text-[#E59A0B]">
                        {swap.receiverUser.experience}
                      </Badge>
                    )}

                    {swap.receiverUser?.bio && (
                      <p className="mx-auto mt-4 max-w-sm line-clamp-2 text-xs leading-5 text-[#A8A29E]">
                        {swap.receiverUser.bio}
                      </p>
                    )}

                    {swap.receiverUser?.email && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#78716C]">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">
                          {swap.receiverUser.email}
                        </span>
                      </div>
                    )}

                    {swap.receiverUser?._id && (
                      <Button
                      
                        variant="ghost"
                        className="mt-3 text-xs text-[#A8A29E] hover:bg-[#E59A0B]/5 hover:text-[#E59A0B]"
                      >
                        <Link
                          href={`/user/users/${swap.receiverUser._id}`}
                        >
                          View Profile
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    )}

                  </div>

                </div>

              </CardContent>
            </Card>

            {/* ===================================================== */}
            {/* SKILLS */}
            {/* ===================================================== */}

            <div className="grid gap-5 lg:grid-cols-2">

              {/* You teach */}
              <Card className="border-[#F97316]/20 bg-[#1C1008]">

                <CardContent className="p-6">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10">
                      <GraduationCap className="h-5 w-5 text-[#F97316]" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F97316]">
                        Your contribution
                      </p>

                      <h3 className="text-lg font-bold text-[#FFF7ED]">
                        You Teach
                      </h3>
                    </div>

                  </div>

                  <div className="rounded-2xl border border-[#F97316]/20 bg-[#F97316]/5 p-5">

                    <div className="flex items-start gap-4">

                      {swap.teachingSkills?.skill_logo ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#52291A] bg-[#100905]">
                          <Image
                            src={swap.teachingSkills.skill_logo}
                            alt={swap.teachingSkills.name}
                            fill
                            sizes="64px"
                            className="object-contain p-2"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#52291A] bg-[#100905]">
                          <GraduationCap className="h-7 w-7 text-[#F97316]" />
                        </div>
                      )}

                      <div className="min-w-0">

                        <h4 className="text-lg font-bold text-[#FFF7ED]">
                          {swap.teachingSkills?.name}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                          {swap.teachingSkills?.description}
                        </p>

                      </div>

                    </div>

                  </div>

                </CardContent>
              </Card>

              {/* You learn */}
              <Card className="border-[#E59A0B]/20 bg-[#1C1008]">

                <CardContent className="p-6">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E59A0B]/10">
                      <BookOpen className="h-5 w-5 text-[#E59A0B]" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#E59A0B]">
                        Your learning goal
                      </p>

                      <h3 className="text-lg font-bold text-[#FFF7ED]">
                        You Learn
                      </h3>
                    </div>

                  </div>

                  <div className="rounded-2xl border border-[#E59A0B]/20 bg-[#E59A0B]/5 p-5">

                    <div className="flex items-start gap-4">

                      {swap.learningSkills?.skill_logo ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#52291A] bg-[#100905]">
                          <Image
                            src={swap.learningSkills.skill_logo}
                            alt={swap.learningSkills.name}
                            fill
                            sizes="64px"
                            className="object-contain p-2"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#52291A] bg-[#100905]">
                          <BookOpen className="h-7 w-7 text-[#E59A0B]" />
                        </div>
                      )}

                      <div className="min-w-0">

                        <h4 className="text-lg font-bold text-[#FFF7ED]">
                          {swap.learningSkills?.name}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                          {swap.learningSkills?.description}
                        </p>

                      </div>

                    </div>

                  </div>

                </CardContent>
              </Card>

            </div>

            {/* ===================================================== */}
            {/* SWAP TIMELINE */}
            {/* ===================================================== */}

            <Card className="border-[#52291A] bg-[#1C1008]">

              <CardContent className="p-6">

                <div className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F97316]">
                    Exchange Timeline
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-[#FFF7ED]">
                    Your current swap
                  </h3>
                </div>

                <div className="relative">

                  {/* line */}
                  <div className="absolute left-3 top-3 hidden h-[calc(100%-24px)] w-px bg-[#52291A] sm:block" />

                  <div className="space-y-6">

                    {/* Started */}
                    <div className="relative flex gap-4">

                      <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#F97316]/10">
                        <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#FFF7ED]">
                          Swap started
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#78716C]">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDateTime(swap.startDate)}
                        </p>
                      </div>

                    </div>

                    {/* Current */}
                    <div className="relative flex gap-4">

                      <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-green-500/40 bg-green-500/10">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-green-400">
                          Exchange in progress
                        </p>

                        <p className="mt-1 text-xs text-[#78716C]">
                          You and your partner can complete or cancel
                          this swap.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </CardContent>
            </Card>

            {/* ===================================================== */}
            {/* ACTIONS */}
            {/* ===================================================== */}

            <Card className="border-[#52291A] bg-[#140B05]">

              <CardContent className="p-6">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <h3 className="text-base font-bold text-[#FFF7ED]">
                      Manage this swap
                    </h3>

                    <p className="mt-1 max-w-xl text-xs leading-5 text-[#78716C]">
                      Once the skill exchange is finished, mark it as
                      completed. If the exchange cannot continue, you
                      can cancel it instead.
                    </p>

                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">

                    {/* ================================================= */}
                    {/* CANCEL */}
                    {/* ================================================= */}

                    <AlertDialog>

                      <AlertDialogTrigger >
                        <Button
                          variant="outline"
                          className="border-red-500/30 bg-red-500/5 text-sm text-red-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Swap
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="border-[#52291A] bg-[#1C1008] text-[#FFF7ED]">

                        <AlertDialogHeader>

                          <AlertDialogTitle>
                            Cancel this swap?
                          </AlertDialogTitle>

                          <AlertDialogDescription className="text-[#A8A29E]">
                            This will end the active skill exchange with{" "}
                            <span className="font-semibold text-[#FFF7ED]">
                              {swap.receiverUser?.name}
                            </span>
                            . The swap will be moved to your history.
                          </AlertDialogDescription>

                        </AlertDialogHeader>

                        <AlertDialogFooter>

                          <AlertDialogCancel className="border-[#52291A] bg-transparent text-[#A8A29E] hover:bg-[#52291A]/20 hover:text-[#FFF7ED]">
                            Keep Swap
                          </AlertDialogCancel>

                          <AlertDialogAction
                            onClick={handleCancelSwap}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Cancel Swap
                          </AlertDialogAction>

                        </AlertDialogFooter>

                      </AlertDialogContent>

                    </AlertDialog>

                    {/* ================================================= */}
                    {/* COMPLETE */}
                    {/* ================================================= */}

                    <AlertDialog>

                      <AlertDialogTrigger >
                        <Button
                          className="bg-linear-to-r from-[#F97316] to-[#E59A0B] text-sm font-semibold text-[#1C1008] hover:opacity-90"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Complete Swap
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="border-[#52291A] bg-[#1C1008] text-[#FFF7ED]">

                        <AlertDialogHeader>

                          <AlertDialogTitle>
                            Complete this swap?
                          </AlertDialogTitle>

                          <AlertDialogDescription className="text-[#A8A29E]">
                            Confirm that you have completed your skill
                            exchange with{" "}
                            <span className="font-semibold text-[#FFF7ED]">
                              {swap.receiverUser?.name}
                            </span>
                            . Once completed, the swap will move to your
                            history and you can review the exchange.
                          </AlertDialogDescription>

                        </AlertDialogHeader>

                        <AlertDialogFooter>

                          <AlertDialogCancel className="border-[#52291A] bg-transparent text-[#A8A29E] hover:bg-[#52291A]/20 hover:text-[#FFF7ED]">
                            Not Yet
                          </AlertDialogCancel>

                          <AlertDialogAction
                            onClick={handleCompleteSwap}
                            className="bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90"
                          >
                            Complete Swap
                          </AlertDialogAction>

                        </AlertDialogFooter>

                      </AlertDialogContent>

                    </AlertDialog>

                  </div>

                </div>

              </CardContent>
            </Card>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ActiveSwap;