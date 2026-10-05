
"use client";

import React from "react";
import Image from "next/image";
import { Star, MessageSquare, Send, Inbox, AlertCircle } from "lucide-react";

import {
  useGetGivenReview,
  useGetReceivedReview,
} from "@/hooks/useReview";

interface ReviewUser {
  _id: string;
  name: string;
  email: string;
  avatar_image?: string;
}

interface Review {
  _id?: string;
  comment: string;
  rating: number;
  createdAt: string;
  swapId: string;
  reviewedUserId: ReviewUser;
  reviewerId: ReviewUser;
}

interface ReviewSectionProps {
  title: string;
  description: string;
  reviews: Review[];
  isLoading: boolean;
  isError: boolean;
  type: "received" | "given";
}

const ReviewSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-orange-500/10 bg-[#17100A] p-5"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-500/10" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-orange-500/10" />
              <div className="h-3 w-24 rounded bg-orange-500/10" />
            </div>
          </div>

          <div className="mt-5 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="h-4 w-4 rounded bg-orange-500/10"
              />
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-orange-500/10" />
            <div className="h-3 w-4/5 rounded bg-orange-500/10" />
          </div>
        </div>
      ))}
    </div>
  );
};

const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-[#17100A] px-6 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
        <AlertCircle className="h-6 w-6 text-red-400" />
      </div>

      <h3 className="text-base font-semibold text-white">
        Unable to load reviews
      </h3>

      <p className="mt-1 max-w-md text-sm text-gray-400">
        Something went wrong while fetching the reviews. Please try again
        later.
      </p>
    </div>
  );
};

const EmptyState = ({
  type,
}: {
  type: "received" | "given";
}) => {
  const isReceived = type === "received";

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-orange-500/10 bg-[#17100A] px-6 py-12 text-center transition-all duration-300 hover:border-orange-500/20">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
        {isReceived ? (
          <Inbox className="h-6 w-6 text-orange-400" />
        ) : (
          <Send className="h-6 w-6 text-orange-400" />
        )}
      </div>

      <h3 className="text-base font-semibold text-white">
        {isReceived ? "No reviews received yet" : "No reviews given yet"}
      </h3>

      <p className="mt-1 max-w-md text-sm text-gray-400">
        {isReceived
          ? "Complete swaps and receive reviews from your learning partners."
          : "Reviews you give after completing swaps will appear here."}
      </p>
    </div>
  );
};

const ReviewCard = ({
  review,
  type,
}: {
  review: Review;
  type: "received" | "given";
}) => {
  /*
   * Received review:
   *   reviewerId = person who reviewed me
   *
   * Given review:
   *   reviewedUserId = person whom I reviewed
   */
  const user =
    type === "received"
      ? review.reviewerId
      : review.reviewedUserId;

  const formattedDate = new Date(review.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-orange-500/10
        bg-[#17100A]
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-orange-500/30
        hover:shadow-[0_12px_35px_rgba(249,115,22,0.10)]
      "
    >
      {/* Top gradient line */}
      <div
        className="
          absolute left-0 top-0 h-0.5 w-0
          bg-linear-to-r from-[#F97316] to-[#E59A0B]
          transition-all duration-500
          group-hover:w-full
        "
      />

      {/* User information */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-orange-500/20 bg-orange-500/10">
            {user?.avatar_image ? (
              <Image
                src={user.avatar_image}
                alt={user.name || "User"}
                fill
                sizes="48px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#F97316] to-[#E59A0B] text-lg font-bold text-black">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">
              {user?.name || "Unknown User"}
            </h3>

            <p className="truncate text-xs text-gray-500">
              {type === "received" ? "Reviewed you" : "You reviewed"}
            </p>
          </div>
        </div>

        <span className="shrink-0 text-xs text-gray-500">
          {formattedDate}
        </span>
      </div>

      {/* Rating */}
      <div className="mt-5 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 transition-transform duration-200 ${
              star <= review.rating
                ? "fill-[#F97316] text-[#F97316]"
                : "text-gray-700"
            }`}
          />
        ))}

        <span className="ml-2 text-xs font-medium text-orange-400">
          {review.rating}.0 / 5
        </span>
      </div>

      {/* Comment */}
      <div className="mt-4 rounded-xl border border-orange-500/5 bg-[#0B0804] p-4">
        <MessageSquare className="mb-2 h-4 w-4 text-orange-500/70" />

        <p className="text-sm leading-6 text-gray-300">
          {review.comment}
        </p>
      </div>

      {/* Bottom hover line */}
      <div
        className="
          absolute bottom-0 right-0 h-[2px] w-0
          bg-gradient-to-l from-[#F97316] to-[#E59A0B]
          transition-all duration-500
          group-hover:w-1/2
        "
      />
    </div>
  );
};

const ReviewSection = ({
  title,
  description,
  reviews,
  isLoading,
  isError,
  type,
}: ReviewSectionProps) => {
  return (
    <section className="space-y-5">
      {/* Section heading */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            {type === "received" ? (
              <Inbox className="h-5 w-5 text-orange-500" />
            ) : (
              <Send className="h-5 w-5 text-orange-500" />
            )}

            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        {!isLoading && !isError && (
          <span
            className="
              w-fit rounded-full
              border border-orange-500/20
              bg-orange-500/5
              px-3 py-1
              text-xs font-medium text-orange-400
            "
          >
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </span>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <ReviewSkeleton />
      ) : isError ? (
        <ErrorState />
      ) : reviews.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review._id || `${review.swapId}-${index}`}
              review={review}
              type={type}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const MyReviews = () => {
  const {
    data: receivedData,
    isLoading: receivedLoading,
    isError: receivedIsError,
  } = useGetReceivedReview();

  const {
    data: givenData,
    isLoading: givenLoading,
    isError: givenIsError,
  } = useGetGivenReview();

  const receivedReviews: Review[] = receivedData?.data || [];
  const givenReviews: Review[] = givenData?.data || [];

  return (
    <div className="min-h-screen bg-[#0B0804] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Page Header */}
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/10 bg-[#17100A] p-6 sm:p-8">
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F97316] to-[#E59A0B] shadow-lg shadow-orange-500/10">
                <Star className="h-5 w-5 fill-black text-black" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                  Your Reputation
                </p>

                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  My Reviews
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-gray-400">
              View the feedback you have received from your learning partners
              and the reviews you have given after completing swaps.
            </p>
          </div>
        </div>

        {/* Received Reviews */}
        <ReviewSection
          title="Received Reviews"
          description="See what your learning partners think about working with you."
          reviews={receivedReviews}
          isLoading={receivedLoading}
          isError={receivedIsError}
          type="received"
        />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />

        {/* Given Reviews */}
        <ReviewSection
          title="Given Reviews"
          description="Review history from the swaps you have completed."
          reviews={givenReviews}
          isLoading={givenLoading}
          isError={givenIsError}
          type="given"
        />
      </div>
    </div>
  );
};

export default MyReviews;