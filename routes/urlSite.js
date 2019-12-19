const express = require("express");
const Urls = require("../models/urls");
const router = express.Router();

router.get("/:code", async function(req, res) {
  const url = await Urls.findOne({ urlCode: req.params.code });
  if (!url) {
    res.status(404).json("url does not exist");
  }
  return res.redirect(url.longUrl);
});

module.exports = router;
