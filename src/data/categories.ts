import type { Category } from './types'

export const categories: Category[] = [
  {
    slug: 'beauty',
    name: 'Beauty',
    headline: 'A little luxury for your everyday.',
    description:
      'Fragrance, skincare and beauty rituals selected to make ordinary mornings feel like a new beginning.',
    image: '/images/category-beauty.jpg',
    accent: '#8A2C3D',
  },
  {
    slug: 'fashion',
    name: 'Fashion',
    headline: 'Elevated pieces for a fresh start.',
    description:
      'Timeless silhouettes, soft tailoring and considered fabrics — a wardrobe that carries you into the new year.',
    image: '/images/category-fashion.jpg',
    accent: '#3A382F',
  },
  {
    slug: 'tech',
    name: 'Tech',
    headline: 'Smarter tools for the year ahead.',
    description:
      'Audio, wearables and everyday devices chosen for how beautifully they fit into a better routine.',
    image: '/images/category-tech.jpg',
    accent: '#9A7431',
  },
  {
    slug: 'home',
    name: 'Home',
    headline: 'Warmth, calm and beautiful spaces.',
    description:
      'Candles, textiles and objects that turn a room into the place you want to start every year from.',
    image: '/images/category-home.jpg',
    accent: '#6C1D2C',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    headline: 'The details that finish the look.',
    description:
      'Watches, bags and jewellery with quiet confidence — small pieces, big difference.',
    image: '/images/category-accessories.jpg',
    accent: '#C0964B',
  },
  {
    slug: 'gifts',
    name: 'Gifts',
    headline: 'Thoughtful presents, perfectly chosen.',
    description:
      'Curated gift sets and ready-to-give boxes for the people who make your year worth celebrating.',
    image: '/images/category-gifts.jpg',
    accent: '#1B1A14',
  },
]

export const getCategory = (slug?: string) => categories.find((c) => c.slug === slug)
