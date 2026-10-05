"use client"

import { getDiscovery, getMyMatch } from "@/services/helper/api-function/discovery.function"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useGetDiscovery = ({page, limit, search, experience, teachingSkill, learningSkill}: {page: number, limit: number, search: string, experience: string, learningSkill: string, teachingSkill: string})=>{
    return useQuery({
        queryKey: ["users-discovery", page, limit, search, experience, teachingSkill, learningSkill],
        queryFn: ({signal})=> getDiscovery({page, limit, signal, search, experience, teachingSkill, learningSkill}),
        placeholderData: keepPreviousData,
       
      


    })
}


export const useGetMyMatch = ()=>{
    return useQuery({
        queryKey: ["user-my-match"],
        queryFn: getMyMatch,

    })
}



