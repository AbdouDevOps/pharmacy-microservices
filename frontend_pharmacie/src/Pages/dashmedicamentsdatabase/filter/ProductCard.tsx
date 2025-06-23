import { Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, Product } from '../context/CartContext';


interface DistributorInfo {
  URL?: string;
  Nom?: string;
  Statut?: string;
  Adresse?: string;
  Téléphone?: string;
  Fax?: string;
  Siteweb_réel?: string | null;
  Usine_Téléphone?: string | null;
}

export interface Medicament {
  Présentation: string;
  Dosage: string;
  Distributeur_ou_fabriquant: string;
  Composition: string;
  Classe_thérapeutique: string;
  Statut: string;
  Code_ATC: string;
  PPV: string;
  Prix_hospitalier: string;
  Tableau: string;
  Indication?: string | null;
  genre?: string;
  distributeur_info?: DistributorInfo;
}

interface MedicamentCardProps {
  Medicament: Medicament;
}

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };
const MedicamentCard: React.FC<MedicamentCardProps> = ({ Medicament }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full p-5 "
  >
      {/* Category Ribbon */}
      {Medicament.genre && (
        <div className="absolute top-0 right-0" >
          <div className=" text-white text-xs font-medium py-1 px-3 rounded-bl-lg bg-[#84ea1a]" >
            {Medicament.genre}
          </div>
        </div>
      )}
      
      <div className="p-5 h-full flex flex-col" style={{ marginLeft:"-30px" }}>
        {/* Main Content */}
        <div className="flex-grow">
          <h1 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1fb9d3] transition-colors duration-300"
          style={{ marginTop:"-20px" }}>
            {Medicament.Composition}
          </h1>
          
          <div className="space-y-3">

            
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium text-gray-500 uppercase min-w-24">Fabricant:</span>
              <span className="text-sm text-gray-800">{Medicament.Distributeur_ou_fabriquant}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium text-gray-500 uppercase min-w-24">Présentation:</span>
              <span className="text-sm text-gray-800">{Medicament.Présentation}</span>
            </div>
          </div>
        </div>
        
        {/* Price and Action Section */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-gray-900 " >
                PPV: <span className="text-[#1fb9d3]">{Medicament.PPV}</span>
              </p>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicamentCard;