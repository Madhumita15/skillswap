"use client";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  UserRound,
  GraduationCap,
  BookOpen,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDiscovery } from "@/hooks/useDiscovery";
import DiscoverySkeleton from "@/components/DiscoverySkeleton";
import DiscoveryCard from "@/components/DiscoveryCard";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MatchedUser } from "@/typescript/interface/skill.interface";

const experienceOptions = ["Beginner", "Intermediate", "Advanced", "Expert"];

const Discovery = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, isError, error, refetch } = useGetDiscovery({
    page,
    limit,
  });

  const users = data?.data ?? [];

  const getPaginationPages = (currentPage: number, totalPages: number) => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const paginationPages = getPaginationPages(page, data?.totalPages);
  return (
    <div className="min-h-full bg-[#0B0804] text-[#FFF7ED]">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#52291A]/50">
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#F97316]/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#E59A0B]/5 blur-3xl" />

        <div className="relative px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#6B3515]/70 bg-[#1C1008] px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#F97316] shadow-[0_0_10px_#F97316]" />

                <span className="text-xs font-semibold tracking-wide text-[#E59A0B]">
                  SKILL DISCOVERY
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#FFF7ED] sm:text-4xl">
                Discover people.
                <span className="block bg-linear-to-r from-[#F97316] to-[#E59A0B] bg-clip-text text-transparent">
                  Exchange skills.
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#A8A29E] sm:text-base">
                Discover people who can teach what you want to learn and connect
                with learners who are interested in the skills you can share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* ================================================= */}
          {/* LEFT FILTER SIDEBAR */}
          {/* ================================================= */}

          <aside className="h-fit lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-[#52291A]/70 bg-[#1C1008] p-5 shadow-xl shadow-black/10">
              {/* Filter Header */}

              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F97316]/10">
                    <SlidersHorizontal className="h-4 w-4 text-[#F97316]" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-[#FFF7ED]">
                      Filters
                    </h2>

                    <p className="text-[11px] text-[#A8A29E]">
                      Find the right person
                    </p>
                  </div>
                </div>
              </div>

              {/* Search */}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#FFF7ED]">
                  Search user
                </label>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A29E]" />

                  <Input
                    placeholder="Search by name..."
                    className="
                      h-10
                      border-[#52291A]
                      bg-[#100905]
                      pl-9
                      text-sm
                      text-[#FFF7ED]
                      placeholder:text-[#6F625B]
                      focus-visible:border-[#F97316]
                      focus-visible:ring-[#F97316]/20
                    "
                  />
                </div>
              </div>

              {/* Experience */}

              <div className="mt-6">
                <label className="mb-3 block text-xs font-semibold text-[#FFF7ED]">
                  Experience
                </label>

                <div className="space-y-2">
                  {experienceOptions.map((experience) => (
                    <button
                      key={experience}
                      type="button"
                      className="
                        flex w-full items-center gap-3
                        rounded-lg
                        border border-transparent
                        px-3 py-2.5
                        text-left text-xs
                        text-[#A8A29E]
                        transition-all duration-200
                        hover:border-[#52291A]
                        hover:bg-[#24140A]
                        hover:text-[#FFF7ED]
                      "
                    >
                      <span className="h-3.5 w-3.5 rounded-full border border-[#6F625B]" />

                      {experience}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teaching Skills */}

              <div className="mt-6">
                <label className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#FFF7ED]">
                  <GraduationCap className="h-4 w-4 text-[#F97316]" />
                  Teaching skills
                </label>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="
                      rounded-full
                      border border-[#52291A]
                      bg-[#100905]
                      px-2.5 py-1.5
                      text-[11px]
                      font-medium
                      text-[#A8A29E]
                      transition-all
                      hover:border-[#F97316]/60
                      hover:text-[#FFF7ED]
                    "
                  >
                    React.js
                  </button>

                  <button
                    type="button"
                    className="
                      rounded-full
                      border border-[#52291A]
                      bg-[#100905]
                      px-2.5 py-1.5
                      text-[11px]
                      font-medium
                      text-[#A8A29E]
                      transition-all
                      hover:border-[#F97316]/60
                      hover:text-[#FFF7ED]
                    "
                  >
                    Node.js
                  </button>

                  <button
                    type="button"
                    className="
                      rounded-full
                      border border-[#52291A]
                      bg-[#100905]
                      px-2.5 py-1.5
                      text-[11px]
                      font-medium
                      text-[#A8A29E]
                      transition-all
                      hover:border-[#F97316]/60
                      hover:text-[#FFF7ED]
                    "
                  >
                    MongoDB
                  </button>
                </div>
              </div>

              {/* Learning Skills */}

              <div className="mt-6">
                <label className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#FFF7ED]">
                  <BookOpen className="h-4 w-4 text-[#E59A0B]" />
                  Learning skills
                </label>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="
                      rounded-full
                      border border-[#52291A]
                      bg-[#100905]
                      px-2.5 py-1.5
                      text-[11px]
                      font-medium
                      text-[#A8A29E]
                      transition-all
                      hover:border-[#E59A0B]/60
                      hover:text-[#FFF7ED]
                    "
                  >
                    Next.js
                  </button>

                  <button
                    type="button"
                    className="
                      rounded-full
                      border border-[#52291A]
                      bg-[#100905]
                      px-2.5 py-1.5
                      text-[11px]
                      font-medium
                      text-[#A8A29E]
                      transition-all
                      hover:border-[#E59A0B]/60
                      hover:text-[#FFF7ED]
                    "
                  >
                    Python
                  </button>
                </div>
              </div>

              {/* Reset */}

              <Button
                variant="outline"
                className="
                  mt-6
                  w-full
                  border-[#52291A]
                  bg-transparent
                  text-[#A8A29E]
                  hover:border-[#F97316]
                  hover:bg-[#F97316]/10
                  hover:text-[#FFF7ED]
                "
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            </div>
          </aside>

          {/* ================================================= */}
          {/* RIGHT CONTENT */}
          {/* ================================================= */}

          <main className="min-w-0">
            {/* Result Header */}

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#FFF7ED]">
                  People to discover
                </h2>

                <p className="mt-1 text-xs text-[#A8A29E]">
                  Explore SkillSwap members and exchange knowledge.
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-lg border border-[#52291A]/70 bg-[#1C1008] px-3 py-2 sm:flex">
                <UserRound className="h-4 w-4 text-[#F97316]" />

                <span className="text-xs text-[#A8A29E]">
                  {users.length} members
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* LOADING */}
            {/* ================================================= */}

            {isLoading && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DiscoverySkeleton key={index} />
                ))}
              </div>
            )}

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {isError && !isLoading && (
              <div className="flex min-h-100 items-center justify-center rounded-2xl border border-red-500/20 bg-[#1C1008] p-6">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                    <AlertCircle className="h-7 w-7 text-red-400" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#FFF7ED]">
                    Unable to load discovery
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                    We couldnt load SkillSwap members right now. Please try
                    again.
                  </p>

                  <Button
                    onClick={() => refetch()}
                    className="
                      mt-5
                      bg-linear-to-r
                      from-[#F97316]
                      to-[#E59A0B]
                      text-[#1C1008]
                      hover:opacity-90
                    "
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try again
                  </Button>

                  {error instanceof Error && (
                    <p className="mt-3 text-[11px] text-[#6F625B]">
                      {error.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ================================================= */}
            {/* EMPTY */}
            {/* ================================================= */}

            {!isLoading && !isError && users.length === 0 && (
              <div className="flex min-h-100 items-center justify-center rounded-2xl border border-[#52291A]/60 bg-[#1C1008]">
                <div className="max-w-sm text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316]/10">
                    <Search className="h-7 w-7 text-[#F97316]" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#FFF7ED]">
                    No members found
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                    There are currently no SkillSwap members available for
                    discovery.
                  </p>
                </div>
              </div>
            )}

            {/* ================================================= */}
            {/* USER CARDS */}
            {/* ================================================= */}

            {!isLoading && !isError && users.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {users.map((user: MatchedUser) => (
                  <DiscoveryCard key={user._id} user={user} />
                ))}
              </div>
            )}

            {/* ================================================= */}
            {/* PAGINATION UI */}
            {/* ================================================= */}

           
            <div className="mt-8 flex flex-col gap-4 border-t border-[#52291A]/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Result information */}

              <p className="text-xs text-[#A8A29E]">
                Showing
                <span className="mx-1 font-semibold text-[#FFF7ED]">
                  {data?.currentPage}-{data?.totalPages}
                </span>
                of
                <span className="mx-1 font-semibold text-[#FFF7ED]">
                  {data?.totalUsers}
                </span>
                members
              </p>

              {/* Limit */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A8A29E]">Show</span>

                <Select
                  value={String(limit)}
                  onValueChange={(value) => {
                    setLimit(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-16 border-[#52291A] bg-[#1C1008] text-xs text-[#FFF7ED] focus:border-[#F97316] focus:ring-[#F97316]/20">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="border-[#52291A] bg-[#1C1008] text-[#FFF7ED]">
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-xs text-[#A8A29E]">per page</span>
              </div>

              {/* Pagination */}

              <div className="flex items-center gap-1.5">
                {/* Previous */}
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-[#52291A] bg-[#1C1008] text-[#A8A29E] hover:border-[#F97316] hover:bg-[#F97316]/10 hover:text-[#FFF7ED]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Dynamic pages */}
                {paginationPages.map((pageNumber, index) => {
                  if (pageNumber === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="flex h-9 min-w-9 items-center justify-center text-xs text-[#6F625B]"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`
          flex h-9 min-w-9 items-center justify-center
          rounded-lg px-3 text-xs
          transition-all duration-200
          ${
            page === pageNumber
              ? "bg-linear-to-r from-[#F97316] to-[#E59A0B] font-bold text-[#1C1008] shadow-md shadow-[#F97316]/10"
              : "border border-[#52291A] bg-[#1C1008] font-medium text-[#A8A29E] hover:border-[#F97316]/60 hover:bg-[#F97316]/10 hover:text-[#FFF7ED]"
          }
        `}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next */}
                <Button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, data?.totalPages))
                  }
                  disabled={page === data?.totalPages}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-[#52291A] bg-[#1C1008] text-[#A8A29E] hover:border-[#F97316] hover:bg-[#F97316]/10 hover:text-[#FFF7ED]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
           
          </main>
        </div>
      </section>
    </div>
  );
};

export default Discovery;
