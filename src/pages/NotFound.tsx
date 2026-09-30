import { Link } from 'react-router-dom'
import { usePage } from '../hooks/usePage'
import { products } from '../data/products'
import { ProductCard } from '../components/ui/ProductCard'
import { ArrowRightIcon } from '../components/ui/Icons'

export function NotFound() {
  usePage('Page introuvable | AURELIA')
  const suggestions = products.slice(0, 4)

  return (
    <div className="container-luxe py-20 text-center lg:py-28">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 font-display text-display-sm font-light uppercase">
        Cette page a
        <br />
        <span className="italic text-gold-deep">changé d’adresse.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-noir/65">
        L’adresse que vous avez suivie n’existe pas — mais la Collection du Nouvel An est
        exactement là où vous l’avez laissée.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Retour à l’accueil
        </Link>
        <Link to="/shop" className="btn-outline">
          Parcourir la boutique <ArrowRightIcon size={15} />
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 text-left sm:gap-x-6 lg:grid-cols-4">
        {suggestions.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
