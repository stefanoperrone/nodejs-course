const LinesCommand = require("command-line-args");
const { MongoClient } = require("mongodb");
const methods = require("./crud-methods");
const argsList = [
  { name: "insert", type: String },
  { name: "update", type: String },
  { name: "delete", type: String },
  { name: "find", type: String },
  { name: "exit", type: Boolean }
];

//1. node app.js --insert '{ "title": "js", "hours": 10, "level": "basic" }'
//2. node app.js --insert '[{ "title": "js", "hours": 10, "level": "basic" },{ "title": "react", "hours": 29, "level": "middle"}]'

const options = LinesCommand(argsList);

const assert = require("assert");

const URL = "mongodb://localhost:27017/test";

MongoClient.connect(URL, (err, client) => {
  assert.equal(null, err);

  const db = client.db("test");
  console.log("Connection DB established");

  if (options.insert) {
    let insertValues = JSON.parse(options.insert);
    methods.insertRecord(insertValues, db);
    client.close();
  } else if (options.update) {
    // updateOne
    db.collection("courses").findOneAndUpdate(
      { level: "basic" },
      { $set: { level: "high" } },
      (err, doc) => {
        if (err) {
          return console.log("ops.. update not executed");
        }
        console.log("Update result: ", doc);
      }
    );
    client.close();
  } else if (options.delete) {
    // deleteOne
    db.collection("courses").deleteOne({ title: "js" }, (err, doc) => {
      if (err) {
        return console.log("ops.. no delete executed");
      }
      console.log("Delete result: ", doc);
    });

    // deleteOne
    db.collection("courses").deleteMany({ level: "high" }, (err, doc) => {
      if (err) {
        return console.log("ops.. no delete executed");
      }
      console.log("Delete result: ", doc);
    });

    client.close();
  } else if (options.find) {
    //find
    db.collection("courses")
      .find({ title: "js" })
      .toArray((err, docs) => {
        if (err) {
          return console.log("ops.. no results");
        }
        console.log("Search result: ", docs);
      });

    // findOne
    db.collection("courses").findOne(
      { title: "js" },
      { _id: 0 },
      (err, doc) => {
        if (err) {
          return console.log("ops.. no results");
        }
        console.log("Search result: ", doc);
      }
    );

    client.close();
  } else if (options.exit) {
    console.log("Terminate");
    client.close();
  }
});
