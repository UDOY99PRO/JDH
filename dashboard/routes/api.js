const express = require('express');
const translate = require('translate-google');
const router = express.Router();
const nodemailer = require("nodemailer");
var fetch = require("@replit/node-fetch");
const { exec } = require('child_process');
const command = 'node tc';
var tempMailArrAdd = ["txcct.com", "laafd.com", "vjuum.com", "ezztt.com", "icznn.com" ];
 const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lengths = [4, 5, 6];

function genEmailName() {
  const randomLength = lengths[Math.floor(Math.random() * lengths.length)];
  let randomText = '';

  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomText += alphabet[randomIndex];
  }

  return randomText;
}
function getEmailInfo(email) {
  const infoRegex = /^([^@]+)@([^@]+)$/;
const match = email.match(infoRegex);
if (match && match.length === 3) {
    return {
      name: match[1],
      domain: match[2],
    };
  } else {
    return null; // No valid name and domain found
  }
}
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


//pjng ro

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
///send/email ping
router.get("/send/email/ping", (req, res) => {
 res.send("SUCCESS");
});
///chat-bot ping
router.get("/chat-bot/ping", (req, res) => {
 res.send("SUCCESS");
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

///qr-gen PING
router.get("/qr-gen/ping", (req, res) => {
 res.send("SUCCESS");
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
     res.json({ success:false, message: 'some error occurred, send me message about it!' });
  });
});

router.get("/nsfw-image-gen/ping", (req ,res) => {
 res.send("SUCCESS");
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

//ping
router.get("/sms-bomber/ping", (req, res) => {
res.send("success");
});
router.post("/sms-bomber", async(req, res) => {
  res.json({message: "NOT READY YET"});
});

//truecaller pkng
router.get("/true-caller/ping", (req, res) => {
 res.send("SUCCESS");
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
    return res.json({success: false, msg: "Looks Like your country_code or number is invalid or not availabl, if you think this is a bug please send me message"});
  }
});
});

//joke api PING
router.get("/joke/ping", (req, res) => {
 res.send("SUCCESS");
});
router.get("/joke", async(req, res) => {
fetch("https://some-random-api.com/others/joke").then(i => i.json()).then(data => {
  res.json({success: true, joke: data.joke});
}).catch(c => {
  res.json({success: false, joke: "could not fetched"});
});
});
//dictionary api
router.get("/dictionary/ping", (req, res) => {
 res.send("SUCCESS");
});
router.post("/dictionary", async(req, res) => {
  var word = req.body.word;
  fetch(`https://some-random-api.com/others/dictionary?word=${word}`).then(i => i.json()).then(dta => {
    res.json(dta);
  });
});

//translater PING
router.get("/translate/ping", (req, res) => {
res.send("SUCCESS");
});
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
router.get("/temp-mail/ping", (req, res) => {
res.send("SUCCESS");
});
router.get("/temp-mail", async(req, res) => {
 res.send(true); 
});
router.get("/temp-mail/generate-mail", async(req, res) => {
 let arraToSend = [];
 arraToSend.push(`${genEmailName()}@${tempMailArrAdd[Math.floor(Math.random() * tempMailArrAdd.length)]}`);
 arraToSend.push(`${genEmailName()}@${tempMailArrAdd[Math.floor(Math.random() * tempMailArrAdd.length)]}`);
res.json({success: true, mails: arraToSend});
});
router.get("/temp-mail/generate-custom-mail", async(req, res) => {
 if(!req.query || !req.query.custom_name || req.query.custom_name.trim() === ''){ return res.json({success: false, msg: "custom_name query is required   ?custom_name=name"})};
 var nameToGen = req.query.custom_name;
var emlRgx = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/; 
 if(!emlRgx.test(nameToGen)){  return res.json({success: false, msg: "* Only alphabets, numbers, and dots should be used in the name. => ex: my.name1 ✅ \n\n*There should not be a dot at the end of the name. =>  ex: (my.name.)[❌];  (my.name)[✅] \n\n"})}; 
 res.send({success: true, mail: `${nameToGen}@${tempMailArrAdd[Math.floor(Math.random() * tempMailArrAdd.length)]}`, msg: `Now You can use ${nameToGen}@${tempMailArrAdd[Math.floor(Math.random() * tempMailArrAdd.length)]} address as your temp email address`});
});
router.get("/temp-mail/read-messages", async(req, res) => {
 if(!req.query || !req.query.address || req.query.address.trim() === ''){ return res.json({success: false, msg: "address query is required   ?address=name@txcct.com"})};
var mailQ = req.query.address;
var fetDat = getEmailInfo(mailQ);
 if(!fetDat){ return res.json({ success: false, msg: "Looks Like the email address you entered is invalid please double check your address" })};
 if(!tempMailArrAdd.includes(fetDat.domain)){ return res.json({success: false, msg: `Looks Like you are trying to use other domain, avalable domain array: ${tempMailArrAdd}` })};
 fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${fetDat.name}&domain=${fetDat.domain}`).then(i => i.json()).then(dtaa => {
  if(dtaa){};
  let allMsgs = [];
  dtaa.forEach(dd => {
   allMsgs.push(dd);
  });
  res.json({success: true, messages: allMsgs});
 }).catch(c => {
  return res.json({success: false, msg: "please Double check your query and try again later!" });
 });
//https://www.1secmail.com/api/v1/?action=getMessages&login=hd&domain=txcct.com
});
/*
depricated
router.get("/temp-mail/read-mail", async(req, res) => {
 if(!req.query || !req.query.address || req.query.address.trim() === ''){ return res.json({success: false, msg: "address query is required   ?address=name@txcct.com&id=fetched mail id"})};
 if(!req.query || !req.query.id || req.query.id.trim() === ''){ return res.json({success: false, msg: "id query is required   ?address=name@txcct.com&id=fetched mail id"})};
 var mailQ = req.query.address;
 var mailId = req.query.id;
var fetDat = getEmailInfo(mailQ);
 if(!fetDat){ return res.json({ success: false, msg: "Looks Like the email address you entered is invalid please double check your address" })};
 if(!tempMailArrAdd.includes(fetDat.domain)){ return res.json({success: false, msg: `Looks Like you are trying to use other domain, avalable domain array: ${tempMailArrAdd}` })};
 if(isNaN(mailId)){ return res.json({ success: false, msg: "id should be number" })};
 fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${fetDat.name}&domain=${fetDat.domain}&id=${mailId}`).then(p => p.json()).then(doto => {
res.json({success: true, content: doto});
 }).catch(er => {
  res.json({success: false, msg: `no message found with this id and address (id: ${mailId} ; address: ${mailQ}), recheck your id and address`});
 });
});*/
module.exports = router;
