import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();
  
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <ShoppingCart className="h-6 w-6 text-gray-700" />
      {itemCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-[#49d4ee] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </div>
      )}
    </div>
  );
};

export default CartIcon;