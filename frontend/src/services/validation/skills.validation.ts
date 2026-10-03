import * as yup from "yup";

/* =====================================================
   CONSTANTS
===================================================== */

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/* =====================================================
   SKILL VALIDATION SCHEMA
===================================================== */

export const skillValidationSchema = yup.object({
  /* ---------------------------------------------------
     Skill Name
  --------------------------------------------------- */

  name: yup
    .string()
    .trim()
    .required("Skill name is required.")
    .min(2, "Skill name must be at least 2 characters.")
    .max(100, "Skill name cannot exceed 100 characters."),

  /* ---------------------------------------------------
     Description
  --------------------------------------------------- */

  description: yup
    .string()
    .trim()
    .required("Skill description is required.")
    .min(10, "Skill description must be at least 10 characters.")
    .max(
      500,
      "Skill description cannot exceed 500 characters.",
    ),

  /* ---------------------------------------------------
     Skill Logo
  --------------------------------------------------- */

  skill_logo: yup
    .mixed<File | null>()
    .nullable()
    .test(
      "fileSize",
      "Image size must be less than 5 MB.",
      (file) => {
        if (!file) {
          return true;
        }

        return file.size <= MAX_IMAGE_SIZE;
      },
    )
    .test(
      "fileType",
      "Only JPG, JPEG, PNG and WEBP images are allowed.",
      (file) => {
        if (!file) {
          return true;
        }

        return ALLOWED_IMAGE_TYPES.includes(file.type);
      },
    ),
});

/* =====================================================
   TYPE
===================================================== */

export type SkillValidationValues = yup.InferType<
  typeof skillValidationSchema
>;