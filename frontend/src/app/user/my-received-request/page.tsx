"use client";

import { useAcceptSwapRequest, useGetReceivedRequest, useRejectSwapRequest } from "@/hooks/useSwapRequest";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  GraduationCap,
  Inbox,
  MessageSquare,
  UserRound,
  X,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ReceivedRequestsInterface } from "@/typescript/interface/swapRequest.interface";
import { Spinner } from "@/components/ui/spinner";

const MyReceivedRequest = () => {
  const { data, isLoading, isError, error } = useGetReceivedRequest();
  const {mutate: accetpRequesMutate, isPending:acceptIsPending} = useAcceptSwapRequest()
  const {mutate: rejectRequestMutate, isPending:rejectIsPending} = useRejectSwapRequest()

 

  const requests = data?.data || [];

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "border-green-500/30 bg-green-500/10 text-green-400";

      case "rejected":
        return "border-red-500/30 bg-red-500/10 text-red-400";

      case "cancelled":
        return "border-[#78716C]/30 bg-[#78716C]/10 text-[#A8A29E]";

      case "pending":
      default:
        return "border-[#E59A0B]/30 bg-[#E59A0B]/10 text-[#E59A0B]";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="relative overflow-hidden rounded-3xl border border-[#52291A]/70 bg-[#140B05] p-6 sm:p-8">

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#F97316]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-[#E59A0B]/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316]/10">
                  <Inbox className="h-4 w-4 text-[#F97316]" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                  SkillSwap Inbox
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#FFF7ED] sm:text-3xl">
                Received Requests
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8A29E]">
                Review skill exchange requests from other members and decide
                whether you want to start a new learning partnership.
              </p>
            </div>

            {!isLoading && !isError && requests.length > 0 && (
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#52291A] bg-[#1C1008] px-5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E59A0B]/10">
                  <Inbox className="h-4 w-4 text-[#E59A0B]" />
                </div>

                <div>
                  <p className="text-lg font-bold leading-none text-[#FFF7ED]">
                    {requests.length}
                  </p>

                  <p className="mt-1 text-[11px] text-[#A8A29E]">
                    {requests.length === 1
                      ? "Received Request"
                      : "Received Requests"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* LOADING */}
        {/* ========================================================= */}

        {isLoading && (
          <div className="grid gap-5 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden border-[#52291A] bg-[#1C1008]"
              >
                <CardContent className="p-5">

                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full bg-[#52291A]/40" />

                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-36 bg-[#52291A]/40" />
                      <Skeleton className="h-4 w-24 bg-[#52291A]/40" />
                      <Skeleton className="h-3 w-48 bg-[#52291A]/40" />
                    </div>

                    <Skeleton className="h-7 w-20 rounded-full bg-[#52291A]/40" />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Skeleton className="h-28 rounded-2xl bg-[#52291A]/40" />
                    <Skeleton className="h-28 rounded-2xl bg-[#52291A]/40" />
                  </div>

                  <Skeleton className="mt-4 h-20 rounded-2xl bg-[#52291A]/40" />

                  <div className="mt-4 flex justify-end gap-3">
                    <Skeleton className="h-9 w-24 rounded-lg bg-[#52291A]/40" />
                    <Skeleton className="h-9 w-24 rounded-lg bg-[#52291A]/40" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* ERROR */}
        {/* ========================================================= */}

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-red-500/30 bg-[#1C1008]">
              <CardContent className="flex min-h-72 flex-col items-center justify-center px-6 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                  <Inbox className="h-7 w-7 text-red-400" />
                </div>

                <h2 className="text-xl font-semibold text-[#FFF7ED]">
                  Unable to load received requests
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                  Something went wrong while fetching your received swap
                  requests. Please try again.
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

        {/* ========================================================= */}
        {/* EMPTY */}
        {/* ========================================================= */}

        {!isLoading && !isError && requests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-[#52291A] bg-[#1C1008]">
              <CardContent className="flex min-h-80 flex-col items-center justify-center px-6 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316]/10">
                  <Inbox className="h-7 w-7 text-[#F97316]" />
                </div>

                <h2 className="text-xl font-semibold text-[#FFF7ED]">
                  No requests received yet
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                  When another member sends you a skill exchange request,
                  it will appear here.
                </p>

                <Button
                  className="mt-6 bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90"
                >
                  <Link className="flex flex-row gap-1" href="/user/discovery">
                    Explore Community
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* REQUEST CARDS */}
        {/* ========================================================= */}

        {!isLoading && !isError && requests.length > 0 && (
          <div className="grid gap-5 xl:grid-cols-2">

            {requests.map((request: ReceivedRequestsInterface, index: number) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
              >
                <Card className="group relative h-full overflow-hidden border-[#52291A] bg-[#1C1008] transition-all duration-300 hover:-translate-y-1 hover:border-[#6B3515] hover:shadow-xl hover:shadow-black/20">

                  {/* Top accent */}
                  <div className="h-1 bg-linear-to-r from-[#E59A0B] via-[#F97316] to-[#52291A]" />

                  <CardContent className="p-5 sm:p-6">

                    {/* ================================================= */}
                    {/* REQUESTER HEADER */}
                    {/* ================================================= */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-center gap-4">

                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#52291A] bg-[#100905] transition-all duration-300 group-hover:border-[#E59A0B]">

                          {request.senderUser?.avatar_image ? (
                            <Image
                              src={request.senderUser.avatar_image}
                              alt={request.senderUser?.name || "User"}
                              fill
                              sizes="64px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <UserRound className="h-7 w-7 text-[#52291A]" />
                            </div>
                          )}

                          {/* Online indicator */}
                          {request.senderUser?.status === "active" && (
                            <span className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-[#1C1008] bg-green-500" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate text-base font-bold text-[#FFF7ED] transition-colors group-hover:text-[#F97316]">
                            {request.senderUser?.name}
                          </h2>

                          {request.senderUser?.experience && (
                            <Badge className="mt-1 border-[#E59A0B]/30 bg-[#E59A0B]/10 text-[10px] text-[#E59A0B]">
                              {request.senderUser.experience}
                            </Badge>
                          )}

                          {request.senderUser?.bio && (
                            <p className="mt-1 line-clamp-1 text-xs text-[#78716C]">
                              {request.senderUser.bio}
                            </p>
                          )}
                        </div>
                      </div>

                      <Badge
                        className={`${getStatusStyle(
                          request.status
                        )} shrink-0 px-3 py-1 text-[10px] capitalize`}
                      >
                        {request.status}
                      </Badge>
                    </div>

                    {/* ================================================= */}
                    {/* DATE + PROFILE */}
                    {/* ================================================= */}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#52291A]/50 pb-4">

                      <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Received {formatDate(request.createdAt)}
                      </div>

                      <Button
                        variant="ghost"
                        className="h-8 px-2 text-xs text-[#A8A29E] hover:bg-[#F97316]/5 hover:text-[#F97316]"
                      >
                        <Link
                          href={`/user/users/${request.senderUser?._id}`}
                        >
                          View Profile
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>

                    {/* ================================================= */}
                    {/* SKILL EXCHANGE */}
                    {/* ================================================= */}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                      {/* Sender teaches */}
                      <div className="rounded-2xl border border-[#F97316]/20 bg-[#F97316]/5 p-4">

                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F97316]/10">
                            <GraduationCap className="h-4 w-4 text-[#F97316]" />
                          </div>

                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316]">
                            They teach
                          </span>
                        </div>

                        <div className="flex items-start gap-3">

                          {request.teachingSkills?.skill_logo ? (
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#52291A] bg-[#100905]">
                              <Image
                                src={request.teachingSkills.skill_logo}
                                alt={request.teachingSkills.name}
                                fill
                                sizes="44px"
                                className="object-contain p-1.5"
                              />
                            </div>
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#52291A] bg-[#100905]">
                              <GraduationCap className="h-5 w-5 text-[#F97316]" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#FFF7ED]">
                              {request.teachingSkills?.name}
                            </p>

                            <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-[#A8A29E]">
                              {request.teachingSkills?.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sender wants to learn */}
                      <div className="rounded-2xl border border-[#E59A0B]/20 bg-[#E59A0B]/5 p-4">

                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E59A0B]/10">
                            <BookOpen className="h-4 w-4 text-[#E59A0B]" />
                          </div>

                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E59A0B]">
                            They learn
                          </span>
                        </div>

                        <div className="flex items-start gap-3">

                          {request.learningSkills?.skill_logo ? (
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#52291A] bg-[#100905]">
                              <Image
                                src={request.learningSkills.skill_logo}
                                alt={request.learningSkills.name}
                                fill
                                sizes="44px"
                                className="object-contain p-1.5"
                              />
                            </div>
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#52291A] bg-[#100905]">
                              <BookOpen className="h-5 w-5 text-[#E59A0B]" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#FFF7ED]">
                              {request.learningSkills?.name}
                            </p>

                            <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-[#A8A29E]">
                              {request.learningSkills?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================================================= */}
                    {/* MESSAGE */}
                    {/* ================================================= */}

                    {request.message && (
                      <div className="mt-4 rounded-2xl border border-[#52291A]/70 bg-[#100905] p-4">

                        <div className="mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-[#F97316]" />

                          <span className="text-xs font-semibold text-[#FFF7ED]">
                            Message from {request.senderUser?.name}
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-[#A8A29E]">
                          &quot;{request.message}&quot;
                        </p>
                      </div>
                    )}

                    {/* ================================================= */}
                    {/* ACTIONS */}
                    {/* ================================================= */}

                    <div className="mt-5 flex flex-col gap-3 border-t border-[#52291A]/50 pt-4 sm:flex-row sm:items-center sm:justify-between">

                      <p className="text-[10px] font-mono text-[#57534E]">
                        ID: {request._id}
                      </p>

                      {/* Pending actions */}
                      {request.status === "pending" && (
                        <div className="flex gap-2">

                          <Button
                            variant="outline"
                            className="border-red-500/30 cursor-pointer bg-red-500/5 text-xs text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
                            onClick={() => {
                               rejectRequestMutate(request._id)
                            }}
                          >
                            <X className="mr-1.5 h-3.5 w-3.5" />
                           {rejectIsPending ? <Spinner /> : "Reject"} 
                          </Button>

                          <Button
                            className="bg-linear-to-r cursor-pointer from-[#F97316] to-[#E59A0B] text-xs font-semibold text-[#1C1008] transition-all hover:opacity-90"
                            onClick={() => {
                              accetpRequesMutate(request._id)
                            }}
                          >
                            <Check className="mr-1.5 h-3.5 w-3.5" />
                          {acceptIsPending ? <Spinner /> : "Accept Request"}  
                          </Button>

                        </div>
                      )}

                      {/* Accepted */}
                      {request.status === "accepted" && (
                        <Button
                          className="bg-linear-to-r from-[#F97316] to-[#E59A0B] text-xs font-semibold text-[#1C1008] hover:opacity-90"
                        >
                          <Link className="flex gap-2" href="/user/active-swap">
                            View Active Swap
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      )}

                      {/* Rejected / cancelled */}
                      {(request.status === "rejected" ||
                        request.status === "cancelled") && (
                        <span className="text-xs text-[#78716C]">
                          This request is no longer active.
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReceivedRequest;