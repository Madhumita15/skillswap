"use client"

import { getReceivedRequest, getSentRequest } from "@/services/helper/api-function/swapRequest.function"
import { useQuery } from "@tanstack/react-query"

export const useGetSentRequest = ()=>{
    return useQuery({
        queryKey: ["user-sent-request"],
        queryFn: getSentRequest
    })
}


export const useGetReceivedRequest = ()=>{
    return useQuery({
        queryKey: ["user-sent-request"],
        queryFn: getReceivedRequest
    })
}