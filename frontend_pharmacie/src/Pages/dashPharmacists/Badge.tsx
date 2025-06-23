import { useRef } from 'react';
import { Save } from 'lucide-react';
import profile from "../../Images/profile.png"
import logo from "../../Images/logo.png"




function TBadge({pharmacistProfile}) {





  console.log(pharmacistProfile)

  const rfid = 'XXXX-XXXX';
  const primaryColor = '#49d4ee';
  const secondaryColor = '#84ea1a';





  return (
        <div 
          className="relative w-[340px] h-[214px]  rounded-2xl shadow-md border bg-green-50"
          style={{
            fontFamily: "'Arial', sans-serif",
            borderColor: primaryColor,
            backgroundColor:'#f2fce4'
          }}
        >
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
              src={pharmacistProfile.badge.imageBase64}
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

        
  );
  

}

export default TBadge;