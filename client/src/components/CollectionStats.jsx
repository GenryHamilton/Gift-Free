import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, TrendingUp, Users } from 'lucide-react';

const CollectionStats = ({ stats }) => {
  if (!stats) return null;

  const statItems = [
    {
      icon: Gift,
      label: 'Всего подарков',
      value: stats.totalItems,
      color: 'text-gift-gold'
    },
    {
      icon: TrendingUp,
      label: 'Диапазон цен',
      value: `${stats.priceRange.min_ton} - ${stats.priceRange.max_ton} SHAKE`,
      color: 'text-telegram-accent'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-telegram-secondary rounded-xl p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-5 h-5 text-gift-gold" />
        <h3 className="text-lg font-semibold text-telegram-text">
          Статистика коллекции
        </h3>
      </div>
      
      <p className="text-telegram-hint text-sm mb-4">
        {stats.description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-telegram-bg rounded-lg p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-xs text-telegram-hint">{item.label}</span>
            </div>
            <div className={`text-lg font-bold ${item.color}`}>
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CollectionStats; 