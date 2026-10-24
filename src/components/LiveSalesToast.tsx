import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, X, MapPin } from 'lucide-react';

interface SaleNotification {
  customerName: string;
  city: string;
  productTitle: string;
  productImage: string;
  timeAgo: string;
  savings?: string;
}

const RECENT_SALES: SaleNotification[] = [
  {
    customerName: 'Fatima Z.',
    city: 'Midelt (Centre)',
    productTitle: 'Anthelios UVMune 400 SPF50+ Invisible',
    productImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=150&q=80',
    timeAgo: 'Il y a 3 minutes',
    savings: 'Économie : 55 DH',
  },
  {
    customerName: 'Amina B.',
    city: 'Fès',
    productTitle: 'Pack Duo Anti-Taches Thiamidol Eucerin',
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80',
    timeAgo: 'Il y a 7 minutes',
    savings: 'Économie : 91 DH',
  },
  {
    customerName: 'Youssef M.',
    city: 'Casablanca',
    productTitle: 'CeraVe Gel Moussant Anti-Rugosités SA',
    productImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80',
    timeAgo: 'Il y a 12 minutes',
    savings: 'Économie : 40 DH',
  },
  {
    customerName: 'Salma K.',
    city: 'Errachidia',
    productTitle: 'ISDIN Fotoprotector Fusion Water SPF50',
    productImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=150&q=80',
    timeAgo: 'Il y a 18 minutes',
    savings: 'Économie : 56 DH',
  },
  {
    customerName: 'Driss T.',
    city: 'Midelt (Hay Al Qods)',
    productTitle: 'Pack Bébé Premier Mois Mustela + Liniment',
    productImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=150&q=80',
    timeAgo: 'Il y a 24 minutes',
    savings: 'Économie : 85 DH',
  },
];

export const LiveSalesToast: React.FC = () => {
  const [currentSale, setCurrentSale] = useState<SaleNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show first toast after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setCurrentSale(RECENT_SALES[0]);
      setIsVisible(true);
    }, 3500);

    // Rotate every 12 seconds
    let currentIndex = 0;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % RECENT_SALES.length;
        setCurrentSale(RECENT_SALES[currentIndex]);
        setIsVisible(true);
      }, 600);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (!currentSale || isDismissed) return null;

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 max-w-xs sm:max-w-sm transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-emerald-200/90 flex items-center gap-3 relative">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 flex items-center justify-center text-[10px]"
          aria-label="Fermer la notification"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Thumbnail */}
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
          <img
            src={currentSale.productImage}
            alt={currentSale.productTitle}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{currentSale.customerName}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-emerald-600" />
              {currentSale.city}
            </span>
          </div>

          <p className="text-xs font-bold text-slate-900 truncate mt-0.5">
            {currentSale.productTitle}
          </p>

          <div className="flex items-center justify-between text-[10px] mt-0.5">
            <span className="text-slate-400">{currentSale.timeAgo}</span>
            {currentSale.savings && (
              <span className="font-extrabold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">
                {currentSale.savings}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
