"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import DynamicInput from "@/components/DynamicInput";
import { axiosInstance } from "@/lib/axiosInstance";
import { Skill, OnBoardingFormValues } from "@/typescript/type/user.type";
import {
  step1InputData,
  step4InputData,
} from "@/services/json/inputsData/user.input";
import { OnBoardingValidationSchemas } from "@/services/validation/user.validation";

const TOTAL_STEPS = 5;

const OnBoarding = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // General Skills Data
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Profile Preview
  const [existingAvatar, setExistingAvatar] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnBoardingFormValues>({
    resolver: yupResolver(OnBoardingValidationSchemas),
    mode: "onChange",
    defaultValues: {
      userInfo: {
        name: "",
        phone: "",
      },
      learningSkills: [],
      teachingSkills: [],
      experience: "",
      bio: "",
      avatarImage: null,
    },
  });

  const formData = watch();

  // Fetch Skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoadingSkills(true);
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/skills`,
        //   {
        //     method: "GET",
        //     credentials: "include",
        //   },
        // );

        // const result = await response.json();

        const response = await axiosInstance.get("/skills");

        console.log("SKILLS RESPONSE:", response.data);

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to fetch skills");
        }
        setSkills(response.data.data || []);
      } catch (error) {
        console.error("Fetch skills error:", error);
        toast.error(
          error instanceof Error ? error.message : "Unable to load skills",
        );
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  // Fetch Existing User Profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");

        console.log("USER PROFILE RESPONSE:", response.data);

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch user profile",
          );
        }

        const user = response.data.data;

        if (user?.avatar_image) {
          setExistingAvatar(user.avatar_image);
        }
      } catch (error) {
        console.error("Fetch user profile error:", error);

        if (axios.isAxiosError(error)) {
          console.error("PROFILE STATUS:", error.response?.status);
          console.error("PROFILE ERROR:", error.response?.data);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Toggle Skills
  const toggleSkill = (
    field: "learningSkills" | "teachingSkills",
    skillId: string,
  ) => {
    const currentList = formData[field] || [];
    const exists = currentList.includes(skillId);
    const updated = exists
      ? currentList.filter((id) => id !== skillId)
      : [...currentList, skillId];

    setValue(field, updated, { shouldValidate: true });
  };

  // Image Handler
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Profile image must be less than 1 MB");
      return;
    }

    setValue("avatarImage", file, { shouldValidate: true });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Step Validation using react-hook-form trigger
  const handleNext = async () => {
    let fieldsToValidate: any[] = [];

    if (currentStep === 1)
      fieldsToValidate = ["userInfo.name", "userInfo.phone"];
    if (currentStep === 2) fieldsToValidate = ["learningSkills"];
    if (currentStep === 3) fieldsToValidate = ["teachingSkills"];
    if (currentStep === 4) fieldsToValidate = ["experience", "bio"];

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Final Submit
  //   const onSubmit = async (data: OnBoardingFormValues) => {
  //     try {
  //       setSubmitting(true);

  //       const bodyData = new FormData();
  //       bodyData.append("name", data.userInfo.fullName.trim());
  //       if (data.userInfo.phone) {
  //         bodyData.append("phone", data.userInfo.phone.trim());
  //       }

  //       data.teachingSkills.forEach((id) =>
  //         bodyData.append("teachingSkills", id),
  //       );
  //       data.learningSkills.forEach((id) =>
  //         bodyData.append("learningSkills", id),
  //       );

  // //       bodyData.append(
  // //   "teachingSkills",
  // //   JSON.stringify(data.teachingSkills),
  // // );

  // // bodyData.append(
  // //   "learningSkills",
  // //   JSON.stringify(data.learningSkills),
  // // );

  //       bodyData.append("experience", data.experience.trim());
  //       bodyData.append("bio", data.bio.trim());

  //       if (data.avatarImage) {
  //         bodyData.append("avatar_image", data.avatarImage);
  //       }

  //       // const response = await fetch(
  //       //   `${process.env.NEXT_PUBLIC_API_URL}/users/onboarding`,
  //       //   {
  //       //     method: "PATCH",
  //       //     credentials: "include",
  //       //     body: bodyData,
  //       //   },
  //       // );

  //       // const result = await response.json();

  //       const response = await axiosInstance.patch(
  //   "/onboarding",
  //   bodyData,
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );
  // console.log("ONBOARDING RESPONSE:", response.data);
  //       if (!response.data.success) {
  //         throw new Error(response.data.message || "Failed to complete onboarding");
  //       }

  //       toast.success(response.data.message || "Onboarding completed successfully");
  //       router.push("/user/dashboard");
  //     } catch (error) {
  //       // console.error("Onboarding error:", error);

  //       if (axios.isAxiosError(error)) {
  //     console.log("ONBOARDING STATUS:", error.response?.status);
  //     console.log("ONBOARDING SERVER ERROR:", error.response?.data);
  //   } else {
  //     console.log("ONBOARDING ERROR:", error);
  //   }
  //       // toast.error(
  //       //   error instanceof Error
  //       //     ? error.message
  //       //     : "Unable to complete onboarding",
  //       // );
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  const onSubmit = async (data: OnBoardingFormValues) => {
    console.log("========== ONBOARDING SUBMIT STARTED ==========");
    console.log("FORM DATA:", data);

    try {
      setSubmitting(true);

      const bodyData = new FormData();

      bodyData.append("name", data.userInfo.name.trim());

      if (data.userInfo.phone) {
        bodyData.append("phone", data.userInfo.phone.trim());
      }

      data.teachingSkills.forEach((id) => {
        bodyData.append("teachingSkills", id);
      });

      data.learningSkills.forEach((id) => {
        bodyData.append("learningSkills", id);
      });

      bodyData.append("experience", data.experience.trim());
      bodyData.append("bio", data.bio.trim());

      if (data.avatarImage) {
        bodyData.append("avatar_image", data.avatarImage);
      }

      console.log("SENDING ONBOARDING REQUEST...");

      const response = await axiosInstance.patch("/onboarding", bodyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("ONBOARDING RESPONSE:", response.data);

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to complete onboarding",
        );
      }

      toast.success(
        response.data.message || "Onboarding completed successfully",
      );

      router.push("/user/dashboard");
    } catch (error) {
      console.error("========== ONBOARDING ERROR ==========");

      if (axios.isAxiosError(error)) {
        console.error("STATUS:", error.response?.status);
        console.error("SERVER ERROR:", error.response?.data);

        toast.error(
          error.response?.data?.message || "Unable to complete onboarding",
        );
      } else {
        console.error("ERROR:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to complete onboarding",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#0B0804]">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[45%_55%]">
        {/* LEFT COLUMN: HERO IMAGE */}
        <div className="relative hidden md:block">
          <div className="sticky top-0 h-screen overflow-hidden bg-[#1A0D04]">
            <div className="absolute -left-25 -top-25 h-80 w-80 rounded-full bg-[#F97316]/10 blur-3xl" />
            <div className="absolute -bottom-25 -right-25 h-80 w-80 rounded-full bg-[#D99A18]/10 blur-3xl" />
            <Image
              src="/images/watermarked_img_3844430203666026229 (1).png"
              alt="SkillSwap onboarding"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#040A03]/40" />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-10 pb-14 text-center">
              <h1 className="text-3xl font-bold text-[#FFF7ED] lg:text-4xl">
                Build your{" "}
                <span className="text-[#F97316]">Skill Profile.</span>
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#A8A29E] lg:text-base">
                Tell the SkillSwap community what you can teach and what you
                want to learn.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STEP FORM */}
        <div className="min-h-screen bg-[#0B0804] px-5 py-8 md:px-8 lg:px-12 xl:px-16">
          <div className="flex min-h-full items-center justify-center">
            <Card className="w-full max-w-3xl border-[#482613] bg-[#1C1008] p-5 shadow-2xl md:p-6 lg:p-7 xl:p-8">
              <CardHeader className="px-0 pb-6">
                <CardTitle className="text-center text-2xl font-semibold text-[#FFF7ED] lg:text-3xl">
                  Complete your profile ({currentStep}/{TOTAL_STEPS})
                </CardTitle>
                <CardDescription className="mt-2 text-center text-[#A8A29E]">
                  Help others discover your skills and find people you can learn
                  from.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0">
                <form
                  onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log("========== FORM VALIDATION ERRORS ==========");
                    console.log(errors);

                    toast.error("Please complete all required fields.");
                  })}
                  className="space-y-6"
                >
                  {/* STEP 1: USER INFO */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      {step1InputData.map((field) => (
                        <DynamicInput<OnBoardingFormValues>
                          key={field.name}
                          label={field.label}
                          name={`userInfo.${field.name}` as any}
                          type={field.type as any}
                          register={register}
                          error={
                            errors.userInfo?.[
                              field.name as keyof typeof errors.userInfo
                            ]?.message
                          }
                          required={field.required}
                          loading={submitting}
                          placeholder={field.placeholder}
                          Icon={field.Icon}
                        />
                      ))}
                    </div>
                  )}

                  {/* STEP 2: LEARNING SKILLS */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="mb-3 text-base font-semibold text-[#FFF7ED]">
                        What do you want to learn?
                      </h2>
                      {loadingSkills ? (
                        <div className="flex justify-center py-6">
                          <Spinner />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {skills.map((skill) => {
                            const selected = formData.learningSkills?.includes(
                              skill._id,
                            );
                            return (
                              // <button
                              //   key={skill._id}
                              //   type="button"
                              //   onClick={() =>
                              //     toggleSkill("learningSkills", skill._id)
                              //   }
                              //   className={`rounded-lg border px-3 py-3 text-sm font-medium transition-all ${
                              //     selected
                              //       ? "border-[#D99A18] bg-[#D99A18]/15 text-[#FFB347]"
                              //       : "border-[#6B3515] bg-[#28130C] text-[#A8A29E] hover:border-[#D99A18]"
                              //   }`}
                              // >
                              //   {skill.name}
                              // </button>

                              <button
                                key={skill._id}
                                type="button"
                                onClick={() =>
                                  toggleSkill("learningSkills", skill._id)
                                }
                                className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-sm font-medium transition-all ${
                                  selected
                                    ? "border-[#F97316] bg-[#F97316]/15 text-[#FFB347]"
                                    : "border-[#6B3515] bg-[#28130C] text-[#A8A29E] hover:border-[#F97316]"
                                }`}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#482613]">
                                  {skill.skill_logo ? (
                                    <img
                                      src={skill.skill_logo}
                                      alt={skill.name}
                                      className="h-full w-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-xs text-[#A8A29E]">
                                      {skill.name.charAt(0).toUpperCase()}
                                    </span>
                                  )}
                                </div>

                                <span>{skill.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {errors.learningSkills && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.learningSkills.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* STEP 3: TEACHING SKILLS */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="mb-3 text-base font-semibold text-[#FFF7ED]">
                        What can you teach?
                      </h2>
                      {loadingSkills ? (
                        <div className="flex justify-center py-6">
                          <Spinner />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {skills.map((skill) => {
                            const selected = formData.teachingSkills?.includes(
                              skill._id,
                            );
                            return (
                              // <button
                              //   key={skill._id}
                              //   type="button"
                              //   onClick={() =>
                              //     toggleSkill("teachingSkills", skill._id)
                              //   }
                              //   className={`rounded-lg border px-3 py-3 text-sm font-medium transition-all ${
                              //     selected
                              //       ? "border-[#F97316] bg-[#F97316]/15 text-[#FFB347]"
                              //       : "border-[#6B3515] bg-[#28130C] text-[#A8A29E] hover:border-[#F97316]"
                              //   }`}
                              // >
                              //   {skill.name}
                              // </button>

                              <button
                                key={skill._id}
                                type="button"
                                onClick={() =>
                                  toggleSkill("teachingSkills", skill._id)
                                }
                                className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-sm font-medium transition-all ${
                                  selected
                                    ? "border-[#F97316] bg-[#F97316]/15 text-[#FFB347]"
                                    : "border-[#6B3515] bg-[#28130C] text-[#A8A29E] hover:border-[#F97316]"
                                }`}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#482613]">
                                  {skill.skill_logo ? (
                                    <img
                                      src={skill.skill_logo}
                                      alt={`${skill.name} logo`}
                                      className="h-full w-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-xs text-[#A8A29E]">
                                      {skill.name.charAt(0).toUpperCase()}
                                    </span>
                                  )}
                                </div>

                                <span>{skill.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {errors.teachingSkills && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.teachingSkills.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* STEP 4: EXPERIENCE & BIO */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      {step4InputData.map((field) => (
                        <DynamicInput<OnBoardingFormValues>
                          key={field.name}
                          label={field.label}
                          name={field.name as any}
                          type={field.type as any}
                          register={register}
                          error={
                            errors[field.name as keyof typeof errors]
                              ?.message as string
                          }
                          required={field.required}
                          loading={submitting}
                          placeholder={field.placeholder}
                          Icon={field.Icon}
                        />
                      ))}
                    </div>
                  )}

                  {/* STEP 5: PROFILE PICTURE */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                          Profile Picture
                        </label>

                        <p className="mb-5 text-sm text-[#A8A29E]">
                          Your registration profile picture is shown below. You
                          can keep it or choose a new one.
                        </p>

                        {/* PROFILE IMAGE */}
                        <div className="flex justify-center">
                          {previewImage ? (
                            <div className="text-center">
                              <Image
                                src={previewImage}
                                alt="New profile preview"
                                width={120}
                                height={120}
                                unoptimized
                                className="h-28 w-28 rounded-full border-2 border-[#F97316] object-cover"
                              />

                              <p className="mt-3 text-xs text-[#F97316]">
                                New profile picture selected
                              </p>
                            </div>
                          ) : existingAvatar ? (
                            <div className="text-center">
                              <Image
                                src={existingAvatar}
                                alt="Current profile picture"
                                width={120}
                                height={120}
                                unoptimized
                                className="h-28 w-28 rounded-full border-2 border-[#6B3515] object-cover"
                              />

                              <p className="mt-3 text-xs text-[#A8A29E]">
                                Current profile picture
                              </p>
                            </div>
                          ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#6B3515] bg-[#28130C] text-sm text-[#A8A29E]">
                              No Image
                            </div>
                          )}
                        </div>

                        {/* NEW IMAGE SELECT */}
                        <div className="mt-6">
                          <label className="mb-2 block text-sm font-medium text-[#FFF7ED]">
                            Choose a new profile picture
                          </label>

                          <Input
                            type="file"
                            accept="image/*"
                            disabled={submitting}
                            onChange={handleImageChange}
                            className="h-12 cursor-pointer border-[#52291a] bg-[#28130c] text-slate-100"
                          />

                          <p className="mt-2 text-xs text-[#78716C]">
                            Leave this empty if you want to keep your current
                            profile picture. Maximum size: 1 MB.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* ACTIONS */}
                  {/* <div className="flex items-center justify-between gap-4 pt-4">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={handlePrev}
                        disabled={submitting}
                        className="h-12 w-1/2 border-[#6B3515] bg-[#28130C] text-[#FFF7ED] hover:bg-[#482613]"
                      >
                        Previous
                      </Button>
                    )}

                    {currentStep < TOTAL_STEPS ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={`h-12 bg-[#E59A0B] font-semibold text-white hover:bg-[#C77D05] ${
                          currentStep === 1 ? "w-full" : "w-1/2"
                        }`}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="h-12 w-1/2 bg-[#E59A0B] font-semibold text-white hover:bg-[#C77D05]"
                      >
                        {submitting ? <Spinner /> : "Complete Profile"}
                      </Button>
                    )}
                  </div> */}

                  <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#482613] pt-6">
                    {/* CANCEL - ONLY ON FIRST STEP */}
                    {currentStep === 1 && (
                      <Button
                        type="button"
                        onClick={() => router.push("/")}
                        disabled={submitting}
                        className="
                             h-12
                             min-w-[120px]
                             border
                             border-[#6B3515]
                             bg-transparent
                             px-6
                             text-[#A8A29E]
                             hover:bg-[#28130C]
                             hover:text-[#FFF7ED]
                              "
                      >
                        Cancel
                      </Button>
                    )}

                    {/* PREVIOUS - STEP 2 ONWARDS */}
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={handlePrev}
                        disabled={submitting}
                        className="
                             h-12
                             min-w-[120px]
                             border
                             border-[#6B3515]
                             bg-[#28130C]
                             px-6
                             text-[#FFF7ED]
                             hover:bg-[#482613]
                            "
                      >
                        Previous
                      </Button>
                    )}

                    {/* NEXT */}
                    {currentStep < TOTAL_STEPS && (
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={submitting}
                        className="
        h-12
        min-w-[120px]
        bg-[#E59A0B]
        px-6
        font-semibold
        text-white
        hover:bg-[#C77D05]
      "
                      >
                        Next
                      </Button>
                    )}

                    {/* FINAL SUBMIT */}
                    {currentStep === TOTAL_STEPS && (
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="
        h-12
        min-w-[160px]
        bg-[#E59A0B]
        px-6
        font-semibold
        text-white
        hover:bg-[#C77D05]
      "
                      >
                        {submitting ? <Spinner /> : "Complete Profile"}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
