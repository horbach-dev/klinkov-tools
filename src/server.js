const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const marketcap = require("./routes/marketcap");
const youtube = require("./routes/youtube");
const telegram = require("./routes/telegram");
const {bootTGBot} = require("./bootTGBot");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// bootTGBot()

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(marketcap);
app.use(youtube);
app.use(telegram);

module.exports = app;
