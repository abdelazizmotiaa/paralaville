import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = "Bonjour Pharmacie La Ville, j'ai besoin d'un conseil";
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end">
      
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 max-w-[240px] animate-fadeIn relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            aria-label="Fermer le message"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[11px] font-bold text-slate-900">Dr. Khaoula Kamal</span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Bonjour ! Besoin d'un conseil pour votre peau ou d'une ordonnance ? Je vous réponds sur WhatsApp.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors"
          >
            <Send className="w-3 h-3" />
            <span>Discuter maintenant</span>
          </a>

          {/* Little speech tail pointing down */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-200 transform rotate-45"></div>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-700/40 hover:shadow-emerald-700/60 hover:scale-105 active:scale-95 transition-all"
        aria-label="Contacter Dr. Khaoula sur WhatsApp"
      >
        {/* Animated pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none"></span>

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-xs group-hover:rotate-6 transition-transform" />

        {/* Online Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
      </a>

    </div>
  );
};
