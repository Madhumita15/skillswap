
import * as Yup from "yup";
// export class OnBoardingValidationSchemas {
//   static step1UserInformation = Yup.object().shape({
//     fullName: Yup.string()
//       .trim()
//       .required("Full name is required")
//       .min(2, "Name must be at least 2 characters"),
//     phone: Yup.string()
//       .trim()
//       .optional()
//       .matches(/^[0-9+\s-]*$/, "Invalid phone number format"),
//   });

//   static step2LearningSkills = Yup.object().shape({
//     learningSkills: Yup.array()
//       .of(Yup.string().required())
//       .min(1, "Please select at least one learning skill"),
//   });

//   static step3TeachingSkills = Yup.object().shape({
//     teachingSkills: Yup.array()
//       .of(Yup.string().required())
//       .min(1, "Please select at least one teaching skill"),
//   });

//   static step4ExperienceAndBio = Yup.object().shape({
//     experience: Yup.string().trim().required("Experience detail is required"),
//     bio: Yup.string()
//       .trim()
//       .required("Please enter your bio")
//       .min(10, "Bio must be at least 10 characters")
//       .max(1000, "Bio cannot exceed 1000 characters"),
//   });

//   static step5Avatar = Yup.object().shape({
//     avatarImage: Yup.mixed<File>()
//       .nullable()
//       .test("fileSize", "Profile image must be less than 1 MB", (value) => {
//         if (!value) return true;
//         return value.size <= 1 * 1024 * 1024;
//       }),
//   });
// }


import * as yup from "yup";

export const OnBoardingValidationSchemas = yup.object({
  userInfo: yup.object({
    name: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must not exceed 50 characters"),

    phone: yup
      .string()
      .trim()
      .required("Phone number is required")
      .matches(
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit phone number"
      ),
  }),

  learningSkills: yup
    .array()
    .of(yup.string().required())
    .min(1, "Please select at least one skill you want to learn")
    .required("Please select at least one skill you want to learn"),

  teachingSkills: yup
    .array()
    .of(yup.string().required())
    .min(1, "Please select at least one skill you can teach")
    .required("Please select at least one skill you can teach"),

  experience: yup
    .string()
    .trim()
    .required("Experience is required")
    .min(10, "Experience must be at least 10 characters")
    .max(500, "Experience must not exceed 500 characters"),

  bio: yup
    .string()
    .trim()
    .required("Bio is required")
    .min(20, "Bio must be at least 20 characters")
    .max(1000, "Bio must not exceed 1000 characters"),

  avatarImage: yup
    .mixed<File>()
    .nullable()
    .test(
      "fileSize",
      "Profile image must be less than 1 MB",
      (value) => {
        if (!value) return true;

        return value instanceof File
          ? value.size <= 1 * 1024 * 1024
          : true;
      }
    )
    .test(
      "fileType",
      "Only JPG, JPEG, PNG and WEBP images are allowed",
      (value) => {
        if (!value) return true;

        if (!(value instanceof File)) return true;

        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ].includes(value.type);
      }
    ),
});

