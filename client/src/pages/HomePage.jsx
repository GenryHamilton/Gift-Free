import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Gift, Sparkles, Heart, Star, Hexagon } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { useGift } from '../contexts/GiftContext';
import { giftService } from '../services/api';
import GiftCard from '../components/GiftCard';
import BalanceCard from '../components/BalanceCard';
import GeometricIcon from '../components/GeometricIcon';

const HomePage = () => {
  const { user, hapticFeedback, showAlert } = useTelegram();
  const { gifts, balance, loading, setGifts, setBalance, setLoading, setError } = useGift();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'Все', icon: Hexagon },
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
    {
      id: 5,
      name: 'Лунный камень',
      description: 'Мистический камень с энергией луны',
      price: 125,
      rarity: 'epic',
      category: 'premium',
      rating: 4.6,
      totalPurchases: 54,
      image: null
    },
    {
      id: 6,
      name: 'Феникс',
      description: 'Легендарная птица возрождения',
      price: 300,
      rarity: 'mythic',
      category: 'limited',
      rating: 4.9,
      totalPurchases: 12,
      image: null
    },
  ];

  const displayGifts = sortedGifts.length > 0 ? sortedGifts : demoGifts;

  return (
    <div className="min-h-screen bg-case-darker relative overflow-hidden">
      {/* Geometric background */}
      <div className="geometric-bg fixed inset-0 pointer-events-none" />
      
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-0 border-b border-case-primary/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-case mb-1">
                CASE Gifts
              </h1>
              <p className="text-telegram-hint text-sm">
                Привет, {user?.first_name || 'Пользователь'}! ✨
              </p>
            </div>
            <div className="relative">
              <GeometricIcon size="lg" variant="hexagon" animate={true} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-case-secondary rounded-full animate-pulse" />
            </div>
          </div>

          <BalanceCard 
            balance={balance}
            onTopUp={handleTopUp}
            className="mb-6"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 py-6 space-y-6">
        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-telegram-hint w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск подарков..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass-card rounded-2xl text-telegram-text placeholder-telegram-hint focus:border-case-primary outline-none transition-all duration-300"
          />
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-case-gradient text-white shadow-lg'
                    : 'glass-card text-telegram-text hover:bg-case-primary/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3"
        >
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-4 py-3 glass-card rounded-2xl text-telegram-text focus:border-case-primary outline-none flex-1 transition-all duration-300"
          >
            {rarities.map(rarity => (
              <option key={rarity.id} value={rarity.id} className="bg-case-dark">
                {rarity.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 glass-card rounded-2xl text-telegram-text focus:border-case-primary outline-none flex-1 transition-all duration-300"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id} className="bg-case-dark">
                {option.name}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* Gifts Grid */}
      <div className="px-6 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-3xl p-4 animate-pulse"
              >
                <div className="h-32 bg-case-primary/20 rounded-2xl mb-4" />
                <div className="h-4 bg-case-primary/20 rounded-lg mb-2" />
                <div className="h-3 bg-case-primary/20 rounded-lg w-3/4" />
              </motion.div>
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
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -5 }}
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