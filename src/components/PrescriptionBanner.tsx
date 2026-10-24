import React from 'react';
import { Camera, FileText, CheckCircle2, MessageCircle, Shield, ArrowRight } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

interface PrescriptionBannerProps {
  onOpenModal: () => void;
}

export const PrescriptionBanner: React.FC<PrescriptionBannerProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-gradient-to-r from-pharmacy-800 via-pharmacy-900 to-slate-900 text-white shadow-md relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Icon & Pitch */}
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-gold-500 to-gold-300 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-gold-500/20">
              <Camera className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Service 1-Clic Rapide
                </span>
                <span className="text-gold-400 text-xs font-semibold hidden sm:inline">• Validation sous 15 min</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold font-serif text-white mt-1">
                Commander par Ordonnance ou Photo de Produit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Prenez simplement en photo votre ordonnance médicale ou votre boîte de soin. 
                <strong className="text-emerald-300 font-semibold"> Dr. Khaoula Kamal</strong> vérifie le dosage, prépare votre commande et l'expédie avec paiement à la livraison.
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenModal}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Télécharger mon Ordonnance</span>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula / Pharmacie La Ville, je vous envoie mon ordonnance ou ma photo de produit pour commande et livraison.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Envoyer direct par WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Reassurance pills */}
        <div className="flex flex-wrap items-center justify-start lg:justify-start gap-4 sm:gap-6 mt-4 pt-4 border-t border-white/10 text-[11px] sm:text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Confidentialité médicale garantie</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vérification par Dr. Khaoula Kamal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-gold-400" />
            <span>Livraison le jour même sur Midelt</span>
          </div>
        </div>

      </div>
    </div>
  );
};
