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

});
module.exports = router;
