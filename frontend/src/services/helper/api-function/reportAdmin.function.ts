import { axiosInstance } from "@/lib/axiosInstance";

import type {
  ReportResponse,
  ReportsResponse,
  ReportStatus,
} from "@/typescript/interface/reportAdmin.interface";

/* =====================================================
   GET ALL REPORTS
===================================================== */

export const getReports = async (
  page: number = 1,
  limit: number = 5,
  status: ReportStatus | "" = "",
): Promise<ReportsResponse> => {
  const response = await axiosInstance.get("/reports", {
    params: {
      page,
      limit,
      ...(status ? { status } : {}),
    },
  });

  return response.data;
};

/* =====================================================
   GET REPORT BY ID
===================================================== */

export const getReportById = async (
  id: string,
): Promise<ReportResponse> => {
  const response = await axiosInstance.get(
    `/reports/${id}`,
  );

  return response.data;
};

/* =====================================================
   UPDATE REPORT STATUS
===================================================== */

export const updateReportStatus = async ({
  id,
  status,
}: {
  id: string;
  status: ReportStatus;
}): Promise<ReportResponse> => {
  const response = await axiosInstance.put(
    `/reports/${id}`,
    {
      status,
    },
  );

  return response.data;
};