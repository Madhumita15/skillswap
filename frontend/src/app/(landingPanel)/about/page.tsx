"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Play,
  Search,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
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
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
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
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  return (
    <main className="overflow-hidden bg-[#0B0804] text-[#FFF7ED]">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#F97316]/10 blur-[130px]" />

        <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-[#E59A0B]/10 blur-[130px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#F97316]/5 blur-[120px]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8">
          {/* Left */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              whileHover={{ y: -3 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008]/80 px-4 py-2 text-sm text-[#E7D8CC] shadow-lg backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-[#E59A0B]" />

              <span>About SkillSwap</span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
            </motion.div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Learn from people.
              <br />
              <span className="bg-linear-to-r from-[#F97316] via-[#E59A0B] to-[#F97316] bg-clip-text text-transparent">
                Share what you know.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#A8A29E] sm:text-lg">
              SkillSwap is a peer-to-peer skill exchange platform designed to
              connect people who want to teach what they know with people who
              want to learn what they love.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#78716C]">
              Instead of simply finding someone to teach you, SkillSwap
              encourages a two-way exchange where both people can learn,
              contribute, and grow together.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-7 font-bold text-[#1C1008] shadow-lg shadow-[#F97316]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F97316]/20 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
              >
                {/* Hover color — sweeps from LEFT → RIGHT */}
                <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#52291A] to-[#1A0D04] transition-all duration-500 ease-out group-hover:w-full" />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                  Join SkillSwap
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
          </motion.div>

          {/* Right visual */}
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative flex min-h-125 items-center justify-center"
          >
            {/* Orbital circles */}
            <div className="absolute h-82.5 w-82.5 rounded-full border border-[#6B3515]/40 sm:h-107.5 sm:w-107.5" />

            <div className="absolute h-62.5 w-62.5 rounded-full border border-[#F97316]/10 sm:h-85 sm:w-85" />

            {/* Main image */}
            <motion.div
              whileHover={{
                scale: 1.02,
                rotate: 1,
              }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-3 shadow-2xl shadow-black/40">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/images/watermarked_img_8373886011709255052 (1).png"
                    alt="People learning and sharing skills"
                    width={100}
                    height={105}
                    className="h-105 w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#0B0804]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-2xl border border-[#6B3515] bg-[#1C1008]/90 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316]/10">
                          <HeartHandshake className="h-5 w-5 text-[#F97316]" />
                        </div>

                        <div>
                          <p className="text-sm font-bold text-[#FFF7ED]">
                            Learn & Exchange
                          </p>

                          <p className="text-xs text-[#A8A29E]">
                            Skills become stronger when shared.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="absolute -bottom-4 -left-2 z-20 hidden rounded-2xl border border-[#6B3515] bg-[#1C1008]/95 px-5 py-4 shadow-2xl backdrop-blur sm:block lg:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E59A0B]/10">
                  <Users className="h-5 w-5 text-[#E59A0B]" />
                </div>

                <div>
                  <p className="text-xs text-[#78716C]">Community</p>

                  <p className="text-sm font-bold text-[#FFF7ED]">
                    Learn from each other
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          OUR IDEA
      ====================================================== */}

      <section className="border-y border-[#52291A]/60 bg-[#100905]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
              The idea behind SkillSwap
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              What if learning was{" "}
              <span className="text-[#F97316]">an exchange?</span>
            </h2>

            <p className="mt-6 leading-8 text-[#A8A29E]">
              Everyone knows something that someone else wants to learn. At the
              same time, everyone has something they want to learn from someone
              else. SkillSwap brings those two sides together.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Lightbulb,
                title: "Share knowledge",
                text: "Turn your existing skills and experience into something valuable for another person.",
              },
              {
                icon: Users,
                title: "Meet compatible people",
                text: "Discover people whose teaching and learning skills complement your own.",
              },
              {
                icon: HeartHandshake,
                title: "Grow together",
                text: "Build meaningful learning exchanges where both participants contribute.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group rounded-2xl border border-[#52291A] bg-[#1C1008] p-7 transition-all duration-300 hover:border-[#F97316]/60 hover:shadow-xl hover:shadow-[#F97316]/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]/10 transition-all duration-300 group-hover:bg-[#F97316]/20">
                    <Icon className="h-6 w-6 text-[#F97316]" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-[#A8A29E]">
                    {item.text}
                  </p>

                  <div className="mt-6 h-0.5 w-0 bg-[#F97316] transition-all duration-500 group-hover:w-14" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          IMAGE + STORY
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0B0804]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-8">
          {/* Image */}
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#F97316]/10 blur-[80px]" />

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-3 shadow-2xl"
            >
              <Image
                src="/images/watermarked_img_2183842296857786017 (1).png"
                alt="People sharing knowledge"
                height={500}
                width={100}
                className="h-125 w-full rounded-[1.5rem] object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-[#6B3515] bg-[#1C1008]/95 px-5 py-4 shadow-2xl backdrop-blur sm:right-5"
            >
              <p className="text-xs text-[#78716C]">SkillSwap principle</p>

              <p className="mt-1 font-bold text-[#E59A0B]">
                Give knowledge. Gain knowledge.
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
              More than learning
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Your knowledge can become someone elses{" "}
              <span className="text-[#F97316]">next opportunity.</span>
            </h2>

            <p className="mt-6 leading-8 text-[#A8A29E]">
              SkillSwap is built around the idea that learning does not always
              have to be one-directional. You might be experienced in React but
              want to learn Node.js. Someone else might know Node.js and want to
              learn React.
            </p>

            <p className="mt-4 leading-8 text-[#A8A29E]">
              When those interests meet, both people have something to
              contribute and something to gain.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Choose the skills you can teach.",
                "Tell us what you want to learn.",
                "Discover compatible skill partners.",
                "Build a learning exchange together.",
              ].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10">
                    <Check className="h-4 w-4 text-[#F97316]" />
                  </div>

                  <span className="text-sm text-[#D6C9BE]">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="border-y border-[#52291A]/60 bg-[#100905]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
              Simple by design
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              How SkillSwap works
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[#A8A29E]">
              Find a compatible person, exchange skills, and grow together
              through a simple peer-to-peer learning experience.
            </p>
          </motion.div>

          <div className="relative mt-16 grid gap-6 md:grid-cols-4">
            {[
              {
                number: "01",
                icon: Users,
                title: "Create your profile",
                text: "Tell the community what you can teach and what you want to learn.",
              },
              {
                number: "02",
                icon: Search,
                title: "Discover people",
                text: "Explore users and find people whose skills complement yours.",
              },
              {
                number: "03",
                icon: MessageCircle,
                title: "Send a request",
                text: "Choose the skills you want to exchange and start a conversation.",
              },
              {
                number: "04",
                icon: HeartHandshake,
                title: "Start exchanging",
                text: "Once accepted, begin your skill exchange and learn together.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 70,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group relative rounded-2xl border border-[#52291A] bg-[#1C1008] p-6 transition-all duration-300 hover:border-[#F97316]/60 hover:shadow-xl hover:shadow-[#F97316]/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#E59A0B]">
                      {item.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316]/10 transition-all duration-300 group-hover:bg-[#F97316]/20">
                      <Icon className="h-5 w-5 text-[#F97316]" />
                    </div>
                  </div>

                  <h3 className="mt-7 text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#A8A29E]">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          VIDEO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0B0804]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
              See it in action
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Skill exchange made simple
            </h2>

            <p className="mt-5 text-[#A8A29E]">
              Take a quick look at how people can discover skills, find
              compatible partners, and start their learning journey.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="group relative mt-14 overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-2 shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <video
                className="aspect-video w-full object-cover"
                controls
                muted
                playsInline
                preload="metadata"
                poster="/images/"
              >
                <source
                  src="/videos/Hailuo_Video_Create a premium cinematic pro_560872161904762884.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0B0804]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          WHY SKILLSWAP
      ====================================================== */}

      <section className="border-y border-[#52291A]/60 bg-[#100905]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E59A0B]">
              Why SkillSwap
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Learning works better when{" "}
              <span className="text-[#F97316]">people connect.</span>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Zap,
                title: "Skill-based matching",
                text: "Find people based on what they can teach and what they want to learn.",
              },
              {
                icon: HeartHandshake,
                title: "Two-way exchange",
                text: "SkillSwap is built around mutual learning rather than one-sided teaching.",
              },
              {
                icon: Users,
                title: "Peer-to-peer learning",
                text: "Learn directly from people with practical knowledge and experience.",
              },
              {
                icon: MessageCircle,
                title: "Meaningful connections",
                text: "Create opportunities to communicate, collaborate, and grow through shared skills.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -60 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group flex gap-5 rounded-2xl border border-[#52291A] bg-[#1C1008] p-6 transition-all duration-300 hover:border-[#F97316]/60 hover:bg-[#211208]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F97316]/10">
                    <Icon className="h-6 w-6 text-[#F97316]" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-7 text-[#A8A29E]">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#0B0804]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/8 blur-[140px]" />

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#6B3515] bg-[#F97316]/10">
              <Sparkles className="h-6 w-6 text-[#F97316]" />
            </div>

            <h2 className="mt-7 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Your next skill exchange
              <br />
              <span className="bg-linear-to-r from-[#F97316] to-[#E59A0B] bg-clip-text text-transparent">
                starts with a connection.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-7 text-[#A8A29E]">
              Share what you know, discover what you want to learn, and connect
              with people who can grow alongside you.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
