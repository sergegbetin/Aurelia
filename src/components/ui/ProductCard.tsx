import { Link } from 'react-router-dom'
import type { Product } from '../../data/types'
import { useStore } from '../../store/StoreContext'
import { cn } from '../../utils'
import { Badge, ImageWithFallback, Price, Rating } from './Primitives'
import { BagIcon, EyeIcon, HeartIcon } from './Icons'

export function ProductCard({
  product,
  className,
  eager = false,
  compact = false,
}: {
  product: Product
  className?: string
  eager?: boolean
  compact?: boolean
}) {
  const { addItem, toggleWishlist, isWishlisted, setQuickView, setCartOpen } = useStore()
  const wishlisted = isWishlisted(product.id)

  return (
    <article className={cn('group relative flex h-full flex-col', className)}>
      <div className="relative overflow-hidden bg-cream">
        <Link
          to={`/product/${product.slug}`}
          className="block"
          aria-label={`Voir ${product.name}`}
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            eager={eager}
            monogram={product.name.charAt(0)}
            className={compact ? 'aspect-[4/5]' : 'aspect-[4/5]'}
            imgClassName="img-zoom"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {product.badge && <Badge kind={product.badge} />}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 focus-within:opacity-100 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-pressed={wishlisted}
            aria-label={wishlisted ? `Retirer ${product.name} de la liste d’envies` : `Ajouter ${product.name} à la liste d’envies`}
            className={cn(
              'flex h-9 w-9 items-center justify-center border backdrop-blur transition-all duration-300',
              wishlisted
                ? 'border-bordeaux bg-bordeaux text-ivory'
                : 'border-white/70 bg-white/85 text-noir hover:border-noir hover:bg-noir hover:text-ivory',
            )}
          >
            <HeartIcon size={17} filled={wishlisted} />
          </button>
          <button
            type="button"
            onClick={() => setQuickView(product)}
            aria-label={`Aperçu rapide ${product.name}`}
            className="flex h-9 w-9 items-center justify-center border border-white/70 bg-white/85 text-noir backdrop-blur transition-all duration-300 hover:border-noir hover:bg-noir hover:text-ivory"
          >
            <EyeIcon size={17} />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-400 group-hover:pointer-events-auto group-hover:translate-y-0">
          <button
            type="button"
            onClick={() => {
              addItem(product)
              setCartOpen(true)
            }}
            className="btn w-full bg-noir/95 text-[11px] text-ivory backdrop-blur hover:bg-gold-deep"
          >
            <BagIcon size={15} />
            Ajouter au panier
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/product/${product.slug}`}
            className="font-display text-lg font-medium leading-tight transition-colors hover:text-gold-deep sm:text-xl"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={wishlisted ? `Retirer ${product.name} de la liste d’envies` : `Ajouter ${product.name} à la liste d’envies`}
            className="mt-1 text-noir/40 transition-colors hover:text-bordeaux md:hidden"
          >
            <HeartIcon size={17} filled={wishlisted} />
          </button>
        </div>

        <p className="text-xs leading-relaxed text-noir/55">{product.tagline}</p>

        <Rating value={product.rating} reviews={product.reviews} className="mt-0.5" />

        <div className="mt-auto pt-2">
          <Price price={product.price} original={product.originalPrice} />
        </div>
      </div>
    </article>
  )
}

export function ProductRowCard({ product }: { product: Product }) {
  const { addItem, toggleWishlist, isWishlisted, setCartOpen } = useStore()
  const wishlisted = isWishlisted(product.id)
  return (
    <article className="group flex gap-4 border-b border-noir/10 py-5">
      <Link to={`/product/${product.slug}`} className="shrink-0">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="h-24 w-20 bg-cream"
          monogram={product.name.charAt(0)}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5">
        <Link
          to={`/product/${product.slug}`}
          className="font-display text-lg leading-tight hover:text-gold-deep"
        >
          {product.name}
        </Link>
        <p className="text-xs text-noir/55">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <Price price={product.price} original={product.originalPrice} size="sm" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label="Ajouter ou retirer de la liste d’envies"
              className={cn(
                'flex h-9 w-9 items-center justify-center border transition-colors',
                wishlisted
                  ? 'border-bordeaux bg-bordeaux text-ivory'
                  : 'border-noir/15 text-noir/60 hover:border-noir',
              )}
            >
              <HeartIcon size={16} filled={wishlisted} />
            </button>
            <button
              type="button"
              onClick={() => {
                addItem(product)
                setCartOpen(true)
              }}
              className="btn bg-noir px-4 py-2.5 text-[10px] text-ivory hover:bg-gold-deep"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
