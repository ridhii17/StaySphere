const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

//Signup Route
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

//Signup Route
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      req.flash("success", "Welcome to StaySphere!");
      res.redirect("/listings");
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

//Login Route
router.get("/login", (req, res) => {
  res.render("users/login");
});

//Login Route
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login", // redirect to login page
    failureFlash: true, //when username or password is incorrect
  }),
  wrapAsync(async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
  })
);

module.exports = router;
