const Listing= require("../models/listing");
const review=require("../models/review");
module.exports.createReview=async(req,res)=>{

    let listing= await Listing.findById(req.params.id);
    let newreview= new review(req.body.review);
    newreview.author= req.user._id; 
    listing.review.push(newreview);
    await newreview.save(); 
    await listing.save();
    req.flash("success","New Review Created"); 
    res.redirect(`/listings/${listing._id}`);
  
  }

module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted"); 
    res.redirect(`/listings/${id}`);
  }  