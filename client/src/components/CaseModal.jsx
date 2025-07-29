import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles } from 'lucide-react';
import { localDataService } from '../services/localData';

const CaseModal = ({ 
  isOpen, 
  onClose, 
  caseData, 
  onOpenCase, 
  balance 
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [caseGifts, setCaseGifts] = useState([]);

  useEffect(() => {
    if (caseData) {
      const gifts = localDataService.getGiftsForCase(caseData.id);
      setCaseGifts(gifts);
    }
  }, [caseData]);

  const handleOpenCase = () => {
    if (caseData && balance >= caseData.price) {
      setIsSpinning(true);
      
      // Simulate spinning animation
      setTimeout(() => {
        const randomGift = caseGifts[Math.floor(Math.random() * caseGifts.length)];
        setSelectedGift(randomGift);
        setIsSpinning(false);
        
        // Call the parent function to actually open the case
        onOpenCase(caseData);
      }, 3000);
    }
  };

  const isLocked = !caseData || balance < caseData.price;

  // Don't render if caseData is null or modal is not open
  if (!isOpen || !caseData) {
    return null;
  }

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
            className="bg-gray-800 rounded-2xl p-6 w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{caseData.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Spinning Wheel */}
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <motion.div
                  animate={isSpinning ? { rotate: 360 } : {}}
                  transition={isSpinning ? { 
                    duration: 3, 
                    ease: "easeOut",
                    repeat: 0
                  } : {}}
                  className="w-full h-full rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
                >
                  {isSpinning ? (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-12 h-12 text-gift-gold" />
                    </motion.div>
                  ) : selectedGift ? (
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3">
                        <img 
                          src={selectedGift.image_url} 
                          alt={selectedGift.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-white font-bold text-sm">{selectedGift.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Gift className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Нажмите "Открыть кейс"</p>
                    </div>
                  )}
                </motion.div>
                
                {/* Wheel pointer */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gift-gold"></div>
              </div>
            </div>

            {/* Open Case Button */}
            <div className="mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenCase}
                disabled={isLocked || isSpinning}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                  isLocked
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : isSpinning
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-telegram-accent to-blue-600 text-white hover:from-telegram-accent/90 hover:to-blue-600/90'
                }`}
              >
                {isSpinning ? 'Открываем...' : isLocked ? 'Недостаточно средств' : 'Открыть кейс'}
              </motion.button>
            </div>

            {/* Possible Gifts List */}
            <div>
              <h3 className="text-white font-medium mb-3">Возможные подарки:</h3>
              <div className="grid grid-cols-3 gap-3 max-h-40 overflow-y-auto">
                {caseGifts.map((gift, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="w-12 h-12 mx-auto mb-2">
                      <img 
                        src={gift.image_url} 
                        alt={gift.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-gray-300 text-xs truncate">{gift.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseModal; 