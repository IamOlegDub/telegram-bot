import TelegramBot from 'node-telegram-bot-api';
import { getGPT3Translation } from './translationService.js';

const TELEGRAM_TOKEN = '6583380322:AAH3KVf1haM_SNtT9YL6Kmq5uHcU0MyogaQ';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    try {
        const translatedText = await getGPT3Translation(message);
        bot.sendMessage(chatId, translatedText);
    } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'Виникла помилка при обробці запиту.');
    }
});
