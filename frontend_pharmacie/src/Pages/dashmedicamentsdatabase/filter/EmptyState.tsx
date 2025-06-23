import React from 'react';
import { ShoppingCart, FileSearch } from 'lucide-react';

interface EmptyStateProps {
  isSearching: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isSearching }) => {
  return (
    <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm p-8">
      {isSearching ? (
        <>
          <FileSearch className="mx-auto h-16 w-16 text-blue-300" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">Aucun produit trouvé</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Nous n'avons pas trouvé de médicaments correspondant à vos critères de recherche. 
            Essayez d'ajuster vos termes de recherche ou de supprimer certains filtres.
          </p>
          <button
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Effacer les filtres
          </button>
        </>
      ) : (
        <>
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">Catalogue vide</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Il semble qu'il n'y ait aucun produit dans notre catalogue pour le moment.
            Revenez bientôt pour découvrir nos nouveaux arrivages.
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyState;