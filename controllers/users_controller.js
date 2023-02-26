const User = require("../models/user");
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "Profile",
      profile_user: user
    });
  });
};

module.exports.sighUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signup", {
    title: "Codial | SignUp",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signin", {
    title: "Codial | SignIn",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error creating User while sign in", err);
          return;
        }
        return res.redirect("/users/codial-sign-in");
      });
    } else {
      console.log("something wrong 3");
      return res.redirect("back");
    }
  });
};
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
