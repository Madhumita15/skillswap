"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminDashboardStats } from "@/services/helper/api-function/admin.function";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardStats,
  });
};