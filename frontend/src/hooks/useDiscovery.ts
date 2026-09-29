"use client"

import { getDiscovery, getMyMatch } from "@/services/helper/api-function/discovery.function"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useGetDiscovery = ({page, limit}: {page: number, limit: number})=>{
    return useQuery({
        queryKey: ["users-discovery", page, limit],
        queryFn: ({signal})=> getDiscovery({page, limit, signal}),
        placeholderData: keepPreviousData,
      


    })
}


export const useGetMyMatch = ()=>{
    return useQuery({
        queryKey: ["user-my-match"],
        queryFn: getMyMatch,

    })
}



