const express = require("express");
const router  = express.Router();
let obj;

let user = {username: "bstrong3", password: "mypassword"};

function loginCheck(req, res, next) {
  if(req.session.token){
    next();
  } else {
    console.log("No token");
    res.render("login")
  }
}

router.get("/", function(req, res){
  if(!req.session.token){
    res.redirect("/login")
  } else {
    res.render("results", obj);
}});

router.get("/login", loginCheck, function(req, res) {
  res.render("login");
})

// router.get("/results", function(req, res, next) {
//   if(req.session.token) {
//     next();
//   } else {
//     res.redirect("/login")
//   }
// }, function (req, res) {
//   res.render("results", req.session.user);
// });

router.post("/", function(req, res) {
  obj = {
    username: req.body.username,
    password: req.body.password
  };

  if((obj.username == user.username) && (obj.password == user.password)) {
    req.session.user = obj;
    req.session.token = "asdfghjkl";
    res.redirect("results");
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    console.log(err);
  });
  res.redirect("/login");
});

module.exports = router;
