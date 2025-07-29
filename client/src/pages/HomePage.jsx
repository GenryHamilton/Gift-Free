import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Gift, Sparkles, Heart, Star, Coins, Crown, X, Plus, ArrowUpRight } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { useGift } from '../contexts/GiftContext';
import GiftCard from '../components/GiftCard';
import tonSymbol from '../assets/ton_symbol.svg';

const HomePage = () => {
  const { user, hapticFeedback, showAlert } = useTelegram();
  const { 
    gifts, 
    balance, 
    loading, 
    categories, 
    giftClasses, 
    collectionStats,
    filters,
    setFilters,
    getFilteredGifts,
    searchGifts,
    purchaseGift 
  } = useGift();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const sortOptions = [
    { id: 'name', name: 'По названию' },
    { id: 'price_low', name: 'Дешевые' },
    { id: 'price_high', name: 'Дорогие' },
    { id: 'class', name: 'По классу' },
  ];

  const handleGiftClick = (gift) => {
    hapticFeedback('light');
    showAlert(`Подарок "${gift.name}" стоит ${gift.price_ton} SHAKE`);
  };

  const handlePurchase = (gift) => {
    hapticFeedback('medium');
    if (balance >= gift.price_ton) {
      purchaseGift(gift);
      showAlert(`Подарок "${gift.name}" куплен за ${gift.price_ton} SHAKE! 🎉`);
    } else {
      showAlert('Недостаточно средств для покупки! 💸');
    }
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

  const handleCategoryChange = (category) => {
    setFilters({ category });
    hapticFeedback('light');
  };

  const handleClassChange = (giftClass) => {
    setFilters({ class: giftClass });
    hapticFeedback('light');
  };

  const handleSortChange = (sortBy) => {
    setFilters({ sortBy });
    hapticFeedback('light');
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    hapticFeedback('light');
  };

  // Получаем отфильтрованные подарки
  const filteredGifts = searchTerm 
    ? searchGifts(searchTerm)
    : getFilteredGifts();

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
        {/* Search and Filters */}
        <div className="px-4 py-4 bg-gray-900">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск подарков..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-xl text-white placeholder-gray-400 border border-gray-700 focus:border-telegram-accent focus:outline-none"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Фильтры</span>
            </button>

            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-telegram-accent focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-800 rounded-xl p-4 mb-4"
            >
              {/* Categories */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-white mb-2">Категории</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.category === category.id
                          ? 'bg-telegram-accent text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Classes */}
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Классы подарков</h3>
                <div className="flex flex-wrap gap-2">
                  {giftClasses.map(giftClass => (
                    <button
                      key={giftClass.id}
                      onClick={() => handleClassChange(giftClass.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                        filters.class === giftClass.id
                          ? 'bg-telegram-accent text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <span>{giftClass.icon}</span>
                      <span>{giftClass.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <span>Найдено: {filteredGifts.length} подарков</span>
            {collectionStats && (
              <span>Всего: {collectionStats.totalItems}</span>
            )}
          </div>
        </div>

        {/* Gifts Grid */}
        <div className="px-4 pb-20">
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl p-4 animate-pulse">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-3" />
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              {filteredGifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GiftCard
                    gift={gift}
                    onClick={() => handleGiftClick(gift)}
                    onPurchase={() => handlePurchase(gift)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredGifts.length === 0 && (
            <div className="text-center py-12">
              <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Подарки не найдены
              </h3>
              <p className="text-gray-400">
                Попробуйте изменить фильтры или поисковый запрос
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
              onClick={(e) => e.stopPropagation()}
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
    </div>
  );
};

export default HomePage;