import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  selectedCategory: string | null;
  searchQuery: string;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedCategory,
  searchQuery,
  setSelectedCategory,
  setSearchQuery,
}) => {
  if (!selectedCategory && !searchQuery) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Filtres actifs:</h3>
      <div className="flex flex-wrap gap-2">
        {selectedCategory && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium  text-blue-800 shadow-sm group transition-all duration-200 hover:bg-blue-200"
          style={{backgroundColor:"#e3fbfd"}}>
            <span className="mr-1">Catégorie:</span> {selectedCategory}
            <button
              onClick={() => setSelectedCategory(null)}
              className="ml-1.5 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              aria-label={`Supprimer le filtre ${selectedCategory}`}
            >
              <X size={14} />
            </button>
          </span>
        )}
        
        {searchQuery && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 shadow-sm group transition-all duration-200 hover:bg-indigo-200">
            <span className="mr-1">Recherche:</span> {searchQuery}
            <button
              onClick={() => setSearchQuery('')}
              className="ml-1.5 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              aria-label="Supprimer la recherche"
              
            >
              <X size={14} />
            </button>
          </span>
        )}
        
        {(selectedCategory || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 transition-all duration-200"
          >
            Effacer tous les filtres
            <X size={14} className="ml-1.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;