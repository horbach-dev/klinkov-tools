const {TelegramClient, sessions} = require("telegram");
const {InputMessagesFilterEmpty, InputMessagesFilterVideo} = require("telegram/tl/api");
const input = require("input");

const getEnv = (envName)=> {
  return process.env[envName]
}

const apiId = Number(getEnv('API_ID'));
const apiHash = getEnv('API_HASH');
const phoneNumber = getEnv('PHONE');
const stringSession = new sessions.StringSession(getEnv('STRING_SESSION'));

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

const clientConfigure = {
  phoneNumber,
  password: async () =>
    await input.text("Please enter your password: "),
  phoneCode: async () =>
    await input.text("Please enter the code you received: "),
  onError: (err) => console.log('err', err),
}


const bootTGBot = async () => {
  try {
    console.log("Loading interactive example...");

    await client.connect()
    // await client.start(clientConfigure)
    client.session.save()
    // console.log(client.session.save())
  } catch (e) {
    console.log('e.message', e.message)
  }
}

const getMessages = (limit = 3) => {
  return client.getMessages('@ProfessorKlinkov', {
    filter: InputMessagesFilterVideo,
    limit: 20
  })
    .then(q => q.filter(message => message.message).slice(0, limit))
    .then(q => q.map(message => ({
      message: message.message,
      id: message.id
    })))
}

module.exports = {
  bootTGBot,
  getMessages
}
