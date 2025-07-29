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

export const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    try {
      // Try to import Telegram Web App SDK
      let WebApp;
      try {
        WebApp = require('@twa-dev/sdk').default;
      } catch (error) {
        console.log('Telegram Web App SDK not available, using mock');
        WebApp = createMockWebApp();
      }

    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user);
    }
    
    // Настройка темы
    WebApp.ready();
    WebApp.expand();
    
    // Установка темы
    const colorScheme = WebApp.colorScheme;
    setTheme(colorScheme);
    
    // Установка цветов в соответствии с темой Telegram
    WebApp.setHeaderColor('#17212b');
    WebApp.setBackgroundColor('#17212b');
      
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
  }, []);

  const showAlert = (message) => {
    try {
      const WebApp = require('@twa-dev/sdk').default;
    WebApp.showAlert(message);
    } catch (error) {
      console.log('Alert:', message);
      alert(message);
    }
  };

  const showConfirm = (message) => {
    return new Promise((resolve) => {
      try {
        const WebApp = require('@twa-dev/sdk').default;
      WebApp.showConfirm(message, resolve);
      } catch (error) {
        const result = window.confirm(message);
        resolve(result);
      }
    });
  };

  const hapticFeedback = (type = 'medium') => {
    try {
      const WebApp = require('@twa-dev/sdk').default;
    WebApp.HapticFeedback.impactOccurred(type);
    } catch (error) {
      // Haptic feedback not available in browser
    }
  };

  const close = () => {
    try {
      const WebApp = require('@twa-dev/sdk').default;
    WebApp.close();
    } catch (error) {
      console.log('Close app');
    }
  };

  const sendData = (data) => {
    try {
      const WebApp = require('@twa-dev/sdk').default;
    WebApp.sendData(JSON.stringify(data));
    } catch (error) {
      console.log('Send data:', data);
    }
  };

  const openLink = (url) => {
    try {
      const WebApp = require('@twa-dev/sdk').default;
    WebApp.openLink(url);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  const openTelegramLink = (url) => {
    try {
      const WebApp = require('@twa-dev/sdk').default;
    WebApp.openTelegramLink(url);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  const showMainButton = ({ text, color, textColor, onClick }) => {
    try {
      const WebApp = require('@twa-dev/sdk').default;
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
      const WebApp = require('@twa-dev/sdk').default;
    WebApp.MainButton.hide();
    } catch (error) {
      console.log('Hide main button');
    }
  };

  return {
    user,
    isLoading,
    theme,
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