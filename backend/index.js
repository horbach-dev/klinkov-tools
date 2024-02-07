require('dotenv/config')

let server = require("http").createServer()
let app = require("./src/server")
const path = require('path')
const fs = require("fs");

const PORT = process.env.PORT || 801

server.on("request", app)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hello"));
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

