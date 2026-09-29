"use client"

import { getActiveSwap, getSwapHistory } from "@/services/helper/api-function/swap.function"
import { useQuery } from "@tanstack/react-query"


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