const User = require("../models/user.model");

const getAllUserService = async () => {
  const users = await User.aggregate([
    {
      $match: { role: { $ne: "admin" }, status: "active" },
    },
    {
      $loopup: {
        from: "skills",
        localField: "teachingSkill",
        foreignField: "_id",
        as: "teachingSkills",
      },
    },
    {
      $loopup: {
        from: "skills",
        localField: "learningSkills",
        foreignField: "_id",
        as: "learningSkills",
      },
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
  ]);

  return users
};

module.exports = { getAllUserService };
