const express = require("express");
const app = express();
const operation = require("./compiler/operation");
const path = require("path");

// set node_env=development
// set node_env=production
// https://stackoverflow.com/questions/11928013/node-env-is-not-recognized-as-an-internal-or-external-command-operable-comman
const production = process.env.NODE_ENV === "production";

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

if (production) {
  app.use(express.static(path.resolve(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.post("/api/compile", function(req, res) {
  console.log(req.body);

  let data = req.body.input.replace(/(\r\n\t|\n|\r\t|\r\n)/gm, " ");
  data = operation.operate(data);
  console.log(data);

  res.json({ bcodes: data });
});

const port = process.env.PORT || 5008;

app.listen(port, function() {
  console.log(`The Server has started! (Port: ${port})`);
});
