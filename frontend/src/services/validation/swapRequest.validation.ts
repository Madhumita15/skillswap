import * as yup from "yup";

export const SwapRequestValidationSchemas = yup.object({
  message: yup
    .string()
    .min(20, "Swap request message must be at least 20 character")
    .max(1000, "Swap request message cannot exceed 1000 character")
    .required("Swap request message are required"),

  teachingSkill: yup.string().required("TeachingSkill is required"),
  learningSkill: yup.string().required("LearningSkill is required")
})