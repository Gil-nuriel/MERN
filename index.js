const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const CRUD = require("./routes/CRUD");
const urls = require("./routes/URL");
const urlSite = require("./routes/urlSite");
const cors = require("cors");
const app = express();

//load env
dotenv.config({ path: "./config.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CRUD);
app.use(urls);
app.use("/api", urlSite);

//setup the defualt connection to mongoose
mongoose.connection;

// launch our backend into a port
const PORT = process.env.PORT || 2000;
app.listen(PORT, function() {
  console.log("listening on port " + PORT);
});
