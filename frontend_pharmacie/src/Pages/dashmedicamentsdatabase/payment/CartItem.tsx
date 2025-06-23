import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  // Extract price as a number from the price string
let unitPrice = 0;
if (product && typeof product.PPV === 'string') {
  unitPrice = parseFloat(product.PPV.replace(/[^\d.]/g, ''));
}
  const totalPrice = unitPrice * quantity;
  
  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4 animate-fadeIn">
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{product.Composition}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {product.Présentation} • {product.Dosage}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {product.Classe_thérapeutique} • {product.Distributeur_ou_fabriquant}
        </p>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end sm:gap-8 mt-3 sm:mt-0">
        <div className="flex items-center">
          <button 
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            className={`p-1 rounded ${
              quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <input 
            type="number" 
            min="1"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                updateQuantity(product.id, value);
              }
            }}
            className="w-12 text-center mx-1 py-1 border border-gray-300 rounded"
          />
          
          <button 
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="p-1 rounded text-gray-600 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex flex-col items-end min-w-[100px]">
          <div className="text-gray-500 text-sm">
            {product.PPV} <span className="text-xs">par unité</span>
          </div>
          <div className="font-semibold text-gray-800">
            {totalPrice.toFixed(2)} dhs
          </div>
        </div>
        
        <button 
          onClick={() => removeFromCart(product.id)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2"
          aria-label="Supprimer"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;