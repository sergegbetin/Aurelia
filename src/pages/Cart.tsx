import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore, PROMOS } from '../store/StoreContext'
import { usePage } from '../hooks/usePage'
import { products as allProducts } from '../data/products'
import { formatPriceFull, cn } from '../utils'
import {
  ArrowLink,
  ImageWithFallback,
  Price,
  QuantityStepper,
  Reveal,
  SectionHeading,
} from '../components/ui/Primitives'
import { ProductRowCard } from '../components/ui/ProductCard'
import {
  BagIcon,
  CheckIcon,
  CloseIcon,
  LockIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/ui/Icons'

export function CartPage() {
  usePage('Your cart | AURELIA', 'Review your AURELIA selection before checkout.')
  const {
    lines,
    setQuantity,
    removeItem,
    totals,
    applyPromo,
    promo,
    removePromo,
    shippingMethod,
    setShippingMethod,
  } = useStore()
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null)
  const navigate = useNavigate()

  const suggestions = allProducts.filter(
    (product) => !lines.some((line) => line.productId === product.id),
  )

  const onApply = (event: React.FormEvent) => {
    event.preventDefault()
    if (!code.trim()) return
    const result = applyPromo(code)
    setFeedback(result)
    if (result.ok) setCode('')
  }

  if (lines.length === 0) {
    return (
      <div className="container-luxe py-20 lg:py-28">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 border border-noir/10 bg-white/60 px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-noir/15 text-noir/40">
            <BagIcon size={26} />
          </span>
          <div>
            <h1 className="font-display text-3xl font-light uppercase">Your cart is empty</h1>
            <p className="mt-3 text-sm leading-relaxed text-noir/60">
              Nothing here yet — but the New Year Collection is full of good reasons to start.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn-primary">
              Shop the collection
            </Link>
            <Link to="/shop?category=gifts" className="btn-outline">
              Find a gift
            </Link>
          </div>
        </div>

        <section className="mt-16">
          <SectionHeading
            align="left"
            eyebrow="Start here"
            title="A few favourites"
            subtitle="The pieces our community reaches for first."
          />
          <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {suggestions.slice(0, 4).map((product) => (
              <ProductRowCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="container-luxe py-10 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-noir/10 pb-6">
        <div>
          <span className="eyebrow">Your selection</span>
          <h1 className="mt-3 font-display text-4xl font-light uppercase lg:text-5xl">
            Your cart
          </h1>
        </div>
        <p className="text-[12px] uppercase tracking-wider text-noir/50">
          <span className="num text-noir">{totals.itemCount}</span>{' '}
          {totals.itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 xl:col-span-8">
          <ul className="divide-y divide-noir/10 border-y border-noir/10">
            {lines.map((line) => (
              <li key={line.key} className="flex flex-col gap-4 py-6 sm:flex-row sm:gap-6">
                <Link to={`/product/${line.slug}`} className="shrink-0">
                  <ImageWithFallback
                    src={line.image}
                    alt={line.name}
                    monogram={line.name.charAt(0)}
                    className="h-36 w-28 bg-cream sm:h-40 sm:w-32"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/product/${line.slug}`}
                        className="font-display text-xl leading-tight hover:text-gold-deep"
                      >
                        {line.name}
                      </Link>
                      {Object.keys(line.options).length > 0 && (
                        <p className="mt-1.5 text-[11px] uppercase tracking-wider text-noir/50">
                          {Object.entries(line.options)
                            .map(([label, value]) => `${label}: ${value}`)
                            .join(' · ')}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.key)}
                      aria-label={`Remove ${line.name}`}
                      className="text-noir/40 transition-colors hover:text-bordeaux"
                    >
                      <CloseIcon size={17} />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                    <QuantityStepper
                      value={line.quantity}
                      onChange={(next) => setQuantity(line.key, next)}
                    />
                    <div className="flex flex-col items-end gap-1">
                      <Price
                        price={line.unitPrice * line.quantity}
                        original={
                          line.originalPrice
                            ? line.originalPrice * line.quantity
                            : undefined
                        }
                      />
                      {line.quantity > 1 && (
                        <span className="text-[11px] text-noir/45 num">
                          {formatPriceFull(line.unitPrice)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/shop"
              className="text-[11px] uppercase tracking-wider2 text-noir/60 underline-offset-4 hover:text-gold-deep hover:underline"
            >
              ← Continue shopping
            </Link>
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="btn-primary"
            >
              Proceed to checkout
            </button>
          </div>

          <section className="mt-14 border-t border-noir/10 pt-8">
            <h2 className="font-display text-2xl font-light">You may also like</h2>
            <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {suggestions.slice(0, 4).map((product) => (
                <ProductRowCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-32 border border-noir/12 bg-white/70 p-6">
            <h2 className="text-[12px] uppercase tracking-luxe">Order summary</h2>

            <form onSubmit={onApply} className="mt-5 flex gap-2">
              <label htmlFor="promo-page" className="sr-only">
                Promo code
              </label>
              <input
                id="promo-page"
                className="field py-2.5 text-[13px] uppercase tracking-wider"
                placeholder="Promo code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <button type="submit" className="chip shrink-0 px-4">
                Apply
              </button>
            </form>

            {feedback && (
              <p
                className={cn(
                  'mt-2 text-[12px]',
                  feedback.ok ? 'text-gold-deep' : 'text-bordeaux',
                )}
              >
                {feedback.message}
              </p>
            )}
            {!feedback && (
              <p className="mt-2 text-[11px] text-noir/45">
                Demo codes: <span className="uppercase">AURELIA10</span>,{' '}
                <span className="uppercase">NEWYEAR15</span>,{' '}
                <span className="uppercase">FREESHIP</span>
              </p>
            )}

            {promo && (
              <div className="mt-3 flex items-center justify-between border border-gold/40 bg-gold-pale/60 px-3 py-2">
                <span className="text-[11px] uppercase tracking-wider text-gold-deep">
                  {PROMOS[promo].code} — {PROMOS[promo].label}
                </span>
                <button
                  type="button"
                  onClick={removePromo}
                  className="text-noir/50 hover:text-bordeaux"
                  aria-label="Remove promo code"
                >
                  <CloseIcon size={14} />
                </button>
              </div>
            )}

            <fieldset className="mt-6">
              <legend className="mb-3 text-[11px] uppercase tracking-luxe text-noir/50">
                Delivery
              </legend>
              <div className="flex flex-col gap-2">
                {(
                  [
                    { id: 'standard', label: 'Standard · 2–5 business days', price: 'Free over $150' },
                    { id: 'express', label: 'Express · 1–2 business days', price: '$19.90' },
                  ] as const
                ).map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-3 border px-3.5 py-3 text-[13px] transition-all',
                      shippingMethod === method.id
                        ? 'border-noir bg-noir text-ivory'
                        : 'border-noir/12 hover:border-noir/40',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === method.id}
                        onChange={() => setShippingMethod(method.id)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          'flex h-4 w-4 items-center justify-center rounded-full border',
                          shippingMethod === method.id
                            ? 'border-gold bg-gold'
                            : 'border-noir/30',
                        )}
                        aria-hidden
                      >
                        {shippingMethod === method.id && (
                          <span className="h-1.5 w-1.5 rounded-full bg-noir" />
                        )}
                      </span>
                      {method.label}
                    </span>
                    <span
                      className={cn(
                        'text-[11px]',
                        shippingMethod === method.id ? 'text-ivory/60' : 'text-noir/45',
                      )}
                    >
                      {method.price}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <dl className="mt-6 space-y-2.5 border-t border-noir/10 pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-noir/60">Subtotal</dt>
                <dd className="num font-medium">{formatPriceFull(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-gold-deep">
                  <dt>Discount</dt>
                  <dd className="num">−{formatPriceFull(totals.discount)}</dd>
                </div>
              )}
              {totals.savings > 0 && (
                <div className="flex justify-between text-bordeaux">
                  <dt>You saved</dt>
                  <dd className="num">−{formatPriceFull(totals.savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-noir/60">Delivery</dt>
                <dd className="num">
                  {totals.shipping === 0 ? 'Free' : formatPriceFull(totals.shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-noir/10 pt-3 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="num font-medium">{formatPriceFull(totals.total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="btn-primary mt-6 w-full"
              onClick={() => navigate('/checkout')}
            >
              Proceed to checkout
            </button>

            <ul className="mt-5 space-y-2.5 text-[12px] text-noir/60">
              <li className="flex items-center gap-2.5">
                <LockIcon size={14} className="text-gold-deep" /> Secure checkout
              </li>
              <li className="flex items-center gap-2.5">
                <TruckIcon size={16} className="text-gold-deep" /> Estimated delivery: 2–5 business
                days
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldIcon size={15} className="text-gold-deep" /> Easy returns within 30 days
              </li>
            </ul>

            <p className="mt-5 border-t border-noir/10 pt-4 text-[11px] leading-relaxed text-noir/45">
              Demo storefront — no payment is processed and no card details are stored.
            </p>
          </div>
        </aside>
      </div>

      <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-noir/10 pt-6">
        <ArrowLink to="/shop?view=new">New arrivals</ArrowLink>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-noir/50">
          <CheckIcon size={14} className="text-gold-deep" /> Free gift wrapping on every order
        </span>
      </Reveal>
    </div>
  )
}
