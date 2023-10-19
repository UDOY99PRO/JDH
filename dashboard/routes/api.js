const express = require('express');
const router = express.Router();

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
if(!title){ var title = "_"; }else if(!body){ var body = "_"; }else if(!sendto){ return res.json({error: true, message: "No Email Specified to send"}); }else if(){};

});
module.exports = router;
