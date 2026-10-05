
import * as yup from "yup";

export const reportValidation = yup.object({
  reason: yup
    .string()
    .required("Reason is required"),

  description: yup
    .string()
    .min(20, " description must be at least 20 character")
    .max(1000, "description cannot exceed 1000 character")
    .required("description is required"),
});
