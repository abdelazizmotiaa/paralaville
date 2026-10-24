import React from 'react';
import { 
  Stethoscope, 
  Instagram, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Sparkles,
  MapPin,
  Heart
} from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

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
                <p className="text-xs text-slate-300 mt-1 flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Pharmacie La Ville • Midelt, Maroc</span>
                </p>
              </div>

              {/* Instagram Profile */}
              <a
                href="https://www.instagram.com/dr.khaoulakamal"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-rose-200 hover:text-white transition-all group"
              >
                <Instagram className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                <span>@dr.khaoulakamal</span>
              </a>
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
