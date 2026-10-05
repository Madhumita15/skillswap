"use client";

import { useProfile, useUserGetById } from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  Flag,
  GraduationCap,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Skill } from "@/typescript/interface/skill.interface";
import { useState } from "react";
import SendRequestDialog from "@/components/SendRequestDialog";
import { useGetReceivedRequest, useGetSentRequest } from "@/hooks/useSwapRequest";
import { useGetSwapHistory } from "@/hooks/useSwaps";
import { SwapInterface } from "@/typescript/interface/swap.interface";
import ReportDialog from "@/components/ReportDialog";

const UserById = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const userId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, isError, error } = useUserGetById({ id: userId });
  const user = data?.data?.data[0];
  const [reportOpen, setReportOpen] = useState(false)

  const { data: sendRequestData } = useGetSentRequest();
  const { data: profileData } = useProfile();
  const { data: swapHistoryData } = useGetSwapHistory({ page: 0, limit: 0 });
  const { data: receivedRequestData } = useGetReceivedRequest();

  const relatedRequests = [
    ...(sendRequestData?.data ?? []),
    ...(receivedRequestData?.data ?? []),
  ];

  const userRequests = relatedRequests?.filter(
    (request) =>
      (String(request.senderId) === profileData?.data[0]._id &&
        request.receiverUser._id === id) ||
      (String(request.receiverId) === profileData?.data[0]._id &&
        request.senderUser._id === id),
  );

  const hasPendingRequest = userRequests.some(
    (request) => request.status === "pending",
  );

  const userSwaps = swapHistoryData?.data?.filter(
    (swap:SwapInterface) =>
      swap.senderUser._id === profileData?.data[0]._id &&
      swap.receiverUser._id === id,
  );

  const hasActiveSwap = userSwaps?.some((swap:SwapInterface) => swap.status === "active");

  const requestCheck = hasPendingRequest || hasActiveSwap;

  return (
    <div className="min-h-screen bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 border-b border-[#52291A]/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              SkillSwap Community
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#FFF7ED] sm:text-3xl">
              Member Profile
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8A29E]">
              Explore this member&apos;s skills, experience, and learning
              interests to discover how you can exchange knowledge together.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-fit border-[#52291A] bg-[#1C1008] text-[#FFF7ED] hover:border-[#F97316] hover:bg-[#24140A] hover:text-[#F97316]"
          >
            <Link
              href="/user/discovery"
              className="flex flex-row cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Discovery
            </Link>
          </Button>
        </div>

        {/* ================= LOADING ================= */}
        {isLoading && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* Profile skeleton */}
            <Card className="border-[#52291A] bg-[#1C1008]">
              <CardHeader className="items-center text-center">
                <Skeleton className="h-28 w-28 rounded-full bg-[#52291A]/40" />

                <Skeleton className="mt-4 h-6 w-40 bg-[#52291A]/40" />

                <Skeleton className="mt-2 h-5 w-24 bg-[#52291A]/40" />
              </CardHeader>

              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full bg-[#52291A]/40" />
                <Skeleton className="h-4 w-5/6 bg-[#52291A]/40" />
                <Skeleton className="h-10 w-full rounded-xl bg-[#52291A]/40" />
              </CardContent>
            </Card>

            {/* Details skeleton */}
            <div className="space-y-6">
              <Card className="border-[#52291A] bg-[#1C1008]">
                <CardHeader>
                  <Skeleton className="h-6 w-40 bg-[#52291A]/40" />
                </CardHeader>

                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full bg-[#52291A]/40" />
                  <Skeleton className="h-4 w-11/12 bg-[#52291A]/40" />
                  <Skeleton className="h-4 w-4/5 bg-[#52291A]/40" />
                </CardContent>
              </Card>

              <Card className="border-[#52291A] bg-[#1C1008]">
                <CardHeader>
                  <Skeleton className="h-6 w-44 bg-[#52291A]/40" />
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-8 w-24 rounded-full bg-[#52291A]/40"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ================= ERROR ================= */}
        {isError && (
          <Card className="border-red-500/30 bg-[#1C1008]">
            <CardContent className="flex min-h-60 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                <UserRound className="h-7 w-7 text-red-400" />
              </div>

              <h2 className="text-lg font-semibold text-[#FFF7ED]">
                Unable to load profile
              </h2>

              <p className="mt-2 max-w-md text-sm text-[#A8A29E]">
                We couldn&apos;t find this member&apos;s profile. The user may
                no longer exist or something went wrong while fetching the
                profile.
              </p>

              {error instanceof Error && (
                <p className="mt-2 text-xs text-red-400">{error.message}</p>
              )}

              <Button className="cursor-pointer mt-5 bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] hover:opacity-90">
                <Link href="/user/discovery">Back to Discovery</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ================= USER PROFILE ================= */}
        {!isLoading && !isError && user && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* ================= LEFT PROFILE ================= */}
            <Card className="h-fit overflow-hidden border-[#52291A] bg-[#1C1008]">
              <div className="h-24 bg-linear-to-r from-[#52291A] via-[#F97316]/40 to-[#E59A0B]/30" />

              <div className="-mt-14 flex justify-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#1C1008] bg-[#100905] shadow-xl shadow-black/30">
                  {user.avatar_image ? (
                    <Image
                      src={user.avatar_image}
                      alt={`${user.name}'s profile`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <UserRound className="h-12 w-12 text-[#52291A]" />
                    </div>
                  )}
                </div>
              </div>

              <CardHeader className="pt-4 text-center">
                <h2 className="text-xl font-bold text-[#FFF7ED]">
                  {user.name}
                </h2>

                {user.experience && (
                  <Badge className="mx-auto mt-2 border-[#E59A0B]/30 bg-[#E59A0B]/10 text-[#E59A0B]">
                    {user.experience}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-3">
                  {user.email && (
                    <div className="flex items-center gap-3 rounded-xl border border-[#52291A]/60 bg-[#100905] p-3">
                      <Mail className="h-4 w-4 shrink-0 text-[#F97316]" />

                      <span className="truncate text-xs text-[#A8A29E]">
                        {user.email}
                      </span>
                    </div>
                  )}

                  {user.phone && (
                    <div className="flex items-center gap-3 rounded-xl border border-[#52291A]/60 bg-[#100905] p-3">
                      <Phone className="h-4 w-4 shrink-0 text-[#E59A0B]" />

                      <span className="text-xs text-[#A8A29E]">
                        {user.phone}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
  <Button
    disabled={requestCheck}
    onClick={() => setOpen(true)}
    className="w-full cursor-pointer bg-linear-to-r from-[#F97316] to-[#E59A0B] font-semibold text-[#1C1008] transition-all duration-300 hover:scale-[1.01] hover:opacity-90"
  >
    {requestCheck ? "Request Sent" : "Send Request"}
  </Button>

  <Button
    type="button"
    variant="outline"
    onClick={() => setReportOpen(true)}
    className="
      w-full
      cursor-pointer
      border-[#52291A]/70
      bg-transparent
      text-[#A8A29E]
      transition-all
      duration-200
      hover:border-red-500/40
      hover:bg-red-500/5
      hover:text-red-400
    "
  >
    <Flag className="mr-2 h-4 w-4" />
    Report User
  </Button>
  <ReportDialog open={reportOpen} setOpen={setReportOpen} reportedUserId={user._id}/>
</div>

                <SendRequestDialog
                  learningSkills={user.learningSkills}
                  teachingSkills={user.teachingSkills}
                  open={open}
                  setOpen={setOpen}
                  receiverId={user._id}
                />
              </CardContent>
            </Card>

            {/* ================= RIGHT DETAILS ================= */}
            <div className="space-y-6">
              {/* About */}
              <Card className="border-[#52291A] bg-[#1C1008]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10">
                      <UserRound className="h-5 w-5 text-[#F97316]" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#FFF7ED]">About</h3>

                      <p className="text-xs text-[#A8A29E]">
                        A little about this member
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-7 text-[#A8A29E]">
                    {user.bio || "No bio has been added yet."}
                  </p>
                </CardContent>
              </Card>

              {/* Teaching Skills */}
              <Card className="border-[#52291A] bg-[#1C1008]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10">
                      <GraduationCap className="h-5 w-5 text-[#F97316]" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#FFF7ED]">
                        Teaching Skills
                      </h3>

                      <p className="text-xs text-[#A8A29E]">
                        Skills this member can teach
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {user.teachingSkills?.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {user.teachingSkills.map((skill: Skill) => (
                        <div
                          key={skill._id}
                          className="
            group rounded-2xl
            border border-[#52291A]/70
            bg-[#100905]
            p-4
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#F97316]/60
            hover:bg-[#24140A]
          "
                        >
                          <div className="flex items-start gap-4">
                            {/* Skill Logo */}
                            <div
                              className="
                relative flex h-14 w-14 shrink-0
                items-center justify-center
                overflow-hidden rounded-xl
                border border-[#52291A]
                bg-[#1C1008]
                transition-all duration-300
                group-hover:border-[#F97316]
              "
                            >
                              {skill.skill_logo ? (
                                <Image
                                  src={skill.skill_logo}
                                  alt={skill.name}
                                  fill
                                  sizes="56px"
                                  className="object-contain p-2"
                                />
                              ) : (
                                <GraduationCap className="h-6 w-6 text-[#F97316]" />
                              )}
                            </div>

                            {/* Skill Information */}
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate text-sm font-semibold text-[#FFF7ED] transition-colors group-hover:text-[#F97316]">
                                {skill.name}
                              </h4>

                              <p className="mt-1 line-clamp-3 text-xs leading-5 text-[#A8A29E]">
                                {skill.description ||
                                  "No description available."}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#78716C]">
                      No teaching skills added.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Learning Skills */}
              <Card className="border-[#52291A] bg-[#1C1008]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E59A0B]/10">
                      <BookOpen className="h-5 w-5 text-[#E59A0B]" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#FFF7ED]">
                        Learning Skills
                      </h3>

                      <p className="text-xs text-[#A8A29E]">
                        Skills this member wants to learn
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {user.learningSkills?.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {user.learningSkills.map((skill: Skill) => (
                        <div
                          key={skill._id}
                          className="
            group rounded-2xl
            border border-[#52291A]/70
            bg-[#100905]
            p-4
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#E59A0B]/60
            hover:bg-[#24140A]
          "
                        >
                          <div className="flex items-start gap-4">
                            {/* Skill Logo */}
                            <div
                              className="
                relative flex h-14 w-14 shrink-0
                items-center justify-center
                overflow-hidden rounded-xl
                border border-[#52291A]
                bg-[#1C1008]
                transition-all duration-300
                group-hover:border-[#E59A0B]
              "
                            >
                              {skill.skill_logo ? (
                                <Image
                                  src={skill.skill_logo}
                                  alt={skill.name}
                                  fill
                                  sizes="56px"
                                  className="object-contain p-2"
                                />
                              ) : (
                                <BookOpen className="h-6 w-6 text-[#E59A0B]" />
                              )}
                            </div>

                            {/* Skill Information */}
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate text-sm font-semibold text-[#FFF7ED] transition-colors group-hover:text-[#E59A0B]">
                                {skill.name}
                              </h4>

                              <p className="mt-1 line-clamp-3 text-xs leading-5 text-[#A8A29E]">
                                {skill.description ||
                                  "No description available."}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#78716C]">
                      No learning skills added.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!isLoading && !isError && !user && (
          <Card className="border-[#52291A] bg-[#1C1008]">
            <CardContent className="flex min-h-60 flex-col items-center justify-center text-center">
              <UserRound className="mb-4 h-10 w-10 text-[#52291A]" />

              <h2 className="text-lg font-semibold text-[#FFF7ED]">
                Profile not found
              </h2>

              <p className="mt-2 text-sm text-[#A8A29E]">
                We couldn&apos;t find the requested SkillSwap member.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserById;
