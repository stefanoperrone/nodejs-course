// const MongoClient = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");

const assert = require("assert");

const URL = "mongodb://localhost:27017/test";

MongoClient.connect(URL, (err, client) => {
  assert.equal(null, err);

  const db = client.db("test");

  let course = { title: "js", hours: 10, level: "basic" };

  //single insert
  db.collection("courses").insertOne(course, (err, res) => {
    if (err) {
      return console.log(`ops.. error: ${err}`);
    }
    console.log("Inserted document right", res.ops);
  });

  var course_1 = { title: "js", hours: 10, level: "basic" };
  var course_2 = { title: "redux", hours: 20, level: "medium" };
  var course_3 = { title: "react", hours: 40, level: "high" };

  //multiple insert
  db.collection("courses").insertMany([course_1, course_2, course_3], function(
    err,
    res
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("Inserted documents right", res.ops);
    }
  });

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
  db.collection("courses").findOne({ title: "js" }, { _id: 0 }, (err, doc) => {
    if (err) {
      return console.log("ops.. no results");
    }
    console.log("Search result: ", doc);
  });

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

  // deleteOne
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

  console.log("Connection DB established");
  client.close();
});
