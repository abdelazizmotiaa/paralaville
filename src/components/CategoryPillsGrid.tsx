import React from 'react';
import { CATEGORIES } from '../data/categories';

interface CategoryPillsGridProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const CategoryPillsGrid: React.FC<CategoryPillsGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900">
            Rayons Phares
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Sélectionnés par Dr. Khaoula Kamal
          </p>
        </div>
        
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-rose-700 hover:text-rose-800 underline"
          >
            Tous les soins
          </button>
        )}
      </div>

      {/* Touch-optimized horizontal scroll row on mobile, 8-column grid on desktop */}
      <div className="flex md:grid md:grid-cols-8 gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 w-20 sm:w-auto flex flex-col items-center p-2 sm:p-3 rounded-2xl border text-center transition-all snap-start active:scale-95 ${
                isSelected
                  ? 'bg-rose-50/80 border-rose-500 shadow-xs ring-2 ring-rose-400/20'
                  : 'bg-white border-slate-200/80 hover:border-rose-300'
              }`}
            >
              {/* Circular image avatar */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-rose-400 via-amber-300 to-emerald-400 mb-1.5 shrink-0 shadow-2xs">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
                {cat.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] sm:text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full bg-slate-900 text-white whitespace-nowrap shadow-xs">
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <span className={`text-[10px] sm:text-xs font-bold leading-tight line-clamp-2 mt-0.5 ${
                isSelected ? 'text-rose-900 font-black' : 'text-slate-700'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
