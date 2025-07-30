import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('=== APP STARTING ===');

// Простая инициализация
const initApp = () => {
  try {
    console.log('Initializing app...');
    
    // Проверяем базовые возможности
    console.log('React available:', typeof React !== 'undefined');
    console.log('DOM ready:', document.getElementById('root'));
    
    // Проверяем Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      console.log('Telegram Web App available');
    } else {
      console.log('Telegram Web App not available, running in browser');
    }
    
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

// Инициализируем приложение
initApp();

// Рендерим приложение
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('App rendered successfully');
} else {
  console.error('Root element not found');
}
