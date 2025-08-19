import React from 'react';
import { motion } from 'framer-motion';
import TypewriterEffect from './TypewriterEffect';

interface FloatingLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  showTypewriter?: boolean;
  className?: string;
}

const FloatingLogo: React.FC<FloatingLogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  showTypewriter = false,
  className = '' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-8 w-8';
      case 'large':
        return 'h-20 w-20';
      default:
        return 'h-12 w-12';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-xl';
      case 'large':
        return 'text-4xl';
      default:
        return 'text-2xl';
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <motion.img
          src="https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F2ad69148086148c288ff98a1e4c8b79f?format=webp&width=800"
          alt="GiiT Logo"
          className={`${getSizeClasses()} drop-shadow-lg`}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{
            scale: 1.05,
            filter: "brightness(1.1)",
            transition: { duration: 0.3 }
          }}
        />

        {/* Gentle floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/60"
            style={{
              top: `${20 + i * 30}%`,
              right: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Subtle breathing ring */}
        <motion.div
          className="absolute border border-indigo-400/30 rounded-full"
          style={{
            width: '120%',
            height: '120%',
            top: '-10%',
            left: '-10%',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut"
          }}
          className="flex flex-col"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          {showTypewriter ? (
            <motion.div
              className={`font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent ${getTextSize()}`}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              <TypewriterEffect
                texts={['GiiT', 'Genius Institute', 'Innovation Hub', 'Tech Excellence']}
                speed={120}
                delay={3000}
                className="typewriter-logo"
              />
            </motion.div>
          ) : (
            <motion.span
              className={`font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent ${getTextSize()}`}
              animate={{
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              GiiT
            </motion.span>
          )}
          {size === 'large' && (
            <motion.span
              className="text-xs text-gray-400 font-medium tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 0.6
              }}
            >
              Genius Institute of IT
            </motion.span>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FloatingLogo;
