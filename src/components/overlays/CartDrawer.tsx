import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore, PROMOS } from '../../store/StoreContext'
import { formatPriceFull } from '../../utils'
import { Drawer } from '../ui/Overlay'
import { ImageWithFallback, QuantityStepper } from '../ui/Primitives'
import { BagIcon, CloseIcon, LockIcon, TrashIcon, CheckIcon } from '../ui/Icons'

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    lines,
    setQuantity,
    removeItem,
    totals,
    applyPromo,
    promo,
    removePromo,
  } = useStore()
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null)
  const navigate = useNavigate()

  const close = () => setCartOpen(false)

  const onApply = (event: React.FormEvent) => {
    event.preventDefault()
    if (!code.trim()) return
    const result = applyPromo(code)
    setFeedback(result)
    if (result.ok) setCode('')
  }

  const progress = Math.min(
    100,
    ((totals.freeShippingThreshold - totals.freeShippingGap) / totals.freeShippingThreshold) * 100,
  )

  return (
    <Drawer open={cartOpen} onClose={close} labelledBy="cart-drawer-title">
      <header className="flex items-center justify-between border-b border-noir/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <BagIcon size={18} />
          <h2 id="cart-drawer-title" className="text-[12px] uppercase tracking-luxe">
            Votre panier
          </h2>
          <span className="num text-[12px] text-noir/50">({totals.itemCount})</span>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Fermer le panier"
          className="flex h-9 w-9 items-center justify-center border border-noir/15 transition-colors hover:bg-noir hover:text-ivory"
        >
          <CloseIcon size={17} />
        </button>
      </header>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-noir/15 text-noir/40">
            <BagIcon size={26} />
          </div>
          <div>
            <p className="font-display text-2xl font-light">Votre panier vous attend</p>
            <p className="mt-2 text-sm text-noir/60">
              Découvrez la Collection du Nouvel An et remplissez-le de belles pièces.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              close()
              navigate('/shop')
            }}
          >
            Découvrir la collection
          </button>
        </div>
      ) : (
        <>
          <div className="border-b border-noir/10 px-5 py-4">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-noir/60">
              <span>
                {totals.freeShippingGap > 0
                  ? `Encore ${formatPriceFull(totals.freeShippingGap)} pour la livraison offerte`
                  : 'Livraison standard offerte débloquée'}
              </span>
              <span className="num">{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-1 w-full bg-noir/10">
              <div
                className="h-full bg-gold transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto px-5">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4 border-b border-noir/10 py-5">
                <Link
                  to={`/product/${line.slug}`}
                  onClick={close}
                  className="shrink-0"
                  aria-label={`Voir ${line.name}`}
                >
                  <ImageWithFallback
                    src={line.image}
                    alt={line.name}
                    className="h-24 w-20 bg-cream"
                    monogram={line.name.charAt(0)}
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to={`/product/${line.slug}`}
                      onClick={close}
                      className="font-display text-base leading-tight hover:text-gold-deep"
                    >
                      {line.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(line.key)}
                      aria-label={`Supprimer ${line.name} du panier`}
                      className="text-noir/40 transition-colors hover:text-bordeaux"
                    >
                      <TrashIcon size={15} />
                    </button>
                  </div>
                  {Object.keys(line.options).length > 0 && (
                    <p className="truncate text-[11px] uppercase tracking-wider text-noir/45">
                      {Object.values(line.options).join(' · ')}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <QuantityStepper
                      compact
                      value={line.quantity}
                      onChange={(next) => setQuantity(line.key, next)}
                    />
                    <span className="num text-sm font-medium">
                      {formatPriceFull(line.unitPrice * line.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-noir/10 px-5 py-5">
            <form onSubmit={onApply} className="flex gap-2">
              <label htmlFor="promo-drawer" className="sr-only">
                Code promo
              </label>
              <input
                id="promo-drawer"
                className="field py-2.5 text-[13px] uppercase tracking-wider"
                placeholder="Code promo"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <button type="submit" className="chip shrink-0 px-4">
                Appliquer
              </button>
            </form>

            {feedback && (
              <p
                className={
                  'mt-2 flex items-center gap-1.5 text-[12px] ' +
                  (feedback.ok ? 'text-gold-deep' : 'text-bordeaux')
                }
              >
                {feedback.ok && <CheckIcon size={13} />}
                {feedback.message}
              </p>
            )}
            {!feedback && (
              <p className="mt-2 text-[11px] text-noir/45">
                Essayez <span className="uppercase">AURELIA10</span> ou{' '}
                <span className="uppercase">NEWYEAR15</span>
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
                  aria-label="Supprimer le code promo"
                >
                  <CloseIcon size={14} />
                </button>
              </div>
            )}

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-noir/60">Sous-total</dt>
                <dd className="num font-medium">{formatPriceFull(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-gold-deep">
                  <dt>Réduction</dt>
                  <dd className="num">−{formatPriceFull(totals.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-noir/60">Livraison</dt>
                <dd className="num">
                  {totals.shipping === 0 ? 'Offert' : formatPriceFull(totals.shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-noir/10 pt-3 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="num font-medium">{formatPriceFull(totals.total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="btn-primary mt-4 w-full"
              onClick={() => {
                close()
                navigate('/checkout')
              }}
            >
              Passer au paiement
            </button>
            <div className="mt-3 flex flex-col items-center gap-2">
              <Link
                to="/cart"
                onClick={close}
                className="text-[11px] uppercase tracking-wider2 text-noir/60 underline-offset-4 hover:underline"
              >
                Voir le panier
              </Link>
              <span className="flex items-center gap-1.5 text-[11px] text-noir/50">
                <LockIcon size={13} /> Paiement sécurisé
              </span>
            </div>
          </div>
        </>
      )}
    </Drawer>
  )
}
