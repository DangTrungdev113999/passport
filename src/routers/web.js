const express = require("express");
const passport = require("passport")
const router = express.Router();

const initPassportLocal = require("./../controllers/passport/local");
const auth = require("./../middlewares/auth");

initPassportLocal();

router.get("/", auth.checkLogin , (req, res) => {
  res.render("home", {user: req.user});
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login", 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
})


module.exports = router;