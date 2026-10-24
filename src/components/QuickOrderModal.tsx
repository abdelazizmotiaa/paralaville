import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';
import { MOROCCAN_CITIES } from '../data/moroccanCities';
import { WHATSAPP_PHONE } from '../utils/whatsapp';
import confetti from 'canvas-confetti';

interface QuickOrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Midelt');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; address?: string }>({});

  if (!isOpen || !product) return null;

  const isMidelt = city.toLowerCase() === 'midelt';
  const deliveryCost = isMidelt ? 0 : 35;
  const totalPrice = product.price * quantity + deliveryCost;

  const validate = () => {
    const newErrors: { fullName?: string; phone?: string; address?: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Veuillez saisir votre nom et prénom';
    if (!phone.trim() || phone.trim().length < 8) newErrors.phone = 'Numéro de téléphone marocain invalide';
    if (!address.trim()) newErrors.address = 'Veuillez préciser votre adresse ou quartier';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    const deliveryText = isMidelt
      ? 'Livraison Express Midelt (GRATUITE - Paiement à la livraison)'
      : 'Livraison Partout au Maroc (35 DH - Amana/CTM COD)';

    const message = `Bonjour Dr. Khaoula / Pharmacie La Ville, je souhaite commander :
- Produit : ${product.title} (x${quantity}) - ${product.price * quantity} DH
- Frais de livraison : ${deliveryCost === 0 ? 'Gratuit (Midelt)' : `${deliveryCost} DH`}
- TOTAL À PAYER : ${totalPrice} DH
- Nom & Prénom : ${fullName}
- Téléphone : ${phone}
- Ville & Quartier : ${city}, ${address}
- Mode de livraison : ${deliveryText}${note ? `\n- Note : ${note}` : ''}`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      {/* Background touch dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative z-10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-pharmacy-800 text-white p-4 sm:p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Commande Express 1-Clic</span>
          </div>

          <h2 className="text-base sm:text-xl font-black font-serif tracking-tight">
            Commander & Payer à la Livraison
          </h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            Validation directe par WhatsApp auprès de Dr. Khaoula Kamal.
          </p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleConfirmOrder} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 pb-safe">
          {/* Product Mini Preview */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-100 flex items-center justify-center shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-pharmacy-700 uppercase tracking-wide">
                {product.brand}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {product.title}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-black text-slate-900">
                  {product.price} DH
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-white px-2 py-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-slate-500 hover:text-slate-800"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-slate-500 hover:text-slate-800"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nom & Prénom <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Ex: Fatima Zahra Alami"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full pl-9 pr-3 py-3 sm:py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 ${
                    errors.fullName ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.fullName && <p className="text-[10px] text-red-500 mt-0.5">{errors.fullName}</p>}
            </div>

            {/* WhatsApp Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Téléphone (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Ex: 06 71 23 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full pl-9 pr-3 py-3 sm:py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 ${
                    errors.phone ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
            </div>

            {/* City Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ville de livraison <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 appearance-none font-semibold cursor-pointer"
                  >
                    <option value="Midelt">⭐ Midelt (Livraison Express Gratuite)</option>
                    {MOROCCAN_CITIES.filter((c) => c.name !== 'Midelt').map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.estimatedDelivery})
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Address / Neighborhood */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adresse / Quartier <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="street-address"
                  placeholder="Ex: Hay Al Qods, Rue 5..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-3 py-3 sm:py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500 ${
                    errors.address ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-red-500 mt-0.5">{errors.address}</p>}
              </div>
            </div>

            {/* Note optional */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Remarque ou question pour Dr. Khaoula (Optionnel)
              </label>
              <input
                type="text"
                placeholder="Ex: Prévoir livraison en fin d'après-midi, conseil d'utilisation..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-pharmacy-500"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Sous-total ({quantity} {quantity > 1 ? 'articles' : 'article'}) :</span>
              <span className="font-bold">{product.price * quantity} DH</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Livraison ({city}) :</span>
              <span className="font-bold text-emerald-700">
                {deliveryCost === 0 ? 'Gratuite (Midelt)' : `${deliveryCost} DH`}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-extrabold text-slate-900">Total à payer à la livraison :</span>
              <span className="text-base font-black text-pharmacy-800">{totalPrice} DH</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Confirmer la Commande sur WhatsApp ({totalPrice} DH)</span>
          </button>

          <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Paiement à la réception • Produit 100% garanti par Dr. Khaoula</span>
          </p>
        </form>
      </div>
    </div>
  );
};
