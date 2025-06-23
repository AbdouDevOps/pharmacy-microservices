import React from 'react';
import { X } from 'lucide-react';

interface CategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 " style={{marginLeft:'-20px'}}>Catégories</h2>
      <div className="max-h-screen  space-y-2"> {/* Ajout du scroll ici */}
        {categories
          .filter(category => /^[A-Za-z]/.test(category))
          .sort((a, b) => a.localeCompare(b))
          .map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory((prev) => (prev === category ? null : category))
              }
              style={selectedCategory === category ? { backgroundColor: '#e3fbfd' } : {}}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                selectedCategory === category
                  ? 'text-white font-semibold ' 
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center justify-between text-blue-800">
                <span>{category}</span>
                {selectedCategory === category && (
                  <X 
                    size={14} 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" 

                  />
                )}
              </div>
              <div 
                 style={selectedCategory === category ? { backgroundColor: '#49d4ee' } : {}}

                className={`h-1  mt-2 transform scale-x-0 origin-left transition-transform duration-300 ${
                  selectedCategory === category ? 'scale-x-100' : 'group-hover:scale-x-75'
                }`}
              />
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Categories;