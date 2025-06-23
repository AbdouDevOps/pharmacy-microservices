import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, clearCart, getCartTotal } = useCart();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  
  const handleValidateOrder = () => {
    setShowOrderSummary(true);
  };
  
  const closeOrderSummary = () => {
    setShowOrderSummary(false);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300">
      <div className="relative bg-white w-full md:max-w-md h-full shadow-xl flex flex-col animate-slideInRight">
        {/* Cart Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-[#84ea1a] text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            My Cart
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#62ab14] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-30" />
              <p>Your cart is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-[#49d4ee] text-white rounded-md hover:bg-[#62ab14] transition-colors"
              >
                Browse products
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">
                  {cart.length} {cart.length > 1 ? 'items' : 'item'} in your cart
                </p>
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Empty cart
                </button>
              </div>
              
              <div className="space-y-1">
                {cart.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total</span>
              <span>{getCartTotal().toFixed(2)} dhs</span>
            </div>
            
            <button 
              onClick={handleValidateOrder}
              className="w-full py-3 bg-[#49d4ee] text-white rounded-md hover:bg-teal-700 transition-colors font-medium"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      
      {/* Order Summary Modal */}
      {showOrderSummary && (
        <OrderSummary onClose={closeOrderSummary} />
      )}
    </div>
  );
};

export default Cart;