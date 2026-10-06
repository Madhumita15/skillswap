"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Eye,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

import { useChangeUserStatus, useUsers, useUser } from "@/hooks/useUser";

import { User, UserStatus } from "@/typescript/interface/user.interface";

import Pagination from "@/layout/adminLayout/Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// =====================================================
// HELPERS
// =====================================================

const getProfileImage = (user: User) => {
  return user.avatar_image || "/default-avatar.png";
};

const getSkillNames = (skills?: User["teachingSkills"]) => {
  if (!skills || skills.length === 0) {
    return "Not specified";
  }

  return skills.map((skill) => skill.name).join(", ");
};

const getExperience = (experience?: string | number) => {
  if (experience === undefined || experience === null || experience === "") {
    return "Not specified";
  }

  return String(experience);
};

// =====================================================
// PAGE
// =====================================================

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  //===============================
  //pagination
  //================================

  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   error,
  //   refetch,
  // } = useUsers();

  const { data, isLoading, isError, error, refetch } = useUsers(
    currentPage,
    limit,
    search,
  );

  console.log("data", data)

  const changeStatusMutation = useChangeUserStatus();

  const { data: selectedUserResponse, isLoading: isUserDetailsLoading } =
    useUser(selectedUserId || undefined);

  const users = data?.data || [];
  console.log("DATA: ", data);

  const pagination = data?.pagination ?? {
    currentPage: 1,
    limit: 10,
    totalUsers: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  // ===================================================
  // FILTER USERS
  // ===================================================

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return users;
    }

    return users.filter((user:User) => {
      const teachingSkills = getSkillNames(user.teachingSkills).toLowerCase();

      const learningSkills = getSkillNames(user.learningSkills).toLowerCase();

      return (
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        teachingSkills.includes(searchValue) ||
        learningSkills.includes(searchValue)
      );
    });
  }, [users, search]);

  // ===================================================
  // COUNTS
  // ===================================================

  const totalUsers = data?.stats?.totalUsers ?? 0;

  const activeUsers = data?.stats?.activeUsers ?? 0;

  const blockedUsers = data?.stats?.blockedUsers ?? 0;

  // ===================================================
  // CHANGE STATUS
  // ===================================================

  const handleChangeStatus = (user: User) => {
    const nextStatus: UserStatus =
      user.status === "blocked" ? "active" : "blocked";

    changeStatusMutation.mutate({
      userId: user._id,
      status: nextStatus,
    });
  };


  //====================================================
  //handle search
  //====================================================
  const handleSearch = (value: string) => {
  setSearch(value);
  setCurrentPage(1);
 };

  // ===================================================
  // LOADING
  // ===================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0804] p-4 text-white sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="animate-pulse">
            <div className="h-8 w-64 rounded-lg bg-[#241207]" />

            <div className="mt-3 h-4 w-96 max-w-full rounded bg-[#241207]" />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-28 rounded-2xl bg-[#1A0D06]" />
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-[#1A0D06] p-6">
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-16 rounded-xl bg-[#140A05]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0804] p-6 text-white">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#1A0D06] p-8 text-center"
        >
          <AlertTriangle size={42} className="mx-auto text-red-400" />

          <h2 className="mt-5 text-xl font-semibold text-[#FFF7ED]">
            Unable to load users
          </h2>

          <p className="mt-2 text-sm text-[#A8A29E]">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading users."}
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 rounded-xl border border-[#E59A0B]/40 bg-[#E59A0B]/10 px-5 py-2.5 text-sm font-medium text-[#F5A623] transition hover:border-[#E59A0B] hover:bg-[#E59A0B]/20"
          >
            Try again
          </button>
        </motion.div>
      </div>
    );
  }

  // ===================================================
  // MAIN PAGE
  // ===================================================

  return (
    <div className="min-h-screen bg-[#0B0804] text-white">
      <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* =============================================
            PAGE HEADER
        ============================================= */}

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
          className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end justify-end"
        >
          {/* <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E59A0B]/20 bg-[#E59A0B]/10 text-[#E59A0B] shadow-[0_0_25px_rgba(229,154,11,0.08)]">
                <Users size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#E59A0B]">
                  Admin Panel
                </p>

                <h1 className="text-2xl font-semibold tracking-tight text-[#FFF7ED] sm:text-3xl">
                  User Management
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm text-[#A8A29E]">
              View registered users, review their profiles and skills, and
              manage account access.
            </p>
          </div> */}

          {/* SEARCH */}

          <div className="relative w-full xl:w-[360px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search users, email or skills..."
              className="w-full rounded-xl border border-[#3D2110] bg-[#1A0D06] py-3 pl-11 pr-10 text-sm text-[#FFF7ED] outline-none transition placeholder:text-[#57504B] focus:border-[#E59A0B]/60 focus:ring-2 focus:ring-[#E59A0B]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] transition hover:text-[#E59A0B]"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* =============================================
            SUMMARY CARDS
        ============================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.45,
          }}
          className="grid gap-4 md:grid-cols-3"
        >
          <SummaryCard
            title="Total Users"
            value={totalUsers}
            description="Registered accounts"
            icon={Users}
          />

          <SummaryCard
            title="Active Users"
            value={activeUsers}
            description="Accounts with access"
            icon={UserCheck}
          />

          <SummaryCard
            title="Blocked Users"
            value={blockedUsers}
            description="Accounts restricted"
            icon={Ban}
          />
        </motion.section>

        {/* =============================================
            USERS TABLE
        ============================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.18,
            duration: 0.5,
          }}
          className="overflow-hidden rounded-2xl border border-[#3D2110] bg-[#1A0D06] shadow-xl shadow-black/10"
        >
          {/* SECTION HEADER */}

          <div className="flex flex-col gap-3 border-b border-[#3D2110] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-semibold text-[#FFF7ED]">
                All Users
              </h2>

              <p className="mt-1 text-sm text-[#78716C]">
                {search
                  ? `${filteredUsers.length} matching users`
                  : `${totalUsers} users registered on SkillSwap`}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#3D2110] bg-[#140A05] px-3 py-2">
              <ShieldCheck size={16} className="text-[#E59A0B]" />

              <span className="text-xs text-[#A8A29E]">Admin controls</span>
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="border-[#3D2110] bg-[#140A05] hover:bg-[#140A05]">
                  <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    User
                  </TableHead>

                  <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    Email
                  </TableHead>

                  <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    Status
                  </TableHead>

                  <TableHead className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map((user:User, index:number) => {
                    const isBlocked = user.status === "blocked";

                    const isChangingStatus =
                      changeStatusMutation.isPending &&
                      changeStatusMutation.variables?.userId === user._id;

                    return (
                      <motion.tr
                        key={user._id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                        transition={{
                          delay: index * 0.035,
                          duration: 0.35,
                        }}
                        className="group border-b border-[#2D180B] transition-colors hover:bg-[#211006]"
                      >
                        {/* USER */}

                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div
                                className={`h-12 w-12 overflow-hidden rounded-full border ${
                                  isBlocked
                                    ? "border-red-500/40"
                                    : "border-[#E59A0B]/40"
                                } bg-[#241207]`}
                              >
                                <Image                               
                                  src={getProfileImage(user)}
                                  alt={user.name}
                                  width={44}
                                  height={44}
                                  className={`h-full w-full object-cover ${
                                    isBlocked ? "grayscale" : ""
                                  }`}
                                />
                              </div>

                              <span
                                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1A0D06] ${
                                  isBlocked ? "bg-red-500" : "bg-emerald-400"
                                }`}
                              />
                            </div>

                            <div>
                              <p className="font-medium text-[#FFF7ED]">
                                {user.name}
                              </p>

                              <p className="mt-1 text-xs text-[#78716C]">
                                {user.role || "user"}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* EMAIL */}

                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-[#D6D3D1]">
                            <Mail size={15} className="text-[#78716C]" />

                            <span>{user.email}</span>
                          </div>
                        </TableCell>

                        {/* STATUS */}

                        <TableCell className="px-6 py-5">
                          <StatusBadge status={user.status} />
                        </TableCell>

                        {/* ACTIONS */}

                        <TableCell className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <ActionButton
                              variant={isBlocked ? "success" : "danger"}
                              disabled={isChangingStatus}
                              onClick={() => handleChangeStatus(user)}
                            >
                              {isChangingStatus ? (
                                <>
                                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  Processing...
                                </>
                              ) : isBlocked ? (
                                <>
                                  <UserCheck size={15} />
                                  Unblock
                                </>
                              ) : (
                                <>
                                  <Ban size={15} />
                                  Block
                                </>
                              )}
                            </ActionButton>

                            <ActionButton
                              variant="neutral"
                              onClick={() => setSelectedUserId(user._id)}
                            >
                              <Eye size={15} />
                              View More
                            </ActionButton>
                          </div>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* EMPTY */}

          {filteredUsers.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="px-6 py-16 text-center"
            >
              <Users size={40} className="mx-auto text-[#57402B]" />

              <h3 className="mt-4 text-lg font-semibold text-[#FFF7ED]">
                No users found
              </h3>

              <p className="mt-2 text-sm text-[#78716C]">
                Try changing your search term.
              </p>
            </motion.div>
          )}

          {/* PAGINATION */}

          {users.length > 0 && (
            <div className="px-5 pb-5 sm:px-6">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
                disabled={isLoading}
              />
            </div>
          )}
        </motion.section>
      </div>

      {/* ===============================================
          USER DETAILS DIALOG
      =============================================== */}

      <Dialog
        open={Boolean(selectedUserId)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUserId(null);
          }
        }}
      >
        <DialogContent
          className="
    max-h-[92vh]
    overflow-y-auto
    border border-[#8A4B08]
    bg-[#0F0804]
    p-0
    text-white
    shadow-[0_0_50px_rgba(0,0,0,0.65)]
    sm:max-w-3xl
  "
        >
          {/* HEADER */}
          <DialogHeader
            className="
      border-b border-[#3D2110]
      bg-[#140A05]
      px-6
      py-5
      sm:px-7
    "
          >
            <DialogTitle className="text-xl font-semibold text-[#FFF7ED]">
              User Details
            </DialogTitle>

            <DialogDescription className="mt-1 text-sm text-[#A8A29E]">
              Complete profile information for this SkillSwap user.
            </DialogDescription>
          </DialogHeader>

          <div className="px-5 pb-6 pt-5 sm:px-7">
            {isUserDetailsLoading ? (
              <UserDetailsSkeleton />
            ) : selectedUserResponse?.data ? (
              <UserDetails
                user={
                  Array.isArray(selectedUserResponse.data)
                    ? selectedUserResponse.data[0]
                    : selectedUserResponse.data
                }
              />
            ) : (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 py-10 text-center text-sm text-red-400">
                Unable to load user details.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group relative overflow-hidden rounded-2xl border border-[#3D2110] bg-[#1A0D06] p-5 shadow-xl shadow-black/10"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E59A0B] to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#A8A29E]">{title}</p>

          <motion.p
            key={value}
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-2 text-3xl font-semibold tracking-tight text-[#FFF7ED]"
          >
            {value}
          </motion.p>

          <p className="mt-2 text-xs text-[#78716C]">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E59A0B]/10 text-[#E59A0B] transition group-hover:shadow-[0_0_20px_rgba(229,154,11,0.18)]">
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}

// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({ status }: { status: UserStatus }) {
  if (status === "blocked") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
        <XCircle size={13} />
        Blocked
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
      <CheckCircle2 size={13} />
      Active
    </span>
  );
}

// =====================================================
// ACTION BUTTON
// =====================================================

function ActionButton({
  children,
  variant,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant: "danger" | "success" | "neutral";
  onClick: () => void;
  disabled?: boolean;
}) {
  const styles = {
    danger:
      "border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-400/50 hover:bg-red-500/15",

    success:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-500/15",

    neutral:
      "border-[#3D2110] bg-[#140A05] text-[#D6D3D1] hover:border-[#E59A0B]/40 hover:bg-[#E59A0B]/10 hover:text-[#E59A0B]",
  };

  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.02,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.97,
      }}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </motion.button>
  );
}

// =====================================================
// USER DETAILS
// =====================================================

function UserDetails({ user }: { user: User }) {
  const isBlocked = user.status === "blocked";

  return (
    <div className="space-y-5">
      {/* =================================================
          PROFILE HEADER
      ================================================= */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          rounded-2xl
          border border-[#8A4B08]
          bg-[#140A05]
          p-5
          sm:p-6
        "
      >
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* AVATAR */}

          <div className="relative shrink-0">
            <div
              className={`
                h-24
                w-24
                overflow-hidden
                rounded-full
                border-2
                ${isBlocked ? "border-red-500/50" : "border-[#E59A0B]/60"}
                bg-[#241207]
                shadow-[0_0_25px_rgba(229,154,11,0.10)]
              `}
            >
              <Image
                src={getProfileImage(user)}
                height={50}
                width={50}
                alt={user.name}
                className={`h-full w-full object-cover ${
                  isBlocked ? "grayscale" : ""
                }`}
              />
            </div>

            <span
              className={`
                absolute
                bottom-1
                right-1
                h-4
                w-4
                rounded-full
                border-2
                border-[#140A05]
                ${isBlocked ? "bg-red-500" : "bg-emerald-400"}
              `}
            />
          </div>

          {/* USER INFO */}

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h3 className="text-2xl font-semibold text-[#FFF7ED]">
                {user.name}
              </h3>

              <span className="w-fit self-center rounded-md border border-[#3D2110] bg-[#0F0804] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[#A8A29E] sm:self-auto">
                {user.role || "user"}
              </span>
            </div>

            <p className="mt-1 text-sm text-[#A8A29E]">{user.email}</p>

            <div className="mt-3">
              <StatusBadge status={user.status} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <DetailsSection title="Basic Information">
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailItem label="Name" value={user.name} />

          <DetailItem
            label="Email"
            value={user.email}
            icon={<Mail size={15} />}
          />

          <DetailItem
            label="Phone"
            value={user.phone || "Not specified"}
            icon={<Phone size={15} />}
          />

          <DetailItem
            label="Role"
            value={user.role || "user"}
            icon={<ShieldCheck size={15} />}
          />

          <DetailItem
            label="Email Verification"
            value={user.isEmailVerified ? "Verified" : "Not verified"}
            success={user.isEmailVerified}
          />

          <DetailItem
            label="Onboarding"
            value={user.isOnboardingComplete ? "Completed" : "Incomplete"}
            success={user.isOnboardingComplete}
          />
        </div>
      </DetailsSection>

      {/* =================================================
          SKILLS
      ================================================= */}

      <DetailsSection title="Skills">
        <div className="grid gap-3 sm:grid-cols-2">
          <SkillDetails title="Teaching Skills" skills={user.teachingSkills} />

          <SkillDetails title="Learning Skills" skills={user.learningSkills} />
        </div>
      </DetailsSection>

      {/* =================================================
          EXPERIENCE
      ================================================= */}

      <DetailsSection title="Experience">
        <div className="rounded-xl border border-[#3D2110] bg-[#100804] p-4">
          <p className="text-sm leading-7 text-[#D6D3D1]">
            {getExperience(user.experience)}
          </p>
        </div>
      </DetailsSection>

      {/* =================================================
          BIO
      ================================================= */}

      <DetailsSection title="Bio">
        <div className="rounded-xl border border-[#3D2110] bg-[#100804] p-4">
          <p className="text-sm leading-7 text-[#D6D3D1]">
            {user.bio || "No bio provided."}
          </p>
        </div>
      </DetailsSection>
    </div>
  );
}

function DetailsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        border border-[#5A3009]
        bg-[#120904]
        p-4
        sm:p-5
      "
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-[#E59A0B]" />

        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F5A623]">
          {title}
        </h4>
      </div>

      {children}
    </motion.div>
  );
}

// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({ title }: { title: string }) {
  return (
    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E59A0B]">
      {title}
    </h4>
  );
}

// =====================================================
// DETAIL ITEM
// =====================================================

function DetailItem({
  label,
  value,
  icon,
  success
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  success?: boolean
}) {
  return (
    <div className="rounded-xl border border-[#3D2110] bg-[#140A05] p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-2">
        {icon && <span className="text-[#78716C]">{icon}</span>}

        <p className="break-words text-sm text-[#D6D3D1]">{value}</p>
      </div>
    </div>
  );
}

// =====================================================
// SKILL DETAILS
// =====================================================

function SkillDetails({
  title,
  skills,
}: {
  title: string;
  skills?: User["teachingSkills"];
}) {
  return (
    <div className="rounded-xl border border-[#3D2110] bg-[#140A05] p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
        {title}
      </p>

      {!skills || skills.length === 0 ? (
        <p className="mt-2 text-sm text-[#78716C]">Not specified</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill._id}
              className="rounded-lg border border-[#3D2110] bg-[#1A0D06] px-3 py-1.5 text-xs text-[#D6D3D1]"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// =====================================================
// USER DETAILS SKELETON
// =====================================================

function UserDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 pt-3">
      <div className="flex items-center gap-4 rounded-2xl border border-[#3D2110] bg-[#140A05] p-6">
        <div className="h-24 w-24 rounded-full bg-[#241207]" />

        <div className="space-y-3">
          <div className="h-5 w-40 rounded bg-[#241207]" />
          <div className="h-4 w-56 rounded bg-[#241207]" />
          <div className="h-6 w-20 rounded-full bg-[#241207]" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-20 rounded-xl bg-[#140A05]" />
        ))}
      </div>
    </div>
  );
}
