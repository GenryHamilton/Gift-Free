import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
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
    
    setIsLoading(false);
  }, []);

  const showAlert = (message) => {
    WebApp.showAlert(message);
  };

  const showConfirm = (message) => {
    return new Promise((resolve) => {
      WebApp.showConfirm(message, resolve);
    });
  };

  const hapticFeedback = (type = 'medium') => {
    WebApp.HapticFeedback.impactOccurred(type);
  };

  const close = () => {
    WebApp.close();
  };

  const sendData = (data) => {
    WebApp.sendData(JSON.stringify(data));
  };

  const openLink = (url) => {
    WebApp.openLink(url);
  };

  const openTelegramLink = (url) => {
    WebApp.openTelegramLink(url);
  };

  const showMainButton = ({ text, color, textColor, onClick }) => {
    const mainButton = WebApp.MainButton;
    mainButton.text = text;
    mainButton.color = color || '#2481cc';
    mainButton.textColor = textColor || '#ffffff';
    mainButton.show();
    mainButton.onClick(onClick);
  };

  const hideMainButton = () => {
    WebApp.MainButton.hide();
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
    webApp: WebApp,
  };
};