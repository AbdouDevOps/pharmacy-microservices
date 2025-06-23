import React from 'react';
import defaultLogo from '../assets/defaultLogo';
import logo from '../../Images/logo.png';


interface BadgeHeaderProps {
  primaryColor: string;
  secondaryColor: string;
  companyLogo?: string;
}

const BadgeHeader: React.FC<BadgeHeaderProps> = ({ 
  primaryColor, 
  secondaryColor, 
  companyLogo 
}) => {
  return (
    <>
      {/* Decorative Top Bar */}


      {/* Logo */}
      <div className="absolute top-1 left-4 flex items-center z-10   " style={{marginLeft: '-10px' , marginBottom: '10px'}}>
        <img
          src= {logo}
          alt="Logo"
          className="h-10 w-30 p-1 "
          style={{marginBottom: '10px'}}
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.src = '../../../Images/logo.png';
            target.onerror = null; // Prevent infinite loop
          }}
        />
      </div>
    </>
  );
};

export default BadgeHeader;