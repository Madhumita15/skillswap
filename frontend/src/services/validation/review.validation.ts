import * as yup from "yup";

export const reviewValidation = yup.object({
  rating: yup
    .number().min(1, "Rating must be at least 1").max(5, "Rating must not be exceed 5")
    .required("Rating is required"),

  comment: yup
    .string()
    .max(1000, "Comment cannot exceed 1000 character")
    .required("Please give a comment")
});