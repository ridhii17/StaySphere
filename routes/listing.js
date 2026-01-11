const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const ListingController = require("../controllers/listings");

router
  .route("/")
  .get(wrapAsync(ListingController.index)) // Index Route
  .post(
    //Create Route
    isLoggedIn,
    validateListing,
    wrapAsync(ListingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(ListingController.showListing)) //Show Route
  .put(
    //Update Route
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(ListingController.updateListing)
  )
  .delete(
    //Delete Route
    isLoggedIn,
    isOwner,
    wrapAsync(ListingController.destroyListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm)
);

module.exports = router;
