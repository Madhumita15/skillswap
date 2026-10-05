"use client";

import React from "react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { SwapRequestValidationSchemas } from "@/services/validation/swapRequest.validation";
import { swapRequestType } from "@/typescript/type/swapRequest.type";
import { Skill } from "@/typescript/interface/skill.interface";
import { useSendSwapRequest } from "@/hooks/useSwapRequest";
import { Spinner } from "./ui/spinner";
import { useProfile } from "@/hooks/useProfile";

interface SendRequestDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  receiverId: string;
  learningSkills: Skill[];
  teachingSkills: Skill[];

}

const SendRequestDialog = ({
  open,
  setOpen,
  receiverId,
  learningSkills,
  teachingSkills
}: SendRequestDialogProps) => {
  
  const {data:profileData} = useProfile()
  const {
    mutate: swapRequestMutate,
    isPending,
  } = useSendSwapRequest();
 

  const learnSkills = profileData?.data[0].learningSkills.filter((learnId: Skill)=> 
    teachingSkills.some((teachId: Skill)=> teachId._id === learnId._id)
  )

  const teachSkills = profileData?.data[0].teachingSkills.filter((teachId: Skill)=> 
    learningSkills.some((learnId: Skill)=> teachId._id === learnId._id)
  )



 

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<swapRequestType>({
    resolver: yupResolver(SwapRequestValidationSchemas),
    defaultValues: {
      teachingSkill: "",
      learningSkill: "",
      message: "",
    },
  });

  const onSubmit = async (data: swapRequestType) => {
    console.log("Send Request Data:", data);
    const updatedData = { ...data, receiverId: receiverId };
    console.log(updatedData);
     swapRequestMutate({ data: updatedData });
    reset({
      teachingSkill: "",
      learningSkill: "",
      message: "",
    });
    setOpen(false);
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      reset({
        teachingSkill: "",
        learningSkill: "",
        message: "",
      });
    }

    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          sm:max-w-md
          overflow-hidden
          border
          border-[#4A3024]
          bg-[#171311]
          p-0
          text-[#F5F1EC]
          shadow-2xl
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Header */}
            <DialogHeader
              className="
                border-b
                border-[#3A2921]
                bg-[#211814]
                px-6
                py-5
              "
            >
              <DialogTitle className="text-xl font-bold text-[#F5F1EC]">
                Send Swap Request
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm text-[#AFA49D]">
                Choose the skills you want to exchange and send a request to
                start learning together.
              </DialogDescription>
            </DialogHeader>

            {/* Form Body */}
            <div className="space-y-5 px-6 py-6">
              {/* Teaching Skill */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#E8DDD5]">
                  Teaching Skill
                  <span className="ml-1 text-[#F97316]">*</span>
                </label>

                <Controller
                  name="teachingSkill"
                  control={control}
                  render={({ field }) => {
                    const selectedSkill = teachSkills.find(
                      (skill: Skill) => skill._id === field.value,
                    );
                    return (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="
                          h-11
                          w-full
                          border-[#4A3024]
                          bg-[#211814]
                          text-[#F5F1EC]
                          focus:ring-1
                          focus:ring-[#F97316]
                        "
                        >
                          <SelectValue placeholder="Select a skill you can teach">
                            {selectedSkill?.name}
                          </SelectValue>
                        </SelectTrigger>

                        <SelectContent
                          className="
                          border-[#4A3024]
                          bg-[#211814]
                          text-[#F5F1EC]
                        "
                        >
                          {teachSkills.map((skill: Skill) => (
                            <SelectItem
                              key={skill._id}
                              value={skill._id}
                              className="
                              cursor-pointer
                              focus:bg-[#aba39f]
                              focus:text-[#F5F1EC]
                            "
                            >
                              {skill.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                {errors.teachingSkill && (
                  <p className="text-xs font-medium text-red-400">
                    {errors.teachingSkill.message}
                  </p>
                )}
              </div>

              {/* Learning Skill */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#E8DDD5]">
                  Learning Skill
                  <span className="ml-1 text-[#F97316]">*</span>
                </label>

                <Controller
                  name="learningSkill"
                  control={control}
                  render={({ field }) => {
                    const selectedSkill = learnSkills.find(
                      (skill: Skill) => skill._id === field.value,
                    );
                    return (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="
                          h-11
                          w-full
                          border-[#4A3024]
                          bg-[#211814]
                          text-[#F5F1EC]
                          focus:ring-1
                          focus:ring-[#F97316]
                        "
                        >
                          <SelectValue placeholder="Select a skill you want to learn">
                            {selectedSkill?.name}
                          </SelectValue>
                        </SelectTrigger>

                        <SelectContent
                          className="
                          border-[#4A3024]
                          bg-[#211814]
                          text-[#F5F1EC]
                        "
                        >
                          {learnSkills.map((skill: Skill) => (
                            <SelectItem
                              key={skill._id}
                              value={skill._id}
                              className="
                              cursor-pointer
                              focus:bg-[#aba39f]
                              focus:text-[#F5F1EC]
                            "
                            >
                              {skill.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                {errors.learningSkill && (
                  <p className="text-xs font-medium text-red-400">
                    {errors.learningSkill.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#E8DDD5]">
                  Message
                </label>

                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Write a short message about your learning goals..."
                      className="
                        min-h-[110px]
                        resize-none
                        border-[#4A3024]
                        bg-[#211814]
                        text-[#F5F1EC]
                        placeholder:text-[#746860]
                        focus-visible:ring-1
                        focus-visible:ring-[#F97316]
                      "
                    />
                  )}
                />

                {errors.message && (
                  <p className="text-xs font-medium text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <DialogFooter
              className="
                border-t
                border-[#3A2921]
                bg-[#1C1512]
                px-6
                py-4
              "
            >
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  reset({
                    teachingSkill: "",
                    learningSkill: "",
                    message: "",
                  });
                  setOpen(false);
                }}
                className="
                  cursor-pointer
                  text-[#B9ADA5]
                  hover:bg-[#30231D]
                  hover:text-white
                "
              >
                Cancel
              </Button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="
                    cursor-pointer
                    border
                    border-[#F97316]
                    bg-[#F97316]
                    px-5
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-orange-950/20
                    hover:bg-[#EA580C]
                  "
                >
                  {isPending ? <Spinner /> : "Send Request"}
                </Button>
              </motion.div>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SendRequestDialog;
