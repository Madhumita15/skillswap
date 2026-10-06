"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Search,
  Sparkles,
  Users,

} from "lucide-react";
import Image from "next/image";
import { useGetActiveSkillByUser } from "@/hooks/useSkills";
import {  useSkillCategoryByUser } from "@/hooks/useSkillCategory";
import { Skill, SkillCategory } from "@/typescript/interface/skillsAdmin.interface";




const ExploreSkill = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const {data:activeSkillData} = useGetActiveSkillByUser()
  const {data: categorySkillData} = useSkillCategoryByUser()
  
  const categories = useMemo(() => {
  const categoryNames =
    categorySkillData?.data?.map((category:SkillCategory) => category.name) ?? [];

  return ["All", ...categoryNames];
}, [categorySkillData]);


  const filteredSkills = useMemo(() => {
  const skills = activeSkillData?.data.slice(0, 9) ?? [];

  const searchValue = search.toLowerCase().trim();

  return skills.filter((skill:Skill) => {
    const matchesCategory =
      selectedCategory === "All" ||
      skill.category?.name === selectedCategory;

    const matchesSearch =
      !searchValue ||
      skill.name.toLowerCase().includes(searchValue) ||
      skill.description.toLowerCase().includes(searchValue) ||
      skill.category?.name.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });
}, [activeSkillData, search, selectedCategory]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0804] text-[#FFF7ED]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#52291A]/50">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-[-10%] top-20 h-80 w-80 rounded-full bg-[#F97316]/10 blur-[120px]" />

        <div className="pointer-events-none absolute right-[-5%] top-10 h-96 w-96 rounded-full bg-[#E59A0B]/10 blur-[140px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6B3515] bg-[#1C1008]/80 px-4 py-2 text-sm text-[#E59A0B] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Discover skills worth sharing
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Find a skill.
              <span className="block bg-linear-to-r from-[#F97316] to-[#E59A0B] bg-clip-text text-transparent">
                Find someone to learn it from.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#A8A29E] md:text-lg">
              Explore skills shared by people in the SkillSwap community. Learn
              something new, share what you know, and create meaningful skill
              exchanges.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="explore-skill"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-7 font-bold text-[#1C1008] shadow-lg shadow-[#F97316]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F97316]/20"
              >
                <span className="absolute inset-y-0 left-0 w-full -translate-x-full bg-linear-to-r from-[#52291A] to-[#1A0D04] transition-transform duration-500 ease-out group-hover:translate-x-0" />

                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                  Explore Skills
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/register"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#6B3515] bg-[#1C1008] px-7 font-semibold text-[#FFF7ED] shadow-lg shadow-[#F97316]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316] hover:shadow-xl hover:shadow-[#F97316]/10 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
              >
                {/* Left → center */}
                <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#F97316] to-[#52291A] transition-all duration-500 ease-out group-hover:w-1/2" />

                {/* Right → center */}
                <span className="absolute inset-y-0 right-0 w-0 bg-linear-to-r from-[#52291A] to-[#F97316] transition-all duration-500 ease-out group-hover:w-1/2" />

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                  Start Sharing
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-linear-to-r from-[#F97316]/10 to-[#E59A0B]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-3 shadow-2xl">
              {/* IMAGE PLACEHOLDER
                  Put your image here:
                  /public/images/explore-skills-hero.jpg
              */}
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-[#100905]">
                <Image
                  src="/images/watermarked_img_11163061515038400785 (1).png"
                  alt="People exchanging skills"
                  height={100}
                  width={100}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0B0804]/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[#6B3515]/70 bg-[#1C1008]/90 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#A8A29E]">
                        Active skill exchange
                      </p>
                      <p className="mt-1 font-bold">React.js ↔ UI/UX Design</p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316]/15 text-[#F97316]">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section
        id="skills"
        className="border-b border-[#52291A]/50 bg-[#100905]"
      >
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
           
            

            {/* Results */}
            <div className="text-sm text-[#A8A29E]">
              Showing{" "}
              <span className="font-bold text-[#FFF7ED]">
                {filteredSkills.length}
              </span>{" "}
              skills
            </div>
          </motion.div>

          {/* Categories */}
          <div className="mt-7 flex gap-3 flex-wrap pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "border-[#F97316] bg-[#F97316] text-[#1C1008] shadow-lg shadow-[#F97316]/10"
                    : "border-[#6B3515] bg-[#1C1008] text-[#A8A29E] hover:border-[#F97316] hover:text-[#FFF7ED]"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SKILL GRID
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.2em] text-[#E59A0B]"
          >
            Explore the community
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-3 text-3xl font-extrabold md:text-4xl"
          >
            Skills people are ready to{" "}
            <span className="text-[#F97316]">share.</span>
          </motion.h2>

          <p className="mt-4 text-[#A8A29E]">
            Find something you want to learn or discover people who can learn
            from you.
          </p>
        </div>

        {filteredSkills.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill:Skill, index:number) => {
              const fromLeft = index % 2 === 0;

              return (
                <motion.article
                  key={skill._id}
                  initial={{
                    opacity: 0,
                    x: fromLeft ? -70 : 70,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    group overflow-hidden rounded-3xl
                    border border-[#6B3515]
                    bg-[#1C1008]
                    shadow-lg shadow-black/10
                    transition-shadow duration-300
                    hover:border-[#F97316]/70
                    hover:shadow-2xl
                    hover:shadow-[#F97316]/10
                  "
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-[#100905]">
                    {/* Replace with your real image */}
                    <Image
                      src={skill.skill_logo || "https://static.vecteezy.com/system/resources/thumbnails/005/442/691/small/skills-learning-personal-development-finance-competency-business-concept-photo.jpg"}
                      alt={skill.name}
                     height={100}
                     width={100}
                      className="
                        h-full w-full object-cover
                        transition-transform duration-700
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#0B0804] via-[#0B0804]/10 to-transparent" />

                    {/* Category */}
                    <div className="absolute left-4 top-4 rounded-full border border-[#F97316]/30 bg-[#0B0804]/80 px-3 py-1.5 text-xs font-semibold text-[#E59A0B] backdrop-blur-md">
                      {skill.category?.name}
                    </div>

                    
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#FFF7ED]">
                          {skill.name}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                          {skill.description}
                        </p>
                      </div>

                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#6B3515] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#F97316]" />
                    </div>

                   

                   

                    
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-[#6B3515] bg-[#1C1008] px-6 py-20 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F97316]/10 text-[#F97316]">
              <Search className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">No skills found</h3>

            <p className="mx-auto mt-3 max-w-md text-[#A8A29E]">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-6 py-3 font-bold text-[#1C1008] transition-all hover:-translate-y-1"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="border-y border-[#52291A]/50 bg-[#100905]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[0.2em] text-[#E59A0B]"
            >
              How SkillSwap works
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-3 text-3xl font-extrabold md:text-4xl"
            >
              Your next skill exchange is only{" "}
              <span className="text-[#F97316]">four steps away.</span>
            </motion.h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Choose a skill",
                text: "Find something you want to learn or improve.",
                icon: <BookOpen />,
              },
              {
                number: "02",
                title: "Find a person",
                text: "Discover someone who can teach what you need.",
                icon: <Users />,
              },
              {
                number: "03",
                title: "Make the swap",
                text: "Offer your own knowledge in exchange.",
                icon: <Sparkles />,
              },
              {
                number: "04",
                title: "Grow together",
                text: "Complete the exchange and leave a review.",
                icon: <ArrowUpRight />,
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-[#6B3515] bg-[#1C1008] p-6 transition-all duration-300 hover:border-[#F97316]/60 hover:shadow-xl hover:shadow-[#F97316]/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#E59A0B]">
                    {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316] transition-all duration-300 group-hover:bg-[#F97316] group-hover:text-[#1C1008]">
                    {React.cloneElement(step.icon as React.ReactElement<{className?: string}>, {
                      className: "h-5 w-5",
                    })}
                  </div>
                </div>

                <h3 className="mt-7 text-lg font-bold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED IMAGE / STORY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-[#F97316]/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#6B3515] bg-[#1C1008] p-3">
              {/* IMAGE PLACEHOLDER
                  /public/images/skill-exchange.jpg
              */}
              <Image
                src="/images/watermarked_img_14424100004008337494 (1).png"
                height={100}
                width={100}
                alt="People learning together"
                className="aspect-4/3 w-full rounded-[1.5rem] object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-[#6B3515]/70 bg-[#1C1008]/90 p-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316]/15 text-[#F97316]">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Knowledge works better together.
                    </p>
                    <p className="text-xs text-[#A8A29E]">
                      Learn. Share. Exchange.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E59A0B]">
              More than a skill directory
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              The best exchange happens when{" "}
              <span className="text-[#F97316]">
                both people have something to share.
              </span>
            </h2>

            <p className="mt-6 leading-7 text-[#A8A29E]">
              SkillSwap is built around two-way learning. You dont simply
              search for a teacher. You can share your own experience while
              learning something valuable from another person.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Discover people based on the skills you want to learn.",
                "Showcase the skills and experience you can teach.",
                "Create meaningful two-way skill exchanges.",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F97316]/15 text-[#F97316]">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>

                  <p className="text-sm leading-6 text-[#D6D3D1]">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="border-t border-[#52291A]/50 bg-[#100905]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F97316]/10 text-[#F97316]">
              <Sparkles className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold md:text-5xl">
              Your next skill could start with{" "}
              <span className="text-[#F97316]">one conversation.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[#A8A29E]">
              Join SkillSwap, share what you know and discover people who can
              help you learn what comes next.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#F97316] to-[#E59A0B] px-7 font-bold text-[#1C1008] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="absolute inset-y-0 left-0 w-full -translate-x-full bg-linear-to-r from-[#52291A] to-[#1A0D04] transition-transform duration-500 group-hover:translate-x-0" />

                <span className="relative z-10 flex items-center gap-2 group-hover:text-[#FFF7ED]">
                  Join SkillSwap
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/about"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#6B3515] bg-[#1C1008] px-7 font-semibold text-[#FFF7ED] shadow-lg shadow-[#F97316]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316] hover:shadow-xl hover:shadow-[#F97316]/10 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 focus:ring-offset-[#0B0804]"
              >
                {/* Left → center */}
                <span className="absolute inset-y-0 left-0 w-0 bg-linear-to-r from-[#F97316] to-[#52291A] transition-all duration-500 ease-out group-hover:w-1/2" />

                {/* Right → center */}
                <span className="absolute inset-y-0 right-0 w-0 bg-linear-to-r from-[#52291A] to-[#F97316] transition-all duration-500 ease-out group-hover:w-1/2" />

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#FFF7ED]">
                  Learn More
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

export default ExploreSkill;
