const Listing= require("./models/listing");
const Expresserrors= require("./utils/Expresserrors.js");
const Review= require("./models/review");
const {listingSchema,reviewSchema}= require("./schema.js");

module.exports.Isloggedin=(req,res,next)=>{
  

    if(!req.isAuthenticated()){
      req.session.redirectUrl= req.originalUrl;
        req.flash("error","You must be logged in to create new Listings");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner= async (req,res,next)=>{
  let { id } = req.params;
  let  listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validatelisting=(req,res,next)=>{
  let {error}= listingSchema.validate(req.body);
   if(error)
   {
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new Expresserrors(404,errMsg);
   }
   else{
    next();
   }

}

module.exports.validatereview=(req,res,next)=>{
  let {error}= reviewSchema.validate(req.body);
   if(error)
   {
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new Expresserrors(404,errMsg);
   }
   else{
    next();
   }

}

module.exports.isReviewAuthor= async (req,res,next)=>{
  let { id,reviewId } = req.params;
  let  review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}