import React, { useRef, useState } from 'react';
import { BadgeProps } from '../types';
import BadgeFrame from './BadgeFrame';
import DownloadOptions from './DownloadOptions';
import { useBadgeDownload } from '../hooks/useBadgeDownload';
import { AlertCircle } from 'lucide-react';

const Badge: React.FC<BadgeProps> = ({
  userPhoto,
  rfid,
  fullName = '',
  firstName = 'Abdelbasset',
  lastName = 'Sassaoui',
  position,
  highResolution = true,
  primaryColor = '#49d4ee',
  secondaryColor = '#84ea1a',
  companyLogo,
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const { isDownloading, handleDownload, error } = useBadgeDownload({
    badgeRef,
    fullName,
    highResolution,
  });




  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-sm">
      <div >
        <BadgeFrame
          ref={badgeRef}
          userPhoto={userPhoto}
          rfid={rfid}
          fullName={fullName}
          firstName={firstName}
          lastName={lastName}
          position={position}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          companyLogo={companyLogo}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg w-full">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <DownloadOptions onDownload={handleDownload} isLoading={isDownloading} />
    </div>
  );
};

export default Badge;