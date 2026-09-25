const User = require("../models/user.model");
const cloudinary = require("../config/cloudinaryConfig");
const bcryptjs = require("bcryptjs");
const Otp = require("../models/otp.model");
const httpStatusCode = require("../utils/httpStatusCode");
const SendEmail = require("../utils/sendEmail");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

// ===================================================== 
// GET PROFILE 
// =====================================================
const getProfileService = async ({ id }) => {
  const user = await User.findById(id)
    .select("-password -refreshToken")
    .populate("teachingSkills")
    .populate("learningSkills");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  return user;
};

// ===================================================== 
// COMPLETE ONBOARDING
// =====================================================
const completeOnBoardingService = async ({
    id,
  teachingSkills,
  learningSkills,
  experience,
  bio,
  avatar_image, 
  avatar_public_id,
}) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  // Check email verification
  if (!user.isEmailVerified) {
    const error = new Error(
      "Please Verify your Email before completing your OnBoarding",
    );
    error.statusCode = httpStatusCode.FORBIDDEN;
    throw error;
  }

  // Validate teaching skills
  if (
    (!Array.isArray(teachingSkills)) ||
    teachingSkills.length === 0
  ) {
    const error = new Error("Select at least one Teaching Skill");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  // Validate learning skills
  if (
    (!Array.isArray(learningSkills)) ||
    learningSkills.length === 0
  ) {
    const error = new Error("Select at least one Learning Skill");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  /// Validate skill IDs
  const Skill = require("../models/skill.model"); 
  const allSkillIds = [ ...teachingSkills, ...learningSkills, ]; 

  // Remove duplicate skill IDs 
    const uniqueSkillIds = [ ...new Set(allSkillIds.map(String)), ]; 

    const skills = await Skill.find({ _id: { $in: uniqueSkillIds, }, 
            status: "active", }).select("_id"); 

            if (skills.length !== uniqueSkillIds.length) 
                { const error = new Error( "One or more selected skills are invalid or inactive" ); 
                    error.statusCode = httpStatusCode.BAD_REQUEST; 
                    throw error; 
                }

   // Update user fields             
  if (teachingSkills) {
    user.teachingSkills = teachingSkills;
  }

  if (learningSkills) {
    user.learningSkills = learningSkills;
  }

  if (experience !== undefined) {
    user.experience = experience;
  }

  if (bio !== undefined) {
    user.bio = bio;
  }

  // Profile image

  if (avatar_image) { 
    user.avatar_image = avatar_image;
     user.avatar_public_id = avatar_public_id || null;
   }

  // Mark onboarding complete
  user.isOnboardingComplete = true;

  // Save user
  await user.save();

  // Return updated user
  const updateUser = await User.findById(id)
    .select("-password -refreshToken")
    .populate("teachingSkills")
    .populate("learningSkills");

  return updateUser;
};


// ===================================================== 
// UPDATE PROFILE 
// =====================================================
const updateProfileService = async ({ id, name, phone, avatar_image, avatar_public_id, }) => { 

    const user = await User.findById(id); 

    if (!user) { 
        const error = new Error("User not found"); 
        error.statusCode = httpStatusCode.NOT_FOUND; 
        throw error; } 

    // Update basic profile information 
     if (name !== undefined) 
        { user.name = name; } 

     if (phone !== undefined) 
        { user.phone = phone; } 
     
     // Replace profile image
      if (avatar_image) { 
        
        // Delete old Cloudinary image 
        if (user.avatar_public_id) { 
            try { 
                await cloudinary.uploader.destroy( user.avatar_public_id ); 
            } catch (error) { 
                console.log( "Old avatar deletion failed:", error.message ); 
            } 
        } 
        // Save new image 
        user.avatar_image = avatar_image; 
        user.avatar_public_id = avatar_public_id || ""; 
    } 
     // Save changes 
       await user.save(); 

      // Return updated profile
       const updatedUser = await User.findById(id) 
       .select("-password -refreshToken") 
       .populate("teachingSkills") 
       .populate("learningSkills");

        return updatedUser; 
};

module.exports = { getProfileService, completeOnBoardingService, updateProfileService };
