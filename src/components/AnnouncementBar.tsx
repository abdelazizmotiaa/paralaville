import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Clock, Instagram, PhoneCall, Gift, CheckCircle2 } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE, INSTAGRAM_URL } from '../utils/whatsapp';

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: '🚚 LIVRAISON GRATUITE : dès 150 DH à Midelt & dès 399 DH partout au Maroc !',
  },
  {
    icon: ShieldCheck,
    text: '💵 PAIEMENT À LA LIVRAISON (Espèces) : Vous vérifiez vos soins avant de payer !',
  },
  {
    icon: Gift,
    text: '🎁 CADEAU OFFERT : Échantillons dermatologiques inclus dans chaque commande !',
  },
  {
    icon: CheckCircle2,
    text: '🩺 100% PRODUITS AUTHENTIQUES : Agréés et contrôlés par Dr. Khaoula Kamal',
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-pharmacy-900 to-emerald-900 text-white text-xs py-2 px-3 border-b border-emerald-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Pharmacist Badge */}
        <div className="hidden lg:flex items-center gap-2 text-emerald-200">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold text-white text-[11px]">Officine ouverte à Midelt</span>
          <span className="text-emerald-400/60">|</span>
          <span className="text-gold-300 font-semibold text-[11px]">Dr. Khaoula Kamal</span>
        </div>

        {/* Center: Rotating Announcement */}
        <div className="flex-1 flex items-center justify-center text-center transition-all duration-500 min-h-[22px]">
          <div className="flex items-center gap-1.5 font-bold tracking-wide animate-fadeIn">
            <Icon className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="text-white text-[11px] sm:text-xs tracking-tight">{current.text}</span>
          </div>
        </div>

        {/* Right: Instagram & Direct Contact */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-emerald-200 shrink-0">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors group"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-300 group-hover:scale-110 transition-transform" />
            <span className="font-medium">@dr_khaoula_kamal</span>
          </a>
          <span className="text-emerald-500/60">|</span>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gold-300 hover:text-white font-extrabold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{DISPLAY_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
