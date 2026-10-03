"use client";

import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Inbox,
  Loader2,
  MessageSquare,
  RefreshCw,
  Search,
  User,
  X,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";

import Pagination from "@/layout/adminLayout/Pagination";

import {
  useSwapRequests,
} from "@/hooks/useAdminSwapRequest";

import {
  SwapRequest,
  SwapRequestStatus,
} from "@/typescript/interface/swapRequestAdmin.interface";

// ==========================================================
// CONSTANTS
// ==========================================================

const ITEMS_PER_PAGE = 6;

// ==========================================================
// STATUS CONFIG
// ==========================================================

const statusConfig: Record<
  SwapRequestStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  pending: {
    label: "Pending",
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    icon: Clock3,
  },

  accepted: {
    label: "Accepted",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    icon: CheckCircle2,
  },

  rejected: {
    label: "Rejected",
    className:
      "border-red-500/20 bg-red-500/10 text-red-400",
    icon: XCircle,
  },

  cancelled: {
    label: "Cancelled",
    className:
      "border-slate-500/20 bg-slate-500/10 text-slate-400",
    icon: XCircle,
  },

  completed: {
    label: "Completed",
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    icon: CheckCircle2,
  },
};

// ==========================================================
// PAGE
// ==========================================================

export default function SwapRequestManagementPage() {
  const [currentPage, setCurrentPage] =
    useState(1);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState<SwapRequest | null>(null);

  // ========================================================
  // TANSTACK QUERY
  // ========================================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useSwapRequests(
    currentPage,
    ITEMS_PER_PAGE,
  );

  // ========================================================
  // DATA
  // ========================================================

  const requests = data?.data ?? [];

  const totalRequests =
    data?.totalSwapRequest ?? 0;

  const totalPages =
    data?.totalPages ?? 0;

  // ========================================================
  // SEARCH
  // ========================================================

  const filteredRequests = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    if (!search) {
      return requests;
    }

    return requests.filter(
      (request) => {
        const senderName =
          request.senderUser?.name
            ?.toLowerCase() ?? "";

        const senderEmail =
          request.senderUser?.email
            ?.toLowerCase() ?? "";

        const receiverName =
          request.receiverUser?.name
            ?.toLowerCase() ?? "";

        const receiverEmail =
          request.receiverUser?.email
            ?.toLowerCase() ?? "";

        const teachingSkill =
          request.teachingSkills?.name
            ?.toLowerCase() ?? "";

        const learningSkill =
          request.learningSkills?.name
            ?.toLowerCase() ?? "";

        const status =
          request.status
            ?.toLowerCase() ?? "";

        const message =
          request.message
            ?.toLowerCase() ?? "";

        return (
          senderName.includes(search) ||
          senderEmail.includes(search) ||
          receiverName.includes(search) ||
          receiverEmail.includes(search) ||
          teachingSkill.includes(search) ||
          learningSkill.includes(search) ||
          status.includes(search) ||
          message.includes(search)
        );
      },
    );
  }, [requests, searchTerm]);

  // ========================================================
  // CURRENT PAGE COUNTS
  // ========================================================

  const pendingCount =
    requests.filter(
      (request) =>
        request.status === "pending",
    ).length;

  const acceptedCount =
    requests.filter(
      (request) =>
        request.status === "accepted",
    ).length;

  const rejectedCount =
    requests.filter(
      (request) =>
        request.status === "rejected",
    ).length;

  const completedCount =
    requests.filter(
      (request) =>
        request.status === "completed",
    ).length;

  // ========================================================
  // FORMAT DATE
  // ========================================================

  const formatDate = (
    date?: string,
  ) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date,
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  // ========================================================
  // ERROR MESSAGE
  // ========================================================

  const getErrorMessage = () => {
    if (
      error &&
      typeof error === "object" &&
      "response" in error
    ) {
      const axiosError =
        error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

      return (
        axiosError.response?.data
          ?.message ||
        "Failed to fetch swap requests"
      );
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Failed to fetch swap requests";
  };

  // ========================================================
  // REFRESH
  // ========================================================

  const handleRefresh = async () => {
    try {
      await refetch();

      toast.success(
        "Swap requests refreshed successfully",
      );
    } catch {
      toast.error(
        "Unable to refresh swap requests",
      );
    }
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="min-h-screen bg-[#0B0804] px-4 py-5 text-[#FFF7ED] sm:px-6 lg:px-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className="mb-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">

          {/* <div>
            <div className="mb-2 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
                <Inbox
                  size={21}
                  className="text-orange-400"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#FFF7ED] sm:text-2xl">
                  Swap Request Management
                </h1>

                <p className="text-sm text-[#A8A29E]">
                  Monitor all skill swap requests
                </p>
              </div>

            </div>
          </div> */}

          {/* REFRESH */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleRefresh}
            disabled={isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-500/20 bg-[#1C1008] px-4 py-2.5 text-sm font-medium text-orange-300 transition hover:border-orange-500/40 hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={
                isFetching
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </motion.button>

        </div>
      </motion.div>

      {/* ==================================================
          SUMMARY CARDS
      ================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL */}

        <SummaryCard
          title="Total Requests"
          value={totalRequests}
          icon={Inbox}
          iconClass="text-orange-400"
          iconBg="bg-orange-500/10"
          valueClass="text-[#FFF7ED]"
          delay={0.05}
        />

        {/* PENDING */}

        <SummaryCard
          title="Pending"
          value={pendingCount}
          icon={Clock3}
          iconClass="text-amber-400"
          iconBg="bg-amber-500/10"
          valueClass="text-amber-400"
          delay={0.1}
        />

        {/* ACCEPTED */}

        <SummaryCard
          title="Accepted"
          value={acceptedCount}
          icon={CheckCircle2}
          iconClass="text-emerald-400"
          iconBg="bg-emerald-500/10"
          valueClass="text-emerald-400"
          delay={0.15}
        />

        {/* COMPLETED */}

        <SummaryCard
          title="Completed"
          value={completedCount}
          icon={CheckCircle2}
          iconClass="text-blue-400"
          iconBg="bg-blue-500/10"
          valueClass="text-blue-400"
          delay={0.2}
        />

      </div>

      {/* ==================================================
          MAIN CARD
      ================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
        }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#1C1008]"
      >

        {/* SEARCH HEADER */}

        <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-[#FFF7ED]">
              All Swap Requests
            </h2>

            <p className="mt-1 text-sm text-[#A8A29E]">
              Showing{" "}
              {filteredRequests.length}{" "}
              of {requests.length} requests
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(
                  event.target.value,
                );
              }}
              placeholder="Search users, skills..."
              className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-10 pr-10 text-sm text-[#FFF7ED] outline-none placeholder:text-[#78716C] transition focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] transition hover:text-white"
              >
                <X size={16} />
              </button>
            )}

          </div>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {isError && (
          <div className="p-6">

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">

              <XCircle
                size={32}
                className="mx-auto mb-3 text-red-400"
              />

              <h3 className="font-semibold text-red-300">
                Unable to load swap requests
              </h3>

              <p className="mt-1 text-sm text-[#A8A29E]">
                {getErrorMessage()}
              </p>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleRefresh}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
              >
                <RefreshCw size={15} />
                Try Again
              </motion.button>

            </div>

          </div>
        )}

        {/* ==================================================
            LOADING
        ================================================== */}

        {isLoading && (
          <div className="flex min-h-[350px] items-center justify-center">

            <div className="text-center">

              <Loader2
                size={32}
                className="mx-auto animate-spin text-orange-500"
              />

              <p className="mt-3 text-sm text-[#A8A29E]">
                Loading swap requests...
              </p>

            </div>

          </div>
        )}

        {/* ==================================================
            TABLE
        ================================================== */}

        {!isLoading &&
          !isError &&
          filteredRequests.length > 0 && (
            <div className="relative overflow-x-auto">

              {isFetching && (
                <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-orange-500/20 bg-[#0B0804]/90 px-3 py-2 text-xs text-orange-300 backdrop-blur">
                  <Loader2
                    size={13}
                    className="animate-spin"
                  />
                  Updating...
                </div>
              )}

              <table className="w-full min-w-[1150px] text-left">

                <thead>
                  <tr className="border-b border-white/10 bg-black/10">

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      Sender
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      Receiver
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      Skill Exchange
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      Message
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      Created
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  <AnimatePresence mode="popLayout">

                    {filteredRequests.map(
                      (
                        request,
                        index,
                      ) => {
                        const config =
                          statusConfig[
                            request.status
                          ];

                        const StatusIcon =
                          config.icon;

                        return (
                          <motion.tr
                            key={
                              request._id
                            }
                            layout
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -10,
                            }}
                            transition={{
                              duration: 0.25,
                              delay:
                                index *
                                0.03,
                            }}
                            className="border-b border-white/[0.06] transition hover:bg-white/[0.025]"
                          >

                            {/* SENDER */}

                            <td className="px-5 py-4">

                              <UserCell
                                user={
                                  request.senderUser
                                }
                                iconClass="text-orange-400"
                                iconBg="bg-orange-500/10"
                              />

                            </td>

                            {/* RECEIVER */}

                            <td className="px-5 py-4">

                              <UserCell
                                user={
                                  request.receiverUser
                                }
                                iconClass="text-amber-400"
                                iconBg="bg-amber-500/10"
                              />

                            </td>

                            {/* SKILLS */}

                            <td className="px-5 py-4">

                              <div className="flex items-center gap-2">

                                <span className="max-w-[115px] truncate rounded-lg border border-orange-500/20 bg-orange-500/10 px-2.5 py-1.5 text-xs font-medium text-orange-300">
                                  {
                                    request
                                      .teachingSkills
                                      ?.name
                                  }
                                </span>

                                <ArrowRight
                                  size={14}
                                  className="shrink-0 text-[#78716C]"
                                />

                                <span className="max-w-[115px] truncate rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-300">
                                  {
                                    request
                                      .learningSkills
                                      ?.name
                                  }
                                </span>

                              </div>

                            </td>

                            {/* MESSAGE */}

                            <td className="max-w-[230px] px-5 py-4">

                              <div className="flex items-start gap-2">

                                <MessageSquare
                                  size={15}
                                  className="mt-0.5 shrink-0 text-[#78716C]"
                                />

                                <p className="line-clamp-2 text-sm text-[#A8A29E]">
                                  {
                                    request.message
                                  }
                                </p>

                              </div>

                            </td>

                            {/* STATUS */}

                            <td className="px-5 py-4">

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${config.className}`}
                              >
                                <StatusIcon
                                  size={13}
                                />

                                {
                                  config.label
                                }
                              </span>

                            </td>

                            {/* DATE */}

                            <td className="px-5 py-4">

                              <div className="flex items-center gap-2 whitespace-nowrap text-sm text-[#A8A29E]">

                                <CalendarDays
                                  size={15}
                                  className="text-[#78716C]"
                                />

                                {formatDate(
                                  request.createdAt,
                                )}

                              </div>

                            </td>

                            {/* ACTION */}

                            <td className="px-5 py-4 text-right">

                              <motion.button
                                whileHover={{
                                  scale: 1.05,
                                }}
                                whileTap={{
                                  scale: 0.95,
                                }}
                                onClick={() =>
                                  setSelectedRequest(
                                    request,
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#D6D3D1] transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-300"
                              >
                                <Eye
                                  size={14}
                                />
                                View
                              </motion.button>

                            </td>

                          </motion.tr>
                        );
                      },
                    )}

                  </AnimatePresence>

                </tbody>

              </table>

            </div>
          )}

        {/* ==================================================
            EMPTY
        ================================================== */}

        {!isLoading &&
          !isError &&
          filteredRequests.length === 0 && (
            <div className="flex min-h-[350px] items-center justify-center px-5">

              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Inbox
                    size={25}
                    className="text-[#78716C]"
                  />
                </div>

                <h3 className="mt-4 text-base font-semibold text-[#FFF7ED]">
                  {searchTerm
                    ? "No matching requests"
                    : "No swap requests found"}
                </h3>

                <p className="mt-1 text-sm text-[#A8A29E]">
                  {searchTerm
                    ? "Try changing your search term."
                    : "There are no swap requests to display."}
                </p>

                {searchTerm && (
                  <button
                    onClick={() =>
                      setSearchTerm("")
                    }
                    className="mt-4 text-sm font-medium text-orange-400 transition hover:text-orange-300"
                  >
                    Clear search
                  </button>
                )}

              </div>

            </div>
          )}

        {/* ==================================================
            PAGINATION
        ================================================== */}

        {totalPages > 1 && (
          <div className="border-t border-white/10 px-5 py-5 sm:px-6">

            <Pagination
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              onPageChange={
                setCurrentPage
              }
              disabled={
                isFetching
              }
            />

          </div>
        )}

      </motion.div>

      {/* ==================================================
          VIEW MODAL
      ================================================== */}

      <AnimatePresence>

        {selectedRequest && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() =>
              setSelectedRequest(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-orange-500/20 bg-[#1C1008] shadow-2xl shadow-black/50"
            >

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-6">

                <div>
                  <h2 className="text-lg font-semibold text-[#FFF7ED]">
                    Swap Request Details
                  </h2>

                  <p className="mt-1 max-w-[400px] truncate text-xs text-[#A8A29E]">
                    ID:{" "}
                    {
                      selectedRequest._id
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRequest(
                      null,
                    )
                  }
                  className="rounded-lg p-2 text-[#A8A29E] transition hover:bg-white/5 hover:text-white"
                >
                  <X size={19} />
                </button>

              </div>

              {/* MODAL BODY */}

              <div className="space-y-5 p-5 sm:p-6">

                {/* USERS */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <ModalUser
                    title="Sender"
                    user={
                      selectedRequest.senderUser
                    }
                    iconClass="text-orange-400"
                    iconBg="bg-orange-500/10"
                  />

                  <ModalUser
                    title="Receiver"
                    user={
                      selectedRequest.receiverUser
                    }
                    iconClass="text-amber-400"
                    iconBg="bg-amber-500/10"
                  />

                </div>

                {/* SKILLS */}

                <div className="rounded-xl border border-white/10 bg-black/10 p-4">

                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    Skill Exchange
                  </p>

                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">

                    <div className="w-full rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-center sm:w-48">

                      <p className="text-xs text-[#A8A29E]">
                        Teaching
                      </p>

                      <p className="mt-2 font-semibold text-orange-300">
                        {
                          selectedRequest
                            .teachingSkills
                            ?.name
                        }
                      </p>

                    </div>

                    <ArrowRight
                      size={20}
                      className="rotate-90 text-[#78716C] sm:rotate-0"
                    />

                    <div className="w-full rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center sm:w-48">

                      <p className="text-xs text-[#A8A29E]">
                        Learning
                      </p>

                      <p className="mt-2 font-semibold text-amber-300">
                        {
                          selectedRequest
                            .learningSkills
                            ?.name
                        }
                      </p>

                    </div>

                  </div>

                </div>

                {/* MESSAGE */}

                <div className="rounded-xl border border-white/10 bg-black/10 p-4">

                  <div className="mb-3 flex items-center gap-2">

                    <MessageSquare
                      size={16}
                      className="text-orange-400"
                    />

                    <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                      Message
                    </p>

                  </div>

                  <p className="text-sm leading-6 text-[#D6D3D1]">
                    {
                      selectedRequest.message
                    }
                  </p>

                </div>

                {/* STATUS / DATE */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-xl border border-white/10 bg-black/10 p-4">

                    <p className="mb-2 text-xs text-[#78716C]">
                      Status
                    </p>

                    {(() => {
                      const config =
                        statusConfig[
                          selectedRequest
                            .status
                        ];

                      const StatusIcon =
                        config.icon;

                      return (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${config.className}`}
                        >
                          <StatusIcon
                            size={13}
                          />
                          {
                            config.label
                          }
                        </span>
                      );
                    })()}

                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/10 p-4">

                    <p className="mb-2 text-xs text-[#78716C]">
                      Created Date
                    </p>

                    <div className="flex items-center gap-2 text-sm text-[#D6D3D1]">

                      <CalendarDays
                        size={15}
                        className="text-orange-400"
                      />

                      {formatDate(
                        selectedRequest.createdAt,
                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="border-t border-white/10 p-5 sm:p-6">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRequest(
                      null,
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[#D6D3D1] transition hover:bg-white/[0.06] hover:text-white"
                >
                  Close
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

// ==========================================================
// SUMMARY CARD COMPONENT
// ==========================================================

interface SummaryCardProps {
  title: string;
  value: number;
  icon: typeof Inbox;
  iconClass: string;
  iconBg: string;
  valueClass: string;
  delay: number;
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  iconClass,
  iconBg,
  valueClass,
  delay,
}: SummaryCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      className="rounded-2xl border border-white/10 bg-[#1C1008] p-5"
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-[#A8A29E]">
            {title}
          </p>

          <h2
            className={`mt-2 text-2xl font-bold ${valueClass}`}
          >
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl p-3 ${iconBg}`}
        >
          <Icon
            size={20}
            className={iconClass}
          />
        </div>

      </div>
    </motion.div>
  );
}

// ==========================================================
// USER CELL
// ==========================================================

interface UserCellProps {
  user?: {
    name?: string;
    email?: string;
  };
  iconClass: string;
  iconBg: string;
}

function UserCell({
  user,
  iconClass,
  iconBg,
}: UserCellProps) {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <User
          size={16}
          className={iconClass}
        />
      </div>

      <div className="min-w-0">

        <p className="truncate text-sm font-medium text-[#FFF7ED]">
          {user?.name ||
            "Unknown"}
        </p>

        <p className="max-w-[170px] truncate text-xs text-[#A8A29E]">
          {user?.email || "-"}
        </p>

      </div>

    </div>
  );
}

// ==========================================================
// MODAL USER
// ==========================================================

interface ModalUserProps {
  title: string;
  user?: {
    name?: string;
    email?: string;
  };
  iconClass: string;
  iconBg: string;
}

function ModalUser({
  title,
  user,
  iconClass,
  iconBg,
}: ModalUserProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-4">

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
        {title}
      </p>

      <div className="flex items-center gap-3">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
        >
          <User
            size={18}
            className={iconClass}
          />
        </div>

        <div className="min-w-0">

          <p className="font-medium text-[#FFF7ED]">
            {user?.name ||
              "Unknown"}
          </p>

          <p className="truncate text-xs text-[#A8A29E]">
            {user?.email || "-"}
          </p>

        </div>

      </div>

    </div>
  );
}