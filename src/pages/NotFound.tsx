import { Link } from 'react-router-dom'
import { usePage } from '../hooks/usePage'
import { products } from '../data/products'
import { ProductCard } from '../components/ui/ProductCard'
import { ArrowRightIcon } from '../components/ui/Icons'

export function NotFound() {
  usePage('Page not found | AURELIA')
  const suggestions = products.slice(0, 4)

  return (
    <div className="container-luxe py-20 text-center lg:py-28">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 font-display text-display-sm font-light uppercase">
        This page has
        <br />
        <span className="italic text-gold-deep">moved on.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-noir/65">
        The address you followed does not exist — but the New Year Collection is exactly where you
        left it.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/shop" className="btn-outline">
          Browse the shop <ArrowRightIcon size={15} />
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
