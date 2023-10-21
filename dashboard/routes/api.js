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
  if(!message){ return res.json({error: true, response: `Missing Data In Request use {"message": "your message"} as data`, name: "Chat GPT"}); };
  var resp = await ask_gpt(message);
  res.json({response: resp, name: "Chat GPT"});
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
  var type = req.body.type.toLowerCase();
  var typeArray = ["pussy", "boobs", "ass", "gonewild", "thigh", "4k"];
  if(!type || !typeArray.includes(type)){
    var type = typeArray[Math.floor(Math.random() * typeArray.length)];
  }
fetch(`https://nekobot.xyz/api/image?type=${type}`, {
  method: 'GET',
  headers: {
    'Authorization': '015445535454455354D6',
    'Content-Type': 'application/json',
}).then(r => r.json()).then(res => {
  res.json({success: true, url: res.message, type: type});
}).catch(err => {
  res.json({success: false, url: "", type: type, error: "somthing went wrong..."});
});

});


module.exports = router;











