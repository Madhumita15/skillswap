import {axiosInstance} from "@/lib/axiosInstance";

import {
  SwapRequestListResponse,
} from "@/typescript/interface/swapRequestAdmin.interface";

// ==========================================================
// GET ALL SWAP REQUESTS - ADMIN
// ==========================================================

export const getAllSwapRequests = async (
  page = 1,
  limit = 6,
): Promise<SwapRequestListResponse> => {
  const response = await axiosInstance.get(
    "/admin/swap-requests",
    {
      params: {
        page,
        limit,
      },
    },
  );

  return response.data;
};