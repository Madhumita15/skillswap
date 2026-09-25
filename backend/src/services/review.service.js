const Review = require("../models/review.model"); 
const Swap = require("../models/swap.model"); 
const httpStatusCode = require("../utils/httpStatusCode"); 

// ===================================================== 
// CREATE REVIEW 
// ===================================================== 
const createReviewService = async ({ swapId, reviewerId, reviewedUserId, rating, comment, }) => { 

 // 1. Check whether swap exists 
 const swap = await Swap.findById(swapId); 
 if (!swap) { const error = new Error("Swap not found"); 
    error.statusCode = httpStatusCode.NOT_FOUND; 
    throw error; 
} 

// 2. Review only after completed swap 
 if (swap.status !== "completed") { 
    const error = new Error( "Review can only be submitted after the swap is completed" );
     error.statusCode = httpStatusCode.BAD_REQUEST; 
     throw error; 
    } 

// 3. Check reviewer is a participant 
 const reviewerIdString = reviewerId.toString(); 
 const senderIdString = swap.senderId.toString(); 
 const receiverIdString = swap.receiverId.toString(); 
 const isSender = reviewerIdString === senderIdString; 
 const isReceiver = reviewerIdString === receiverIdString; 

 if (!isSender && !isReceiver) { 
    const error = new Error( "You are not a participant in this swap" ); 
    error.statusCode = httpStatusCode.FORBIDDEN; 
    throw error; } 

// 4. Prevent self-review
 if ( reviewerIdString === reviewedUserId.toString() ) { 
    const error = new Error( "You cannot review yourself" ); 
    error.statusCode = httpStatusCode.BAD_REQUEST; 
    throw error; 
} 
 // 5. Check reviewed user is the other participant 
  const isReviewedUserParticipant = 
  reviewedUserId.toString() === senderIdString || 
  reviewedUserId.toString() === receiverIdString; 

  if (!isReviewedUserParticipant) { 
    const error = new Error( "The reviewed user is not a participant in this swap" ); 
    error.statusCode = httpStatusCode.BAD_REQUEST; 
    throw error; } 

 // 6. Prevent duplicate review 
  const existingReview = await Review.findOne({ swapId, reviewerId, }); 

  if (existingReview) { 
    const error = new Error( "You have already reviewed this swap" ); 
    error.statusCode = httpStatusCode.CONFLICT; 
    throw error; } 

 // 7. Create review 
  const review = await Review.create({ 
    swapId, 
    reviewerId, 
    reviewedUserId, 
    rating, 
    comment: comment || null, 
    }); 

 // 8. Return populated review 
  return await Review.findById(review._id) 
  .populate( "reviewerId", "name email avatar_image" ) 
  .populate( "reviewedUserId", "name email avatar_image" ); 
}; 

 // GET REVIEWS RECEIVED BY USER 
 const getReviewsByUserService = async ({ userId, }) => {

     const reviews = await Review.find({ reviewedUserId: userId, }) 
     .populate( "reviewerId", "name email avatar_image" ) 
     .populate( "reviewedUserId", "name email avatar_image" ) 
     .sort({ createdAt: -1, }); 
     return reviews; 
}; 
     
// GET RATING SUMMARY
 const getRatingSummaryService = async ({ userId, }) => { 
    const result = await Review.aggregate([ 
        { $match: 
            { reviewedUserId: userId, },
        }, 
        { $group: 
            { _id: "$reviewedUserId", 
                averageRating: { $avg: "$rating", }, 
                reviewCount: { $sum: 1, }, 
            }, 
        }, 
        { $project: 
            { _id: 0, 
            averageRating: { 
                $round: [ "$averageRating", 1, ], 
            }, 
            reviewCount: 1, 
            }, 
        }, 
    ]); 

    // No reviews yet 
    if (result.length === 0) { 
         return { averageRating: 0, reviewCount: 0, }; 
    } 
    return result[0]; 
};

module.exports = { createReviewService, getReviewsByUserService, getRatingSummaryService,};