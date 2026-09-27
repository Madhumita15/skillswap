
const mongoose = require("mongoose");

const User = require("../models/user.model");
const Skill = require("../models/skill.model");
const Swap = require("../models/swap.model");
const SwapRequest = require("../models/swapRequest.model");
const Review = require("../models/review.model");
const Report = require("../models/report.model");

const httpStatusCode = require("../utils/httpStatusCode");

// ======================================================
// USER DASHBOARD
// ======================================================

const getUserDashboardService = async ({ userId }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const objectId = new mongoose.Types.ObjectId(userId);

  const [
    userStatistics,
    requestStatistics,
    swapStatistics,
    ratingStatistics,
  ] = await Promise.all([
    // ==================================================
    // TEACHING + LEARNING SKILLS
    // ==================================================

    User.aggregate([
      {
        $match: {
          _id: objectId,
        },
      },

      {
        $project: {
          _id: 0,

          totalTeachingSkills: {
            $size: {
              $ifNull: ["$teachingSkills", []],
            },
          },

          totalLearningSkills: {
            $size: {
              $ifNull: ["$learningSkills", []],
            },
          },
        },
      },
    ]),

    // ==================================================
    // PENDING SWAP REQUESTS
    // ==================================================

    SwapRequest.aggregate([
      {
        $match: {
          $or: [
            { senderId: objectId },
            { receiverId: objectId },
          ],

          status: "pending",
        },
      },

      {
        $count: "pendingRequests",
      },
    ]),

    // ==================================================
    // ACTIVE + COMPLETED SWAPS
    // ==================================================

    Swap.aggregate([
      {
        $match: {
          $or: [
            { senderId: objectId },
            { receiverId: objectId },
          ],
        },
      },

      {
        $group: {
          _id: null,

          activeSwaps: {
            $sum: {
              $cond: [
                { $eq: ["$status", "active"] },
                1,
                0,
              ],
            },
          },

          completedSwaps: {
            $sum: {
              $cond: [
                { $eq: ["$status", "completed"] },
                1,
                0,
              ],
            },
          },

          cancelledSwaps: {
            $sum: {
              $cond: [
                { $eq: ["$status", "cancelled"] },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          activeSwaps: 1,
          completedSwaps: 1,
          cancelledSwaps: 1,
        },
      },
    ]),

    // ==================================================
    // AVERAGE RATING
    // ==================================================

    Review.aggregate([
      {
        $match: {
          reviewedUserId: objectId,
        },
      },

      {
        $group: {
          _id: "$reviewedUserId",

          averageRating: {
            $avg: "$rating",
          },

          reviewCount: {
            $sum: 1,
          },
        },
      },

      {
        $project: {
          _id: 0,

          averageRating: {
            $round: ["$averageRating", 1],
          },

          reviewCount: 1,
        },
      },
    ]),
  ]);

  return {
    totalTeachingSkills:
      userStatistics[0]?.totalTeachingSkills || 0,

    totalLearningSkills:
      userStatistics[0]?.totalLearningSkills || 0,

    pendingRequests:
      requestStatistics[0]?.pendingRequests || 0,

    activeSwaps:
      swapStatistics[0]?.activeSwaps || 0,

    completedSwaps:
      swapStatistics[0]?.completedSwaps || 0,

    cancelledSwaps:
      swapStatistics[0]?.cancelledSwaps || 0,

    averageRating:
      ratingStatistics[0]?.averageRating || 0,

    reviewCount:
      ratingStatistics[0]?.reviewCount || 0,
  };
};


// ======================================================
// ADMIN DASHBOARD
// ======================================================

const getAdminDashboardService = async () => {
  const [
    userStatistics,
    skillStatistics,
    requestStatistics,
    swapStatistics,
    reportStatistics,
  ] = await Promise.all([
    // ==================================================
    // USER STATISTICS
    // ==================================================

    User.aggregate([
      {
        $group: {
          _id: null,

          totalUsers: {
            $sum: 1,
          },

          verifiedUsers: {
            $sum: {
              $cond: [
                { $eq: ["$isEmailVerified", true] },
                1,
                0,
              ],
            },
          },

          blockedUsers: {
            $sum: {
              $cond: [
                { $eq: ["$status", "blocked"] },
                1,
                0,
              ],
            },
          },

          activeUsers: {
            $sum: {
              $cond: [
                { $eq: ["$status", "active"] },
                1,
                0,
              ],
            },
          },

          adminUsers: {
            $sum: {
              $cond: [
                { $eq: ["$role", "admin"] },
                1,
                0,
              ],
            },
          },

          normalUsers: {
            $sum: {
              $cond: [
                { $eq: ["$role", "user"] },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          totalUsers: 1,
          verifiedUsers: 1,
          blockedUsers: 1,
          activeUsers: 1,
          adminUsers: 1,
          normalUsers: 1,
        },
      },
    ]),

    // ==================================================
    // SKILL STATISTICS
    // ==================================================

    Skill.aggregate([
      {
        $group: {
          _id: null,

          totalSkills: {
            $sum: 1,
          },

          activeSkills: {
            $sum: {
              $cond: [
                { $eq: ["$status", "active"] },
                1,
                0,
              ],
            },
          },

          inactiveSkills: {
            $sum: {
              $cond: [
                { $eq: ["$status", "inactive"] },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          totalSkills: 1,
          activeSkills: 1,
          inactiveSkills: 1,
        },
      },
    ]),

    // ==================================================
    // SWAP REQUEST STATISTICS
    // ==================================================

    SwapRequest.aggregate([
      {
        $group: {
          _id: null,

          pendingRequests: {
            $sum: {
              $cond: [
                { $eq: ["$status", "pending"] },
                1,
                0,
              ],
            },
          },

          rejectedRequests: {
            $sum: {
              $cond: [
                { $eq: ["$status", "rejected"] },
                1,
                0,
              ],
            },
          },

          acceptedRequests: {
            $sum: {
              $cond: [
                { $eq: ["$status", "accepted"] },
                1,
                0,
              ],
            },
          },

          cancelledRequests: {
            $sum: {
              $cond: [
                { $eq: ["$status", "cancelled"] },
                1,
                0,
              ],
            },
          },

          completedRequests: {
            $sum: {
              $cond: [
                { $eq: ["$status", "completed"] },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          pendingRequests: 1,
          rejectedRequests: 1,
          acceptedRequests: 1,
          cancelledRequests: 1,
          completedRequests: 1,
        },
      },
    ]),

    // ==================================================
    // ACTUAL SWAP STATISTICS
    // ==================================================

    Swap.aggregate([
      {
        $group: {
          _id: null,

          activeSwaps: {
            $sum: {
              $cond: [
                { $eq: ["$status", "active"] },
                1,
                0,
              ],
            },
          },

          completedSwaps: {
            $sum: {
              $cond: [
                { $eq: ["$status", "completed"] },
                1,
                0,
              ],
            },
          },

          cancelledSwaps: {
            $sum: {
              $cond: [
                { $eq: ["$status", "cancelled"] },
                1,
                0,
              ],
            },
          },

          totalSwaps: {
            $sum: 1,
          },
        },
      },

      {
        $project: {
          _id: 0,
          totalSwaps: 1,
          activeSwaps: 1,
          completedSwaps: 1,
          cancelledSwaps: 1,
        },
      },
    ]),

    // ==================================================
    // REPORT STATISTICS
    // ==================================================

    Report.aggregate([
      {
        $group: {
          _id: null,

          totalReports: {
            $sum: 1,
          },

          pendingReports: {
            $sum: {
              $cond: [
                { $eq: ["$status", "pending"] },
                1,
                0,
              ],
            },
          },

          underReviewReports: {
            $sum: {
              $cond: [
                { $eq: ["$status", "under_review"] },
                1,
                0,
              ],
            },
          },

          resolvedReports: {
            $sum: {
              $cond: [
                { $eq: ["$status", "resolved"] },
                1,
                0,
              ],
            },
          },

          dismissedReports: {
            $sum: {
              $cond: [
                { $eq: ["$status", "dismissed"] },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          totalReports: 1,
          pendingReports: 1,
          underReviewReports: 1,
          resolvedReports: 1,
          dismissedReports: 1,
        },
      },
    ]),
  ]);

  return {
    users: {
      totalUsers:
        userStatistics[0]?.totalUsers || 0,

      verifiedUsers:
        userStatistics[0]?.verifiedUsers || 0,

      blockedUsers:
        userStatistics[0]?.blockedUsers || 0,

      activeUsers:
        userStatistics[0]?.activeUsers || 0,

      adminUsers:
        userStatistics[0]?.adminUsers || 0,

      normalUsers:
        userStatistics[0]?.normalUsers || 0,
    },

    skills: {
      totalSkills:
        skillStatistics[0]?.totalSkills || 0,

      activeSkills:
        skillStatistics[0]?.activeSkills || 0,

      inactiveSkills:
        skillStatistics[0]?.inactiveSkills || 0,
    },

    requests: {
      pendingRequests:
        requestStatistics[0]?.pendingRequests || 0,

      rejectedRequests:
        requestStatistics[0]?.rejectedRequests || 0,

      acceptedRequests:
        requestStatistics[0]?.acceptedRequests || 0,

      cancelledRequests:
        requestStatistics[0]?.cancelledRequests || 0,

      completedRequests:
        requestStatistics[0]?.completedRequests || 0,
    },

    swaps: {
      totalSwaps:
        swapStatistics[0]?.totalSwaps || 0,

      activeSwaps:
        swapStatistics[0]?.activeSwaps || 0,

      completedSwaps:
        swapStatistics[0]?.completedSwaps || 0,

      cancelledSwaps:
        swapStatistics[0]?.cancelledSwaps || 0,
    },

    reports: {
      totalReports:
        reportStatistics[0]?.totalReports || 0,

      pendingReports:
        reportStatistics[0]?.pendingReports || 0,

      underReviewReports:
        reportStatistics[0]?.underReviewReports || 0,

      resolvedReports:
        reportStatistics[0]?.resolvedReports || 0,

      dismissedReports:
        reportStatistics[0]?.dismissedReports || 0,
    },
  };
};


module.exports = {
  getUserDashboardService,
  getAdminDashboardService,
};
