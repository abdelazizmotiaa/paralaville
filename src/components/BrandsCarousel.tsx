import React from 'react';
import { BRANDS } from '../data/brands';
import { ShieldCheck } from 'lucide-react';

interface BrandsCarouselProps {
  selectedBrand: string;
  onSelectBrand: (brandName: string) => void;
}

export const BrandsCarousel: React.FC<BrandsCarouselProps> = ({
  selectedBrand,
  onSelectBrand,
}) => {
  return (
    <section className="py-6 border-y border-slate-200/70 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              Laboratoires Dermo-Cosmétiques Partenaires Officiels
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            100% Produits Français, Européens & Marocains Certifiés
          </span>
        </div>

        {/* Scrollable Brand Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => onSelectBrand('')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedBrand === ''
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Toutes les marques
          </button>

          {BRANDS.map((brand) => {
            const isSelected = selectedBrand.toLowerCase() === brand.name.toLowerCase();

            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(brand.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                  isSelected
                    ? 'bg-pharmacy-700 text-white border-pharmacy-700 shadow-xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-pharmacy-400 hover:bg-white'
                }`}
              >
                <span>{brand.name}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-medium ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {brand.country}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
