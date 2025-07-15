import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, Users, Sparkles } from 'lucide-react';

const GiftCard = ({ 
  gift, 
  onClick, 
  showPrice = true, 
  showRarity = true, 
  showStats = true,
  className = ""
}) => {
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-600';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 to-yellow-600';
      case 'mythic':
        return 'from-pink-400 to-pink-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityText = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'Обычный';
      case 'rare':
        return 'Редкий';
      case 'epic':
        return 'Эпический';
      case 'legendary':
        return 'Легендарный';
      case 'mythic':
        return 'Мифический';
      default:
        return 'Обычный';
    }
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
      className={`relative bg-gradient-to-br from-telegram-secondary to-telegram-bg rounded-2xl p-4 cursor-pointer overflow-hidden border border-telegram-accent/20 ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(gift.rarity)} opacity-20 rounded-2xl`}
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
          <Sparkles className="w-5 h-5 text-gift-gold" />
        </motion.div>
      </div>

      {/* Gift image/icon */}
      <div className="relative mb-4">
        {gift.image ? (
          <img 
            src={gift.image} 
            alt={gift.name}
            className="w-full h-32 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-gift-gold/20 to-gift-gold/40 rounded-lg flex items-center justify-center">
            <Gift className="w-16 h-16 text-gift-gold" />
          </div>
        )}
        
        {/* Rarity indicator */}
        {showRarity && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(gift.rarity)} text-white`}>
            {getRarityText(gift.rarity)}
          </div>
        )}
      </div>

      {/* Gift info */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-telegram-text mb-2 truncate">
          {gift.name}
        </h3>
        
        {gift.description && (
          <p className="text-sm text-telegram-hint mb-3 line-clamp-2">
            {gift.description}
          </p>
        )}

        {/* Stats */}
        {showStats && (
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gift-gold" />
              <span className="text-sm text-telegram-hint">
                {gift.rating || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-telegram-accent" />
              <span className="text-sm text-telegram-hint">
                {gift.totalPurchases || 0}
              </span>
            </div>
          </div>
        )}

        {/* Price */}
        {showPrice && gift.price && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-gift-gold to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">⭐</span>
              </div>
              <span className="text-lg font-bold text-telegram-text">
                {gift.price}
              </span>
            </div>
            
            {gift.discount && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                -{gift.discount}%
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GiftCard;