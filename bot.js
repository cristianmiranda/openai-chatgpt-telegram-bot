const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});
const openai = new OpenAIApi(configuration);
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Q: ${msg.text}\nA:`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["\n"],
  });

  const result = response.data.choices[0].text;
  bot.sendMessage(chatId, result);
});
