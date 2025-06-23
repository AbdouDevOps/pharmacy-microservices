import React from 'react';
import DownloadButton from './DownloadButton';
import { Download, Save } from 'lucide-react';

interface DownloadOptionsProps {
  onDownload: (type: 'png' | 'pdf') => Promise<void>;
  isLoading: boolean;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ 
  onDownload,
  isLoading
}) => {
  return (
    <div className="flex space-x-3">
      <DownloadButton
        onClick={() => onDownload('png')}
        label={
          <div className="flex items-center">
            <Download size={16} className="mr-1" />
            <span>{isLoading ? 'Génération...' : 'Télécharger PNG'}</span>
          </div>
        }
        primary
        disabled={isLoading}
      />
      <DownloadButton
        onClick={() => onDownload('pdf')}
        label={
          <div className="flex items-center">
            <Save size={16} className="mr-1" />
            <span>{isLoading ? 'Génération...' : 'Télécharger PDF'}</span>
          </div>
        }
        disabled={isLoading}
      />
    </div>
  );
};

export default DownloadOptions;