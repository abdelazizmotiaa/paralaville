import React from 'react';
import { 
  Package, 
  Sparkles, 
  Flame, 
  MessageCircle, 
  ShoppingBag, 
  Gift, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface PromoPacksSectionProps {
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const PromoPacksSection: React.FC<PromoPacksSectionProps> = ({
  onAddToCart,
  onQuickOrder,
  onQuickView,
}) => {
  // Filter pack products
  const packProducts = PRODUCTS.filter((p) => p.isPack || p.category === 'packs-promo' || p.badge === 'destockage').slice(0, 4);

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-amber-50/70 via-white to-slate-50 border-y border-amber-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider mb-2 shadow-xs animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              <span>OFFRES GAGNANTES DU MOIS • STOCK LIMITÉ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-slate-900 tracking-tight">
              Packs Économiques & Coffrets Duo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Payez moins cher en achetant votre routine complète ! Produits 100% originaux certifiés par Dr. Khaoula Kamal avec cadeaux et remises immédiates.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/80 px-3.5 py-2 rounded-xl border border-amber-300 shrink-0">
            <Gift className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Échantillons & Cadeaux offerts dans chaque commande</span>
          </div>
        </div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packProducts.map((pack) => {
            const savingsDH = pack.originalPrice - pack.price;
            const discountPercent = Math.round((savingsDH / pack.originalPrice) * 100);

            return (
              <div
                key={pack.id}
                className="bg-white rounded-3xl border-2 border-amber-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Top Ribbons */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-red-600 text-white shadow-md tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    -{discountPercent}% IMMÉDIAT
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    🎁 CADEAU INCLUS
                  </span>
                </div>

                {/* Product Image Area */}
                <div
                  onClick={() => onQuickView(pack)}
                  className="w-full h-56 bg-gradient-to-b from-amber-50/40 to-slate-50 flex items-center justify-center p-6 cursor-pointer relative overflow-hidden"
                >
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-sm"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-extrabold uppercase text-pharmacy-800 tracking-wide">
                        {pack.brand}
                      </span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>

                    <h3 
                      onClick={() => onQuickView(pack)}
                      className="text-sm font-extrabold text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer min-h-[40px]"
                      title={pack.title}
                    >
                      {pack.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {pack.description}
                    </p>

                    {/* Savings Pill */}
                    <div className="mt-3 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-black flex items-center justify-between">
                      <span>Vous économisez :</span>
                      <span className="text-emerald-700 text-sm font-extrabold">+{savingsDH} DH</span>
                    </div>
                  </div>

                  {/* Pricing and Action CTAs */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xl sm:text-2xl font-black text-slate-950">
                          {pack.price} <span className="text-xs font-bold text-emerald-700">DH</span>
                        </span>
                        <span className="text-xs text-slate-400 line-through ml-2">
                          {pack.originalPrice} DH
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Paiement à la réception
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onQuickOrder(pack)}
                        className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Commander</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(pack)}
                        className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Au Panier</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
