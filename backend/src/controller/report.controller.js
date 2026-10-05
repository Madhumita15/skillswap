
const {
  createReportService,
  getReportsService,
  getReportByIdService,
  updateReportStatusService,
} = require("../services/report.service");

const {
  createReportSchema,
  updateReportStatusSchema,
} = require("../validations/reportSchema.validation");

const httpStatusCode = require("../utils/httpStatusCode");

// ======================================================
// CREATE REPORT
// ======================================================

const createReport = async (req, res) => {

  const {reportedUserId, reason, description} = req.body

  const id = req.user._id

  const report = await createReportService({
    reporterId: id,
    reportedUserId: reportedUserId,
    reason: reason,
    description: description,
  });

  return res.status(httpStatusCode.CREATED).json({
    success: true,
    message: "Report submitted successfully",
    data: report,
  });
};

// ======================================================
// GET ALL REPORTS
// ======================================================

const getReports = async (req, res) => {
 
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5

  const result = await getReportsService({
    page,
    limit,
  });

  return res.status(httpStatusCode.OK).json({
    success: true,
    message: "Reports fetched successfully",
    data: result,
  });
};

// ======================================================
// GET SINGLE REPORT
// ======================================================

const getReportById = async (req, res) => {
  const { id } = req.params;

  const report = await getReportByIdService(id);

  return res.status(httpStatusCode.OK).json({
    success: true,
    message: "Report fetched successfully",
    data: report,
  });
};

// ======================================================
// UPDATE REPORT STATUS
// ======================================================

const updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const {status} = req.body
  const report = await updateReportStatusService({
    reportId: id,
    status: status,
  });
  return res.status(httpStatusCode.OK).json({
    success: true,
    message: "Report status updated successfully",
    data: report,
  });
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
};

