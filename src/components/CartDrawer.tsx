import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200; // Free delivery in Midelt above 200 DH
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // WhatsApp quick text for the whole cart
  const buildCartWhatsAppText = () => {
    const list = items
      .map((i) => `• ${i.product.title} (x${i.quantity}) - ${i.product.price * i.quantity} DH`)
      .join('\n');
    return encodeURIComponent(
      `Bonjour Dr. Khaoula / Pharmacie La Ville, je souhaite commander mon panier :\n${list}\n\nTotal : ${subtotal} DH\nMerci de me préciser la livraison.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 animate-slideLeft">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pharmacy-700" />
            <h3 className="text-base font-bold text-slate-900">
              Votre Panier ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Midelt) */}
        <div className="p-3.5 bg-pharmacy-50/70 border-b border-pharmacy-100">
          <div className="flex items-center justify-between text-xs font-semibold text-pharmacy-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-pharmacy-600" />
              {remainingForFreeShipping > 0 ? (
                <>Plus que <strong className="text-pharmacy-700">{remainingForFreeShipping} DH</strong> pour la livraison gratuite à Midelt !</>
              ) : (
                <span className="text-emerald-700 font-bold">🎉 Félicitations ! Livraison Gratuite à Midelt activée</span>
              )}
            </span>
            <span className="text-[11px] font-bold text-slate-500">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-pharmacy-200/70 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-pharmacy-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-slate-800">Votre panier est vide</p>
              <p className="text-xs text-slate-500 max-w-xs">
                Découvrez nos routines dermo-cosmétiques recommandées par Dr. Khaoula Kamal.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-pharmacy-600 hover:bg-pharmacy-700 text-white font-bold text-xs transition-colors"
              >
                Parcourir les Soins
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs"
              >
                {/* Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase text-pharmacy-700 tracking-wide truncate">
                    {item.product.brand}
                  </p>
                  <p className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.product.title}
                  </p>
                  <p className="text-xs font-black text-slate-900 mt-0.5">
                    {item.product.price * item.quantity} DH
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 px-2 hover:bg-slate-100 text-slate-600 transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 px-2 hover:bg-slate-100 text-slate-600 transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Supprimer du panier"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & COD Checkout */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total produits :</span>
                <span className="font-bold text-slate-900">{subtotal} DH</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Mode de paiement :</span>
                <span className="font-bold text-emerald-700">Paiement à la livraison (COD)</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                <span>Total estimé :</span>
                <span className="text-lg text-pharmacy-800">{subtotal} DH</span>
              </div>
            </div>

            {/* Main Action: Open 1-Step Moroccan COD Form */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-pharmacy-700 hover:from-emerald-700 hover:to-pharmacy-800 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              <span>Commander (Paiement à la livraison)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Secondary: Send Whole Cart via WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${buildCartWhatsAppText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-xs hover:bg-emerald-100 active:scale-95 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Commander ce panier via WhatsApp direct</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="w-3 h-3 text-gold-500" />
              <span>Zéro avance bancaire • Vérification du colis à la livraison</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
