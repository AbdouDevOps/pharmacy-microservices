import React from 'react';
import { Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface OrderSummaryProps {
  onClose: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onClose }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  
  const handleConfirmOrder = () => {
    // Here you would typically send the order to your backend
    alert('Order confirmed! In a real application, this would be sent to the backend.');
    clearCart();
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-6 py-4">
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Ordered Medicaments</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider bg-[#e3fbfd]">
                      Product
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-dark uppercase tracking-wider bg-[#e3fbfd]">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-dark uppercase tracking-wider bg-[#e3fbfd]">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => {
const unitPrice = item?.product?.PPV
  ? parseFloat(item.product.PPV.replace(/[^\d.]/g, ''))
  : 0;
                    const totalPrice = unitPrice * item.quantity;
                    
                    return (
                      <tr key={item.product.id}>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-800">{item.product.Composition}</div>
                            <div className="text-sm text-gray-500">{item.product.Présentation} • {item.product.Dosage}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-gray-800">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-gray-800">{totalPrice.toFixed(2)} dhs</div>
                          <div className="text-xs text-gray-500">({item.product.PPV} per unit)</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{getCartTotal().toFixed(2)} dhs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-bold text-xl text-teal-700">{getCartTotal().toFixed(2)} dhs</span>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button 
            onClick={handleConfirmOrder}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center"
          >
            <Check className="mr-1 h-4 w-4" /> Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;