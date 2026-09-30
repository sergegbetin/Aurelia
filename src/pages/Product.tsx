import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { getProduct, relatedProducts } from '../data/products'
import { usePage } from '../hooks/usePage'
import { useStore } from '../store/StoreContext'
import { computeDiscount, formatPriceFull, cn } from '../utils'
import { ProductCard } from '../components/ui/ProductCard'
import {
  ArrowLink,
  Badge,
  ImageWithFallback,
  Price,
  QuantityStepper,
  Rating,
  Reveal,
  SectionHeading,
} from '../components/ui/Primitives'
import {
  ArrowLeftIcon,
  BagIcon,
  CheckIcon,
  ChevronDownIcon,
  HeartIcon,
  LockIcon,
  RefreshIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from '../components/ui/Icons'

const defaultFaq = [
  {
    question: 'Quand vais-je recevoir ma commande\u00A0?',
    answer:
      'Les commandes sont préparées sous 24 heures et livrées en 2 à 5 jours ouvrés. Vous recevrez un lien de suivi dès que le colis quittera notre atelier.',
  },
  {
    question: 'Puis-je retourner ou échanger cet article\u00A0?',
    answer:
      'Oui — les retours et les échanges sont acceptés dans un délai de 30 jours après la livraison, en l’état d’origine, selon notre politique de retours.',
  },
  {
    question: 'L’emballage convient-il à un cadeau\u00A0?',
    answer:
      'Chaque commande est expédiée dans un emballage AURELIA avec un ruban et une carte manuscrite en option. Vous pouvez masquer le prix sur le colis lors du paiement.',
  },
  {
    question: 'Le paiement est-il sécurisé\u00A0?',
    answer:
      'Les paiements sont traités par un prestataire de paiement certifié. Vos coordonnées de carte ne sont jamais conservées ni partagées par la boutique.',
  },
]

export function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { addItem, toggleWishlist, isWishlisted, setCartOpen, pushToast, setQuickView } = useStore()

  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const [openTab, setOpenTab] = useState<'description' | 'specs' | 'reviews' | 'faq'>('description')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [stickyVisible, setStickyVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const selection = useMemo(() => {
    if (!product) return {}
    return Object.fromEntries(product.variants.map((variant) => [variant.label, variant.options[0]]))
  }, [product])

  const [options, setOptions] = useState<Record<string, string>>({})

  useEffect(() => {
    setOptions(selection)
    setActiveImage(0)
    setQuantity(1)
    setOpenTab('description')
  }, [selection])

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  usePage(
    product ? `${product.name} | AURELIA` : 'Produit | AURELIA',
    product ? product.description.slice(0, 155) : undefined,
  )

  if (!product) return <Navigate to="/shop" replace />

  const discount = computeDiscount(product.price, product.originalPrice)
  const gallery = product.gallery.length ? product.gallery : [product.image]
  const related = relatedProducts(product, 4)
  const wishlisted = isWishlisted(product.id)
  const faq = product.faq ?? defaultFaq

  const onPointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    setZoom({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.id,
    image: product.gallery.map((g) => `https://aurelia.example.com${g}`),
    brand: { '@type': 'Brand', name: 'AURELIA' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://aurelia.example.com/product/${product.slug}`,
    },
  }

  const addToCart = () => addItem(product, quantity, options)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="container-luxe py-6 lg:py-10">
        <nav aria-label="Fil d’Ariane">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-noir/50">
            <li>
              <Link to="/" className="hover:text-gold-deep">
                Accueil
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link to="/shop" className="hover:text-gold-deep">
                Boutique
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link to={`/category/${product.category}`} className="hover:text-gold-deep">
                {product.category}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-noir/80">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-3 sm:w-24 sm:flex-col">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Voir l’image ${index + 1} sur ${product.name}`}
                  aria-current={activeImage === index}
                  className={cn(
                    'relative w-16 shrink-0 overflow-hidden border transition-all sm:w-full',
                    activeImage === index
                      ? 'border-gold'
                      : 'border-noir/10 opacity-70 hover:opacity-100',
                  )}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} miniature ${index + 1}`}
                    monogram={product.name.charAt(0)}
                    className="aspect-[3/4] w-full bg-cream"
                  />
                </button>
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <div
                ref={imageRef}
                onMouseMove={onPointerMove}
                onMouseLeave={() => setZoom(null)}
                className="group relative cursor-zoom-in overflow-hidden bg-cream"
              >
                <ImageWithFallback
                  src={gallery[activeImage]}
                  alt={product.name}
                  eager
                  monogram={product.name.charAt(0)}
                  className="aspect-[4/5] w-full bg-cream"
                  imgStyle={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                  imgClassName={cn(
                    'transition-transform duration-500',
                    zoom && 'scale-[1.6]',
                  )}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                {zoom && (
                  <div
                    className="pointer-events-none absolute inset-0 hidden lg:block"
                    style={{
                      background: 'transparent',
                    }}
                    aria-hidden
                  />
                )}
                <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2">
                  {product.badge && <Badge kind={product.badge} />}
                  {discount > 0 && (
                    <span className="bg-bordeaux px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ivory">
                      −{discount}%
                    </span>
                  )}
                </div>
                <span className="pointer-events-none absolute bottom-4 right-4 hidden bg-ivory/85 px-3 py-1.5 text-[10px] uppercase tracking-wider text-noir/70 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 lg:block">
                  Survolez pour agrandir
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 lg:pt-2">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">{product.category}</span>
              <span className="text-[11px] uppercase tracking-wider text-noir/45">
                Réf. {product.id}
              </span>
            </div>

            <h1 className="font-display text-4xl font-light leading-tight lg:text-5xl">
              {product.name}
            </h1>

            <p className="text-sm uppercase tracking-wider text-noir/50">{product.tagline}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Rating value={product.rating} reviews={product.reviews} size={15} />
              <button
                type="button"
                onClick={() => setOpenTab('reviews')}
                className="text-[11px] uppercase tracking-wider text-noir/55 underline-offset-4 hover:text-gold-deep hover:underline"
              >
                Lire les avis
              </button>
            </div>

            <div className="flex flex-wrap items-end gap-4 border-y border-noir/10 py-5">
              <Price price={product.price} original={product.originalPrice} size="lg" />
              {discount > 0 && (
                <span className="text-[12px] text-noir/55">
                  Économie de {formatPriceFull((product.originalPrice ?? product.price) - product.price)}
                </span>
              )}
              <span
                className={cn(
                  'ml-auto text-[11px] uppercase tracking-wider',
                  product.stock > 0 ? 'text-gold-deep' : 'text-bordeaux',
                )}
              >
                {product.stock > 0
                  ? product.stock < 20
                    ? `Plus que ${product.stock} en stock`
                    : 'En stock'
                  : 'Épuisé'}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-noir/70 sm:text-base">
              {product.description}
            </p>

            {product.variants.map((variant) => (
              <div key={variant.label}>
                <p className="mb-2.5 text-[11px] uppercase tracking-luxe text-noir/50">
                  {variant.label} —{' '}
                  <span className="normal-case tracking-normal text-noir/75">
                    {options[variant.label]}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => {
                    const active = options[variant.label] === option
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setOptions((current) => ({ ...current, [variant.label]: option }))}
                        aria-pressed={active}
                        className={cn(
                          'border px-4 py-2.5 text-[11px] uppercase tracking-wider transition-all',
                          active
                            ? 'border-noir bg-noir text-ivory'
                            : 'border-noir/15 text-noir/65 hover:border-noir/50',
                        )}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-4">
              <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, product.stock)} />
              <button
                type="button"
                onClick={toggleWishlist.bind(null, product)}
                aria-pressed={wishlisted}
                className={cn(
                  'flex h-12 w-12 items-center justify-center border transition-colors',
                  wishlisted
                    ? 'border-bordeaux bg-bordeaux text-ivory'
                    : 'border-noir/15 text-noir/70 hover:border-noir',
                )}
                aria-label={wishlisted ? 'Retirer de la liste d’envies' : 'Ajouter à la liste d’envies'}
              >
                <HeartIcon size={18} filled={wishlisted} />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn-primary flex-1"
                onClick={() => {
                  addToCart()
                  setCartOpen(true)
                }}
                disabled={product.stock === 0}
              >
                <BagIcon size={16} /> Ajouter au panier
              </button>
              <button
                type="button"
                className="btn-gold flex-1"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart()
                  pushToast({ title: 'Prêt pour le paiement', variant: 'success' })
                  navigate('/checkout')
                }}
              >
                Acheter maintenant
              </button>
            </div>

            <ul className="grid gap-3 border-t border-noir/10 pt-6 text-[13px] text-noir/65 sm:grid-cols-3">
              <li className="flex items-start gap-2.5">
                <TruckIcon size={17} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>Livraison estimée : 2–5 jours ouvrés</span>
              </li>
              <li className="flex items-start gap-2.5">
                <RefreshIcon size={17} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>Retours faciles selon notre politique de retours</span>
              </li>
              <li className="flex items-start gap-2.5">
                <LockIcon size={16} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>Paiement sécurisé</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="chip">
                <CheckIcon size={13} /> Emballage cadeau offert
              </span>
              <span className="chip">
                <ShieldIcon size={14} /> Retours sous 30 jours
              </span>
              <button type="button" className="chip" onClick={() => setQuickView(product)}>
                Aperçu rapide
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <section className="mt-16 border-t border-noir/10 pt-10 lg:mt-24">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Informations sur le produit">
            {[
              { key: 'description', label: 'Description' },
              { key: 'specs', label: 'Caractéristiques' },
              { key: 'reviews', label: `Avis (${product.reviews})` },
              { key: 'faq', label: 'FAQ' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={openTab === tab.key}
                onClick={() => setOpenTab(tab.key as typeof openTab)}
                className={cn(
                  'border px-5 py-3 text-[11px] uppercase tracking-wider2 transition-all',
                  openTab === tab.key
                    ? 'border-noir bg-noir text-ivory'
                    : 'border-noir/15 text-noir/60 hover:border-noir/40',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {openTab === 'description' && (
              <div className="flex flex-col gap-5 lg:col-span-2 lg:max-w-3xl">
                <p className="text-base leading-relaxed text-noir/75">{product.description}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-noir/70">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-pale text-gold-deep">
                        <CheckIcon size={12} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="grid gap-4 border-t border-noir/10 pt-6 sm:grid-cols-3">
                  {product.specifications.slice(0, 3).map((spec) => (
                    <div key={spec.label}>
                      <p className="text-[10px] uppercase tracking-luxe text-noir/45">{spec.label}</p>
                      <p className="mt-1 text-sm text-noir/75">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {openTab === 'specs' && (
              <dl className="grid gap-px overflow-hidden border border-noir/10 bg-noir/10 lg:col-span-2 lg:grid-cols-2">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-6 bg-ivory px-5 py-4"
                  >
                    <dt className="text-[11px] uppercase tracking-wider text-noir/50">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-sm text-noir/80">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {openTab === 'reviews' && (
              <div className="grid gap-8 lg:col-span-2 lg:grid-cols-3">
                <div className="flex flex-col gap-3 border border-noir/10 bg-white/60 p-6">
                  <p className="num font-display text-5xl font-light">{product.rating.toFixed(1)}</p>
                  <Rating value={product.rating} size={16} />
                  <p className="text-[12px] text-noir/55">
                    Basé sur {product.reviews} avis de démonstration
                  </p>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {[5, 4, 3, 2, 1].map((star, index) => {
                      const width = index === 0 ? 84 : index === 1 ? 12 : index === 2 ? 3 : 1
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="num w-3 text-[11px] text-noir/50">{star}</span>
                          <span className="h-1.5 flex-1 bg-noir/10">
                            <span
                              className="block h-full bg-gold"
                              style={{ width: `${width}%` }}
                            />
                          </span>
                          <span className="num w-8 text-right text-[11px] text-noir/45">
                            {width}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="mt-3 border-t border-noir/10 pt-3 text-[11px] text-noir/45">
                    Données de démonstration.
                  </p>
                </div>

                <ul className="flex flex-col gap-4 lg:col-span-2">
                  {product.reviewList.map((review) => (
                    <li
                      key={review.title}
                      className="border border-noir/10 bg-white/60 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Rating value={review.rating} />
                        <span className="text-[11px] text-noir/45">{review.date}</span>
                      </div>
                      <p className="mt-3 font-display text-lg">{review.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-noir/70">{review.body}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="text-[12px] font-medium">{review.author}</span>
                        <span className="inline-flex items-center gap-1.5 bg-gold-pale px-2 py-1 text-[10px] uppercase tracking-wider text-gold-deep">
                          <CheckIcon size={11} /> Achat vérifié
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {openTab === 'faq' && (
              <div className="flex flex-col divide-y divide-noir/10 border-y border-noir/10 lg:col-span-2">
                {faq.map((item, index) => {
                  const open = openFaq === index
                  return (
                    <div key={item.question}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : index)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="font-display text-lg font-light">{item.question}</span>
                        <ChevronDownIcon
                          size={18}
                          className={cn(
                            'shrink-0 text-noir/50 transition-transform duration-300',
                            open && 'rotate-180',
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          'grid transition-all duration-400',
                          open ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0',
                        )}
                      >
                        <p className="overflow-hidden text-sm leading-relaxed text-noir/65">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Related */}
        <section className="mt-16 lg:mt-24">
          <SectionHeading
            align="left"
            eyebrow="Complétez votre sélection"
            title="Produits similaires"
            subtitle="Des pièces qui s’accordent naturellement avec celle-ci."
          />
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 60}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-noir/10 pt-6">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-noir/60 hover:text-gold-deep"
            >
              <ArrowLeftIcon size={15} /> Retour à la boutique
            </Link>
            <ArrowLink to="/shop?view=collection">Collection du Nouvel An</ArrowLink>
          </div>
        </section>
      </div>

      {/* Sticky mobile add to cart */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-noir/15 bg-ivory/97 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden',
          stickyVisible ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="flex items-center gap-3">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            monogram={product.name.charAt(0)}
            className="hidden h-12 w-10 shrink-0 bg-cream sm:block"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm">{product.name}</p>
            <Price price={product.price} original={product.originalPrice} size="sm" />
          </div>
          <button
            type="button"
            className="btn-primary px-5 py-3"
            onClick={() => {
              addToCart()
              setCartOpen(true)
            }}
          >
            <BagIcon size={15} /> Ajouter au panier
          </button>
        </div>
      </div>

      <div className="h-16 lg:hidden" />
    </>
  )
}

export function RatingSummary({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold">
      {[1, 2, 3, 4, 5].map((value) => (
        <StarIcon key={value} size={14} filled={value <= Math.round(rating)} />
      ))}
    </div>
  )
}
