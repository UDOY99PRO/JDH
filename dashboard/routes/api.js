const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
var truecaller = require("truecallerjs");
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
  if(!message){ return res.json({error: true, response: `Missing Data In Request use {"message": "your message"} as data`, name: "Chat GPT"}); };
 // var resp = await ask_gpt(message);
  res.json({response: "error:: trying to fix, api will up soon", name: "Chat GPT"});
});

router.post("/send/email", async(req, res) => {
var title = req.body.title;
var ishtml = req.body.ishtml;
var body = req.body.body;
var sendto = req.body.sendto;
var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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
if(ishtml == "true"){
  transporter.sendMail(withhtml, function(error, info){
  if (error) { return res.json({error: true, message: `Email address ${sendto} not found`}); } else { res.json({error: false, message: ` Successfully Email Sent to ${sendto}`}); };
  });
}else{
  transporter.sendMail(withtext, function(error, info){
  if (error) { return res.json({error: true, message: `Email address ${sendto} not found`}); } else { res.json({error: false, message: ` Successfully Email Sent to ${sendto}`}); };
})
}
});

router.post('/chat-bot', async (req, res) => {
  var msg = req.body.message;
  if(!msg){ var msg = "  "; };
  var name = req.body.bot_name;
  if(!name){ var name = "🤖 • Rapid Chatter"; };
  var gender = req.body.bot_gender;
  if(!gender){ var gender = "Male"; };
  var owner = req.body.owner_name;
  if(!owner){ var owner = "Duplicate"; };
  var weburl = req.body.web_url;
  if(!weburl){ var weburl = "https://rapidapi.com/sujoyk211/api/chat-bot-api"; };
  var company = req.body.company;
  if(!company){ var company = "Rapid API"; };
  try {
    const response = await fetch(`http://api.brainshop.ai/get?bid=165943&key=wVT6qqUA1nGrpuA5&uid=123&msg=${msg}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    var data = await response.json();
    if(!data){ return res.json({ success: false, res: "Hello, I'm not feeling well, and my usual mechanic isn't responding. It might be a good time for a little break to recharge. If you consider this as an error, please contact the developer" });
 }
    var resp = (data.cnt).replace(/<name>/g, name).replace(/<gender>/g, gender).replace(/<owner>/g, owner).replace(/<company>/g, company).replace(/<weburl>/g, weburl);
    res.json({success: true, res: resp});
  } catch (error) {
    res.json({ success: false, res: "Hello, I'm not feeling well, and my usual mechanic isn't responding. It might be a good time for a little break to recharge. If you consider this as an error, please contact the developer" });
  }
});

router.post("/qr-gen", async(req, res) => {
var data = req.body.data;
  if(!data){
var data = "Data is Required";
  }
 await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}`).then(res => res.blob()).then(resu => {
   
res.json({success: true, image: resu, format: "png" });
 }).catch(er => {
   res.json({ success:false, message: 'some error occurred' });
 })
});

router.post("/nsfw-image-gen", async(req, res) => {
  var type = req.body.type;
  if(type){
  var type = type.toLowerCase();
  }
  var typeArray = ["pussy", "boobs", "ass", "gonewild", "thigh", "4k"];
  if(!type || !typeArray.includes(type)){
    var type = typeArray[Math.floor(Math.random() * typeArray.length)];
  }
  var img = stockImages[type][Math.floor(Math.random() * stockImages[type].length)];
  res.json({success: true, url: img, type: type});
});

router.post("/sms-bomber", async(req, res) => {
  res.json({message: "NOT READY YET"});
});

router.post("/true-caller", async(req, res) => {
  let number;
   number = req.body.number;
  console.log(number)
  if(!number){
    return res.json({success: false, msg: "number is required"});
  }
  
  var numdata = await truecaller.search({
    number: number,
    installationId: "a1i09--igiKZRFEkqbtv3Vj_ZDC-wT-Hv9VuRn7Z3lhQ7vAcntUNnMsEu7-wQmyz",
  });
  var rawdata = JSON.parse(JSON.stringify(numdata));
console.log(rawdata)
  if(!rawdata.data.data){
    return res.json({success: false, msg: "Somthing Went wrong,.. :( , Looks Like number is not available,..  # valid format: +<cc><number>"});
  }
    var data = JSON.parse(JSON.stringify(numdata)).data.data[0];
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
  
});

module.exports = router;











