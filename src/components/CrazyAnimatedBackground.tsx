import React from 'react';

const ElegantAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Reduced Floating Orbs for better performance */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 filter blur-2xl"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
            animation: `float ${20 + i * 5}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      ))}

      {/* Reduced Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-indigo-400/30"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + i * 15}%`,
            animation: `float ${12 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      ))}

      {/* Optimized Static Gradient Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 40% 70%, rgba(99, 102, 241, 0.01) 0%, transparent 30%)
          `,
          willChange: 'auto',
        }}
      />
    </div>
  );
};

export default ElegantAnimatedBackground;
