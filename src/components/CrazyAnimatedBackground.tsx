import React from 'react';

const ElegantAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static background pattern only */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.02) 0%, transparent 40%),
            radial-gradient(circle at 40% 70%, rgba(99, 102, 241, 0.01) 0%, transparent 30%)
          `,
        }}
      />
    </div>
  );
};

export default ElegantAnimatedBackground;
