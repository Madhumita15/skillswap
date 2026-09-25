const express = require("express"); 
const router = express.Router(); 
const reviewController = require("../controller/review.controller"); 
const authMiddleware = require("../middleware/auth.middleware"); 
const asyncHandler = require("../middleware/asyncHandler"); 
const validation = require('../validations/index')
 const { createReviewSchema, } = require("../validation/review.validation"); 

  // =====================================================
 // CREATE REVIEW 
 // POST /api/reviews 
 // =====================================================

 router.post( "/", authMiddleware, validation.validate(createReviewSchema), asyncHandler(reviewController.createReview) ); 
 
 // ===================================================== 
 // GET RATING SUMMARY 
 // GET /api/reviews/:userId/summary 
 // ===================================================== 
 router.get( "/:userId/summary", asyncHandler(reviewController.getRatingSummary) ); 
 
 // ===================================================== 
 // GET USER REVIEWS 
 // GET /api/reviews/:userId 
 // ===================================================== 
 router.get( "/:userId", asyncHandler(reviewController.getReviewsByUser) ); 


module.exports = router;