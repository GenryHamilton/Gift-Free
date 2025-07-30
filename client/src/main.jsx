import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { debugDataLoading, debugTelegramWebApp, debugDependencies } from './utils/debug.js'

// Инициализация Telegram Web App
const initTelegramWebApp = () => {
  try {
    // Проверяем, что мы в Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const WebApp = window.Telegram.WebApp;
      
      // Инициализируем Web App
      WebApp.ready();
      WebApp.expand();
      
      // Устанавливаем цвета
      WebApp.setHeaderColor('#17212b');
      WebApp.setBackgroundColor('#17212b');
      
      console.log('Telegram Web App initialized successfully');
    } else {
      console.log('Not in Telegram Web App environment');
    }
  } catch (error) {
    console.error('Error initializing Telegram Web App:', error);
  }
};

// Запускаем отладку
console.log('=== APP INITIALIZATION ===');
debugDependencies();
debugDataLoading();
debugTelegramWebApp();

// Инициализируем Telegram Web App перед рендером
initTelegramWebApp();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
