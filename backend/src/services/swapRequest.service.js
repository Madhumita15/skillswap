const SwapRequest = require("../models/swapRequest.model");
const httpStatusCode = require("../utils/httpStatusCode");
const Swap = require("../models/swap.model");

const createSwapRequestService = async ({
  message,
  senderId,
  receiverId,
  teachingSkill,
  learningSkill,
}) => {
  const existingRequest = await SwapRequest.findOne({
    $or: [
      {
        senderId: senderId,
        receiverId: receiverId,
      },
      {
        senderId: receiverId,
        receiverId: senderId,
      },
    ],
    status: {
      $in: ["pending", "accepted"],
    },
  });
  if (existingRequest) {
    const error = new Error(
      "A swap request already exists between these users",
    );
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const newRequest = new SwapRequest({
    message: message,
    senderId: senderId,
    receiverId: receiverId,
    teachingSkill: teachingSkill,
    learningSkill: learningSkill,
  });

  const swapRequest = await newRequest.save();

  return swapRequest;
};

const getSendingRequestsService = async (userId) => {
  const sendingRequests = await SwapRequest.aggregate([
    {
      $match: { senderId: userId },
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
        message: 1,
        status: 1,
        "teachingSkills._id": 1,
        "teachingSkills.name": 1,
        "teachingSkills.skill_logo": 1,
        "teachingSkills.description": 1,

        "learningSkills._id": 1,
        "learningSkills.name": 1,
        "learningSkills.skill_logo": 1,
        "learningSkills.description": 1,

        createdAt: 1,

        "receiverUser._id": 1,
        "receiverUser.name": 1,
        "receiverUser.email": 1,
        "receiverUser.avata_image": 1,
        "receiverUser.bio": 1,
        "receiverUser.experience": 1,
      },
    },
  ]);
  if (sendingRequests.length === 0) {
    const error = new Error("sendingRequests not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  return sendingRequests;
};

const getReceivedRequestsService = async (userId) => {
  const receivedRequests = await SwapRequest.aggregate([
    [
      {
        $match: { receiverId: userId },
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
          message: 1,
          status: 1,
          "teachingSkills._id": 1,
          "teachingSkills.name": 1,
          "teachingSkills.skill_logo": 1,
          "teachingSkills.description": 1,

          "learningSkills._id": 1,
          "learningSkills.name": 1,
          "learningSkills.skill_logo": 1,
          "learningSkills.description": 1,
          createdAt: 1,

          "senderUser._id": 1,
          "senderUser.name": 1,
          "senderUser.email": 1,
          "senderUser.avata_image": 1,
          "senderUser.bio": 1,
          "senderUser.experience": 1,
        },
      },
    ],
  ]);
  if (receivedRequests.length === 0) {
    const error = new Error("Received request not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  return receivedRequests;
};

const cancelSwappingRequestService = async ({ requestId, senderId }) => {
  const swapRequest = await SwapRequest.findOne({
    _id: requestId,
    senderId: senderId,
  });
  if (!swapRequest) {
    const error = new Error("Swap Request is not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (swapRequest.status === "cancelled") {
    const error = new Error("Swap request is already cancelled ");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  if (swapRequest.status !== "pending") {
    const error = new Error("Swap request is not pending ");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  swapRequest.status = "cancelled";
  await swapRequest.save();
  return swapRequest;
};

const rejectSwapRequestService = async ({ requestId, receiverId }) => {
  const swapRequest = await SwapRequest.findOne({
    _id: requestId,
    receiverId: receiverId,
  });

  if (!swapRequest) {
    const error = new Error("Swap Request is not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (swapRequest.status === "rejected") {
    const error = new Error("Swap request is already rejected ");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  if (swapRequest.status !== "pending") {
    const error = new Error("Swap request is not pending ");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  swapRequest.status = "rejected";
  await swapRequest.save();
  return swapRequest;
};

const acceptSwapRequestService = async ({ requestId, receiverId }) => {
  const swapRequest = await SwapRequest.findOne({
    _id: requestId,
    receiverId: receiverId,
  });

  if (!swapRequest) {
    const error = new Error("Swap Request is not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (swapRequest.status === "accepted") {
    const error = new Error("Swap request is already accepted ");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  if (swapRequest.status !== "pending") {
    const error = new Error("Swap request is not pending ");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const senderSwap = await Swap.findOne({
    $or: [
      { senderId: swapRequest.senderId },
      { receiverId: swapRequest.senderId },
    ],
    status: "active",
  });
  if (senderSwap) {
    const error = new Error("Sender is already an active swap ");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const receiverSwap = await Swap.findOne({
    $or: [
      { senderId: swapRequest.receiverId },
      { receiverId: swapRequest.receiverId },
    ],
    status: "active",
  });
  if (receiverSwap) {
    const error = new Error("Receiver is already an active swap");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  swapRequest.status = "accepted";
  await swapRequest.save();
  const newSwap = new Swap({
    senderId: swapRequest.senderId,
    receiverId: swapRequest.receiverId,
    status: "active",
    teachingSkill: swapRequest.teachingSkill,
    learningSkill: swapRequest.learningSkill,
    startDate: new Date(),
  });

  const swapData = await newSwap.save();

  await SwapRequest.updateMany(
    {
      status: "pending",
      $or: [
        { senderId: swapRequest.senderId },
        { receiverId: swapRequest.senderId },
        { senderId: swapRequest.receiverId },
        { receiverId: swapRequest.receiverId },
      ],
    },
    {
      $set: {
        status: "cancelled",
      },
    },
  );

  return swapData;
};

const getAllSwapRequestService = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const swapRequest = await SwapRequest.aggregate([
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
              message: 1,
              status: 1,
              "teachingSkills._id": 1,
              "teachingSkills.name": 1,
              "teachingSkills.skill_logo": 1,
              "teachingSkills.description": 1,

              "learningSkills._id": 1,
              "learningSkills.name": 1,
              "learningSkills.skill_logo": 1,
              "learningSkills.description": 1,
              createdAt: 1,

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
        total: [{ $count: "totalSwapRequest" }],
      },
    },
  ]);

  const totalSwapRequest = swapRequest[0].total[0]?.totalSwapRequest || 0;

  return {
    data: swapRequest[0].data,
    totalSwapRequest,
  };
};

module.exports = {
  createSwapRequestService,
  cancelSwappingRequestService,
  getSendingRequestsService,
  getReceivedRequestsService,
  rejectSwapRequestService,
  acceptSwapRequestService,
  getAllSwapRequestService,
};
