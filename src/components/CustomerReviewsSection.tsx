import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  MessageSquareHeart,
  Truck,
  Heart
} from 'lucide-react';

interface Review {
  id: string;
  name: string;
  city: string;
  neighborhood?: string;
  rating: number;
  date: string;
  productBought: string;
  comment: string;
  verifiedBuyer: boolean;
  avatarBg: string;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Amina B.',
    city: 'Midelt',
    neighborhood: 'Centre-Ville',
    rating: 5,
    date: 'Il y a 2 jours',
    productBought: 'Anthelios UVMune 400 + Effaclar Duo+M',
    comment: 'Commande passée à 11h sur WhatsApp, reçue à mon domicile à Midelt à 13h30 ! Livraison ultra rapide et produits 100% originaux. Le conseil de Dr. Khaoula m\'a enfin débarrassée de mes imperfections.',
    verifiedBuyer: true,
    avatarBg: 'bg-emerald-600',
  },
  {
    id: 'rev-2',
    name: 'Salma K.',
    city: 'Errachidia',
    rating: 5,
    date: 'Il y a 5 jours',
    productBought: 'Anti-Pigment Sérum Duo Eucerin',
    comment: 'Superbe expérience ! Dr. Khaoula m\'a répondu personnellement sur WhatsApp pour m\'expliquer comment appliquer le sérum et la protection solaire. Colis parfaitement emballé, paiement à la livraison sans aucun souci.',
    verifiedBuyer: true,
    avatarBg: 'bg-teal-600',
  },
  {
    id: 'rev-3',
    name: 'Youssef M.',
    city: 'Fès',
    rating: 5,
    date: 'Il y a 1 semaine',
    productBought: 'Dercos Anti-Pelliculaire + CeraVe SA',
    comment: 'Après avoir eu de mauvaises surprises avec des contrefaçons sur d\'autres sites, je commande désormais les yeux fermés chez Pharmacie La Ville. La caution d\'une vraie pharmacienne diplômée fait toute la différence.',
    verifiedBuyer: true,
    avatarBg: 'bg-blue-600',
  },
  {
    id: 'rev-4',
    name: 'Fatima-Zahra L.',
    city: 'Casablanca',
    rating: 5,
    date: 'Il y a 10 jours',
    productBought: 'Pack Cicaplast B5+ et Huile Lavante Bioderma',
    comment: 'Reçu à Casablanca en 48h par Amana. Échantillons offerts dans le colis, c\'est très attentionné. Je recommande à 100% !',
    verifiedBuyer: true,
    avatarBg: 'bg-rose-600',
  },
  {
    id: 'rev-5',
    name: 'Driss T.',
    city: 'Midelt',
    neighborhood: 'Quartier Al Qods',
    rating: 5,
    date: 'Il y a 2 semaines',
    productBought: 'Envoi d\'ordonnance médicale',
    comment: 'J\'ai juste envoyé la photo de mon ordonnance sur WhatsApp. La commande était prête 20 minutes plus tard à la pharmacie avec tous les conseils d\'utilisation. Service exceptionnel pour Midelt !',
    verifiedBuyer: true,
    avatarBg: 'bg-amber-600',
  },
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Avis & Confiance Locale</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
              Ce que nos patientes & clientes disent
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Des milliers de commandes livrées à Midelt et dans tout le Royaume avec un taux de satisfaction de 99.4%.
            </p>
          </div>

          {/* Aggregate Rating Badge */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
            <div className="text-3xl sm:text-4xl font-black text-slate-900">4.9</div>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-[11px] font-semibold text-slate-600 mt-0.5">
                Sur plus de 1 200 avis vérifiés
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: User avatar, name, location, and verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${review.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{review.name}</span>
                        {review.verifiedBuyer && (
                          <span title="Acheteuse vérifiée">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{review.city} {review.neighborhood ? `(${review.neighborhood})` : ''}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  « {review.comment} »
                </p>
              </div>

              {/* Product Bought Badge */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Achat vérifié :</span>
                <span className="font-bold text-pharmacy-800 truncate max-w-[200px]">
                  {review.productBought}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-pharmacy-800 to-teal-900 text-white grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gold-400">100%</div>
            <div className="text-xs text-emerald-100 font-medium mt-0.5">Produits Authentiques Certifiés</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gold-400">2h - 4h</div>
            <div className="text-xs text-emerald-100 font-medium mt-0.5">Livraison Express à Midelt</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gold-400">24h - 48h</div>
            <div className="text-xs text-emerald-100 font-medium mt-0.5">Partout au Maroc (COD)</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gold-400">100%</div>
            <div className="text-xs text-emerald-100 font-medium mt-0.5">Conseil par Pharmacien Diplômé</div>
          </div>
        </div>

      </div>
    </section>
  );
};
