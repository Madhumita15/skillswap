import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getReportById,
  getReports,
  updateReportStatus,
} from "@/services/helper/api-function/reportAdmin.function";

import type {
  ReportStatus,
} from "@/typescript/interface/reportAdmin.interface";

/* =====================================================
   QUERY KEYS
===================================================== */

export const reportKeys = {
  all: ["reports"] as const,

  lists: () => ["reports", "list"] as const,

  list: (
    page: number,
    limit: number,
    status: ReportStatus | "",
  ) =>
    [
      "reports",
      "list",
      page,
      limit,
      status,
    ] as const,

  details: () => ["reports", "detail"] as const,

  detail: (id: string) =>
    [
      "reports",
      "detail",
      id,
    ] as const,
};

/* =====================================================
   GET ALL REPORTS
===================================================== */

export const useReports = (
  page: number,
  limit: number,
  status: ReportStatus | "",
) => {
  return useQuery({
    queryKey: reportKeys.list(
      page,
      limit,
      status,
    ),

    queryFn: () =>
      getReports(
        page,
        limit,
        status,
      ),

    placeholderData: (
      previousData,
    ) => previousData,
  });
};

/* =====================================================
   GET SINGLE REPORT
===================================================== */

export const useReport = (
  id: string | null,
) => {
  return useQuery({
    queryKey: reportKeys.detail(
      id || "",
    ),

    queryFn: () =>
      getReportById(id as string),

    enabled: !!id,
  });
};

/* =====================================================
   UPDATE REPORT STATUS
===================================================== */

export const useUpdateReportStatus = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: ReportStatus;
    }) =>
      updateReportStatus({
        id,
        status,
      }),

    onSuccess: (_, variables) => {
      /*
       * Refresh the reports list
       */
      queryClient.invalidateQueries({
        queryKey: reportKeys.lists(),
      });

      /*
       * Refresh the specific report
       */
      queryClient.invalidateQueries({
        queryKey: reportKeys.detail(
          variables.id,
        ),
      });
    },
  });
};