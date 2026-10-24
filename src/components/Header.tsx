import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  MessageCircle, 
  Camera, 
  X, 
  Sparkles,
  ChevronDown,
  Stethoscope,
  ArrowRight
} from 'lucide-react';
import { Logo } from './Logo';
import { WHATSAPP_PHONE } from '../utils/whatsapp';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileDrawer: () => void;
  onOpenPrescriptionModal: () => void;
  onOpenDiagnosticModal: () => void;
  onQuickViewProduct: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenMobileDrawer,
  onOpenPrescriptionModal,
  onOpenDiagnosticModal,
  onQuickViewProduct,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onScrollToSection,
}) => {
  const [isSearchExpandedMobile, setIsSearchExpandedMobile] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results for live autocomplete (limit to top 4 products)
  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Mobile Hamburger & Search (Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenMobileDrawer}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-pharmacy-700 hover:bg-pharmacy-50 active:scale-95 transition-all"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => setIsSearchExpandedMobile(!isSearchExpandedMobile)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-pharmacy-700 hover:bg-pharmacy-50 transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Brand Logo & Live status */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 md:flex-none flex justify-center md:justify-start cursor-pointer"
            >
              <Logo />
            </div>

            {/* Live Pharmacy Open Badge (Desktop only) */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-bold text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Pharmacie Ouverte (Midelt)</span>
            </div>
          </div>

          {/* Desktop Search Bar (Real-Time Autocomplete) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un soin, marque (CeraVe, La Roche-Posay, SVR...)"
                value={searchQuery}
                onFocus={() => setIsSearchDropdownOpen(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                className="w-full pl-10 pr-9 py-2.5 text-xs lg:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 focus:bg-white focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => {
                    onSearchChange('');
                    setIsSearchDropdownOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
                {searchResults.length > 0 ? (
                  <div className="p-2 space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Produits trouvés ({searchResults.length})
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onQuickViewProduct(product);
                          setIsSearchDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-pharmacy-700 uppercase">
                            {product.brand}
                          </div>
                          <div className="text-xs font-semibold text-slate-900 truncate">
                            {product.title}
                          </div>
                        </div>
                        <div className="text-xs font-black text-slate-900 shrink-0">
                          {product.price} <span className="text-[10px] text-pharmacy-700 font-bold">DH</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-1 border-t border-slate-100 px-3 py-1.5 text-center">
                      <button
                        onClick={() => {
                          setIsSearchDropdownOpen(false);
                          const el = document.getElementById('catalogue-produits');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-pharmacy-700 hover:text-pharmacy-900 flex items-center justify-center gap-1 w-full"
                      >
                        <span>Voir tous les résultats pour « {searchQuery} »</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    Aucun soin ne correspond à « {searchQuery} »
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons: Diagnostic, Ordonnance, WhatsApp, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Skin Diagnostic Quiz CTA Button */}
            <button
              onClick={onOpenDiagnosticModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-95 transition-all group"
              title="Obtenir ma routine personnalisée en 30 secondes"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-600 group-hover:rotate-12 transition-transform" />
              <span>Diagnostic Peau</span>
            </button>

            {/* Quick Prescription CTA (Desktop/Tablet) */}
            <button
              onClick={onOpenPrescriptionModal}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-pharmacy-50 to-emerald-100/70 text-pharmacy-800 border border-pharmacy-200 hover:border-pharmacy-400 text-xs font-semibold shadow-xs hover:shadow-sm active:scale-95 transition-all group"
            >
              <Camera className="w-4 h-4 text-pharmacy-600 group-hover:scale-110 transition-transform" />
              <span>Ordonnance</span>
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula / Pharmacie La Ville, j'aimerais avoir un conseil ou passer une commande.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs hover:shadow-md active:scale-95 transition-all"
              title="Discuter directement sur WhatsApp avec Dr. Khaoula"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-900 text-white hover:bg-pharmacy-700 active:scale-95 transition-all shadow-xs flex items-center justify-center"
              aria-label={`Panier (${cartCount} articles)`}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Expandable Mobile Search Bar */}
        {isSearchExpandedMobile && (
          <div className="md:hidden pb-3 pt-1 animate-fadeIn">
            <div className="relative w-full">
              <input
                type="text"
                autoFocus
                placeholder="Rechercher par produit, marque, ingrédient..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Quick Category Subheader */}
      <div className="hidden md:block bg-slate-50/80 border-t border-slate-200/70 text-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-pharmacy-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Tous les Produits
            </button>

            <button
              onClick={() => onSelectCategory('destockage')}
              className={`px-3.5 py-1.5 rounded-full font-black flex items-center gap-1 transition-all ${
                selectedCategory === 'destockage'
                  ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400'
                  : 'text-red-600 bg-red-50 hover:bg-red-100'
              }`}
            >
              <span>🔥 SOLDES JUSQU'À -50%</span>
            </button>

            <button
              onClick={() => onSelectCategory('complements')}
              className={`px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1 transition-all ${
                selectedCategory === 'complements'
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-400'
                  : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
              }`}
            >
              <span>✨ Compléments & Beauté</span>
            </button>

            <button
              onClick={() => onSelectCategory('packs-promo')}
              className={`px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 transition-colors ${
                selectedCategory === 'packs-promo'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <span>📦 Packs Duo Éco</span>
            </button>

            <button
              onClick={() => onSelectCategory('dermo-cosmetique')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === 'dermo-cosmetique'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Visage & Anti-Taches
            </button>

            <button
              onClick={() => onSelectCategory('solaires')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === 'solaires'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Solaires SPF50+
            </button>

            <button
              onClick={() => onSelectCategory('bebe-maternite')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === 'bebe-maternite'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Bébé & Maman
            </button>

            <button
              onClick={() => onSelectCategory('bio-naturel')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === 'bio-naturel'
                  ? 'bg-pharmacy-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Bio & Naturel
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-slate-500 font-medium pl-4 border-l border-slate-200">
            <button
              onClick={() => onScrollToSection('dr-khaoula')}
              className="hover:text-pharmacy-700 transition-colors"
            >
              Dr. Khaoula
            </button>
            <button
              onClick={() => onScrollToSection('pharmacie-midelt')}
              className="hover:text-pharmacy-700 transition-colors"
            >
              Pharmacie Midelt
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
