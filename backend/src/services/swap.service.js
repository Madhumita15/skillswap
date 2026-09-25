const Swap = require("../models/swap.model");

const getHistorySwapService = async ({ userId, page, limit }) => {
  const skip = (page - 1) * limit;

  const swapData = await Swap.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
        status: { $in: ["cancelled", "completed"] },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "senderUser",
      },
    },
    {
      $unwind: "$senderUser",
    },
    {
      $lookup: {
        from: "users",
        localField: "receiverId",
        foreignField: "_id",
        as: "receiverUser",
      },
    },
    {
      $unwind: "$receiverUser",
    },
    {
      $lookup: {
        from: "skills",
        localField: "teachingSkill",
        foreignField: "_id",
        as: "teachingSkills",
      },
    },
    {
      $unwind: "$teachingSkills",
    },

    {
      $lookup: {
        from: "skills",
        localField: "learningSkill",
        foreignField: "_id",
        as: "learningSkills",
      },
    },
    {
      $unwind: "$learningSkills",
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
              status: 1,
              startDate: 1,
              completedDate: 1,
              "teachingSkills._id": 1,
              "teachingSkills.name": 1,
              "teachingSkills.skill_logo": 1,
              "teachingSkills.description": 1,

              "learningSkills._id": 1,
              "learningSkills.name": 1,
              "learningSkills.skill_logo": 1,
              "learningSkills.description": 1,

              "senderUser.name": 1,
              "senderUser.email": 1,
              "senderUser.experience": 1,
              "senderUser.bio": 1,
              "senderUser.avatar_image": 1,

              "receiverUser.name": 1,
              "receiverUser.email": 1,
              "receiverUser.experience": 1,
              "receiverUser.bio": 1,
              "receiverUser.avatar_image": 1,
            },
          },
        ],
        total: [
          {
            $count: "totalSwap",
          },
        ],
      },
    },
  ]);

  const totalSwap = swapData[0]?.total[0]?.totalSwap || 0;

  return {
    data: swapData[0]?.data,
    totalSwap,
  };
};

const getActiveSwapService = async (userId) => {
  const swapData = await Swap.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
        status: "active",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "senderUser",
      },
    },
    {
      $unwind: "$senderUser",
    },
    {
      $lookup: {
        from: "users",
        localField: "receiverId",
        foreignField: "_id",
        as: "receiverUser",
      },
    },
    {
      $unwind: "$receiverUser",
    },
    {
      $lookup: {
        from: "skills",
        localField: "teachingSkill",
        foreignField: "_id",
        as: "teachingSkills",
      },
    },
    {
      $unwind: "$teachingSkills",
    },

    {
      $lookup: {
        from: "skills",
        localField: "learningSkill",
        foreignField: "_id",
        as: "learningSkills",
      },
    },
    {
      $unwind: "$learningSkills",
    },
    {
      $project: {
        _id: 1,
        status: 1,
        startDate: 1,
        completedDate: 1,
        "teachingSkills._id": 1,
        "teachingSkills.name": 1,
        "teachingSkills.skill_logo": 1,
        "teachingSkills.description": 1,

        "learningSkills._id": 1,
        "learningSkills.name": 1,
        "learningSkills.skill_logo": 1,
        "learningSkills.description": 1,

        "senderUser.name": 1,
        "senderUser.email": 1,
        "senderUser.experience": 1,
        "senderUser.bio": 1,
        "senderUser.avatar_image": 1,
        "receiverUser.name": 1,
        "receiverUser.email": 1,
        "receiverUser.experience": 1,
        "receiverUser.bio": 1,
        "receiverUser.avatar_image": 1,
      },
    },
  ]);

  return swapData;
};

const cancelSwapService = async ({ userId, swapId }) => {
  const swapData = await Swap.findOne({
    _id: swapId,
    $or: [{ senderId: userId }, { receiverId: userId }],
    status: "active",
  });

  if (!swapData) {
    const error = new Error("Swap is not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  swapData.status = "cancelled";
  swapData.completedDate = new Date();
  await swapData.save();
  return swapData;
};

const completeSwapService = async ({ userId, swapId }) => {
  const swapData = await Swap.findOne({
    _id: swapId,
    $or: [{ senderId: userId }, { receiverId: userId }],
    status: "active",
  });

  if (!swapData) {
    const error = new Error("Swap is not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  swapData.status = "completed";
  swapData.completedDate = new Date();
  await swapData.save();
  return swapData;
};

const getAllSwapervice = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const swap = await Swap.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "senderUser",
      },
    },
    {
      $unwind: "$senderUser",
    },
    {
      $lookup: {
        from: "users",
        localField: "receiverId",
        foreignField: "_id",
        as: "receiverUser",
      },
    },
    {
      $unwind: "$receiverUser",
    },
    {
      $lookup: {
        from: "skills",
        localField: "teachingSkill",
        foreignField: "_id",
        as: "teachingSkills",
      },
    },
    {
      $unwind: "$teachingSkills",
    },

    {
      $lookup: {
        from: "skills",
        localField: "learningSkill",
        foreignField: "_id",
        as: "learningSkills",
      },
    },
    {
      $unwind: "$learningSkills",
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
              status: 1,
              "teachingSkills._id": 1,
              "teachingSkills.name": 1,
              "teachingSkills.skill_logo": 1,
              "teachingSkills.description": 1,

              "learningSkills._id": 1,
              "learningSkills.name": 1,
              "learningSkills.skill_logo": 1,
              "learningSkills.description": 1,
              startAt: 1,
              completedAt: 1,

              "senderUser._id": 1,
              "senderUser.name": 1,
              "senderUser.email": 1,
              "senderUser.avata_image": 1,
              "senderUser.bio": 1,
              "senderUser.experience": 1,

              "receiverUser._id": 1,
              "receiverUser.name": 1,
              "receiverUser.email": 1,
              "receiverUser.avata_image": 1,
              "receiverUser.bio": 1,
              "receiverUser.experience": 1,
            },
          },
        ],
        total: [{ $count: "totalSwap" }],
      },
    },
  ]);

  const totalSwap = swap[0].total[0]?.totalSwap || 0;

  return {
    data: swap[0].data,
    totalSwap,
  };
};

module.exports = {
  getActiveSwapService,
  cancelSwapService,
  completeSwapService,
  getHistorySwapService,
  getAllSwapervice,
};
