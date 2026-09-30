import { Link } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import { usePage } from '../hooks/usePage'
import { products as allProducts } from '../data/products'
import { ProductCard } from '../components/ui/ProductCard'
import { Reveal, SectionHeading } from '../components/ui/Primitives'
import { HeartIcon, BagIcon } from '../components/ui/Icons'

export function WishlistPage() {
  usePage('Votre liste d’envies | AURELIA', 'Les produits que vous avez conservés dans la Collection du Nouvel An AURELIA.')
  const { wishlist, addItem, setCartOpen } = useStore()
  const saved = allProducts.filter((product) => wishlist.includes(product.id))
  const suggestions = allProducts.filter((product) => !wishlist.includes(product.id)).slice(0, 4)

  return (
    <div className="container-luxe py-10 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-noir/10 pb-6">
        <div>
          <span className="eyebrow">Mis de côté</span>
          <h1 className="mt-3 font-display text-4xl font-light uppercase lg:text-5xl">
            Votre liste d’envies
          </h1>
        </div>
        <p className="text-[12px] uppercase tracking-wider text-noir/50">
          <span className="num text-noir">{saved.length}</span>{' '}
          {saved.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-6 border border-noir/10 bg-white/60 px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-noir/15 text-noir/40">
            <HeartIcon size={26} />
          </span>
          <div>
            <h2 className="font-display text-3xl font-light">Rien d’enregistré pour l’instant</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-noir/60">
              Cliquez sur le cœur d’un produit pour le conserver ici — votre liste d’envies reste
              enregistrée sur cet appareil.
            </p>
          </div>
          <Link to="/shop" className="btn-primary">
            Découvrir la collection
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {saved.map((product, index) => (
              <Reveal key={product.id} delay={index * 60}>
                <ProductCard product={product} />
                <button
                  type="button"
                  onClick={() => {
                    addItem(product)
                    setCartOpen(true)
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 border border-noir/15 py-3 text-[11px] uppercase tracking-wider2 transition-colors hover:border-noir hover:bg-noir hover:text-ivory"
                >
                  <BagIcon size={14} /> Ajouter au panier
                </button>
              </Reveal>
            ))}
          </div>

          <section className="mt-16 border-t border-noir/10 pt-8">
            <SectionHeading
              align="left"
              eyebrow="À voir aussi"
              title="Davantage de pièces de la collection"
              subtitle="Si votre liste d’envies est déjà complète, voici les pièces que l’on ajoute ensuite."
            />
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {suggestions.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
