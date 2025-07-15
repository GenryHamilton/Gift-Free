import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GiftProvider } from './contexts/GiftContext';
import { useTelegram } from './hooks/useTelegram';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const { isLoading } = useTelegram();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-telegram-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-telegram-accent mx-auto mb-4"></div>
          <p className="text-telegram-hint">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <GiftProvider>
      <Router>
        <div className="App min-h-screen bg-telegram-bg font-sf-pro">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </GiftProvider>
  );
}

export default App;
