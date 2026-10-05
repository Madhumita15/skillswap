"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Play,
  Search,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from "lucide-react";
import SkillMatching from "@/components/SkillMatching";
import DiscoverSkills from "@/components/DiscoverSkills";
import Image from "next/image";
import { useGetActiveSkillByUser } from "@/hooks/useSkills";

const Home = () => {
  const steps = [
    {
      number: "01",
      title: "Build your profile",
      description:
        "Tell the community what you can teach and what you want to learn.",
      icon: Users,
    },
    {
      number: "02",
      title: "Find your match",
      description:
        "Discover people whose teaching and learning skills complement yours.",
      icon: Search,
    },
    {
      number: "03",
      title: "Start a swap",
      description:
        "Send a request, connect with your match, and begin your skill exchange.",
      icon: ArrowRight,
    },
    {
      number: "04",
      title: "Grow together",
      description:
        "Complete your swap, leave a review, and build your reputation.",
      icon: Star,
    },
  ];

  const benefits = [
    "Learn directly from real people",
    "Exchange skills instead of paying for courses",
    "Discover people with complementary skills",
    "Build meaningful learning connections",
  ];

  const {data} = useGetActiveSkillByUser()
  const skills = data?.data || []
  

  return (
    <main className="overflow-hidden bg-[#0B0804] text-[#FFF7ED]">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/ChatGPT Image Sep 28, 2026, 01_30_41 AM (1).png"
          alt=""
          fill
          priority
          className="absolute inset-0 -z-30 h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 -z-20 bg-[#0B0804]/70" />

        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#F97316]/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#E59A0B]/10 blur-[120px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/5 blur-[100px]" />

        {/* EVERYTHING BELOW STAYS EXACTLY THE SAME */}
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          {/* Hero content */}
          <div className="relative z-10 max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008]/80 px-4 py-2 text-sm text-[#E7D8CC] shadow-lg shadow-black/20 backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#E59A0B]" />

              <span>Learn. Teach. Exchange.</span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Share your skills.
              <br />
              <span className="bg-linear-to-r from-[#F97316] via-[#E59A0B] to-[#F97316] bg-clip-text text-transparent">
                Learn something new.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-[#A8A29E] sm:text-lg">
              SkillSwap connects people who want to teach what they know with
              people who want to learn what they love. Find compatible skill
              partners and grow together.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-7 font-bold text-[#1C1008] shadow-lg shadow-[#F97316]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F97316]/20 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
              >
                {/* Hover color — sweeps from LEFT → RIGHT */}
                <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#52291A] to-[#1A0D04] transition-all duration-500 ease-out group-hover:w-full" />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                  Get Started
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
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>

            {/* Small trust line */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#78716C]">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#E59A0B]" />
                Skill-based matching
              </div>

              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#E59A0B]" />
                Peer-to-peer learning
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative flex min-h-105 items-center justify-center lg:min-h-140">
            {/* Decorative circles */}
            <div className="absolute h-85 w-85 rounded-full border border-[#6B3515]/30 sm:h-110 sm:w-110" />

            <div className="absolute h-67.5 w-67.5 rounded-full border border-[#F97316]/10 sm:h-87.5 sm:w-87.5" />

            {/* Main visual card */}
            <div className="relative z-10 w-full max-w-120">
              {/* Top floating card */}
              <div className="absolute -right-2 -top-8 z-20 hidden w-48 rounded-2xl border border-[#6B3515] bg-[#1C1008]/95 p-4 shadow-2xl backdrop-blur sm:block lg:-right-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10">
                    <Sparkles className="h-5 w-5 text-[#F97316]" />
                  </div>

                  <div>
                    <p className="text-xs text-[#78716C]">Match found</p>
                    <p className="text-sm font-bold text-[#FFF7ED]">
                      94% compatible
                    </p>
                  </div>
                </div>
              </div>

              {/* Main exchange card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-5 shadow-2xl shadow-black/40 sm:p-7">
                {/* Card glow */}
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#F97316]/10 blur-3xl" />

                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#78716C]">
                        Skill Exchange
                      </p>

                      <h3 className="mt-1 text-lg font-bold">
                        Find your perfect swap
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#F97316] to-[#E59A0B] text-[#1C1008]">
                      <Zap className="h-5 w-5" />
                    </div>
                  </div>

                  {/* User A */}
                  <div className="rounded-2xl border border-[#52291A] bg-[#100905] p-4 transition-all duration-300 hover:border-[#F97316]/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#F97316] to-[#E59A0B] font-bold text-[#1C1008]">
                        A
                      </div>

                      <div>
                        <p className="font-semibold">Alex</p>

                        <p className="text-xs text-[#78716C]">
                          Full Stack Developer
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#6B3515] bg-[#1C1008] px-3 py-1 text-xs text-[#F97316]">
                        Can teach · MongoDB
                      </span>

                      <span className="rounded-full border border-[#6B3515] bg-[#1C1008] px-3 py-1 text-xs text-[#E59A0B]">
                        Wants to learn · React
                      </span>
                    </div>
                  </div>

                  {/* Exchange icon */}
                  <div className="relative z-10 mx-auto -my-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#6B3515] bg-[#1C1008] shadow-lg">
                    <ArrowRight className="h-5 w-5 rotate-90 text-[#F97316]" />
                  </div>

                  {/* User B */}
                  <div className="rounded-2xl border border-[#52291A] bg-[#100905] p-4 transition-all duration-300 hover:border-[#F97316]/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#52291A] font-bold text-[#FFF7ED]">
                        S
                      </div>

                      <div>
                        <p className="font-semibold">Sarah</p>

                        <p className="text-xs text-[#78716C]">
                          Frontend Developer
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#6B3515] bg-[#1C1008] px-3 py-1 text-xs text-[#F97316]">
                        Can teach · React
                      </span>

                      <span className="rounded-full border border-[#6B3515] bg-[#1C1008] px-3 py-1 text-xs text-[#E59A0B]">
                        Wants to learn · MongoDB
                      </span>
                    </div>
                  </div>

                  {/* Match result */}
                  <div className="mt-5 flex items-center justify-between rounded-xl border border-[#F97316]/20 bg-[#F97316]/5 px-4 py-3">
                    <div>
                      <p className="text-xs text-[#A8A29E]">Compatibility</p>

                      <p className="font-bold text-[#F97316]">Strong Match</p>
                    </div>

                    <div className="text-2xl font-extrabold text-[#E59A0B]">
                      94%
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom floating card */}
              <div className="absolute -bottom-7 -left-4 z-20 hidden rounded-2xl border border-[#6B3515] bg-[#1C1008]/95 px-5 py-4 shadow-2xl backdrop-blur sm:block lg:-left-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E59A0B]/10">
                    <Star className="h-5 w-5 fill-[#E59A0B] text-[#E59A0B]" />
                  </div>

                  <div>
                    <p className="text-xs text-[#78716C]">Learn together</p>
                    <p className="text-sm font-bold">Grow together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-[#0B0804] to-transparent" />
      </section>

      {/* =====================================================
          STATS / TRUST STRIP
      ===================================================== */}
      <section className="overflow-hidden border-y border-[#52291A]/60 bg-[#100905]">
        <div className="relative flex overflow-hidden py-7">
          {/* Moving track */}
          <div className="flex min-w-max animate-marquee-right">
            {/* First set */}
            <div className="flex items-center">
              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#F97316] sm:text-3xl">
                  1:1
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  Peer learning
                </p>
              </div>

              <div className="h-10 w-px bg-[#52291A]/50" />

              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#E59A0B] sm:text-3xl">
                  2-Way
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  Skill matching
                </p>
              </div>

              <div className="h-10 w-px bg-[#52291A]/50" />

              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#F97316] sm:text-3xl">
                  Learn
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  From real people
                </p>
              </div>

              <div className="h-10 w-px bg-[#52291A]/50" />

              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#E59A0B] sm:text-3xl">
                  Grow
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  Through exchange
                </p>
              </div>
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex items-center">
              <div className="h-10 w-px bg-[#52291A]/50" />

              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#F97316] sm:text-3xl">
                  1:1
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  Peer learning
                </p>
              </div>

              <div className="h-10 w-px bg-[#52291A]/50" />

              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#E59A0B] sm:text-3xl">
                  2-Way
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  Skill matching
                </p>
              </div>

              <div className="h-10 w-px bg-[#52291A]/50" />

              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#F97316] sm:text-3xl">
                  Learn
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  From real people
                </p>
              </div>

              <div className="h-10 w-px bg-[#52291A]/50" />

              <div className="px-10 text-center sm:px-14">
                <p className="text-2xl font-extrabold text-[#E59A0B] sm:text-3xl">
                  Grow
                </p>
                <p className="mt-1 text-xs text-[#78716C] sm:text-sm">
                  Through exchange
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section heading */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#E59A0B]">
              <Sparkles className="h-3.5 w-3.5" />
              Simple by design
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How SkillSwap works
            </h2>

            <p className="mt-5 text-[#A8A29E]">
              From creating your profile to completing your first swap,
              everything is designed to make skill exchange simple.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-[#52291A] bg-[#1C1008]/70 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#F97316]/60 hover:bg-[#1C1008] hover:shadow-xl hover:shadow-black/30"
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#E59A0B]">
                      {step.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#6B3515] bg-[#100905] transition-all duration-300 group-hover:border-[#F97316] group-hover:bg-[#F97316]/10">
                      <Icon className="h-5 w-5 text-[#F97316]" />
                    </div>
                  </div>

                  <h3 className="mt-7 text-lg font-bold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#A8A29E]">
                    {step.description}
                  </p>

                  {index !== steps.length - 1 && (
                    <ChevronRight className="absolute -right-4 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-[#52291A] bg-[#0B0804] p-1 text-[#F97316] lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          VIDEO SECTION
      ===================================================== */}
      <section className="relative border-y border-[#52291A]/60 bg-[#100905] py-24 sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F97316]">
              <Video className="h-3.5 w-3.5" />
              See it in action
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              See how SkillSwap works
            </h2>

            <p className="mt-5 text-[#A8A29E]">
              Discover how people can connect, exchange skills, and learn
              together through SkillSwap.
            </p>
          </div>

          {/* Video */}
          <div className="group relative mt-14 overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-2 shadow-2xl shadow-black/40">
            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-[#0B0804]">
              {/* Replace this with your actual video */}
              <video
                className="h-full w-full object-cover"
                controls
                muted
                playsInline
                preload="metadata"
              >
                <source
                  src="/videos/Hailuo_Video_Create a premium cinematic pro_560872161904762884.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0B0804]/60 via-transparent to-transparent" />

              {/* Play decoration */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#F97316]/90 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E59A0B]">
                <Play className="ml-1 h-6 w-6 fill-[#1C1008] text-[#1C1008]" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-[#78716C]">
            A quick look at the SkillSwap experience
          </p>
        </div>
      </section>

      {/* =====================================================
          WHY SKILLSWAP
      ===================================================== */}
      <section className="relative py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          {/* Left */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#E59A0B]">
              <Zap className="h-3.5 w-3.5" />
              Why SkillSwap
            </div>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Your knowledge is valuable.
              <span className="text-[#F97316]"> Share it.</span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-[#A8A29E]">
              Traditional learning often goes one way. SkillSwap creates a
              two-way exchange where everyone has something to teach and
              something new to learn.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="group flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 transition-all duration-300 group-hover:bg-[#F97316]">
                    <Check className="h-4 w-4 text-[#F97316] transition-colors duration-300 group-hover:text-[#1C1008]" />
                  </div>

                  <span className="text-sm text-[#D6CCC5] sm:text-base">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-linear-to-br from-[#F97316]/10 to-[#E59A0B]/5 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#52291A] pb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#78716C]">
                    SkillSwap
                  </p>
                  <p className="mt-1 font-bold">Your learning network</p>
                </div>

                <div className="rounded-full bg-[#F97316]/10 px-3 py-1 text-xs font-semibold text-[#F97316]">
                  Active
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["React.js", "Want to learn", "F97316"],
                  ["MongoDB", "Can teach", "E59A0B"],
                  ["UI/UX", "Want to learn", "F97316"],
                  ["Node.js", "Can teach", "E59A0B"],
                ].map(([skill, type], index) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between rounded-xl border border-[#52291A] bg-[#100905] p-4 transition-all duration-300 hover:-translate-x-1 hover:border-[#F97316]/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          type === "Can teach" ? "bg-[#E59A0B]" : "bg-[#F97316]"
                        }`}
                      />

                      <span className="font-medium">{skill}</span>
                    </div>

                    <span className="text-xs text-[#78716C]">{type}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-[#F97316]/20 bg-linear-to-r from-[#F97316]/10 to-[#E59A0B]/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A8A29E]">Potential matches</p>

                    <p className="mt-1 text-xl font-bold text-[#FFF7ED]">
                      12 people
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316]/10">
                    <Users className="h-5 w-5 text-[#F97316]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DiscoverSkills />

      <SkillMatching />

      <section className="px-6 pb-24 sm:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#6B3515] bg-linear-to-br from-[#1C1008] via-[#160B05] to-[#0F0804] px-6 py-16 text-center shadow-2xl sm:px-12 lg:py-20">
          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/15 blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#F97316] to-[#E59A0B] shadow-lg shadow-[#F97316]/20">
              <Sparkles className="h-6 w-6 text-[#1C1008]" />
            </div>

            <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to exchange your skills?
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-[#A8A29E]">
              Join SkillSwap, discover people who complement your skills, and
              start learning through meaningful exchanges.
            </p>

            <div className="mt-8">
              <Link
                href="/register"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-7 font-bold text-[#1C1008] shadow-lg shadow-[#F97316]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F97316]/20 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#52291A] to-[#1A0D04] transition-all duration-500 ease-out group-hover:w-full" />

                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                  Create your free profile
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
