export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  subcategory?: string;
  originalPrice: number;
  price: number;
  discountPercent?: number;
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  badge?: 'bestseller' | 'promo' | 'destockage' | 'nouveau' | 'coup_de_coeur' | 'conseil_dr';
  description: string;
  benefits: string[];
  usageGuide: string;
  doctorAdvice?: string;
  volumeOrSize?: string;
  skinType?: string;
  isPack?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  badge?: string;
  description?: string;
  image?: string;
  count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  deliveryMethod: 'midelt_express' | 'national_standard';
  note?: string;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  logoUrl?: string;
  tagline: string;
}

export interface MoroccanCity {
  name: string;
  region: string;
  isMideltOrNearby: boolean;
  estimatedDelivery: string;
}
