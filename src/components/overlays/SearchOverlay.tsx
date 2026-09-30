import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import { searchSuggestions, searchPlaceholder } from '../../data/content'
import { useDebouncedValue } from '../../hooks'
import { useStore } from '../../store/StoreContext'
import { categoryLabel, formatPrice, productSearchText } from '../../utils'
import { CloseIcon, SearchIcon, ArrowRightIcon } from '../ui/Icons'
import { ImageWithFallback, Rating } from '../ui/Primitives'

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, setQuickView } = useStore()
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 180)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      window.setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [searchOpen])

  const results = useMemo(() => {
    const term = debounced.trim().toLowerCase()
    if (!term) return []
    return products.filter((product) => productSearchText(product).includes(term)).slice(0, 6)
  }, [debounced])

  const showEmpty = debounced.trim().length > 0 && results.length === 0

  if (!searchOpen) return null

  const submitSearch = (value: string) => {
    setSearchOpen(false)
    navigate(`/shop?q=${encodeURIComponent(value)}`)
  }

  return (
    <div className="fixed inset-0 z-[75]" role="dialog" aria-modal="true" aria-label="Rechercher sur AURELIA">
      <div
        className="absolute inset-0 bg-noir/70 backdrop-blur-sm animate-fadeIn"
        onClick={() => setSearchOpen(false)}
        aria-hidden
      />
      <div className="relative max-h-full overflow-y-auto bg-ivory animate-fadeIn">
        <div className="container-luxe py-8 sm:py-12">
          <div className="flex items-center justify-between gap-6">
            <span className="eyebrow">{searchPlaceholder}</span>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Fermer"
              className="flex h-10 w-10 items-center justify-center border border-noir/15 transition-colors hover:bg-noir hover:text-ivory"
            >
              <CloseIcon />
            </button>
          </div>

          <form
            className="mt-6 flex items-center gap-4 border-b border-noir/25 pb-4"
            onSubmit={(event) => {
              event.preventDefault()
              submitSearch(query)
            }}
          >
            <SearchIcon size={24} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Que recherchez-vous ?"
              aria-label="Rechercher des produits"
              className="w-full bg-transparent font-display text-2xl font-light text-noir placeholder:text-noir/35 focus:outline-none sm:text-4xl"
            />
            <button
              type="submit"
              className="hidden shrink-0 items-center gap-2 text-[11px] uppercase tracking-wider2 text-noir/60 transition-colors hover:text-gold-deep sm:flex"
            >
              Rechercher <ArrowRightIcon size={16} />
            </button>
          </form>

          {!query.trim() && (
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-luxe text-noir/45">Suggestions</p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {searchSuggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        className="chip"
                        onClick={() => {
                          setQuery(suggestion)
                        }}
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-luxe text-noir/45">Catégories</p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <button
                        type="button"
                        className="chip"
                        onClick={() => {
                          setSearchOpen(false)
                          navigate(`/category/${category.slug}`)
                        }}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    className="group flex w-full items-center gap-4 border border-noir/10 bg-white/60 p-3 text-left transition-colors hover:border-noir/30"
                    onClick={() => {
                      setSearchOpen(false)
                      navigate(`/product/${product.slug}`)
                    }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-16 shrink-0 bg-cream"
                      monogram={product.name.charAt(0)}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-base">{product.name}</span>
                      <span className="mt-0.5 block truncate text-[11px] uppercase tracking-wider text-noir/45">
                        {categoryLabel(product.category)}
                      </span>
                      <span className="mt-1.5 flex items-center justify-between gap-2">
                        <span className="text-sm font-medium num">{formatPrice(product.price)}</span>
                        <Rating value={product.rating} size={11} />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="sm:col-span-2 lg:col-span-3">
                <button
                  type="button"
                  className="btn-outline w-full"
                  onClick={() => submitSearch(query)}
                >
                  Voir tous les résultats pour « {debounced} »
                </button>
              </li>
            </ul>
          )}

          {showEmpty && (
            <div className="mt-10 border border-noir/10 bg-white/60 p-8 text-center">
              <p className="font-display text-2xl font-light">
                Aucun résultat pour « {debounced} »
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-noir/60">
                Aucun article ne correspond à « {debounced} ». Essayez plutôt l’une de nos
                sélections les plus recherchées de la saison.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                {searchSuggestions.slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="chip"
                    onClick={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" className="btn-outline" onClick={() => setQuery('')}>
                  Effacer la recherche
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setSearchOpen(false)
                    setQuickView(null)
                    navigate('/shop')
                  }}
                >
                  Parcourir la collection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
