import { CartItem, Product, OrderFormData } from '../types';

export const WHATSAPP_PHONE = '212676381441';
export const DISPLAY_PHONE = '+212 676-381441';
export const PHARMACY_NAME = 'Pharmacie & Parapharmacie La Ville';
export const PHARMACIST_TITLE = 'Dr. Khaoula Kamal';

/**
 * Builds the WhatsApp checkout URL from full order form data & cart items
 */
export function buildOrderWhatsAppUrl(formData: OrderFormData, items: CartItem[], totalAmount: number): string {
  const itemsText = items
    .map((item) => `• ${item.product.title} (x${item.quantity}) - ${item.product.price * item.quantity} DH`)
    .join('\n');

  const deliveryLabel = formData.deliveryMethod === 'midelt_express' 
    ? 'Livraison Express Midelt (Paiement à la livraison)' 
    : 'Livraison Partout au Maroc (Amana / CTM COD)';

  const message = `Bonjour Dr. Khaoula / Pharmacie La Ville, je souhaite commander :
- Produit(s) :
${itemsText}
- Total Commande : ${totalAmount} DH
- Nom & Prénom : ${formData.fullName}
- Téléphone : ${formData.phone}
- Ville & Adresse : ${formData.city}, ${formData.address}
- Mode de livraison : ${deliveryLabel}${formData.note ? `\n- Note / Demande : ${formData.note}` : ''}`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * 1-Click instant WhatsApp order for a single product directly
 */
export function buildSingleProductWhatsAppUrl(product: Product, quantity = 1, clientCity = 'Midelt'): string {
  const totalPrice = product.price * quantity;
  const message = `Bonjour Dr. Khaoula / Pharmacie La Ville, je souhaite commander :
- Produit : ${product.title} (x${quantity}) - ${totalPrice} DH
- Total Commande : ${totalPrice} DH
- Ville souhaitée : ${clientCity}
(Merci de me confirmer la disponibilité et le délai de livraison à la réception de ce message)`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp Prescription / Ordonnance consultation
 */
export function buildPrescriptionWhatsAppUrl(note = '', clientName = '', clientCity = 'Midelt'): string {
  const intro = `Bonjour Dr. Khaoula / Pharmacie La Ville,`;
  const body = clientName 
    ? `Je m'appelle ${clientName} (${clientCity}). Je vous transmets mon ordonnance ou la photo de mes médicaments / soins pour préparation et livraison.`
    : `Je vous transmets ci-joint mon ordonnance ou la photo de mes produits pour vérification et livraison.`;
  const notesText = note ? `\nNotes / Précisions : ${note}` : '';

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`${intro}\n${body}${notesText}`)}`;
}

/**
 * General advice with Dr. Khaoula Kamal
 */
export function buildAdviceWhatsAppUrl(topic = 'Conseil dermo-cosmétique'): string {
  const message = `Bonjour Dr. Khaoula Kamal, j'aimerais recevoir votre conseil pharmaceutique concernant : ${topic}.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
