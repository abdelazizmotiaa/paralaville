import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Truck, 
  ShieldCheck, 
  Navigation, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

export const MideltPharmacySection: React.FC = () => {
  return (
    <section id="pharmacie-midelt" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pharmacy-100 text-pharmacy-800 text-xs font-bold uppercase tracking-wider mb-2 border border-pharmacy-200">
            <MapPin className="w-3.5 h-3.5 text-pharmacy-700" />
            <span>Officine & Parapharmacie à Midelt</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
            Votre Nouvelle Adresse Santé & Beauté au Cœur de Midelt
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Ouverture prochaine de l'officine physique avec un espace dermo-cosmétique moderne, 
            service de garde et livraison express à domicile sur tout le grand Midelt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Local Midelt Focus (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    Pharmacie & Parapharmacie La Ville
                  </h3>
                  <p className="text-xs text-pharmacy-700 font-semibold">
                    Sous la direction de Dr. Khaoula Kamal
                  </p>
                </div>
                <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                  Ouverture Imminente
                </span>
              </div>

              {/* Local Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    Adresse Officine :
                  </span>
                  <p className="text-slate-600">
                    Avenue Principale, Centre-Ville<br />
                    Midelt, Région Drâa-Tafilalet, Maroc
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Horaires d'Ouverture :
                  </span>
                  <p className="text-slate-600">
                    Lundi au Samedi : 08h30 – 21h00<br />
                    Dimanche & Garde selon planning officiel
                  </p>
                </div>
              </div>

              {/* Delivery zones around Midelt */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-2">
                <p className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Zones couvertes par la livraison Express le jour même :
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-emerald-900 font-medium">
                  <span className="px-2 py-0.5 rounded bg-white border border-emerald-200">Midelt Centre</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-emerald-200">Quartier Souk El Had</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-emerald-200">Aïn Leuh</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-emerald-200">Route d'Errachidia</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-emerald-200">Boumia</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-emerald-200">Zaïda</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-emerald-200">Itzer</span>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula, j'aimerais me renseigner sur les horaires ou la disponibilité d'un produit à Midelt.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Contacter l'Officine sur WhatsApp</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-pharmacy-700" />
                <span>{DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Card 2: Pharmacie de Garde & Reassurance (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-pharmacy-800 to-pharmacy-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SERVICE DE GARDE MIDELT</span>
              </div>

              <h3 className="text-xl font-bold font-serif">
                Besoin d'un Médicament ou d'un Soin d'Urgence à Midelt ?
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Notre pharmacie participe aux tours de garde de la ville de Midelt. 
                En dehors des horaires habituels, contactez-nous directement par téléphone ou WhatsApp pour vérifier la pharmacie de garde en service ou préparer votre ordonnance.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Approvisionnement quotidien en médicaments et dermo-cosmétique</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Respect scrupuleux de la chaîne du froid (vaccins, insulines)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Paiement en espèces à la livraison sans aucun risque</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gold-300">
              <span className="font-semibold">Responsable : Dr. Khaoula Kamal</span>
              <span className="font-mono">{DISPLAY_PHONE}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
