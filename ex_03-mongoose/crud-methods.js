const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/biblioteca";

mongoose.Promise = global.Promise;
// definizione connessione al db
mongoose.connect(URL, {
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
const addBookInstance = el => {
  let newBook = new Book({
    title: el.title,
    author: el.author,
    price: el.price,
    available: el.available
  });
  return newBook;
};

// insert nel db
const insertDocument = el => {
  let addBook = addBookInstance(JSON.parse(el));
  addBook.save((err, doc) => {
    if (err) {
      return console.log("Error: ", err);
    }
    console.log("Added new book", doc);
  });
};

// find nel db
const findDocument = query => {
  let findType = query[0];
  let queryValue = JSON.parse(query[1]);
  console.log(findType, queryValue);
  if (findType === "all") {
    Book.find(queryValue, (err, doc) => {
      if (err) {
        return console.log("Error", err);
      }
      console.log("Find all by author: ", doc);
    });
  } else if (findType === "one") {
    // findOne nel db
    Book.findOne(queryValue, (err, doc) => {
      if (err) {
        return console.log("Error", err);
      }
      console.log("Find one by author: ", doc);
    });
  } else if (findType === "id") {
    // findById nel db
    Book.findById(queryValue._id, (err, doc) => {
      if (err) {
        return console.log("Error", err);
      }
      console.log("Find by id: ", doc);
    });
  }
};

// delete nel db
const deleteDocument = query => {
  Book.findOneAndRemove(JSON.parse(query), (err, doc) => {
    if (err) {
      return console.log("Error", err);
    }
    console.log("Remove one by author: ", doc);
  });
};

const updateDocument = query => {
  let queryValue = JSON.parse(query[0]);
  let setValue = JSON.parse(query[1]);
  Book.findOneAndUpdate(queryValue, { $set: setValue }, (err, doc) => {
    if (err) {
      return console.log("Error", err);
    }
    console.log("Find one and updated by author: ", doc);
  });
};

// Book.findById("5e4ff2da63fdd10b77380dd4", (err, book) => {
//   if (err) {
//     return console.log("Error", err);
//   }

//   book.set({ price: 40 });
//   book.save((err, doc) => {
//     if (err) return console.log("Error:", err);
//     console.log(doc);
//   });
// });

exports.insertDocument = insertDocument;
exports.findDocument = findDocument;
exports.deleteDocument = deleteDocument;
exports.updateDocument = updateDocument;
