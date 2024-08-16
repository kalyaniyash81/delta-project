const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String
  },
  price: Number,
  location: String,
  country: String,
  review:[
    {
      type:Schema.Types.ObjectId,
      ref:"review",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },

  geometry:{
    type:{
      type:String,
      enum:['Point'],
      required:true
    },
    coordinates:{
      type:[Number],
      requires:true
    }
  

  },
  // category:{
  //   type:String,
  //   enum:["mountains","arctic","farms","deserts","castels","pools","cities"]
  // }

 
});

listingSchema.post("findOneAndDelete",async(listing)=>{

  if(listing){
    await review.deleteMany({_id:{$in:listing.review}});
  }

})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;