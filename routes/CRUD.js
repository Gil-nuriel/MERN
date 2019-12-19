const express = require("express");
const Items = require("../models/items");
const router = express.Router();
//get all items
router.get("/crud", async function(req, res) {
  const allitems = await Items.find();
  res.json(allitems);
});
//update item
router.post("/crud/:id/:update", async function(req, res) {
  await Items.findByIdAndUpdate(req.params.id, { name: req.params.update });
  const UpdateList = await Items.find();
  return res.json(UpdateList);
});
//delete item
router.delete("/crud/:delete", async function(req, res) {
  await Items.findByIdAndRemove(req.params.delete);
});
//create item
router.post("/crud/:put", async function(req, res) {
  const item = new Items({ name: req.params.put });
  await item.save();
  return res.send([item]);
});

module.exports = router;
