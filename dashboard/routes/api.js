const express = require('express');
const router = express.Router();

router.get("/", (q, res) => {
  res.send("Api route");
});

router.post("/gpt", (req, res) => {
var message = req.body.message;
  
});

module.exports = router;
