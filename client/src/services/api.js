import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления авторизации
api.interceptors.request.use(
  (config) => {
    // Добавляем данные Telegram Web App в заголовки
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      config.headers['X-Telegram-Init-Data'] = webApp.initData;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export const giftService = {
  // Получить все доступные подарки
  getAllGifts: async () => {
    const response = await api.get('/gifts');
    return response.data;
  },

  // Получить подарок по ID
  getGiftById: async (id) => {
    const response = await api.get(`/gifts/${id}`);
    return response.data;
  },

  // Создать новый подарок
  createGift: async (giftData) => {
    const response = await api.post('/gifts', giftData);
    return response.data;
  },

  // Купить подарок
  purchaseGift: async (giftId) => {
    const response = await api.post(`/gifts/${giftId}/purchase`);
    return response.data;
  },

  // Отправить подарок
  sendGift: async (giftId, recipientId) => {
    const response = await api.post(`/gifts/${giftId}/send`, {
      recipientId,
    });
    return response.data;
  },

  // Получить мои подарки
  getMyGifts: async () => {
    const response = await api.get('/gifts/my');
    return response.data;
  },

  // Получить полученные подарки
  getReceivedGifts: async () => {
    const response = await api.get('/gifts/received');
    return response.data;
  },

  // Получить историю транзакций
  getTransactions: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },

  // Получить баланс пользователя
  getBalance: async () => {
    const response = await api.get('/balance');
    return response.data;
  },

  // Пополнить баланс
  topUpBalance: async (amount) => {
    const response = await api.post('/balance/topup', { amount });
    return response.data;
  },

  // Получить статистику подарков
  getGiftStats: async () => {
    const response = await api.get('/gifts/stats');
    return response.data;
  },

  // Получить рейтинг пользователей
  getLeaderboard: async () => {
    const response = await api.get('/leaderboard');
    return response.data;
  },
};

export const userService = {
  // Получить профиль пользователя
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Обновить профиль пользователя
  updateProfile: async (profileData) => {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  },

  // Получить друзей пользователя
  getFriends: async () => {
    const response = await api.get('/user/friends');
    return response.data;
  },

  // Найти пользователя по username
  findUser: async (username) => {
    const response = await api.get(`/user/search?username=${username}`);
    return response.data;
  },
};

export default api;