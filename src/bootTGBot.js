// const {Api, TelegramClient } = require("telegram");
// const { StringSession } = require("telegram/sessions");
// const input = require("input"); // npm i input
//
// const apiId = сюда api_id;
// const apiHash = "сюда хеш";
// const stringSession = new StringSession("сюда сеесию впихуете"); // fill this later with the value from session.save()
//
// (async () => {
//     const client = new TelegramClient(stringSession, apiId, apiHash, {
//         connectionRetries: 5,
//     });
//     await client.start({
//         phoneNumber: async () => await input.text("number ?"),
//         password: async () => await input.text("password?"),
//         phoneCode: async () => await input.text("Code ?"),
//         onError: (err) => console.log(err),
//     });
//     console.log("You should now be connected.");
//     console.log(client.session.save()); // вот сессия её и сохраните в переменную
//     await client.connect();
//     //сюда айди канала
//      const result =    await client.getMessages("apiTestChannelKlinkov",{
//           limit: 10,
//         })
//
//     console.log(result); // prints the result
// })();

const bootTGBot = () => {

}

module.exports = { bootTGBot }
