const User = require("../models/user.model");
const cloudinary = require("../config/cloudinaryConfig");
const httpStatusCode = require("../utils/httpStatusCode");
const mongoose = require('mongoose')


// =====================================================
// GET PROFILE
// =====================================================
const getProfileService = async ({ id }) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: id
      }
    },
    {
      $lookup: {
        from: "skills",
        localField: "teachingSkills",
        foreignField: "_id",
        as: "teachingSkills"


      }
    },
    {
      $lookup: {
        from: "skills",
        localField: "learningSkills",
        foreignField: "_id",
        as: "learningSkills"


      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email:1,
        experience: 1,
        bio: 1,
        phone: 1,
        isEmailVerified: 1,
        status: 1,
        isOnboardingComplete: 1,
        avatar_image: 1,
        role: 1,

        "learningSkills._id": 1,
        "learningSkills.name": 1,
        "learningSkills.description": 1,
        "learningSkills.skill_logo": 1,

        "teachingSkills._id": 1,
        "teachingSkills.name": 1,
        "teachingSkills.description": 1,
        "teachingSkills.skill_logo": 1



      }
    }
  ])

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  return user;
};


const completeOnBoardingService = async ({
  id,
  teachingSkills,
  learningSkills,
  experience,
  bio,
  file
}) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  // -----------------------------------------------------
  // Check email verification
  // -----------------------------------------------------

  if (!user.isEmailVerified) {
    const error = new Error(
      "Please Verify your Email before completing your OnBoarding",
    );

    error.statusCode = httpStatusCode.FORBIDDEN;
    throw error;
  }


  if(!file){
    const error = new Error(
      "Avatar_image is required",
    );

    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;

  }
  // -----------------------------------------------------
  // Normalize FormData skill values
  // -----------------------------------------------------

  const teachingSkillIds = Array.isArray(teachingSkills)
    ? teachingSkills
    : teachingSkills
      ? [teachingSkills]
      : [];

  const learningSkillIds = Array.isArray(learningSkills)
    ? learningSkills
    : learningSkills
      ? [learningSkills]
      : [];

  // -----------------------------------------------------
  // Validate teaching skills
  // -----------------------------------------------------

  if (teachingSkillIds.length === 0) {
    const error = new Error("Select at least one Teaching Skill");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  // -----------------------------------------------------
  // Validate learning skills
  // -----------------------------------------------------

  if (learningSkillIds.length === 0) {
    const error = new Error("Select at least one Learning Skill");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  // -----------------------------------------------------
  // Validate skill IDs
  // -----------------------------------------------------

  const Skill = require("../models/skill.model");

  const allSkillIds = [
    ...teachingSkillIds,
    ...learningSkillIds,
  ];

  // Remove duplicate skill IDs
  const uniqueSkillIds = [
    ...new Set(allSkillIds.map(String)),
  ];

  const skills = await Skill.find({
    _id: { $in: uniqueSkillIds },
    status: "active",
  }).select("_id");

  if (skills.length !== uniqueSkillIds.length) {
    const error = new Error(
      "One or more selected skills are invalid or inactive",
    );

    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  // -----------------------------------------------------
  // Update user fields
  // -----------------------------------------------------

  user.teachingSkills = teachingSkillIds;
  user.learningSkills = learningSkillIds;

  

  if (experience !== undefined) {
    user.experience = experience;
  }

  if (bio !== undefined) {
    user.bio = bio;
  }

  // -----------------------------------------------------
  // Profile image
  // -----------------------------------------------------

      user.avatar_image = file.path
      user.avatar_public_id = file.filename
    
  

  // -----------------------------------------------------
  // Mark onboarding complete
  // -----------------------------------------------------

  user.isOnboardingComplete = true;

  // -----------------------------------------------------
  // Save user
  // -----------------------------------------------------

  await user.save();

  // -----------------------------------------------------
  // Return updated user
  // -----------------------------------------------------

  const updatedUser = await User.findById(id)
    .select("-password -refreshToken")
    .populate("teachingSkills")
    .populate("learningSkills");

  return updatedUser;
};

// =====================================================
// UPDATE PROFILE
// =====================================================
const updateProfileService = async ({
  id,
  name,
  phone,
  avatar_image,
  avatar_public_id,
  learningSkills,
  teachingSkills,
  bio,
  experience
}) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }


  user.name = name
  user.phone = phone
  user.bio = bio
  user.learningSkills = learningSkills
  user.teachingSkills = teachingSkills
  user.bio = bio
  user.experience = experience


  // Replace profile image
  if (avatar_image) {
    // Delete old Cloudinary image
    if (user.avatar_image) {
        await cloudinary.uploader.destroy(user.avatar_public_id);
     
    }
    // Save new image
    user.avatar_image = avatar_image;
    user.avatar_public_id = avatar_public_id;
  }
  // Save changes
  await user.save();

  

  return user;
};

