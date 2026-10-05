"use client";

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import {
  getAllSwapRequests,
} from "@/services/helper/api-function/swapRequestAdmin.function";

// ==========================================================
// QUERY KEYS
// ==========================================================

export const swapRequestKeys = {
  all: ["swap-requests"] as const,

  lists: () =>
    [...swapRequestKeys.all, "list"] as const,

  list: (page: number, limit: number) =>
    [
      ...swapRequestKeys.lists(),
      {
        page,
        limit,
      },
    ] as const,
};

// ==========================================================
// GET ALL SWAP REQUESTS
// ==========================================================

export const useSwapRequests = (
  page = 1,
  limit = 6,
) => {
  return useQuery({
    queryKey: swapRequestKeys.list(
      page,
      limit,
    ),

    queryFn: () =>
      getAllSwapRequests(
        page,
        limit,
      ),

    placeholderData: keepPreviousData,
  });
};