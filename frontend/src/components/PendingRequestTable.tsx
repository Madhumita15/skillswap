
"use client";

import Image from "next/image";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Skill {
  _id: string;
  name: string;
  description: string;
  skill_logo: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  status: string;
  avatar_image?: string;
}

interface PendingRequest {
  _id: string;
  createdAt: string;
  message: string;
  senderId: string;
  status: string;
  teachingSkills: Skill;
  learningSkills: Skill;
  senderUser?: User;
  receiverUser?: User;
}

interface PendingRequestTableProps {
  title: string;
  description: string;
  requests: PendingRequest[];
  type: "received" | "sent";
  isLoading: boolean;
  isError: boolean;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const RequestSkeleton = () => {
  return (
    <div className="space-y-4 rounded-xl border border-white/5 bg-[#120C07] p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full bg-white/10" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-28 bg-white/10" />
          <Skeleton className="h-3 w-36 bg-white/10" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-16 rounded-lg bg-white/10" />
        <Skeleton className="h-16 rounded-lg bg-white/10" />
      </div>

      <Skeleton className="h-14 w-full rounded-lg bg-white/10" />
    </div>
  );
};

const PendingRequestTable = ({
  title,
  description,
  requests,
  type,
  isLoading,
  isError,
}: PendingRequestTableProps) => {
  const isReceived = type === "received";

  return (
    <Card
      className="
        overflow-hidden
        border-[#F97316]/15
        bg-[#120C07]
        text-white
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      "
    >
      {/* Header */}
      <CardHeader
        className="
          border-b
          border-white/5
          bg-[#17100A]
          px-5
          py-4
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F97316]/10
                  text-[#F97316]
                "
              >
                {isReceived ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </span>

              {title}
            </CardTitle>

            <p className="mt-1 text-xs text-white/40">
              {description}
            </p>
          </div>

          {/* Count */}
          <div
            className="
              flex
              h-8
              min-w-8
              items-center
              justify-center
              rounded-full
              border
              border-[#F97316]/20
              bg-gradient-to-r
              from-[#F97316]/10
              to-[#E59A0B]/10
              px-2
              text-sm
              font-bold
              text-[#F97316]
            "
          >
            {requests.length}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <RequestSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <MessageSquare className="h-5 w-5" />
            </div>

            <p className="mt-3 text-sm font-medium text-white">
              Unable to load requests
            </p>

            <p className="mt-1 text-xs text-white/40">
              Please try again later.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && requests.length === 0 && (
          <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[#F97316]/15
                bg-[#F97316]/5
                text-[#F97316]
              "
            >
              {isReceived ? (
                <ArrowDownLeft className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              No pending requests
            </p>

            <p className="mt-1 max-w-xs text-xs text-white/40">
              {isReceived
                ? "You don't have any incoming requests waiting for your response."
                : "You don't have any sent requests waiting for a response."}
            </p>
          </div>
        )}

        {/* Requests */}
        {!isLoading && !isError && requests.length > 0 && (
          <div className="space-y-3">
            {requests.map((request) => {
              /*
                Received:
                We care about senderUser.

                Sent:
                We care about receiverUser.
              */
              const user = isReceived
                ? request.senderUser
                : request.receiverUser;

              return (
                <div
                  key={request._id}
                  className="
                    group
                    rounded-xl
                    border
                    border-white/5
                    bg-[#0B0804]
                    p-4
                    transition-all
                    duration-300
                    hover:border-[#F97316]/30
                    hover:bg-[#100A05]
                    hover:shadow-[0_8px_25px_rgba(249,115,22,0.06)]
                  "
                >
                  {/* User */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#F97316]/20 bg-[#F97316]/10">
                        {user?.avatar_image ? (
                          <Image
                            src={user.avatar_image}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#F97316]">
                            {user?.name?.charAt(0).toUpperCase() ?? "U"}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {user?.name ?? "Unknown User"}
                        </p>

                        <p className="truncate text-xs text-white/40">
                          {user?.email ?? "No email"}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="hidden shrink-0 items-center gap-1.5 text-xs text-white/35 sm:flex">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(request.createdAt)}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {/* Teaching */}
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        border
                        border-[#F97316]/10
                        bg-[#F97316]/5
                        p-3
                      "
                    >
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#F97316]/10">
                        <Image
                          src={request.teachingSkills.skill_logo}
                          alt={request.teachingSkills.name}
                          fill
                          className="object-contain p-1.5"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-[#F97316]/70">
                          Can teach
                        </p>

                        <p className="truncate text-xs font-semibold text-white">
                          {request.teachingSkills.name}
                        </p>
                      </div>
                    </div>

                    {/* Learning */}
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        border
                        border-[#E59A0B]/10
                        bg-[#E59A0B]/5
                        p-3
                      "
                    >
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#E59A0B]/10">
                        <Image
                          src={request.learningSkills.skill_logo}
                          alt={request.learningSkills.name}
                          fill
                          className="object-contain p-1.5"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-[#E59A0B]/70">
                          Wants to learn
                        </p>

                        <p className="truncate text-xs font-semibold text-white">
                          {request.learningSkills.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div
                    className="
                      mt-3
                      rounded-lg
                      border
                      border-white/5
                      bg-white/[0.02]
                      p-3
                    "
                  >
                    <div className="flex gap-2">
                      <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F97316]/70" />

                      <p className="line-clamp-2 text-xs leading-relaxed text-white/55">
                        {request.message}
                      </p>
                    </div>
                  </div>

                  {/* Mobile date */}
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/30 sm:hidden">
                    <CalendarDays className="h-3 w-3" />
                    {formatDate(request.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingRequestTable;

