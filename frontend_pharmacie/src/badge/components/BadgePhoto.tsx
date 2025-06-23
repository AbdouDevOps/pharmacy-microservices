import React from 'react';

interface BadgePhotoProps {
  userPhoto?: string;
  primaryColor: string;
}

const BadgePhoto: React.FC<BadgePhotoProps> = ({ userPhoto, primaryColor }) => {
  return (
    <div
      className="w-24 h-24 rounded-full border-4 shadow-lg overflow-hidden bg-white transition-all duration-300 relative group"
      style={{ borderColor: primaryColor }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <img
        src={userPhoto || 'https://via.placeholder.com/120x120?text=Photo'}
        alt="User"
        className="w-full h-full object-cover transition-all duration-500 "
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/120x120?text=Photo';
          target.onerror = null;
        }}
        loading="lazy"
      />
    </div>
  );
};

export default BadgePhoto;