const mongoose = require("mongoose");
const Report = require("../models/report.model");
const User = require("../models/user.model");
const httpStatusCode = require("../utils/httpStatusCode");
const SendEmail = require("../utils/sendEmail");

// ======================================================
// CREATE REPORT
// ======================================================

const createReportService = async ({
  reporterId,
  reportedUserId,
  reason,
  description,
}) => {
  const reportedUser = await User.findById(reportedUserId);
  if (!reportedUser) {
    const error = new Error("Reported User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (reportedUserId === reporterId) {
    const error = new Error("You cannot report yourself");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const findReport = await Report.findOne({
    reporterId: new mongoose.Types.ObjectId(reporterId),
    reportedUserId: new mongoose.Types.ObjectId(reportedUserId),
  });

  if (findReport) {
    const error = new Error("You already report to this user");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const report = await Report.create({
    reporterId,
    reportedUserId,
    reason,
    description,
  });

  return report;
};

// ======================================================
// GET ALL REPORTS - ADMIN
// ======================================================

const getReportsService = async ({ page, limit }) => {
  const skip = (page - 1) * limit;

  const reports = await Report.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "reporterId",
        foreignField: "_id",
        as: "reporter",
      },
    },

    {
      $unwind: {
        path: "$reporter",
        preserveNullAndEmptyArrays: true,
      },
    },

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
        path: "$reportedUser",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $facet: {
        data: [
          {
            $skip: skip,
          },

          {
            $limit: limit,
          },
          {
            $project: {
              _id: 1,
              reason: 1,
              description: 1,
              status: 1,
              createdAt: 1,
              updatedAt: 1,
              "$reporter._id": 1,
              "$reporter.name": 1,
              "$reporter.email": 1,
              "$reporter.status": 1,
              "$reporter.avatar_image": 1,
              "$reporter.phone": 1,
              "$reportedUser._id": 1,
              "$reportedUser.name": 1,
              "$reportedUser.email": 1,
              "$reportedUser.status": 1,
              "$reportedUser.avatar_image": 1,
              "$reportedUser.phone": 1,
            },
          },
        ],
        total: [
          {
            $count: "totalReports",
          },
        ],
      },
    },
  ]);

  const totalReports = reports[0].total[0].totalReports;

  return {
    reports: reports[0].data,
    currentPage: page,
    totalReports: totalReports,
    totalPages: Math.ceil(totalReports / limit),
  };
};

// ======================================================
// GET SINGLE REPORT - ADMIN
// ======================================================

const getReportByIdService = async (id) => {
  const report = await Report.findById(id);
  if (!report) {
    const error = new Error("Report is not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  const reports = await Report.aggregate([
    {
      $match: {
        _id: id,
      },
    },

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
        "$reporter._id": 1,
        "$reporter.name": 1,
        "$reporter.email": 1,
        "$reporter.status": 1,
        "$reporter.avatar_image": 1,
        "$reporter.phone": 1,
        "$reportedUser._id": 1,
        "$reportedUser.name": 1,
        "$reportedUser.email": 1,
        "$reportedUser.status": 1,
        "$reportedUser.avatar_image": 1,
        "$reportedUser.phone": 1,
      },
    },
  ]);

  return reports[0];
};

// ======================================================
// UPDATE REPORT STATUS - ADMIN
// ======================================================

const updateReportStatusService = async ({ reportId, status }) => {
  const report = await Report.findById(reportId);
  if (!report) {
    const error = new Error("Report not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }
  const reporterUser = await User.findOne({ _id: report.reporterId });
  const reportedUser = await User.findOne({ _id: report.reportedUserId });

  report.status = status;

  await report.save();

  if (status === "resolved") {
    reportedUser.status = "blocked";
    await reportedUser.save();
    await SendEmail.reportedUserMail(reportedUser);
  }

  if (status === "rejected") {
    await SendEmail.reporterUserMail(reporterUser);
  }

  return report;
};

module.exports = {
  createReportService,
  getReportsService,
  getReportByIdService,
  updateReportStatusService,
};
