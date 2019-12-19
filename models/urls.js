const mongoose = require("mongoose");

const urlsDB = mongoose.createConnection("mongodb://localhost:27017/urls", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: { type: String, default: Date.now }
});

const urls = urlsDB.model("urls", urlSchema);

module.exports = urls;
