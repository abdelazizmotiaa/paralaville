import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Clock, Instagram, PhoneCall } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: '✨ Livraison Express sur Midelt (le jour même) & Partout au Maroc (24-48h) — Paiement à la livraison',
  },
  {
    icon: ShieldCheck,
    text: '🩺 Gérée par Dr. Khaoula Kamal — Produits 100% Authentiques & Direct Laboratoires',
  },
  {
    icon: Clock,
    text: '🚚 Livraison Gratuite à Midelt à partir de 200 DH | National dès 500 DH',
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-gradient-to-r from-pharmacy-800 via-pharmacy-700 to-pharmacy-900 text-white text-xs py-2 px-3 border-b border-pharmacy-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Pharmacist Badge */}
        <div className="hidden lg:flex items-center gap-2 text-pharmacy-200">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-medium text-white">Pharmacie ouverte à Midelt</span>
          <span className="text-pharmacy-400">|</span>
          <span className="text-gold-300 font-medium">Dr. Khaoula Kamal</span>
        </div>

        {/* Center: Rotating Announcement */}
        <div className="flex-1 flex items-center justify-center text-center transition-all duration-500 min-h-[22px]">
          <div className="flex items-center gap-1.5 font-medium tracking-wide animate-fadeIn">
            <Icon className="w-3.5 h-3.5 text-gold-300 shrink-0" />
            <span className="text-slate-100 text-[11px] sm:text-xs">{current.text}</span>
          </div>
        </div>

        {/* Right: Instagram & Direct Contact */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-pharmacy-200 shrink-0">
          <a
            href="https://www.instagram.com/dr.khaoulakamal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors group"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-300 group-hover:scale-110 transition-transform" />
            <span>@dr.khaoulakamal</span>
          </a>
          <span className="text-pharmacy-500">|</span>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gold-300 hover:text-white font-semibold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{DISPLAY_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
