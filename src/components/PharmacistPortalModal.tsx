import React, { useState, useRef } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Sparkles, 
  Upload, 
  Download, 
  RefreshCw, 
  Package, 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Search,
  SlidersHorizontal,
  Flame,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import confetti from 'canvas-confetti';

interface PharmacistPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
}

// 12 Popular Moroccan Parapharmacy Presets for 1-Click Instant Adding
const POPULAR_PRESETS: Partial<Product>[] = [
  {
    title: 'Bioderma Photoderm Max SPF50+ Fluide Invisible (40ml)',
    brand: 'Bioderma',
    category: 'solaires',
    price: 185,
    originalPrice: 230,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'Protection solaire très haute tolérance pour peaux sensibles et mixtes sous le soleil marocain. Fini mat sans traces blanches.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Indispensable au quotidien à Midelt pour prévenir les taches brunes et le photo-vieillissement. »',
    badge: 'bestseller',
  },
  {
    title: 'ISDIN Fusion Water MAGIC SPF50+ Sans Teinte (50ml)',
    brand: 'ISDIN',
    category: 'solaires',
    price: 219,
    originalPrice: 265,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    description: 'Protection solaire à phase aqueuse ultra-légère. Absorption immédiate, ne pique pas les yeux et hydrate intensément.',
    doctorAdvice: 'Dr. Khaoula Kamal : « La crème solaire la plus demandée par les femmes actives qui se maquillent par-dessus. »',
    badge: 'bestseller',
  },
  {
    title: 'SVR Clairial Ampoule Anti-Taches & Éclat (30ml)',
    brand: 'SVR',
    category: 'dermo-cosmetique',
    price: 335,
    originalPrice: 395,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: 'Concentré triple action qui corrige et réduit visiblement les taches brunes dès 14 jours tout en illuminant le teint.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Formidable synergie avec le Complexe Dépigmentant 14% pour unifier le teint sans agresser l\'épiderme. »',
    badge: 'coup_de_coeur',
  },
  {
    title: 'Avène Cicalfate+ Crème Réparatrice Protectrice (40ml)',
    brand: 'Avène',
    category: 'dermo-cosmetique',
    price: 110,
    originalPrice: 135,
    image: 'https://images.unsplash.com/photo-1556228722-d0b5de70b798?auto=format&fit=crop&w=600&q=80',
    description: 'Soin apaisant et réparateur pour les peaux irritées, gerçures de froid et échauffements cutanés de toute la famille.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Le tube de secours indispensable dans chaque foyer pour calmer irritations et cicatrices. »',
    badge: 'bestseller',
  },
  {
    title: 'Biocyte Collagène Express Marin 10 000mg (10 Sticks)',
    brand: 'Biocyte',
    category: 'complements',
    price: 260,
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'Cure anti-âge haute concentration en peptides de collagène marin pour lisser les rides et redensifier la peau.',
    doctorAdvice: 'Dr. Khaoula Kamal : « À prendre dilué dans un verre d\'eau le matin pendant 1 mois. Résultats visibles sur l\'élasticité de la peau. »',
    badge: 'nouveau',
  },
  {
    title: 'Ducray Anacaps Reactiv Anti-Chute Réactionnelle (30 Gélules)',
    brand: 'Ducray',
    category: 'cheveux',
    price: 285,
    originalPrice: 340,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    description: 'Fortifie le cheveu et stimule la repousse lors des chutes temporaires (stress, post-partum, changement de saison).',
    doctorAdvice: 'Dr. Khaoula Kamal : « Contient de la biotine, du fer et des acides aminés soufrés indispensables à la kératine. »',
    badge: 'promo',
  },
  {
    title: 'Mustela Gel Lavant Doux Corps & Cheveux Bébé (500ml)',
    brand: 'Mustela',
    category: 'bebe-maternite',
    price: 95,
    originalPrice: 125,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    description: 'Nettoie efficacement tout en respectant la peau délicate et le cuir chevelu du nourrisson dès la naissance.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Formule 93% naturelle, biodégradable et sans savon qui ne pique pas les yeux. »',
    badge: 'bestseller',
  },
  {
    title: 'Arkopharma Magnésium Marin + Vitamine B6 (30 Gélules)',
    brand: 'Arkopharma',
    category: 'complements',
    price: 135,
    originalPrice: 165,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
    description: 'Contribue à réduire la fatigue et favorise un fonctionnement normal du système nerveux et musculaire.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Excellente biodisponibilité marine, parfaitement tolérée au niveau digestif. »',
    badge: 'promo',
  },
  {
    title: 'La Roche-Posay Effaclar Duo+ M Soin Triple Correction (40ml)',
    brand: 'La Roche-Posay',
    category: 'dermo-cosmetique',
    price: 195,
    originalPrice: 240,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'Anti-boutons, anti-points noirs et anti-marques résiduelles. Nouvelle formule enrichie au Phylobioma.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Le traitement de référence pour retrouver une peau nette et matifiée en quelques semaines. »',
    badge: 'bestseller',
  },
  {
    title: 'CeraVe Baume Hydratant Nourrissant Peaux Sèches (454g)',
    brand: 'CeraVe',
    category: 'dermo-cosmetique',
    price: 215,
    originalPrice: 260,
    image: 'https://images.unsplash.com/photo-1556228722-d0b5de70b798?auto=format&fit=crop&w=600&q=80',
    description: 'Nourrit, hydrate et aide à restaurer la barrière protectrice de la peau du corps et du visage aux 3 céramides essentiels.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Format familial ultra-économique, parfait pour affronter le froid sec et le vent. »',
    badge: 'destockage',
  },
  {
    title: 'Vichy Dercos Shampoing Traitant Anti-Pelliculaire DS (200ml)',
    brand: 'Vichy',
    category: 'cheveux',
    price: 165,
    originalPrice: 195,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    description: 'Élimine 100% des pellicules visibles et apaise immédiatement les démangeaisons du cuir chevelu.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Efficacité prouvée cliniquement avec une action anti-récidive pendant 6 semaines. »',
    badge: 'coup_de_coeur',
  },
  {
    title: 'NUXE Huile Prodigieuse Visage, Corps & Cheveux (100ml)',
    brand: 'NUXE',
    category: 'bio-naturel',
    price: 279,
    originalPrice: 340,
    image: 'https://images.unsplash.com/photo-1608248597359-536006e86975?auto=format&fit=crop&w=600&q=80',
    description: 'Huile sèche mythique aux 7 huiles végétales précieuses. Nourrit, répare et sublime la peau et les cheveux.',
    doctorAdvice: 'Dr. Khaoula Kamal : « Un parfum envoûtant et une texture satinée qui ne colle pas. Un rituel beauté incontournable. »',
    badge: 'bestseller',
  },
];

