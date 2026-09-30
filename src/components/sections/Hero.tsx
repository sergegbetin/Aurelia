import { Link } from 'react-router-dom'
import { brand } from '../../data/content'
import { useCountdown, pad } from '../../hooks/useCountdown'
import { ImageWithFallback, Reveal } from '../ui/Primitives'
import { ArrowRightIcon, SparkleIcon } from '../ui/Icons'

const stars = [
  { top: '8%', left: '6%', delay: '0s', size: 4 },
  { top: '22%', left: '46%', delay: '1.2s', size: 3 },
  { top: '62%', left: '3%', delay: '2.1s', size: 3 },
  { top: '78%', left: '38%', delay: '0.6s', size: 4 },
  { top: '14%', left: '86%', delay: '1.8s', size: 3 },
  { top: '88%', left: '72%', delay: '2.6s', size: 3 },
]

const confetti = [
  { left: '12%', delay: '0s', dur: '16s', drift: '18px' },
  { left: '28%', delay: '3.5s', dur: '19s', drift: '-14px' },
  { left: '54%', delay: '6s', dur: '17s', drift: '22px' },
  { left: '76%', delay: '2.4s', dur: '21s', drift: '-18px' },
  { left: '90%', delay: '8s', dur: '18s', drift: '12px' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="container-luxe grid items-center gap-10 pb-16 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="relative z-10 lg:col-span-6 xl:col-span-6">
          <Reveal className="flex flex-col gap-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">{brand.campaign}</span>
            </div>

            <h1 className="font-display text-display-lg font-light uppercase text-noir">
              Une nouvelle année.
              <br />
              <span className="italic text-gold-deep">Un nouveau vous.</span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-noir/65 sm:text-lg">
              Découvrez de belles pièces pour célébrer les commencements — cadeaux, beauté, mode,
              high-tech et maison, choisis pour la façon dont vous voulez vivre cette année.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/shop?view=collection" className="btn-primary btn-shine">
                Voir la collection <ArrowRightIcon size={16} />
              </Link>
              <Link to="/shop?category=gifts" className="btn-outline">
                Trouver le cadeau idéal
              </Link>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-noir/10 pt-6 text-[11px] uppercase tracking-wider2 text-noir/50">
              <span>Collection du Nouvel An {brand.year}</span>
              <span className="hidden h-3 w-px bg-noir/15 sm:block" />
              <span>Emballage cadeau offert</span>
              <span className="hidden h-3 w-px bg-noir/15 sm:block" />
              <span>Livraison en 2 à 5 jours</span>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative">
            <Reveal delay={120}>
              <div className="grain relative overflow-hidden">
                <ImageWithFallback
                  src="/images/hero-main.jpg"
                  alt="Coffrets cadeaux du Nouvel An et objets de vie AURELIA dans une lumière dorée chaleureuse"
                  eager
                  monogram="A"
                  className="aspect-[4/5] w-full sm:aspect-[5/5] lg:aspect-[4/5]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/35 via-transparent to-transparent" />
              </div>
            </Reveal>

            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
            >
              {stars.map((star, index) => (
                <span
                  key={index}
                  className="star-dot"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                    animationDelay: star.delay,
                  }}
                />
              ))}
              {confetti.map((dot, index) => (
                <span
                  key={index}
                  className="confetti-dot"
                  style={
                    {
                      left: dot.left,
                      top: '-6%',
                      '--drift': dot.drift,
                      '--dur': dot.dur,
                      '--delay': dot.delay,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <Reveal
              delay={320}
              className="absolute -bottom-6 left-4 w-[13rem] border border-noir/10 bg-ivory/95 p-4 shadow-luxe backdrop-blur sm:left-8 sm:w-60"
            >
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src="/images/products/the-new-year-gift-box-1.jpg"
                  alt="Coffret Cadeau du Nouvel An"
                  className="h-16 w-14 shrink-0 bg-cream"
                  monogram="G"
                />
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-gold-deep">
                    Cadeau signature
                  </p>
                  <p className="mt-1 font-display text-base leading-tight">
                    Coffret Cadeau du Nouvel An
                  </p>
                  <Link
                    to="/product/the-new-year-gift-box"
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-noir/60 hover:text-gold-deep"
                  >
                    Découvrir <ArrowRightIcon size={12} />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="absolute -right-1 top-6 hidden items-center gap-2 border border-gold/40 bg-ivory/90 px-3.5 py-2 text-[10px] uppercase tracking-luxe text-gold-deep backdrop-blur sm:flex">
              <SparkleIcon size={14} /> Édition {brand.year}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const units = [
  { key: 'days', label: 'Jours' },
  { key: 'hours', label: 'Heures' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Secondes' },
] as const

export function Countdown() {
  const { days, hours, minutes, seconds, complete } = useCountdown()
  const values = { days, hours, minutes, seconds }

  return (
    <section className="relative overflow-hidden bg-noir text-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 90% at 15% 20%, rgba(192,150,75,0.22), transparent 60%), radial-gradient(50% 80% at 85% 70%, rgba(108,29,44,0.28), transparent 65%)',
        }}
        aria-hidden
      />
      <div className="container-luxe relative grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
        <Reveal className="lg:col-span-4">
          <span className="eyebrow text-gold-light">Le moment du Nouvel An</span>
          <h2 className="mt-5 font-display text-display-sm font-light uppercase">
            Minuit
            <br />
            <span className="italic text-gold-light">approche</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
            Ni pression, ni bruit — seulement un instant pour choisir quelque chose de beau avant
            le passage à la nouvelle année. La collection est disponible jusqu’au dernier jour de
            la saison.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-5">
            {units.map((unit) => {
              const raw = values[unit.key]
              const display = unit.key === 'days' ? String(raw) : pad(raw)
              return (
                <div
                  key={unit.key}
                  className="border border-ivory/15 bg-ivory/[0.04] px-1 py-6 text-center backdrop-blur-sm sm:py-8"
                >
                  <p
                    key={display}
                    className="num font-display text-4xl font-light text-gold-light animate-tick sm:text-6xl lg:text-7xl"
                  >
                    {display}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-luxe text-ivory/50 sm:text-[10px]">
                    {unit.label}
                  </p>
                </div>
              )
            })}
          </div>
          <p className="mt-6 text-center text-[11px] uppercase tracking-wider2 text-ivory/45">
            {complete
              ? `La collection ${brand.year} est en pleine célébration`
              : `Compte à rebours jusqu’au 1er janvier ${brand.year}`}
          </p>
        </div>
      </div>
    </section>
  )
}
