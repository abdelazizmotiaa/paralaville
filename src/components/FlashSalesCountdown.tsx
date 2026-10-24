import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface FlashSalesCountdownProps {
  flashProducts: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FlashSalesCountdown: React.FC<FlashSalesCountdownProps> = ({
  flashProducts,
  onAddToCart,
  onQuickView,
}) => {
  // Real countdown timer initialized to 14 hours, 38 mins, 42 secs
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 }; // Reset cycle
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-red-500/5 to-emerald-500/5 border border-amber-200/80 rounded-2xl p-4 sm:p-6 shadow-sm my-8">
      {/* Header with Title and Countdown digits */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-red-500/20">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white tracking-wider animate-pulse">
                VENTE FLASH DU JOUR
              </span>
              <span className="text-xs text-amber-900 font-semibold hidden sm:inline">
                • Stocks Limités
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Jusqu'à -47% sur les Solaires, Sérums & Soins Culte
            </h3>
          </div>
        </div>

        {/* Live Timer Box */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-amber-200">
          <Clock className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-xs font-bold text-slate-700">Expire dans :</span>
          
          <div className="flex items-center gap-1 font-mono font-black text-xs sm:text-sm">
            <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-slate-900 font-bold">:</span>
            <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-slate-900 font-bold">:</span>
            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
        </div>

      </div>

      {/* Flash Product Cards Grid (Horizontal scroll on mobile, 3 cards on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {flashProducts.slice(0, 3).map((product) => {
          const discount = product.discountPercent || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col p-3.5 relative group"
            >
              {/* Promo Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                  -{discount}% OFF
                </span>
              </div>

              {/* Stock Warning */}
              <div className="absolute top-3 right-3 z-10 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Plus que {product.stockCount || 5} en stock
              </div>

              {/* Product Visual */}
              <div 
                onClick={() => onQuickView(product)}
                className="w-full h-40 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer relative"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="pt-3 flex-1 flex flex-col">
                <p className="text-[11px] font-bold text-pharmacy-700 uppercase tracking-wide">
                  {product.brand}
                </p>
                <h4 
                  onClick={() => onQuickView(product)}
                  className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-pharmacy-700 cursor-pointer mt-0.5"
                >
                  {product.title}
                </h4>

                {/* Pricing in Moroccan Dirhams */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {product.price} DH
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {product.originalPrice} DH
                  </span>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">
                    Économisez {product.originalPrice - product.price} DH
                  </span>
                </div>

                {/* Progress Bar of Sold Items */}
                <div className="mt-2.5 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>Ventes : 82%</span>
                    <span className="text-red-600 font-bold">Bientôt épuisé</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-red-600 rounded-full w-[82%]" />
                  </div>
                </div>

                {/* Dual Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-slate-100">
                  <a
                    href={buildSingleProductWhatsAppUrl(product, 1)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] shadow-xs active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                    <span>Ajouter</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
