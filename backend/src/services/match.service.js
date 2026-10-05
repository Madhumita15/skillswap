const User = require("../models/user.model");
const httpstatusCode = require("../utils/httpStatusCode");
const mongoose = require("mongoose");
const Report = require("../models/report.model");

const getAllUserService = async ({
  page,
  limit,
  userId,
  name,
  teachingSkills,
  learningSkills,
  experience,
}) => {
  const skip = (page - 1) * limit;

  let filter = {};
  if (name) {
    filter.name = {
      $regex: name,
      $options: "i",
    };
  }

  if (experience) {
    filter.experience = experience;
  }

  if (teachingSkills) {
    filter.teachingSkills = new mongoose.Types.ObjectId(teachingSkills);
  }

  if (learningSkills) {
    filter.learningSkills = new mongoose.Types.ObjectId(learningSkills);
  }
  const reports = await Report.find({ reporterId: userId, status: "pending" });
  const reportedId = reports?.map((report) => report.reportedUserId);

  const users = await User.aggregate([
    {
      $match: {
        role: { $ne: "admin" },
        status: "active",
        _id: { $ne: userId, $nin: reportedId  },
        ...filter,
      },
    },
    {
      $lookup: {
        from: "skills",
        localField: "teachingSkills",
        foreignField: "_id",
        as: "teachingSkills",
      },
    },
    {
      $lookup: {
        from: "skills",
        localField: "learningSkills",
        foreignField: "_id",
        as: "learningSkills",
      },
    },
    {
      $sort: { createdAt: -1 },
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
              name: 1,
              email: 1,
              experience: 1,
              avatar_image: 1,
              bio: 1,
              status: 1,
              phone: 1,
              "teachingSkills._id": 1,
              "teachingSkills.name": 1,
              "teachingSkills.description": 1,
              "teachingSkills.skill_logo": 1,

              "learningSkills._id": 1,
              "learningSkills.name": 1,
              "learningSkills.description": 1,
              "learningSkills.skill_logo": 1,
            },
          },
        ],

        total: [
          {
            $count: "totalUsers",
          },
        ],
      },
    },
  ]);

  const totalUsers = users[0]?.total[0]?.totalUsers || 0;

  return {
    totalUsers: totalUsers,
    data: users[0]?.data,
  };
};

const getMyMatchService = async (userId) => {
  const reports =await Report.find({ reporterId: userId, status: "pending" });
  const reportedId = reports?.map((report) => report.reportedUserId);
  const logedInUserData = await User.findOne(
    {
      _id: userId,
      status: "active",
    },
    {
      teachingSkills: 1,
      learningSkills: 1,
    },
  );

  if (!logedInUserData) {
    const error = new Error("User not found");
    error.statusCode = httpstatusCode.NOT_FOUND;
    throw error;
  }

  const teachingSkills = logedInUserData.teachingSkills;
  const learningSkills = logedInUserData.learningSkills;

  const matches = await User.aggregate([
    {
      $match: {
        _id: { $ne: userId },
        status: "active",
        role: { $ne: "admin" },
       _id: { $ne: userId, $nin: reportedId  },
      },
    },
    {
      $set: {
        learningMatchedSkills: {
          $setIntersection: ["$teachingSkills", learningSkills],
        },
        teachingMatchedSkills: {
          $setIntersection: ["$learningSkills", teachingSkills],
        },
      },
    },

    {
      $set: {
        countLearningMatchedSkills: {
          $size: "$learningMatchedSkills",
        },
        countTeachingMatchedSkills: {
          $size: "$teachingMatchedSkills",
        },
      },
    },
    {
      $match: {
        countLearningMatchedSkills: { $gt: 0 },
        countTeachingMatchedSkills: { $gt: 0 },
      },
    },
    {
      $set: {
        learningScore: {
          $multiply: [
            {
              $divide: ["$countLearningMatchedSkills", learningSkills.length],
            },
            50,
          ],
        },
        teachingScore: {
          $multiply: [
            {
              $divide: ["$countTeachingMatchedSkills", teachingSkills.length],
            },
            50,
          ],
        },
      },
    },
    {
      $set: {
        matchingScore: {
          $add: ["$learningScore", "$teachingScore"],
        },
      },
    },
    {
      $lookup: {
        from: "skills",
        localField: "learningSkills",
        foreignField: "_id",
        as: "learningSkills",
      },
    },
    {
      $lookup: {
        from: "skills",
        localField: "teachingSkills",
        foreignField: "_id",
        as: "teachingSkills",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        avatar_image: 1,
        status: 1,
        matchingScore: 1,
        learningScore: 1,
        teachingScore: 1,

        "teachingSkills._id": 1,
        "teachingSkills.name": 1,
        "teachingSkills.description": 1,
        "teachingSkills.skill_logo": 1,

        "learningSkills._id": 1,
        "learningSkills.name": 1,
        "learningSkills.description": 1,
        "learningSkills.skill_logo": 1,
      },
    },
    {
      $sort: {
        matchingScore: -1,
      },
    },
  ]);

  return matches;
};

module.exports = { getAllUserService, getMyMatchService };
