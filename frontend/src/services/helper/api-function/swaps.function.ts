import { axiosInstance } from "@/lib/axiosInstance";
import type { SwapsResponse } from "@/typescript/interface/swaps.interface";

export const getAllSwaps = async (
  page = 1,
  limit = 6,
): Promise<SwapsResponse> => {
  const response = await axiosInstance.get("/admin/swaps", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};