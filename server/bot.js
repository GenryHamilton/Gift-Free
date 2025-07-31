// Импортируем библиотеку
const TelegramBot = require('node-telegram-bot-api');

// Вставь сюда свой токен Telegram-бота
const token = '7900485160:AAHcWJuoUObdx7prFwNFfEt1IMzApvwEkSk';

// Создаем экземпляр бота (polling) без прокси
const bot = new TelegramBot(token, { 
  polling: true
});

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Создаем inline клавиатуру с кнопкой для веб-приложения
  const keyboard = {
    inline_keyboard: [
      [{
        text: '🎁 Открыть приложение',
        web_app: {
          url: 'https://gift-free.netlify.app'
        }
      }]
    ]
  };
  
  bot.sendMessage(chatId, 
    'Привет! 👋\n\nДобро пожаловать в Gift-Free! 🎁\n\nНажмите кнопку ниже, чтобы открыть наше веб-приложение:', 
    {
      reply_markup: keyboard
    }
  );
});

// Обработка текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  // Если пользователь написал "/start" как текст
  if (text && text.toLowerCase().includes('/start')) {
    // Создаем inline клавиатуру с кнопкой для веб-приложения
    const keyboard = {
      inline_keyboard: [
        [{
          text: '🎁 Открыть приложение',
          web_app: {
            url: 'https://gift-free.netlify.app'
          }
        }]
      ]
    };
    
    bot.sendMessage(chatId, 
      'Привет! 👋\n\nДобро пожаловать в Gift-Free! 🎁\n\nНажмите кнопку ниже, чтобы открыть наше веб-приложение:', 
      {
        reply_markup: keyboard
      }
    );
  }
});

// Можно добавить другие обработчики команд ниже 