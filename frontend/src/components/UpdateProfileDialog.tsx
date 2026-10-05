import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import DynamicInput from "./DynamicInput";
import { updateProfileInputData } from "@/services/json/inputsData/user.input";
import {
  UpdateProfileInputDataType,
  UpdateProfileInputType,
} from "@/typescript/type/user.type";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileValidationSchema } from "@/services/validation/user.validation";
import { useGetActiveSkillByUser } from "@/hooks/useSkills";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { GraduationCap, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { Skill } from "@/typescript/interface/skill.interface";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { Spinner } from "./ui/spinner";
import { UpdateProfileDialogInterface } from "@/typescript/interface/dialog.inteface";
import { SkillSelector } from "./SkillSelector";

const experiences = ["Beginner", "Intermediate", "Advanced", "Expert"];

const UpdateProfileDialog: React.FC<UpdateProfileDialogInterface> = ({
  open,
  setOpen,
}) => {
  const { data } = useGetActiveSkillByUser();
  const { data: profileData } = useProfile();
  const [previewImage, setPreviewImage] = useState("");

  const { mutateAsync: updateProfileMutate, isPending } = useUpdateProfile();

  const user = profileData?.data[0];

  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateProfileInputType>({
    resolver: yupResolver(updateProfileValidationSchema),
    defaultValues: {
      bio: "",
      experience: "",
      name: "",
      phone: "",
      teachingSkills: [],
      learningSkills: [],
      avatar_image: null,
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      bio: user.bio || "",
      experience: user.experience || "",
      name: user.name || "",
      phone: user.phone || "",
      teachingSkills:
        user.teachingSkills?.map((skill: Skill) => skill._id) || [],
      learningSkills:
        user.learningSkills?.map((skill: Skill) => skill._id) || [],
    });

    setPreviewImage(user.avatar_image);
  }, [reset, user]);

  const onSubmit = async (data: UpdateProfileInputType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("bio", data.bio);
    formData.append("experience", data.experience);
    formData.append("teachingSkills", JSON.stringify(data.teachingSkills));
    formData.append("learningSkills", JSON.stringify(data.learningSkills));

    if (data.avatar_image) {
      formData.append("avatar_image", data.avatar_image);
    }

    try {
      await updateProfileMutate(formData);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (value: boolean) => {
    setOpen(value);
  };

  const skills = data?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          max-h-[90vh] overflow-y-auto
          border-[#F97316]/20
          bg-[#0B0804]
          text-white
          shadow-[0_0_60px_rgba(249,115,22,0.12)]
          sm:max-w-2xl
        "
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <DialogHeader className="border-b border-[#F97316]/15 pb-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 items-center justify-center rounded-xl
                  border border-[#F97316]/25
                  bg-linear-to-br from-[#F97316]/20 to-[#E59A0B]/10
                  text-[#F97316]
                  shadow-[0_0_20px_rgba(249,115,22,0.10)]
                "
              >
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  Edit Profile
                </DialogTitle>

                <DialogDescription className="mt-1 text-sm text-white/45">
                  Keep your SkillSwap profile up to date.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-5">
            {/* Basic Information */}
            <section className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">Basic Information</h3>

                <p className="text-xs text-white/40">
                  Update your personal profile information.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {updateProfileInputData
                  .filter(
                    (input) => input.name === "name" || input.name === "phone",
                  )
                  .map((input) => (
                    <DynamicInput<UpdateProfileInputDataType>
                      key={input.name}
                      placeholder={input.placeholder}
                      name={input.name}
                      label={input.label}
                      required={input.required}
                      type={input.type}
                      loading={isPending}
                      register={register}
                      error={errors[input.name]?.message}
                      Icon={input.icon}
                    />
                  ))}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white/80">Bio</Label>

                <textarea
                  disabled={isPending}
                  {...register("bio")}
                  placeholder="Tell other learners a little about yourself..."
                  className={`
    min-h-25 w-full resize-none rounded-xl border
    border-white/10
    bg-[#17100A]
    px-3 py-2.5
    text-sm text-white
    placeholder:text-white/25
    outline-none
    transition-all duration-300
    hover:border-[#F97316]/30
    focus:border-[#F97316]
    focus:ring-2
    focus:ring-[#F97316]/20
    focus:shadow-[0_0_20px_rgba(249,115,22,0.08)]

    ${
      errors.bio
        ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
        : ""
    }
  `}
                />
                {errors.bio && (
                  <p className="text-xs text-red-400">{errors.bio.message}</p>
                )}
              </div>
            </section>

            {/* Experience */}
            <section className="space-y-3">
              <div>
                <h3 className="font-semibold text-white">Experience Level</h3>

                <p className="text-xs text-white/40">
                  Tell other users about your current skill level.
                </p>
              </div>

              <Controller
                disabled={isPending}
                name="experience"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={cn(
                        `
                        w-full rounded-xl
                        border-white/10
                        bg-[#17100A]
                        text-white
                        transition-all duration-300
                        hover:border-[#F97316]/30
                        focus:border-[#F97316]
                        focus:ring-2
                        focus:ring-[#F97316]/20
                        `,
                        errors.experience &&
                          "border-red-500/60 focus:border-red-500",
                      )}
                    >
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>

                    <SelectContent
                      className="
                        border-[#F97316]/20
                        bg-[#17100A]
                        text-white
                        shadow-[0_15px_40px_rgba(0,0,0,0.45)]
                      "
                    >
                      <SelectGroup>
                        <SelectLabel className="text-[#F97316]">
                          Experience
                        </SelectLabel>

                        {experiences.map((exp) => (
                          <SelectItem
                            key={exp}
                            value={exp}
                            className="
                              cursor-pointer
                              text-white/80
                              focus:bg-[#F97316]/15
                              focus:text-[#F97316]
                            "
                          >
                            {exp}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.experience && (
                <p className="text-xs text-red-400">
                  {errors.experience.message}
                </p>
              )}
            </section>

            {/* Teaching Skills */}
            <Controller
              disabled={isPending}
              name="teachingSkills"
              control={control}
              render={({ field }) => (
                <SkillSelector
                  title="Teaching Skills"
                  description="Select the skills you can teach to other users."
                  icon={<GraduationCap className="h-4 w-4" />}
                  skills={skills}
                  selectedSkills={field.value || []}
                  onChange={field.onChange}
                  error={errors.teachingSkills?.message}
                />
              )}
            />

            {/* Learning Skills */}
            <Controller
              disabled={isPending}
              name="learningSkills"
              control={control}
              render={({ field }) => (
                <SkillSelector
                  title="Learning Skills"
                  description="Select the skills you want to learn from others."
                  icon={<Lightbulb className="h-4 w-4" />}
                  skills={skills}
                  selectedSkills={field.value || []}
                  onChange={field.onChange}
                  error={errors.learningSkills?.message}
                />
              )}
            />

            {/* Profile Image */}
            <section className="space-y-3">
              <div>
                <h3 className="font-semibold text-white">Profile Picture</h3>

                <p className="text-xs text-white/40">
                  Upload a clear picture so other SkillSwap users can recognize
                  you.
                </p>
              </div>

              <div className="flex items-center justify-center">
                {previewImage && (
                  <div
                    className="
                      rounded-full p-1
                      bg-linear-to-r from-[#F97316] to-[#E59A0B]
                      shadow-[0_0_30px_rgba(249,115,22,0.18)]
                    "
                  >
                    <Image
                      src={previewImage}
                      alt="avatar_image"
                      width={120}
                      height={120}
                      unoptimized
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

              <Input
                disabled={isPending}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || "";

                  if (file) {
                    if (file.size > 1 * 1024 * 1024) {
                      toast.error("File size must be less than 1 MB");
                      return;
                    }

                    setValue("avatar_image", file, {
                      shouldValidate: true,
                    });

                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
                className="
                  cursor-pointer
                  border-white/10
                  bg-[#17100A]
                  text-white/70
                  transition-all duration-300
                  file:mr-3
                  file:rounded-lg
                  file:border-0
                  file:bg-linear-to-r
                  file:from-[#F97316]
                  file:to-[#E59A0B]
                  file:px-3
                  file:py-1.5
                  file:text-sm
                  file:font-medium
                  file:text-white
                  hover:border-[#F97316]/40
                  focus:border-[#F97316]
                  focus:ring-2
                  focus:ring-[#F97316]/20
                "
              />

              {errors.avatar_image && (
                <p className="text-xs text-red-400">
                  {errors.avatar_image.message}
                </p>
              )}
            </section>
          </div>

          {/* Footer */}
          <DialogFooter className="border-t border-[#F97316]/15 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              className="
              cursor-pointer
                border-white/10
                bg-[#17100A]
                text-white/70
                transition-all duration-300
                hover:border-[#F97316]/40
                hover:bg-[#F97316]/10
                hover:text-[#F97316]
                focus:ring-2
                focus:ring-[#F97316]/20
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="
                border-0
                cursor-pointer
                bg-linear-to-r
                from-[#F97316]
                to-[#E59A0B]
                text-white
                shadow-[0_0_20px_rgba(249,115,22,0.15)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_30px_rgba(249,115,22,0.30)]
                focus-visible:ring-2
                focus-visible:ring-[#F97316]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0B0804]
                disabled:opacity-50
              "
            >
              {isPending ? <Spinner /> : "Update Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
