"use client"

import { getAdminDashboard, getUserDashboard } from "@/services/helper/api-function/dashboard.function"
import { useQuery } from "@tanstack/react-query"

export const useGetUserDashboard = ()=>{
   return useQuery({
    queryKey: ["get-user-dashboard"],
    queryFn: getUserDashboard
   })

}

export const useGetAdminDashboard = ()=>{
    return useQuery({
    queryKey: ["get-admin-dashboard"],
    queryFn: getAdminDashboard
   })
    
}