// Preset stock images for easy selection
const SAMPLE_IMAGES = [
  { label: 'Sérum / Flacon pipette', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80' },
  { label: 'Crème / Soin visage', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80' },
  { label: 'Protection Solaire', url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80' },
  { label: 'Complément Gélules', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
  { label: 'Soin Bébé Doux', url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80' },
  { label: 'Shampoing Capillaire', url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80' },
  { label: 'Huile & Bio Naturel', url: 'https://images.unsplash.com/photo-1608248597359-536006e86975?auto=format&fit=crop&w=600&q=80' },
  { label: 'Pack Duo Économique', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80' },
];

export const PharmacistPortalModal: React.FC<PharmacistPortalModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
}) => {
  // Authentication PIN state (Default PIN: 1234)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('paralaville_pharmacist_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Portal Active Tab
  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'manage' | 'csv'>('presets');

  // Custom Product Form state
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('La Roche-Posay');
  const [customBrand, setCustomBrand] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('dermo-cosmetique');
  const [imageUrl, setImageUrl] = useState(SAMPLE_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [doctorAdvice, setDoctorAdvice] = useState('');
  const [badge, setBadge] = useState<Product['badge']>('bestseller');
  const [inStock, setInStock] = useState(true);

  // CSV paste state for bulk automated import
  const [csvText, setCsvText] = useState('');
  const [csvStatus, setCsvStatus] = useState<string | null>(null);

  // Management filter search
  const [searchManage, setSearchManage] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // PIN validation handler
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim() === '2025' || pinInput.trim() === 'midelt') {
      setIsAuthenticated(true);
      localStorage.setItem('paralaville_pharmacist_auth', 'true');
      setPinError('');
    } else {
      setPinError('Code PIN incorrect. Indication : utilisez 1234 pour tester.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('paralaville_pharmacist_auth');
    setPinInput('');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1-Click Preset Add Handler
  const handleAddPreset = (preset: Partial<Product>) => {
    const newId = `prod-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const finalOriginalPrice = preset.originalPrice || Math.round((preset.price || 150) * 1.25);
    const finalPrice = preset.price || 120;
    const discount = Math.round(((finalOriginalPrice - finalPrice) / finalOriginalPrice) * 100);

    const fullProduct: Product = {
      id: newId,
      title: preset.title || 'Nouveau Soin',
      brand: preset.brand || 'Parapharmacie',
      category: preset.category || 'dermo-cosmetique',
      price: finalPrice,
      originalPrice: finalOriginalPrice,
      discountPercent: discount > 0 ? discount : undefined,
      image: preset.image || SAMPLE_IMAGES[0].url,
      rating: 4.9,
      reviewCount: Math.floor(Math.random() * 35) + 12,
      inStock: true,
      badge: preset.badge || 'bestseller',
      description: preset.description || 'Soin dermatologique certifié et garanti authentique par Dr. Khaoula Kamal.',
      benefits: [
        '100% Produit Authentique & Contrôlé',
        'Conseillé en officine à Midelt',
        'Expédition express partout au Maroc'
      ],
      usageGuide: 'Appliquer selon les recommandations du fabricant ou le conseil en officine.',
      doctorAdvice: preset.doctorAdvice || `Dr. Khaoula Kamal : « Recommandé pour son efficacité prouvée et sa tolérance optimale. »`,
    };

    onAddProduct(fullProduct);
    triggerToast(`« ${fullProduct.title.substring(0, 30)}... » ajouté au site !`);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } catch {
      // safe fallback
    }
  };

  // Custom Form Submit Handler
  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      alert('Veuillez renseigner au moins le nom du produit et son prix.');
      return;
    }

    const numPrice = Number(price);
    const numOriginalPrice = originalPrice ? Number(originalPrice) : Math.round(numPrice * 1.2);
    const discount = numOriginalPrice > numPrice 
      ? Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100) 
      : undefined;

    const finalBrandName = brand === 'Autre' && customBrand.trim() ? customBrand.trim() : brand;

    const newId = `prod-manual-${Date.now()}`;
    const newProduct: Product = {
      id: newId,
      title: title.trim(),
      brand: finalBrandName,
      category,
      price: numPrice,
      originalPrice: numOriginalPrice,
      discountPercent: discount,
      image: imageUrl.trim() || SAMPLE_IMAGES[0].url,
      rating: 4.9,
      reviewCount: 16,
      inStock,
      badge: badge || undefined,
      description: description.trim() || `Soin dermo-cosmétique sélectionné par Dr. Khaoula Kamal pour les clientes de Midelt et du Maroc.`,
      benefits: [
        'Produit d\'officine 100% garanti',
        'Validation pharmaceutique par Dr. Khaoula Kamal',
        'Paiement à la livraison en espèces'
      ],
      usageGuide: 'Appliquer quotidiennement selon votre rituel de soin.',
      doctorAdvice: doctorAdvice.trim() 
        ? `Dr. Khaoula Kamal : « ${doctorAdvice.trim()} »` 
        : `Dr. Khaoula Kamal : « Un excellent choix pour votre routine quotidienne. Disponible immédiatement à l'officine. »`,
    };

    onAddProduct(newProduct);
    triggerToast(`Produit « ${newProduct.title} » ajouté avec succès !`);

    // Reset Form
    setTitle('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setDoctorAdvice('');
    setActiveTab('manage');

    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    } catch {
      // safe fallback
    }
  };

  // Bulk CSV / Text Import Handler
  const handleBulkImport = () => {
    if (!csvText.trim()) return;

    const lines = csvText.trim().split('\n');
    let importedCount = 0;

    lines.forEach((line) => {
      const parts = line.split(/[;,\t]/).map((p) => p.trim());
      if (parts.length >= 2) {
        const pTitle = parts[0];
        const pBrand = parts[1] || 'Parapharmacie';
        const pPrice = Number(parts[2]) || 150;
        const pOrig = Number(parts[3]) || Math.round(pPrice * 1.25);
        const pCat = parts[4] || 'dermo-cosmetique';

        if (pTitle) {
          const discount = pOrig > pPrice ? Math.round(((pOrig - pPrice) / pOrig) * 100) : undefined;
          const product: Product = {
            id: `prod-bulk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            title: pTitle,
            brand: pBrand,
            category: pCat,
            price: pPrice,
            originalPrice: pOrig,
            discountPercent: discount,
            image: SAMPLE_IMAGES[0].url,
            rating: 4.8,
            reviewCount: 10,
            inStock: true,
            badge: discount && discount >= 30 ? 'destockage' : 'bestseller',
            description: `Produit certifié et disponible à l'officine Dr. Khaoula Kamal.`,
            benefits: ['Produit 100% Authentique', 'Livraison Express Midelt & Maroc'],
            usageGuide: 'Utilisation standard.',
            doctorAdvice: 'Dr. Khaoula Kamal : « Recommandé par votre pharmacienne. »',
          };
          onAddProduct(product);
          importedCount++;
        }
      }
    });

    if (importedCount > 0) {
      setCsvStatus(`✅ Succès : ${importedCount} produit(s) importé(s) et publiés !`);
      setCsvText('');
      triggerToast(`${importedCount} nouveaux produits ajoutés au catalogue !`);
      try {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      } catch {}
    } else {
      setCsvStatus('❌ Format non reconnu. Utilisez: Nom; Marque; Prix; PrixBarré; Catégorie');
    }
  };

  // Image file upload handler (converts to base64 data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Veuillez choisir une photo de moins de 2 Mo pour assurer une vitesse maximale.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export Catalog as JSON
  const handleExportCatalog = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `catalogue_paralaville_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Catalogue exporté en fichier JSON !');
  };

  const filteredManageProducts = products.filter((p) => {
    if (!searchManage.trim()) return true;
    const q = searchManage.toLowerCase().trim();
    return p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      {/* Container Box */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh] border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-rose-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  Espace Pharmacienne • Gestion du Catalogue
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-rose-600/30 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                  Dr. Khaoula Kamal
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Ajoutez des soins, modifiez les prix et publiez-les instantanément pour vos clients
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] font-semibold transition-colors"
                title="Verrouiller l'espace"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Verrouiller</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold text-center flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* LOCKED SCREEN (PIN PROTECTED) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Accès Réservé à Dr. Khaoula Kamal
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Entrez votre code de sécurité pour ajouter de nouveaux produits, gérer les stocks et modifier les prix.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={10}
                  placeholder="Code PIN (ex: 1234)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  autoFocus
                  className="w-full text-center tracking-widest text-xl font-bold py-3 px-4 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
                {pinError && (
                  <p className="text-xs text-red-600 font-bold mt-2">{pinError}</p>
                )}
                <p className="text-[11px] text-slate-400 mt-2">
                  💡 Indication : Le code d'accès par défaut est <strong className="text-slate-700">1234</strong>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-800 hover:to-pink-700 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Ouvrir l'Espace Titulaire</span>
              </button>
            </form>
          </div>
        ) : (
          /* UNLOCKED MANAGEMENT DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 pt-3 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'presets'
                    ? 'bg-white text-rose-700 border-rose-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>⚡ Ajout Rapide en 1-Clic ({POPULAR_PRESETS.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('custom')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'custom'
                    ? 'bg-white text-rose-700 border-rose-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
                }`}
              >
                <Plus className="w-4 h-4 text-rose-600" />
                <span>✍️ Formulaire d'Ajout Personnalisé</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'manage'
                    ? 'bg-white text-rose-700 border-rose-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
                }`}
              >
                <Package className="w-4 h-4 text-emerald-600" />
                <span>📋 Gérer le Catalogue ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('csv')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'csv'
                    ? 'bg-white text-rose-700 border-rose-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>🚀 Import en Masse (CSV/Texte)</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
              
              {/* TAB 1: 1-CLICK POPULAR PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-rose-950 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        Bibliothèque de Soins Incontournables au Maroc
                      </h3>
                      <p className="text-xs text-rose-800/80 mt-0.5">
                        Ajoutez les références phares les plus demandées en 1 seul clic sans avoir à taper la description ni chercher de photo.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {POPULAR_PRESETS.map((preset, index) => {
                      const alreadyExists = products.some((p) => p.title.toLowerCase().includes((preset.title || '').slice(0, 15).toLowerCase()));
                      
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-start gap-3 mb-2.5">
                              <div className="w-16 h-16 rounded-xl bg-slate-100 p-1 shrink-0 overflow-hidden border border-slate-100 flex items-center justify-center">
                                <img
                                  src={preset.image}
                                  alt={preset.title}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="inline-block text-[10px] font-black uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full mb-1">
                                  {preset.brand}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                                  {preset.title}
                                </h4>
                                <div className="flex items-baseline gap-1.5 mt-1">
                                  <span className="text-sm font-black text-rose-700">{preset.price} DH</span>
                                  {preset.originalPrice && (
                                    <span className="text-[11px] text-slate-400 line-through">
                                      {preset.originalPrice} DH
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                              {preset.description}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">
                              Rayon : <strong className="text-slate-600">{preset.category}</strong>
                            </span>
                            <button
                              onClick={() => handleAddPreset(preset)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-800 hover:to-pink-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{alreadyExists ? 'Ajouter à nouveau' : 'Ajouter au site'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: MANUAL CUSTOM FORM */}
              {activeTab === 'custom' && (
                <form onSubmit={handleCustomFormSubmit} className="space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-rose-600" />
                      Créer un Nouveau Soin ou Médicament Sans Ordonnance
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Remplissez les informations ci-dessous. Le produit sera immédiatement disponible à la commande.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nom complet du produit <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: CeraVe Gel Moussant Nettoyant Visage & Corps (236ml)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Marque du laboratoire
                      </label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500 bg-white"
                      >
                        {BRANDS.map((b) => (
                          <option key={b.id} value={b.name}>{b.name}</option>
                        ))}
                        <option value="Autre">+ Autre marque...</option>
                      </select>
                      {brand === 'Autre' && (
                        <input
                          type="text"
                          placeholder="Nom de la marque..."
                          value={customBrand}
                          onChange={(e) => setCustomBrand(e.target.value)}
                          className="w-full text-xs py-2 px-3 mt-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                        />
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Rayon / Catégorie
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500 bg-white"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Prix de vente (DH) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder="Ex: 195"
                        value={price}
                        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-bold text-rose-700"
                      />
                    </div>

                    {/* Original Price */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Prix d'origine / barré (DH) <span className="text-slate-400 font-normal">(Optionnel pour calcul % solde)</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Ex: 240"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    {/* Promotional Badge */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Badge promotionnel
                      </label>
                      <select
                        value={badge || ''}
                        onChange={(e) => setBadge(e.target.value as any)}
                        className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500 bg-white"
                      >
                        <option value="bestseller">⭐ Meilleure Vente</option>
                        <option value="promo">🏷️ Offre Promo</option>
                        <option value="destockage">🔥 Déstockage -50%</option>
                        <option value="nouveau">✨ Nouveauté</option>
                        <option value="coup_de_coeur">💖 Coup de Cœur</option>
                        <option value="conseil_dr">🩺 Recommandé par Dr. Khaoula</option>
                      </select>
                    </div>

                    {/* Stock status toggle */}
                    <div className="flex items-center gap-3 pt-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inStock}
                          onChange={(e) => setInStock(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        <span className="ml-3 text-xs font-bold text-slate-800">
                          {inStock ? '🟢 Produit En Stock (Disponible)' : '🔴 En Rupture temporaire'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Image Selector & Uploader */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700">
                      Photo du produit
                    </label>

                    {/* Quick Preset Images Selection */}
                    <div>
                      <p className="text-[11px] text-slate-500 mb-2">
                        Option A : Choisissez un visuel de parapharmacie haute définition en 1 clic :
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {SAMPLE_IMAGES.map((img, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setImageUrl(img.url)}
                            className={`p-1 rounded-xl border transition-all text-center group ${
                              imageUrl === img.url
                                ? 'border-rose-600 ring-2 ring-rose-400 bg-rose-50/50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={img.label}
                              className="w-full h-12 object-contain rounded-lg"
                            />
                            <span className="block text-[9px] font-semibold text-slate-600 truncate mt-1">
                              {img.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom File Upload or URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <p className="text-[11px] text-slate-500 mb-1">
                          Option B : Chargez une photo depuis votre appareil :
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 hover:border-rose-500 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-rose-50/40 transition-colors"
                        >
                          <Camera className="w-4 h-4 text-rose-600" />
                          <span>Prendre en photo / Charger un fichier</span>
                        </button>
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-500 mb-1">
                          Option C : Saisissez l'adresse URL directe d'une image :
                        </p>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description & Doctor Advice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Description & Bienfaits pour les clientes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Sérum ultra-hydratant à base d'acide hyaluronique pur. Répare la barrière cutanée..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Conseil personnalisé de Dr. Khaoula Kamal
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: C'est le soin idéal à associer avec une crème réparatrice le soir..."
                        value={doctorAdvice}
                        onChange={(e) => setDoctorAdvice(e.target.value)}
                        className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('presets')}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 hover:from-rose-800 hover:to-pink-700 text-white text-xs font-black shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publier et Mettre en Vente Immédiatement</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: MANAGE EXISTING CATALOG */}
              {activeTab === 'manage' && (
                <div className="space-y-4">
                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Rechercher un soin dans votre catalogue..."
                        value={searchManage}
                        onChange={(e) => setSearchManage(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCatalog}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Sauvegarder tout le catalogue en JSON"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exporter</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Voulez-vous restaurer le catalogue d\'origine de la parapharmacie ?')) {
                            onResetProducts();
                            triggerToast('Catalogue d\'origine restauré.');
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Restaurer le catalogue par défaut"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Réinitialiser</span>
                      </button>
                    </div>
                  </div>

                  {/* List of Products */}
                  <div className="space-y-2">
                    {filteredManageProducts.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 text-xs bg-white rounded-2xl border border-slate-200">
                        Aucun produit ne correspond à votre recherche.
                      </div>
                    ) : (
                      filteredManageProducts.map((p) => {
                        const isCustom = p.id.startsWith('prod-custom') || p.id.startsWith('prod-manual') || p.id.startsWith('prod-bulk');

                        return (
                          <div
                            key={p.id}
                            className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                              isCustom
                                ? 'bg-rose-50/40 border-rose-200 hover:bg-rose-50/70'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                                <img
                                  src={p.image}
                                  alt={p.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                                    {p.brand}
                                  </span>
                                  {isCustom && (
                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                      <Sparkles className="w-2.5 h-2.5" />
                                      Ajouté par Dr. Khaoula
                                    </span>
                                  )}
                                  <span className="text-[10px] text-slate-400">
                                    Catégorie : {p.category}
                                  </span>
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                                  {p.title}
                                </h4>
                              </div>
                            </div>

                            {/* Controls: Price Edit, Stock Toggle, Delete */}
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                              {/* Price Edit inline */}
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-400">Prix :</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={p.price}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val > 0) {
                                      onUpdateProduct({ ...p, price: val });
                                    }
                                  }}
                                  className="w-20 py-1 px-2 text-xs font-black text-rose-700 bg-white border border-slate-300 rounded-lg text-center"
                                />
                                <span className="text-xs font-bold text-slate-700">DH</span>
                              </div>

                              {/* In Stock Toggle */}
                              <button
                                onClick={() => onUpdateProduct({ ...p, inStock: !p.inStock })}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                                  p.inStock
                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                                }`}
                              >
                                {p.inStock ? '🟢 En stock' : '🔴 Rupture'}
                              </button>

                              {/* Delete button (for custom added items or hide for default) */}
                              <button
                                onClick={() => {
                                  if (confirm(`Confirmez-vous la suppression de « ${p.title} » ?`)) {
                                    onDeleteProduct(p.id);
                                    triggerToast(`Produit retiré du catalogue.`);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Supprimer ce produit"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: BULK CSV / TEXT IMPORT */}
              {activeTab === 'csv' && (
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      Importation Automatique en Masse (CSV ou Copier-Coller)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Collez vos lignes de produits au format : <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">Nom du Produit; Marque; Prix; PrixBarré; Catégorie</code>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800">Exemple de lignes à copier/coller :</p>
                    <p className="font-mono text-slate-700">Sérum Vitamine C Pure 30ml; La Roche-Posay; 245; 310; dermo-cosmetique</p>
                    <p className="font-mono text-slate-700">Huile Sèche Prodigieuse 50ml; NUXE; 190; 240; bio-naturel</p>
                    <p className="font-mono text-slate-700">Crème Mains Réparatrice 50ml; CeraVe; 65; 85; dermo-cosmetique</p>
                  </div>

                  <textarea
                    rows={6}
                    placeholder="Collez vos lignes de produits ici..."
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />

                  {csvStatus && (
                    <div className="p-3 rounded-xl bg-slate-100 text-xs font-bold text-slate-800">
                      {csvStatus}
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black shadow-md active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Importer et Publier Tout Immédiatement</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Modal Footer Reassurance */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center flex flex-wrap items-center justify-between gap-2 px-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Produits enregistrés instantanément dans votre boutique
          </span>
          <span className="font-semibold text-slate-700">
            Pharmacie & Parapharmacie La Ville • Midelt
          </span>
        </div>

      </div>
    </div>
  );
};
