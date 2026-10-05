"use client";

import {
  getProfile,
  getUserById,
  updateUserProfile,
} from "@/services/helper/api-function/profile.function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (data: FormData) => updateUserProfile(data),
    onSuccess: (res) => {
      toast.success(res?.message);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: string) => {
      console.log(err);
      toast.error(err);
    },
  });
};

export const useUserGetById = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
