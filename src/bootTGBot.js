const {TelegramClient, sessions} = require("telegram");
const {InputMessagesFilterEmpty, InputMessagesFilterVideo} = require("telegram/tl/api");

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
const bootTGBot = async () => {
  // bot.launch()
  //   .then(() => {
  //     bot.telegram.sendContact()
  //   })
  try {
    console.log("Loading interactive example...");

    await client.connect()

    client.session.save()

    // client.addEventHandler(mainHandler, new NewMessage({}))
  } catch (e) {
    console.log('e.message', e.message)
  }
}

const getMessages = (limit = 3) => {
  return  client.getMessages('@ProfessorKlinkov', {
    filter: InputMessagesFilterVideo,
    limit: 20
  })
    .then(q => q.filter(message => message.message).slice(0, 3))
    .then(q => q.map(message => ({
      message: message.message,
      id: message.id
    })))
}

module.exports = {
  bootTGBot,
  getMessages
}
