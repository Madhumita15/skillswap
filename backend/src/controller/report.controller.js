
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
  const { error, value } = createReportSchema.validate(
    req.body
  );

  if (error) {
    const validationError = new Error(
      error.details[0].message
    );

    validationError.statusCode =
      httpStatusCode.BAD_REQUEST;

    throw validationError;
  }

  const report = await createReportService({
    reporterId: req.user._id,
    reportedUserId: value.reportedUserId,
    reason: value.reason,
    description: value.description,
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
  const {
    status,
    page = 1,
    limit = 10,
  } = req.query;

  const result = await getReportsService({
    status,
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
  const { error, value } =
    updateReportStatusSchema.validate(req.body);

  if (error) {
    const validationError = new Error(
      error.details[0].message
    );

    validationError.statusCode =
      httpStatusCode.BAD_REQUEST;

    throw validationError;
  }

  const { id } = req.params;

  const report = await updateReportStatusService({
    reportId: id,
    status: value.status,
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

