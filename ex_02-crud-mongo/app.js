const LinesCommand = require("command-line-args");
const { MongoClient } = require("mongodb");
const methods = require("./crud-methods");
const argsList = [
  //multiple: true accetta array di args in input nella shell
  { name: "insert", type: String, multiple: true },
  { name: "update", type: String, multiple: true },
  { name: "delete", type: String, multiple: true },
  { name: "find", type: String, multiple: true },
  { name: "exit", type: Boolean }
];

const options = LinesCommand(argsList);

const assert = require("assert");

const URL = "mongodb://localhost:27017/test";

MongoClient.connect(URL, (err, client) => {
  assert.equal(null, err);

  const db = client.db("test");
  console.log("Connection DB established");

  if (options.insert) {
    //insert
    methods.insertRecord(options.insert, client);
    return;
  } else if (options.find) {
    //find
    methods.findRecord(options.find, client);
    return;
  } else if (options.update) {
    // update
    methods.updateRecord(options.update, client);
  } else if (options.delete) {
    // delete
    methods.deleteRecord(options.delete, client);
    return;
  } else if (options.exit) {
    console.log("Terminate");
    client.close();
    return;
  }
});
