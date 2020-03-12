const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// definizione connessione al db
mongoose.connect("mongodb://localhost:27017/biblioteca", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// definizione Schema
const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  available: Boolean
});

// definizione del model (con la prima lettera maiuscola)
const Book = mongoose.model("Book", bookSchema);

// creazione di un instanza
const addBook = new Book({
  title: "50 Volte il primo bacio",
  author: "Massimo Cataldo",
  price: 23,
  available: true
});

// creazione di un instanza
const addBook2 = new Book({
  title: "50 Sfumature di Grigio",
  author: "Massimo Cataldo",
  price: 13,
  available: true
});

// insert nel db
addBook.save((err, doc) => {
  if (err) {
    return console.log("Error: ", err);
  }
  console.log("Added new book", doc);
});

// insert nel db
addBook2.save((err, doc) => {
  if (err) {
    return console.log("Error: ", err);
  }
  console.log("Added new book", doc);
});

// find nel db
Book.find({ author: "Massimo Cataldo" }, (err, doc) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Find all by author: ", doc);
});

// findOne nel db
Book.findOne({ author: "Massimo Cataldo" }, (err, doc) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Find one by author: ", doc);
});

// findById nel db
Book.findById("5e4ff245b8bda30b38b49805", (err, doc) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Find by id: ", doc);
});

Book.findOneAndRemove({ author: "Massimo Cataldo" }, (err, doc) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Remove one by author: ", doc);
});

Book.findOneAndUpdate(
  { author: "Massimo Cataldo" },
  { $set: { author: "Paolo Rossi" } },
  (err, doc) => {
    if (err) {
      return console.log("Error", err);
    }
    console.log("Find one and updated by author: ", doc);
  }
);

Book.findById("5e4ff2da63fdd10b77380dd4", (err, book) => {
  if (err) {
    return console.log("Error", err);
  }

  book.set({ price: 40 });
  book.save((err, doc) => {
    if (err) return console.log("Error:", err);
    console.log(doc);
  });
});
