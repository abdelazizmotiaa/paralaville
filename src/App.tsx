import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  ShoppingBag, 
  ArrowUpDown,
  Stethoscope,
  Flame,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

import { PRODUCTS } from './data/products';
import { CATEGORIES } from './data/categories';
import { Product, CartItem } from './types';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { HeroSlider } from './components/HeroSlider';
import { PrescriptionBanner } from './components/PrescriptionBanner';
import { FlashSalesCountdown } from './components/FlashSalesCountdown';
import { CategoryPillsGrid } from './components/CategoryPillsGrid';
import { BrandsCarousel } from './components/BrandsCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PrescriptionModal } from './components/PrescriptionModal';
import { SkinDiagnosticModal } from './components/SkinDiagnosticModal';
import { QuickOrderModal } from './components/QuickOrderModal';
import { PromoPacksSection } from './components/PromoPacksSection';
import { MoroccoDeliveryCoverage } from './components/MoroccoDeliveryCoverage';
import { LiveSalesToast } from './components/LiveSalesToast';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { DoctorKhaoulaSection } from './components/DoctorKhaoulaSection';
import { MideltPharmacySection } from './components/MideltPharmacySection';
import { TrustBadgesSection } from './components/TrustBadgesSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('paralaville_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('paralaville_cart', JSON.stringify(cart));
    } catch {
      // safe fallback
    }
  }, [cart]);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);

  // Filters & Search state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'discount'>('bestseller');
  
  // Feedback indicator when adding to cart
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderSuccess = () => {
    setCart([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'destockage' && product.category !== 'destockage' && product.badge !== 'destockage') {
          return false;
        }
        if (selectedCategory === 'packs-promo' && !product.isPack && product.category !== 'packs-promo') {
          return false;
        }
        if (selectedCategory !== 'destockage' && selectedCategory !== 'packs-promo' && product.category !== selectedCategory) {
          return false;
        }
      }

      // Brand match
      if (selectedBrand && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') {
        const discA = a.discountPercent || (a.originalPrice - a.price);
        const discB = b.discountPercent || (b.originalPrice - b.price);
        return discB - discA;
      }
      // default: rating & bestseller
      return b.rating - a.rating;
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  // Flash products for countdown widget
  const flashProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.badge === 'destockage' || p.badge === 'promo' || (p.discountPercent && p.discountPercent >= 24)
    );
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Rotating Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Mobile-First Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onOpenDiagnosticModal={() => setIsDiagnosticModalOpen(true)}
        onQuickViewProduct={(p) => setQuickViewProduct(p)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onScrollToSection={scrollToSection}
      />

      {/* 3. Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onSelectCategory={setSelectedCategory}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onOpenDiagnosticModal={() => setIsDiagnosticModalOpen(true)}
        onScrollToSection={scrollToSection}
        selectedCategory={selectedCategory}
      />

      <main className="flex-1">
        {/* 4. Hero Banner Slider */}
        <HeroSlider
          onExploreOffers={() => {
            setSelectedCategory('all');
            const el = document.getElementById('catalogue-produits');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        />

        {/* 5. 1-Click Prescription Quick Bar */}
        <PrescriptionBanner onOpenModal={() => setIsPrescriptionModalOpen(true)} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* 6. Flash Sales Countdown Widget */}
          <FlashSalesCountdown
            flashProducts={flashProducts}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* 7. Featured Categories Pills Grid */}
          <CategoryPillsGrid
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* 7b. Winning Promo Packs & Duo Specials Section */}
        <PromoPacksSection
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onQuickOrder={(p) => setQuickOrderProduct(p)}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 8. Top Brands Carousel */}
        <BrandsCarousel
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
        />

        {/* 9. Main Product Catalog Section */}
        <section id="catalogue-produits" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header of catalog with active filter indicators */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold font-serif text-slate-900">
                  {selectedCategory === 'all'
                    ? 'Catalogue Parapharmacie & Dermo-Cosmétique'
                    : selectedCategoryObj?.name || 'Soins Sélectionnés'}
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {filteredProducts.length} soins
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {selectedCategoryObj?.description || 'Tous nos produits sont contrôlés et validés par Dr. Khaoula Kamal.'}
              </p>
            </div>

            {/* Filter tags & Sorting */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Active Brand Tag */}
              {selectedBrand && (
                <span className="flex items-center gap-1 text-xs font-bold bg-pharmacy-100 text-pharmacy-800 px-3 py-1.5 rounded-lg border border-pharmacy-200">
                  <span>Marque : {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand('')} className="hover:text-red-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {/* Active Search Query Tag */}
              {searchQuery && (
                <span className="flex items-center gap-1 text-xs font-bold bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg">
                  <span>Recherche : « {searchQuery} »</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {/* Sort By Dropdown */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="pl-8 pr-8 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 appearance-none cursor-pointer"
                >
                  <option value="bestseller">⭐ Meilleures Ventes</option>
                  <option value="discount">🏷️ Plus Grosses Réductions</option>
                  <option value="price-asc">💵 Prix : Croissant</option>
                  <option value="price-desc">💵 Prix : Décroissant</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Aucun produit ne correspond à votre recherche</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Essayez d'autres mots-clés ou consultez Dr. Khaoula Kamal directement pour commander ce produit.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-pharmacy-700 text-white text-xs font-bold"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onQuickOrder={(p) => setQuickOrderProduct(p)}
                  isAddedToCart={addedProductId === product.id}
                />
              ))}
            </div>
          )}

        </section>

        {/* 10. National Geographical Morocco Delivery Coverage */}
        <MoroccoDeliveryCoverage />

        {/* 11. Doctor Khaoula Kamal Section */}
        <DoctorKhaoulaSection />

        {/* 12. Moroccan Customer Verified Reviews */}
        <CustomerReviewsSection />

        {/* 13. Midelt Pharmacy & Service de Garde */}
        <MideltPharmacySection />

        {/* 14. Trust Badges Section */}
        <TrustBadgesSection />
      </main>

      {/* 14. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalogue-produits');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* 15. Persistent Floating WhatsApp Button & Real-Time Sales Toast */}
      <FloatingWhatsApp />
      <LiveSalesToast />

      {/* 16. Mobile App Bottom Bar (Visible on mobile only) */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onGoHome={() => {
          setSelectedCategory('all');
          setSelectedBrand('');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <QuickOrderModal
        product={quickOrderProduct}
        isOpen={!!quickOrderProduct}
        onClose={() => setQuickOrderProduct(null)}
      />

      <SkinDiagnosticModal
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
      />
    </div>
  );
};
