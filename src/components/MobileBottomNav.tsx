import React from 'react';
import { Home, Grid, Camera, ShoppingBag, MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileDrawer: () => void;
  onOpenPrescriptionModal: () => void;
  onGoHome: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  onOpenCart,
  onOpenMobileDrawer,
  onOpenPrescriptionModal,
  onGoHome,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 safe-area-bottom">
      <div className="grid grid-cols-5 items-center text-center">
        
        {/* 1. Accueil */}
        <button
          onClick={onGoHome}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-pharmacy-700 active:scale-95 transition-all"
        >
          <Home className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold mt-0.5">Accueil</span>
        </button>

        {/* 2. Rayons / Catégories */}
        <button
          onClick={onOpenMobileDrawer}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-pharmacy-700 active:scale-95 transition-all"
        >
          <Grid className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold mt-0.5">Rayons</span>
        </button>

        {/* 3. Center Highlight: Ordonnance */}
        <button
          onClick={onOpenPrescriptionModal}
          className="flex flex-col items-center justify-center -mt-4 active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 border-2 border-white">
            <Camera className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold text-rose-800 mt-0.5">Ordonnance</span>
        </button>

        {/* 4. Panier */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-1 text-slate-600 hover:text-pharmacy-700 active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Panier</span>
        </button>

        {/* 5. WhatsApp Direct */}
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula / Pharmacie La Ville, j'aimerais avoir un conseil ou passer une commande.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-current text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </a>

      </div>
    </nav>
  );
};
