const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const junk = require('junk');
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const api = express();

api.get("/gallery", function (req, res) {
  const illustrationsPath = "images/illustrations";
  var illustrations = [];
  var files = fs.readdirSync(path.join(__dirname, "public", illustrationsPath));
  files.filter(junk.not).forEach(function (file) {
    illustrations.push(`${illustrationsPath}/${file}`);
  });
  res.json({ files: illustrations });
});

app.use("/api", api);
app.set('json spaces', 2)
app.listen(process.env.PORT || 8081);
