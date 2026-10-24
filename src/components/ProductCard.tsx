import React from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Sparkles, 
  Eye, 
  Check, 
  ShieldCheck, 
  Stethoscope 
} from 'lucide-react';
import { Product } from '../types';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isAddedToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
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
        return 'bg-pharmacy-700 text-gold-300 border border-gold-400/40';
      case 'coup_de_coeur':
        return 'bg-pink-600 text-white';
      case 'bestseller':
      default:
        return 'bg-slate-900 text-white';
    }
  };

  const getBadgeLabel = () => {
    switch (product.badge) {
      case 'destockage':
        return `DÉSTOCKAGE -${discount}%`;
      case 'promo':
        return `PROMO -${discount}%`;
      case 'conseil_dr':
        return `CONSEIL DR. KHAOULA`;
      case 'coup_de_coeur':
        return `COUP DE CŒUR`;
      case 'bestseller':
      default:
        return `BESTSELLER`;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-pharmacy-400/80 shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden group relative">
      
      {/* Top Badge (Discount or Doctor Advice) */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs tracking-wider ${getBadgeStyle()}`}>
          {getBadgeLabel()}
        </span>
        {product.isPack && (
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            PACK COMPLET
          </span>
        )}
      </div>

      {/* Stock status indicator */}
      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          En stock
        </span>
      </div>

      {/* Product Image Area with Hover Overlay */}
      <div 
        onClick={() => onQuickView(product)}
        className="w-full h-52 sm:h-56 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 cursor-pointer relative overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto px-4 py-2 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-lg hover:bg-white flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Eye className="w-4 h-4 text-pharmacy-700" />
            <span>Aperçu Rapide</span>
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Volume */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-bold uppercase tracking-wider text-pharmacy-700">
              {product.brand}
            </span>
            {product.volumeOrSize && (
              <span className="text-slate-400 font-medium">
                {product.volumeOrSize}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-pharmacy-700 cursor-pointer min-h-[36px]"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
          </div>

          {/* Doctor Advice Mini Tooltip/Quote */}
          {product.doctorAdvice && (
            <div className="mt-2 p-1.5 rounded-lg bg-pharmacy-50/70 border border-pharmacy-100/80 flex items-start gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-pharmacy-700 shrink-0 mt-0.5" />
              <p className="text-[10px] text-pharmacy-900 leading-snug line-clamp-1 italic">
                {product.doctorAdvice}
              </p>
            </div>
          )}
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          {/* Prices in Moroccan Dirhams */}
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {product.price} <span className="text-xs font-bold text-pharmacy-700">DH</span>
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {product.originalPrice} DH
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              COD Disponible
            </span>
          </div>

          {/* High-Converting Action Buttons: 1-Click WhatsApp & Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            {/* 1-Click WhatsApp Direct Order */}
            <a
              href={buildSingleProductWhatsAppUrl(product, 1)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs active:scale-95 transition-all group/btn"
              title="Commander immédiatement cet article via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0 group-hover/btn:scale-110 transition-transform" />
              <span className="truncate">WhatsApp</span>
            </a>

            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(product)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all ${
                isAddedToCart
                  ? 'bg-pharmacy-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isAddedToCart ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  <span>Ajouté</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Au Panier</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
