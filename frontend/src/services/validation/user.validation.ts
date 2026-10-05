import * as yup from "yup";

export const OnBoardingValidationSchemas = yup.object({
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
    .oneOf(
      ["Beginner", "Intermediate", "Advanced", "Expert"],
      "Experience must be one of Beginner, Intermediate, Advanced, Expert",
    ),

  bio: yup
    .string()
    .trim()
    .required("Bio is required")
    .min(20, "Bio must be at least 20 characters")
    .max(1000, "Bio must not exceed 1000 characters"),

  avatar_image: yup
    .mixed<File>()
    .required("Avatar image is required")
    .test(
      "fileRequired",
      "Avatar image is required",
      (value) => value instanceof File,
    )
    .test("fileSize", "Profile image must be less than 1 MB", (value) => {
      if (!(value instanceof File)) return true;

      return value.size <= 1 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Only JPG, JPEG, PNG and WEBP images are allowed",
      (value) => {
        if (!(value instanceof File)) return true;

        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          value.type,
        );
      },
    ),
});

export const updateProfileValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
      "Name can contain only letters and spaces",
    )
    .required("Name is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[6-9]\d{9}$/, "Please provide a 10 digit valid mobile number")
    .required("Phone Number is required"),
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
    .oneOf(
      ["Beginner", "Intermediate", "Advanced", "Expert"],
      "Experience must be one of Beginner, Intermediate, Advanced, Expert",
    ),

  bio: yup
    .string()
    .trim()
    .required("Bio is required")
    .min(20, "Bio must be at least 20 characters")
    .max(1000, "Bio must not exceed 1000 characters"),

  
});
