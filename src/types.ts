export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  specs: string[];
  features: string[];
  images: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  pulseBadge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface Testimonial {
  id: string;
  avatar: string;
  name: string;
  verified: boolean;
  rating: number;
  quote: string;
  productTag: string;
}

export interface WhyFeature {
  iconName: string;
  title: string;
  description: string;
}
