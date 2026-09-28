"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Handshake,
  MessageCircle,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundSearch,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: CircleUserRound,
    title: "Create your skill profile",
    description:
      "Tell the community what you can teach and what you want to learn. Add your experience, bio and skills to create a profile that represents your learning goals.",
    tags: ["Teaching skills", "Learning skills", "Experience"],
  },
  {
    number: "02",
    icon: UserRoundSearch,
    title: "Discover compatible people",
    description:
      "Explore people based on their skills and learning interests. SkillSwap helps you find users whose skills complement what you want to learn.",
    tags: ["Discover", "Search", "Skill filters"],
  },
  {
    number: "03",
    icon: Zap,
    title: "Find your match",
    description:
      "SkillSwap looks for a two-way skill connection: you want to learn something they can teach, while they want to learn something you can teach.",
    tags: ["Two-way match", "Compatibility", "Match score"],
  },
  {
    number: "04",
    icon: Send,
    title: "Send a swap request",
    description:
      "Found someone compatible? Select the skills you want to exchange and send a short message. The other person can accept or reject your request.",
    tags: ["Choose skills", "Send request", "Accept / Reject"],
  },
  {
    number: "05",
    icon: Handshake,
    title: "Start your skill swap",
    description:
      "Once the request is accepted, it becomes an active swap. Both participants can work through the exchange and complete it when the learning experience is finished.",
    tags: ["Active swap", "Complete", "Build reputation"],
  },
];

const benefits = [
  {
    icon: RefreshCw,
    title: "Two-way learning",
    description:
      "SkillSwap is designed around exchanging knowledge rather than simply consuming it.",
  },
  {
    icon: Users,
    title: "People with complementary skills",
    description:
      "Connect with users whose teaching and learning interests complement your own.",
  },
  {
    icon: ShieldCheck,
    title: "Structured workflow",
    description:
      "Requests, active swaps and completed exchanges give every interaction a clear lifecycle.",
  },
  {
    icon: Star,
    title: "Build your reputation",
    description:
      "After completing a swap, participants can review each other and build their profile reputation.",
  },
];

