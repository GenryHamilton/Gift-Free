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
      <div className="min-h-screen bg-case-darker flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-case-primary/20 border-t-case-primary rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-case-secondary/20 border-b-case-secondary rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-case font-medium">Загрузка CASE Gifts...</p>
        </div>
      </div>
    );
  }

  return (
    <GiftProvider>
      <Router>
        <div className="App min-h-screen bg-case-darker font-inter">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </GiftProvider>
  );
}

export default App;
