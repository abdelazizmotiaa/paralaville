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
  Sparkles,
  ExternalLink,
  Star,
  Instagram,
  Youtube
} from 'lucide-react';
import { 
  DISPLAY_PHONE, 
  WHATSAPP_PHONE,
  INSTAGRAM_URL,
  TIKTOK_URL,
  YOUTUBE_URL,
  GOOGLE_MAPS_SHARE_URL,
  PHARMACY_ADDRESS,
  PHARMACY_NAME,
  PHARMACIST_TITLE
} from '../utils/whatsapp';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.94-4.47V8.4a8.3 8.3 0 0 0 4.83 1.54v-3.25Z" />
  </svg>
);

export const MideltPharmacySection: React.FC = () => {
  return (
    <section id="pharmacie-midelt" className="py-12 sm:py-16 bg-gradient-to-b from-white via-rose-50/20 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider mb-2 border border-rose-200">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Localisation & Officine à Midelt</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
            Pharmacie & Parapharmacie La Ville — Midelt
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Retrouvez notre officine au cœur de Midelt dirigée par <strong className="text-rose-700">Dr. Khaoula Kamal</strong>. 
            Espace dermo-cosmétique certifié, compléments alimentaires, conseils pharmaceutiques et service de garde.
          </p>
        </div>

        {/* 2-Column Main Layout: Info Cards on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Official Google Place Details & Contact (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              {/* Header with Google Rating Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                    {PHARMACY_NAME}
                  </h3>
                  <p className="text-xs text-rose-700 font-extrabold mt-0.5">
                    Sous la direction de {PHARMACIST_TITLE}
                  </p>
                </div>

                {/* Google Place Rating Badge */}
                <a
                  href={GOOGLE_MAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-colors w-fit"
                  title="Consulter la fiche Google Maps officielle"
                >
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="font-black">4.9/5</span>
                  <span className="text-[10px] text-amber-800 font-semibold">(Avis Google)</span>
                </a>
              </div>

              {/* Information Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Address */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    Adresse Officine :
                  </span>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {PHARMACY_ADDRESS}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-bold pt-0.5">
                    ✓ Parking accessible & Centre-Ville
                  </p>
                </div>

                {/* Opening Hours */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    Horaires d'Ouverture :
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Lun - Sam :</strong> 08h30 – 21h00<br />
                    <strong className="text-slate-800">Dimanche & Nuit :</strong> Selon planning officiel de garde
                  </p>
                </div>
              </div>

              {/* Delivery Zones in & around Midelt */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-2 text-xs">
                <p className="font-bold text-emerald-950 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Livraison locale Express (en 2h à Midelt et communes voisines) :
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-emerald-900 font-semibold">
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">Midelt Centre</span>
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">Souk El Had</span>
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">Aïn Leuh</span>
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">Route d'Errachidia</span>
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">Boumia</span>
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">Zaïda</span>
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">Itzer</span>
                </div>
              </div>

              {/* Official Social Media Hub of Dr. Khaoula Kamal */}
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Suivez Dr. Khaoula Kamal sur les réseaux sociaux officiels :
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Instagram */}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram (@dr_khaoula_kamal)</span>
                  </a>

                  {/* TikTok */}
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  >
                    <TikTokIcon className="w-3.5 h-3.5" />
                    <span>TikTok (@dr.khaoula.kamal)</span>
                  </a>

                  {/* YouTube */}
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Google Maps Primary CTA */}
              <a
                href={GOOGLE_MAPS_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-xs shadow-md active:scale-95 transition-all"
              >
                <Navigation className="w-4 h-4 fill-current shrink-0" />
                <span>Ouvrir sur Google Maps (Itinéraire)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula / Pharmacie La Ville, je souhaite me renseigner sur la pharmacie à Midelt ou un produit.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp Officine</span>
              </a>

              {/* Phone CTA */}
              <a
                href={`tel:${DISPLAY_PHONE}`}
                className="flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors"
                title="Appeler l'officine"
              >
                <Phone className="w-4 h-4 text-rose-700" />
                <span className="font-mono">{DISPLAY_PHONE}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Interactive Map of Midelt (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between overflow-hidden relative">
            
            {/* Top Bar above Map */}
            <div className="flex items-center justify-between pb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-extrabold text-slate-800">
                  Plan & Accès Officine (Midelt)
                </span>
              </div>

              <a
                href={GOOGLE_MAPS_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
              >
                <span>Agrandir la carte</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Map Frame */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <iframe
                title="Carte Pharmacie & Parapharmacie La Ville Midelt"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-4.7500%2C32.6680%2C-4.7160%2C32.6920&amp;layer=mapnik&amp;marker=32.6800%2C-4.7330"
                className="w-full h-full"
                loading="lazy"
              />

              {/* Floating Reassurance Overlay on Bottom of Map */}
              <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-slate-200 shadow-lg flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">
                      Pharmacie & Parapharmacie La Ville
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      Centre-Ville, Midelt • Dr. Khaoula Kamal
                    </p>
                  </div>
                </div>

                <a
                  href={GOOGLE_MAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-[11px] font-extrabold shrink-0 shadow-xs active:scale-95 transition-all flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 fill-current" />
                  <span>GPS</span>
                </a>
              </div>
            </div>

            {/* Reassurance Footer below Map */}
            <div className="pt-3 px-1 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Pharmacie Référencée & Officielle
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                Service de garde assuré
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
