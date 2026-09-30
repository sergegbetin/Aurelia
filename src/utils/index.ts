import { categories } from '../data/categories'
import type { Product } from '../data/types'

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

const currency = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatPrice = (value: number) => currency.format(value)

export const formatPriceFull = (value: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

export const computeDiscount = (price: number, original?: number) =>
  original && original > price ? Math.round(((original - price) / original) * 100) : 0

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max)

/** Mots-clés ajoutés à la recherche selon le badge du produit. */
const badgeKeywords: Record<string, string> = {
  new: 'nouveaute nouveautes',
  bestseller: 'meilleures ventes coupes de coeur',
  limited: 'edition limitee',
  sale: 'promo promotions soldes',
  exclusive: 'exclusivite',
}

/** Nom français d’une catégorie à partir de son slug. */
export const categoryLabel = (slug: string): string =>
  categories.find((category) => category.slug === slug)?.name ?? slug

/**
 * Texte interrogeable d’un produit : nom, catégorie en français, libellé du
 * badge, accroche, description, tags et synonymes utiles aux suggestions.
 */
export const productSearchText = (product: Product): string =>
  [
    product.name,
    product.category,
    categories.find((category) => category.slug === product.category)?.name ?? '',
    product.tagline,
    product.description,
    ...product.tags,
    product.badge ? badgeKeywords[product.badge] ?? '' : '',
    product.tags.includes('cadeau')
      ? 'cadeaux du nouvel an cadeau cadeau pour elle cadeau pour lui'
      : '',
    product.tags.includes('montre') ? 'montres montre' : '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

export const range = (length: number) => Array.from({ length }, (_, i) => i)

export const group = <T,>(items: T[], size: number): T[][] => {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}
