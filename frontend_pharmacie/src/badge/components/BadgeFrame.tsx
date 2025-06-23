import React, { forwardRef } from 'react';
import { BadgeProps } from '../types';
import BadgeHeader from './BadgeHeader';
import BadgePhoto from './BadgePhoto';
import BadgeInfo from './BadgeInfo';
import BadgeFooter from './BadgeFooter';

const BadgeFrame = forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    userPhoto, 
    firstName,
    lastName,
    rfid, 
    fullName, 
    position, 
    primaryColor = '#49d4ee',
    secondaryColor = '#84ea1a',
    companyLogo 
  }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[340px] h-[214px] rounded-2xl shadow-xl relative overflow-hidden border "
        style={{
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          background: `linear-gradient(135deg, ${primaryColor}22 0%, #fff 60%, ${secondaryColor}22 100%)`,
          borderColor: primaryColor,
        }}
      >
        <BadgeHeader primaryColor='#49d4ee' secondaryColor={secondaryColor} companyLogo={companyLogo} />
        
        <div className="flex h-full px-6 py-12 items-center">
          <div className="flex-shrink-0 mr-6 transform " >
            <BadgePhoto userPhoto={userPhoto} primaryColor='#49d4ee' />
          </div>
          <div className="flex flex-col justify-center flex-grow transform transition-all ">
            <BadgeInfo 
              fullName={fullName} 
              firstName={firstName}
              lastName={lastName}
              position={position} 
              rfid={rfid} 
              primaryColor='#49d4ee'
            />
          </div>
        </div>
        
      </div>
    );
  }
);

BadgeFrame.displayName = 'BadgeFrame';

export default BadgeFrame;