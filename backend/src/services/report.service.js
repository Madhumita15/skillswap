
const mongoose = require("mongoose");

const Report = require("../models/report.model");
const User = require("../models/user.model");

const httpStatusCode = require("../utils/httpStatusCode");

// ======================================================
// CREATE REPORT
// ======================================================

const createReportService = async ({
  reporterId,
  reportedUserId,
  reason,
  description,
}) => {
  // ----------------------------------------------------
  // Validate ObjectId
  // ----------------------------------------------------

  if (!mongoose.Types.ObjectId.isValid(reportedUserId)) {
    const error = new Error("Invalid reported user ID");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const reportedObjectId = new mongoose.Types.ObjectId(
    reportedUserId
  );

  // ----------------------------------------------------
  // User cannot report themselves
  // ----------------------------------------------------

  if (reporterId.toString() === reportedUserId.toString()) {
    const error = new Error("You cannot report yourself");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  // ----------------------------------------------------
  // Check whether reported user exists
  // ----------------------------------------------------

  const reportedUser = await User.findById(reportedObjectId);

  if (!reportedUser) {
    const error = new Error("Reported user not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  // ----------------------------------------------------
  // Create report
  // ----------------------------------------------------

  const report = await Report.create({
    reporterId,
    reportedUserId: reportedObjectId,
    reason,
    description,
    status: "pending",
  });

  return report;
};

// ======================================================
// GET ALL REPORTS - ADMIN
// ======================================================

const getReportsService = async ({
  status,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;

  const matchStage = {};

  if (status) {
    matchStage.status = status;
  }

  const reports = await Report.aggregate([
    {
      $match: matchStage,
    },

    // ----------------------------------------------
    // Reporter information
    // ----------------------------------------------

    {
      $lookup: {
        from: "users",
        localField: "reporterId",
        foreignField: "_id",
        as: "reporter",
      },
    },

    // ----------------------------------------------
    // Reported user information
    // ----------------------------------------------

    {
      $lookup: {
        from: "users",
        localField: "reportedUserId",
        foreignField: "_id",
        as: "reportedUser",
      },
    },

    // ----------------------------------------------
    // Convert arrays to objects
    // ----------------------------------------------

    {
      $unwind: {
        path: "$reporter",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $unwind: {
        path: "$reportedUser",
        preserveNullAndEmptyArrays: true,
      },
    },

    // ----------------------------------------------
    // Select only required fields
    // ----------------------------------------------

    {
      $project: {
        _id: 1,

        reason: 1,
        description: 1,
        status: 1,

        createdAt: 1,
        updatedAt: 1,

        reporter: {
          _id: "$reporter._id",
          name: "$reporter.name",
          email: "$reporter.email",
        },

        reportedUser: {
          _id: "$reportedUser._id",
          name: "$reportedUser.name",
          email: "$reportedUser.email",
          status: "$reportedUser.status",
        },
      },
    },

    // ----------------------------------------------
    // Newest reports first
    // ----------------------------------------------

    {
      $sort: {
        createdAt: -1,
      },
    },

    // ----------------------------------------------
    // Pagination
    // ----------------------------------------------

    {
      $skip: skip,
    },

    {
      $limit: Number(limit),
    },
  ]);

  // ----------------------------------------------------
  // Count reports
  // ----------------------------------------------------

  const totalReports = await Report.countDocuments(matchStage);

  return {
    reports,

    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalReports,
      totalPages: Math.ceil(totalReports / limit),
    },
  };
};

// ======================================================
// GET SINGLE REPORT - ADMIN
// ======================================================

const getReportByIdService = async (reportId) => {
  if (!mongoose.Types.ObjectId.isValid(reportId)) {
    const error = new Error("Invalid report ID");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const objectId = new mongoose.Types.ObjectId(reportId);

  const reports = await Report.aggregate([
    {
      $match: {
        _id: objectId,
      },
    },

    // ----------------------------------------------
    // Reporter
    // ----------------------------------------------

    {
      $lookup: {
        from: "users",
        localField: "reporterId",
        foreignField: "_id",
        as: "reporter",
      },
    },

    // ----------------------------------------------
    // Reported user
    // ----------------------------------------------

    {
      $lookup: {
        from: "users",
        localField: "reportedUserId",
        foreignField: "_id",
        as: "reportedUser",
      },
    },

    {
      $unwind: {
        path: "$reporter",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $unwind: {
        path: "$reportedUser",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        _id: 1,

        reason: 1,
        description: 1,
        status: 1,

        createdAt: 1,
        updatedAt: 1,

        reporter: {
          _id: "$reporter._id",
          name: "$reporter.name",
          email: "$reporter.email",
        },

        reportedUser: {
          _id: "$reportedUser._id",
          name: "$reportedUser.name",
          email: "$reportedUser.email",
          phone: "$reportedUser.phone",
          status: "$reportedUser.status",
          role: "$reportedUser.role",
        },
      },
    },
  ]);

  if (!reports.length) {
    const error = new Error("Report not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  return reports[0];
};

// ======================================================
// UPDATE REPORT STATUS - ADMIN
// ======================================================

const updateReportStatusService = async ({
  reportId,
  status,
}) => {
  if (!mongoose.Types.ObjectId.isValid(reportId)) {
    const error = new Error("Invalid report ID");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const report = await Report.findById(reportId);

  if (!report) {
    const error = new Error("Report not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  report.status = status;

  await report.save();

  return report;
};

module.exports = {
  createReportService,
  getReportsService,
  getReportByIdService,
  updateReportStatusService,
};

