const express = require("express"); 
const router = express.Router(); 
const reviewController = require("../controller/review.controller"); 
const authMiddleware = require("../middleware/auth.middleware"); 
const asyncHandler = require("../middleware/asyncHandeler.middleware"); 
const validation = require('../validations/index')
 const { createReviewSchema } = require("../validations/reviewSchema.validation"); 

  // =====================================================
 // CREATE REVIEW 
 // POST /api/reviews 
 // =====================================================

 router.post( "/", authMiddleware.verifyToken, authMiddleware.roleCheck("user"), validation.validate(createReviewSchema), asyncHandler(reviewController.createReview) ); 
 
 // ===================================================== 
 // GET RATING SUMMARY 
 // GET /api/reviews/:userId/summary 
 // ===================================================== 
 router.get( "/:userId/summary", asyncHandler(reviewController.getRatingSummary) ); 
 
 // ===================================================== 
 // GET USER REVIEWS 
 // GET /api/reviews/:userId 
 // ===================================================== 
 router.get( "/received", authMiddleware.verifyToken, authMiddleware.roleCheck("user"), asyncHandler(reviewController.getReceivedReviewsByUser) ); 
  router.get( "/given", authMiddleware.verifyToken, authMiddleware.roleCheck("user"), asyncHandler(reviewController.getReviewsToUser)); 


module.exports = router;