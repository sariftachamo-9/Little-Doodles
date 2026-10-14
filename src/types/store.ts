export type ProductCategory =
  | 'All Printables'
  | 'Reading ABC'
  | 'Color Book'
  | '1 2 3 Numbers'
  | 'Daily Routine'
  | 'Party Cards'
  | 'Mega Pack';

export type AgeBand = 'All Ages' | '2–3 yrs' | '3–4 yrs' | '4–5 yrs';

export interface CuteAchievement {
  id: string;
  title: string;
  badgeType: 'star' | 'medal' | 'trophy' | 'crown' | 'ribbon';
  iconEmoji: string;
  sparkleColor: string;
  tagline: string;
  points: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceNpr: number;
  priceUsd: number;
  category: ProductCategory;
  ageBand: AgeBand;
  pageCount: number;
  format: 'PDF (Print-Ready)' | 'PDF + PNG' | 'Editable Canva + PDF';
  dimensions: 'A4 & US Letter' | '5x7 inches' | 'Square 8x8';
  rating: number;
  reviewCount: number;
  badge?: string;
  isPopular?: boolean;
  achievement?: CuteAchievement;
  image: string;
  samplePages: string[];
  features: string[];
  skillsLearned: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
