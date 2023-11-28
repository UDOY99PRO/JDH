var express = require("express");
var app = express();
var path = require("path");
const { exec } = require('child_process');
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
app.post("/json/route/apis/true-caller", async(req, res) => {
  let number = req.body.number;
  let cc = req.body.country_code;

  if(!number){
    return res.json({success: false, msg: "number is required"});
  }
  if(!cc){
   return res.json({success: false, msg: "country_code is required"});  
  }
exec(`node tc.js ${cc} ${number}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    res.json({success: false, error: true})
    return;
  }

  try {
    var rawdata = (stdout);
if(rawdata == "error"){
  return res.json({success: false, msg: "either Number Is Invalid or country code is invalid or Too many requests"});
}
  var data = JSON.parse(rawdata);  
res.json({
  success: true,
  name: data.name,
  phone: {
  e164Format: data.phones[0].e164Format, numberType: data.phones[0].numberType, nationalFormat: data.phones[0].nationalFormat, countryCode: data.phones[0].countryCode, dialingCode: data.phones[0].dialingCode, carrier: data.phones[0].carrier
}, 
address: {
city: data.addresses[0].city,
timeZone: data.addresses[0].timeZone
}  
});
  } catch (parseError) {
//error
    return res.json({success: false, msg: "try again later"});

  }
return res.json({success: false, msg: "error in trueCaller.cpp file!"});
 
});
});









