import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="text-telegram-hint">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-telegram-bg font-sf-pro">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '20px' }}>
          🎁 Telegram Gifts
        </h1>
        <p style={{ color: '#708499', fontSize: '16px', marginBottom: '30px' }}>
          Дари подарки в Telegram!
        </p>
        
        <div style={{ 
          background: '#242f3d', 
          borderRadius: '16px', 
          padding: '20px',
          border: '1px solid rgba(36, 129, 204, 0.2)',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '10px' }}>
            Добро пожаловать!
          </h2>
          <p style={{ color: '#708499', fontSize: '14px' }}>
            Приложение успешно запущено. Все зависимости загружены.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div style={{ 
            background: '#242f3d', 
            borderRadius: '12px', 
            padding: '16px',
            border: '1px solid rgba(36, 129, 204, 0.2)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎁</div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '4px' }}>Подарки</h3>
            <p style={{ color: '#708499', fontSize: '12px' }}>Выберите подарок</p>
          </div>

          <div style={{ 
            background: '#242f3d', 
            borderRadius: '12px', 
            padding: '16px',
            border: '1px solid rgba(36, 129, 204, 0.2)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '4px' }}>Баланс</h3>
            <p style={{ color: '#708499', fontSize: '12px' }}>1000 ⭐</p>
          </div>

          <div style={{ 
            background: '#242f3d', 
            borderRadius: '12px', 
            padding: '16px',
            border: '1px solid rgba(36, 129, 204, 0.2)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '4px' }}>Telegram</h3>
            <p style={{ color: '#708499', fontSize: '12px' }}>Интеграция</p>
          </div>

          <div style={{ 
            background: '#242f3d', 
            borderRadius: '12px', 
            padding: '16px',
            border: '1px solid rgba(36, 129, 204, 0.2)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚙️</div>
            <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '4px' }}>Настройки</h3>
            <p style={{ color: '#708499', fontSize: '12px' }}>Конфигурация</p>
          </div>
        </div>

        <div style={{ 
          marginTop: '30px',
          padding: '16px',
          background: 'linear-gradient(135deg, #2481cc, #1e73aa)',
          borderRadius: '12px',
          color: '#ffffff'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>🚀 Статус</h3>
          <p style={{ fontSize: '14px' }}>Приложение готово к работе!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
