import {axiosInstance} from "@/lib/axiosInstance";
import { AllUsersResponse, User } from "@/typescript/interface/user.interface";

// =====================================================
// GET ALL USERS
// =====================================================



export const getAllUsers = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<AllUsersResponse> => {
  const response = await axiosInstance.get("/admin/users", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

// =====================================================
// GET USER BY ID
// =====================================================

export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(`/user/${id}`);

  return response.data;
};

// =====================================================
// CHANGE USER STATUS
// =====================================================

export const changeUserStatus = async (
  userId: string,
  payload: {
    status: "active" | "blocked";
  }
) => {
  console.log("CHANGE STATUS API:", {
    userId,
    payload,
  });

  const response = await axiosInstance.patch(
    `/admin/users/${userId}/status`,
    payload
  );

  console.log("CHANGE STATUS RESPONSE:", response.data);

  return response.data;
};