import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  User, 
  FileText, 
  MessageCircle, 
  Clock, 
  ChevronDown 
} from 'lucide-react';
import { CartItem, OrderFormData } from '../types';
import { MOROCCAN_CITIES } from '../data/moroccanCities';
import { buildOrderWhatsAppUrl, DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    city: 'Midelt (Centre & Quartiers)',
    address: '',
    deliveryMethod: 'midelt_express',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderRef, setConfirmedOrderRef] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Delivery cost calculation
  const isMidelt = formData.city.toLowerCase().includes('midelt');
  let deliveryFee = 0;
  if (isMidelt || formData.deliveryMethod === 'midelt_express') {
    deliveryFee = subtotal >= 200 ? 0 : 10;
  } else {
    deliveryFee = subtotal >= 500 ? 0 : 35;
  }
  const totalAmount = subtotal + deliveryFee;

  const handleCityChange = (cityName: string) => {
    const isLocal = cityName.toLowerCase().includes('midelt') || 
                    cityName.toLowerCase().includes('boumia') || 
                    cityName.toLowerCase().includes('itzer') || 
                    cityName.toLowerCase().includes('zaïda');
    
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      deliveryMethod: isLocal ? 'midelt_express' : 'national_standard',
    }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Veuillez remplir votre nom, numéro de téléphone et adresse complète.');
      return;
    }

    setIsSubmitting(true);

    // Generate Moroccan Order Reference e.g. LV-8492
    const ref = `LV-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderRef(ref);

    // Build the pre-formatted WhatsApp link
    const targetUrl = buildOrderWhatsAppUrl(formData, items, totalAmount);
    setWhatsAppUrl(targetUrl);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#D4AF37', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }

    // Automatically trigger WhatsApp in new tab
    setTimeout(() => {
      window.open(targetUrl, '_blank');
      setOrderConfirmed(true);
      setIsSubmitting(false);
      onOrderSuccess();
    }, 500);
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

          {!orderConfirmed ? (
            /* --- ORDER FORM (3 Zero-friction fields) --- */
            <div>
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-pharmacy-800 to-pharmacy-900 text-white">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Commande Express 1-Étape
                </span>
                <h3 className="text-lg font-bold font-serif text-white mt-1">
                  Paiement à la Livraison (Cash on Delivery)
                </h3>
                <p className="text-xs text-pharmacy-200 mt-0.5">
                  Aucun paiement en ligne requis • Réglez en espèces à la réception de votre colis.
                </p>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmitOrder} className="p-5 space-y-4">
                
                {/* Field 1: Nom complet */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    1. Nom & Prénom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Ex: Fatima Zahra El Idrissi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 focus:bg-white"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Field 2: Téléphone WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    2. Numéro de Téléphone (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 06 71 58 11 67 ou 06 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 focus:bg-white"
                    />
                    <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Dr. Khaoula Kamal vous enverra la confirmation et le suivi de livraison sur ce numéro.
                  </p>
                </div>

                {/* Field 3: Ville & Adresse */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    3. Ville & Adresse de Livraison <span className="text-red-500">*</span>
                  </label>

                  {/* Moroccan City Dropdown */}
                  <div className="relative">
                    <select
                      value={formData.city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 focus:bg-white appearance-none cursor-pointer"
                    >
                      {MOROCCAN_CITIES.map((city, idx) => (
                        <option key={idx} value={city.name}>
                          {city.name} — {city.estimatedDelivery}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Detailed Address */}
                  <textarea
                    required
                    rows={2}
                    placeholder="Quartier, Rue, N° de maison / appartement, repère..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 focus:bg-white resize-none"
                  />
                </div>

                {/* Optional Note for Pharmacist */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Question ou précision pour Dr. Khaoula Kamal (Facultatif) :
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Confirmer le type de peau, emballage cadeau, etc."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500"
                  />
                </div>

                {/* Delivery Option Summary Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Articles ({items.reduce((a, b) => a + b.quantity, 0)}) :</span>
                    <span className="font-bold text-slate-900">{subtotal} DH</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-pharmacy-600" />
                      Frais de livraison :
                    </span>
                    <span className="font-bold text-slate-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-bold">GRATUITE</span>
                      ) : (
                        `${deliveryFee} DH`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                    <span>Total à régler au livreur :</span>
                    <span className="text-lg font-black text-pharmacy-800">{totalAmount} DH</span>
                  </div>
                </div>

                {/* Large Green Moroccan COD CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-pharmacy-700 hover:from-emerald-700 hover:to-pharmacy-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-700/30 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                  <span>
                    {isSubmitting
                      ? 'Génération de la commande...'
                      : 'Confirmer la Commande (Paiement à la livraison)'}
                  </span>
                </button>

                {/* Reassurance text */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span>Envoi direct et sécurisé vers le WhatsApp officiel de Pharmacie La Ville</span>
                </div>

              </form>
            </div>
          ) : (
            /* --- ORDER CONFIRMED SCREEN --- */
            <div className="p-6 sm:p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Commande Enregistrée !
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-2">
                  Merci {formData.fullName} !
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Votre commande <strong className="text-slate-900 font-mono">#{confirmedOrderRef}</strong> a bien été préparée pour Dr. Khaoula Kamal.
                </p>
              </div>

              {/* Order Recap Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-semibold border-b border-slate-200 pb-2">
                  <span>Destinataire :</span>
                  <span className="text-slate-900">{formData.fullName} ({formData.phone})</span>
                </div>
                <div className="flex justify-between font-semibold border-b border-slate-200 pb-2">
                  <span>Lieu de livraison :</span>
                  <span className="text-slate-900">{formData.city}</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-1">
                  <span>Montant en espèces à préparer :</span>
                  <span className="text-pharmacy-800 font-black">{totalAmount} DH</span>
                </div>
              </div>

              {/* Re-Open WhatsApp Button */}
              <div className="space-y-2 pt-2">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Ouvrir WhatsApp pour finaliser avec Dr. Khaoula</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Continuer mes achats sur la parapharmacie
                </button>
              </div>

              <div className="pt-2 text-[10px] text-slate-400">
                Service client direct de Pharmacie La Ville Midelt : {DISPLAY_PHONE}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
