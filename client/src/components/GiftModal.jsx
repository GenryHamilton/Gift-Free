import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Star, Heart, Gift } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import TonPrice from './TonPrice';

const GiftModal = ({ isOpen, onClose, gift, onSend }) => {
  const { hapticFeedback, user, showAlert } = useTelegram();
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!recipient.trim()) {
      showAlert('Пожалуйста, введите получателя');
      return;
    }

    setIsLoading(true);
    hapticFeedback('medium');

    try {
      await onSend(gift.id, recipient, message);
      showAlert('Подарок успешно отправлен! 🎉');
      onClose();
    } catch (error) {
      showAlert('Ошибка при отправке подарка');
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { opacity: 0, scale: 0.8 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const giftVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { 
      rotate: [0, -10, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-telegram-secondary rounded-3xl p-6 w-full max-w-md border border-telegram-accent/20 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-telegram-text">
                Отправить подарок
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-telegram-accent/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-telegram-hint" />
              </motion.button>
            </div>

            {/* Gift Preview */}
            <div className="text-center mb-6">
              <motion.div
                variants={giftVariants}
                initial="initial"
                animate="animate"
                className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gift-gold/20 to-gift-gold/40 rounded-2xl flex items-center justify-center text-4xl"
              >
                {gift?.emoji || '🎁'}
              </motion.div>
              <h4 className="text-lg font-semibold text-telegram-text mb-2">
                {gift?.name}
              </h4>
              <div className="flex justify-center">
                <TonPrice price={gift?.price || 0} size="md" />
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Recipient */}
              <div>
                <label className="block text-sm font-medium text-telegram-text mb-2">
                  Получатель
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-telegram-hint w-5 h-5" />
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="@username или ID пользователя"
                    className="w-full pl-10 pr-4 py-3 bg-telegram-bg rounded-xl text-telegram-text placeholder-telegram-hint border border-telegram-accent/20 focus:border-telegram-accent outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-telegram-text mb-2">
                  Сообщение (необязательно)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Добавьте личное сообщение..."
                  rows={3}
                  className="w-full px-4 py-3 bg-telegram-bg rounded-xl text-telegram-text placeholder-telegram-hint border border-telegram-accent/20 focus:border-telegram-accent outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 bg-telegram-bg hover:bg-telegram-accent/20 rounded-xl py-3 px-4 text-telegram-text font-medium transition-colors"
              >
                Отмена
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSend}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-telegram-accent to-blue-600 hover:from-blue-600 hover:to-telegram-accent rounded-xl py-3 px-4 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Отправляем...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Отправить</span>
                  </div>
                )}
              </motion.button>
            </div>

            {/* Gift Animation */}
            <div className="absolute -top-4 -right-4 pointer-events-none">
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
                className="text-2xl"
              >
                🎁
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftModal;