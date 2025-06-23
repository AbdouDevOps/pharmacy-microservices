import React from 'react';

interface BadgeFooterProps {
  primaryColor: string;
  secondaryColor: string;
}

const BadgeFooter: React.FC<BadgeFooterProps> = ({ 
  primaryColor, 
  secondaryColor 
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 w-full h-3 rounded-b-2xl"
      style={{
        background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      }}
    />
  );
};

export default BadgeFooter;