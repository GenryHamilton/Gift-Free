import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GiftProvider } from './contexts/GiftContext';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <GiftProvider>
      <Router>
        <div className="App min-h-screen bg-gray-900 font-sf-pro">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </GiftProvider>
  );
}

export default App;
