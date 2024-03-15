const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const Review = require("../models/review.js");
const Campground = require("../models/campground.js");
const reviews = require("../controller/reviews.js");

const catchAsync = require("../utils/catchAsync");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);
module.exports = router;
