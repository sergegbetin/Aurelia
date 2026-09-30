import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks'
import { cn, computeDiscount, formatPrice } from '../../utils'
import { StarIcon, MinusIcon, PlusIcon } from './Icons'

/* ── Image with a clean, on-brand fallback ─────────────────────────────── */
export function ImageWithFallback({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
  monogram = 'A',
  sizes,
  imgStyle,
  onClick,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  eager?: boolean
  monogram?: string
  sizes?: string
  imgStyle?: React.CSSProperties
  onClick?: () => void
}) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        onClick={onClick}
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-champagne-light via-ivory-soft to-champagne',
          className,
        )}
      >
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,#ffffff,transparent_60%)]" />
        <span className="relative font-display text-5xl text-gold-deep/70">{monogram}</span>
        <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-luxe text-noir/45">
          AURELIA
        </span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-cream', className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-ivory-deep" />}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        onClick={onClick}
        style={imgStyle}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}

/* ── Scroll reveal ─────────────────────────────────────────────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useReveal<HTMLElement>()
  const Element = Tag as 'div'
  return (
    <Element ref={ref as never} className={cn('reveal', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Element>
  )
}

/* ── Section heading ───────────────────────────────────────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow', light && 'text-gold-light')}>{eyebrow}</span>
      )}
      <h2
        className={cn(
          'font-display text-display-md font-light uppercase tracking-[0.02em]',
          light ? 'text-ivory' : 'text-noir',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-sm leading-relaxed sm:text-base',
            light ? 'text-ivory/70' : 'text-noir/65',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

/* ── Price ─────────────────────────────────────────────────────────────── */
export function Price({
  price,
  original,
  size = 'md',
  light = false,
}: {
  price: number
  original?: number
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}) {
  const discount = computeDiscount(price, original)
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' }
  return (
    <div className="flex flex-wrap items-baseline gap-2.5">
      <span
        className={cn(
          'font-medium tracking-tight num',
          sizes[size],
          light ? 'text-ivory' : 'text-noir',
        )}
      >
        {formatPrice(price)}
      </span>
      {original && original > price && (
        <span
          className={cn(
            'num text-xs line-through decoration-bordeaux/60',
            light ? 'text-ivory/50' : 'text-noir/45',
          )}
        >
          {formatPrice(original)}
        </span>
      )}
      {discount > 0 && (
        <span className="rounded-full bg-bordeaux/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-bordeaux">
          −{discount}%
        </span>
      )}
    </div>
  )
}

/* ── Rating ────────────────────────────────────────────────────────────── */
export function Rating({
  value,
  reviews,
  size = 13,
  light = false,
  className,
}: {
  value: number
  reviews?: number
  size?: number
  light?: boolean
  className?: string
}) {
  const percent = Math.round((value / 5) * 100)
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="relative inline-flex"
        role="img"
        aria-label={`Noté ${value} sur 5`}
      >
        <div className={cn('flex gap-0.5', light ? 'text-ivory/30' : 'text-noir/20')}>
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} size={size} />
          ))}
        </div>
        <div
          className="absolute inset-0 overflow-hidden text-gold"
          style={{ width: `${percent}%` }}
          aria-hidden
        >
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} size={size} />
            ))}
          </div>
        </div>
      </div>
      <span
        className={cn(
          'num text-[11px]',
          light ? 'text-ivory/60' : 'text-noir/55',
        )}
      >
        {value.toFixed(1)}
        {typeof reviews === 'number' && ` (${reviews})`}
      </span>
    </div>
  )
}

/* ── Badge ─────────────────────────────────────────────────────────────── */
const badgeLabels: Record<string, string> = {
  new: 'NOUVEAUTÉ',
  bestseller: 'MEILLEURE VENTE',
  limited: 'ÉDITION LIMITÉE',
  sale: 'PROMO',
  exclusive: 'EXCLUSIVITÉ',
}

export function Badge({ kind, className }: { kind: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider2',
        kind === 'sale' || kind === 'limited'
          ? 'bg-bordeaux text-ivory'
          : kind === 'new'
            ? 'bg-noir text-ivory'
            : 'bg-gold text-noir',
        className,
      )}
    >
      {badgeLabels[kind] ?? kind}
    </span>
  )
}

/* ── Quantity stepper ──────────────────────────────────────────────────── */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  light = false,
  compact = false,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  light?: boolean
  compact?: boolean
}) {
  const button = cn(
    'flex items-center justify-center transition-colors disabled:opacity-30',
    compact ? 'h-9 w-9' : 'h-12 w-12',
    light
      ? 'text-ivory/80 hover:text-ivory'
      : 'text-noir/60 hover:text-noir',
  )
  return (
    <div
      className={cn(
        'inline-flex items-center border',
        light ? 'border-ivory/25' : 'border-noir/15 bg-white',
      )}
    >
      <button
        type="button"
        className={button}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
      >
        <MinusIcon />
      </button>
      <span
        className={cn(
          'num min-w-[2.5rem] text-center text-sm font-medium',
          light ? 'text-ivory' : 'text-noir',
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={button}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <PlusIcon />
      </button>
    </div>
  )
}

/* ── Text link with arrow ─────────────────────────────────────────────── */
export function ArrowLink({
  to,
  children,
  light = false,
  className,
}: {
  to: string
  children: ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group/link inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-wider2 transition-colors',
        light ? 'text-ivory/85 hover:text-gold-light' : 'text-noir/75 hover:text-gold-deep',
        className,
      )}
    >
      <span className="border-b border-current/40 pb-1 transition-colors group-hover/link:border-current">
        {children}
      </span>
      <span className="transition-transform duration-300 group-hover/link:translate-x-1.5">
        →
      </span>
    </Link>
  )
}
