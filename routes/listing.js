const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { Isloggedin, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const{storage}= require("../cloudConfig.js");
const upload = multer({storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //all listing index route
  .post(
    Isloggedin,
    upload.single('listing[image]'),
    validatelisting,
    wrapAsync(listingController.createListing) //create new listing
  )
  

//NEW route
router.get("/new", Isloggedin, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //SHOW Route
  .put(
    Isloggedin,
    isOwner,
    upload.single('listing[image]'),
    validatelisting,
    wrapAsync(listingController.updateListing)
  ) //Update Route
  .delete(Isloggedin, isOwner, wrapAsync(listingController.destroyListing)); //DELETE Route

//Edit Route
router.get(
  "/:id/edit",
  Isloggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
