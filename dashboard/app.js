var express = require("express");
var app = express();
var server = app.listen(3000);
console.log("web service Started");
app.get("/", (q, res) => {
  return res.send("Server route /");
});
