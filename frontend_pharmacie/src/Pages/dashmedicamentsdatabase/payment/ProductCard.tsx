import React from 'react';
import { Plus } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  


  const nav = useNavigate()


  function handleClick(id: string): React.MouseEventHandler<HTMLDivElement> {
    return (e) => {
      // Prevent click event from bubbling if the Add button is clicked
      if ((e.target as HTMLElement).closest('button')) return;
      nav(`/dashMedicamentsDatabase/medicamentDetails/${id}`);
    };
  }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" onClick={handleClick(product.id)}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.Composition}
          </h3>
        <div className="absolute top-0 right-0" >
          <div className=" text-white text-xs font-medium py-1 px-3 rounded-bl-lg bg-[#84ea1a]" >
            {product.genre}
          </div>
        </div>
        </div>
        
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Présentation:</span> {product.Présentation}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Dosage:</span> {product.Dosage}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Fabricant:</span> {product.Distributeur_ou_fabriquant}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-[#62ab14] font-bold">
            {product.PPV}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;