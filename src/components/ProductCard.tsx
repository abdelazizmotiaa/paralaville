import React from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Eye, 
  Check, 
  Stethoscope,
  Zap
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickOrder?: (product: Product) => void;
  isAddedToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onQuickOrder,
  isAddedToCart = false,
}) => {
  const discount = product.discountPercent || 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const getBadgeStyle = () => {
    switch (product.badge) {
      case 'destockage':
        return 'bg-red-600 text-white';
      case 'promo':
        return 'bg-amber-500 text-white';
      case 'conseil_dr':
        return 'bg-rose-700 text-white';
      case 'coup_de_coeur':
        return 'bg-rose-500 text-white';
      case 'bestseller':
      default:
        return 'bg-slate-900 text-white';
    }
  };

  const getBadgeLabel = () => {
    switch (product.badge) {
      case 'destockage':
        return `SOLDES -${discount}%`;
      case 'promo':
        return `PROMO -${discount}%`;
      case 'conseil_dr':
        return `CONSEIL DR`;
      case 'coup_de_coeur':
        return `COUP DE CŒUR`;
      case 'bestseller':
      default:
        return `BESTSELLER`;
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-rose-400 shadow-2xs hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden group relative">
      
      {/* Top Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        <span className={`text-[8px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs tracking-wider ${getBadgeStyle()}`}>
          {getBadgeLabel()}
        </span>
        {product.isPack && (
          <span className="text-[7px] sm:text-[8px] font-black uppercase px-1 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
            PACK
          </span>
        )}
      </div>

      {/* Stock status indicator */}
      <div className="absolute top-2 right-2 z-10">
        <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="hidden sm:inline">En stock</span>
        </span>
      </div>

      {/* Product Image Area with responsive mobile height */}
      <div 
        onClick={() => onQuickView(product)}
        className="w-full h-36 sm:h-52 bg-gradient-to-b from-rose-50/20 to-slate-50/40 flex items-center justify-center p-2.5 sm:p-4 cursor-pointer relative overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-md hover:bg-slate-50 flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-rose-700" />
            <span>Aperçu</span>
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Volume */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] mb-0.5">
            <span className="font-extrabold uppercase tracking-wider text-rose-700 truncate">
              {product.brand}
            </span>
            {product.volumeOrSize && (
              <span className="text-slate-400 font-medium truncate ml-1 text-[9px] hidden sm:inline">
                {product.volumeOrSize}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-[11px] sm:text-xs font-bold text-slate-900 line-clamp-2 hover:text-rose-700 cursor-pointer min-h-[28px] sm:min-h-[32px] leading-tight"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-2 pt-2 border-t border-slate-100">
          {/* Prices in Moroccan Dirhams */}
          <div className="flex items-baseline justify-between mb-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                {product.price} <span className="text-[10px] sm:text-xs font-bold text-emerald-700">DH</span>
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {product.originalPrice > product.price && (
              <span className="text-[9px] sm:text-[10px] font-black text-red-600 bg-red-50 border border-red-200 px-1 sm:px-1.5 py-0.2 rounded">
                -{product.originalPrice - product.price} DH
              </span>
            )}
          </div>

          {/* Delivery tag */}
          <div className="text-[9px] text-slate-400 mb-2 truncate hidden sm:block">
            Paiement en espèces à la livraison
          </div>

          {/* High-Converting Action Buttons (Mobile-first responsive) */}
          <div className="grid grid-cols-2 gap-1.5">
            {/* 1-Click WhatsApp Quick Order */}
            <button
              onClick={() => onQuickOrder ? onQuickOrder(product) : onQuickView(product)}
              className="flex items-center justify-center gap-1 py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] sm:text-xs shadow-xs active:scale-95 transition-all truncate"
              title="Commander via WhatsApp"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current shrink-0" />
              <span className="truncate">1-Clic</span>
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(product)}
              className={`flex items-center justify-center gap-1 py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-[10px] sm:text-xs font-bold shadow-xs active:scale-95 transition-all truncate ${
                isAddedToCart
                  ? 'bg-rose-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isAddedToCart ? (
                <>
                  <Check className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span className="truncate">Ajouté</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 shrink-0" />
                  <span className="truncate">Panier</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
