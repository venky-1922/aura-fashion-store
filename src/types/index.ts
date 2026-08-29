export type Gender = "men" | "women" | "unisex";

export type BadgeType = "NEW" | "BESTSELLER" | "SALE" | "LIMITED";

export interface ProductImage {
  primary: string;
  secondary: string;
  gallery: string[];
}

export interface ProductVariantSize {
  size: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  specifications: { label: string; value: string }[];
  category: string; // category slug
  collectionSlug?: string;
  gender: Gender;
  price: number; // current price INR
  originalPrice?: number; // MRP INR
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  badges: BadgeType[];
  colors: { name: string; hex: string }[];
  sizes: ProductVariantSize[];
  images: ProductImage;
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  fabric?: string;
  fit?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  gender: Gender;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
}

export interface CartLineItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  size: string;
  color: string;
  quantity: number;
}
