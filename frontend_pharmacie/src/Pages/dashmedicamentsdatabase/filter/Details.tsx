import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { medicament_data } from "../data/medicament.js";
import { Menu, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import CartIcon from '../payment/CartIcon';

import SearchBar from "./SearchBar";
import Categories from "./Categories";
import EmptyState from "./EmptyState";
import ProductSkeleton from "./ProductSkeleton";
import ActiveFilters from "./ActiveFilters";
import { CartProvider } from "../context/CartContext";
import ProductCard from "../payment/ProductCard";
import Cart from "../payment/Cart";

const ITEMS_PER_PAGE = 100;

function ensureUserId() {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = uuidv4().slice(0, 24);
    localStorage.setItem('user_id', userId);
    document.cookie = `user_id=${userId}; path=/;`;
  }
  console.log(`User ID: ${userId}`);
}

export default function Details() {
  const navigate = useNavigate();

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load data
    useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setProducts(medicament_data);
      setCategories(Array.from(new Set(medicament_data.map((p: Product) => p.genre))));
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Filter products
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory ? product.genre === selectedCategory : true;
      const matchesSearch = searchQuery
        ? [
            product.Distributeur_ou_fabriquant,
            product.Composition,
            product.Classe_thérapeutique,
            product.PPV,
            product.Prix_hospitalier,
            product.Code_ATC,
          ].some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
    setShowMore(filtered.length > ITEMS_PER_PAGE);
    setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE));
  }, [products, searchQuery, selectedCategory]);

  // Responsive menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cart handlers
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <div
        className="bg-gradient-to-b to-slate-100"
        style={{ height: '100vh', overflow: 'hidden', backgroundColor: "#f2fce4" }}
      >


        {/* Mobile menu button */}


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex" style={{ height: '100%' }}>
          {/* Sidebar */}
          <aside 
            className={`
              custom-scrollbar
              fixed lg:relative inset-y-0 left-0 z-40 
              bg-white shadow-xl lg:shadow-md rounded-r-2xl lg:rounded-xl
              transform lg:transform-none transition-transform duration-300 ease-in-out
              p-6 lg:p-8 overflow-y-auto
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            style={{ width: "150px", height: '80vh' }}
          >
            <Categories 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </aside>

          {/* Main content */}
          <main
            className="flex-1 ml-[50px] flex flex-col"
            style={{ height: '80vh', overflowY: 'auto' }}
          >
            <div className="text-center mb-12 flex-shrink-0">
              <p className="mt-6 text-xl leading-8 text-gray-600">
                Find your medications and view their information
              </p>
              <div className="mt-8">
                <SearchBar 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery} 
                />
              </div>
            <div className="flex justify-between items-center h-16">

            </div>
            </div>

            <ActiveFilters 
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              setSelectedCategory={setSelectedCategory}
              setSearchQuery={setSearchQuery}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow overflow-auto custom-scrollbar " style={{marginTop: '-40px'}}>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              ) : displayedProducts.length > 0 ? (
                displayedProducts.map((product, idx) => (
                  <div 
                    key={idx} 
                    className="transform transition-all duration-300 hover:-translate-y-1 focus-within:-translate-y-1 cursor-pointer"
                    onClick={() => {
                      ensureUserId();
                      //navigate(`/dashMedicamentsDatabase/medicamentDetails/${idx}`);
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <EmptyState isSearching={searchQuery.length > 0 || selectedCategory !== null} />
              )}
            </div>
          </main>
        </div>
          <Cart isOpen={isCartOpen} onClose={closeCart} />
      </div>
    </CartProvider>
  );
}
