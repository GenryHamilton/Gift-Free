import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, Users, Sparkles } from 'lucide-react';
import tonSymbol from '../assets/ton_symbol.svg';

const GiftCard = ({ 
  gift, 
  onClick, 
  showPrice = true, 
  showClass = true, 
  showStats = false,
  className = ""
}) => {
  const getClassColor = (giftClass) => {
    switch (giftClass) {
      case 'food':
        return 'from-orange-400 to-orange-600';
      case 'accessory':
        return 'from-blue-400 to-blue-600';
      case 'mystic':
        return 'from-purple-400 to-purple-600';
      case 'utility':
        return 'from-gray-400 to-gray-600';
      case 'drink':
        return 'from-red-400 to-red-600';
      case 'celebration':
        return 'from-yellow-400 to-yellow-600';
      case 'tech':
        return 'from-cyan-400 to-cyan-600';
      case 'romantic':
        return 'from-pink-400 to-pink-600';
      case 'jewelry':
        return 'from-yellow-400 to-yellow-600';
      case 'cosmic':
        return 'from-indigo-400 to-indigo-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getClassDisplayName = (giftClass) => {
    const classNames = {
      'food': 'Еда',
      'accessory': 'Аксессуары',
      'mystic': 'Мистические',
      'utility': 'Утилитарные',
      'drink': 'Напитки',
      'celebration': 'Праздничные',
      'tech': 'Технологические',
      'romantic': 'Романтические',
      'jewelry': 'Украшения',
      'cosmic': 'Космические'
    };
    return classNames[giftClass] || giftClass;
  };

  const getClassIcon = (giftClass) => {
    const classIcons = {
      'food': '🍰',
      'accessory': '🎩',
      'mystic': '🔮',
      'utility': '📅',
      'drink': '🍷',
      'celebration': '🎉',
      'tech': '📱',
      'romantic': '💕',
      'jewelry': '💍',
      'cosmic': '⭐'
    };
    return classIcons[giftClass] || '🎁';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      y: -8, 
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 25
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: [0.3, 0.8, 0.3],
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
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative bg-gray-800 rounded-2xl p-3 cursor-pointer overflow-hidden border border-gray-700 ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className={`absolute inset-0 bg-gradient-to-br ${getClassColor(gift.class)} opacity-20 rounded-2xl`}
      />
      
      {/* Sparkles animation */}
      <div className="absolute top-2 right-2">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4 text-gift-gold" />
        </motion.div>
      </div>

      {/* Gift image/avatar */}
      <div className="relative mb-3">
        {gift.image_url ? (
          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-gray-600">
          <img 
              src={gift.image_url} 
            alt={gift.name}
              className="w-full h-full object-cover"
          />
          </div>
        ) : (
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gift-gold/20 to-gift-gold/40 rounded-full flex items-center justify-center border-2 border-gray-600">
            <Gift className="w-8 h-8 text-gift-gold" />
          </div>
        )}
        
        {/* Class indicator */}
        {showClass && (
          <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getClassColor(gift.class)} text-white flex items-center gap-1`}>
            <span className="text-xs">{getClassIcon(gift.class)}</span>
          </div>
        )}
      </div>

      {/* Gift info */}
      <div className="relative z-10 text-center">
        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
          {gift.name}
        </h3>
        
        {/* Price with TON symbol */}
        {showPrice && (
          <div className="flex items-center justify-center gap-1 mb-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center">
              <img src={tonSymbol} alt="TON" className="w-5 h-5" />
            </div>
            <span className="text-gift-gold text-sm font-bold">
              {gift.price_ton} SHAKE
            </span>
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              <span>4.8</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>145</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GiftCard;