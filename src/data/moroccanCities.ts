import { MoroccanCity } from '../types';

export const MOROCCAN_CITIES: MoroccanCity[] = [
  // Local Midelt & neighboring towns
  { name: 'Midelt (Centre & Quartiers)', region: 'Drâa-Tafilalet', isMideltOrNearby: true, estimatedDelivery: 'Livraison le jour même (Gratuit dès 200 DH / 10 DH)' },
  { name: 'Midelt - Quartier Souk El Had', region: 'Drâa-Tafilalet', isMideltOrNearby: true, estimatedDelivery: 'Livraison le jour même (Express local)' },
  { name: 'Midelt - Aïn Leuh / Route d\'Errachidia', region: 'Drâa-Tafilalet', isMideltOrNearby: true, estimatedDelivery: 'Livraison le jour même' },
  { name: 'Boumia (Région Midelt)', region: 'Drâa-Tafilalet', isMideltOrNearby: true, estimatedDelivery: 'Livraison sous 24h' },
  { name: 'Itzer (Région Midelt)', region: 'Drâa-Tafilalet', isMideltOrNearby: true, estimatedDelivery: 'Livraison sous 24h' },
  { name: 'Zaïda (Région Midelt)', region: 'Drâa-Tafilalet', isMideltOrNearby: true, estimatedDelivery: 'Livraison sous 24h' },
  { name: 'Rich (Région Midelt)', region: 'Drâa-Tafilalet', isMideltOrNearby: true, estimatedDelivery: 'Livraison sous 24h' },

  // Drâa-Tafilalet & Atlas
  { name: 'Errachidia', region: 'Drâa-Tafilalet', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Amana / CTM)' },
  { name: 'Tinghir', region: 'Drâa-Tafilalet', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Amana / CTM)' },
  { name: 'Ouarzazate', region: 'Drâa-Tafilalet', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Amana / CTM)' },
  { name: 'Zagora', region: 'Drâa-Tafilalet', isMideltOrNearby: false, estimatedDelivery: '48h (Amana)' },

  // Imperial & Major Cities
  { name: 'Casablanca', region: 'Casablanca-Settat', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Voie Express / CTM)' },
  { name: 'Rabat', region: 'Rabat-Salé-Kénitra', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Voie Express / CTM)' },
  { name: 'Fès', region: 'Fès-Meknès', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Liaison directe Midelt)' },
  { name: 'Meknès', region: 'Fès-Meknès', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Liaison directe Midelt)' },
  { name: 'Marrakech', region: 'Marrakech-Safi', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Voie Express)' },
  { name: 'Tanger', region: 'Tanger-Tétouan-Al Hoceïma', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Voie Express)' },
  { name: 'Agadir', region: 'Souss-Massa', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Voie Express)' },
  { name: 'Salé', region: 'Rabat-Salé-Kénitra', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Kénitra', region: 'Rabat-Salé-Kénitra', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Tétouan', region: 'Tanger-Tétouan-Al Hoceïma', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Oujda', region: 'Oriental', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Nador', region: 'Oriental', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Safi', region: 'Marrakech-Safi', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Mohammedia', region: 'Casablanca-Settat', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'El Jadida', region: 'Casablanca-Settat', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Béni Mellal', region: 'Béni Mellal-Khénifra', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Khénifra', region: 'Béni Mellal-Khénifra', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Taza', region: 'Fès-Meknès', isMideltOrNearby: false, estimatedDelivery: '24h - 48h' },
  { name: 'Al Hoceïma', region: 'Tanger-Tétouan-Al Hoceïma', isMideltOrNearby: false, estimatedDelivery: '48h' },
  { name: 'Guelmim', region: 'Guelmim-Oued Noun', isMideltOrNearby: false, estimatedDelivery: '48h' },
  { name: 'Laâyoune', region: 'Laâyoune-Sakia El Hamra', isMideltOrNearby: false, estimatedDelivery: '48h - 72h' },
  { name: 'Dakhla', region: 'Dakhla-Oued Ed-Dahab', isMideltOrNearby: false, estimatedDelivery: '48h - 72h' },
  { name: 'Autre ville au Maroc (À préciser)', region: 'National', isMideltOrNearby: false, estimatedDelivery: '24h - 48h (Amana partout au Maroc)' }
];
