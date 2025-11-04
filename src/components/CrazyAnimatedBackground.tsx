import React from 'react';

const ElegantAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gentle Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 filter blur-3xl animate-float"
          style={{
            width: 200 + Math.random() * 200,
            height: 200 + Math.random() * 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Gentle Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-indigo-400/40 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Subtle Gradient Waves */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`wave-${i}`}
          className="absolute w-full h-full animate-spin"
          style={{
            background: `linear-gradient(${45 + i * 60}deg,
              rgba(99, 102, 241, 0.03) 0%,
              transparent 30%,
              rgba(168, 85, 247, 0.03) 70%,
              transparent 100%)`,
            animationDuration: `${30 + i * 10}s`,
            animationDelay: `${i * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ElegantAnimatedBackground;
