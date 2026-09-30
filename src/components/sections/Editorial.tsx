import { Link } from 'react-router-dom'
import { trustItems, editorialCategories, giftGuides } from '../../data/content'
import { ArrowLink, ImageWithFallback, Reveal, SectionHeading } from '../ui/Primitives'
import { ChatIcon, RefreshIcon, ShieldIcon, TruckIcon, ArrowRightIcon } from '../ui/Icons'

const trustIcons: Record<string, typeof ShieldIcon> = {
  shield: ShieldIcon,
  truck: TruckIcon,
  refresh: RefreshIcon,
  chat: ChatIcon,
}

export function TrustBar() {
  return (
    <section className="border-y border-noir/10 bg-ivory-soft">
      <div className="container-luxe grid grid-cols-2 gap-x-4 gap-y-7 py-8 lg:grid-cols-4 lg:py-9">
        {trustItems.map((item) => {
          const Icon = trustIcons[item.icon] ?? ShieldIcon
          return (
            <Reveal key={item.title} className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 bg-ivory text-gold-deep">
                <Icon size={19} />
              </span>
              <span>
                <span className="block text-[12px] font-medium uppercase tracking-wider2 text-noir">
                  {item.title}
                </span>
                <span className="mt-1 block text-[12px] text-noir/50">{item.detail}</span>
              </span>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export function NewYearEdit() {
  return (
    <section className="container-luxe py-16 lg:py-24">
      <SectionHeading
        eyebrow="Découvrir la sélection"
        title="L’édition du Nouvel An"
        subtitle="Tout ce qu’il faut pour commencer l’année avec beauté."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {editorialCategories.map((category, index) => (
          <Reveal key={category.slug} delay={index * 70}>
            <Link
              to={`/category/${category.slug}`}
              className="group relative block overflow-hidden bg-cream"
            >
              <ImageWithFallback
                src={`/images/category-${category.slug}.jpg`}
                alt={`Collection ${category.label}`}
                monogram={category.label.charAt(0)}
                className="aspect-[3/4] w-full sm:aspect-[4/5]"
                imgClassName="img-zoom"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/75 via-noir/10 to-transparent transition-opacity duration-500 group-hover:from-noir/85" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4 sm:p-6">
                <span className="font-display text-xl font-light uppercase tracking-wide text-ivory sm:text-2xl">
                  {category.label}
                </span>
                <span className="text-[11px] leading-snug text-ivory/70">{category.line}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-gold-light opacity-0 transition-all duration-400 group-hover:opacity-100">
                  Explorer <ArrowRightIcon size={13} />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function GiftGuide() {
  return (
    <section className="bg-ivory-soft py-16 lg:py-24">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Guide cadeaux"
          title="Trouver le cadeau idéal"
          subtitle="Des cadeaux attentionnés pour toutes les personnalités."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {giftGuides.map((guide, index) => (
            <Reveal key={guide.slug} delay={index * 60}>
              <article className="group relative flex h-full flex-col overflow-hidden border border-noir/10 bg-ivory">
                <Link
                  to={`/shop?gift=${encodeURIComponent(guide.query)}`}
                  className="relative block overflow-hidden"
                  aria-label={`Cadeaux ${guide.title}`}
                >
                  <ImageWithFallback
                    src={guide.image}
                    alt={`Sélection de cadeaux ${guide.title}`}
                    monogram={guide.title.replace('Pour ', '').charAt(0)}
                    className="aspect-[16/11] w-full bg-cream"
                    imgClassName="img-zoom"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-4 top-4 bg-ivory/92 px-3 py-1.5 text-[10px] uppercase tracking-luxe text-noir backdrop-blur">
                    {guide.title}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-light">{guide.title}</h3>
                  <p className="text-sm leading-relaxed text-noir/60">{guide.description}</p>
                  <div className="mt-auto pt-3">
                    <ArrowLink to={`/shop?gift=${encodeURIComponent(guide.query)}`}>
                      Découvrir les cadeaux
                    </ArrowLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
