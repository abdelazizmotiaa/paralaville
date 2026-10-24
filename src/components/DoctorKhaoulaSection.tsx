import React from 'react';
import { 
  Stethoscope, 
  Instagram, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  HeartHandshake,
  Sparkles,
  MapPin
} from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

export const DoctorKhaoulaSection: React.FC = () => {
  return (
    <section id="dr-khaoula" className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="bg-gradient-to-br from-pharmacy-900 via-pharmacy-800 to-slate-950 rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Doctor Visual Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                {/* Gold ring around portrait */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-gold-500 via-gold-300 to-emerald-400 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative">
                    <img
                      src="https://images.unsplash.com/photo-1594824813511-28562d5d83a1?auto=format&fit=crop&w=600&q=80"
                      alt="Dr. Khaoula Kamal Pharmacienne"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Stethoscope Badge */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-slate-900 shadow-md">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold font-serif text-white tracking-wide">
                  Dr. Khaoula Kamal
                </h3>
                <p className="text-xs text-gold-300 font-bold uppercase tracking-wider mt-0.5">
                  Docteur en Pharmacie
                </p>
                <p className="text-xs text-slate-300 mt-1 flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pharmacie La Ville • Midelt, Maroc</span>
                </p>
              </div>

              {/* Instagram Profile Badge */}
              <a
                href="https://www.instagram.com/dr.khaoulakamal"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-pink-200 hover:text-white transition-all group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Suivre @dr.khaoulakamal</span>
              </a>
            </div>

            {/* Right: Medical Philosophy & Commitment */}
            <div className="lg:col-span-8 space-y-4 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>L'EXCELLENCE PHARMACEUTIQUE AU SERVICE DE VOTRE PEAU</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif leading-tight">
                « La dermo-cosmétique n'est pas qu'un soin de beauté, c'est une science de santé cutanée. »
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bienvenue chez <strong className="text-white">Pharmacie & Parapharmacie La Ville</strong>. 
                Installée à Midelt, ma mission est de rendre accessible à tous des conseils pharmaceutiques de pointe, 
                indépendants et rigoureux, ainsi que les plus grands laboratoires internationaux (La Roche-Posay, CeraVe, SVR, Mustela, Bioderma).
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Chaque produit proposé sur notre plateforme en ligne et à notre officine est <strong className="text-emerald-300">100% certifié authentique</strong>, 
                stocké dans des conditions de température contrôlées, et sélectionné pour répondre précisément aux besoins des peaux marocaines (soleil intense, sécheresse, taches, acné).
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1.5" />
                  <p className="text-xs font-bold text-white">Traçabilité 100%</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Approvisionnement direct laboratoires sans intermédiaire.</p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <Award className="w-5 h-5 text-gold-400 mb-1.5" />
                  <p className="text-xs font-bold text-white">Conseils Personnalisés</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Diagnostic dermo-cosmétique gratuit par WhatsApp.</p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <HeartHandshake className="w-5 h-5 text-teal-400 mb-1.5" />
                  <p className="text-xs font-bold text-white">Proximité & Écoute</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Livraison le jour même sur Midelt et 24-48h au Maroc.</p>
                </div>
              </div>

              {/* Direct Doctor WhatsApp CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Bonjour Dr. Khaoula Kamal, je souhaiterais avoir votre avis d'experte concernant ma peau.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Demander un conseil direct à Dr. Khaoula</span>
                </a>

                <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Service d'écoute disponible 7j/7</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
