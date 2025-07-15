import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, TrendingUp } from 'lucide-react';

const BalanceCard = ({ balance, onTopUp, className = "" }) => {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`relative bg-gradient-to-br from-telegram-accent to-blue-600 rounded-2xl p-6 text-white overflow-hidden ${className}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Wallet className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold">Баланс</h3>
              <p className="text-white/70 text-sm">Ваши звездочки</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTopUp}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Balance display */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-8 h-8 bg-gradient-to-br from-gift-gold to-yellow-600 rounded-full flex items-center justify-center"
            >
              <span className="text-lg font-bold text-white">⭐</span>
            </motion.div>
            <motion.span
              key={balance}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold"
            >
              {formatBalance(balance)}
            </motion.span>
          </div>
          
          <div className="flex items-center gap-1 text-white/80">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Готов к покупкам</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onTopUp}
            className="flex-1 bg-white/20 hover:bg-white/30 rounded-xl py-3 px-4 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="font-medium">Пополнить</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-white/10 hover:bg-white/20 rounded-xl py-3 px-4 transition-colors border border-white/20"
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">История</span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;