import { useQuery } from "@tanstack/react-query";
import { getAllSwaps } from "@/services/helper/api-function/swaps.function";

export const swapKeys = {
  all: ["swaps"] as const,

  list: (page: number, limit: number) =>
    ["swaps", "list", page, limit] as const,
};

export const useSwaps = (page: number, limit: number = 6) => {
  return useQuery({
    queryKey: swapKeys.list(page, limit),
    queryFn: () => getAllSwaps(page, limit),

    // Keep the previous page visible while the next page loads
    placeholderData: (previousData) => previousData,
  });
};