const mongoose = require("mongoose");

const itemsDB = mongoose.createConnection("mongodb://localhost:27017/items", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const items = itemsDB.model("items", ItemSchema);

module.exports = items;
