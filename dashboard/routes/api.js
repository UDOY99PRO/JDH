const express = require('express');
const translate = require('translate-google');
const router = express.Router();
const nodemailer = require("nodemailer");
var fetch = require("@replit/node-fetch");
const { exec } = require('child_process');
const command = 'node tc';
async function getToken() {
  try {
    const response = await fetch("https://udoy99pro.github.io/JDH/");
    const data = await response.json();
    const token = data.tkn;
return token;
  } catch (error) {
return "error";
  }
}

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
  fetch("https://qrcode.tec-it.com/API/QRCode", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Referer": "https://qrcode.tec-it.com",
  },
  body: JSON.stringify({
    data: {
      data: data,
      datatype: "Raw"
    },
    settings: {
      errorcorrection: "L",
      codepage: "utf8",
      quietzone: 0,
      quietunit: "Mm",
      dpi: 300,
      size: "Medium",
      color: "#000000",
      istransparent: "false",
      backcolor: "#ffffff"
    },
    output: {
      method: "Base64"
    }
  })
})
  .then(response => response.text())
  .then(data => {
    res.json({success: true, image_url: `data:image/png;base64,${data}`, html: `<img src="data:image/png;base64,${data}"/>`, format: "png" });
  })
  .catch(error => {
    console.log(error)
     res.json({ success:false, message: 'some error occurred' });
  });
});

router.post("/nsfw-image-gen", async(req, res) => {
  var type = req.body.type;
  if(type){
  var type = type.toLowerCase();
  }
  var typeArray = ["pussy", "boobs", "ass", "gonewild", "thigh", "4k"];
  if(!type){
    var type = typeArray[Math.floor(Math.random() * typeArray.length)];
  }
  if(!typeArray.includes(type)){
      var type = typeArray[Math.floor(Math.random() * typeArray.length)];
  }
  var img = stockImages[type][Math.floor(Math.random() * stockImages[type].length)];
  res.json({success: true, url: img, type: type});
});

router.post("/sms-bomber", async(req, res) => {
  res.json({message: "NOT READY YET"});
});

router.post("/true-caller", async(req, res) => {
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
 
});
});

//joke api
router.get("/joke", async(req, res) => {
fetch("https://some-random-api.com/others/joke").then(i => i.json()).then(data => {
  res.json({success: true, joke: data.joke});
}).catch(c => {
  res.json({success: false, joke: "could not fetched"});
});
});
//dictionary api
router.post("/dictionary", async(req, res) => {
  var word = req.body.word;
  fetch(`https://some-random-api.com/others/dictionary?word=${word}`).then(i => i.json()).then(dta => {
    res.json(dta);
  });
});
//translater
router.post("/translate", async(req, res) => {
  var word = req.body.word;
  var to = req.body.to;
  if(!word){
   res.json({success: false, message: "provide a text to translate"});
    return;
  }
  if(!to){
       res.json({success: false, message: "provide a language to translate like: en, bn, ch, hi, is"});
    return;
  }
translate(word, {to: to}).then(resdata => {
    res.json({success: true, message: resdata});
}).catch(err => {
  console.log(err);
res.json({success: true, message: "looks like you give an invalid language to translate with"})
})
});

  //temp mail service 
router.post("/temp-mail", async(req, res) => {
  
});
router.get("/temp-mail/generate-mail", async(req, res) => {
  
});
router.get("temp-mail/generate-custom-mail", async(req, res) => {
  
});
module.exports = router;
