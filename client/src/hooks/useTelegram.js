import { useState, useEffect } from 'react';

// Mock WebApp for development
const createMockWebApp = () => ({
  initDataUnsafe: {
    user: {
      id: 123456789,
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser'
    }
  },
  ready: () => {},
  expand: () => {},
  colorScheme: 'dark',
  setHeaderColor: () => {},
  setBackgroundColor: () => {},
  showAlert: (message) => console.log('Alert:', message),
  showConfirm: (message, callback) => {
    const result = window.confirm(message);
    callback(result);
  },
  HapticFeedback: {
    impactOccurred: () => {}
  },
  close: () => {},
  sendData: () => {},
  openLink: (url) => window.open(url, '_blank'),
  openTelegramLink: (url) => window.open(url, '_blank'),
  MainButton: {
    text: '',
    color: '#2481cc',
    textColor: '#ffffff',
    show: () => {},
    hide: () => {},
    onClick: () => {}
  }
});

// Получение WebApp объекта
const getWebApp = () => {
  console.log('Getting WebApp object...');
  
  // Сначала пробуем получить из window.Telegram.WebApp
  if (window.Telegram && window.Telegram.WebApp) {
    console.log('Found Telegram WebApp in window.Telegram.WebApp');
    return window.Telegram.WebApp;
  }
  
  // Затем пробуем импортировать SDK
  try {
    console.log('Trying to import @twa-dev/sdk...');
    return require('@twa-dev/sdk').default;
  } catch (error) {
    console.log('Telegram Web App SDK not available, using mock');
    return createMockWebApp();
  }
};

export const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    console.log('useTelegram: Initializing...');
    
    try {
      const WebApp = getWebApp();
      setWebApp(WebApp);
      console.log('WebApp object:', WebApp);

      // Получаем данные пользователя
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
        console.log('User data found:', WebApp.initDataUnsafe.user);
        setUser(WebApp.initDataUnsafe.user);
      } else {
        console.log('No user data found, using default');
        setUser({
          id: 123456789,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser'
        });
    }
    
    // Настройка темы
      console.log('Setting up WebApp...');
    WebApp.ready();
    WebApp.expand();
    
    // Установка темы
    const colorScheme = WebApp.colorScheme;
      console.log('Color scheme:', colorScheme);
    setTheme(colorScheme);
    
    // Установка цветов в соответствии с темой Telegram
    WebApp.setHeaderColor('#17212b');
    WebApp.setBackgroundColor('#17212b');
      
      console.log('Telegram Web App initialized successfully');
      
    } catch (error) {
      console.error('Error initializing Telegram Web App:', error);
      // Set default user for development
      setUser({
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser'
      });
    }
    
    setIsLoading(false);
    console.log('useTelegram: Initialization completed');
  }, []);

  const showAlert = (message) => {
    try {
      const WebApp = getWebApp();
    WebApp.showAlert(message);
    } catch (error) {
      console.log('Alert:', message);
      alert(message);
    }
  };

  const showConfirm = (message) => {
    return new Promise((resolve) => {
      try {
        const WebApp = getWebApp();
      WebApp.showConfirm(message, resolve);
      } catch (error) {
        const result = window.confirm(message);
        resolve(result);
      }
    });
  };

  const hapticFeedback = (type = 'medium') => {
    try {
      const WebApp = getWebApp();
    WebApp.HapticFeedback.impactOccurred(type);
    } catch (error) {
      // Haptic feedback not available in browser
    }
  };

  const close = () => {
    try {
      const WebApp = getWebApp();
    WebApp.close();
    } catch (error) {
      console.log('Close app');
    }
  };

  const sendData = (data) => {
    try {
      const WebApp = getWebApp();
    WebApp.sendData(JSON.stringify(data));
    } catch (error) {
      console.log('Send data:', data);
    }
  };

  const openLink = (url) => {
    try {
      const WebApp = getWebApp();
    WebApp.openLink(url);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  const openTelegramLink = (url) => {
    try {
      const WebApp = getWebApp();
    WebApp.openTelegramLink(url);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  const showMainButton = ({ text, color, textColor, onClick }) => {
    try {
      const WebApp = getWebApp();
    const mainButton = WebApp.MainButton;
    mainButton.text = text;
    mainButton.color = color || '#2481cc';
    mainButton.textColor = textColor || '#ffffff';
    mainButton.show();
    mainButton.onClick(onClick);
    } catch (error) {
      console.log('Show main button:', text);
    }
  };

  const hideMainButton = () => {
    try {
      const WebApp = getWebApp();
    WebApp.MainButton.hide();
    } catch (error) {
      console.log('Hide main button');
    }
  };

  return {
    user,
    isLoading,
    theme,
    webApp,
    showAlert,
    showConfirm,
    hapticFeedback,
    close,
    sendData,
    openLink,
    openTelegramLink,
    showMainButton,
    hideMainButton,
  };
};