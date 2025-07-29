import React from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, History, Plus, Star } from 'lucide-react';
import tonSymbol from '../assets/ton_symbol.svg';

const BalanceHeader = ({ balance, onTopUp, onHistory }) => {
  const formatBalance = (balance) => {
    return balance.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const coinVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-telegram-accent/20 to-telegram-accent/10 rounded-2xl p-4 border border-telegram-accent/30 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            variants={coinVariants}
            animate="animate"
            className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
          >
            <Coins className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-sm font-medium text-telegram-text">Баланс</h3>
            <p className="text-xs text-telegram-hint">Ваши средства</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center">
              <img src={tonSymbol} alt="TON" className="w-7 h-7" />
            </div>
            <span className="text-lg font-bold text-telegram-text">
              {formatBalance(balance)} TON
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-400">
            <Star className="w-3 h-3" />
            <span>+2.5%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTopUp}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-telegram-accent to-blue-600 rounded-lg text-white text-sm font-medium hover:from-telegram-accent/90 hover:to-blue-600/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Пополнить</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHistory}
          className="flex items-center justify-center gap-2 py-2 px-3 bg-telegram-secondary rounded-lg text-telegram-text text-sm font-medium hover:bg-telegram-accent/20 transition-colors"
        >
          <History className="w-4 h-4" />
          <span>История</span>
        </motion.button>
      </div>

      {/* Quick stats */}
      <div className="mt-3 pt-3 border-t border-telegram-accent/20">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-telegram-hint">Куплено</div>
            <div className="text-telegram-text font-medium">12</div>
          </div>
          <div className="text-center">
            <div className="text-telegram-hint">Отправлено</div>
            <div className="text-telegram-text font-medium">8</div>
          </div>
          <div className="text-center">
            <div className="text-telegram-hint">Получено</div>
            <div className="text-telegram-text font-medium">5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceHeader; 