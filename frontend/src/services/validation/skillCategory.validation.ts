import * as Yup from "yup";

export const skillCategoryValidationSchema =
  Yup.object({
    name: Yup.string()
      .trim()
      .required("Category name is required")
      .min(
        2,
        "Category name must be at least 2 characters",
      )
      .max(
        50,
        "Category name must not exceed 50 characters",
      ),

    description: Yup.string()
      .trim()
      .required("Category description is required")
      .min(
        5,
        "Description must be at least 5 characters",
      )
      .max(
        500,
        "Description must not exceed 500 characters",
      ),
  });