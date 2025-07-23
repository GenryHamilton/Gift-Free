import React from 'react';
import { motion } from 'framer-motion';

const GeometricIcon = ({ 
  size = 'md', 
  variant = 'hexagon', 
  animate = true,
  className = "" 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const segmentVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        staggerChildren: 0.2
      }
    }
  };

  const HexagonIcon = () => (
    <motion.svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100"
      variants={animate ? iconVariants : {}}
      initial="initial"
      animate={animate ? "animate" : "initial"}
    >
      {/* Central hexagon */}
      <motion.polygon
        points="50,15 75,30 75,60 50,75 25,60 25,30"
        className="fill-case-gradient opacity-20"
        variants={segmentVariants}
      />
      
      {/* Outer segments inspired by logo */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.g
          key={i}
          variants={segmentVariants}
          style={{ transformOrigin: '50px 50px' }}
          animate={{
            rotate: i * 60,
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        >
          <polygon
            points="50,5 65,15 65,25 50,35 35,25 35,15"
            className={i % 2 === 0 ? "fill-case-primary" : "fill-case-secondary"}
            opacity="0.7"
          />
        </motion.g>
      ))}
      
      {/* Center glow */}
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        className="fill-white"
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  );

  const DiamondIcon = () => (
    <motion.svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100"
      variants={animate ? iconVariants : {}}
      initial="initial"
      animate={animate ? "animate" : "initial"}
    >
      {/* Diamond segments */}
      {[0, 1, 2, 3].map((i) => (
        <motion.polygon
          key={i}
          points="50,20 70,50 50,80 30,50"
          className={i % 2 === 0 ? "fill-case-primary" : "fill-case-secondary"}
          style={{ transformOrigin: '50px 50px' }}
          animate={{
            rotate: i * 90,
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.svg>
  );

  const renderIcon = () => {
    switch (variant) {
      case 'diamond':
        return <DiamondIcon />;
      case 'hexagon':
      default:
        return <HexagonIcon />;
    }
  };

  return renderIcon();
};

export default GeometricIcon;