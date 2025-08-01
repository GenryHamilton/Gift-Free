import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Gift, Sparkles, Heart, Star, Coins, Crown, X, Plus, ArrowUpRight } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { useGift } from '../contexts/GiftContext';
import CaseCard from '../components/CaseCard';
import CaseModal from '../components/CaseModal';
import tonSymbol from '../assets/ton_symbol.svg';

const HomePage = () => {
  const { user, hapticFeedback, showAlert } = useTelegram();
  const { 
    cases, 
    balance, 
    loading, 
    openCase 
  } = useGift();
  
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-900 text-telegram-text">
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
        {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-gray-700" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
              {cases.map((caseData, index) => (
              <motion.div
                  key={caseData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                  <CaseCard
                    caseData={caseData}
                    onClick={() => handleCaseClick(caseData)}
                    isLocked={balance < caseData.price}
                  />
                </motion.div>
              ))}
            </motion.div>
        )}

          {/* Empty State */}
          {!loading && cases.length === 0 && (
            <div className="text-center py-12">
              <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Кейсы не найдены
              </h3>
              <p className="text-gray-400">
                Попробуйте обновить страницу
              </p>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBalanceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 w-full max-w-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Баланс</h2>
                <button
                  onClick={() => setShowBalanceModal(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Balance Display */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <img src={tonSymbol} alt="TON" className="w-12 h-12" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Ваш баланс</p>
                    <p className="text-2xl font-bold text-white">
                      {balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TON
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTopUp}
                  className="w-full py-3 px-4 bg-gradient-to-r from-telegram-accent to-blue-600 rounded-xl text-white font-medium hover:from-telegram-accent/90 hover:to-blue-600/90 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Пополнить баланс</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWithdraw}
                  className="w-full py-3 px-4 bg-gray-700 rounded-xl text-white font-medium hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  <span>Вывести средства</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Modal */}
      {showCaseModal && (
        <CaseModal
          isOpen={showCaseModal}
          onClose={() => {
            setShowCaseModal(false);
            setSelectedCase(null);
          }}
          caseData={selectedCase}
          onOpenCase={handleOpenCase}
          balance={balance}
        />
      )}
    </div>
  );
};

export default HomePage;