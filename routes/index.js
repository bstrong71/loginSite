const express = require("express");
const router  = express.Router();
let obj;

let user = {username: "bstrong3", password: "mypassword"};

// function loginCheck(req, res, next) {
//   if(req.session.token){
//     next();
//   } else {
//     console.log("No token");
//   }
// }

router.get("/", function(req, res){
  if(!req.session.token){
    res.redirect("/login")
  } else {
    res.render("results", obj);
}});

router.get("/login", function(req, res) {
  if (req.session.error) {
    res.render("login", {error: req.session.error});
  } else {
    res.render("login");
  }
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
  req.checkBody("username", "Username must have between 8 - 25 characters.").isLength({min:8, max:25});
  req.checkBody("password", "Password must contain at least 8 characters").isByteLength({min:8});
  req.checkBody("password", "Password must contain at least 8 characters").isAlphanumeric();

  let errors = req.getValidationResult();
  let messages = [];

  errors.then(function(result) {
    result.array().forEach(function(error) {
      messages.push(error.msg);
    });

    let object = {
      errors: messages,
      username: req.body.username,
      password: req.body.password
    };

    res.render('results', object);
  });



  // if((obj.username == user.username) && (obj.password == user.password)) {
  //   req.session.user = obj;
  //   req.session.token = "asdfghjkl";
  //   res.render("results", {username: obj.username});
  // } else {
  //   req.session.error = "Your username and/or password is incorrect";
  //   res.redirect("/login");
  // }
});

router.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    console.log(err);
  });
  res.redirect("/login");
});

module.exports = router;
