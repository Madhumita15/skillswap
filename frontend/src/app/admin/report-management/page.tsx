"use client";

import {
  ChangeEvent,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  Variants,
} from "framer-motion";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  FileWarning,
  Mail,
  MessageSquareWarning,
  ShieldCheck,
  User,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import {
  useReport,
  useReports,
  useUpdateReportStatus,
} from "@/hooks/useAdminReport";

import Pagination from "@/layout/adminLayout/Pagination";

import type {
  Report,
  ReportReason,
  ReportStatus,
} from "@/typescript/interface/reportAdmin.interface";
import { getErrorMessage } from "@/services/helper/global.helper";

/* =====================================================
   CONSTANTS
===================================================== */

const ITEMS_PER_PAGE = 5;

/* =====================================================
   STATUS OPTIONS
===================================================== */

const statusOptions: {
  value: ReportStatus | "";
  label: string;
}[] = [
  {
    value: "",
    label: "All Reports",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "resolved",
    label: "Resolved", 
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

/* =====================================================
   REASON LABELS
===================================================== */

const reasonLabels: Record<
  ReportReason,
  string
> = {
  spam: "Spam",
  harassment: "Harassment",    
  inappropriate_content:
    "Inappropriate Content",
  fake_profile: "fake_profile",
  others: "others",
};

/* =====================================================
   ANIMATION VARIANTS
===================================================== */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants:Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const modalVariants:Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    scale: 0.96,
    y: 20,

    transition: {
      duration: 0.2,
    },
  },
};

/* =====================================================
   PAGE
===================================================== */

