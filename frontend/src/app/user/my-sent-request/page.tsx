"use client";

import { useCancelRequest, useGetSentRequest } from "@/hooks/useSwapRequest";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MessageSquare,
  Send,
  UserRound,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SentRequestsInterface } from "@/typescript/interface/swapRequest.interface";
import { Spinner } from "@/components/ui/spinner";



const MySentRequest = () => {
  const { data, isLoading, isError, error } = useGetSentRequest();
  const {mutate:cancelRequest, isPending} = useCancelRequest()

  const requests = data?.data || [];


  const handleCancelRequest = async(id:string)=>{
    cancelRequest(id)

  }

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
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ================= HEADER ================= */}
        <div className="border-b border-[#52291A]/60 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                SkillSwap Requests
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-[#FFF7ED] sm:text-3xl">
                My Sent Requests
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8A29E]">
                Track the skill exchange requests you&apos;ve sent and see
                whether other members have accepted, rejected, or are still
                reviewing them.
              </p>
            </div>

            {!isLoading && !isError && requests.length > 0 && (
              <div className="flex h-10 w-fit items-center gap-2 rounded-xl border border-[#52291A] bg-[#1C1008] px-4">
                <Send className="h-4 w-4 text-[#F97316]" />

                <span className="text-sm font-semibold text-[#FFF7ED]">
                  {requests.length}
                </span>

                <span className="text-xs text-[#A8A29E]">
                  {requests.length === 1 ? "Request" : "Requests"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= LOADING ================= */}
        {isLoading && (
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden border-[#52291A] bg-[#1C1008]"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    {/* Receiver skeleton */}
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-16 w-16 shrink-0 rounded-full bg-[#52291A]/40" />

                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-32 bg-[#52291A]/40" />
                        <Skeleton className="h-4 w-24 bg-[#52291A]/40" />
                        <Skeleton className="h-3 w-40 bg-[#52291A]/40" />
                      </div>
                    </div>

                    {/* Request skeleton */}
                    <div className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Skeleton className="h-24 rounded-xl bg-[#52291A]/40" />
                        <Skeleton className="h-24 rounded-xl bg-[#52291A]/40" />
                      </div>

                      <Skeleton className="h-16 rounded-xl bg-[#52291A]/40" />

                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24 bg-[#52291A]/40" />
                        <Skeleton className="h-8 w-24 rounded-lg bg-[#52291A]/40" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ================= ERROR ================= */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-red-500/30 bg-[#1C1008]">
              <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                  <Send className="h-7 w-7 text-red-400" />
                </div>

                <h2 className="text-lg font-semibold text-[#FFF7ED]">
                  Unable to load sent requests
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                  Something went wrong while fetching your sent swap requests.
                  Please try again.
                </p>

                {error instanceof Error && (
                  <p className="mt-2 text-xs text-red-400">{error.message}</p>
                )}

                <Button
                  onClick={() => window.location.reload()}
                  className="mt-5 bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ================= EMPTY ================= */}
        {!isLoading && !isError && requests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-[#52291A] bg-[#1C1008]">
              <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316]/10">
                  <Send className="h-7 w-7 text-[#F97316]" />
                </div>

                <h2 className="text-xl font-semibold text-[#FFF7ED]">
                  No sent requests yet
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#A8A29E]">
                  You haven&apos;t sent any skill exchange requests yet. Explore
                  the community and find someone whose skills match what you
                  want to learn.
                </p>

                <Button className="mt-6 bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90">
                  <Link href="/user/discovery">
                    Discover People
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ================= REQUEST LIST ================= */}
        {!isLoading && !isError && requests.length > 0 && (
          <div className="space-y-5">
            {requests.map((request: SentRequestsInterface, index: number) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -3 }}
              >
                <Card className="group overflow-hidden border-[#52291A] bg-[#1C1008] transition-all duration-300 hover:border-[#6B3515] hover:shadow-xl hover:shadow-black/20">
                  {/* Top accent */}
                  <div className="h-1 bg-linear-to-r from-[#F97316] via-[#E59A0B] to-[#52291A]" />

                  <CardContent className="p-5 sm:p-6">
                    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                      {/* ================= RECEIVER ================= */}
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#52291A] bg-[#100905] transition-all duration-300 group-hover:border-[#F97316]">
                            {request.receiverUser?.avatar_image ? (
                              <Image
                                src={request.receiverUser.avatar_image}
                                alt={request.receiverUser.name}
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <UserRound className="h-7 w-7 text-[#52291A]" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <h2 className="truncate text-base font-bold text-[#FFF7ED] transition-colors group-hover:text-[#F97316]">
                              {request.receiverUser?.name}
                            </h2>

                            <Badge className="mt-1 border-[#E59A0B]/30 bg-[#E59A0B]/10 text-[10px] text-[#E59A0B]">
                              {request.receiverUser?.experience}
                            </Badge>
                          </div>
                        </div>

                        {/* Receiver bio */}
                        {request.receiverUser?.bio && (
                          <p className="mt-4 line-clamp-3 text-xs leading-5 text-[#A8A29E]">
                            {request.receiverUser.bio}
                          </p>
                        )}

                        <Button
                          variant="outline"
                          className="mt-4  w-fit border-[#52291A] bg-transparent text-xs text-[#A8A29E] hover:border-[#F97316] hover:bg-[#F97316]/5 hover:text-[#F97316]"
                        >
                          <Link
                            className="flex flex-row gap-1"
                            href={`/user/users/${request.receiverUser?._id}`}
                          >
                            View Profile
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>

                      {/* ================= REQUEST DETAILS ================= */}
                      <div className="space-y-4">
                        {/* Status + Date */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <Badge
                            className={`${getStatusStyle(
                              request.status,
                            )} px-3 py-1 text-xs capitalize`}
                          >
                            {request.status}
                          </Badge>

                          <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(request.createdAt)}
                          </div>
                        </div>

                        {/* Skill exchange */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          {/* Teaching */}
                          <div className="rounded-2xl border border-[#F97316]/20 bg-[#F97316]/5 p-4">
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F97316]/10">
                                <GraduationCap className="h-4 w-4 text-[#F97316]" />
                              </div>

                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F97316]">
                                You teach
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              {request.teachingSkills?.skill_logo && (
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#52291A] bg-[#100905]">
                                  <Image
                                    src={request.teachingSkills.skill_logo}
                                    alt={request.teachingSkills.name}
                                    fill
                                    sizes="40px"
                                    className="object-contain p-1.5"
                                  />
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#FFF7ED]">
                                  {request.teachingSkills?.name}
                                </p>

                                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#A8A29E]">
                                  {request.teachingSkills?.description}
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

                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E59A0B]">
                                You learn
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              {request.learningSkills?.skill_logo && (
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#52291A] bg-[#100905]">
                                  <Image
                                    src={request.learningSkills.skill_logo}
                                    alt={request.learningSkills.name}
                                    fill
                                    sizes="40px"
                                    className="object-contain p-1.5"
                                  />
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#FFF7ED]">
                                  {request.learningSkills?.name}
                                </p>

                                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#A8A29E]">
                                  {request.learningSkills?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        {request.message && (
                          <div className="rounded-2xl border border-[#52291A]/70 bg-[#100905] p-4">
                            <div className="mb-2 flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-[#F97316]" />

                              <span className="text-xs font-semibold text-[#FFF7ED]">
                                Your Message
                              </span>
                            </div>

                            <p className="text-sm leading-6 text-[#A8A29E]">
                              &quot;{request.message}&quot;
                            </p>
                          </div>
                        )}

                        {/* Bottom */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#52291A]/50 pt-4">
                          <div className="text-xs text-[#78716C]">
                            Request ID:
                            <span className="ml-1 font-mono text-[#A8A29E]">
                              {request._id}
                            </span>
                          </div>

                          {request.status === "pending" && (
                            <Button
                      
                            onClick={()=> handleCancelRequest(request._id)}
                              variant="outline"
                              className="border-red-500/30 cursor-pointer bg-red-500/5 text-xs text-red-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
                            >
                              {isPending ? <Spinner /> : "Cancel Request"}
                            </Button>
                          )}

                          {request.status === "accepted" && (
                            <Button className="bg-linear-to-r  from-[#F97316] to-[#E59A0B] text-xs font-semibold text-[#1C1008] hover:opacity-90">
                              <Link
                                className="flex flex-row gap-1"
                                href="/user/active-swap"
                              >
                                View Active Swap
                                <ArrowRight className="ml-2 h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
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

export default MySentRequest;
