import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Gift, Sparkles, Heart, Star, Coins, Crown, X, Plus, ArrowUpRight } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { useGift } from '../contexts/GiftContext';
import CaseCard from '../components/CaseCard';
import CaseModal from '../components/CaseModal';
import LoadingDebug from '../components/LoadingDebug';
import tonSymbol from '../assets/ton_symbol.svg';

const HomePage = () => {
  const { user, hapticFeedback, showAlert, isLoading: telegramLoading } = useTelegram();
  const { 
    cases, 
    balance, 
    loading: giftLoading, 
    openCase 
  } = useGift();
  
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  // Отладочная информация
  useEffect(() => {
    console.log('HomePage: Component mounted');
    console.log('Telegram loading:', telegramLoading);
    console.log('Gift loading:', giftLoading);
    console.log('User:', user);
    console.log('Cases:', cases);
    console.log('Balance:', balance);
  }, [telegramLoading, giftLoading, user, cases, balance]);

  const handleCaseClick = (caseData) => {
    hapticFeedback('medium');
    setSelectedCase(caseData);
    setShowCaseModal(true);
  };

  const handleOpenCase = (caseData) => {
    hapticFeedback('medium');
    openCase(caseData);
    showAlert(`Кейс "${caseData.name}" открыт! 🎉 Получен подарок!`);
    setShowCaseModal(false);
    setSelectedCase(null);
  };

  const handleBalanceClick = () => {
    hapticFeedback('medium');
    setShowBalanceModal(true);
  };

  const handleTopUp = () => {
    hapticFeedback('medium');
    showAlert('Пополнение баланса будет доступно в следующей версии!');
    setShowBalanceModal(false);
  };

  const handleWithdraw = () => {
    hapticFeedback('medium');
    showAlert('Вывод средств будет доступен в следующей версии!');
    setShowBalanceModal(false);
  };

  // Показываем загрузку только если загружаются данные подарков
  const isLoading = giftLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-telegram-text">
      {/* Debug Info */}
      <LoadingDebug 
        telegramLoading={telegramLoading}
        giftLoading={giftLoading}
        user={user}
        cases={cases}
        balance={balance}
      />

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* User Info - Left Side */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-telegram-accent to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.first_name?.[0] || 'U'}
                </span>
              </div>
            <div>
                <p className="text-white text-sm font-medium">
                  {user?.first_name || 'Пользователь'}
              </p>
                <p className="text-gray-400 text-xs">
                  Telegram
                </p>
              </div>
          </div>

            {/* Balance - Right Side */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={handleBalanceClick}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center">
                <img src={tonSymbol} alt="TON" className="w-5 h-5" />
              </div>
              <span className="text-white font-bold text-sm">
                {balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TON
              </span>
              </motion.button>
        </div>
        </div>
      </div>

      {/* Main Content with Top Padding */}
      <div className="pt-20">
        {/* Cases Grid */}
      <div className="px-4 pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-telegram-accent"></div>
            <p className="text-gray-400 mt-4">Загрузка кейсов...</p>
            <p className="text-gray-500 text-sm mt-2">Debug: Telegram loading: {telegramLoading ? 'true' : 'false'}</p>
            <p className="text-gray-500 text-sm">Debug: Gift loading: {giftLoading ? 'true' : 'false'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cases.map((caseData) => (
              <CaseCard
                key={caseData.id}
                caseData={caseData}
                onClick={() => handleCaseClick(caseData)}
              />
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Balance Modal */}
      <AnimatePresence>
        {showBalanceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowBalanceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-80 max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold">Баланс</h3>
                <button
                  onClick={() => setShowBalanceModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <img src={tonSymbol} alt="TON" className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Текущий баланс</p>
                      <p className="text-gray-400 text-sm">TON</p>
                    </div>
                  </div>
                  <span className="text-white font-bold text-lg">
                    {balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TON
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleTopUp}
                    className="flex-1 bg-telegram-accent text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Пополнить
                  </button>
                  <button
                    onClick={handleWithdraw}
                    className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    Вывести
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Modal */}
      <AnimatePresence>
        {showCaseModal && selectedCase && (
          <CaseModal
            caseData={selectedCase}
            onOpen={handleOpenCase}
            onClose={() => setShowCaseModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;