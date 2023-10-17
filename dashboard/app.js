var express = require("express");
var app = express();
var path = require("path");
app.set('view engine', 'ejs');
app
   .use(express.json()) // For post methods
    .use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")))
// Specify the directory where your views are located
app.set('views', path.join(__dirname, 'views')); // Replace 'views' with your actual views directory
var apiRoute = require("./routes/api");
var server = app.listen(3000);
console.log("web service Started");
app.get("/", (q, res) => {
  return res.render("index");
});
app.use("/api", apiRoute);










