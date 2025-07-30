import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    console.log('App: Component mounted');
    
    try {
      // Проверяем Telegram Web App
      if (window.Telegram && window.Telegram.WebApp) {
        const WebApp = window.Telegram.WebApp;
        setWebApp(WebApp);
        
        console.log('Telegram Web App found:', WebApp);
        
        // Получаем данные пользователя
        if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
          setUser(WebApp.initDataUnsafe.user);
          console.log('User data:', WebApp.initDataUnsafe.user);
        }
        
        // Инициализируем Web App
        WebApp.ready();
        WebApp.expand();
        WebApp.setHeaderColor('#17212b');
        WebApp.setBackgroundColor('#17212b');
        
        console.log('Telegram Web App initialized successfully');
      } else {
        console.log('Telegram Web App not found, running in browser');
        // Устанавливаем тестового пользователя для браузера
        setUser({
          id: 123456789,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser'
        });
      }
      
      // Имитируем загрузку данных
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
    } catch (err) {
      console.error('Error in App:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-white text-2xl mb-4">Ошибка загрузки</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Перезагрузить
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Загрузка приложения...</p>
          <p className="text-gray-400 text-sm mt-2">
            {webApp ? 'Telegram Web App найден' : 'Работаем в браузере'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="font-bold">
                {user?.first_name?.[0] || 'U'}
              </span>
            </div>
            <div>
              <p className="font-medium">
                {user?.first_name || 'Пользователь'}
              </p>
              <p className="text-gray-400 text-sm">Telegram</p>
            </div>
          </div>
          <div className="bg-gray-700 px-3 py-2 rounded-lg">
            <span className="font-bold">1000 TON</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Telegram Gifts</h1>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Test Case 1 */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="font-semibold mb-2">Обычный кейс</h3>
            <p className="text-gray-400 text-sm mb-3">Простые подарки</p>
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold">50 TON</span>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Открыть
              </button>
            </div>
          </div>

          {/* Test Case 2 */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-semibold mb-2">Редкий кейс</h3>
            <p className="text-gray-400 text-sm mb-3">Редкие подарки</p>
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold">150 TON</span>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Открыть
              </button>
            </div>
          </div>

          {/* Test Case 3 */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="font-semibold mb-2">Эпический кейс</h3>
            <p className="text-gray-400 text-sm mb-3">Эпические подарки</p>
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold">300 TON</span>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Открыть
              </button>
            </div>
          </div>

          {/* Test Case 4 */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-3xl mb-2">👑</div>
            <h3 className="font-semibold mb-2">Легендарный кейс</h3>
            <p className="text-gray-400 text-sm mb-3">Легендарные подарки</p>
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold">500 TON</span>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Открыть
              </button>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Отладочная информация:</h3>
          <div className="text-sm text-gray-400 space-y-1">
            <div>WebApp: {webApp ? 'Доступен' : 'Недоступен'}</div>
            <div>Пользователь: {user?.first_name || 'Неизвестен'}</div>
            <div>ID: {user?.id || 'Нет'}</div>
            <div>Username: {user?.username || 'Нет'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
