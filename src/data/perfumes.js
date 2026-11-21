import { UPLOADED_PERFUMES } from './uploadedPerfumes';

export const WHATSAPP_PHONE = "237695261680";
export const WHATSAPP_DISPLAY = "+237 695261680";

export const PERFUMES_DATA = [...UPLOADED_PERFUMES];

export const formatFCFA = (amount) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount) + " FCFA";
};

// Keep the prefilled order short; the customer can fill in their town before sending.
export const createSingleProductWhatsAppLink = (perfume, selectedSize = null, quantity = 1) => {
  const size = selectedSize || perfume.sizes?.[0];
  const sizeLabel = size && size !== 'As pictured' ? ` (${size})` : '';
  const text = [
    'Bonjour Carelle, je souhaite commander :',
    `${perfume.name}${sizeLabel} × ${quantity}`,
    'Ma ville :'
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

// Concise bag checkout that includes the town entered by the customer.
export const createCartWhatsAppLink = (cartItems, city = '') => {
  const itemsList = cartItems.map((item) => {
    const sizeLabel = item.size && item.size !== 'As pictured' ? ` (${item.size})` : '';
    return `• ${item.name}${sizeLabel} × ${item.quantity}`;
  }).join('\n');
  const text = [
    'Bonjour Carelle, je souhaite commander :',
    itemsList,
    `Ma ville : ${city.trim()}`
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

export const createConsultationWhatsAppLink = (topic = "general") => {
  let msg = `Bonjour Carelle, je visite votre site Scented by Carelle et j'aimerais avoir un conseil personnalisé pour choisir mon parfum signature.`;
  if (topic === "custom-blend") {
    msg = `Bonjour Carelle, je souhaiterais en savoir plus sur la confection d'un parfum artisanal sur-mesure créé par vos soins.`;
  }
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
};
