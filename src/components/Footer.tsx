import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Clock, 
  HeartHandshake 
} from 'lucide-react';
import { Logo } from './Logo';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenPrescriptionModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPrescriptionModal,
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
              Vente de dermo-cosmétique 100% certifiée, puériculture, compléments et conseils pharmaceutiques personnalisés.
            </p>
            
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/dr.khaoulakamal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-pink-500/20 text-pink-300 hover:text-white hover:bg-pink-600 flex items-center justify-center transition-all"
                title="Instagram Dr. Khaoula Kamal"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 hover:text-white hover:bg-emerald-600 flex items-center justify-center transition-all"
                title="WhatsApp Officiel"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
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
            </ul>
          </div>

          {/* Column 4: Contact & Officine Midelt */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-4">
              Contact & Officine
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  Centre-ville Midelt, Région Drâa-Tafilalet, Maroc
                </p>
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
                  href="https://www.instagram.com/dr.khaoulakamal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram : @dr.khaoulakamal
                </a>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-400">
                <span className="font-bold text-slate-200 block">Horaires officine :</span>
                Du Lundi au Samedi : 08h30 - 21h00<br />
                Permanence selon tableau de garde
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
