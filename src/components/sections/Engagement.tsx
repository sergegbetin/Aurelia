import { useState } from 'react'
import { Link } from 'react-router-dom'
import { instagramTiles, testimonials, brand } from '../../data/content'
import { ArrowLink, ImageWithFallback, Rating, Reveal, SectionHeading } from '../ui/Primitives'
import { ArrowRightIcon, CheckIcon, InstagramIcon } from '../ui/Icons'

export function EditorialBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[26rem] lg:min-h-[34rem]">
        <ImageWithFallback
          src="/images/editorial-banner.jpg"
          alt="Elegant New Year celebration table with champagne, candles and golden light"
          monogram="A"
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/50 to-noir/25" />
        <div className="container-luxe relative flex min-h-[26rem] flex-col justify-center gap-6 py-16 text-ivory lg:min-h-[34rem]">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-gold-light">AURELIA {brand.year}</span>
            <h2 className="mt-5 font-display text-display-md font-light uppercase leading-[1.02]">
              Make this year
              <br />
              <span className="italic text-gold-light">yours.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/75 sm:text-base">
              Discover products that fit the life you want to create — less noise, more intention,
              and a little beauty in every day.
            </p>
            <Link to="/shop" className="btn-light mt-4 w-fit">
              Explore AURELIA <ArrowRightIcon size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function SocialProof() {
  return (
    <section className="container-luxe py-16 lg:py-24">
      <SectionHeading
        eyebrow="Community"
        title="Loved by our community"
        subtitle="A few words from customers of the New Year Collection."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 70}>
            <figure className="flex h-full flex-col gap-4 border border-noir/10 bg-white/70 p-6">
              <Rating value={testimonial.rating} />
              <blockquote className="text-sm leading-relaxed text-noir/75">
                “{testimonial.body}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-noir font-display text-sm text-ivory">
                  {testimonial.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium">{testimonial.name}</span>
                  <span className="block truncate text-[11px] text-noir/50">
                    {testimonial.date}
                  </span>
                </span>
              </figcaption>
              <div className="flex flex-wrap items-center gap-2 border-t border-noir/10 pt-3">
                <span className="inline-flex items-center gap-1.5 bg-gold-pale px-2 py-1 text-[10px] uppercase tracking-wider text-gold-deep">
                  <CheckIcon size={11} /> Verified purchase
                </span>
                <span className="truncate text-[11px] text-noir/50">{testimonial.product}</span>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] text-noir/40">
        Demonstration testimonials — sample content used for design purposes only.
      </p>
    </section>
  )
}

export function InstagramSection() {
  return (
    <section className="bg-ivory-soft py-16 lg:py-24">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Social"
          title="Follow the AURELIA moment"
          subtitle="Gift wrapping, decorated rooms, evening outfits and small rituals — a glimpse of how the collection is lived."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {instagramTiles.map((tile, index) => (
            <Reveal key={tile.image} delay={index * 50}>
              <figure className="group relative block overflow-hidden bg-cream">
                <ImageWithFallback
                  src={tile.image}
                  alt={tile.caption}
                  monogram="A"
                  className="aspect-square w-full bg-cream"
                  imgClassName="img-zoom"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-noir/80 via-noir/10 to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ivory">
                    <InstagramIcon size={14} /> {tile.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link to="/" className="btn-outline">
            Follow us <InstagramIcon size={16} />
          </Link>
        </Reveal>

        <p className="mt-4 text-center text-[11px] text-noir/40">
          Sample lifestyle imagery — no live social account is connected to this prototype.
        </p>
      </div>
    </section>
  )
}

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle')

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    setState(valid ? 'done' : 'error')
  }

  return (
    <section className="bg-noir py-16 text-ivory lg:py-24">
      <div className="container-luxe grid gap-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <span className="eyebrow text-gold-light">Newsletter</span>
          <h2 className="mt-5 font-display text-display-sm font-light uppercase">
            Make this year
            <br />
            <span className="italic text-gold-light">count.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/65">
            Be the first to discover new collections, special offers and inspiring products.
          </p>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          {state === 'done' ? (
            <div className="flex items-start gap-4 border border-gold/40 bg-gold/10 p-6">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-noir">
                <CheckIcon size={16} />
              </span>
              <div>
                <p className="font-display text-xl">You are on the list.</p>
                <p className="mt-1.5 text-sm text-ivory/65">
                  Thank you — we will only write when there is something worth opening.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (state === 'error') setState('idle')
                  }}
                  placeholder="Your email address"
                  aria-invalid={state === 'error'}
                  aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
                  className="field flex-1 border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40 focus:border-gold"
                />
                <button type="submit" className="btn-gold shrink-0">
                  Join AURELIA
                </button>
              </div>
              {state === 'error' && (
                <p id="newsletter-error" className="text-[12px] text-gold-light" role="alert">
                  Please enter a valid email address.
                </p>
              )}
              <p className="text-[11px] leading-relaxed text-ivory/45">
                Demo form — no data is transmitted. You can unsubscribe at any time.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export function EditorialIntro() {
  return (
    <div className="container-luxe">
      <Reveal className="flex flex-col items-center gap-4 border-b border-noir/10 pb-14 text-center">
        <span className="eyebrow">Curated for {brand.year}</span>
        <p className="max-w-3xl font-display text-2xl font-light leading-snug text-noir/85 sm:text-3xl">
          A new year asks for a fresh start — and a few beautiful objects to begin with.
        </p>
        <ArrowLink to="/shop">Discover the collection</ArrowLink>
      </Reveal>
    </div>
  )
}
