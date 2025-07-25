import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, Users, Sparkles, Hexagon } from 'lucide-react';

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
        return 'from-slate-400 to-slate-600';
      case 'rare':
        return 'from-case-secondary to-cyan-600';
      case 'epic':
        return 'from-case-primary to-purple-600';
      case 'legendary':
        return 'from-gift-gold to-amber-600';
      case 'mythic':
        return 'from-pink-400 to-rose-600';
      default:
        return 'from-slate-400 to-slate-600';
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
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -10, 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 25
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.2 },
    animate: { 
      opacity: [0.2, 0.6, 0.2],
      scale: [1, 1.02, 1],
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 360, 
      scale: 1.1,
      transition: { duration: 0.5 }
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
      className={`relative glass-card rounded-3xl p-5 cursor-pointer overflow-hidden group ${className}`}
    >
      {/* Animated glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(gift.rarity)} opacity-10 rounded-3xl`}
      />
      
      {/* Geometric pattern overlay */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <Hexagon className="w-full h-full text-case-primary" />
      </div>

      {/* Sparkles animation */}
      <div className="absolute top-3 right-3">
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-5 h-5 text-case-primary" />
        </motion.div>
      </div>

      {/* Gift image/icon */}
      <div className="relative mb-5">
        {gift.image ? (
          <img 
            src={gift.image} 
            alt={gift.name}
            className="w-full h-32 object-cover rounded-2xl"
          />
        ) : (
          <div className="w-full h-32 bg-case-gradient rounded-2xl flex items-center justify-center relative overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Gift className="w-16 h-16 text-white drop-shadow-lg" />
            </motion.div>
            
            {/* Subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
        )}
        
        {/* Rarity indicator */}
        {showRarity && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRarityColor(gift.rarity)} text-white shadow-lg backdrop-blur-sm`}
          >
            {getRarityText(gift.rarity)}
          </motion.div>
        )}
      </div>

      {/* Gift info */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-lg font-bold text-telegram-text group-hover:text-case truncate">
          {gift.name}
        </h3>
        
        {gift.description && (
          <p className="text-sm text-telegram-hint line-clamp-2 leading-relaxed">
            {gift.description}
          </p>
        )}

        {/* Stats */}
        {showStats && (
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 text-gift-gold" />
              <span className="text-sm font-medium text-telegram-hint">
                {gift.rating ? gift.rating.toFixed(1) : '0.0'}
              </span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-4 h-4 text-case-secondary" />
              <span className="text-sm font-medium text-telegram-hint">
                {gift.totalPurchases || 0}
              </span>
            </motion.div>
          </div>
        )}

        {/* Price */}
        {showPrice && gift.price && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-7 h-7 bg-case-gradient rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs font-bold text-white">⭐</span>
              </motion.div>
              <span className="text-xl font-bold text-case">
                {gift.price}
              </span>
            </div>
            
            {gift.discount && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                -{gift.discount}%
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Hover effect border */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-case-primary opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
};

export default GiftCard;