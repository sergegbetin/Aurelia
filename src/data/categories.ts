import type { Category } from './types'

export const categories: Category[] = [
  {
    slug: 'beauty',
    name: 'Beauté',
    headline: 'Un petit luxe pour le quotidien.',
    description:
      'Parfums, soins et rituels beauté choisis pour donner à vos matins ordinaires des couleurs de nouveau commencement.',
    image: '/images/category-beauty.jpg',
    accent: '#8A2C3D',
  },
  {
    slug: 'fashion',
    name: 'Mode',
    headline: 'Des pièces affirmées pour un nouveau départ.',
    description:
      'Silhouettes intemporelles, vestiaire souple et matières choisies — une garde-robe qui vous accompagne dans la nouvelle année.',
    image: '/images/category-fashion.jpg',
    accent: '#3A382F',
  },
  {
    slug: 'tech',
    name: 'High-tech',
    headline: 'Des outils plus malins pour l’année à venir.',
    description:
      'Audio, objets connectés et appareils du quotidien choisis pour la finesse avec laquelle ils s’inscrivent dans de meilleures habitudes.',
    image: '/images/category-tech.jpg',
    accent: '#9A7431',
  },
  {
    slug: 'home',
    name: 'Maison',
    headline: 'Chaleur, calme et beaux espaces.',
    description:
      'Bougies, textiles et objets qui transforment une pièce en l’endroit où vous voulez commencer chaque année.',
    image: '/images/category-home.jpg',
    accent: '#6C1D2C',
  },
  {
    slug: 'accessories',
    name: 'Accessoires',
    headline: 'Les détails qui achèvent la silhouette.',
    description:
      'Montres, sacs et bijoux d’une élégance tranquille — de petites pièces, une grande différence.',
    image: '/images/category-accessories.jpg',
    accent: '#C0964B',
  },
  {
    slug: 'gifts',
    name: 'Cadeaux',
    headline: 'Des cadeaux attentionnés, parfaitement choisis.',
    description:
      'Coffrets et boîtes prêts à offrir, pour les personnes qui rendent votre année digne d’être célébrée.',
    image: '/images/category-gifts.jpg',
    accent: '#1B1A14',
  },
]

export const getCategory = (slug?: string) => categories.find((c) => c.slug === slug)
