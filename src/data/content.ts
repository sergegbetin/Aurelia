import type { Product } from './types'
import { products } from './products'

export const brand = {
  name: 'AURELIA',
  signature: 'Start the year beautifully.',
  campaign: 'AURELIA NEW YEAR COLLECTION',
  year: 2027,
}

/** Countdown target — edit this date to change the moment the countdown ends. */
export const NEW_YEAR_TARGET = '2027-01-01T00:00:00'

export interface NavItem {
  label: string
  to: string
}

export const mainNav: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'Boutique', to: '/shop' },
  { label: 'Nouveautés', to: '/shop?view=new' },
  { label: 'Cadeaux', to: '/category/gifts' },
  { label: 'Best Sellers', to: '/shop?view=bestsellers' },
  { label: 'New Year Collection', to: '/shop?view=collection' },
]

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', to: '/shop' },
      { label: 'New arrivals', to: '/shop?view=new' },
      { label: 'Best sellers', to: '/shop?view=bestsellers' },
      { label: 'New Year Collection', to: '/shop?view=collection' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Beauty', to: '/category/beauty' },
      { label: 'Fashion', to: '/category/fashion' },
      { label: 'Tech', to: '/category/tech' },
      { label: 'Home', to: '/category/home' },
      { label: 'Accessories', to: '/category/accessories' },
      { label: 'Gifts', to: '/category/gifts' },
    ],
  },
  {
    title: 'Customer care',
    links: [
      { label: 'Contact', to: '/shop' },
      { label: 'FAQ', to: '/shop' },
      { label: 'Shipping', to: '/shop' },
      { label: 'Returns', to: '/shop' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/shop' },
      { label: 'Terms', to: '/shop' },
      { label: 'Cookies', to: '/shop' },
    ],
  },
]

export const trustItems = [
  { title: 'Secure payment', detail: 'Paiement sécurisé', icon: 'shield' },
  { title: 'Fast delivery', detail: 'Livraison fiable', icon: 'truck' },
  { title: 'Easy returns', detail: 'Retours simples', icon: 'refresh' },
  { title: 'Customer support', detail: 'Support client', icon: 'chat' },
]

export interface GiftGuide {
  slug: string
  title: string
  description: string
  image: string
  query: string
}

export const giftGuides: GiftGuide[] = [
  {
    slug: 'for-her',
    title: 'For Her',
    description: 'Silk, scent and small rituals she will actually use every day.',
    image: '/images/gift-for-her.jpg',
    query: 'For her',
  },
  {
    slug: 'for-him',
    title: 'For Him',
    description: 'Considered pieces for the man who says he wants nothing.',
    image: '/images/gift-for-him.jpg',
    query: 'For him',
  },
  {
    slug: 'for-couples',
    title: 'For Couples',
    description: 'Shared moments — glassware, candles and slow evenings.',
    image: '/images/gift-for-couples.jpg',
    query: 'For couples',
  },
  {
    slug: 'for-friends',
    title: 'For Friends',
    description: 'Easy, joyful gifts that never feel like an afterthought.',
    image: '/images/gift-for-friends.jpg',
    query: 'For friends',
  },
  {
    slug: 'for-family',
    title: 'For Family',
    description: 'Warm, generous presents for the people who raised you.',
    image: '/images/gift-for-family.jpg',
    query: 'For family',
  },
  {
    slug: 'for-yourself',
    title: 'For Yourself',
    description: 'The rule of the year: you are allowed to keep one.',
    image: '/images/gift-for-yourself.jpg',
    query: 'For yourself',
  },
]

export const searchSuggestions = [
  'New Year gifts',
  'Best sellers',
  'Beauty',
  'Tech',
  'Fashion',
  'Candles',
  'Watches',
]

/** Demo-only testimonials — clearly marked as demonstration content. */
export const testimonials = [
  {
    name: 'Sophie L.',
    initials: 'SL',
    rating: 5,
    date: 'January 6, 2027',
    product: 'The New Year Gift Box',
    body: 'Everything arrived in one beautiful box with a handwritten card. It felt like opening a boutique, not a parcel.',
  },
  {
    name: 'Marc D.',
    initials: 'MD',
    rating: 5,
    date: 'January 2, 2027',
    product: 'Aurora Chrono Watch',
    body: 'The watch is genuinely elegant and the delivery was faster than promised. The website made choosing effortless.',
  },
  {
    name: 'Nadia K.',
    initials: 'NK',
    rating: 4,
    date: 'December 30, 2026',
    product: 'Solstice Marble Candle Trio',
    body: 'Beautiful scents and a very calm, tasteful shopping experience. I came back for the second set the same week.',
  },
  {
    name: 'Thomas R.',
    initials: 'TR',
    rating: 5,
    date: 'December 28, 2026',
    product: 'Aura Pro Wireless Earbuds',
    body: 'Ordered on the 27th, received on the 29th, gift-wrapped perfectly. Support answered my question in minutes.',
  },
]

export const instagramTiles = [
  { image: '/images/social-1.jpg', caption: 'First light of the year' },
  { image: '/images/social-2.jpg', caption: 'Wrapped with care' },
  { image: '/images/social-3.jpg', caption: 'Table for the night' },
  { image: '/images/social-4.jpg', caption: 'Something new to wear' },
  { image: '/images/social-5.jpg', caption: 'Slow morning ritual' },
  { image: '/images/social-6.jpg', caption: 'Warm rooms, soft light' },
]

export const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay']

export const socialLinks = [
  { label: 'Instagram', to: '/' },
  { label: 'Pinterest', to: '/' },
  { label: 'TikTok', to: '/' },
  { label: 'YouTube', to: '/' },
]

export const searchPlaceholder = 'Search AURELIA'

/** Curated homepage selections */
export const newYearSpecials: Product[] = products
  .filter((p) => typeof p.discount === 'number' && p.discount > 0)
  .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
  .slice(0, 4)

export const bestSellers: Product[] = [...products]
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 8)

export const freshStartPicks: Product[] = [
  'halo-smartwatch-series-3',
  'stride-insulated-bottle',
  '2027-leather-agenda',
  'aura-pro-wireless-earbuds',
  'lumen-arc-desk-lamp',
  'align-cork-yoga-mat',
]
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => Boolean(p))

export const featuredProduct: Product =
  products.find((p) => p.slug === 'aurora-chrono-watch') ?? products[0]

export const editorialCategories = [
  { slug: 'fashion', label: 'Fashion', line: 'Soft tailoring & knitwear' },
  { slug: 'beauty', label: 'Beauty', line: 'Scent, skin & ritual' },
  { slug: 'tech', label: 'Tech', line: 'Audio, wearables & light' },
  { slug: 'home', label: 'Home', line: 'Candles, textiles & objects' },
  { slug: 'accessories', label: 'Accessories', line: 'Watches, bags & jewellery' },
  { slug: 'gifts', label: 'Gifts', line: 'Boxes ready to give' },
]
