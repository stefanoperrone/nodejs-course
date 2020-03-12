const express = require("express");
const router = express.Router();
const noteMethods = require("./note-methods");
const userMethods = require("./user-methods");

router
  .route("/notes")
  .post(noteMethods.createNote)
  .get(noteMethods.getAllNotes);

router
  .route("/notes/:noteId")
  .get(noteMethods.getOneNote)
  .put(noteMethods.updateOneNote)
  .delete(noteMethods.deleteNote);

router.param("noteId", noteMethods.getByIdNote);

router.route("/users").post(userMethods.signIn);

router.route("/users/login").get(userMethods.login);

exports.ownRouter = router;
