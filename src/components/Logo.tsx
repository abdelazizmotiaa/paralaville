import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer ${className}`}>
      {/* Official Moroccan Pharmacy Emblem: Circular Gold Border + Emerald Cross */}
      <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-gold-500 via-gold-400 to-gold-200 shadow-sm">
        <div className="w-full h-full rounded-full bg-gradient-to-b from-pharmacy-700 to-pharmacy-900 flex items-center justify-center p-1.5 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-radial from-emerald-400/20 to-transparent"></div>
          
          {/* Official Pharmacy Cross SVG */}
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Medical Cross */}
            <path
              d="M9 2H15C15.5523 2 16 2.44772 16 3V8H21C21.5523 8 22 8.44772 22 9V15C22 15.5523 21.5523 16 21 16H16V21C16 21.5523 15.5523 22 15 22H9C8.44772 22 8 21.5523 8 21V16H3C2.44772 16 2 15.5523 2 15V9C2 8.44772 2.44772 8 3 8H8V3C8 2.44772 8.44772 2 9 2Z"
              fill="#10B981"
            />
            <path
              d="M10 4H14V9H19V13H14V18H10V13H5V9H10V4Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif font-bold text-lg sm:text-xl tracking-tight leading-none ${
            variant === 'light' ? 'text-white' : 'text-slate-900'
          }`}>
            LA VILLE
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded bg-pharmacy-100 text-pharmacy-800 tracking-wider uppercase border border-pharmacy-200">
            PARA
          </span>
        </div>
        
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${
            variant === 'light' ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Dr. Khaoula Kamal
          </span>
          <span className="text-gold-500 text-[10px] font-bold">•</span>
          <span className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider ${
            variant === 'light' ? 'text-gold-300' : 'text-pharmacy-700'
          }`}>
            Midelt
          </span>
        </div>
      </div>
    </div>
  );
};
