"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  // -----------------------------------------------------
  // Nothing to paginate
  // -----------------------------------------------------

  if (totalPages <= 1) {
    return null;
  }

  // -----------------------------------------------------
  // Create page numbers
  // -----------------------------------------------------

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Small number of pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // ---------------------------------------------------
    // Near beginning
    // ---------------------------------------------------

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);

      return pages;
    }

    // ---------------------------------------------------
    // Near end
    // ---------------------------------------------------

    if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );

      return pages;
    }

    // ---------------------------------------------------
    // Middle
    // ---------------------------------------------------

    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );

    return pages;
  };

  const pages = getPageNumbers();

  // -----------------------------------------------------
  // Handlers
  // -----------------------------------------------------

  const goToFirstPage = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
      {/* -------------------------------------------------
          Page Information
      -------------------------------------------------- */}

      <div className="text-sm text-slate-400">
        Page{" "}
        <span className="font-semibold text-white">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white">
          {totalPages}
        </span>
      </div>

      {/* -------------------------------------------------
          Pagination Controls
      -------------------------------------------------- */}

      <div className="flex items-center gap-1.5">
        {/* First Page */}

        <PaginationButton
          onClick={goToFirstPage}
          disabled={currentPage === 1 || disabled}
          ariaLabel="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </PaginationButton>

        {/* Previous Page */}

        <PaginationButton
          onClick={goToPreviousPage}
          disabled={currentPage === 1 || disabled}
          ariaLabel="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </PaginationButton>

        {/* Page Numbers */}

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 min-w-9 items-center justify-center px-1 text-sm text-slate-500"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <motion.button
              key={page}
              type="button"
              disabled={disabled}
              onClick={() => onPageChange(page as number)}
              whileHover={
                !disabled && !isActive
                  ? {
                      scale: 1.05,
                    }
                  : undefined
              }
              whileTap={
                !disabled
                  ? {
                      scale: 0.95,
                    }
                  : undefined
              }
              className={`
                flex h-9 min-w-9 items-center justify-center
                rounded-lg px-2 text-sm font-medium
                transition-all duration-200

                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-orange-500
                      to-amber-500
                      text-white
                      shadow-lg
                      shadow-orange-500/20
                    `
                    : `
                      border
                      border-white/10
                      bg-white/[0.03]
                      text-slate-300
                      hover:border-orange-500/40
                      hover:bg-orange-500/10
                      hover:text-orange-400
                    `
                }

                ${
                  disabled
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
              `}
            >
              {page}
            </motion.button>
          );
        })}

        {/* Next Page */}

        <PaginationButton
          onClick={goToNextPage}
          disabled={
            currentPage === totalPages || disabled
          }
          ariaLabel="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </PaginationButton>

        {/* Last Page */}

        <PaginationButton
          onClick={goToLastPage}
          disabled={
            currentPage === totalPages || disabled
          }
          ariaLabel="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </PaginationButton>
      </div>
    </div>
  );
}

// =====================================================
// PAGINATION BUTTON
// =====================================================

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}

function PaginationButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
}: PaginationButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={
        !disabled
          ? {
              scale: 1.05,
            }
          : undefined
      }
      whileTap={
        !disabled
          ? {
              scale: 0.95,
            }
          : undefined
      }
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-white/10
        bg-white/[0.03]
        text-slate-400
        transition-all
        duration-200
        hover:border-orange-500/40
        hover:bg-orange-500/10
        hover:text-orange-400
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      {children}
    </motion.button>
  );
}