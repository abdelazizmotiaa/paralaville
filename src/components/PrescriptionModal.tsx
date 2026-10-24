import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Phone, 
  MapPin, 
  FileText 
} from 'lucide-react';
import { buildPrescriptionWhatsAppUrl, DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ isOpen, onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [city, setCity] = useState('Midelt');
  const [notes, setNotes] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildPrescriptionWhatsAppUrl(notes, patientName, city);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-fadeIn">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-pharmacy-800 to-pharmacy-900 text-white">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-gold-300" />
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Service Gratuit & Rapide
              </span>
            </div>
            <h3 className="text-lg font-bold font-serif text-white mt-1">
              Envoyer une Ordonnance ou Photo de Soin
            </h3>
            <p className="text-xs text-pharmacy-200 mt-0.5">
              Dr. Khaoula Kamal analyse votre demande et vous prépare la livraison à Midelt ou partout au Maroc.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendToWhatsApp} className="p-5 space-y-4">
            
            {/* Photo Upload / Camera Area */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Photo de l'ordonnance ou de la boîte :
              </label>
              
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-pharmacy-500 rounded-xl p-4 cursor-pointer bg-slate-50 hover:bg-slate-100/60 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {previewImage ? (
                  <div className="relative w-full max-h-48 overflow-hidden rounded-lg">
                    <img
                      src={previewImage}
                      alt="Aperçu ordonnance"
                      className="w-full h-full object-contain"
                    />
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded absolute bottom-2 right-2">
                      Photo prête à l'envoi
                    </span>
                  </div>
                ) : (
                  <div className="text-center space-y-1.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <Camera className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      Prendre une photo ou choisir depuis la galerie
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Formats acceptés : JPG, PNG, PDF (Smartphone & Ordinateur)
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Votre Nom & Prénom :
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Fatima Zahra"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ville de livraison :
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Midelt (ou autre ville au Maroc)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500"
                />
                <MapPin className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Notes / Special questions */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Précisions, symptômes ou demande particulière :
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Traitement pour bébé de 6 mois, besoin d'un substitut ou conseil d'application..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 resize-none"
              />
            </div>

            {/* Reassurance pills */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Secret médical et confidentialité rigoureusement respectés</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Devis transparent envoyé sur WhatsApp avant toute expédition</span>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Transmettre à Dr. Khaoula Kamal sur WhatsApp</span>
            </button>

            <p className="text-[10px] text-center text-slate-400">
              WhatsApp officiel Pharmacie La Ville : +{WHATSAPP_PHONE}
            </p>

          </form>

        </div>
      </div>
    </div>
  );
};
