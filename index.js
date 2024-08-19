require('dotenv/config')

let server = require("http").createServer()
let app = require("./src/server")
const path = require('path')
const express = require("express");
const {getChannelMessages} = require("./src/bootTGBot");
const initCron = require("./src/cron/python-cron");

const PORT = process.env.PORT || 3005
initCron()
server.on("request", app)

// app.use(express.static(path.join(__dirname, "./front/dist"), {
//   setHeaders: (res, path, stat) => {
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
//   }
// }))

const buildPath = path.join(__dirname, './front/dist');
app.use(express.static(buildPath));

app.use('/liquidation', express.static(path.join(__dirname, "./python/result"), {
  setHeaders: (res, path, stat) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}))

app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

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
