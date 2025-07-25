import React from 'react';
import { motion } from 'framer-motion';

const TonPrice = ({ price, size = 'md', showRub = true, className = "" }) => {
  const TON_TO_RUB_RATE = 320; // примерный курс
  const rubPrice = Math.round(price * TON_TO_RUB_RATE);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <motion.div 
          className={`${iconSizes[size]} bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <svg viewBox="0 0 24 24" className="w-3/4 h-3/4 fill-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </motion.div>
        <span className={`${sizeClasses[size]} font-bold text-blue-500`}>
          {price} TON
        </span>
      </div>
      
      {showRub && (
        <span className={`${sizeClasses[size]} text-telegram-hint opacity-75`}>
          (≈{rubPrice}₽)
        </span>
      )}
    </div>
  );
};

export default TonPrice;