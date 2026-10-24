import React from 'react';
import { 
  X, 
  Percent, 
  Package, 
  Sparkles, 
  Baby, 
  Pill, 
  Leaf, 
  Camera, 
  MapPin, 
  Phone, 
  Instagram, 
  Youtube,
  MessageCircle, 
  Sun, 
  Scissors,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';
import { 
  DISPLAY_PHONE, 
  WHATSAPP_PHONE, 
  INSTAGRAM_URL, 
  TIKTOK_URL, 
  YOUTUBE_URL, 
  GOOGLE_MAPS_SHARE_URL 
} from '../utils/whatsapp';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.94-4.47V8.4a8.3 8.3 0 0 0 4.83 1.54v-3.25Z" />
  </svg>
);

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenPrescriptionModal: () => void;
  onOpenDiagnosticModal?: () => void;
  onScrollToSection: (sectionId: string) => void;
  selectedCategory: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenPrescriptionModal,
  onOpenDiagnosticModal,
  onScrollToSection,
  selectedCategory,
}) => {
  if (!isOpen) return null;

  const navItems = [
    {
      id: 'destockage',
      label: "DÉSTOCKAGE JUSQU'À -50%",
      icon: Percent,
      badge: '-50% OFF',
      badgeColor: 'bg-red-500 text-white',
      isHighlight: true,
      action: () => {
        onSelectCategory('destockage');
        onClose();
      },
    },
    {
      id: 'packs-promo',
      label: 'Packs & Coffrets Promo',
      icon: Package,
      badge: 'ÉCONOMIE',
      badgeColor: 'bg-amber-500 text-white',
      isHighlight: true,
      action: () => {
        onSelectCategory('packs-promo');
        onClose();
      },
    },
    {
      id: 'dermo-cosmetique',
      label: 'Dermo-Cosmétique (Visage & Corps)',
      icon: Sparkles,
      action: () => {
        onSelectCategory('dermo-cosmetique');
        onClose();
      },
    },
    {
      id: 'solaires',
      label: 'Protection Solaire SPF50+',
      icon: Sun,
      action: () => {
        onSelectCategory('solaires');
        onClose();
      },
    },
    {
      id: 'bebe-maternite',
      label: 'Bébé & Maternité (Soins pédiatriques)',
      icon: Baby,
      action: () => {
        onSelectCategory('bebe-maternite');
        onClose();
      },
    },
    {
      id: 'complements',
      label: 'Compléments Alimentaires & Santé',
      icon: Pill,
      action: () => {
        onSelectCategory('complements');
        onClose();
      },
    },
    {
      id: 'cheveux',
      label: 'Capillaire & Anti-Chute',
      icon: Scissors,
      action: () => {
        onSelectCategory('cheveux');
        onClose();
      },
    },
    {
      id: 'bio-naturel',
      label: 'Bio & Naturel Marocain',
      icon: Leaf,
      badge: '100% PURE',
      badgeColor: 'bg-emerald-600 text-white',
      action: () => {
        onSelectCategory('bio-naturel');
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 left-0 max-w-[320px] w-full bg-white shadow-2xl flex flex-col z-10 animate-slideRight">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-pharmacy-50/50 to-white">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Peau Quick CTA */}
        {onOpenDiagnosticModal && (
          <div className="px-3 pt-3">
            <button
              onClick={() => {
                onClose();
                onOpenDiagnosticModal();
              }}
              className="w-full p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl shadow-xs flex items-center justify-between active:scale-95 transition-all text-left"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                <div>
                  <div className="text-xs font-black">Diagnostic Peau Express</div>
                  <div className="text-[10px] text-amber-100">Routine sur-mesure en 30s</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* Prescription Quick Action Banner in Drawer */}
        <div className="p-3 bg-gradient-to-r from-pharmacy-800 to-pharmacy-700 text-white m-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5 text-gold-300" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold leading-tight">Envoyer une Ordonnance</p>
              <p className="text-[11px] text-pharmacy-200 mt-0.5">Photo WhatsApp instantanée</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPrescriptionModal();
              }}
              className="px-2.5 py-1.5 bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-colors"
            >
              Envoyer
            </button>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Rayons Parapharmacie
          </p>

          <button
            onClick={() => {
              onSelectCategory('all');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-pharmacy-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-pharmacy-500" />
              <span>Tous les Produits</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.id;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-pharmacy-600 text-white shadow-sm'
                    : item.isHighlight
                    ? 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : item.isHighlight ? 'text-red-500' : 'text-slate-500'}`} />
                  <span className={item.isHighlight && !isSelected ? 'font-bold' : ''}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-200 text-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
              </button>
            );
          })}

          <div className="pt-3 pb-1">
            <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Pharmacie & Services
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onScrollToSection('dr-khaoula');
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-pharmacy-600" />
              <span>Dr. Khaoula Kamal (Pharmacienne)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onClose();
              onScrollToSection('pharmacie-midelt');
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Pharmacie & Garde à Midelt</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Drawer Footer: Doctor & Instagram */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pharmacy-100 text-pharmacy-700 flex items-center justify-center font-bold text-sm border border-pharmacy-300">
              KK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Dr. Khaoula Kamal</p>
              <p className="text-[11px] text-slate-500 truncate">Pharmacienne Titulaire • Midelt</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-pink-50 text-pink-700 text-[11px] font-semibold hover:bg-pink-100 transition-colors"
            >
              <Instagram className="w-4 h-4 mb-0.5 text-pink-600" />
              <span>Instagram</span>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 transition-colors"
            >
              <TikTokIcon className="w-4 h-4 mb-0.5 text-white" />
              <span>TikTok</span>
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-red-50 text-red-600 text-[11px] font-semibold hover:bg-red-100 transition-colors"
            >
              <Youtube className="w-4 h-4 mb-0.5 text-red-600" />
              <span>YouTube</span>
            </a>
          </div>

          <a
            href={GOOGLE_MAPS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Itinéraire Google Maps (Midelt)</span>
          </a>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${DISPLAY_PHONE}`}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-pharmacy-600" />
              <span>Appeler</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
