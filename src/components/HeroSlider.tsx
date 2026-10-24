import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

interface HeroSliderProps {
  onExploreOffers: () => void;
  onOpenPrescriptionModal: () => void;
}

interface SlideItem {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimaryText: string;
  ctaPrimaryAction: () => void;
  ctaSecondaryText: string;
  ctaSecondaryLink?: string;
  ctaSecondaryAction?: () => void;
  bgGradient: string;
  image: string;
  pill: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onExploreOffers,
  onOpenPrescriptionModal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideItem[] = [
    {
      id: 1,
      badge: '🔥 GRANDES PROMOTIONS : JUSQU\'À -50% IMMÉDIAT',
      title: 'Vos Soins Dermo-Cosmétiques',
      subtitle: 'Au Meilleur Prix du Maroc',
      description: 'La Roche-Posay, CeraVe, SVR, Eucerin, Bioderma 100% authentiques. Payez en espèces à la livraison après avoir vérifié votre colis.',
      ctaPrimaryText: 'Profiter des Réductions',
      ctaPrimaryAction: onExploreOffers,
      ctaSecondaryText: 'Conseil Gratuit WhatsApp',
      ctaSecondaryLink: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula, j'aimerais profiter des promotions et recevoir votre conseil.")}`,
      bgGradient: 'from-emerald-950 via-pharmacy-900 to-slate-900',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
      pill: '🚚 Livraison Gratuite dès 150 DH à Midelt (le jour même)',
    },
    {
      id: 2,
      badge: '☀️ SPÉCIAL CLIMAT MAROCAIN : SOLAIRES & ANTI-TACHES',
      title: 'Packs Duo & Coffrets Économiques',
      subtitle: 'Le 2ème Produit à -50%',
      description: 'Protégez votre peau du soleil intense et éliminez les taches pigmentaires avec nos protocoles dermatologiques complets à prix réduit.',
      ctaPrimaryText: 'Voir les Packs Promo',
      ctaPrimaryAction: onExploreOffers,
      ctaSecondaryText: 'Diagnostic Peau Express',
      ctaSecondaryLink: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula, j'aimerais recevoir votre diagnostic personnalisé.")}`,
      bgGradient: 'from-amber-950 via-slate-900 to-emerald-950',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      pill: '🎁 Échantillons & Cadeaux offerts dans chaque colis',
    },
    {
      id: 3,
      badge: '🩺 PHARMACIE PHYSIQUE À MIDELT • SERVICE D\'ORDONNANCE',
      title: 'Besoin d\'un Médicament ou d\'un Conseil ?',
      subtitle: 'Dr. Khaoula Kamal à Votre Écoute',
      description: 'Envoyez la photo de votre ordonnance médicale sur WhatsApp. Votre pharmacienne prépare tout et vous livre à domicile en 2h à Midelt ou en 24-48h au Maroc.',
      ctaPrimaryText: 'Envoyer Mon Ordonnance',
      ctaPrimaryAction: onOpenPrescriptionModal,
      ctaSecondaryText: 'Discuter avec Dr. Khaoula',
      ctaSecondaryLink: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula, j'ai une question concernant un traitement ou un produit.")}`,
      bgGradient: 'from-slate-950 via-pharmacy-900 to-emerald-900',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
      pill: '⚡ Réponse rapide garantie par Dr. Khaoula Kamal',
    },
  ];

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background with overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95 transition-all duration-700`} />
      
      {/* Background image subtle overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25 filter blur-xs transition-all duration-1000"
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6 text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-gold-400/30 text-gold-300 text-[9px] sm:text-xs font-black tracking-wide">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-300 shrink-0" />
              <span>{slide.badge}</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-xl sm:text-4xl lg:text-5xl font-black tracking-tight font-serif leading-tight">
                {slide.title}
              </h1>
              <p className="text-base sm:text-2xl font-bold text-rose-300 mt-0.5 sm:mt-2">
                {slide.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* Key Assurance Mini Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 text-[10px] sm:text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-black/30 px-2 py-0.5 sm:py-1 rounded-lg border border-white/5">
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                <span>{slide.pill}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 px-2 py-0.5 sm:py-1 rounded-lg border border-white/5">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400" />
                <span>Paiement en espèces à la livraison</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-1">
              <button
                onClick={slide.ctaPrimaryAction}
                className="flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-rose-600 to-rose-700 hover:from-emerald-600 hover:to-rose-800 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-rose-950/40 active:scale-95 transition-all"
              >
                <span>{slide.ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {slide.ctaSecondaryLink ? (
                <a
                  href={slide.ctaSecondaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>{slide.ctaSecondaryText}</span>
                </a>
              ) : (
                <button
                  onClick={slide.ctaSecondaryAction}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>{slide.ctaSecondaryText}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Visual Column (Featured Floating Card) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative mx-auto max-w-sm">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-gold-400 to-pharmacy-600 opacity-30 blur-lg" />
              
              <div className="relative rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden shadow-2xl p-5 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-200">Recommandation du Jour</span>
                  </div>
                  <span className="text-[11px] font-bold text-gold-400">Dr. Khaoula Kamal</span>
                </div>

                <div className="py-4 flex gap-4 items-center">
                  <img
                    src={slide.image}
                    alt="Soin Vedette"
                    className="w-24 h-24 object-cover rounded-xl border border-white/10 shadow-md shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Top Vente Midelt
                    </span>
                    <p className="text-sm font-bold text-white line-clamp-2">
                      Routine Solaire & Anti-Taches Haute Tolérance
                    </p>
                    <p className="text-xs text-gold-300 font-extrabold">
                      Dès 149 DH <span className="text-[11px] text-slate-400 line-through font-normal">210 DH</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Stock garanti à la pharmacie</span>
                  <span className="text-emerald-400 font-semibold">✓ 100% Authentique</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Slide Indicators and Controls */}
        <div className="flex items-center justify-between pt-8 sm:pt-12 border-t border-white/10 mt-8">
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-gold-400' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Slide précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Slide suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
