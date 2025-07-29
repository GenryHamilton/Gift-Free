import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Users, Star, Coins, Send, Heart } from 'lucide-react';
import tonSymbol from '../assets/ton_symbol.svg';

const GiftModal = ({ gift, isOpen, onClose, onPurchase, balance }) => {
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [message, setMessage] = useState('');

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

  const handlePurchase = () => {
    if (balance >= gift.price_ton) {
      onPurchase(gift);
      onClose();
    }
  };

  const handleSend = () => {
    if (selectedRecipient && balance >= gift.price_ton) {
      // Логика отправки подарка
      onClose();
    }
  };

  if (!gift) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-telegram-secondary rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-telegram-text">Подарок</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-telegram-accent/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-telegram-hint" />
              </button>
            </div>

            {/* Gift Info */}
            <div className="text-center mb-6">
              {/* Gift Avatar */}
              <div className="relative mb-4">
                {gift.image_url ? (
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-telegram-accent/30">
                    <img 
                      src={gift.image_url} 
                      alt={gift.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gift-gold/20 to-gift-gold/40 rounded-full flex items-center justify-center border-4 border-telegram-accent/30">
                <Gift className="w-12 h-12 text-gift-gold" />
                  </div>
                )}
                
                {/* Class Badge */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getClassColor(gift.class)} text-white flex items-center gap-1`}>
                  <span>{getClassIcon(gift.class)}</span>
                </div>
              </div>

              {/* Gift Details */}
              <h3 className="text-xl font-bold text-telegram-text mb-2">
                {gift.name}
              </h3>
              
              <p className="text-telegram-hint text-sm mb-4">
                {gift.base_name}
              </p>

              {/* Price with TON symbol */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <img src={tonSymbol} alt="TON" className="w-8 h-8" />
                </div>
                <span className="text-2xl font-bold text-gift-gold">
                  {gift.price_ton} SHAKE
                </span>
              </div>

              {/* Balance Check */}
              <div className={`text-sm mb-4 p-3 rounded-lg ${
                balance >= gift.price_ton 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {balance >= gift.price_ton 
                  ? '✅ Достаточно средств для покупки'
                  : '❌ Недостаточно средств'
                }
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {/* Buy for yourself */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                disabled={balance < gift.price_ton}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                  balance >= gift.price_ton
                    ? 'bg-gradient-to-r from-telegram-accent to-blue-600 text-white hover:from-telegram-accent/90 hover:to-blue-600/90'
                    : 'bg-telegram-bg text-telegram-hint cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5" />
                  <span>Купить для себя</span>
                </div>
              </motion.button>
              
              {/* Send to friend */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSend}
                disabled={balance < gift.price_ton}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all border-2 ${
                  balance >= gift.price_ton
                    ? 'border-telegram-accent text-telegram-accent hover:bg-telegram-accent/10'
                    : 'border-telegram-bg text-telegram-hint cursor-not-allowed'
                }`}
              >
                  <div className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  <span>Отправить другу</span>
                  </div>
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-telegram-accent/20">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-telegram-hint">Рейтинг</div>
                  <div className="text-telegram-text font-medium flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-gift-gold" />
                    4.8
                  </div>
                </div>
                <div>
                  <div className="text-telegram-hint">Продано</div>
                  <div className="text-telegram-text font-medium">145</div>
                </div>
                <div>
                  <div className="text-telegram-hint">Популярность</div>
                  <div className="text-telegram-text font-medium flex items-center justify-center gap-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Высокая
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftModal;