import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { usePage } from '../hooks/usePage'
import { formatPriceFull } from '../utils'
import { ImageWithFallback, Reveal } from '../components/ui/Primitives'
import { ArrowRightIcon, CheckIcon, LockIcon, TruckIcon } from '../components/ui/Icons'

interface StoredOrder {
  number: string
  date: string
  items: {
    key: string
    name: string
    image: string
    slug: string
    quantity: number
    unitPrice: number
    options: Record<string, string>
  }[]
  totals: {
    subtotal: number
    discount: number
    shipping: number
    total: number
    itemCount: number
  }
  shippingMethod: 'standard' | 'express'
  information: { firstName: string; lastName: string; email: string; city: string; country: string }
  paymentMethod: string
}

export function OrderConfirmationPage() {
  usePage('Commande confirmée | AURELIA', 'Votre commande AURELIA a été confirmée.')
  const [order, setOrder] = useState<StoredOrder | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('aurelia:last-order')
      setOrder(raw ? (JSON.parse(raw) as StoredOrder) : null)
    } catch {
      setOrder(null)
    }
    setReady(true)
  }, [])

  const delivery = useMemo(() => {
    if (!order) return { label: '—', detail: '' }
    const start = new Date(order.date)
    const min = new Date(start)
    const max = new Date(start)
    const offset = order.shippingMethod === 'express' ? [1, 2] : [2, 5]
    min.setDate(min.getDate() + offset[0])
    max.setDate(max.getDate() + offset[1])
    const fmt = new Intl.DateTimeFormat('fr-FR', { month: 'short', day: 'numeric' })
    return {
      label: `${fmt.format(min)} – ${fmt.format(max)}`,
      detail:
        order.shippingMethod === 'express'
          ? 'Livraison express, suivie et assurée'
          : 'Livraison standard, suivie',
    }
  }, [order])

  if (!ready) return null
  if (!order) return <Navigate to="/" replace />

  return (
    <div className="container-luxe py-12 lg:py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-noir">
          <CheckIcon size={26} />
        </span>
        <p className="eyebrow mt-6">Merci</p>
        <h1 className="mt-4 font-display text-display-sm font-light uppercase">
          Commande confirmée
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-noir/65 sm:text-base">
          Merci de commencer l’année avec AURELIA. Une confirmation a été envoyée à{' '}
          <span className="text-noir">{order.information.email}</span>.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-[11px] uppercase tracking-wider2 text-noir/55">
          <span className="chip">
            Commande <span className="num ml-1 text-noir">{order.number}</span>
          </span>
          <span className="chip">{new Date(order.date).toLocaleDateString('fr-FR')}</span>
          <span className="chip">
            {order.items.length} {order.items.length === 1 ? 'produit' : 'produits'}
          </span>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
        <Reveal className="border border-noir/12 bg-white/70 p-6">
          <h2 className="text-[12px] uppercase tracking-luxe">Vos produits</h2>
          <ul className="mt-5 flex flex-col divide-y divide-noir/10">
            {order.items.map((item) => (
              <li key={item.key} className="flex items-center gap-4 py-4">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  monogram={item.name.charAt(0)}
                  className="h-20 w-16 shrink-0 bg-cream"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-display text-base leading-tight hover:text-gold-deep"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-noir/45">
                    {Object.values(item.options).join(' · ')} · Qté {item.quantity}
                  </p>
                </div>
                <span className="num text-sm">
                  {formatPriceFull(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-noir/10 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-noir/60">Sous-total</dt>
              <dd className="num">{formatPriceFull(order.totals.subtotal)}</dd>
            </div>
            {order.totals.discount > 0 && (
              <div className="flex justify-between text-gold-deep">
                <dt>Réduction</dt>
                <dd className="num">−{formatPriceFull(order.totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-noir/60">Livraison</dt>
              <dd className="num">
                {order.totals.shipping === 0 ? 'Offert' : formatPriceFull(order.totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-noir/10 pt-3 text-base">
              <dt className="font-medium">Total payé</dt>
              <dd className="num font-medium">{formatPriceFull(order.totals.total)}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6">
          <div className="border border-noir/12 bg-white/70 p-6">
            <h2 className="flex items-center gap-2 text-[12px] uppercase tracking-luxe">
              <TruckIcon size={16} className="text-gold-deep" /> Livraison
            </h2>
            <p className="mt-4 font-display text-2xl font-light">{delivery.label}</p>
            <p className="mt-1.5 text-[13px] text-noir/55">{delivery.detail}</p>
            <p className="mt-4 border-t border-noir/10 pt-4 text-sm text-noir/70">
              {order.information.firstName} {order.information.lastName}
              <br />
              {order.information.city}, {order.information.country}
            </p>
          </div>

          <div className="border border-noir/12 bg-white/70 p-6">
            <h2 className="flex items-center gap-2 text-[12px] uppercase tracking-luxe">
              <LockIcon size={14} className="text-gold-deep" /> Paiement
            </h2>
            <p className="mt-3 text-sm text-noir/70">
              {order.paymentMethod === 'card'
                ? 'Paiement par carte approuvé — géré en toute sécurité par notre prestataire.'
                : order.paymentMethod === 'paypal'
                  ? 'Approuvé avec PayPal.'
                  : 'Approuvé avec votre portefeuille numérique.'}
            </p>
            <p className="mt-2 text-[11px] text-noir/45">
              Commande de démonstration — aucun paiement réel n’a été encaissé.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/shop" className="btn-primary">
              Continuer mes achats <ArrowRightIcon size={15} />
            </Link>
            <Link to="/" className="btn-outline">
              Retour à l’accueil
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
