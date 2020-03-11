// esempio utilizzo moduli standard
const os = require("os");
const fs = require("fs");

// esempio modulo
const infoStudent = require("./students.js");

console.log("student name: ", infoStudent.student.name);

// info sui moduli usati nel progetto
console.log(module);

let user = os.userInfo();
let platform = os.platform();

console.log(user);
console.log(user.username);
console.log(platform);

let date = new Date();
let alert = `user ${user.username} started app at date: ${date}\n`;

fs.appendFile("node-console.log", alert, function(error) {
  if (error) {
    console.log("Error occurred");
  }
});
