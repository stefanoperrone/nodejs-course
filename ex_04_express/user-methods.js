const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

require("./models/user");
const User = mongoose.model("user");

const secret = "shhhhhh";

// ms 60, 10h, 7d
const expiresIn = "180000";

const signIn = (req, res) => {
  let errors = [];
  if (req.body.password != req.body.password_confirm) {
    errors.push({ error_msg: "password non corrispondenti" });
  }
  if (req.body.password.length < 6) {
    errors.push({ error_msg: "la password deve contenere almeno 6 caratteri" });
  }
  if (errors.length > 0) {
    res.json(errors);
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) res.json({ error_msg: "email è già registrata" });
      else {
        var user = new User({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save().then(u => {
              res.json("User added");
            });
          });
        });
      }
    });
  }
};

const login = (req, res, next) => {
  console.log(
    "[" + Date(Date.now()).toString() + "]",
    "authentication request"
  );
  User.findOne({ email: req.query.email }).then(user => {
    if (!user) {
      console.log("[" + Date(Date.now()).toString() + "]", "user not found");
      return res.json({ message: "user not found" });
    }
    bcrypt.compare(req.query.password, user.password, (err, isMatch) => {
      if (err) return res.json({ error_msg: err });
      if (isMatch) {
        console.log(
          "[" + Date(Date.now()).toString() + "]",
          "user authenticated"
        );
        var token = jwt.sign({ foo: "bar" }, secret, { expiresIn });
        console.log("[" + Date(Date.now()).toString() + "]", "generated jwt");
        return res.json({ token: token });
      } else {
        console.log("[" + Date(Date.now()).toString() + "]", "password wrong");
        return res.json({ error_msg: "password wrong" });
      }
    });
  });
};

exports.login = login;
exports.signIn = signIn;
