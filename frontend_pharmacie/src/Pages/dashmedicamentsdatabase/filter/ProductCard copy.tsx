import React from 'react';

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

export interface Product {
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 h-full">
      {/* Category Ribbon */}
      {product.genre && (
        <div className="absolute top-0 right-0" >
          <div className=" text-white text-xs font-medium py-1 px-3 rounded-bl-lg bg-green-500" >
            {product.genre}
          </div>
        </div>
      )}
      
      <div className="p-5 h-full flex flex-col">
        {/* Main Content */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.Composition}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium text-gray-500 uppercase min-w-24">Classe:</span>
              <span className="text-sm text-gray-800">{product.Classe_thérapeutique}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium text-gray-500 uppercase min-w-24">Fabricant:</span>
              <span className="text-sm text-gray-800">{product.Distributeur_ou_fabriquant}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium text-gray-500 uppercase min-w-24">Présentation:</span>
              <span className="text-sm text-gray-800">{product.Présentation}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <span className="text-xs font-medium text-gray-500 uppercase min-w-24">Statut:</span>
              <span className="text-sm text-gray-800">{product.Statut}</span>
            </div>
          </div>
        </div>
        
        {/* Price and Action Section */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                PPV: <span className="text-blue-600">{product.PPV}</span>
              </p>
              <p className="text-xs text-gray-600">
                Hosp: {product.Prix_hospitalier}
              </p>
            </div>
            
            {product.distributeur_info?.URL && (
              <a
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium bg-green-400 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Détails
              </a>
            )}
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
              ATC: {product.Code_ATC}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;