import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/StoreContext'
import { computeDiscount } from '../../utils'
import { Modal } from '../ui/Overlay'
import { Badge, ImageWithFallback, Price, QuantityStepper, Rating } from '../ui/Primitives'
import { BagIcon, LockIcon, TruckIcon, ArrowRightIcon } from '../ui/Icons'

export function QuickView() {
  const { quickView, setQuickView, addItem, setCartOpen } = useStore()
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const close = () => {
    setQuickView(null)
    setQuantity(1)
  }

  if (!quickView) return null
  const product = quickView
  const discount = computeDiscount(product.price, product.originalPrice)

  return (
    <Modal open={Boolean(quickView)} onClose={close} labelledBy="quickview-title" size="lg">
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="relative">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            eager
            monogram={product.name.charAt(0)}
            className="aspect-[4/5] h-full w-full bg-cream sm:aspect-auto sm:min-h-[30rem]"
          />
          {product.badge && <Badge kind={product.badge} className="absolute left-4 top-4" />}
        </div>

        <div className="flex flex-col gap-4 p-6 sm:p-9">
          <span className="eyebrow">Quick view</span>
          <h2 id="quickview-title" className="font-display text-3xl font-light leading-tight">
            {product.name}
          </h2>
          <p className="text-sm text-noir/60">{product.tagline}</p>
          <Rating value={product.rating} reviews={product.reviews} />
          <Price price={product.price} original={product.originalPrice} size="lg" />
          {discount > 0 && (
            <p className="text-[12px] text-bordeaux">
              You save {discount}% — limited New Year pricing.
            </p>
          )}

          <p className="text-sm leading-relaxed text-noir/70">
            {product.description.split('. ')[0].replace(/[.\s]+$/, '')}.
          </p>

          {product.variants[0] && (
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-luxe text-noir/50">
                {product.variants[0].label}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants[0].options.map((option, index) => (
                  <span
                    key={option}
                    className={
                      'px-3 py-2 text-[11px] uppercase tracking-wider border ' +
                      (index === 0
                        ? 'border-noir bg-noir text-ivory'
                        : 'border-noir/15 text-noir/60')
                    }
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <span className="text-[12px] text-noir/55">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="mt-1 flex flex-col gap-2.5">
            <button
              type="button"
              className="btn-primary w-full"
              onClick={() => {
                addItem(product, quantity)
                close()
                setCartOpen(true)
              }}
            >
              <BagIcon size={16} /> Add to cart
            </button>
            <button
              type="button"
              className="btn-outline w-full"
              onClick={() => {
                close()
                navigate(`/product/${product.slug}`)
              }}
            >
              View product <ArrowRightIcon size={15} />
            </button>
          </div>

          <div className="mt-auto grid gap-2 border-t border-noir/10 pt-4 text-[12px] text-noir/60">
            <span className="flex items-center gap-2">
              <TruckIcon size={16} /> Estimated delivery: 2–5 business days
            </span>
            <span className="flex items-center gap-2">
              <LockIcon size={14} /> Secure payment
            </span>
          </div>

          <Link
            to={`/product/${product.slug}`}
            onClick={close}
            className="text-[11px] uppercase tracking-wider2 text-noir/55 underline-offset-4 hover:text-gold-deep hover:underline"
          >
            Full details, reviews and specifications
          </Link>
        </div>
      </div>
    </Modal>
  )
}
