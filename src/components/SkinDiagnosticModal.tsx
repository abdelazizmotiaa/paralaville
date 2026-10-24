import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  MessageCircle, 
  ShoppingBag,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { WHATSAPP_PHONE } from '../utils/whatsapp';
import confetti from 'canvas-confetti';

interface SkinDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

interface RoutineStep {
  stepNumber: number;
  stepTitle: string;
  categoryLabel: string;
  product: Product;
}

export const SkinDiagnosticModal: React.FC<SkinDiagnosticModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenQuickView,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [skinConcern, setSkinConcern] = useState<string>('acne');
  const [skinType, setSkinType] = useState<string>('mixte_grasse');
  const [climate, setClimate] = useState<string>('midelt');

  if (!isOpen) return null;

  // Compute recommended routine based on answers
  const getRecommendedRoutine = (): RoutineStep[] => {
    let cleanserId = 'cerave-foaming-cleanser';
    let treatmentId = 'lrp-effaclar-duo-plus-m';
    let sunProtectionId = 'lrp-anthelios-uvmune-400';

    if (skinConcern === 'taches') {
      cleanserId = 'bioderma-sensibio-h2o-500ml';
      treatmentId = 'eucerin-anti-pigment-serum-duo';
      sunProtectionId = 'svr-sun-secure-blur';
    } else if (skinConcern === 'antiage') {
      cleanserId = 'cerave-hydrating-cleanser';
      treatmentId = 'vichy-mineral-89-serum';
      sunProtectionId = 'isdin-fusion-water-color';
    } else if (skinConcern === 'seche') {
      cleanserId = 'cerave-hydrating-cleanser';
      treatmentId = 'lrp-cicaplast-baume-b5-plus';
      sunProtectionId = 'lrp-anthelios-uvmune-400';
    } else if (skinConcern === 'cheveux') {
      cleanserId = 'vichy-dercos-anti-pelliculaire';
      treatmentId = 'cerave-foaming-cleanser';
      sunProtectionId = 'lrp-anthelios-uvmune-400';
    }

    const cleanser = PRODUCTS.find((p) => p.id === cleanserId) || PRODUCTS[0];
    const treatment = PRODUCTS.find((p) => p.id === treatmentId) || PRODUCTS[1];
    const sunscreen = PRODUCTS.find((p) => p.id === sunProtectionId) || PRODUCTS[2];

    return [
      {
        stepNumber: 1,
        stepTitle: 'Étape 1 : Nettoyer & Purifier',
        categoryLabel: 'Nettoyant dermatologique doux',
        product: cleanser,
      },
      {
        stepNumber: 2,
        stepTitle: 'Étape 2 : Traiter en Profondeur',
        categoryLabel: 'Sérum ciblé concentré',
        product: treatment,
      },
      {
        stepNumber: 3,
        stepTitle: 'Étape 3 : Protéger & Réparer',
        categoryLabel: 'Photoprotection & Barrière cutanée',
        product: sunscreen,
      },
    ];
  };

  const routine = getRecommendedRoutine();
  const totalPrice = routine.reduce((sum, item) => sum + item.product.price, 0);
  const originalTotalPrice = routine.reduce((sum, item) => sum + item.product.originalPrice, 0);
  const packPriceWithDiscount = Math.round(totalPrice * 0.9); // Extra 10% pack discount
  const totalSaved = originalTotalPrice - packPriceWithDiscount;

  const handleFinishDiagnostic = () => {
    setCurrentStep(3);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleOrderPackWhatsApp = () => {
    const routineItemsText = routine
      .map((r) => `• Étape ${r.stepNumber}: ${r.product.title} (${r.product.price} DH)`)
      .join('\n');

    const message = `Bonjour Dr. Khaoula Kamal / Pharmacie La Ville,
J'ai réalisé mon diagnostic de peau en ligne et je souhaite commander mon Pack Routine Personnalisé :
${routineItemsText}

💰 Prix Pack Spécial : ${packPriceWithDiscount} DH (au lieu de ${originalTotalPrice} DH)
Mon profil : Préoccupation: ${skinConcern}, Peau: ${skinType}, Climat: ${climate}.

Merci de me confirmer la préparation et la livraison (Paiement à la livraison).`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-pharmacy-800 via-pharmacy-700 to-emerald-800 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gold-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Diagnostic Express Offert
            </span>
            <span className="text-emerald-200 text-xs font-medium">
              Par Dr. Khaoula Kamal
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight">
            Votre Routine Sur-Mesure en 30 Secondes
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-lg">
            Répondez à 2 questions simples pour recevoir l'ordonnance dermo-cosmétique exacte adaptée à votre peau et au climat marocain.
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/15">
            <div className={`flex-1 h-1.5 rounded-full transition-all ${currentStep >= 1 ? 'bg-gold-400' : 'bg-white/20'}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-all ${currentStep >= 2 ? 'bg-gold-400' : 'bg-white/20'}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-all ${currentStep >= 3 ? 'bg-gold-400' : 'bg-white/20'}`} />
            <span className="text-[11px] font-bold text-white/90 ml-1">Étape {currentStep}/3</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Main Concern */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                1. Quelle est votre préoccupation principale actuellement ?
              </h3>
              <p className="text-xs text-slate-500">
                Sélectionnez le besoin prioritaire que vous souhaitez traiter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'acne', label: 'Boutons, Acné & Pores Dilatés', icon: '🔴', desc: 'Imperfections, excès de sébum et rougeurs' },
                  { id: 'taches', label: 'Taches Brunes, Mélasma & Teint Terne', icon: '☀️', desc: 'Taches de soleil, masque de grossesse ou cicatrices' },
                  { id: 'antiage', label: 'Rides, Ridules & Perte de Fermeté', icon: '✨', desc: 'Régénération, élasticité et hydratation repulpante' },
                  { id: 'seche', label: 'Peau Très Sèche, Tiraillements & Rougeurs', icon: '💧', desc: 'Barrière cutanée abîmée ou climat sec' },
                  { id: 'cheveux', label: 'Chute de Cheveux & Pellicules', icon: '🌿', desc: 'Cuir chevelu sensible, perte de densité' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSkinConcern(item.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      skinConcern === item.id
                        ? 'border-pharmacy-600 bg-pharmacy-50/70 ring-2 ring-pharmacy-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-pharmacy-700 hover:bg-pharmacy-800 text-white font-bold text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Skin Type & Climate */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                2. Votre type de peau et votre ville / région :
              </h3>

              {/* Skin Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Type de Peau :</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'mixte_grasse', label: 'Mixte à Grasse' },
                    { id: 'seche_sensible', label: 'Sèche / Sensible' },
                    { id: 'normale', label: 'Normale' },
                    { id: 'mature', label: 'Mature / Relâchée' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSkinType(t.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        skinType === t.id
                          ? 'border-pharmacy-600 bg-pharmacy-50 text-pharmacy-900'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Climate / Region */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700">Environnement & Climat :</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'midelt', label: '🏔️ Midelt & Région Atlas (Soleil intense, air sec et froid en hiver)' },
                    { id: 'national', label: '🌊 Autre ville marocaine (Casablanca, Rabat, Fès, etc.)' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setClimate(c.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        climate === c.id
                          ? 'border-pharmacy-600 bg-pharmacy-50 text-pharmacy-900'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Retour
                </button>
                <button
                  onClick={handleFinishDiagnostic}
                  className="px-6 py-2.5 rounded-xl bg-pharmacy-700 hover:bg-pharmacy-800 text-white font-bold text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Générer Ma Routine Sur-Mesure</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Recommended Routine Result */}
          {currentStep === 3 && (
            <div className="space-y-5">
              {/* Doctor prescription summary banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pharmacy-50 via-emerald-50 to-teal-50 border border-pharmacy-200 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-pharmacy-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Stethoscope className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-pharmacy-900">
                    Recommandation validée par Dr. Khaoula Kamal
                  </h4>
                  <p className="text-[11px] text-pharmacy-800 mt-0.5 leading-relaxed">
                    « Pour votre profil, l'association synergique de ces 3 soins cible directement l'origine du problème tout en renforçant la barrière protectrice face au climat marocain. »
                  </p>
                </div>
              </div>

              {/* 3 Steps Products List */}
              <div className="space-y-3">
                {routine.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-3 sm:p-3.5 rounded-2xl border border-slate-200 hover:border-pharmacy-300 bg-white flex items-center justify-between gap-3 shadow-2xs transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 p-1 flex items-center justify-center shrink-0 border border-slate-100">
                        <img
                          src={step.product.image}
                          alt={step.product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-pharmacy-700 uppercase tracking-wide">
                          <span className="w-4 h-4 rounded-full bg-pharmacy-100 text-pharmacy-800 flex items-center justify-center text-[9px] font-black">
                            {step.stepNumber}
                          </span>
                          <span>{step.stepTitle}</span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
                          {step.product.title}
                        </h5>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {step.product.brand} • {step.categoryLabel}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-black text-slate-900">
                        {step.product.price} <span className="text-[10px] text-pharmacy-700">DH</span>
                      </div>
                      <button
                        onClick={() => onAddToCart(step.product)}
                        className="mt-1 text-[10px] font-bold text-pharmacy-700 hover:text-pharmacy-900 hover:underline flex items-center gap-0.5 justify-end"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pack Pricing & WhatsApp CTA */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Offre Pack Routine Complète
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-white">
                        {packPriceWithDiscount} DH
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {originalTotalPrice} DH
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                        Économisez {totalSaved} DH (-10% Pack)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-300 text-right">
                    Paiement à la livraison<br />Livraison Express
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleOrderPackWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Commander le Pack via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      routine.forEach((r) => onAddToCart(r.product));
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Mettre les 3 soins au panier</span>
                  </button>
                </div>
              </div>

              {/* Reset Diagnostic */}
              <div className="text-center pt-1">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mx-auto font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refaire le diagnostic</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
