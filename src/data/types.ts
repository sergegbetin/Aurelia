export type CategorySlug =
  | 'beauty'
  | 'fashion'
  | 'tech'
  | 'home'
  | 'accessories'
  | 'gifts'

export type ProductBadge = 'new' | 'bestseller' | 'limited' | 'sale' | 'exclusive'

export interface Spec {
  label: string
  value: string
}

export interface Variant {
  label: string
  options: string[]
}

export interface ProductReview {
  author: string
  rating: number
  date: string
  title: string
  body: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category: CategorySlug
  tagline: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  image: string
  gallery: string[]
  stock: number
  badge?: ProductBadge
  variants: Variant[]
  specifications: Spec[]
  features: string[]
  reviewList: ProductReview[]
  faq?: FaqItem[]
  tags: string[]
  createdAt: string
  popularity: number
  featured?: boolean
}

export interface Category {
  slug: CategorySlug
  name: string
  headline: string
  description: string
  image: string
  accent: string
}
