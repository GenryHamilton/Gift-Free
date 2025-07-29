import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import tonSymbol from '../assets/ton_symbol.svg';
import case1Image from '../assets/download_9.774666666666352.svg';
import case2Image from '../assets/download_88.43400000000005.svg';
import { localDataService } from '../services/localData';

const CaseCard = ({ 
  caseData, 
  onClick, 
  isLocked = false,
  className = "" 
}) => {
  const getCaseImage = (caseId) => {
    switch (caseId) {
      case 1:
        return case1Image;
      case 2:
        return case2Image;
      default:
        return case1Image; // fallback to first image
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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 cursor-pointer ${className} ${isLocked ? 'opacity-60' : ''}`}
    >
      {/* Animated case image */}
      <div className="relative h-40 w-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24"
        >
          <img 
            src={getCaseImage(caseData.id)} 
            alt={`Case ${caseData.id}`}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Price */}
      <div className="p-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full flex items-center justify-center">
            <img src={tonSymbol} alt="TON" className="w-4 h-4" />
          </div>
          <span className="text-white text-sm font-bold">
            {caseData.price} TON
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseCard; 