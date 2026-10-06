
"use client";

import { motion, Variants } from "framer-motion";

import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  UserX,
} from "lucide-react";

import { useAdminDashboard } from "@/hooks/useAdminDashboard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#3D2110]
        bg-[#1A0D06]
        p-5
        shadow-xl
        shadow-black/10
        transition-all
        duration-300
        hover:border-[#F59E0B]/40
        hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          bg-[#F59E0B]/5
          blur-2xl
          transition-all
          duration-500
          group-hover:bg-[#F59E0B]/15
        "
      />

      {/* Top fluorescent line */}

      <div
        className="
          absolute
          left-0
          top-0
          h-px
          w-0
          bg-linear-to-r
          from-[#F59E0B]
          to-[#F97316]
          shadow-[0_0_10px_#F59E0B]
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      <div className="relative mb-5 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#A8A29E]">
            {title}
          </p>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="
              mt-2
              text-3xl
              font-semibold
              tracking-tight
              text-[#FFF7ED]
            "
          >
            {value}
          </motion.h3>
        </div>

        <motion.div
          whileHover={{
            rotate: 6,
            scale: 1.1,
          }}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-[#E59A0B]/10
            bg-[#E59A0B]/10
            text-[#F5A623]
            transition-all
            duration-300
            group-hover:border-[#F59E0B]/30
            group-hover:bg-[#E59A0B]/15
            group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]
          "
        >
          <Icon size={21} />
        </motion.div>
      </div>

      <p className="relative text-xs text-[#78716C]">
        {description}
      </p>
    </motion.div>
  );
};

/* ========================================================= */
/* MINI STAT */
/* ========================================================= */

const MiniStat = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
        borderColor: "rgba(245,158,11,0.25)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="
        rounded-xl
        border
        border-[#3D2110]
        bg-[#140A05]
        p-4
        transition-all
        duration-300
      "
    >
      <p className="text-xs text-[#78716C]">
        {label}
      </p>

      <motion.p
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          mt-2
          text-2xl
          font-semibold
          text-[#FFF7ED]
        "
      >
        {value}
      </motion.p>
    </motion.div>
  );
};

/* ========================================================= */
/* DASHBOARD */
/* ========================================================= */

export default function AdminDashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useAdminDashboard();

  

  /* ======================================================= */
  /* LOADING */
  /* ======================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0804] text-white">

        <main className="min-h-screen ">
          <div className="p-5 sm:p-8">
            <div className="animate-pulse">
              <div className="h-8 w-64 rounded bg-[#241207]" />

              <div className="mt-3 h-4 w-96 max-w-full rounded bg-[#241207]" />

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 8 }).map(
                  (_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.1,
                      }}
                      className="
                        h-36
                        rounded-2xl
                        bg-[#1A0D06]
                      "
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ======================================================= */
  /* ERROR */
  /* ======================================================= */

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0B0804] text-white">

        <main
          className="
            flex
            min-h-screen
            items-center
            justify-center
            p-5
            lg:ml-72.5
            lg:p-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/5
              p-8
              text-center
            "
          >
            <AlertTriangle
              className="mx-auto text-red-400"
              size={40}
            />

            <h2 className="mt-4 text-xl font-semibold">
              Unable to load dashboard
            </h2>

            <p className="mt-2 text-sm text-[#A8A29E]">
              {(error as Error)?.message ||
                "Something went wrong while loading statistics."}
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  const stats = data?.data;

  /* ======================================================= */
  /* MAIN DASHBOARD */
  /* ======================================================= */

  return (
    <div className="min-h-screen bg-[#0B0804] text-white">

      <main className="min-h-screen">

        {/* CONTENT */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            space-y-8
            p-5
            sm:p-6
            lg:p-8
          "
        >

          {/* MAIN STATISTICS */}

          <motion.section variants={itemVariants}>

            <motion.div
              variants={itemVariants}
              className="mb-5"
            >
              <h2 className="text-lg font-semibold text-[#FFF7ED]">
                Platform overview
              </h2>

              <p className="mt-1 text-sm text-[#78716C]">
                Real-time statistics from your MongoDB collections.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-4
              "
            >
              <StatCard
                title="Total Users"
                value={stats?.users?.total || 0}
                description={`${stats?.users?.active || 0} active accounts`}
                icon={Users}
              />

              <StatCard
                title="Verified Users"
                value={stats?.users?.verified || 0}
                description="Email verified accounts"
                icon={ShieldCheck}
              />

              <StatCard
                title="Total Skills"
                value={stats?.skills?.total || 0}
                description="Standardized skill catalog"
                icon={Sparkles}
              />

              <StatCard
                title="Pending Requests"
                value={stats?.swapRequests?.pending || 0}
                description="Requests awaiting action"
                icon={Clock3}
              />

              <StatCard
                title="Active Swaps"
                value={stats?.swaps?.active || 0}
                description="Currently active exchanges"
                icon={ArrowLeftRight}
              />

              <StatCard
                title="Completed Swaps"
                value={stats?.swaps?.completed || 0}
                description="Successfully completed exchanges"
                icon={CheckCircle2}
              />

              <StatCard
                title="Blocked Users"
                value={stats?.users?.blocked || 0}
                description="Accounts currently blocked"
                icon={UserX}
              />

              <StatCard
                title="Pending Reports"
                value={stats?.reports?.pending || 0}
                description="Reports awaiting moderation"
                icon={AlertTriangle}
              />
            </motion.div>

          </motion.section>

          {/* ================================================= */}
          {/* SECONDARY STATISTICS */}
          {/* ================================================= */}

          <motion.section
            variants={containerVariants}
            className="grid gap-6 lg:grid-cols-2"
          >

            {/* SWAP REQUESTS */}

            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -3,
              }}
              className="
                group
                rounded-2xl
                border
                border-[#3D2110]
                bg-[#1A0D06]
                p-6
                transition-all
                duration-300
                hover:border-[#6B3515]
                hover:shadow-[0_0_25px_rgba(245,158,11,0.06)]
              "
            >
              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-semibold text-[#FFF7ED]">
                    Swap requests
                  </h2>

                  <p className="mt-1 text-sm text-[#78716C]">
                    Current request activity
                  </p>
                </div>

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.1,
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#E59A0B]/10
                  "
                >
                  <ArrowLeftRight
                    size={20}
                    className="text-[#E59A0B]"
                  />
                </motion.div>

              </div>

              <div className="grid grid-cols-3 gap-3">

                <MiniStat
                  label="Pending"
                  value={
                    stats?.swapRequests?.pending || 0
                  }
                />

                <MiniStat
                  label="Accepted"
                  value={
                    stats?.swapRequests?.accepted || 0
                  }
                />

                <MiniStat
                  label="Rejected"
                  value={
                    stats?.swapRequests?.rejected || 0
                  }
                />

              </div>
            </motion.div>

            {/* REPORTS */}

            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -3,
              }}
              className="
                group
                rounded-2xl
                border
                border-[#3D2110]
                bg-[#1A0D06]
                p-6
                transition-all
                duration-300
                hover:border-[#6B3515]
                hover:shadow-[0_0_25px_rgba(245,158,11,0.06)]
              "
            >
              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-semibold text-[#FFF7ED]">
                    Moderation
                  </h2>

                  <p className="mt-1 text-sm text-[#78716C]">
                    Report review statistics
                  </p>
                </div>

                <motion.div
                  whileHover={{
                    rotate: -8,
                    scale: 1.1,
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#E59A0B]/10
                  "
                >
                  <AlertTriangle
                    size={20}
                    className="text-[#E59A0B]"
                  />
                </motion.div>

              </div>

              <div className="grid grid-cols-3 gap-3">

                <MiniStat
                  label="Total"
                  value={
                    stats?.reports?.total || 0
                  }
                />

                <MiniStat
                  label="Pending"
                  value={
                    stats?.reports?.pending || 0
                  }
                />

                <MiniStat
                  label="Resolved"
                  value={
                    stats?.reports?.resolved || 0
                  }
                />

              </div>
            </motion.div>

          </motion.section>

          {/* ================================================= */}
          {/* USERS + RATING */}
          {/* ================================================= */}

          <motion.section
            variants={containerVariants}
            className="grid gap-6 lg:grid-cols-2"
          >

            {/* USER ACCOUNTS */}

            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -3,
              }}
              className="
                rounded-2xl
                border
                border-[#3D2110]
                bg-[#1A0D06]
                p-6
                transition-all
                duration-300
                hover:border-[#6B3515]
                hover:shadow-[0_0_25px_rgba(245,158,11,0.06)]
              "
            >
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#FFF7ED]">
                  User accounts
                </h2>

                <p className="mt-1 text-sm text-[#78716C]">
                  Account status overview
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <MiniStat
                  label="Total users"
                  value={stats?.users?.total || 0}
                />

                <MiniStat
                  label="Active users"
                  value={stats?.users?.active || 0}
                />

                <MiniStat
                  label="Verified"
                  value={stats?.users?.verified || 0}
                />

                <MiniStat
                  label="Blocked"
                  value={stats?.users?.blocked || 0}
                />

              </div>
            </motion.div>

            {/* RATING */}

            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -3,
              }}
              className="
                rounded-2xl
                border
                border-[#3D2110]
                bg-[#1A0D06]
                p-6
                transition-all
                duration-300
                hover:border-[#6B3515]
                hover:shadow-[0_0_25px_rgba(245,158,11,0.06)]
              "
            >
              <div className="flex items-center gap-4">

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#E59A0B]/10
                  "
                >
                  <Star
                    size={25}
                    className="fill-[#E59A0B] text-[#E59A0B]"
                  />
                </motion.div>

                <div>
                  <p className="text-sm text-[#A8A29E]">
                    Average platform rating
                  </p>

                  <div className="mt-1 flex items-end gap-2">

                    <motion.span
                      key={stats?.reviews?.averageRating}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        text-4xl
                        font-semibold
                        text-[#FFF7ED]
                      "
                    >
                      {stats?.reviews?.avgReviews || 0}
                    </motion.span>

                    <span className="mb-1 text-sm text-[#78716C]">
                      / 5
                    </span>

                  </div>
                </div>

              </div>

              <div className="mt-7 border-t border-[#3D2110] pt-5">

                <p className="text-sm text-[#A8A29E]">
                  Total reviews
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#FFF7ED]">
                  {stats?.reviews?.totalReviews || 0}
                </p>

              </div>
            </motion.div>

          </motion.section>

        </motion.div>
      </main>
    </div>
  );
}