const lifecycle = [
  {
    icon: Send,
    title: "Request sent",
    status: "Pending",
  },
  {
    icon: Clock3,
    title: "Waiting for response",
    status: "Pending",
  },
  {
    icon: CheckCircle2,
    title: "Request accepted",
    status: "Accepted",
  },
  {
    icon: Handshake,
    title: "Active swap",
    status: "Active",
  },
  {
    icon: Star,
    title: "Swap completed",
    status: "Completed",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fromLeft = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fromRight = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const HowItWorksPage = () => {
  return (
    <main className="overflow-hidden bg-[#0B0804] text-[#FFF7ED]">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative isolate px-5 pb-20 pt-20 sm:px-8 md:pb-28 md:pt-28 lg:px-12">
        {/* Background effects */}
        <div className="pointer-events-none absolute left-[-120px] top-20 -z-10 h-72 w-72 rounded-full bg-[#F97316]/10 blur-3xl" />

        <div className="pointer-events-none absolute right-[-100px] top-10 -z-10 h-80 w-80 rounded-full bg-[#E59A0B]/10 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008] px-4 py-2 text-sm text-[#E59A0B] shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            Simple, meaningful skill exchange
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            How{" "}
            <span className="bg-linear-to-r from-[#F97316] to-[#E59A0B] bg-clip-text text-transparent">
              SkillSwap
            </span>{" "}
            works
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#A8A29E] sm:text-lg sm:leading-8"
          >
            SkillSwap makes peer-to-peer learning simple. Share the skills you
            know, discover people who complement your goals, exchange knowledge
            and build meaningful learning connections.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/register"
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-7 font-bold text-[#1C1008] shadow-lg shadow-[#F97316]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F97316]/20 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
            >
              {/* Hover color — sweeps from LEFT → RIGHT */}
              <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#52291A] to-[#1A0D04] transition-all duration-500 ease-out group-hover:w-full" />

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                Start Swapping
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/explore-skill"
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#6B3515] bg-[#1C1008] px-7 font-semibold text-[#FFF7ED] shadow-lg shadow-[#F97316]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316] hover:shadow-xl hover:shadow-[#F97316]/10 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
            >
              {/* Left → center */}
              <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#F97316] to-[#52291A] transition-all duration-500 ease-out group-hover:w-1/2" />

              {/* Right → center */}
              <span className="absolute inset-y-0 right-0 w-0 bg-linear-to-r from-[#52291A] to-[#F97316] transition-all duration-500 ease-out group-hover:w-1/2" />

              {/* Content */}
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                Explore Skills
                <Search className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero workflow visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#6B3515] bg-[#1C1008] p-5 shadow-2xl sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#F97316] to-transparent" />

            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#E59A0B]">
                  Your learning journey
                </p>
                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  From skills to real connections
                </h2>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#F97316] to-[#E59A0B] text-[#1C1008] sm:flex">
                <Zap className="h-5 w-5" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group relative rounded-2xl border border-[#52291A] bg-[#100905] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]/60 hover:bg-[#160B05]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#F97316] to-[#E59A0B] text-[#1C1008]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-xs font-bold text-[#6B3515]">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold">{step.title}</h3>

                    {index !== steps.length - 1 && (
                      <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-[#F97316] md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================
          MAIN STEPS
      ========================================================== */}
      <section className="border-y border-[#52291A]/60 bg-[#100905] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E59A0B]">
              The process
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Learning becomes easier when the process is clear.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#A8A29E] sm:text-lg">
              Every SkillSwap interaction follows a simple journey — from
              creating your profile to completing a meaningful exchange.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="mt-16 space-y-8"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  variants={isEven ? fromLeft : fromRight}
                  className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Visual */}
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div className="relative overflow-hidden rounded-3xl border border-[#6B3515] bg-[#1C1008] p-6 transition-all duration-500 group-hover:border-[#F97316]/60 group-hover:shadow-2xl group-hover:shadow-[#F97316]/5 sm:p-8">
                      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#F97316]/10 blur-3xl transition-all duration-500 group-hover:bg-[#F97316]/20" />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <span className="text-6xl font-black text-[#52291A] sm:text-7xl">
                            {step.number}
                          </span>

                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#F97316] to-[#E59A0B] text-[#1C1008] shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                            <Icon className="h-7 w-7" />
                          </div>
                        </div>

                        {/* Fake dashboard UI */}
                        <div className="mt-8 rounded-2xl border border-[#52291A] bg-[#100905] p-4">
                          <div className="mb-4 flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-[#F97316]" />
                            <div className="h-2.5 w-2.5 rounded-full bg-[#E59A0B]" />
                            <div className="h-2.5 w-2.5 rounded-full bg-[#52291A]" />
                          </div>

                          <div className="space-y-3">
                            <div className="h-3 w-2/3 rounded-full bg-[#52291A]" />
                            <div className="h-3 w-full rounded-full bg-[#241208]" />
                            <div className="h-3 w-5/6 rounded-full bg-[#241208]" />
                          </div>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#6B3515] bg-[#1C1008] px-3 py-1.5 text-xs text-[#F97316]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                    <div className="max-w-xl">
                      <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#F97316]">
                        Step {step.number}
                      </span>

                      <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                        {step.title}
                      </h3>

                      <p className="mt-5 text-base leading-8 text-[#A8A29E]">
                        {step.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#52291A] bg-[#1C1008] px-3 py-1.5 text-xs font-medium text-[#E59A0B] transition-colors duration-300 hover:border-[#F97316] hover:text-[#F97316]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          TWO WAY MATCHING
      ========================================================== */}
      <section className="relative px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E59A0B]">
              The heart of SkillSwap
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Skills that find each other.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#A8A29E] sm:text-lg">
              A strong match is not one-sided. Both people should have something
              valuable to teach and something valuable to learn.
            </p>
          </motion.div>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
              {/* Person A */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fromLeft}
                className="rounded-3xl border border-[#6B3515] bg-[#1C1008] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#F97316]/70 hover:shadow-xl hover:shadow-[#F97316]/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#F97316] to-[#E59A0B] text-lg font-extrabold text-[#1C1008]">
                    A
                  </div>

                  <div>
                    <h3 className="font-bold">Alex</h3>
                    <p className="text-sm text-[#A8A29E]">
                      Full Stack Developer
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-[#52291A] bg-[#100905] p-3">
                    <p className="text-xs text-[#A8A29E]">Can teach</p>
                    <p className="mt-1 font-semibold text-[#F97316]">Node.js</p>
                  </div>

                  <div className="rounded-xl border border-[#52291A] bg-[#100905] p-3">
                    <p className="text-xs text-[#A8A29E]">Wants to learn</p>
                    <p className="mt-1 font-semibold text-[#E59A0B]">
                      React.js
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Center */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={scaleIn}
                className="relative flex items-center justify-center"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#F97316]/50 bg-[#1C1008] shadow-xl shadow-[#F97316]/10">
                  <div className="absolute inset-2 rounded-full bg-linear-to-br from-[#F97316] to-[#E59A0B] opacity-15" />
                  <RefreshCw className="relative h-7 w-7 text-[#F97316]" />
                </div>
              </motion.div>

              {/* Person B */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fromRight}
                className="rounded-3xl border border-[#6B3515] bg-[#1C1008] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#E59A0B]/70 hover:shadow-xl hover:shadow-[#E59A0B]/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#E59A0B] to-[#F97316] text-lg font-extrabold text-[#1C1008]">
                    B
                  </div>

                  <div>
                    <h3 className="font-bold">Sarah</h3>
                    <p className="text-sm text-[#A8A29E]">Frontend Developer</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-[#52291A] bg-[#100905] p-3">
                    <p className="text-xs text-[#A8A29E]">Can teach</p>
                    <p className="mt-1 font-semibold text-[#F97316]">
                      React.js
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#52291A] bg-[#100905] p-3">
                    <p className="text-xs text-[#A8A29E]">Wants to learn</p>
                    <p className="mt-1 font-semibold text-[#E59A0B]">Node.js</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008] px-5 py-2.5 text-sm font-semibold text-[#E59A0B]"
            >
              <Check className="h-4 w-4 text-[#F97316]" />
              Two-way skill compatibility
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REQUEST LIFECYCLE
      ========================================================== */}
      <section className="border-y border-[#52291A]/60 bg-[#100905] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#F97316]">
              One clear lifecycle
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              From request to real exchange.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#A8A29E] sm:text-lg">
              A SkillSwap connection does not happen automatically. The
              participants control the exchange from the first request through
              completion.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {lifecycle.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group relative rounded-2xl border border-[#52291A] bg-[#1C1008] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-[#F97316]/60 hover:shadow-xl hover:shadow-[#F97316]/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#100905] text-[#F97316] transition-all duration-300 group-hover:bg-linear-to-br group-hover:from-[#F97316] group-hover:to-[#E59A0B] group-hover:text-[#1C1008]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-semibold text-[#A8A29E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold">{item.title}</h3>

                  <span className="mt-3 inline-flex rounded-full border border-[#6B3515] bg-[#100905] px-2.5 py-1 text-xs text-[#E59A0B]">
                    {item.status}
                  </span>

                  {index !== lifecycle.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-[#6B3515] lg:block" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================== */}
      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E59A0B]">
              Why this workflow
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Built around meaningful exchanges.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#A8A29E] sm:text-lg">
              SkillSwap connects the technical matching process with a simple
              human workflow.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-[#52291A] bg-[#1C1008] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#F97316]/60 hover:bg-[#211107] hover:shadow-xl hover:shadow-[#F97316]/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#100905] text-[#F97316] transition-all duration-300 group-hover:bg-linear-to-br group-hover:from-[#F97316] group-hover:to-[#E59A0B] group-hover:text-[#1C1008]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">{benefit.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#A8A29E]">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          NOTIFICATIONS / COMPLETION
      ========================================================== */}
      <section className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid overflow-hidden rounded-3xl border border-[#6B3515] bg-[#1C1008] lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fromLeft}
              className="p-7 sm:p-10 lg:p-12"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#F97316]">
                Stay connected
              </span>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Know what happens next.
              </h2>

              <p className="mt-5 leading-7 text-[#A8A29E]">
                SkillSwap keeps participants informed about important activity
                such as new requests, accepted or rejected requests and
                completed swaps through notifications.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "New swap request",
                  "Request accepted or rejected",
                  "Swap completed",
                  "New review activity",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-[#52291A] bg-[#100905] p-3.5 transition-all duration-300 hover:border-[#F97316]/50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1008]">
                      <Bell className="h-4 w-4 text-[#E59A0B]" />
                    </div>

                    <span className="text-sm text-[#FFF7ED]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fromRight}
              className="relative flex min-h-87.5 items-center justify-center overflow-hidden bg-[#100905] p-8"
            >
              <div className="absolute -right-15 -top-15 h-52 w-52 rounded-full bg-[#F97316]/10 blur-3xl" />

              <div className="relative w-full max-w-sm">
                <div className="rounded-3xl border border-[#6B3515] bg-[#1C1008] p-5 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#F97316] to-[#E59A0B] text-[#1C1008]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">Swap completed</p>
                      <p className="text-xs text-[#A8A29E]">
                        Your learning journey continues
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#52291A] bg-[#100905] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#A8A29E]">
                        Skill exchange
                      </span>

                      <span className="text-sm font-bold text-[#E59A0B]">
                        Complete
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#241208]">
                      <div className="h-full w-full rounded-full bg-linear-to-r from-[#F97316] to-[#E59A0B]" />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-[#A8A29E]">
                      <span>Started</span>
                      <span>Completed</span>
                    </div>
                  </div>

                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#6B3515] bg-[#100905] px-4 py-3 text-sm font-semibold text-[#FFF7ED] transition-all duration-300 hover:border-[#F97316] hover:text-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]">
                    <MessageCircle className="h-4 w-4" />
                    Leave a review
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="relative px-5 pb-24 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-[#F97316]/5 to-transparent" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#6B3515] bg-[#1C1008] px-6 py-14 text-center shadow-2xl sm:px-10 md:py-20"
        >
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-[#F97316] to-transparent" />

          <Sparkles className="mx-auto h-8 w-8 text-[#E59A0B]" />

          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Your next skill exchange could start with one request.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#A8A29E] sm:text-lg">
            Create your profile, find someone whose skills complement yours and
            start learning together.
          </p>

          <Link
            href="/register"
            className="group relative inline-flex h-12 mt-8 items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-7 font-bold text-[#1C1008] shadow-lg shadow-[#F97316]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F97316]/20 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
          >
            {/* Hover color — sweeps from LEFT → RIGHT */}
            <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#52291A] to-[#1A0D04] transition-all duration-500 ease-out group-hover:w-full" />

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
              Get started with skillswap
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
