var express = require("express");
var app = express();
app.set('view engine', 'ejs');

// Specify the directory where your views are located
app.set('views', path.join(__dirname, 'views')); // Replace 'views' with your actual views directory
var server = app.listen(3000);
console.log("web service Started");
app.get("/", (q, res) => {
  return res.send("Server route /");
});
