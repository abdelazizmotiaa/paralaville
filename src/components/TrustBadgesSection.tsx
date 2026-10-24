import React from 'react';
import { ShieldCheck, Truck, Banknote, Stethoscope } from 'lucide-react';

export const TrustBadgesSection: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: '100% Produits Authentiques',
      subtitle: 'Approvisionnement direct laboratoires agréés, traçabilité et dates de péremption garanties.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Truck,
      title: 'Livraison Rapide & Fiable',
      subtitle: 'Le jour même sur Midelt et communes voisines. 24h à 48h partout au Maroc via Amana & CTM.',
      color: 'text-pharmacy-700',
      bgColor: 'bg-pharmacy-50',
    },
    {
      icon: Banknote,
      title: 'Paiement à la Livraison (COD)',
      subtitle: 'Zéro risque : vous réglez votre commande en espèces au livreur uniquement après vérification du colis.',
      color: 'text-gold-600',
      bgColor: 'bg-gold-50',
    },
    {
      icon: Stethoscope,
      title: 'Conseils par Dr. Khaoula Kamal',
      subtitle: 'Accompagnement pharmaceutique personnalisé par une professionnelle de santé diplômée.',
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <section className="py-10 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all bg-slate-50/50"
              >
                <div className={`w-12 h-12 rounded-xl ${badge.bgColor} ${badge.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
