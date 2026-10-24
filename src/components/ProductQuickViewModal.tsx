import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Stethoscope,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discount = product.discountPercent || 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
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
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden text-left animate-fadeIn">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Image */}
            <div className="p-6 bg-slate-50 flex flex-col items-center justify-center relative">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-72 object-contain rounded-lg drop-shadow-sm"
              />
              
              {product.volumeOrSize && (
                <span className="mt-3 text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                  Contenance : {product.volumeOrSize}
                </span>
              )}
            </div>

            {/* Right: Product Details & Actions */}
            <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase text-pharmacy-700 tracking-wider">
                    {product.brand}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">{product.subcategory || product.category}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewCount} avis certifiés)</span>
                </div>

                {/* Prices */}
                <div className="flex items-baseline gap-2.5 mt-3">
                  <span className="text-2xl font-black text-slate-900">
                    {product.price * quantity} DH
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      {product.originalPrice * quantity} DH
                    </span>
                  )}
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                </div>

                {/* Doctor Khaoula Kamal's Advice Quote */}
                {product.doctorAdvice && (
                  <div className="mt-3 p-3 rounded-xl bg-pharmacy-50 border border-pharmacy-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-pharmacy-800">
                      <Stethoscope className="w-4 h-4 text-pharmacy-600" />
                      <span>Conseil de Dr. Khaoula Kamal :</span>
                    </div>
                    <p className="text-xs text-pharmacy-950 mt-1 leading-relaxed italic">
                      {product.doctorAdvice}
                    </p>
                  </div>
                )}

                {/* Benefits */}
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs font-bold text-slate-800">Bénéfices clés :</p>
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Quantité :</span>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 px-2.5 hover:bg-slate-100 text-slate-600 active:scale-95 transition-all"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 px-2.5 hover:bg-slate-100 text-slate-600 active:scale-95 transition-all"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={buildSingleProductWhatsAppUrl(product, quantity)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>Commander via WhatsApp</span>
                  </a>

                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>Ajouter au Panier</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-emerald-600" />
                    Livraison Express Midelt
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-gold-500" />
                    Paiement à la livraison
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
