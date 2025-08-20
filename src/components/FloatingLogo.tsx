import React from 'react';
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
      <div className="relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F2ad69148086148c288ff98a1e4c8b79f?format=webp&width=800"
          alt="GiiT Logo"
          className={`${getSizeClasses()} drop-shadow-lg`}
        />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          {showTypewriter ? (
            <div className={`font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent ${getTextSize()}`}>
              <TypewriterEffect
                texts={['GiiT', 'Genius Institute', 'Innovation Hub', 'Tech Excellence']}
                speed={120}
                delay={3000}
                className="typewriter-logo"
              />
            </div>
          ) : (
            <span className={`font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent ${getTextSize()}`}>
              GiiT
            </span>
          )}
          {size === 'large' && (
            <span className="text-xs text-gray-400 font-medium tracking-wider">
              Genius Institute of IT
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingLogo;
