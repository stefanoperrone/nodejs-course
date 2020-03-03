const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

require("../models/user");
const User = mongoose.model("user");

module.exports = () => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      console.log(
        "[" + Date(Date.now()).toString() + "]",
        "Authentication procedure"
      );
      User.findOne({ email: email }).then(user => {
        if (!user) {
          console.log(
            "[" + Date(Date.now()).toString() + "]",
            "user not found"
          );
          return done(null, false, { message: "utente non trovato" });
        }
        console.log(
          "[" + Date(Date.now()).toString() + "]",
          "user found",
          user
        );
        bcrypt.compare(password, user.password, (err, isMatch) => {
          console.log("$$$compare", err, isMatch);
          if (err) return done(null, err);
          if (isMatch) {
            console.log(
              "[" + Date(Date.now()).toString() + "]",
              "password corretta"
            );
            return done(null, user);
          } else {
            console.log(
              "[" + Date(Date.now()).toString() + "]",
              "password non corretta"
            );
            return done(null, false, { message: "password non corretta" });
          }
        });
      });
    })
  );
};
