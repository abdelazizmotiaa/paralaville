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
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
            Rayons Phares de la Parapharmacie
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sélectionnés & validés sous la supervision de Dr. Khaoula Kamal
          </p>
        </div>
        
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-pharmacy-700 hover:text-pharmacy-800 underline"
          >
            Voir tout le catalogue
          </button>
        )}
      </div>

      {/* Grid of rounded categories (horizontal scroll on small screens, 4 columns on md, 8 on lg) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all group ${
                isSelected
                  ? 'bg-pharmacy-50 border-pharmacy-500 shadow-sm ring-2 ring-pharmacy-500/20'
                  : 'bg-white border-slate-200/80 hover:border-pharmacy-300 hover:shadow-xs'
              }`}
            >
              {/* Circular image avatar */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold-400 via-emerald-400 to-pharmacy-600 mb-2 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
                {cat.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-slate-900 text-white whitespace-nowrap shadow-xs">
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <span className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 mt-1 ${
                isSelected ? 'text-pharmacy-800 font-extrabold' : 'text-slate-700 group-hover:text-pharmacy-700'
              }`}>
                {cat.name}
              </span>

              {/* Count */}
              <span className="text-[10px] text-slate-400 mt-0.5">
                {cat.count} soins
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
