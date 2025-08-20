import React from 'react';

interface TypewriterEffectProps {
  texts?: string[];
  text?: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  texts = [], 
  text = '', 
  className = '' 
}) => {
  // Just display the first text or the text prop without any animation
  const displayText = texts.length > 0 ? texts[0] : text;

  return <span className={`${className} inline-block`}>{displayText}</span>;
};

export default TypewriterEffect;
