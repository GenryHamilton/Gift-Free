import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, TrendingUp, Hexagon } from 'lucide-react';

const BalanceCard = ({ balance, onTopUp, className = "" }) => {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { 
      rotate: [0, -5, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const balanceVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.02, 1],
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
      className={`relative glass-card rounded-3xl p-6 overflow-hidden group ${className}`}
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8">
          <Hexagon className="w-full h-full text-case-primary" />
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 translate-y-6 -translate-x-6">
          <Hexagon className="w-full h-full text-case-secondary" />
        </div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-case-gradient opacity-10 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="w-12 h-12 bg-case-gradient rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Wallet className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-case">Баланс</h3>
              <p className="text-telegram-hint text-sm">Ваши звездочки</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onTopUp}
            className="w-10 h-10 bg-case-gradient hover:opacity-90 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Balance display */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-10 h-10 bg-case-gradient rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span className="text-lg font-bold text-white">⭐</span>
            </motion.div>
            <motion.span
              key={balance}
              variants={balanceVariants}
              initial="initial"
              animate="animate"
              className="text-4xl font-bold text-case"
            >
              {formatBalance(balance)}
            </motion.span>
          </div>
          
          <div className="flex items-center gap-2 text-telegram-hint">
            <TrendingUp className="w-4 h-4 text-case-secondary" />
            <span className="text-sm font-medium">Готов к покупкам</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onTopUp}
            className="flex-1 bg-case-gradient hover:opacity-90 rounded-2xl py-4 px-4 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="w-4 h-4 text-white" />
              <span className="font-semibold text-white">Пополнить</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 glass-card hover:bg-telegram-secondary/60 rounded-2xl py-4 px-4 transition-all duration-300 border border-case-primary/20"
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-case-secondary" />
              <span className="font-semibold text-telegram-text">История</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-case-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500"
        initial={false}
      />
    </motion.div>
  );
};

export default BalanceCard;