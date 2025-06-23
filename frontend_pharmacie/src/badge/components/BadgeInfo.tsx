import React from 'react';

interface BadgeInfoProps {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  rfid?: string;
  primaryColor: string;
}

const BadgeInfo: React.FC<BadgeInfoProps> = ({ 
  fullName, 
  position, 
  rfid, 
  firstName,
  lastName,
  primaryColor 
}) => {
  return (
    <div className="flex flex-col space-y-2" style={{ marginTop: '40px' }}>
      <h5 className="font-bold text-2xl text-gray-800 truncate  hover:text-gray-900" style={{marginBottom: '-10px'}}>
        {firstName || 'Nom Prénom'}
      </h5>
       <h5 className="font-bold text-2xl text-gray-800 truncate  hover:text-gray-900">
        {lastName || 'Nom Prénom'}
      </h5>
      <p
        className="text-sm font-medium  tracking-wide uppercase"
        style={{ color: primaryColor }}
      >
        {position || 'Poste'}
      </p>
      <div
        className="flex items-center rounded-lg px-3 py-1.5 shadow-sm border  hover:shadow-md  backdrop-blur-sm"
        style={{
          background: `${primaryColor}15`,
          borderColor: `${primaryColor}50`,
        }}
      >
        <span
          className="font-semibold text-xs mr-2 uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          RFID:
        </span>
        <span className="font-mono text-sm text-gray-700 break-all">
          {rfid || 'XX-XXXX-XXXX'}
        </span>
      </div>
    </div>
  );
};

export default BadgeInfo;