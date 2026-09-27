const { createReviewService, getReviewsByUserService, getRatingSummaryService, } = require("../services/review.service");
 const httpStatusCode = require("../utils/httpStatusCode"); 
 class ReviewController { 
    // ========
    // CREATE REVIEW // POST /api/reviews 
    // ======== 
    async createReview(req, res) { 
        const reviewerId = req.user._id; 
        const { swapId, reviewedUserId, rating, comment, } = req.body; 
        const review = await createReviewService({ 
            swapId, reviewerId, reviewedUserId, rating, comment, }); 
            return res.status(httpStatusCode.CREATED).json({ 
                success: true, 
                message: "Review submitted successfully", 
                data: review, 
            });
        } 

        // ==========
        // GET REVIEWS OF A USER 
        // GET /api/reviews/:userId 
        // ========== 
        async getReviewsByUser(req, res) { 
            const { userId } = req.params; 
            const reviews = await getReviewsByUserService({ userId, }); 
            return res.status(httpStatusCode.OK).json({ 
                success: true, 
                message: "Reviews fetched successfully", 
                data: reviews, 
            }); 
        } 
                
        // =========== 
        // GET RATING SUMMARY 
        // GET /api/reviews/:userId/summary 
        // ============ 
        async getRatingSummary(req, res) { 
            const { userId } = req.params; 
            const summary = await getRatingSummaryService({ userId, }); 
            return res.status(httpStatusCode.OK).json({ 
                success: true, 
                message: "Rating summary fetched successfully", 
                data: summary, 
            }); 
        } 
    } 
    
    module.exports = new ReviewController();