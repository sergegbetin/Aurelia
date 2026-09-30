import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CategorySlug, Product } from '../../data/types'
import { products as allProducts } from '../../data/products'
import { categories } from '../../data/categories'
import { usePage } from '../../hooks/usePage'
import { cn } from '../../utils'
import { Drawer } from '../ui/Overlay'
import { ProductCard } from '../ui/ProductCard'
import { ArrowLink, ImageWithFallback, Reveal, SectionHeading } from '../ui/Primitives'
import { CloseIcon, FilterIcon, SearchIcon, SlidersIcon, SparkleIcon } from '../ui/Icons'

type SortKey = 'featured' | 'newest' | 'popular' | 'price-asc' | 'price-desc'

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'En vedette' },
  { key: 'newest', label: 'Plus récents' },
  { key: 'popular', label: 'Populaires' },
  { key: 'price-asc', label: 'Prix croissant' },
  { key: 'price-desc', label: 'Prix décroissant' },
]

const priceBands = [
  { id: 'all', label: 'Tous les prix', min: 0, max: Infinity },
  { id: 'u75', label: 'Moins de 75 €', min: 0, max: 75 },
  { id: '75-150', label: '75 € – 150 €', min: 75, max: 150 },
  { id: '150-300', label: '150 € – 300 €', min: 150, max: 300 },
  { id: '300', label: '300 € et plus', min: 300, max: Infinity },
]

interface ExplorerProps {
  title: string
  subtitle?: string
  eyebrow?: string
  heroImage?: string
  defaultCategory?: CategorySlug | null
  titleNode?: React.ReactNode
}

