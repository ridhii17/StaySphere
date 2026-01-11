const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const ListingController = require("../controllers/listings");

//Index Route
router.get("/", wrapAsync(ListingController.index));

//New Route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(ListingController.showListing));

//Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(ListingController.createListing)
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(ListingController.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.destroyListing)
);

module.exports = router;
