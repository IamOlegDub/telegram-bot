import TelegramBot from 'node-telegram-bot-api';
import { gameOptions, againOption } from './options.js';
// Підставте свої токени
const TELEGRAM_TOKEN = '6583380322:AAH3KVf1haM_SNtT9YL6Kmq5uHcU0MyogaQ';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(
        chatId,
        'Зараз я загадаю число від 0 до 9, а ти спробуєш відгадати його'
    );
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Відгадуй!', gameOptions);
};

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Привітання' },
        { command: '/info', description: "Показати ім'я" },
        { command: '/game', description: 'Гра - відгадай число' },
    ]);

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(
                chatId,
                'https://chpic.su/_data/archived/stickers/u/uk/UkrainianStickerPack.webp'
            );
            return bot.sendMessage(
                chatId,
                'Вітаю в телеграм боті. Надіюся, що незабаром я зможу тобі перекладти якісь тексти!)'
            );
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебе звати ${msg.from.first_name}`);
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебе не розумію, спробуй ще раз');
    });

    bot.on('callback_query', async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(
                chatId,
                `Вітаю, ти вгадав цифру ${chats[chatId]}`,
                againOption
            );
        } else {
            return bot.sendMessage(
                chatId,
                `На жаль, ти не відгадав. Бот загадав цифру ${chats[chatId]}`,
                againOption
            );
        }
    });
};

start();
