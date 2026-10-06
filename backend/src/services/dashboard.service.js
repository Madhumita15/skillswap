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

const getUserDashboardService = async (id) => {
  const user = await User.findOne(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }
  const totalLearningSkills = user.learningSkills.length;
  const totalTeachingSkills = user.teachingSkills.length;

  const [
    pendingSentRequests,
    pendingReceivedRequests,
    totalCompletedSwap,
    totalActiveSwaps,
    totalAcceptRequest,
    totalRejectRequest,
    totalReports,
  ] = await Promise.all([
    SwapRequest.countDocuments({
      senderId: user._id,
      status: "pending",
    }),

    SwapRequest.countDocuments({
      receiverId: user._id,
      status: "pending",
    }),
    Swap.countDocuments({
      $or: [
        {
          receiverId: user._id,
        },
        { senderId: user._id },
      ],
      status: "completed",
    }),
    Swap.countDocuments({
      $or: [
        {
          receiverId: user._id,
        },
        { senderId: user._id },
      ],
      status: "active",
    }),
    SwapRequest.countDocuments({
      receiverId: user._id,
      status: "accepted",
    }),
    SwapRequest.countDocuments({
      receiverId: user._id,
      status: "rejected",
    }),
    Report.countDocuments({
      reporterId: user._id,
    }),
  ]);

  return {
    totalLearningSkills,
    totalTeachingSkills,
    pendingSentRequests,
    pendingReceivedRequests,
    totalCompletedSwap,
    totalActiveSwaps,
    totalAcceptRequest,
    totalRejectRequest,
    totalReports,
  };
};

const getAdminDashboardService = async () => {
  const [
    userStatistics,
    skillStatistics,
    requestStatistics,
    swapStatistics,
    reportStatistics,
    reviewStatistics
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
              $cond: [{ $eq: ["$isEmailVerified", true] }, 1, 0],
            },
          },

          blockedUsers: {
            $sum: {
              $cond: [{ $eq: ["$status", "blocked"] }, 1, 0],
            },
          },

          activeUsers: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },

          adminUsers: {
            $sum: {
              $cond: [{ $eq: ["$role", "admin"] }, 1, 0],
            },
          },

          normalUsers: {
            $sum: {
              $cond: [{ $eq: ["$role", "user"] }, 1, 0],
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
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },

          inactiveSkills: {
            $sum: {
              $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
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
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },

          rejectedRequests: {
            $sum: {
              $cond: [{ $eq: ["$status", "rejected"] }, 1, 0],
            },
          },

          acceptedRequests: {
            $sum: {
              $cond: [{ $eq: ["$status", "accepted"] }, 1, 0],
            },
          },

          cancelledRequests: {
            $sum: {
              $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
            },
          },

          completedRequests: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
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
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },

          completedSwaps: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },

          cancelledSwaps: {
            $sum: {
              $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
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
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },

          underReviewReports: {
            $sum: {
              $cond: [{ $eq: ["$status", "under_review"] }, 1, 0],
            },
          },

          resolvedReports: {
            $sum: {
              $cond: [{ $eq: ["$status", "resolved"] }, 1, 0],
            },
          },

          dismissedReports: {
            $sum: {
              $cond: [{ $eq: ["$status", "dismissed"] }, 1, 0],
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

    Review.aggregate([
    {
      $group: {_id: null, totalReviews: {$sum: 1}, avgReviews: {$avg: "$rating"}}
    },
    {
      $project:{
        totalReviews: 1,
        avgReviews: 1

      }
    }
  ])
  ]);

  

  return {
  users: {
    total: userStatistics[0]?.totalUsers || 0,
    verified: userStatistics[0]?.verifiedUsers || 0,
    blocked: userStatistics[0]?.blockedUsers || 0,
    active: userStatistics[0]?.activeUsers || 0,
    admins: userStatistics[0]?.adminUsers || 0,
    normal: userStatistics[0]?.normalUsers || 0,
  },

  skills: {
    total: skillStatistics[0]?.totalSkills || 0,
    active: skillStatistics[0]?.activeSkills || 0,
    inactive: skillStatistics[0]?.inactiveSkills || 0,
  },

  swapRequests: {
    pending: requestStatistics[0]?.pendingRequests || 0,
    rejected: requestStatistics[0]?.rejectedRequests || 0,
    accepted: requestStatistics[0]?.acceptedRequests || 0,
    cancelled: requestStatistics[0]?.cancelledRequests || 0,
    completed: requestStatistics[0]?.completedRequests || 0,
  },

  swaps: {
    total: swapStatistics[0]?.totalSwaps || 0,
    active: swapStatistics[0]?.activeSwaps || 0,
    completed: swapStatistics[0]?.completedSwaps || 0,
    cancelled: swapStatistics[0]?.cancelledSwaps || 0,
  },

  reports: {
    total: reportStatistics[0]?.totalReports || 0,
    pending: reportStatistics[0]?.pendingReports || 0,
    underReview: reportStatistics[0]?.underReviewReports || 0,
    resolved: reportStatistics[0]?.resolvedReports || 0,
    dismissed: reportStatistics[0]?.dismissedReports || 0,
  },

   reviews: {
    totalReviews: reviewStatistics[0].totalReviews || 0,
    avgReviews: reviewStatistics[0].avgReviews || 0

  },

   
};
};

module.exports = {
  getUserDashboardService,
  getAdminDashboardService,
};
