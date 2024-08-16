const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Expresserrors = require("../utils/Expresserrors.js");
const review = require("../models/review.js");
const Listing= require("../models/listing.js");
const {validatereview,Isloggedin,isReviewAuthor}= require("../middleware.js");
const reviewController= require("../controllers/reviews.js");




//Reviews Post route
  router.post("/",Isloggedin,validatereview, wrapAsync(reviewController.createReview));
  
  //Delete Review Route
  
  router.delete("/:reviewId",Isloggedin,isReviewAuthor, wrapAsync(reviewController.destroyReview));
   
  module.exports=router;
  
  
  
  