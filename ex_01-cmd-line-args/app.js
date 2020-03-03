// console.log(process.argv);

const LinesCommand = require("command-line-args");

const argsList = [
  { name: "nome", type: String },
  { name: "corso", type: String },
  { name: "pagamento", type: Number },
  { name: "fine", type: Boolean }
];

const options = LinesCommand(argsList);

//1. node app.js
//2. node app.js -nome
//3. node app.js -corso
//4. node app.js -pagamento
//5. node app.js -fine

if (options.nome) {
  console.log(
    `Ciao ${options.nome}, puoi comprare il corso di nodejs, react, redux`
  );
} else if (options.corso) {
  console.log(`Ciao ${options.nome}, l'importo è di 30€, tu pagherai con.. `);
} else if (options.pagamento) {
  console.log(
    `Grazie del pagamento, ecco il resto ${options.pagamento - 30}  `
  );
} else if (options.fine) {
  console.log("Grazie, a presto");
} else {
  console.log("Benvenuto, come ti chiami?");
}