//=====================================================
// GET SINGLE USER
// GET /api/user/:id
//=====================================================
const getUserByIdService = async(id)=> {

  if(!mongoose.Types.ObjectId.isValid(id)){
    const error = new Error("Invalid user id")
    error.statusCode = httpStatusCode.BAD_REQUEST
    throw error
  }
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: "skills",
        localField: "learningSkills",
        foreignField: "_id",
        as: "learningSkills"
      }
    },
    {
      $lookup: {
        from: "skills",
        localField: "teachingSkills",
        foreignField: "_id",
        as: "teachingSkills"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        status: 1,
        bio: 1,
        experience: 1,
        isEmailVerified: 1,
        isOnboardingComplete: 1,
        phone: 1,
        avatar_image: 1,
        "teachingSkills._id": 1,
        "teachingSkills.skill_logo": 1,
        "teachingSkills.name": 1,
        "teachingSkills.description":1,

        "learningSkills._id": 1,
        "learningSkills.skill_logo": 1,
        "learningSkills.name": 1,
        "learningSkills.description":1,
      }
    }

  ])
  if(user.length === 0){
    const error = new Error("User not found")
    error.statusCode = httpStatusCode.NOT_FOUND
    throw error

  }

  return user
  
}

// =====================================================
// GET ALL USERS - ADMIN
// GET /api/admin/users?page=1&limit=10
// =====================================================

const getAllUsersService = async ({
  page = 1,
  limit = 8,
  search = "",
}) => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const matchStage = {
    role: "user",
  };

  // -----------------------------------------
  // SEARCH
  // -----------------------------------------

  if (search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");

    matchStage.$or = [
      { name: searchRegex },
      { email: searchRegex },
    ];
  }

  // -----------------------------------------
  // PAGINATED USERS
  // -----------------------------------------

  const users = await User.aggregate([
    {
      $match: matchStage,
    },

    // -----------------------------------------
    // TEACHING SKILLS
    // -----------------------------------------

    {
      $lookup: {
        from: "skills",
        localField: "teachingSkills",
        foreignField: "_id",
        as: "teachingSkills",
      },
    },

    // -----------------------------------------
    // LEARNING SKILLS
    // -----------------------------------------

    {
      $lookup: {
        from: "skills",
        localField: "learningSkills",
        foreignField: "_id",
        as: "learningSkills",
      },
    },

    // -----------------------------------------
    // PROJECT
    // -----------------------------------------

    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        role: 1,
        status: 1,
        avatar_image: 1,
        experience: 1,
        bio: 1,
        isEmailVerified: 1,
        isOnboardingComplete: 1,

        teachingSkills: {
          $map: {
            input: "$teachingSkills",
            as: "skill",
            in: {
              _id: "$$skill._id",
              name: "$$skill.name",
            },
          },
        },

        learningSkills: {
          $map: {
            input: "$learningSkills",
            as: "skill",
            in: {
              _id: "$$skill._id",
              name: "$$skill.name",
            },
          },
        },

        createdAt: 1,
        updatedAt: 1,
      },
    },

    // -----------------------------------------
    // SORT
    // -----------------------------------------

    {
      $sort: {
        createdAt: -1,
      },
    },

    // -----------------------------------------
    // PAGINATION
    // -----------------------------------------

    {
      $skip: skip,
    },

    {
      $limit: limitNumber,
    },
  ]);

  // -----------------------------------------
  // GLOBAL COUNTS
  // -----------------------------------------

  const totalUsers = await User.countDocuments({
    role: "user",
  });

  const activeUsers = await User.countDocuments({
    role: "user",
    status: "active",
  });

  const blockedUsers = await User.countDocuments({
    role: "user",
    status: "blocked",
  });

  // -----------------------------------------
  // PAGINATION COUNT
  // -----------------------------------------

  const filteredTotalUsers =
    await User.countDocuments(matchStage);

  const totalPages = Math.ceil(
    filteredTotalUsers / limitNumber
  );

  // -----------------------------------------
  // RETURN
  // -----------------------------------------

  return {
    users,

    pagination: {
      currentPage: pageNumber,
      limit: limitNumber,
      totalUsers: filteredTotalUsers,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    },

    stats: {
      totalUsers,
      activeUsers,
      blockedUsers,
    },
  };
};


// =====================================================
// CHANGE USER STATUS - ADMIN
// =====================================================

const changeUserStatusService = async ({
  id,
  status,
}) => {
  // =====================================================
  // VALIDATE USER ID
  // =====================================================

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid user id");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  // =====================================================
  // VALIDATE STATUS
  // =====================================================

  if (!["active", "blocked"].includes(status)) {
    const error = new Error(
      "Status must be either active or blocked"
    );

    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  // =====================================================
  // UPDATE USER STATUS
  // =====================================================

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  // =====================================================
  // GET UPDATED USER WITH SKILLS
  // =====================================================

  const updatedUser = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
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
        role: 1,
        status: 1,
        bio: 1,
        experience: 1,
        phone: 1,
        avatar_image: 1,
        isEmailVerified: 1,
        isOnboardingComplete: 1,

        "teachingSkills._id": 1,
        "teachingSkills.skill_logo": 1,
        "teachingSkills.name": 1,
        "teachingSkills.description": 1,

        "learningSkills._id": 1,
        "learningSkills.skill_logo": 1,
        "learningSkills.name": 1,
        "learningSkills.description": 1,
      },
    },
  ]);

  if (updatedUser.length === 0) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  return updatedUser[0];
};

module.exports = {
  getProfileService,
  completeOnBoardingService,
  getUserByIdService,
  updateProfileService,
  getAllUsersService,
  changeUserStatusService,
};
