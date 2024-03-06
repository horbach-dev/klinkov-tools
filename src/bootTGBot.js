const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Привет! Я готов получить 5 последних сообщений из канала.'));

bot.on('text', (ctx) => {
  console.log(`Новое сообщение в канале от ${ctx.message.from.username}: ${ctx.message.text}`);
});

const getChannelMessages = async () => {
  try {
    const chatId = '@test123321qqq'; // Замените на имя вашего канала

    // Получение последних 5 сообщений из канала
    const messages = await bot.telegram(chatId, {
      limit: 5,
    });

    console.log(messages)

    // Отправка сообщений пользователю
    // messages.forEach((message) => {
    //   ctx.reply(`Сообщение от ${message.from.username}: ${message.text}`);
    // });
  } catch (error) {
    console.error(error);
  }
}

const bootTGBot = () => {
  bot.launch();
}

module.exports = {
  bootTGBot,
  getChannelMessages
}
