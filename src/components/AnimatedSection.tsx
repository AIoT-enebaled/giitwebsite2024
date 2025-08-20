import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  // Just render children without any animation
  return (
    <div>
      {children}
    </div>
  );
};

export default AnimatedSection;
