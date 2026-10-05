"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  BookOpen,
  Pencil,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skill } from "@/typescript/interface/skill.interface";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";

const Profile = () => {
  const { data, isLoading } = useProfile();
  const [open, setOpen] = useState(false)

  const user = data?.data[0];

  console.log("user", user)

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-8 w-8 rounded-full border-2 border-[#F97316] border-t-transparent"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-400">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-[#3A2921]
            bg-[#1A1411]
          "
        >
          {/* Decorative background */}
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#F97316]/10 blur-3xl" />

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-[#3A2418] via-[#211814] to-[#171311]" />

          <div className="relative px-6 pb-7">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="-mt-16"
            >
              <div
                className="
                relative
                h-32
                w-32
                overflow-hidden
                rounded-full
                border-4
                border-[#1A1411]
                bg-[#211814]
                shadow-xl
              "
              >
                <Image
                  fill
                  src={user.avatar_image}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />

                <span
                  className="
                    absolute
                    bottom-2
                    right-2
                    h-5
                    w-5
                    rounded-full
                    border-4
                    border-[#1A1411]
                    bg-green-500
                  "
                />
              </div>
            </motion.div>

            {/* Name + Update button */}

            <div
              className="
              mt-5
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-center
              md:justify-between
            "
            >
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    className="
                    text-2xl
                    font-bold
                    text-[#F5F1EC]
                    md:text-3xl
                  "
                  >
                    {user.name}
                  </h1>

                  {user.isEmailVerified && (
                    <ShieldCheck className="h-5 w-5 text-[#F97316]" />
                  )}
                </div>

                <p className="mt-1 text-sm text-[#8F8179]">SkillSwap Member</p>
              </div>

              <Button
              onClick={()=> setOpen(true)}
                type="button"
                className="
                  w-fit
                  cursor-pointer
                  border
                  border-[#F97316]
                  bg-[#F97316]
                  px-5
                  font-semibold
                  text-white
                  hover:bg-[#EA580C]
                "
              >
                <Pencil className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />

            {/* Bio */}

            <div
              className="
              mt-6
              rounded-2xl
              border
              border-[#35261F]
              bg-[#211814]
              p-4
            "
            >
              <p className="text-sm leading-6 text-[#D1C7C0]">
                {user.bio || "No bio added yet."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= PERSONAL INFORMATION ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-7"
        >
          <h2 className="text-xl font-bold text-[#F5F1EC]">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-[#81756E]">
            Your account and contact information
          </p>

          <div
            className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
          >
            {/* Email */}

            <InfoCard
              icon={<Mail className="h-5 w-7" />}
              title="Email"
              value={user.email}
            />

            {/* Phone */}

            <InfoCard
              icon={<Phone className="h-5 w-7" />}
              title="Phone"
              value={user.phone || "Not provided"}
            />

            {/* Experience */}

            <InfoCard
              icon={<Briefcase className="h-5 w-7" />}
              title="Experience"
              value={user.experience || "Not provided"}
            />
          </div>
        </motion.div>

        {/* ================= SKILLS ================= */}

        <div
          className="
          mt-8
          grid
          gap-6
          lg:grid-cols-2
        "
        >
          {/* Teaching Skills */}

          <SkillCard
            title="Skills I Teach"
            description="Skills you can share with other members"
            icon={<GraduationCap className="h-5 w-5" />}
            skills={user.teachingSkills}
          />

          {/* Learning Skills */}

          <SkillCard
            title="Skills I Want to Learn"
            description="Skills you want to learn from others"
            icon={<BookOpen className="h-5 w-5" />}
            skills={user.learningSkills}
          />
        </div>

        {/* ================= ACCOUNT STATUS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="
            mt-6
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-[#35261F]
            bg-[#1A1411]
            p-5
          "
        >
          <div>
            <h3 className="font-semibold text-[#F5F1EC]">Account Status</h3>

            <p className="mt-1 text-sm text-[#81756E]">
              Your SkillSwap account is currently active.
            </p>
          </div>

          <div
            className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-green-800/50
            bg-green-950/40
            px-3
            py-1.5
            text-sm
            font-medium
            text-green-400
          "
          >
            <CheckCircle2 className="h-4 w-4" />
            {user.status}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* =====================================================
   INFO CARD
===================================================== */

const InfoCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        rounded-2xl
        border
        border-[#35261F]
        bg-[#1A1411]
        p-5
        hover:border-[#5A3928]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#3A2418]
          text-[#F97316]
        "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[#746860]">{title}</p>

          <p
            className="
            mt-1
            truncate
            text-sm
            font-semibold
            text-[#E8DDD5]
          "
          >
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* =====================================================
   SKILL CARD
===================================================== */

const SkillCard = ({
  title,
  description,
  icon,
  skills,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: Skill[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        rounded-3xl
        border
        border-[#35261F]
        bg-[#1A1411]
        p-6
      "
    >
      <div className="flex items-start gap-4">
        <div
          className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#3A2418]
          text-[#F97316]
        "
        >
          {icon}
        </div>

        <div>
          <h2 className="font-bold text-[#F5F1EC]">{title}</h2>

          <p className="mt-1 text-sm text-[#81756E]">{description}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {skills?.length > 0 ? (
          skills.map((skill: Skill, index: number) => (
            <motion.div
              key={skill._id || index}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.05,
              }}
              className="
                rounded-full
                border
                border-[#5A3928]
                bg-[#2A1C16]
                px-4
                py-2
                text-sm
                font-medium
                text-[#E8DDD5]
                hover:border-[#F97316]
                hover:text-[#F97316]
              "
            >
              {skill.name}
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-[#746860]">No skills added yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
