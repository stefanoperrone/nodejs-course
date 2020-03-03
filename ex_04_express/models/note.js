const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateUpdate: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("note", noteSchema);
