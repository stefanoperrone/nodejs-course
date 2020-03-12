const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const router = require("./router").ownRouter;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(
      "[" + Date(Date.now()).toString() + "]",
      "Connection established"
    );
    app.listen(port, () => {
      console.log(
        "[" + Date(Date.now()).toString() + "]",
        `server active on port ${port}`
      );
    });
  })
  .catch(err => err);

var app = express();

//rest API requirements
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", router);

const port = 3000;