export default function ReportManagementPage() {
  /* =====================================================
     STATE
  ===================================================== */

  const [page, setPage] =
    useState(1);

  const [statusFilter, setStatusFilter] =
    useState<ReportStatus | "">("");

  const [selectedReportId, setSelectedReportId] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [actionError, setActionError] =
    useState("");

  /* =====================================================
     REPORT LIST QUERY
  ===================================================== */

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useReports(
    page,
    ITEMS_PER_PAGE,
    statusFilter,
  );

  /* =====================================================
     REPORT DETAIL QUERY
  ===================================================== */

  const {
    data: reportDetailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
    error: detailError,
  } = useReport(
    selectedReportId,
  );

  /* =====================================================
     UPDATE MUTATION
  ===================================================== */

  const updateStatusMutation =
    useUpdateReportStatus();

  /* =====================================================
     API DATA
  ===================================================== */

  const reports =
    data?.data?.reports ?? [];

  // const pagination =
  //   data?.data?.totalPages;

  const totalReports =
    data?.data?.totalReports ?? 0;

  const totalPages =
    data?.data?.totalPages ?? 0;

   

  const selectedReport =
    reportDetailData?.data ?? null;

  /* =====================================================
     STATUS CHANGE
  ===================================================== */

  const handleStatusFilterChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const value =
      event.target.value as
        | ReportStatus
        | "";

    setStatusFilter(value);

    /*
     * Always return to first page
     * when filter changes.
     */

    setPage(1);
  };

  /* =====================================================
     OPEN DETAILS
  ===================================================== */

  const handleViewDetails = (
    report: Report,
  ) => {
    setActionError("");

    setSuccessMessage("");

    setSelectedReportId(
      report._id,
    );
  };

  /* =====================================================
     CLOSE DETAILS
  ===================================================== */

  const handleCloseDetails = () => {
    if (
      updateStatusMutation.isPending
    ) {
      return;
    }

    setSelectedReportId(null);

    setActionError("");

    setSuccessMessage("");
  };

  /* =====================================================
     UPDATE STATUS
  ===================================================== */

  const handleUpdateStatus = async (
    status: ReportStatus,
  ) => {
    if (!selectedReport) {
      return;
    }

    /*
     * Don't make an unnecessary request.
     */

    if (
      selectedReport.status === status
    ) {
      return;
    }

    setActionError("");

    setSuccessMessage("");

    try {
      await updateStatusMutation.mutateAsync(
        {
          id: selectedReport._id,
          status,
        },
      );

      setSuccessMessage(
        `Report status updated to "${formatStatus(status)}".`,
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (err) {
      setActionError(
        getErrorMessage(err)
      );
    }
  };

  /* =====================================================
     PAGINATION
  ===================================================== */

  const handlePageChange = (
    newPage: number,
  ) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === page
    ) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return <ReportsLoading />;
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (isError) {
    return (
      <ReportsError
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while loading reports."
        }
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="mb-7"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                {/* <FileWarning className="h-5 w-5 text-[#F5A623]" />

                <h1 className="text-2xl font-bold text-[#FFF7ED]">
                  Report Management
                </h1> */}
              </div>

              {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-[#78716C]">
                Review user reports, investigate
                reported activity and maintain
                moderation records.
              </p> */}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#3D2110] bg-[#140A05] px-4 py-2.5">
              <ShieldCheck className="h-4 w-4 text-[#F5A623]" />

              <span className="text-sm text-[#D6D3D1]">
                {totalReports}{" "}
                {totalReports === 1
                  ? "Report"
                  : "Reports"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            SUCCESS
        ================================================= */}

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" />

              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="mb-6 rounded-2xl border border-[#3D2110] bg-[#140A05] p-4 shadow-xl shadow-black/10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#FFF7ED]">
                User Reports
              </h2>

              <p className="mt-1 text-xs text-[#78716C]">
                Review and manage submitted
                moderation reports.
              </p>
            </div>

            <div className="relative w-full md:w-56">
              <select
                value={statusFilter}
                onChange={
                  handleStatusFilterChange
                }
                className="h-10 w-full appearance-none rounded-xl border border-[#3D2110] bg-[#0B0804] px-4 pr-10 text-sm text-[#FFF7ED] outline-none transition focus:border-[#E59A0B] focus:ring-1 focus:ring-[#E59A0B]/30"
              >
                {statusOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-[#0B0804] text-[#FFF7ED]"
                    >
                      {option.label}
                    </option>
                  ),
                )}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716C]" />
            </div>
          </div>
        </motion.div>

        {/* =================================================
            FETCHING INDICATOR
        ================================================= */}

        {isFetching &&
          !isLoading && (
            <div className="mb-4 flex items-center gap-2 text-xs text-[#78716C]">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#4A2812] border-t-[#F5A623]" />

              Updating reports...
            </div>
          )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {reports.length === 0 ? (
          <EmptyReports
            statusFilter={statusFilter}
          />
        ) : (
          <>
            {/* =================================================
                REPORT LIST
            ================================================= */}

            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {reports.map(
                (report) => (
                  <ReportCard
                    key={report._id}
                    report={report}
                    onViewDetails={
                      handleViewDetails
                    }
                  />
                ),
              )}
            </motion.div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={
                  handlePageChange
                }
                disabled={isFetching}
              />
            )}
          </>
        )}
      </motion.div>

      {/* ===================================================
          REPORT DETAILS MODAL
      =================================================== */}

      <AnimatePresence>
        {selectedReportId && (
          <ReportDetailsModal
            report={selectedReport}
            isLoading={
              isDetailLoading
            }
            isError={
              isDetailError
            }
            error={
              detailError
            }
            successMessage={
              successMessage
            }
            actionError={
              actionError
            }
            isUpdating={
              updateStatusMutation.isPending
            }
            onClose={
              handleCloseDetails
            }
            onStatusChange={
              handleUpdateStatus
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   REPORT CARD
========================================================= */

type ReportCardProps = {
  report: Report;

  onViewDetails: (
    report: Report,
  ) => void;
};

function ReportCard({
  report,
  onViewDetails,
}: ReportCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -3,
        boxShadow:
          "0 15px 35px rgba(0,0,0,0.22)",
      }}
      className="overflow-hidden rounded-2xl border border-[#3D2110] bg-[#140A05] shadow-xl shadow-black/10 transition"
    >
      <div className="h-1 w-full bg-linear-to-r from-[#E59A0B] via-[#F5A623] to-transparent opacity-70" />

      <div className="p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* =================================================
              MAIN INFORMATION
          ================================================= */}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <ReasonBadge
                reason={report.reason}
              />

              <StatusBadge
                status={report.status}
              />
            </div>

            <h3 className="mt-3 truncate text-base font-semibold text-[#FFF7ED]">
              {reasonLabels[
                report.reason
              ]}
            </h3>

            <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-[#A8A29E]">
              {report.description}
            </p>
          </div>

          {/* =================================================
              DATE
          ================================================= */}

          <div className="flex shrink-0 items-center gap-2 text-xs text-[#78716C]">
            <CalendarDays className="h-4 w-4" />

            {formatDate(
              report.createdAt,
            )}
          </div>
        </div>

        {/* =================================================
            USERS + ACTION
        ================================================= */}

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#3D2110] pt-4 md:grid-cols-3">
          {/* Reporter */}

          <UserInfo
            label="Reported By"
            name={
              report.reporter?.name ||
              "Unknown User"
            }
            email={
              report.reporter?.email ||
              "No email available"
            }
            icon={UserRound}
          />

          {/* Reported User */}

          <UserInfo
            label="Reported User"
            name={
              report.reportedUser?.name ||
              "Unknown User"
            }
            email={
              report.reportedUser?.email ||
              "No email available"
            }
            icon={User}
          />

          {/* Action */}

          <div className="flex items-center justify-start md:justify-end">
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                onViewDetails(
                  report,
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-[#4A2812] bg-[#1A0D06] px-4 py-2.5 text-xs font-medium text-[#D6D3D1] transition hover:border-[#E59A0B]/50 hover:bg-[#E59A0B]/10 hover:text-[#F5A623]"
            >
              <Eye className="h-4 w-4" />

              View Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   USER INFO
========================================================= */

type UserInfoProps = {
  label: string;
  name: string;
  email: string;
  icon: React.ElementType;
};

function UserInfo({
  label,
  name,
  email,
  icon: Icon,
}: UserInfoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#3D2110] bg-[#0B0804] px-3 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#4A2812] bg-[#1A0D06]">
        <Icon className="h-4 w-4 text-[#E59A0B]" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#57534E]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-medium text-[#D6D3D1]">
          {name}
        </p>

        <p className="truncate text-[11px] text-[#78716C]">
          {email}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   REASON BADGE
========================================================= */

function ReasonBadge({
  reason,
}: {
  reason: ReportReason;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4A2812] bg-[#1A0D06] px-2.5 py-1 text-[11px] font-medium text-[#F5A623]">
      <MessageSquareWarning className="h-3 w-3" />

      {reasonLabels[reason]}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: ReportStatus;
}) {
  const config: Record<
    ReportStatus,
    {
      label: string;
      className: string;
      dot: string;
    }
  > = {
    pending: {
      label: "Pending",
      className:
        "border-amber-500/20 bg-amber-500/10 text-amber-300",
      dot: "bg-amber-400",
    },

    resolved: {
      label: "Resolved",
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
      dot: "bg-emerald-400",
    },

    rejected: {
      label: "Rejected",
      className:
        "border-red-500/20 bg-red-500/10 text-red-300",
      dot: "bg-red-400",
    },
  };

  const current =
    config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${current.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${current.dot}`}
      />

      {current.label}
    </span>
  );
}

/* =========================================================
   REPORT DETAILS MODAL
========================================================= */

type ReportDetailsModalProps = {
  report: Report | null;

  isLoading: boolean;

  isError: boolean;

  error: unknown;

  successMessage: string;

  actionError: string;

  isUpdating: boolean;

  onClose: () => void;

  onStatusChange: (
    status: ReportStatus,
  ) => void;
};

function ReportDetailsModal({
  report,
  isLoading,
  isError,
  error,
  successMessage,
  actionError,
  isUpdating,
  onClose,
  onStatusChange,
}: ReportDetailsModalProps) {
  return (
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#4A2812] bg-[#140A05] shadow-2xl shadow-black/50"
      >
        {/* =================================================
            MODAL HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-[#3D2110] px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <FileWarning className="h-4 w-4 text-[#F5A623]" />

              <h2 className="text-base font-semibold text-[#FFF7ED]">
                Report Details
              </h2>
            </div>

            <p className="mt-1 text-xs text-[#78716C]">
              Review the complete moderation
              record and update its status.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3D2110] text-[#A8A29E] transition hover:border-[#E59A0B]/40 hover:bg-[#E59A0B]/10 hover:text-[#F5A623] disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* =================================================
            MODAL BODY
        ================================================= */}

        <div className="p-5 sm:p-6">
          {/* Loading */}

          {isLoading && (
            <ReportDetailsLoading />
          )}

          {/* Error */}

          {!isLoading &&
            isError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-center">
                <XCircle className="mx-auto h-8 w-8 text-red-400" />

                <p className="mt-3 text-sm font-medium text-red-300">
                  Unable to load report
                </p>

                <p className="mt-1 text-xs text-red-300/70">
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong while loading the report."}
                </p>
              </div>
            )}

          {/* Report */}

          {!isLoading &&
            !isError &&
            report && (
              <div className="space-y-5">
                {/* =================================================
                    SUCCESS
                ================================================= */}

                <AnimatePresence>
                  {successMessage && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" />

                      {successMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* =================================================
                    ERROR
                ================================================= */}

                <AnimatePresence>
                  {actionError && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                    >
                      <AlertTriangle className="h-4 w-4 shrink-0" />

                      {actionError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* =================================================
                    TOP SUMMARY
                ================================================= */}

                <div className="flex flex-wrap items-center gap-2">
                  <ReasonBadge
                    reason={report.reason}
                  />

                  <StatusBadge
                    status={report.status}
                  />
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div className="rounded-xl border border-[#3D2110] bg-[#0B0804] p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquareWarning className="h-4 w-4 text-[#E59A0B]" />

                    <p className="text-xs font-semibold text-[#FFF7ED]">
                      Report Description
                    </p>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#A8A29E]">
                    {report.description}
                  </p>
                </div>

                {/* =================================================
                    USERS
                ================================================= */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Reporter */}

                  <div className="rounded-xl border border-[#3D2110] bg-[#0B0804] p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#57534E]">
                      Reported By
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4A2812] bg-[#1A0D06]">
                        <UserRound className="h-4 w-4 text-[#E59A0B]" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#FFF7ED]">
                          {report.reporter?.name ||
                            "Unknown User"}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#78716C]">
                          <Mail className="h-3 w-3" />

                          <span className="truncate">
                            {report.reporter?.email ||
                              "No email available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reported User */}

                  <div className="rounded-xl border border-[#3D2110] bg-[#0B0804] p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#57534E]">
                      Reported User
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4A2812] bg-[#1A0D06]">
                        <User className="h-4 w-4 text-[#E59A0B]" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#FFF7ED]">
                          {report.reportedUser?.name ||
                            "Unknown User"}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#78716C]">
                          <Mail className="h-3 w-3" />

                          <span className="truncate">
                            {report.reportedUser?.email ||
                              "No email available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    ADDITIONAL INFORMATION
                ================================================= */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <DetailItem
                    label="Submitted"
                    value={formatDate(
                      report.createdAt,
                    )}
                    icon={CalendarDays}
                  />

                  <DetailItem
                    label="Last Updated"
                    value={formatDate(
                      report.updatedAt,
                    )}
                    icon={Clock3}
                  />

                  <DetailItem
                    label="Reported User Status"
                    value={
                      report.reportedUser
                        ?.status ||
                      "Unknown"
                    }
                    icon={ShieldCheck}
                  />
                </div>

                {/* =================================================
                    STATUS UPDATE
                ================================================= */}

                <div className="border-t border-[#3D2110] pt-5">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#FFF7ED]">
                      Update Report Status
                    </p>

                    <p className="mt-1 text-[11px] text-[#78716C]">
                      The report remains stored as
                      a moderation record after its
                      status is updated.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(
                      [
                        "pending",
                        "resolved",
                        "rejected",
                      ] as ReportStatus[]
                    ).map(
                      (status) => {
                        const isCurrent =
                          report.status ===
                          status;

                        return (
                          <motion.button
                            key={status}
                            whileHover={{
                              scale: 1.02,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                            disabled={
                              isUpdating ||
                              isCurrent
                            }
                            onClick={() =>
                              onStatusChange(
                                status,
                              )
                            }
                            className={`rounded-xl border px-3 py-3 text-xs font-medium transition ${
                              isCurrent
                                ? "border-[#E59A0B]/50 bg-[#E59A0B]/10 text-[#F5A623]"
                                : "border-[#3D2110] bg-[#1A0D06] text-[#A8A29E] hover:border-[#E59A0B]/40 hover:bg-[#E59A0B]/10 hover:text-[#F5A623]"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            {isUpdating &&
                            !isCurrent ? (
                              <span className="flex items-center justify-center gap-2">
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#A8A29E]/30 border-t-[#F5A623]" />

                                Updating
                              </span>
                            ) : (
                              formatStatus(
                                status,
                              )
                            )}
                          </motion.button>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

type DetailItemProps = {
  label: string;
  value: string;
  icon: React.ElementType;
};

function DetailItem({
  label,
  value,
  icon: Icon,
}: DetailItemProps) {
  return (
    <div className="rounded-xl border border-[#3D2110] bg-[#0B0804] p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[#E59A0B]" />

        <p className="text-[10px] font-medium uppercase tracking-wider text-[#57534E]">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-xs font-medium text-[#D6D3D1]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyReports({
  statusFilter,
}: {
  statusFilter: ReportStatus | "";
}) {
  const hasFilter =
    statusFilter !== "";

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-[#3D2110] bg-[#140A05] px-6 py-16 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4A2812] bg-[#1A0D06]">
        <FileWarning className="h-7 w-7 text-[#E59A0B]" />
      </div>

      <h3 className="mt-5 text-base font-semibold text-[#FFF7ED]">
        {hasFilter
          ? "No reports found"
          : "No reports available"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78716C]">
        {hasFilter
          ? `There are no ${formatStatus(
              statusFilter,
            ).toLowerCase()} reports at the moment.`
          : "Submitted user reports will appear here for admin moderation."}
      </p>
    </motion.div>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function ReportsLoading() {
  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-7 animate-pulse">
          <div className="h-7 w-56 rounded bg-[#1A0D06]" />

          <div className="mt-3 h-4 w-full max-w-2xl rounded bg-[#1A0D06]" />
        </div>

        {/* Toolbar */}

        <div className="mb-6 h-20 animate-pulse rounded-2xl border border-[#3D2110] bg-[#140A05]" />

        {/* Reports */}

        <div className="space-y-4">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-2xl border border-[#3D2110] bg-[#140A05]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DETAIL LOADING
========================================================= */

function ReportDetailsLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded bg-[#1A0D06]" />

      <div className="h-28 animate-pulse rounded-xl border border-[#3D2110] bg-[#0B0804]" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-24 animate-pulse rounded-xl border border-[#3D2110] bg-[#0B0804]" />

        <div className="h-24 animate-pulse rounded-xl border border-[#3D2110] bg-[#0B0804]" />
      </div>

      <div className="h-24 animate-pulse rounded-xl border border-[#3D2110] bg-[#0B0804]" />

      <div className="h-28 animate-pulse rounded-xl border border-[#3D2110] bg-[#0B0804]" />
    </div>
  );
}

/* =========================================================
   ERROR STATE
========================================================= */

function ReportsError({
  message,
}: {
  message: string;
}) {
  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-red-500/20 bg-[#140A05] p-8 text-center shadow-xl">
          <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />

          <h2 className="text-lg font-semibold text-[#FFF7ED]">
            Unable to load reports
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-[#A8A29E]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FORMAT STATUS
========================================================= */

function formatStatus(
  status: ReportStatus | "",
): string {
  if (!status) {
    return "All Reports";
  }

  const labels: Record<
    ReportStatus,
    string
  > = {
    pending: "Pending",
    resolved: "Resolved",
    rejected: "Rejected",
  };

  return labels[status];
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
  date: string,
): string {
  if (!date) {
    return "Unknown";
  }

  return new Date(
    date,
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}