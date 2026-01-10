const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

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
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
      });
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
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login", // redirect to login page
    failureFlash: true, //when username or password is incorrect
  }),
  async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    // res.redirect(res.locals.redirectUrl);
    res.redirect(redirectUrl);
  }
  
);

//Logout Route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
});

module.exports = router;
