const express = require("express");
const Urls = require("../models/urls");
const router = express.Router();
const generateID = require("shortid");
const valid = require("valid-url");

router.post("/shorter", async function(req, res) {
  const myUrl = req.body.url;
  if (!valid.isUri(myUrl)) {
    return res.status(401).json("invalid url");
  }
  let exist = await Urls.findOne({ longUrl: myUrl });
  if (exist) {
    console.log("url allready exist...  here is the old code");
    return res.json(exist);
  }

  const urlCode = generateID.generate();
  const shortUrl = " http://localhost:2000" + "/api/" + urlCode;
  const url = new Urls({
    urlCode: urlCode,
    longUrl: myUrl,
    shortUrl: shortUrl
  });
  await url.save();
  console.log("url generated");
  res.json(url);
});

module.exports = router;
