var express = require("express");
var app = express();
app.listen(3000);
app.get("/", (q, res) => {
  res.send("hii");
});
