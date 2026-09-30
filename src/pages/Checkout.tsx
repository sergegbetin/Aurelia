import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore, PROMOS } from '../store/StoreContext'
import { usePage } from '../hooks/usePage'
import { cn, formatPriceFull } from '../utils'
import { ImageWithFallback, Price, QuantityStepper } from '../components/ui/Primitives'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/ui/Icons'

type Step = 1 | 2 | 3

interface InformationForm {
  email: string
  firstName: string
  lastName: string
  address: string
  complement: string
  city: string
  postalCode: string
  country: string
  phone: string
}

interface PaymentForm {
  method: 'card' | 'paypal' | 'applepay'
  cardName: string
  cardNumber: string
  expiry: string
  cvc: string
}

const emptyInformation: InformationForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  complement: '',
  city: '',
  postalCode: '',
  country: 'France',
  phone: '',
}

const emptyPayment: PaymentForm = {
  method: 'card',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

const steps: { id: Step; label: string }[] = [
  { id: 1, label: 'Informations' },
  { id: 2, label: 'Livraison' },
  { id: 3, label: 'Paiement' },
]

const countries = ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Canada', 'États-Unis']

export function CheckoutPage() {
  usePage('Paiement | AURELIA', 'Finalisez votre commande AURELIA — paiement sécurisé.')
  const {
    lines,
    totals,
    applyPromo,
    promo,
    removePromo,
    shippingMethod,
    setShippingMethod,
    clearCart,
  } = useStore()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>(1)
  const [information, setInformation] = useState<InformationForm>(emptyInformation)
  const [payment, setPayment] = useState<PaymentForm>(emptyPayment)
  const [giftNote, setGiftNote] = useState('')
  const [hidePrices, setHidePrices] = useState(true)
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const summaryOpen = useMemo(() => ({ ...totals }), [totals])

  if (lines.length === 0 && !submitting) {
    return (
      <div className="container-luxe py-20 text-center">
        <h1 className="font-display text-3xl font-light uppercase">Votre panier est vide</h1>
        <p className="mt-3 text-sm text-noir/60">Ajoutez une belle pièce avant de passer au paiement.</p>
        <Link to="/shop" className="btn-primary mt-6">
          Découvrir la collection
        </Link>
      </div>
    )
  }

  const setInfo = (field: keyof InformationForm, value: string) => {
    setInformation((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validateStep1 = () => {
    const next: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(information.email.trim()))
      next.email = 'Saisissez une adresse e-mail valide.'
    if (!information.firstName.trim()) next.firstName = 'Champ obligatoire.'
    if (!information.lastName.trim()) next.lastName = 'Champ obligatoire.'
    if (!information.address.trim()) next.address = 'Champ obligatoire.'
    if (!information.city.trim()) next.city = 'Champ obligatoire.'
    if (!information.postalCode.trim()) next.postalCode = 'Champ obligatoire.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateStep3 = () => {
    if (payment.method !== 'card') return true
    const next: Record<string, string> = {}
    if (!payment.cardName.trim()) next.cardName = 'Champ obligatoire.'
    if (payment.cardNumber.replace(/\s/g, '').length < 15) next.cardNumber = 'Saisissez un numéro de carte valide.'
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(payment.expiry.trim())) next.expiry = 'MM / AA'
    if (payment.cvc.trim().length < 3) next.cvc = 'Saisissez le CVC.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const placeOrder = () => {
    if (!validateStep3()) return
    setSubmitting(true)
    const order = {
      number: `AU-${String(Date.now()).slice(-6)}`,
      date: new Date().toISOString(),
      items: lines,
      totals: { ...totals },
      shippingMethod,
      information,
      giftNote,
      hidePrices,
      paymentMethod: payment.method,
    }
    try {
      window.localStorage.setItem('aurelia:last-order', JSON.stringify(order))
    } catch {
      /* ignore */
    }
    clearCart()
    window.setTimeout(() => navigate('/order-confirmation'), 450)
  }

  const fieldClass = (name: string) =>
    cn('field', errors[name] && 'border-bordeaux focus:border-bordeaux')

  const errorFor = (name: string) =>
    errors[name] ? (
      <p className="mt-1.5 text-[12px] text-bordeaux" role="alert">
        {errors[name]}
      </p>
    ) : null

  return (
    <div className="container-luxe py-10 lg:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-noir/10 pb-6">
        <div>
          <span className="eyebrow">Paiement sécurisé</span>
          <h1 className="mt-3 font-display text-4xl font-light uppercase lg:text-5xl">Paiement</h1>
        </div>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-noir/55">
          <LockIcon size={14} className="text-gold-deep" /> Paiement chiffré
        </span>
      </div>

      <ol className="mt-8 flex flex-wrap items-center gap-3 sm:gap-5" aria-label="Étapes du paiement">
        {steps.map((item, index) => {
          const active = step === item.id
          const done = step > item.id
          return (
            <li key={item.id} className="flex items-center gap-3 sm:gap-5">
              <button
                type="button"
                onClick={() => {
                  if (item.id < step) setStep(item.id)
                }}
                disabled={item.id > step}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-3 text-[11px] uppercase tracking-wider2 transition-colors',
                  active ? 'text-noir' : done ? 'text-gold-deep' : 'text-noir/35',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center border text-[12px] num',
                    active
                      ? 'border-noir bg-noir text-ivory'
                      : done
                        ? 'border-gold bg-gold text-noir'
                        : 'border-noir/20',
                  )}
                >
                  {done ? <CheckIcon size={14} /> : item.id}
                </span>
                {item.label}
              </button>
              {index < steps.length - 1 && <span className="h-px w-6 bg-noir/20 sm:w-12" />}
            </li>
          )
        })}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 xl:col-span-8">
          {/* STEP 1 */}
          {step === 1 && (
            <section className="flex flex-col gap-5" aria-labelledby="step-1-title">
              <h2 id="step-1-title" className="font-display text-2xl font-light">
                1 — Informations
              </h2>

              <div>
                <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass('email')}
                  placeholder="vous@exemple.fr"
                  value={information.email}
                  onChange={(event) => setInfo('email', event.target.value)}
                />
                {errorFor('email')}
                <p className="mt-1.5 text-[11px] text-noir/45">
                  La confirmation et le suivi de la commande sont envoyés ici.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    autoComplete="given-name"
                    className={fieldClass('firstName')}
                    value={information.firstName}
                    onChange={(event) => setInfo('firstName', event.target.value)}
                  />
                  {errorFor('firstName')}
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    autoComplete="family-name"
                    className={fieldClass('lastName')}
                    value={information.lastName}
                    onChange={(event) => setInfo('lastName', event.target.value)}
                  />
                  {errorFor('lastName')}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                  Adresse
                </label>
                <input
                  id="address"
                  autoComplete="street-address"
                  className={fieldClass('address')}
                  placeholder="Rue et numéro"
                  value={information.address}
                  onChange={(event) => setInfo('address', event.target.value)}
                />
                {errorFor('address')}
              </div>

              <div>
                <label htmlFor="complement" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                  Étage, bureau, etc. <span className="normal-case text-noir/40">(facultatif)</span>
                </label>
                <input
                  id="complement"
                  autoComplete="address-line2"
                  className="field"
                  value={information.complement}
                  onChange={(event) => setInfo('complement', event.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                    Ville
                  </label>
                  <input
                    id="city"
                    autoComplete="address-level2"
                    className={fieldClass('city')}
                    value={information.city}
                    onChange={(event) => setInfo('city', event.target.value)}
                  />
                  {errorFor('city')}
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                    Code postal
                  </label>
                  <input
                    id="postalCode"
                    autoComplete="postal-code"
                    className={fieldClass('postalCode')}
                    value={information.postalCode}
                    onChange={(event) => setInfo('postalCode', event.target.value)}
                  />
                  {errorFor('postalCode')}
                </div>
                <div>
                  <label htmlFor="country" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                    Pays
                  </label>
                  <select
                    id="country"
                    autoComplete="country-name"
                    className="field"
                    value={information.country}
                    onChange={(event) => setInfo('country', event.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                  Téléphone <span className="normal-case text-noir/40">(facultatif)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className="field"
                  placeholder="Pour le suivi de la livraison"
                  value={information.phone}
                  onChange={(event) => setInfo('phone', event.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn-primary mt-2 w-full sm:w-auto"
                onClick={() => {
                  if (validateStep1()) setStep(2)
                }}
              >
                Continuer vers la livraison <ArrowRightIcon size={15} />
              </button>
            </section>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <section className="flex flex-col gap-6" aria-labelledby="step-2-title">
              <h2 id="step-2-title" className="font-display text-2xl font-light">
                2 — Livraison
              </h2>

              <div className="border border-noir/12 p-5 text-sm text-noir/70">
                <p className="text-[11px] uppercase tracking-luxe text-noir/50">Livraison à</p>
                <p className="mt-2">
                  {information.firstName} {information.lastName}
                  <br />
                  {information.address}
                  {information.complement && (
                    <>
                      <br />
                      {information.complement}
                    </>
                  )}
                  <br />
                  {information.postalCode} {information.city}, {information.country}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-3 text-[11px] uppercase tracking-wider text-gold-deep underline-offset-4 hover:underline"
                >
                  Modifier les informations
                </button>
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 text-[11px] uppercase tracking-luxe text-noir/55">
                  Mode de livraison
                </legend>
                {(
                  [
                    {
                      id: 'standard',
                      title: 'Livraison standard',
                      detail: '2 à 5 jours ouvrés · suivi',
                      price: totals.subtotal >= 150 ? 'Offert' : formatPriceFull(9.9),
                    },
                    {
                      id: 'express',
                      title: 'Livraison express',
                      detail: '1 à 2 jours ouvrés · suivi et assurance',
                      price: formatPriceFull(19.9),
                    },
                  ] as const
                ).map((method) => {
                  const active = shippingMethod === method.id
                  return (
                    <label
                      key={method.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-4 border p-4 transition-all',
                        active ? 'border-noir bg-white' : 'border-noir/12 hover:border-noir/40',
                      )}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={active}
                        onChange={() => setShippingMethod(method.id)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          'mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                          active ? 'border-gold bg-gold' : 'border-noir/30',
                        )}
                        aria-hidden
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-noir" />}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-noir">{method.title}</span>
                          <span className="num text-sm text-noir">{method.price}</span>
                        </span>
                        <span className="mt-1 block text-[12px] text-noir/55">{method.detail}</span>
                      </span>
                    </label>
                  )
                })}
              </fieldset>

              <fieldset className="border border-noir/12 p-5">
                <legend className="px-1 text-[11px] uppercase tracking-luxe text-noir/55">
                  Options cadeau
                </legend>
                <label className="flex items-center gap-3 text-sm text-noir/70">
                  <input
                    type="checkbox"
                    checked={hidePrices}
                    onChange={(event) => setHidePrices(event.target.checked)}
                    className="h-4 w-4 accent-[#C0964B]"
                  />
                  Masquer les prix sur le colis (cadeau)
                </label>
                <label htmlFor="giftNote" className="mt-4 block text-[11px] uppercase tracking-luxe text-noir/55">
                  Message cadeau <span className="normal-case text-noir/40">(facultatif)</span>
                </label>
                <textarea
                  id="giftNote"
                  rows={3}
                  maxLength={200}
                  className="field mt-2 resize-none"
                  placeholder="Quelques mots pour la personne qui recevra ce colis…"
                  value={giftNote}
                  onChange={(event) => setGiftNote(event.target.value)}
                />
                <p className="mt-1.5 text-right text-[11px] text-noir/40 num">{giftNote.length}/200</p>
              </fieldset>

              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-outline" onClick={() => setStep(1)}>
                  <ArrowLeftIcon size={15} /> Retour
                </button>
                <button type="button" className="btn-primary" onClick={() => setStep(3)}>
                  Continuer vers le paiement <ArrowRightIcon size={15} />
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <section className="flex flex-col gap-6" aria-labelledby="step-3-title">
              <h2 id="step-3-title" className="font-display text-2xl font-light">
                3 — Paiement
              </h2>

              <div className="flex items-start gap-3 border border-gold/40 bg-gold-pale/50 p-4 text-[12px] leading-relaxed text-noir/70">
                <ShieldIcon size={17} className="mt-0.5 shrink-0 text-gold-deep" />
                <p>
                  Les informations de paiement sont gérées par notre prestataire (Stripe). Les
                  données de carte sont saisies dans une iframe sécurisée et ne sont jamais
                  stockées, transmises ni visibles par cette boutique.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {(
                  [
                    { id: 'card', label: 'Carte bancaire', hint: 'Visa, Mastercard, Amex' },
                    { id: 'paypal', label: 'PayPal', hint: 'Vous serez redirigé pour confirmer' },
                    { id: 'applepay', label: 'Apple Pay / Google Pay', hint: 'Paiement express en un geste' },
                  ] as const
                ).map((method) => {
                  const active = payment.method === method.id
                  return (
                    <label
                      key={method.id}
                      className={cn(
                        'flex cursor-pointer items-center gap-4 border p-4 transition-all',
                        active ? 'border-noir bg-white' : 'border-noir/12 hover:border-noir/40',
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={active}
                        onChange={() => {
                          setPayment((current) => ({ ...current, method: method.id }))
                          setErrors({})
                        }}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                          active ? 'border-gold bg-gold' : 'border-noir/30',
                        )}
                        aria-hidden
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-noir" />}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-noir">{method.label}</span>
                        <span className="block text-[12px] text-noir/55">{method.hint}</span>
                      </span>
                      <LockIcon size={15} className="text-noir/40" />
                    </label>
                  )
                })}
              </div>

              {payment.method === 'card' && (
                <div className="border border-noir/12 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between gap-3 border-b border-noir/10 pb-3">
                    <span className="text-[11px] uppercase tracking-luxe text-noir/50">
                      Coordonnées de carte
                    </span>
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gold-deep">
                      <LockIcon size={12} /> Propulsé par Stripe
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="cardName" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                        Nom sur la carte
                      </label>
                      <input
                        id="cardName"
                        autoComplete="cc-name"
                        className={fieldClass('cardName')}
                        value={payment.cardName}
                        onChange={(event) => {
                          setPayment((current) => ({ ...current, cardName: event.target.value }))
                          if (errors.cardName) setErrors((c) => ({ ...c, cardName: '' }))
                        }}
                      />
                      {errorFor('cardName')}
                    </div>

                    <div>
                      <label htmlFor="cardNumber" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                        Numéro de carte
                      </label>
                      <input
                        id="cardNumber"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="4242 4242 4242 4242"
                        className={cn(fieldClass('cardNumber'), 'num tracking-widest')}
                        value={payment.cardNumber}
                        onChange={(event) => {
                          const digits = event.target.value.replace(/\D/g, '').slice(0, 16)
                          const grouped = digits.replace(/(.{4})/g, '$1 ').trim()
                          setPayment((current) => ({ ...current, cardNumber: grouped }))
                          if (errors.cardNumber) setErrors((c) => ({ ...c, cardNumber: '' }))
                        }}
                      />
                      {errorFor('cardNumber')}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="expiry" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                          Expiration
                        </label>
                        <input
                          id="expiry"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM / AA"
                          className={cn(fieldClass('expiry'), 'num')}
                          value={payment.expiry}
                          onChange={(event) => {
                            const digits = event.target.value.replace(/\D/g, '').slice(0, 4)
                            const value =
                              digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
                            setPayment((current) => ({ ...current, expiry: value }))
                            if (errors.expiry) setErrors((c) => ({ ...c, expiry: '' }))
                          }}
                        />
                        {errorFor('expiry')}
                      </div>
                      <div>
                        <label htmlFor="cvc" className="mb-2 block text-[11px] uppercase tracking-luxe text-noir/55">
                          CVC
                        </label>
                        <input
                          id="cvc"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder="123"
                          className={cn(fieldClass('cvc'), 'num')}
                          value={payment.cvc}
                          onChange={(event) => {
                            const digits = event.target.value.replace(/\D/g, '').slice(0, 4)
                            setPayment((current) => ({ ...current, cvc: digits }))
                            if (errors.cvc) setErrors((c) => ({ ...c, cvc: '' }))
                          }}
                        />
                        {errorFor('cvc')}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 border-t border-noir/10 pt-3 text-[11px] leading-relaxed text-noir/45">
                    Champs de démonstration — en production, ce bloc est remplacé par un élément
                    Stripe. Rien de ce qui est saisi n’est stocké ni transmis.
                  </p>
                </div>
              )}

              {payment.method !== 'card' && (
                <div className="border border-noir/12 bg-white p-5 text-sm text-noir/65">
                  Vous validerez le paiement avec {payment.method === 'paypal' ? 'PayPal' : 'votre portefeuille'}{' '}
                  sur l’écran suivant. Aucune donnée de carte n’est collectée sur ce site.
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-outline" onClick={() => setStep(2)}>
                  <ArrowLeftIcon size={15} /> Retour
                </button>
                <button
                  type="button"
                  className="btn-primary btn-shine"
                  onClick={placeOrder}
                  disabled={submitting}
                >
                  {submitting ? 'Traiter le paiement…' : `Payer ${formatPriceFull(totals.total)}`}
                  {!submitting && <LockIcon size={14} />}
                </button>
              </div>

              <p className="text-[11px] leading-relaxed text-noir/45">
                En confirmant, vous acceptez nos conditions générales. Ceci est une boutique de
                démonstration — aucun paiement réel n’est encaissé.
              </p>
            </section>
          )}
        </div>

        {/* Summary */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-32 border border-noir/12 bg-white/70 p-6">
            <h2 className="text-[12px] uppercase tracking-luxe">Votre commande</h2>

            <ul className="mt-5 flex max-h-72 flex-col gap-4 overflow-y-auto pr-1">
              {lines.map((line) => (
                <li key={line.key} className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <ImageWithFallback
                      src={line.image}
                      alt={line.name}
                      monogram={line.name.charAt(0)}
                      className="h-16 w-14 bg-cream"
                    />
                    <span className="num absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-noir px-1 text-[10px] text-ivory">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-noir">{line.name}</p>
                    <p className="truncate text-[11px] uppercase tracking-wider text-noir/45">
                      {Object.values(line.options).join(' · ')}
                    </p>
                  </div>
                  <span className="num shrink-0 text-[13px]">
                    {formatPriceFull(line.unitPrice * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <form
              className="mt-5 flex gap-2 border-t border-noir/10 pt-5"
              onSubmit={(event) => {
                event.preventDefault()
                if (!code.trim()) return
                const result = applyPromo(code)
                setFeedback(result)
                if (result.ok) setCode('')
              }}
            >
              <label htmlFor="promo-checkout" className="sr-only">
                Code promo
              </label>
              <input
                id="promo-checkout"
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
              <p className={cn('mt-2 text-[12px]', feedback.ok ? 'text-gold-deep' : 'text-bordeaux')}>
                {feedback.message}
              </p>
            )}

            {promo && (
              <div className="mt-3 flex items-center justify-between border border-gold/40 bg-gold-pale/60 px-3 py-2">
                <span className="text-[11px] uppercase tracking-wider text-gold-deep">
                  {PROMOS[promo].code}
                </span>
                <button
                  type="button"
                  onClick={removePromo}
                  className="text-noir/50 hover:text-bordeaux"
                  aria-label="Supprimer le code promo"
                >
                  ×
                </button>
              </div>
            )}

            <dl className="mt-5 space-y-2.5 border-t border-noir/10 pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-noir/60">Sous-total</dt>
                <dd className="num font-medium">{formatPriceFull(summaryOpen.subtotal)}</dd>
              </div>
              {summaryOpen.discount > 0 && (
                <div className="flex justify-between text-gold-deep">
                  <dt>Réduction</dt>
                  <dd className="num">−{formatPriceFull(summaryOpen.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-noir/60">Livraison</dt>
                <dd className="num">
                  {summaryOpen.shipping === 0 ? 'Offert' : formatPriceFull(summaryOpen.shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-noir/10 pt-3 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="num font-medium">{formatPriceFull(summaryOpen.total)}</dd>
              </div>
            </dl>

            <ul className="mt-5 space-y-2.5 border-t border-noir/10 pt-4 text-[12px] text-noir/60">
              <li className="flex items-center gap-2.5">
                <TruckIcon size={16} className="text-gold-deep" /> Livraison estimée : 2–5 jours
                ouvrés
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldIcon size={15} className="text-gold-deep" /> Retours faciles selon notre
                politique de retours
              </li>
              <li className="flex items-center gap-2.5">
                <LockIcon size={14} className="text-gold-deep" /> Paiement sécurisé
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function CheckoutQuantityPreview({ quantity }: { quantity: number }) {
  return <span className="num">{quantity}</span>
}
