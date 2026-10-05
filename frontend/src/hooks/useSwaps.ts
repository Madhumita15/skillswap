"use client"

import { cancelSwap, completeSwap, getActiveSwap, getSwapHistory } from "@/services/helper/api-function/swap.function"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetSwapHistory = ({page, limit}: {page: number, limit: number})=>{
    return useQuery({
        queryKey: ["swap-history", page, limit],
        queryFn:({signal})=>  getSwapHistory({page, limit, signal})
    })
}


export const useGetActiveSwap = ()=> {
    return useQuery({
        queryKey: ["active-swap"],
        queryFn: getActiveSwap
    })
}



export const useCompleteSwap = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["complete-swap"],
        mutationFn:(id: string)=> completeSwap(id),
        onSuccess: (res)=>{
            toast.success(res?.message)
            queryClient.invalidateQueries({queryKey: ["active-swap"]})
             queryClient.invalidateQueries({queryKey: ["swap-history"]})
        },
        onError: (err: string)=>{
            toast.error(err)
        }
    })
}



export const useCancelSwap = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["cancel-swap"],
        mutationFn:(id: string)=> cancelSwap(id),
        onSuccess: (res)=>{
            toast.success(res?.message)
            queryClient.invalidateQueries({queryKey: ["active-swap"]})
             queryClient.invalidateQueries({queryKey: ["swap-history"]})
        },
        onError: (err: string)=>{
            toast.error(err)
        }
    })
}