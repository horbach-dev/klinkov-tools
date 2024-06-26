require('dotenv/config')

let server = require("http").createServer()
let app = require("./src/server")
const path = require('path')
const express = require("express");
const {getChannelMessages} = require("./src/bootTGBot");

const PORT = process.env.PORT || 3005

server.on("request", app)

app.use(express.static(path.join(__dirname, "./front/dist"), {
  setHeaders: (res, path, stat) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}))

async function start() {
  try {
    server.listen(PORT, function () {
      console.log(`http server listening on ${PORT}`);
    });
  } catch (e) {
    console.log('Error start', e)
  }
}

start();
