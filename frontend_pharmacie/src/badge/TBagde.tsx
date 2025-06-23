import { useRef } from 'react';
import { useBadgeDownload } from "./hooks/useBadgeDownload"
import { Save } from 'lucide-react';
import profile from "../Images/profile.png"
import logo from "../Images/logo.png"




function TBadge({pharmacistProfile}) {


  console.log(pharmacistProfile)




  const badgeRef = useRef<HTMLDivElement>(null);
  const { isDownloading, handleDownload, error } = useBadgeDownload();
  // Données du badge
  const firstName = 'Abdelbasset';
  const lastName = 'Sassaoui';
  const position = 'Pharmacist';
  const rfid = 'XXXX-XXXX';
  const primaryColor = '#49d4ee';
  const secondaryColor = '#84ea1a';

  const onDownload = async (type: 'png' | 'pdf') => {
    if (!badgeRef.current) return;
    await handleDownload(badgeRef.current, type, `${firstName}_${lastName}_badge`);
  };



  return (
      <div className="max-w-7xl mx-auto px-4">
        {/* Badge à télécharger */}


        <div 
          ref={badgeRef}
          className="relative w-[340px] h-[214px]  rounded-2xl shadow-md border bg-green-50"
          style={{
            fontFamily: "'Arial', sans-serif", // Police garantie
            borderColor: primaryColor,
            backgroundColor:'#f2fce4'
          }}
        >
          {/* Logo */}
          <div className="absolute top-4 left-4">
            <img 
              src={logo}
              alt="Logo" 
              className="h-10 object-contain"
              crossOrigin="anonymous"
              onError={(e) => (e.currentTarget.src = '/placeholder-logo.png')}
            />
          </div>

          {/* Photo */}
          <div className="absolute left-6 top-16 w-24 h-24 rounded-full border-4"
               style={{ borderColor: primaryColor }}>
            <img
              src={profile}
              //src={pharmacistProfile.badge.image ? pharmacistProfile.badge.image : profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              crossOrigin="anonymous"
              onError={(e) => (e.currentTarget.src = '/placeholder-profile.png')}
            />
          </div>

          {/* Texte - version simplifiée et fiable */}
          <div className="absolute left-36 top-16">
            <h2 className="text-2xl font-bold text-gray-800 leading-tight" 
                style={{ color: '#000000' }}>
              {pharmacistProfile.firstName}
            </h2>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight"
                style={{ color: '#000000' }}>
              {pharmacistProfile.lastName}
            </h2>
            <p className="text-sm font-medium uppercase mt-1"
               style={{ color: primaryColor }}>
              {pharmacistProfile.post}
            </p>
            <div className="mt-2 px-3 py-1   rounded-lg border text-xs "
                 style={{ 
                   borderColor: `${primaryColor}50`,
                   backgroundColor: `${primaryColor}15`,
                   padding: '8px 12px',
                 }}>
              <span style={{ color: primaryColor }}>RFID:</span>
              <span className=" font-bold text-gray-600 leading-tight mt-1 pb-5"
                style={{ color: '#000000' , marginTop:'-30px' }}>{rfid}</span>
            </div>
          </div>
        </div>


        {/* Boutons de téléchargement */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => onDownload('png')}
            disabled={isDownloading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            <Save className="mr-2" size={16} />
            {isDownloading ? 'Génération...' : 'Télécharger PNG'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
    </div>
  );
}

export default TBadge;