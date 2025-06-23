import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import CartIcon from '../payment/CartIcon';
//import  medicament_data  from "../../dashmedicamentsdatabase/data/genres_output/genre_A.js"; // Adjust the import path as necessary

import SearchBar from "./SearchBar";
import Categories from "./Categories";
import EmptyState from "./EmptyState";
import ProductSkeleton from "./ProductSkeleton";
import ActiveFilters from "./ActiveFilters";
import { CartProvider } from "../context/CartContext";
import ProductCard from "../payment/ProductCard";
import Cart from "../payment/Cart";
import {
  FilterAlt as FilterAltIcon,
  Search as SearchIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
  Cancel,
} from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/joy";

// Define the Product type according to your data structure
type Product = {
  genre: string;
  Distributeur_ou_fabriquant?: string;
  Composition?: string;
  Classe_thérapeutique?: string;
  PPV?: string;
  Prix_hospitalier?: string;
  Code_ATC?: string;
  // Add other fields as needed
};

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

  // use effect to gat medicament data and categories
  ensureUserId(); // Ensure user ID is set

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    setIsLoading(true);
    fetch("http://127.0.0.1:8081/api/medicament/getall", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erreur lors de la récupération des données :", error))
      .finally(() => setIsLoading(false));
  }, []);


  const navigate = useNavigate();

  // State
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
        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
              <div>
                <CartIcon onClick={openCart} />
              </div>
            </div>
            </div>

            <ActiveFilters 
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              setSelectedCategory={setSelectedCategory}
              setSearchQuery={setSearchQuery}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow overflow-auto custom-scrollbar">
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
