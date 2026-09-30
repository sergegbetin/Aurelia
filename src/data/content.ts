import type { Product } from './types'
import { products } from './products'

export const brand = {
  name: 'AURELIA',
  signature: 'Commencez l’année avec beauté.',
  campaign: 'AURELIA — COLLECTION DU NOUVEL AN',
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
  { label: 'Meilleures ventes', to: '/shop?view=bestsellers' },
  { label: 'Collection du Nouvel An', to: '/shop?view=collection' },
]

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Boutique',
    links: [
      { label: 'Tous les produits', to: '/shop' },
      { label: 'Nouveautés', to: '/shop?view=new' },
      { label: 'Meilleures ventes', to: '/shop?view=bestsellers' },
      { label: 'Collection du Nouvel An', to: '/shop?view=collection' },
    ],
  },
  {
    title: 'Catégories',
    links: [
      { label: 'Beauté', to: '/category/beauty' },
      { label: 'Mode', to: '/category/fashion' },
      { label: 'High-tech', to: '/category/tech' },
      { label: 'Maison', to: '/category/home' },
      { label: 'Accessoires', to: '/category/accessories' },
      { label: 'Cadeaux', to: '/category/gifts' },
    ],
  },
  {
    title: 'Service client',
    links: [
      { label: 'Contact', to: '/shop' },
      { label: 'FAQ', to: '/shop' },
      { label: 'Livraison', to: '/shop' },
      { label: 'Retours', to: '/shop' },
    ],
  },
  {
    title: 'Informations légales',
    links: [
      { label: 'Confidentialité', to: '/shop' },
      { label: 'Conditions générales', to: '/shop' },
      { label: 'Cookies', to: '/shop' },
    ],
  },
]

export const trustItems = [
  { title: 'Paiement sécurisé', detail: 'Vos données de paiement restent protégées', icon: 'shield' },
  { title: 'Livraison fiable', detail: 'Votre commande est suivie jusqu’à vous', icon: 'truck' },
  { title: 'Retours simples', detail: 'Un retour facile si besoin', icon: 'refresh' },
  { title: 'Service client', detail: 'Une équipe à votre écoute', icon: 'chat' },
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
    title: 'Pour elle',
    description: 'De la soie, un parfum et de petits rituels qu’elle utilisera chaque jour.',
    image: '/images/gift-for-her.jpg',
    query: 'Pour elle',
  },
  {
    slug: 'for-him',
    title: 'Pour lui',
    description: 'Des pièces choisies avec soin pour l’homme qui dit ne rien vouloir.',
    image: '/images/gift-for-him.jpg',
    query: 'Pour lui',
  },
  {
    slug: 'for-couples',
    title: 'Pour deux',
    description: 'Des moments à partager — verrerie, bougies et soirées au ralenti.',
    image: '/images/gift-for-couples.jpg',
    query: 'Pour deux',
  },
  {
    slug: 'for-friends',
    title: 'Pour les amis',
    description: 'Des cadeaux simples et joyeux qui ne ressemblent jamais à une idée de dernière minute.',
    image: '/images/gift-for-friends.jpg',
    query: 'Pour les amis',
  },
  {
    slug: 'for-family',
    title: 'Pour la famille',
    description: 'Des cadeaux chaleureux et généreux pour ceux qui vous ont élevé.',
    image: '/images/gift-for-family.jpg',
    query: 'Pour la famille',
  },
  {
    slug: 'for-yourself',
    title: 'Pour vous-même',
    description: 'La règle de l’année : vous avez le droit d’en garder un pour vous.',
    image: '/images/gift-for-yourself.jpg',
    query: 'Pour vous-même',
  },
]

export const searchSuggestions = [
  'Cadeaux du Nouvel An',
  'Meilleures ventes',
  'Beauté',
  'High-tech',
  'Mode',
  'Bougies',
  'Montres',
]

/** Demo-only testimonials — clearly marked as demonstration content. */
export const testimonials = [
  {
    name: 'Sophie L.',
    initials: 'SL',
    rating: 5,
    date: '6 janvier 2027',
    product: 'Coffret Cadeau du Nouvel An',
    body: 'Tout est arrivé dans un seul coffret magnifique, avec une carte manuscrite. On avait l’ouverture d’une boutique, pas celle d’un colis.',
  },
  {
    name: 'Marc D.',
    initials: 'MD',
    rating: 5,
    date: '2 janvier 2027',
    product: 'Montre Aurora Chrono',
    body: 'La montre est vraiment élégante et la livraison plus rapide que promis. Le site a rendu le choix parfaitement simple.',
  },
  {
    name: 'Nadia K.',
    initials: 'NK',
    rating: 4,
    date: '30 décembre 2026',
    product: 'Trio de bougies Solstice en marbre',
    body: 'De beaux parfums et une expérience d’achat très calme, au goût sûr. Je suis revenue pour un deuxième coffret dans la même semaine.',
  },
  {
    name: 'Thomas R.',
    initials: 'TR',
    rating: 5,
    date: '28 décembre 2026',
    product: 'Écouteurs sans fil Aura Pro',
    body: 'Commandé le 27, reçu le 29, emballé parfaitement pour l’offrir. Le service client a répondu à ma question en quelques minutes.',
  },
]

export const instagramTiles = [
  { image: '/images/social-1.jpg', caption: 'Première lumière de l’année' },
  { image: '/images/social-2.jpg', caption: 'Emballé avec soin' },
  { image: '/images/social-3.jpg', caption: 'La table de la nuit' },
  { image: '/images/social-4.jpg', caption: 'Quelque chose de neuf à porter' },
  { image: '/images/social-5.jpg', caption: 'Rituel de matin doux' },
  { image: '/images/social-6.jpg', caption: 'Pièces chaudes, lumière douce' },
]

export const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay']

export const socialLinks = [
  { label: 'Instagram', to: '/' },
  { label: 'Pinterest', to: '/' },
  { label: 'TikTok', to: '/' },
  { label: 'YouTube', to: '/' },
]

export const searchPlaceholder = 'Rechercher sur AURELIA'

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
  { slug: 'fashion', label: 'Mode', line: 'Coupes douces et mailles' },
  { slug: 'beauty', label: 'Beauté', line: 'Parfum, soin et rituel' },
  { slug: 'tech', label: 'High-tech', line: 'Audio, wearables et lumière' },
  { slug: 'home', label: 'Maison', line: 'Bougies, textiles et objets' },
  { slug: 'accessories', label: 'Accessoires', line: 'Montres, sacs et bijoux' },
  { slug: 'gifts', label: 'Cadeaux', line: 'Coffrets prêts à offrir' },
]
