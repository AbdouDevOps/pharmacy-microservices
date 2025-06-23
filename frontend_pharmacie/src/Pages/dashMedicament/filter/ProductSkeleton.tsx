import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md h-full overflow-hidden p-5 relative">
      <div className="animate-pulse">
        {/* Category badge */}
        <div className="absolute top-0 right-0">
          <div className="w-20 h-6 bg-gray-200 rounded-bl-lg"></div>
        </div>
        
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded max-w-[80%] mb-4"></div>
        
        {/* Content rows */}
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <div className="w-24 h-4 bg-gray-100 rounded"></div>
            <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-24 h-4 bg-gray-100 rounded"></div>
            <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-24 h-4 bg-gray-100 rounded"></div>
            <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-24 h-4 bg-gray-100 rounded"></div>
            <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-100 rounded w-20"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
          </div>
          
          <div className="mt-2">
            <div className="h-6 bg-gray-100 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;