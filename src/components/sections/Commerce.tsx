import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bestSellers, newYearSpecials, featuredProduct, freshStartPicks } from '../../data/content'
import { useStore } from '../../store/StoreContext'
import { categoryLabel } from '../../utils'
import { ProductCard } from '../ui/ProductCard'
import {
  ArrowLink,
  Badge,
  ImageWithFallback,
  Price,
  QuantityStepper,
  Rating,
  Reveal,
  SectionHeading,
} from '../ui/Primitives'
import { BagIcon, ArrowRightIcon, CheckIcon, SparkleIcon } from '../ui/Icons'

export function BestSellers() {
  return (
    <section className="container-luxe py-16 lg:py-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Meilleures ventes"
          title="Commencez par nos coups de cœur"
          subtitle="Les pièces que notre communauté adopte en premier — testées, offertes puis réassorties."
        />
        <Reveal className="sm:pb-3">
          <ArrowLink to="/shop?view=bestsellers">Voir tous les produits</ArrowLink>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {bestSellers.map((product, index) => (
          <Reveal key={product.id} delay={(index % 4) * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function NewYearSpecials() {
  return (
    <section className="bg-noir py-16 text-ivory lg:py-24">
      <div className="container-luxe">
        <SectionHeading
          light
          eyebrow="Offres du Nouvel An"
          title="Des offres réfléchies"
          subtitle="Quelques pièces favorites à un prix plus doux — la même qualité, discrètement réduite."
        />

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {newYearSpecials.map((product, index) => (
            <Reveal key={product.id} delay={index * 70} className="[&_.reveal]:visible">
              <article className="group flex h-full flex-col">
                <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    monogram={product.name.charAt(0)}
                    className="aspect-[4/5] w-full bg-cream"
                    imgClassName="img-zoom"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <span className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.badge && <Badge kind={product.badge} />}
                    {typeof product.discount === 'number' && (
                      <span className="bg-bordeaux px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ivory">
                        −{product.discount}%
                      </span>
                    )}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col gap-2.5 pt-4">
                  <Link
                    to={`/product/${product.slug}`}
                    className="font-display text-lg leading-tight transition-colors hover:text-gold-light sm:text-xl"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-ivory/55">{product.tagline}</p>
                  <Rating value={product.rating} reviews={product.reviews} light />
                  <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                    <Price price={product.price} original={product.originalPrice} light />
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-[10px] uppercase tracking-wider2 text-ivory/55 underline-offset-4 hover:text-gold-light hover:underline"
                    >
                      Voir
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link to="/shop?view=offers" className="btn-light">
            Voir toutes les offres du Nouvel An <ArrowRightIcon size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export function FreshStart() {
  const { addItem, setCartOpen } = useStore()

  return (
    <section className="container-luxe py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div className="grain relative overflow-hidden">
            <ImageWithFallback
              src="/images/editorial-new-you.jpg"
              alt="Routine matinale avec montre connectée, agenda et gourde premium"
              monogram="N"
              className="aspect-[4/5] w-full bg-cream"
            />
            <span className="absolute bottom-5 left-5 border border-ivory/25 bg-noir/70 px-4 py-3 text-[10px] uppercase tracking-luxe text-ivory backdrop-blur">
              Rituels · Concentration · Équilibre
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-7">
          <SectionHeading
            align="left"
            eyebrow="Nouvelle année, nouvelle vous"
            title={
              <>
                Nouvelle année.
                <br />
                <span className="italic text-gold-deep">Nouvelles habitudes.</span>
              </>
            }
            subtitle="Forme, organisation, bien-être et travail — de petits outils bien faits qui rendent les nouvelles habitudes plus faciles à tenir."
          />

          <ul className="mt-10 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {freshStartPicks.map((product, index) => (
              <Reveal as="li" key={product.id} delay={index * 50}>
                <div className="group flex items-center gap-4 border-b border-noir/10 py-4">
                  <Link
                    to={`/product/${product.slug}`}
                    className="shrink-0"
                    aria-label={`Voir ${product.name}`}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      monogram={product.name.charAt(0)}
                      className="h-20 w-16 bg-cream"
                      imgClassName="img-zoom"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-display text-lg leading-tight hover:text-gold-deep"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 truncate text-[11px] uppercase tracking-wider text-noir/45">
                      {product.tagline}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <Price price={product.price} original={product.originalPrice} size="sm" />
                      <button
                        type="button"
                        onClick={() => {
                          addItem(product)
                          setCartOpen(true)
                        }}
                        className="text-[10px] uppercase tracking-wider2 text-noir/55 transition-colors hover:text-gold-deep"
                        aria-label={`Ajouter ${product.name} au panier`}
                      >
                        + Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/shop?view=fresh" className="btn-primary">
              Nouveau départ <ArrowRightIcon size={15} />
            </Link>
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-noir/50">
              <CheckIcon size={14} /> Retours gratuits sous 30 jours
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function FeaturedProduct() {
  const product = featuredProduct
  const { addItem, setCartOpen, pushToast } = useStore()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.variants.map((variant) => [variant.label, variant.options[0]])),
  )

  return (
    <section className="bg-ivory-soft py-16 lg:py-24">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Produit en vedette"
          title="La pièce que tout le monde veut"
          subtitle="Notre pièce signature de la saison — choisie pour le confort au poignet, dans la main et à la lumière."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="grain relative overflow-hidden bg-cream">
              <ImageWithFallback
                src={product.gallery[0]}
                alt={product.name}
                eager
                monogram={product.name.charAt(0)}
                className="aspect-[4/5] w-full bg-cream"
                imgClassName="hover:scale-[1.03] transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {product.badge && <Badge kind={product.badge} className="absolute left-5 top-5" />}
              <div className="absolute bottom-5 left-5 flex gap-2.5">
                {product.gallery.slice(0, 3).map((image, index) => (
                  <ImageWithFallback
                    key={image}
                    src={image}
                    alt={`${product.name} — vue ${index + 1}`}
                    monogram={product.name.charAt(0)}
                    className={
                      'h-16 w-14 border bg-ivory ' +
                      (index === 0 ? 'border-gold' : 'border-ivory/60')
                    }
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-center">
            <span className="eyebrow">{categoryLabel(product.category)}</span>
            <h3 className="mt-4 font-display text-display-sm font-light">{product.name}</h3>
            <p className="mt-3 text-sm uppercase tracking-wider text-noir/50">{product.tagline}</p>

            <Rating value={product.rating} reviews={product.reviews} className="mt-5" />

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-noir/70 sm:text-base">
              {product.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-6 border-y border-noir/10 py-5">
              <Price price={product.price} original={product.originalPrice} size="lg" />
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-gold-deep">
                <SparkleIcon size={15} /> Prix du Nouvel An
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {product.variants.map((variant) => (
                <div key={variant.label}>
                  <p className="mb-2.5 text-[11px] uppercase tracking-luxe text-noir/50">
                    {variant.label} —{' '}
                    <span className="normal-case tracking-normal text-noir/70">
                      {selection[variant.label]}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => {
                      const active = selection[variant.label] === option
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelection((current) => ({ ...current, [variant.label]: option }))
                          }
                          aria-pressed={active}
                          className={
                            'border px-4 py-2.5 text-[11px] uppercase tracking-wider transition-all ' +
                            (active
                              ? 'border-noir bg-noir text-ivory'
                              : 'border-noir/15 text-noir/65 hover:border-noir/50')
                          }
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="btn-primary flex-1"
                  onClick={() => addItem(product, quantity, selection)}
                >
                  <BagIcon size={16} /> Ajouter au panier
                </button>
                <button
                  type="button"
                  className="btn-gold flex-1"
                  onClick={() => {
                    addItem(product, quantity, selection)
                    pushToast({ title: 'Redirection vers le paiement sécurisé', variant: 'success' })
                    navigate('/checkout')
                  }}
                >
                  Acheter maintenant
                </button>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 self-start text-[11px] uppercase tracking-wider2 text-noir/55 underline-offset-4 hover:text-gold-deep hover:underline"
              onClick={() => setCartOpen(true)}
            >
              Ouvrir le panier
            </button>

            <dl className="mt-7 grid gap-3 border-t border-noir/10 pt-6 text-[13px] text-noir/65 sm:grid-cols-3">
              <div>
                <dt className="text-[10px] uppercase tracking-luxe text-noir/45">Livraison</dt>
                <dd className="mt-1">Livraison estimée : 2 à 5 jours ouvrés</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-luxe text-noir/45">Retours</dt>
                <dd className="mt-1">Retours simples selon notre politique de retours</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-luxe text-noir/45">Paiement</dt>
                <dd className="mt-1">Paiement sécurisé</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
