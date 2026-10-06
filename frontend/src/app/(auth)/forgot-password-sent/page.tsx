"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Mail, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordSent = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0804] px-4 py-4 md:py-6">
      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl items-center justify-center overflow-hidden rounded-3xl border border-[#6B3515] bg-[#140B05] shadow-2xl md:min-h-[calc(100vh-3rem)]">

        {/* Background Glow */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#D99A18]/10 blur-3xl" />

        {/* Decorative circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-10 top-10 hidden h-40 w-40 rounded-full border border-[#F97316]/10 md:block"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 hidden h-52 w-52 rounded-full border border-[#E59A0B]/10 md:block"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-lg px-5"
        >
          <div className="rounded-3xl border border-[#482613] bg-[#1C1008]/95 p-7 text-center shadow-2xl backdrop-blur-sm md:p-10">

            {/* Logo */}
            <div className="mb-5 flex justify-center">
              <Image
                src="/images/watermarked_img_4340371330782871677-removebg-preview.png"
                alt="SkillSwap logo"
                width={120}
                height={120}
                className="h-auto w-24"
              />
            </div>

            {/* Mail Icon */}
            <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-[#F97316]/20 blur-xl"
              />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#2A1508]">
                <Mail className="h-9 w-9 text-[#F97316]" />

                <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1C1008] bg-[#E59A0B]">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-[#FFF7ED] md:text-3xl">
              Check Your Email
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#A8A29E] md:text-base">
              We’ve sent a password reset link to your registered email
              address.
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78716C]">
              Please check your inbox and click the link to create a new
              password.
            </p>

            {/* Important Note */}
            <div className="mt-7 rounded-2xl border border-[#6B3515] bg-[#241207] px-4 py-4">
              <p className="text-sm leading-6 text-[#D6D3D1]">
                Didn’t receive the email?
                <span className="text-[#F97316]">
                  {" "}
                  Check your spam or junk folder.
                </span>
              </p>
            </div>

            {/* Email Instruction */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#A8A29E]">
              <Mail className="h-4 w-4 text-[#E59A0B]" />
              <span>The link will take you to the reset password page.</span>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-3">
              <Link
                href="/forgot-password"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#6B3515] bg-[#241207] text-sm font-semibold text-[#FFF7ED] transition-all duration-200 hover:border-[#F97316] hover:bg-[#2D1608]"
              >
                <RotateCcw className="h-4 w-4" />
                Send Again
              </Link>

              <Link
                href="/login"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#E59A0B] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#C77D05]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>

            {/* Branding */}
            <div className="mt-8 border-t border-[#482613] pt-5">
              <p className="text-xs text-[#57534E]">
                Learn. Share.{" "}
                <span className="font-medium text-[#F97316]">Swap.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordSent;