import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import useTonConnect from '../hooks/useTonConnect';
import TonPrice from './TonPrice';

const PurchaseModal = ({ isOpen, onClose, gift, onPurchase }) => {
  const { hapticFeedback, showAlert } = useTelegram();
  const { 
    tonWallet, 
    balance: tonBalance, 
    sendTransaction, 
    isConnected 
  } = useTonConnect();
  
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState('confirm'); // confirm, processing, success, error

  const handlePurchase = async () => {
    if (!isConnected) {
      showAlert('Сначала подключите TON кошелек');
      return;
    }

    if (tonBalance < gift.price) {
      showAlert('Недостаточно средств на балансе');
      return;
    }

    setIsPurchasing(true);
    setPurchaseStep('processing');
    hapticFeedback('medium');

    try {
      // Отправляем транзакцию через TON Connect
      const transaction = await sendTransaction(
        gift.price,
        'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c', // Адрес получателя (магазин)
        `Покупка подарка: ${gift.name}`
      );

      setPurchaseStep('success');
      
      // Вызываем callback для обновления состояния приложения
      if (onPurchase) {
        onPurchase(gift, transaction);
      }

      // Автоматически закрываем модал через 2 секунды
      setTimeout(() => {
        onClose();
        setPurchaseStep('confirm');
      }, 2000);

      showAlert('Подарок успешно куплен! 🎉');
    } catch (error) {
      console.error('Purchase failed:', error);
      setPurchaseStep('error');
      showAlert('Ошибка при покупке подарка');
    } finally {
      setIsPurchasing(false);
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

  const renderContent = () => {
    switch (purchaseStep) {
      case 'processing':
        return (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-case-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-telegram-text mb-2">
              Обработка платежа...
            </h3>
            <p className="text-telegram-hint">
              Подтвердите транзакцию в кошельке
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-green-600 mb-2">
              Покупка успешна!
            </h3>
            <p className="text-telegram-hint">
              Подарок добавлен в вашу коллекцию
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AlertTriangle className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Ошибка покупки
            </h3>
            <p className="text-telegram-hint mb-4">
              Попробуйте еще раз
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPurchaseStep('confirm')}
              className="bg-case-gradient hover:opacity-90 rounded-xl py-2 px-4 text-white font-medium transition-all"
            >
              Повторить
            </motion.button>
          </div>
        );

      default: // confirm
        return (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-telegram-text">
                Купить подарок
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
              <p className="text-telegram-hint text-sm mb-4">
                {gift?.description}
              </p>
              <div className="flex justify-center">
                <TonPrice price={gift?.price || 0} size="lg" />
              </div>
            </div>

            {/* Balance Check */}
            <div className="mb-6 p-4 glass-card rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-telegram-text font-medium">Ваш баланс:</span>
                <TonPrice price={tonBalance} size="md" showRub={false} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-telegram-text font-medium">К оплате:</span>
                <TonPrice price={gift?.price || 0} size="md" showRub={false} />
              </div>
              <hr className="my-2 border-telegram-accent/20" />
              <div className="flex items-center justify-between">
                <span className="text-telegram-text font-bold">Остаток:</span>
                <TonPrice 
                  price={Math.max(0, tonBalance - (gift?.price || 0))} 
                  size="md" 
                  showRub={false}
                  className={tonBalance < (gift?.price || 0) ? 'text-red-500' : 'text-green-500'}
                />
              </div>
            </div>

            {/* Warning if insufficient funds */}
            {tonBalance < (gift?.price || 0) && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 font-medium">Недостаточно средств</span>
                </div>
                <p className="text-red-500/80 text-sm mt-1">
                  Пополните баланс для покупки этого подарка
                </p>
              </div>
            )}

            {/* Purchase Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePurchase}
              disabled={!isConnected || tonBalance < (gift?.price || 0) || isPurchasing}
              className="w-full bg-case-gradient hover:opacity-90 rounded-2xl py-4 px-4 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5 text-white" />
                <span className="font-bold text-white">
                  {!isConnected ? 'Подключите кошелек' : 'Купить подарок'}
                </span>
              </div>
            </motion.button>
          </>
        );
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
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;