import React from 'react';
import { Truck, MapPin, CheckCircle2, ShieldCheck, Clock, Zap } from 'lucide-react';

export const MoroccoDeliveryCoverage: React.FC = () => {
  const regions = [
    {
      city: 'Midelt & Environs',
      sub: 'Boumia, Zaïda, Itzer, Aïn Leuh',
      delay: 'Livraison en 2h chrono',
      delayBadge: 'bg-emerald-600 text-white',
      price: 'GRATUIT dès 150 DH',
      isLocal: true,
    },
    {
      city: 'Grand Casablanca & Rabat-Salé',
      sub: 'Témara, Mohammédia, Dar Bouazza',
      delay: 'Livré en 24h',
      delayBadge: 'bg-rose-600 text-white',
      price: '35 DH (ou Offerte dès 399 DH)',
    },
    {
      city: 'Fès, Meknès & Errachidia',
      sub: 'Ifrane, Azrou, Rich, Goulmima',
      delay: 'Livré en 24h',
      delayBadge: 'bg-rose-600 text-white',
      price: '35 DH (ou Offerte dès 399 DH)',
    },
    {
      city: 'Marrakech, Tanger & Agadir',
      sub: 'Tétouan, Essaouira, Taroudant',
      delay: 'Livré en 24h - 48h',
      delayBadge: 'bg-slate-900 text-white',
      price: '35 DH (ou Offerte dès 399 DH)',
    },
    {
      city: 'Oujda, Nador & Oriental',
      sub: 'Berkane, Taourirt, Guercif',
      delay: 'Livré en 24h - 48h',
      delayBadge: 'bg-slate-900 text-white',
      price: '35 DH (ou Offerte dès 399 DH)',
    },
    {
      city: 'Provinces du Sud & Tout le Maroc',
      sub: 'Laâyoune, Dakhla, Ouarzazate, etc.',
      delay: 'Livré en 48h',
      delayBadge: 'bg-slate-800 text-white',
      price: 'Livraison Suivie Amana',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-y border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Couverture Nationale Partout au Maroc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
            Livraison Rapide à Votre Domicile
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tous nos produits sont <strong>100% en stock</strong> et expédiés le jour même. Paiement en espèces à la livraison.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {regions.map((r, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                r.isLocal 
                  ? 'bg-gradient-to-br from-emerald-50/70 to-white border-emerald-300 shadow-xs' 
                  : 'bg-slate-50/60 hover:bg-white border-slate-200/80 hover:border-rose-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${r.isLocal ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-700'}`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {r.city}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {r.sub}
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 mt-1">
                    {r.price}
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shrink-0 shadow-2xs ${r.delayBadge}`}>
                {r.delay}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-rose-50/60 border border-rose-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-rose-950 font-semibold text-center sm:text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Colis préparé sous contrôle de <strong>Dr. Khaoula Kamal</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Paiement en liquide uniquement après vérification</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <span>100% des soins sont disponibles immédiatement</span>
          </div>
        </div>

      </div>
    </section>
  );
};
