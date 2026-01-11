const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

//Signup Route
router.get("/signup", userController.renderSignupForm);

//Signup Route
router.post("/signup", wrapAsync(userController.signup));

//Login Route
router.get("/login", userController.renderLoginForm);

//Login Route
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login", // redirect to login page
    failureFlash: true, //when username or password is incorrect
  }),
  userController.login
);

//Logout Route
router.get("/logout", userController.logout);

module.exports = router;
