import React from 'react';
import { DownloadButtonProps } from '../types';

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  onClick, 
  label, 
  primary = false,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`transition-all duration-300 py-1.5 px-4 rounded-lg shadow text-sm font-semibold 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md active:scale-95'} 
        ${primary 
          ? 'text-white bg-gradient-to-r from-cyan-500 to-teal-500' 
          : 'text-cyan-600 border border-cyan-500 bg-white'}`}
    >
      {label}
    </button>
  );
};

export default DownloadButton;