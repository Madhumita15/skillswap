"use client";

import {
  acceptSwapRequest,
  cancelSwapRequest,
  getReceivedRequest,
  getSentRequest,
  rejectSwapRequest,
  sendSwapRequest,
} from "@/services/helper/api-function/swapRequest.function";
import { swapRequestType } from "@/typescript/type/swapRequest.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



export const useGetSentRequest = () => {
  return useQuery({
    queryKey: ["user-sent-request"],
    queryFn: getSentRequest,
  });
};

export const useGetReceivedRequest = () => {
  return useQuery({
    queryKey: ["user-received-request"],
    queryFn: getReceivedRequest,
  });
};

export const useSendSwapRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["send-request"],
    mutationFn: ({ data }: {data: swapRequestType}) => sendSwapRequest({ data }),
    onSuccess: (res) => {
      toast.success(res?.message);
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["user-sent-request"] });
      queryClient.invalidateQueries({ queryKey: ["user-received-request"] });
    },
    onError: (err: string) => {
      console.log(err);
      toast.error(err);
    },
  });
};

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cancel-swap-request"],
    mutationFn: (id: string) => cancelSwapRequest(id),
    onSuccess: (res) => {
      toast.success(res?.message);
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["user-sent-request"] });
      queryClient.invalidateQueries({ queryKey: ["user-received-request"] });
    },
    onError: (err: string) => {
      console.log(err);
      toast.error(err);
    },
  });
};



export const useAcceptSwapRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["accept-swap-request"],
    mutationFn: (id: string) => acceptSwapRequest(id),
    onSuccess: (res) => {
      toast.success(res?.message);
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["user-sent-request"] });
      queryClient.invalidateQueries({ queryKey: ["user-received-request"] });
    },
    onError: (err: string) => {
      console.log(err);
      toast.error(err);
    },
  });
};



export const useRejectSwapRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reject-swap-request"],
    mutationFn: (id: string) => rejectSwapRequest(id),
    onSuccess: (res) => {
      toast.success(res?.message);
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["user-sent-request"] });
      queryClient.invalidateQueries({ queryKey: ["user-received-request"] });
    },
    onError: (err: string) => {
      console.log(err);
      toast.error(err);
    },
  });
};






