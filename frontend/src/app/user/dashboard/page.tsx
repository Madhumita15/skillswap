"use client";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle2,
  FileWarning,
  GraduationCap,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useGetUserDashboard } from "@/hooks/useDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import {
  DashboardData,
  StatCardProps,
} from "@/typescript/interface/dashboard.interface";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import {
  useGetReceivedRequest,
  useGetSentRequest,
} from "@/hooks/useSwapRequest";
import PendingRequestTable from "@/components/PendingRequestTable";
import {
  ReceivedRequestsInterface,
  SentRequestsInterface,
} from "@/typescript/interface/swapRequest.interface";

const UserDashboard = () => {
  const { data, isLoading, isError, error, refetch } = useGetUserDashboard();

  const {
    data: receivedRequestData,
    isLoading: receivedRequestIsLoading,
    isError: receivedRequestIsError,
  } = useGetReceivedRequest();
  const {
    data: sentRequestData,
    isLoading: sentRequestIsLoading,
    isError: sentRequestIsError,
  } = useGetSentRequest();

  const pendingReceivedRequestData = receivedRequestData?.data.filter(
    (data: ReceivedRequestsInterface) => data.status === "pending",
  );
  const pendingSentRequestData = sentRequestData?.data.filter(
    (data: SentRequestsInterface) => data.status === "pending",
  );
  console.log("pendingReceivedRequestData", receivedRequestData?.data);
  console.log("pendingSentRequestData", sentRequestData?.data);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="mb-8 space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          <DashboardSkeleton />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
          <Card className="w-full max-w-md border-[#F97316]/20 bg-[#0B0804] text-white">
            <CardContent className="flex flex-col items-center px-6 py-10 text-center">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500/10
                  text-red-500
                "
              >
                <XCircle className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                Failed to load dashboard
              </h2>

              <p className="mt-2 text-sm text-white/50">
                We couldnt fetch your dashboard information. Please try again.
              </p>

              {error instanceof Error && (
                <p className="mt-3 text-xs text-red-400">{error.message}</p>
              )}

              <Button
                onClick={() => refetch()}
                className="
                  mt-6
                  gap-2
                  border-0
                  bg-gradient-to-r
                  from-[#F97316]
                  to-[#E59A0B]
                  text-white
                  hover:opacity-90
                  focus-visible:ring-[#F97316]
                "
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const dashboard: DashboardData = data?.data;

  const stats: StatCardProps[] = [
    {
      title: "Pending Received Requests",
      value: dashboard?.pendingReceivedRequests ?? 0,
      description: "Requests waiting for your response",
      icon: ArrowDownLeft,
    },
    {
      title: "Pending Sent Requests",
      value: dashboard?.pendingSentRequests ?? 0,
      description: "Requests waiting for acceptance",
      icon: ArrowUpRight,
    },
    {
      title: "Accepted Requests",
      value: dashboard?.totalAcceptRequest ?? 0,
      description: "Requests successfully accepted",
      icon: CheckCircle2,
    },
    {
      title: "Completed Swaps",
      value: dashboard?.totalCompletedSwap ?? 0,
      description: "Successfully completed skill swaps",
      icon: Award,
    },
    {
      title: "Learning Skills",
      value: dashboard?.totalLearningSkills ?? 0,
      description: "Skills you want to learn",
      icon: BookOpen,
    },
    {
      title: "Rejected Requests",
      value: dashboard?.totalRejectRequest ?? 0,
      description: "Requests that were rejected",
      icon: XCircle,
    },
    {
      title: "Reports",
      value: dashboard?.totalReports ?? 0,
      description: "Reports submitted by you",
      icon: FileWarning,
    },
    {
      title: "Teaching Skills",
      value: dashboard?.totalTeachingSkills ?? 0,
      description: "Skills you can teach others",
      icon: GraduationCap,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0804] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-[#F97316]">
                SkillSwap
              </p>

              <h1 className="text-2xl font-bold text-white tracking-tight  sm:text-3xl">
                Dashboard
              </h1>

              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Overview of your skills, requests, swaps and activity.
              </p>
            </div>

            {/* Small brand accent */}
            <div
              className="
                hidden
                h-1
                w-24
                rounded-full
                bg-gradient-to-r
                from-[#F97316]
                to-[#E59A0B]
                sm:block
              "
            />
          </div>
        </div>

        {/* Statistics */}
        <section>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </section>

        {/* Bottom Highlight */}
        <section className="mt-6">
          <Card
            className="
              overflow-hidden
              border-[#F97316]/20
              bg-[#241a0d]
              text-white
              shadow-md
            "
          >
            <CardContent className="p-5 sm:p-6 ">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#F97316]">
                    Skill Profile
                  </p>

                  <h2 className="mt-1 text-lg font-semibold">
                    Your SkillSwap journey
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Keep improving your skills and connect with more learners
                    and teachers.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="rounded-lg border border-[#F97316]/20 bg-[#F97316]/5 px-4 py-3">
                    <p className="text-xs text-white/40">Teaching</p>

                    <p className="mt-1 text-xl font-bold text-[#F97316]">
                      {dashboard?.totalTeachingSkills ?? 0}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#E59A0B]/20 bg-[#E59A0B]/5 px-4 py-3">
                    <p className="text-xs text-white/40">Learning</p>

                    <p className="mt-1 text-xl font-bold text-[#E59A0B]">
                      {dashboard?.totalLearningSkills ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pending Requests */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Pending Requests
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Manage incoming and outgoing skill exchange requests.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Received Requests */}
            <PendingRequestTable
              title="Received Requests"
              description="People who want to learn from you"
              requests={pendingReceivedRequestData ?? []}
              type="received"
              isLoading={receivedRequestIsLoading}
              isError={receivedRequestIsError}
            />

            {/* Sent Requests */}
            <PendingRequestTable
              title="Sent Requests"
              description="People you have requested to learn from"
              requests={pendingSentRequestData ?? []}
              type="sent"
              isLoading={sentRequestIsLoading}
              isError={sentRequestIsError}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default UserDashboard;
