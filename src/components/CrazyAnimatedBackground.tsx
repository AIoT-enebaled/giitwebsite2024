import React from 'react';
import { motion } from 'framer-motion';

const ElegantAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gentle Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 filter blur-3xl"
          style={{
            width: 200 + Math.random() * 200,
            height: 200 + Math.random() * 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Gentle Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-indigo-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Subtle Gradient Waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute w-full h-full"
          style={{
            background: `linear-gradient(${45 + i * 60}deg,
              rgba(99, 102, 241, 0.03) 0%,
              transparent 30%,
              rgba(168, 85, 247, 0.03) 70%,
              transparent 100%)`,
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 10,
          }}
        />
      ))}
    </div>
  );
};

export default ElegantAnimatedBackground;
