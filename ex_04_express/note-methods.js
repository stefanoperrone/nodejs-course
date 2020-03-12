const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

// Schema and Model
require("./models/note");
const Note = mongoose.model("note");

const secret = "shhhhhh";

//middleware for create
const createNote = (req, res, next) => {
  var note = new Note(req.body);

  note.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(note);
    }
  });
};

const updateOneNote = (req, res, next) => {
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

const deleteNote = (req, res, next) => {
  req.note.remove(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(req.note);
    }
  });
};

const getAllNotes = (req, res, next) => {
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

const getOneNote = (req, res) => {
  res.json(req.note);
};

const getByIdNote = (req, res, next, id) => {
  // must to be centralized
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

exports.createNote = createNote;
exports.updateOneNote = updateOneNote;
exports.deleteNote = deleteNote;
exports.getAllNotes = getAllNotes;
exports.getOneNote = getOneNote;
exports.getByIdNote = getByIdNote;
