const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.emailAPIaddress,
    pass: process.env.emailAPIpass
  }
});

router.get("/", (q, res) => {
  res.send("Api route");
});

router.post("/gpt", async(req, res) => {
var message = req.body.message;
  var resp = await ask_gpt(message);
  res.json({response: resp, name: "Chat GPT"});
});

router.get("/send/email", async(req, res) => {
var title = req.body.title;
var ishtml = req.body.ishtml;
var body = req.body.body;
var sendto = req.body.sendto;
var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
var EmailFormate = emailRegex.test(email);

if(!title){ var title = "_"; }else if(!body){ var body = "_"; }else if(!sendto){ return res.json({error: true, message: "No Email Specified to send"}); }else if(!emailRegex.test(sendto)){ return res.json({error: true, message: "Invalid Email Address"}); };
  var withtext = {
  from: process.env.emailAPIaddress,
  to: sendto,
  subject: title,
  html: body
};
var withhtml = {

  from: process.env.emailAPIaddress,
  to: sendto,
  subject: title,
  text: body
};

  transporter.sendMail((ishtml? withhtml : withtext), function(error, info){
  if (error) { return res.json({error: true, message: `Email address ${sendto} not found`}); } else { res.json({error: false, message: ` Successfully Email Sent to ${sendto}`}); };
    
});
});
module.exports = router;











