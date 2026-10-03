"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeftRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import { useSwaps } from "@/hooks/useSwap";
import type { Swap, SwapStatus } from "@/typescript/interface/swaps.interface";

const ITEMS_PER_PAGE = 6;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const getStatusClasses = (status: SwapStatus) => {
  switch (status) {
    case "active":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";

    case "completed":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

    case "cancelled":
      return "border-red-500/30 bg-red-500/10 text-red-400";

    default:
      return "border-stone-700 bg-stone-900 text-stone-400";
  }
};

const getStatusIcon = (status: SwapStatus) => {
  switch (status) {
    case "active":
      return <Clock3 size={14} />;

    case "completed":
      return <CheckCircle2 size={14} />;

    case "cancelled":
      return <XCircle size={14} />;

    default:
      return <Activity size={14} />;
  }
};

const formatDate = (date?: string) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitial = (name?: string) => {
  return name?.charAt(0)?.toUpperCase() || "U";
};

export default function AllSwapsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SwapStatus>("all");

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useSwaps(page, ITEMS_PER_PAGE);

  const swaps = data?.data ?? [];

  const filteredSwaps = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return swaps.filter((swap) => {
      const matchesStatus =
        statusFilter === "all" || swap.status === statusFilter;

      if (!searchValue) {
        return matchesStatus;
      }

      const senderName = swap.senderUser?.name?.toLowerCase() || "";
      const senderEmail = swap.senderUser?.email?.toLowerCase() || "";

      const receiverName =
        swap.receiverUser?.name?.toLowerCase() || "";

      const receiverEmail =
        swap.receiverUser?.email?.toLowerCase() || "";

      const teachingSkill =
        swap.teachingSkills?.name?.toLowerCase() || "";

      const learningSkill =
        swap.learningSkills?.name?.toLowerCase() || "";

      return (
        matchesStatus &&
        (
          senderName.includes(searchValue) ||
          senderEmail.includes(searchValue) ||
          receiverName.includes(searchValue) ||
          receiverEmail.includes(searchValue) ||
          teachingSkill.includes(searchValue) ||
          learningSkill.includes(searchValue)
        )
      );
    });
  }, [swaps, search, statusFilter]);

  /*
   * The backend currently provides the total number of swaps,
   * but it does not provide separate total counts for each status.
   *
   * Therefore Active / Completed / Cancelled below represent
   * the swaps visible on the CURRENT PAGE.
   */
  const activeCount = swaps.filter(
    (swap) => swap.status === "active",
  ).length;

  const completedCount = swaps.filter(
    (swap) => swap.status === "completed",
  ).length;

  const cancelledCount = swaps.filter(
    (swap) => swap.status === "cancelled",
  ).length;

  const totalPages = data?.totalPages ?? 1;

  const handlePrevious = () => {
    if (page > 1) {
      setPage((current) => current - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((current) => current + 1);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[calc(100vh-81px)] bg-[#0B0804] px-4 py-6 text-[#FFF7ED] sm:px-6 lg:px-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-end"
      >
        {/* <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4A2812] bg-[#1A0D06] text-[#F5A623] shadow-[0_0_25px_rgba(245,166,35,0.08)]">
              <ArrowLeftRight size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                All Swaps
              </h1>

              <p className="mt-1 text-sm text-[#A8A29E]">
                Monitor and review all skill exchange activities.
              </p>
            </div>
          </div>
        </div> */}

        {/* Search */}
        <div className="relative w-full xl:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users or skills..."
            className="w-full rounded-xl border border-[#3D2110] bg-[#140A05] py-3 pl-11 pr-4 text-sm text-[#FFF7ED] outline-none transition placeholder:text-[#78716C] focus:border-[#E59A0B] focus:ring-1 focus:ring-[#E59A0B]/30"
          />
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        variants={itemVariants}
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          title="Total Swaps"
          value={data?.totalSwapRequest ?? 0}
          icon={<ArrowLeftRight size={20} />}
          description="All recorded swaps"
          accent="amber"
        />

        <StatCard
          title="Active"
          value={activeCount}
          icon={<Clock3 size={20} />}
          description="On current page"
          accent="orange"
        />

        <StatCard
          title="Completed"
          value={completedCount}
          icon={<CheckCircle2 size={20} />}
          description="On current page"
          accent="green"
        />

        <StatCard
          title="Cancelled"
          value={cancelledCount}
          icon={<XCircle size={20} />}
          description="On current page"
          accent="red"
        />
      </motion.div>

      {/* Filter bar */}
      <motion.div
        variants={itemVariants}
        className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#3D2110] bg-[#140A05] p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="font-semibold text-[#FFF7ED]">
            Swap Records
          </h2>

          <p className="mt-1 text-xs text-[#78716C]">
            Showing page {data?.currentPage ?? page} of {totalPages}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="All"
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />

          <FilterButton
            label="Active"
            active={statusFilter === "active"}
            onClick={() => setStatusFilter("active")}
          />

          <FilterButton
            label="Completed"
            active={statusFilter === "completed"}
            onClick={() => setStatusFilter("completed")}
          />

          <FilterButton
            label="Cancelled"
            active={statusFilter === "cancelled"}
            onClick={() => setStatusFilter("cancelled")}
          />
        </div>
      </motion.div>

      {/* Error */}
      {isError && (
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"
        >
          <XCircle
            size={42}
            className="mx-auto mb-4 text-red-400"
          />

          <h3 className="text-lg font-semibold text-red-300">
            Failed to load swaps
          </h3>

          <p className="mt-2 text-sm text-[#A8A29E]">
            {error instanceof Error
              ? error.message
              : "Something went wrong while fetching swaps."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Loading */}
      {isLoading && !data && (
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <SwapSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Data */}
      {!isLoading && !isError && (
        <>
          {filteredSwaps.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-[#3D2110] bg-[#140A05] px-6 py-16 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#4A2812] bg-[#1A0D06] text-[#E59A0B]">
                <ArrowLeftRight size={25} />
              </div>

              <h3 className="text-lg font-semibold">
                No swaps found
              </h3>

              <p className="mt-2 text-sm text-[#78716C]">
                Try changing your search or status filter.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid gap-4"
            >
              {filteredSwaps.map((swap) => (
                <SwapCard
                  key={swap._id}
                  swap={swap}
                />
              ))}
            </motion.div>
          )}
        </>
      )}

      {/* Pagination */}
      {!isLoading && !isError && data && totalPages > 0 && (
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#3D2110] bg-[#140A05] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="text-sm text-[#A8A29E]">
            Page{" "}
            <span className="font-semibold text-[#FFF7ED]">
              {data.currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#FFF7ED]">
              {data.totalPages}
            </span>

            {isFetching && (
              <span className="ml-2 text-[#E59A0B]">
                Updating...
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={handlePrevious}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#3D2110] bg-[#1A0D06] px-4 text-sm font-medium text-[#D6D3D1] transition hover:border-[#E59A0B]/40 hover:text-[#F5A623] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
              <span className="hidden sm:inline">
                Previous
              </span>
            </button>

            <div className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#E59A0B]/30 bg-[#E59A0B]/10 px-3 text-sm font-semibold text-[#F5A623]">
              {page}
            </div>

            <button
              type="button"
              disabled={page >= totalPages || isFetching}
              onClick={handleNext}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#3D2110] bg-[#1A0D06] px-4 text-sm font-medium text-[#D6D3D1] transition hover:border-[#E59A0B]/40 hover:text-[#F5A623] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="hidden sm:inline">
                Next
              </span>
              <ChevronRight size={17} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}


interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  accent: "amber" | "orange" | "green" | "red";
}

function StatCard({
  title,
  value,
  description,
  icon,
  accent,
}: StatCardProps) {
  const accentClasses = {
    amber:
      "border-[#E59A0B]/20 bg-[#E59A0B]/10 text-[#E59A0B]",

    orange:
      "border-[#F5A623]/20 bg-[#F5A623]/10 text-[#F5A623]",

    green:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    red:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group rounded-2xl border border-[#3D2110] bg-[#140A05] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition hover:border-[#5A3015]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#A8A29E]">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-[#FFF7ED]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#78716C]">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${accentClasses[accent]}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}


interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({
  label,
  active,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
        active
          ? "border-[#E59A0B]/40 bg-[#E59A0B]/10 text-[#F5A623] shadow-[0_0_18px_rgba(229,154,11,0.08)]"
          : "border-[#3D2110] bg-[#1A0D06] text-[#A8A29E] hover:border-[#E59A0B]/30 hover:text-[#F5A623]"
      }`}
    >
      {label}
    </button>
  );
}

function SwapCard({ swap }: { swap: Swap }) {
  const startDate = swap.startDate || swap.startAt;
  const completedDate = swap.completedDate || swap.completedAt;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -3,
        transition: { duration: 0.2 },
      }}
      className="overflow-hidden rounded-2xl border border-[#3D2110] bg-[#140A05] shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition hover:border-[#5A3015]"
    >
      {/* Top */}
      <div className="flex flex-col gap-4 border-b border-[#3D2110] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#4A2812] bg-[#1A0D06] text-[#E59A0B]">
            <ArrowLeftRight size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#FFF7ED]">
              Swap Request
            </p>

            <p className="mt-0.5 font-mono text-[11px] text-[#78716C]">
              ID: {swap._id}
            </p>
          </div>
        </div>

        <div
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium capitalize ${getStatusClasses(
            swap.status,
          )}`}
        >
          {getStatusIcon(swap.status)}
          {swap.status}
        </div>
      </div>

      {/* Main */}
      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        {/* Sender */}
        <UserSection
          title="Sender"
          user={swap.senderUser}
        />

        {/* Swap icon */}
        <div className="hidden lg:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E59A0B]/25 bg-[#E59A0B]/10 text-[#F5A623] shadow-[0_0_25px_rgba(229,154,11,0.08)]">
            <ArrowLeftRight size={19} />
          </div>
        </div>

        {/* Receiver */}
        <UserSection
          title="Receiver"
          user={swap.receiverUser}
        />
      </div>

      {/* Skills */}
      <div className="grid gap-3 border-t border-[#3D2110] bg-[#1A0D06]/50 p-5 md:grid-cols-2">
        <SkillBox
          label="Teaching Skill"
          skill={swap.teachingSkills}
        />

        <SkillBox
          label="Learning Skill"
          skill={swap.learningSkills}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 border-t border-[#3D2110] sm:grid-cols-3">
        <DateItem
          label="Started"
          date={startDate}
        />

        <DateItem
          label="Completed"
          date={completedDate}
        />

        <DateItem
          label="Created"
          date={swap.createdAt}
        />
      </div>
    </motion.div>
  );
}


interface UserSectionProps {
  title: string;
  user?: {
    name: string;
    email: string;
    experience?: string;
    bio?: string;
    avatar_image?: string;
  };
}

function UserSection({
  title,
  user,
}: UserSectionProps) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#78716C]">
        {title}
      </p>

      <div className="flex items-center gap-3">
        {user?.avatar_image ? (
          <img
            src={user.avatar_image}
            alt={user.name}
            className="h-12 w-12 rounded-full border border-[#4A2812] object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#4A2812] bg-[#1A0D06] text-sm font-bold text-[#F5A623]">
            {getInitial(user?.name)}
          </div>
        )}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#FFF7ED]">
            {user?.name || "Unknown User"}
          </p>

          <p className="truncate text-xs text-[#A8A29E]">
            {user?.email || "No email available"}
          </p>

          {user?.experience && (
            <p className="mt-1 truncate text-[11px] text-[#78716C]">
              {user.experience}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* SKILL BOX    */         

function SkillBox({
  label,
  skill,
}: {
  label: string;
  skill?: {
    name: string;
    skill_logo?: string;
    description?: string;
  };
}) {
  return (
    <div className="rounded-xl border border-[#3D2110] bg-[#140A05] p-4">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
        {label}
      </p>

      <div className="flex items-center gap-3">
        {skill?.skill_logo ? (
          <img
            src={skill.skill_logo}
            alt={skill.name}
            className="h-10 w-10 rounded-lg border border-[#4A2812] object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4A2812] bg-[#1A0D06] text-[#E59A0B]">
            <Activity size={17} />
          </div>
        )}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#FFF7ED]">
            {skill?.name || "Unknown Skill"}
          </p>

          {skill?.description && (
            <p className="mt-1 line-clamp-1 text-xs text-[#78716C]">
              {skill.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function DateItem({
  label,
  date,
}: {
  label: string;
  date?: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#3D2110] px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <Clock3
        size={16}
        className="shrink-0 text-[#78716C]"
      />

      <div>
        <p className="text-[11px] uppercase tracking-wider text-[#78716C]">
          {label}
        </p>

        <p className="mt-1 text-xs font-medium text-[#D6D3D1]">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}

function SwapSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[#3D2110] bg-[#140A05]">
      <div className="flex items-center justify-between border-b border-[#3D2110] p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#1A0D06]" />

          <div>
            <div className="h-4 w-28 rounded bg-[#1A0D06]" />
            <div className="mt-2 h-3 w-40 rounded bg-[#1A0D06]" />
          </div>
        </div>

        <div className="h-7 w-20 rounded-full bg-[#1A0D06]" />
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-2">
        <div className="h-16 rounded-xl bg-[#1A0D06]" />
        <div className="h-16 rounded-xl bg-[#1A0D06]" />
      </div>

      <div className="grid gap-3 border-t border-[#3D2110] p-5 md:grid-cols-2">
        <div className="h-20 rounded-xl bg-[#1A0D06]" />
        <div className="h-20 rounded-xl bg-[#1A0D06]" />
      </div>

      <div className="h-16 border-t border-[#3D2110] bg-[#1A0D06]" />
    </div>
  );
}