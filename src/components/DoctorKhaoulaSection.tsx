import { 
  Stethoscope, 
  Instagram, 
  Youtube,
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Sparkles,
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';
import { 
  DISPLAY_PHONE, 
  WHATSAPP_PHONE, 
  INSTAGRAM_URL, 
  TIKTOK_URL, 
  YOUTUBE_URL, 
  GOOGLE_MAPS_SHARE_URL 
} from '../utils/whatsapp';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.94-4.47V8.4a8.3 8.3 0 0 0 4.83 1.54v-3.25Z" />
  </svg>
);

export const DoctorKhaoulaSection: React.FC = () => {
  return (
    <section id="dr-khaoula" className="py-10 sm:py-14 bg-rose-50/40 border-y border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 rounded-3xl text-white p-6 sm:p-10 shadow-xl relative overflow-hidden border border-rose-900/40">
          
          {/* Subtle rose glow */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-rose-500/15 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Doctor Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                {/* Rose gold ring */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-gold-300 to-emerald-400 shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative">
                    <img
                      src="https://images.unsplash.com/photo-1594824813511-28562d5d83a1?auto=format&fit=crop&w=600&q=80"
                      alt="Dr. Khaoula Kamal Pharmacienne"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-slate-900 shadow-md">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-xl font-bold font-serif text-white tracking-wide">
                  Dr. Khaoula Kamal
                </h3>
                <p className="text-xs text-rose-300 font-extrabold uppercase tracking-wider mt-0.5">
                  Docteur en Pharmacie
                </p>
                <a
                  href={GOOGLE_MAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-300 hover:text-white mt-1 inline-flex items-center justify-center gap-1 group transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span className="underline decoration-rose-500/50">Pharmacie La Ville • Midelt, Maroc</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white" />
                </a>
              </div>

              {/* Official Social Media Channels (Instagram, TikTok, YouTube) */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
                {/* Instagram */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  title="Instagram officiel : @dr_khaoula_kamal"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@dr_khaoula_kamal</span>
                </a>

                {/* TikTok */}
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  title="TikTok officiel : @dr.khaoula.kamal"
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                  <span>TikTok</span>
                </a>

                {/* YouTube */}
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  title="Chaîne YouTube Dr. Khaoula Kamal"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            {/* Right: Minimalist & Direct Message */}
            <div className="lg:col-span-8 space-y-4 text-left">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                <span>EXPERTISE SANTÉ & BEAUTÉ FÉMININE</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black font-serif leading-tight text-white">
                « Pour chaque femme, une routine pure & des compléments ciblés. »
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                J'ai sélectionné pour vous les compléments alimentaires les plus efficaces (collagène marin, cures anti-chute forcapil, magnésium, minceur) et les soins dermo-cosmétiques certifiés 100% authentiques.
              </p>

              {/* 3 Quick Cards (Minimalist & Direct) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-rose-400 mb-1" />
                  <p className="text-xs font-bold text-white">100% Authentique</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Direct laboratoires agréés.</p>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <Award className="w-5 h-5 text-gold-400 mb-1" />
                  <p className="text-xs font-bold text-white">Conseil Gratuit</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Par WhatsApp avec Dr. Khaoula.</p>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <Sparkles className="w-5 h-5 text-emerald-400 mb-1" />
                  <p className="text-xs font-bold text-white">Livraison Rapide</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">2h à Midelt, 24-48h au Maroc.</p>
                </div>
              </div>

              {/* Direct Doctor WhatsApp CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula, j'aimerais avoir votre conseil pour des compléments ou ma routine.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-rose-950/50 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Demander conseil à Dr. Khaoula sur WhatsApp</span>
                </a>

                <span className="text-xs text-rose-200/80 text-center sm:text-left font-medium">
                  Réponse rapide 7j/7
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