export function ProductExplorer({
  title,
  subtitle,
  eyebrow,
  heroImage,
  defaultCategory = null,
  titleNode,
}: ExplorerProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const view = searchParams.get('view')
  const gift = searchParams.get('gift')
  const categoryParam = searchParams.get('category')

  const [term, setTerm] = useState(q)
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(() => {
    if (defaultCategory) return [defaultCategory]
    if (categoryParam && categories.some((c) => c.slug === categoryParam)) {
      return [categoryParam as CategorySlug]
    }
    return []
  })
  const [band, setBand] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [sort, setSort] = useState<SortKey>('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [visible, setVisible] = useState(9)

  usePage(`${title} | AURELIA`, subtitle)

  useEffect(() => setTerm(q), [q])

  useEffect(() => {
    setSelectedCategories(defaultCategory ? [defaultCategory] : [])
  }, [defaultCategory])

  useEffect(() => {
    if (categoryParam && categories.some((c) => c.slug === categoryParam)) {
      setSelectedCategories([categoryParam as CategorySlug])
    }
  }, [categoryParam])

  const preset = useMemo(() => {
    let list = [...allProducts]
    if (view === 'new') list = list.filter((p) => p.badge === 'new')
    if (view === 'bestsellers') list = list.filter((p) => p.badge === 'bestseller' || p.popularity >= 88)
    if (view === 'offers') list = list.filter((p) => (p.discount ?? 0) > 0)
    if (view === 'collection') list = list
    if (view === 'fresh')
      list = list.filter((p) =>
        ['halo-smartwatch-series-3', 'stride-insulated-bottle', '2027-leather-agenda', 'aura-pro-wireless-earbuds', 'lumen-arc-desk-lamp', 'align-cork-yoga-mat'].includes(p.slug),
      )
    return list
  }, [view])

  const list = useMemo(() => {
    const termLower = term.trim().toLowerCase()
    const price = priceBands.find((b) => b.id === band) ?? priceBands[0]

    let result = preset.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false
      if (product.price < price.min || product.price > price.max) return false
      if (minRating && product.rating < minRating) return false
      if (inStockOnly && product.stock <= 0) return false
      if (onSaleOnly && !(product.originalPrice && product.originalPrice > product.price)) return false
      if (termLower) {
        const haystack = [
          product.name,
          product.category,
          categories.find((c) => c.slug === product.category)?.name ?? '',
          product.tagline,
          product.description,
          ...product.tags,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(termLower)) return false
      }
      if (gift) {
        const audience = gift.toLowerCase()
        const categoryOk =
          (audience.includes('elle') && ['beauty', 'fashion', 'accessories'].includes(product.category)) ||
          (audience.includes('lui') && ['tech', 'accessories', 'fashion'].includes(product.category)) ||
          (audience.includes('deux') && ['home', 'gifts'].includes(product.category)) ||
          (audience.includes('amis') && ['gifts', 'home', 'beauty'].includes(product.category)) ||
          (audience.includes('famille') && ['home', 'gifts', 'beauty'].includes(product.category)) ||
          (audience.includes('vous') && ['tech', 'accessories', 'beauty'].includes(product.category))
        if (!categoryOk && !product.tags.includes('cadeau')) return false
      }
      return true
    })

    switch (sort) {
      case 'newest':
        result = result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        break
      case 'popular':
        result = result.sort((a, b) => b.popularity - a.popularity)
        break
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price)
        break
      default:
        result = result.sort((a, b) => b.popularity * 0.6 + b.rating * 10 - (a.popularity * 0.6 + a.rating * 10))
    }
    return result
  }, [preset, selectedCategories, band, minRating, inStockOnly, onSaleOnly, term, sort, gift])

  const activeFilterCount =
    selectedCategories.length +
    (band !== 'all' ? 1 : 0) +
    (minRating ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0) +
    (term ? 1 : 0)

  const resetFilters = () => {
    setSelectedCategories(defaultCategory ? [defaultCategory] : [])
    setBand('all')
    setMinRating(0)
    setInStockOnly(false)
    setOnSaleOnly(false)
    setTerm('')
    setVisible(9)
    if (q || view || gift) setSearchParams({})
  }

  const toggleCategory = (slug: CategorySlug) => {
    setVisible(9)
    setSelectedCategories((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    )
  }

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    setVisible(9)
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (term.trim()) next.set('q', term.trim())
        else next.delete('q')
        return next
      },
      { replace: true },
    )
  }

  const FilterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <label htmlFor="explorer-search" className="mb-3 block text-[11px] uppercase tracking-luxe text-noir/50">
          Recherche
        </label>
        <form onSubmit={submitSearch} className="flex items-center border border-noir/15 bg-white">
          <span className="pl-3 text-noir/40">
            <SearchIcon size={17} />
          </span>
          <input
            id="explorer-search"
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Rechercher un produit"
            className="w-full bg-transparent px-3 py-3 text-sm placeholder:text-noir/40 focus:outline-none"
          />
        </form>
      </div>

      <fieldset>
        <legend className="mb-3 text-[11px] uppercase tracking-luxe text-noir/50">Catégories</legend>
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            const active = selectedCategories.includes(category.slug)
            const count = allProducts.filter((p) => p.category === category.slug).length
            return (
              <label
                key={category.slug}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 border px-3.5 py-2.5 text-[13px] transition-all',
                  active ? 'border-noir bg-noir text-ivory' : 'border-noir/12 hover:border-noir/40',
                )}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleCategory(category.slug)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      'flex h-4 w-4 items-center justify-center border',
                      active ? 'border-ivory bg-gold' : 'border-noir/30',
                    )}
                    aria-hidden
                  >
                    {active && <span className="h-1.5 w-1.5 bg-noir" />}
                  </span>
                  {category.name}
                </span>
                <span className={cn('num text-[11px]', active ? 'text-ivory/60' : 'text-noir/40')}>
                  {count}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[11px] uppercase tracking-luxe text-noir/50">Fourchette de prix</legend>
        <div className="flex flex-wrap gap-2">
          {priceBands.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setBand(option.id)
                setVisible(9)
              }}
              aria-pressed={band === option.id}
              className={cn('chip', band === option.id && 'chip-active')}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[11px] uppercase tracking-luxe text-noir/50">Note minimale</legend>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinRating(rating)}
              aria-pressed={minRating === rating}
              className={cn('chip', minRating === rating && 'chip-active')}
            >
              {rating === 0 ? 'Toutes les notes' : `${rating}+ étoiles`}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[11px] uppercase tracking-luxe text-noir/50">Disponibilité</legend>
        <div className="flex flex-col gap-2">
          <ToggleRow
            label="Uniquement en stock"
            checked={inStockOnly}
            onChange={() => setInStockOnly((v) => !v)}
          />
          <ToggleRow
            label="Uniquement en promo"
            checked={onSaleOnly}
            onChange={() => setOnSaleOnly((v) => !v)}
          />
        </div>
      </fieldset>

      <button type="button" className="btn-outline w-full" onClick={resetFilters}>
        Effacer les filtres
      </button>
    </div>
  )

  return (
    <>
      {heroImage && (
        <div className="relative">
          <ImageWithFallback
            src={heroImage}
            alt={title}
            eager
            monogram={title.charAt(0)}
            className="h-56 w-full bg-cream sm:h-72 lg:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-noir/75 via-noir/45 to-transparent" />
          <div className="container-luxe absolute inset-0 flex flex-col justify-center gap-3 text-ivory">
            {eyebrow && <span className="eyebrow text-gold-light">{eyebrow}</span>}
            <h1 className="font-display text-display-sm font-light uppercase sm:text-5xl">
              {titleNode ?? title}
            </h1>
            {subtitle && (
              <p className="max-w-lg text-sm text-ivory/75 sm:text-base">{subtitle}</p>
            )}
          </div>
        </div>
      )}

      <div className="container-luxe py-12 lg:py-16">
        {!heroImage && (
          <SectionHeading align="left" eyebrow={eyebrow} title={titleNode ?? title} subtitle={subtitle} />
        )}

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:gap-10">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-32">{FilterPanel}</div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-noir/10 pb-5">
              <p className="text-[12px] uppercase tracking-wider text-noir/55">
                <span className="num text-noir">{list.length}</span>{' '}
                {list.length === 1 ? 'produit' : 'produits'}
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="ml-3 text-gold-deep underline-offset-4 hover:underline"
                  >
                    Réinitialiser ({activeFilterCount})
                  </button>
                )}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="chip lg:hidden"
                  onClick={() => setFiltersOpen(true)}
                >
                  <FilterIcon /> Filtres
                  {activeFilterCount > 0 && (
                    <span className="num ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-noir">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <label className="flex items-center gap-2 border border-noir/15 bg-white px-3 py-2.5">
                  <span className="text-noir/45">
                    <SlidersIcon size={14} />
                  </span>
                  <span className="sr-only">Trier par</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortKey)}
                    className="bg-transparent text-[12px] uppercase tracking-wider text-noir focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {list.length === 0 ? (
              <div className="mt-10 border border-noir/10 bg-white/60 px-6 py-16 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-noir/15 text-noir/40">
                  <SparkleIcon size={22} />
                </span>
                <p className="mt-5 font-display text-2xl font-light">Aucun produit ne correspond</p>
                <p className="mx-auto mt-3 max-w-md text-sm text-noir/60">
                  Essayez de retirer un filtre — ou parcourez la Collection du Nouvel An, où
                  chaque catégorie est pensée pour la saison.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" className="btn-primary" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setSearchParams({})}
                  >
                    Parcourir tous les produits
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {list.slice(0, visible).map((product, index) => (
                  <Reveal key={product.id} delay={(index % 3) * 60}>
                    <ProductCard product={product} eager={index < 3} />
                  </Reveal>
                ))}
              </div>
            )}

            {visible < list.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setVisible((v) => v + 9)}
                >
                  Afficher plus
                </button>
              </div>
            )}

            {list.length > 0 && (
              <div className="mt-14 border-t border-noir/10 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-md text-sm text-noir/55">
                    Besoin d’aide pour choisir ? Parcourez la Collection du Nouvel An —
                    vingt-deux pièces pensées pour chaque personne.
                  </p>
                  <ArrowLink to="/shop?view=collection">Collection du Nouvel An</ArrowLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} side="left" labelledBy="filters-title">
        <header className="flex items-center justify-between border-b border-noir/10 px-5 py-5">
          <h2 id="filters-title" className="flex items-center gap-2 text-[12px] uppercase tracking-luxe">
            <FilterIcon /> Filtres
            {activeFilterCount > 0 && <span className="num text-gold-deep">({activeFilterCount})</span>}
          </h2>
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            aria-label="Fermer les filtres"
            className="flex h-9 w-9 items-center justify-center border border-noir/15 hover:bg-noir hover:text-ivory"
          >
            <CloseIcon size={17} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-6">{FilterPanel}</div>
        <div className="border-t border-noir/10 px-5 py-4">
          <button type="button" className="btn-primary w-full" onClick={() => setFiltersOpen(false)}>
            Afficher {list.length} {list.length === 1 ? 'produit' : 'produits'}
          </button>
        </div>
      </Drawer>
    </>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 border border-noir/12 px-3.5 py-2.5 text-[13px] transition-all hover:border-noir/40">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={cn(
          'relative h-5 w-9 rounded-full transition-colors',
          checked ? 'bg-noir' : 'bg-noir/20',
        )}
        aria-hidden
      >
        <span
          className={cn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-ivory transition-transform',
            checked ? 'translate-x-[1.15rem]' : 'translate-x-0.5',
          )}
        />
      </span>
    </label>
  )
}
