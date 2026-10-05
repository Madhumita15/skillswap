
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  changeUserStatus,
  getAllUsers,
  getUserById,
} from "@/services/helper/api-function/user.function";

import {
  ChangeUserStatusPayload,
  User,
} from "@/typescript/interface/user.interface";

// =====================================================
// QUERY KEYS
// =====================================================

export const userKeys = {
  all: ["users"] as const,

  lists: () => [...userKeys.all, "list"] as const,

  list: (
    page: number,
    limit: number,
    search: string
  ) =>
    [
      ...userKeys.lists(),
      {
        page,
        limit,
        search,
      },
    ] as const,

  detail: (id: string) =>
    [...userKeys.all, "detail", id] as const,
};

// =====================================================
// GET ALL USERS
// =====================================================

export const useUsers = (
  currentPage: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return useQuery({
    // Search must be part of the query key
    queryKey: userKeys.list(
      currentPage,
      limit,
      search
    ),

    // Pass search to API
    queryFn: () =>
      getAllUsers(
        currentPage,
        limit,
        search
      ),

    placeholderData: (previousData) => previousData,
  });
};

// =====================================================
// GET USER BY ID
// =====================================================

export const useUser = (userId?: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId || ""),

    queryFn: () =>
      getUserById(userId as string),

    enabled: Boolean(userId),
  });
};

// =====================================================
// CHANGE USER STATUS
// =====================================================

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: ChangeUserStatusPayload["status"];
    }) =>
      changeUserStatus(userId, {
        status,
      }),

    onSuccess: (response, variables) => {
      console.log(
        "STATUS CHANGE SUCCESS:",
        response
      );

      // -------------------------------------------------
      // Update currently cached user lists immediately
      // -------------------------------------------------

      queryClient.setQueriesData(
        {
          queryKey: userKeys.lists(),
        },
        (oldData: any) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,

            data: oldData.data?.map(
              (user: User) =>
                user._id === variables.userId
                  ? {
                      ...user,
                      status: variables.status,
                    }
                  : user
            ),
          };
        }
      );

      // -------------------------------------------------
      // Refetch all user list queries
      // -------------------------------------------------

      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });

      // -------------------------------------------------
      // Refetch user detail
      // -------------------------------------------------

      queryClient.invalidateQueries({
        queryKey: userKeys.detail(
          variables.userId
        ),
      });
    },

    onError: (error: any) => {
      console.error(
        "STATUS CHANGE ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error?.response?.data
      );
    },
  });
};

