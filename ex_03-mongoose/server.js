const LinesCommand = require("command-line-args");
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

console.log("Connection DB established");

if (options.insert) {
  //insert
  methods.insertDocument(options.insert);
} else if (options.find) {
  //find
  methods.findDocument(options.find);
} else if (options.update) {
  // update
  methods.updateDocument(options.update);
} else if (options.delete) {
  // delete
  methods.deleteDocument(options.delete);
} else if (options.exit) {
  console.log("Terminate");
}
