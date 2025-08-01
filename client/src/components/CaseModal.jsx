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
  const [carouselPosition, setCarouselPosition] = useState(0);

  useEffect(() => {
    if (caseData) {
      const gifts = localDataService.getGiftsForCase(caseData.id);
      setCaseGifts(gifts);
    }
  }, [caseData]);

  const handleOpenCase = () => {
    if (caseData && balance >= caseData.price) {
      setIsSpinning(true);
      setSelectedGift(null);
      
      // Calculate random position for the carousel
      const randomIndex = Math.floor(Math.random() * caseGifts.length);
      // Start from the middle section of infinite carousel
      const middleSectionStart = caseGifts.length * 80; // Start from second section
      const targetPosition = -(middleSectionStart + randomIndex * 80);
      
      // Add some extra movement for more dramatic effect
      const extraMovement = Math.random() * 400 - 200; // Random extra movement
      const finalPosition = targetPosition + extraMovement;
      
      // Animate carousel to random position
      setCarouselPosition(finalPosition);
      
      setTimeout(() => {
        const randomGift = caseGifts[randomIndex];
        setSelectedGift(randomGift);
        setIsSpinning(false);
        
        // Call the parent function to actually open the case
        onOpenCase(caseData);
      }, 3000);
    }
  };

  // Create infinite carousel by duplicating gifts
  const infiniteGifts = [...caseGifts, ...caseGifts, ...caseGifts]; // Triple the gifts for infinite effect

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
            className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg"
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

            {/* Carousel Container */}
            <div className="flex justify-center mb-6">
              <div className="relative w-80 h-32">
                {/* Selection indicator - thin line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gift-gold z-10 pointer-events-none"></div>
                
                {/* Carousel */}
                <div className="overflow-hidden h-full rounded-lg">
                  <motion.div
                    animate={{ x: isSpinning ? carouselPosition : 0 }}
                    transition={isSpinning ? { 
                      duration: 3, 
                      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for more realistic movement
                    } : {}}
                    className="flex h-full"
                    style={{ width: `${infiniteGifts.length * 80}px` }}
                  >
                    {infiniteGifts.map((gift, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 w-16 h-32 mx-1 bg-gray-700 rounded-lg border-2 border-gray-600 flex flex-col items-center justify-center p-2 transition-all duration-200"
                        whileHover={{ scale: 1.05, borderColor: '#fbbf24' }}
                      >
                        <div className="w-12 h-12 mb-2">
                          <img 
                            src={gift.image_url} 
                            alt={gift.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-gray-300 text-xs text-center leading-tight truncate">
                          {gift.name}
                        </p>
                        <p className="text-gift-gold text-xs mt-1">
                          {gift.price_ton} TON
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                
                {/* Enhanced glow effect during spinning */}
                {isSpinning && (
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gradient-to-b from-gift-gold via-gift-gold to-transparent pointer-events-none"
                  ></motion.div>
                )}
              </div>
            </div>

            {/* Result Display */}
            {selectedGift && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center mb-6 p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gift-gold/20"
              >
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gift-gold/20 to-transparent rounded-full flex items-center justify-center"
                >
                  <img 
                    src={selectedGift.image_url} 
                    alt={selectedGift.name}
                    className="w-20 h-20 object-contain"
                  />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white font-bold text-lg mb-2"
                >
                  {selectedGift.name}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gift-gold text-lg font-semibold"
                >
                  {selectedGift.price_ton} TON
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3"
                >
                  <Sparkles className="w-6 h-6 text-gift-gold mx-auto" />
                </motion.div>
              </motion.div>
            )}

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