/* =====================================================
   REPORT STATUS
===================================================== */

export type ReportStatus =
  | "pending"
  | "under_review"
  | "resolved"
  | "dismissed";

/* =====================================================
   REPORT REASON
===================================================== */

export type ReportReason =
  | "spam"
  | "harassment"
  | "inappropriate_content"
  | "scam"
  | "other";

/* =====================================================
   REPORTER
===================================================== */

export interface ReportUser {
  _id: string;
  name: string;
  email: string;
}

/* =====================================================
   REPORTED USER
===================================================== */

export interface ReportedUser extends ReportUser {
  phone?: string;
  status?: string;
  role?: string;
}

/* =====================================================
   REPORT
===================================================== */

export interface Report {
  _id: string;

  reason: ReportReason;

  description: string;

  status: ReportStatus;

  createdAt: string;

  updatedAt: string;

  reporter: ReportUser;

  reportedUser: ReportedUser;
}

/* =====================================================
   PAGINATION
===================================================== */

export interface ReportPagination {
  currentPage: number;
  limit: number;
  totalReports: number;
  totalPages: number;
}

/* =====================================================
   GET REPORTS RESPONSE
===================================================== */

export interface ReportsData {
  reports: Report[];
  pagination: ReportPagination;
}

export interface ReportsResponse {
  success: boolean;
  message: string;
  data: ReportsData;
}

/* =====================================================
   SINGLE REPORT RESPONSE
===================================================== */

export interface ReportResponse {
  success: boolean;
  message: string;
  data: Report;
}

/* =====================================================
   UPDATE STATUS
===================================================== */

export interface UpdateReportStatusPayload {
  id: string;
  status: ReportStatus;
}