const express = require('express');
const router = express.Router();

router.get("/", (q, res) => {
  res.send("Api route");
});
