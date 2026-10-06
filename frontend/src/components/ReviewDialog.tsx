"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewValidation } from "@/services/validation/review.validation";
import { useCreteReview } from "@/hooks/useReview";
import { Spinner } from "./ui/spinner";

interface ReviewFormData {
  rating: number;
  comment: string;
}

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  reviewedUserId: string;
  swapId: string;
}

const ReviewDialog = ({
  open,
  onOpenChange,
  swapId,
  reviewedUserId,
}: ReviewDialogProps) => {
  const { mutateAsync: createMutate, isPending } = useCreteReview();

  console.log(" reviewedUserId", reviewedUserId, swapId);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewValidation),
    defaultValues: {
      rating: 1,
      comment: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    const updatedData = {
      ...data,
      swapId: swapId,
      reviewedUserId: reviewedUserId,
    };

    try {
      await createMutate(updatedData);
      onOpenChange(false);
      reset({
        rating: 1,
        comment: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => onOpenChange(value)}>
      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          border-[#F97316]/20
          bg-[#0B0804]
          text-white
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          sm:max-w-lg
        "
      >
        {/* Top glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-24
            w-2/3
            -translate-x-1/2
            rounded-full
            bg-[#F97316]/10
            blur-3xl
          "
        />

        <DialogHeader className="relative space-y-3">
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#F97316]/30
              bg-linear-to-br
              from-[#F97316]/20
              to-[#E59A0B]/10
              text-[#F97316]
              shadow-[0_0_25px_rgba(249,115,22,0.12)]
            "
          >
            <Star className="h-6 w-6 fill-current" />
          </div>

          <DialogTitle className="text-center text-xl font-bold">
            Rate Your Experience
          </DialogTitle>

          <DialogDescription className="text-center text-white/50">
            Share your experience with this SkillSwap participant.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative mt-5 space-y-6"
        >
          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-white">
              Your Rating
            </Label>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setValue("rating", star, {
                      shouldValidate: true,
                    })
                  }
                  className="
                    rounded-lg
                    p-2
                    outline-none
                    transition-all
                    duration-200
                    hover:scale-110
                    focus-visible:ring-2
                    focus-visible:ring-[#F97316]
                  "
                  aria-label={`Give ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`
                      h-8
                      w-8
                      transition-all
                      duration-200
                      ${
                        rating >= star
                          ? "fill-[#F97316] text-[#F97316] drop-shadow-[0_0_8px_rgba(249,115,22,0.35)]"
                          : "text-white/20 hover:text-[#F97316]/60"
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            <div className="text-center text-xs text-white/40">
              {rating > 0 ? `${rating} out of 5` : "Select a rating"}
            </div>

            <input
              type="hidden"
              {...register("rating", {
                required: "Please select a rating",
                min: {
                  value: 1,
                  message: "Please select a rating",
                },
              })}
            />

            {errors.rating && (
              <p className="text-center text-xs text-red-400">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium text-white">
              Your Review
            </Label>

            <Textarea
              id="comment"
              {...register("comment", {
                required: "Please write a review",
              })}
              placeholder="Tell us about your experience..."
              className="
                min-h-32
                resize-none
                rounded-xl
                border-white/10
                bg-[#17100A]
                px-3
                py-3
                text-sm
                text-white
                placeholder:text-white/25
                outline-none
                transition-all
                duration-300
                hover:border-[#F97316]/30
                focus:border-[#F97316]
                focus:ring-2
                focus:ring-[#F97316]/20
                focus:shadow-[0_0_20px_rgba(249,115,22,0.08)]
              "
            />

            {errors.comment && (
              <p className="text-xs text-red-400">{errors.comment.message}</p>
            )}
          </div>

          {/* Footer */}
          <DialogFooter
            className="
              border-t
              border-[#F97316]/10
              pt-5
              sm:justify-end
            "
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                
              }}
              className="
              cursor-pointer
                border-white/10
                bg-transparent
                text-white/70
                hover:border-white/20
                hover:bg-white/5
                hover:text-white
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="
              cursor-pointer
                border-0
                bg-linear-to-r
                from-[#F97316]
                to-[#E59A0B]
                font-semibold
                text-white
                shadow-[0_0_20px_rgba(249,115,22,0.15)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]
              "
            >
              {isPending ? <Spinner /> : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
