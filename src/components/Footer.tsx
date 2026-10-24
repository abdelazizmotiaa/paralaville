import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Youtube,
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Clock, 
  HeartHandshake,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';
import { 
  DISPLAY_PHONE, 
  WHATSAPP_PHONE, 
  INSTAGRAM_URL, 
  TIKTOK_URL, 
  YOUTUBE_URL, 
  GOOGLE_MAPS_SHARE_URL,
  PHARMACY_ADDRESS 
} from '../utils/whatsapp';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.94-4.47V8.4a8.3 8.3 0 0 0 4.83 1.54v-3.25Z" />
  </svg>
);

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenPrescriptionModal: () => void;
  onOpenPharmacistModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPrescriptionModal,
  onOpenPharmacistModal,
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-12 pb-16 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Identity & Dr. Khaoula Kamal */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Pharmacie & Parapharmacie d'excellence à Midelt, gérée avec rigueur par <strong className="text-white">Dr. Khaoula Kamal</strong>. 
              Vente de dermo-cosmétique 100% certifiée, compléments alimentaires, puériculture et conseils personnalisés.
            </p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-rose-600 text-white hover:opacity-90 flex items-center justify-center transition-all shadow-xs"
                title="Instagram officiel : @dr_khaoula_kamal"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20"
                title="TikTok officiel : @dr.khaoula.kamal"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>

              {/* YouTube */}
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                title="Chaîne YouTube Dr. Khaoula Kamal"
              >
                <Youtube className="w-4 h-4" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all"
                title="WhatsApp Officiel"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>

              {/* Google Maps Pin */}
              <a
                href={GOOGLE_MAPS_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 hover:text-white hover:bg-amber-600 flex items-center justify-center transition-all"
                title="Fiche Google Maps"
              >
                <Navigation className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Column 2: Rayons Parapharmacie */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-4">
              Rayons & Produits
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('destockage')}
                  className="hover:text-red-400 text-red-400 font-bold transition-colors"
                >
                  🏷️ Déstockage Jusqu'à -50%
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('packs-promo')}
                  className="hover:text-white transition-colors"
                >
                  📦 Packs & Coffrets Promo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dermo-cosmetique')}
                  className="hover:text-white transition-colors"
                >
                  🧴 Dermo-Cosmétique (Anti-taches, Anti-acné)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('solaires')}
                  className="hover:text-white transition-colors"
                >
                  ☀️ Protections Solaires SPF50+
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bebe-maternite')}
                  className="hover:text-white transition-colors"
                >
                  👶 Bébé, Mustela & Maternité
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('complements')}
                  className="hover:text-white transition-colors"
                >
                  💊 Compléments, Magnésium & Vitamines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bio-naturel')}
                  className="hover:text-white transition-colors"
                >
                  🌿 Bio & Huile d'Argan Pure
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Engagements */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-4">
              Services Pharmaceutiques
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenPrescriptionModal}
                  className="hover:text-emerald-400 text-emerald-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  📸 Envoyer une Ordonnance en photo
                </button>
              </li>
              <li>
                <span className="text-slate-300 font-medium">💵 Paiement à la livraison (COD)</span>
              </li>
              <li>
                <span>🚚 Livraison le jour même sur Midelt</span>
              </li>
              <li>
                <span>📦 Expédition 24h-48h tout le Maroc (Amana/CTM)</span>
              </li>
              <li>
                <span>🩺 Conseils dermatologiques par Dr. Khaoula</span>
              </li>
              <li>
                <span>🏥 Service de garde et urgences Midelt</span>
              </li>
              {onOpenPharmacistModal && (
                <li className="pt-2 border-t border-slate-800">
                  <button
                    onClick={onOpenPharmacistModal}
                    className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-white font-bold transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Espace Titulaire • Dr. Khaoula (Ajouter Produits)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact & Officine Midelt */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-4">
              Contact & Officine Midelt
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p>{PHARMACY_ADDRESS}</p>
                  <a
                    href={GOOGLE_MAPS_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-amber-300 hover:text-amber-200 underline flex items-center gap-1 mt-0.5"
                  >
                    <span>Fiche Google Maps & Itinéraire</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${DISPLAY_PHONE}`} className="hover:text-white font-mono">
                  {DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 fill-current" />
                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 font-semibold"
                >
                  WhatsApp : +{WHATSAPP_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a 
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram : @dr_khaoula_kamal
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <TikTokIcon className="w-4 h-4 text-slate-200 shrink-0" />
                <a 
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  TikTok : @dr.khaoula.kamal
                </a>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-400">
                <span className="font-bold text-slate-200 block">Horaires officine :</span>
                Du Lundi au Samedi : 08h30 - 21h00<br />
                Permanence selon tableau de garde provincial
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Trademark */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} Pharmacie & Parapharmacie La Ville — Dr. Khaoula Kamal (paralaville.com). Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Produits 100% Originaux</span>
            <span>•</span>
            <span>Conformité Sanitaire Marocaine</span>
            <span>•</span>
            <span>Midelt & Tout le Maroc</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
