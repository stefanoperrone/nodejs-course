const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bcrypt = require("bcrypt");
const router = express.Router();
var jwt = require("jsonwebtoken");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(
      "[" + Date(Date.now()).toString() + "]",
      "Connection established"
    );
    app.listen(port, () => {
      console.log(
        "[" + Date(Date.now()).toString() + "]",
        `server active on port ${port}`
      );
    });
  })
  .catch(err => err);

// Schema and Model
require("./models/note");
const Note = mongoose.model("note");

require("./models/user");
const User = mongoose.model("user");

const secret = "shhhhhh";

// ms 60, 10h, 7d
const expiresIn = "180000";

var app = express();

//rest API requirements
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//middleware for create
var createNote = function(req, res, next) {
  var note = new Note(req.body);

  note.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(note);
    }
  });
};

var updateOneNote = function(req, res, next) {
  var values = {
    $set: {
      title: req.body.title,
      content: req.body.content,
      dateUpdate: Date.now()
    }
  };
  Note.updateOne({ id: req.body._id }, values, { new: true }, function(
    err,
    note
  ) {
    if (err) {
      next(err);
    } else {
      res.json(note);
    }
  });
};

var deleteNote = function(req, res, next) {
  req.note.remove(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(req.note);
    }
  });
};

var getAllNotes = function(req, res, next) {
  let token = req.headers.authorization;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(
        "[" + Date(Date.now()).toString() + "]",
        "user unauthorized -> Error:",
        JSON.stringify(err)
      );
      res.status(401).send(err);
    } else {
      console.log(
        "[" + Date(Date.now()).toString() + "]",
        "getAllNotes request: user authorized"
      );
      Note.find(function(err, notes) {
        if (err) {
          next(err);
        } else {
          res.json(notes);
        }
      });
    }
  });
};

var getOneNote = function(req, res) {
  res.json(req.note);
};

var getByIdNote = function(req, res, next, id) {
  // must to be centralized
  let token = req.headers.authorization;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(
        "[" + Date(Date.now()).toString() + "]",
        "!!!!user unauthorized -> Error:",
        JSON.stringify(err)
      );
      res.status(401).send(err);
    } else {
      console.log(
        "[" + Date(Date.now()).toString() + "]",
        "findOne request: user authorized"
      );
      Note.findOne({ _id: id }, function(err, note) {
        if (err) {
          next(err);
        } else {
          req.note = note;
          next();
        }
      });
    }
  });
};

var signIn = function(req, res) {
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

var login = function(req, res, next) {
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

router
  .route("/notes")
  .post(createNote)
  .get(getAllNotes);

router
  .route("/notes/:noteId")
  .get(getOneNote)
  .put(updateOneNote)
  .delete(deleteNote);

router.param("noteId", getByIdNote);

router.route("/users").post(signIn);

router.route("/users/login").get(login);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", router);

const port = 3000;

//execute on terminal nodemon app.js
