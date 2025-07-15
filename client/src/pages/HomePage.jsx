import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Gift, Sparkles, Heart, Star } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { useGift } from '../contexts/GiftContext';
import { giftService } from '../services/api';
import GiftCard from '../components/GiftCard';
import BalanceCard from '../components/BalanceCard';

const HomePage = () => {
  const { user, hapticFeedback, showAlert } = useTelegram();
  const { gifts, balance, loading, setGifts, setBalance, setLoading, setError } = useGift();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'Все', icon: Gift },
    { id: 'premium', name: 'Премиум', icon: Star },
    { id: 'limited', name: 'Лимитед', icon: Sparkles },
    { id: 'romantic', name: 'Романтика', icon: Heart },
  ];

  const rarities = [
    { id: 'all', name: 'Все' },
    { id: 'common', name: 'Обычные' },
    { id: 'rare', name: 'Редкие' },
    { id: 'epic', name: 'Эпические' },
    { id: 'legendary', name: 'Легендарные' },
    { id: 'mythic', name: 'Мифические' },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Популярные' },
    { id: 'price_low', name: 'Дешевые' },
    { id: 'price_high', name: 'Дорогие' },
    { id: 'newest', name: 'Новые' },
  ];

  useEffect(() => {
    loadGifts();
    loadBalance();
  }, []);

  const loadGifts = async () => {
    try {
      setLoading(true);
      const giftsData = await giftService.getAllGifts();
      setGifts(giftsData);
    } catch (error) {
      console.error('Error loading gifts:', error);
      setError('Не удалось загрузить подарки');
    }
  };

  const loadBalance = async () => {
    try {
      const balanceData = await giftService.getBalance();
      setBalance(balanceData.balance);
    } catch (error) {
      console.error('Error loading balance:', error);
      // Устанавливаем демо-баланс если API недоступен
      setBalance(1000);
    }
  };

  const handleGiftClick = (gift) => {
    hapticFeedback('light');
    // Переход к странице подарка
    console.log('Selected gift:', gift);
  };

  const handleTopUp = () => {
    hapticFeedback('medium');
    showAlert('Пополнение баланса будет доступно в следующей версии!');
  };

  const filteredGifts = gifts.filter(gift => {
    const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gift.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || gift.rarity === selectedRarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

  const sortedGifts = [...filteredGifts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
      default:
        return (b.totalPurchases || 0) - (a.totalPurchases || 0);
    }
  });

  // Демо-данные если API недоступен
  const demoGifts = [
    {
      id: 1,
      name: 'Золотая роза',
      description: 'Изысканная золотая роза для особенных моментов',
      price: 100,
      rarity: 'legendary',
      category: 'romantic',
      rating: 4.8,
      totalPurchases: 145,
      image: null
    },
    {
      id: 2,
      name: 'Звездная пыль',
      description: 'Магическая звездная пыль исполнения желаний',
      price: 50,
      rarity: 'epic',
      category: 'premium',
      rating: 4.5,
      totalPurchases: 89,
      image: null
    },
    {
      id: 3,
      name: 'Кристалл удачи',
      description: 'Приносит удачу и исполняет мечты',
      price: 200,
      rarity: 'mythic',
      category: 'limited',
      rating: 4.9,
      totalPurchases: 23,
      image: null
    },
    {
      id: 4,
      name: 'Сердце дракона',
      description: 'Редкий кристалл с силой дракона',
      price: 75,
      rarity: 'rare',
      category: 'premium',
      rating: 4.3,
      totalPurchases: 67,
      image: null
    },
  ];

  const displayGifts = sortedGifts.length > 0 ? sortedGifts : demoGifts;

  return (
    <div className="min-h-screen bg-telegram-bg">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-telegram-bg/95 backdrop-blur-sm border-b border-telegram-accent/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-telegram-text">
                Подарки
              </h1>
              <p className="text-telegram-hint text-sm">
                Привет, {user?.first_name || 'Пользователь'}! 👋
              </p>
            </div>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              🎁
            </motion.div>
          </div>

          <BalanceCard 
            balance={balance}
            onTopUp={handleTopUp}
            className="mb-4"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-telegram-hint w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск подарков..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-telegram-secondary rounded-xl text-telegram-text placeholder-telegram-hint border border-telegram-accent/20 focus:border-telegram-accent outline-none transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-telegram-accent text-white'
                    : 'bg-telegram-secondary text-telegram-text hover:bg-telegram-accent/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-3 py-2 bg-telegram-secondary rounded-lg text-telegram-text border border-telegram-accent/20 focus:border-telegram-accent outline-none"
          >
            {rarities.map(rarity => (
              <option key={rarity.id} value={rarity.id}>
                {rarity.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-telegram-secondary rounded-lg text-telegram-text border border-telegram-accent/20 focus:border-telegram-accent outline-none"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-telegram-secondary rounded-2xl p-4 animate-pulse">
                <div className="h-32 bg-telegram-accent/20 rounded-lg mb-4" />
                <div className="h-4 bg-telegram-accent/20 rounded mb-2" />
                <div className="h-3 bg-telegram-accent/20 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            {displayGifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GiftCard
                  gift={gift}
                  onClick={() => handleGiftClick(gift)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;