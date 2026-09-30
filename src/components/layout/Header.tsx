import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { mainNav, brand } from '../../data/content'
import { useStore } from '../../store/StoreContext'
import { cn } from '../../utils'
import {
  BagIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from '../ui/Icons'

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-noir text-ivory">
      <div className="container-luxe flex flex-col items-center justify-center gap-1 py-2.5 sm:flex-row sm:gap-6">
        <p className="text-center text-[10px] uppercase tracking-luxe sm:text-[11px]">
          Collection du Nouvel An — Découvrez nos nouveautés
        </p>
        <Link
          to="/shop?view=collection"
          className="group flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-wider2 text-gold-light transition-colors hover:text-ivory"
        >
          Découvrir la collection
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}

export function Header() {
  const { setCartOpen, setSearchOpen, setMenuOpen, totals, wishlist } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setHidden(y > 320 && y > lastY)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setHidden(false)
  }, [location.pathname])

  const iconBtn =
    'relative flex h-10 w-10 items-center justify-center text-noir/75 transition-colors hover:text-gold-deep'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur transition-transform duration-300',
        scrolled ? 'border-noir/10 shadow-[0_10px_30px_-28px_rgba(17,16,8,0.6)]' : 'border-transparent',
        hidden ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <div className="container-luxe flex h-[4.25rem] items-center justify-between gap-4 lg:h-20">
        <button
          type="button"
          className={cn(iconBtn, 'lg:hidden')}
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={false}
        >
          <MenuIcon />
        </button>

        <Link to="/" className="group flex shrink-0 flex-col items-start" aria-label="Accueil AURELIA">
          <span className="font-display text-2xl font-medium tracking-[0.34em] transition-colors group-hover:text-gold-deep lg:text-[1.7rem]">
            {brand.name}
          </span>
          <span className="hidden text-[8.5px] uppercase tracking-luxe text-gold-deep sm:block">
            {brand.signature}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8" aria-label="Navigation principale">
          {mainNav.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'relative whitespace-nowrap py-2 text-[11px] uppercase tracking-wider2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full',
                  isActive
                    ? 'text-gold-deep after:w-full'
                    : 'text-noir/70 hover:text-noir',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <button
            type="button"
            className={iconBtn}
            onClick={() => setSearchOpen(true)}
            aria-label="Recherche"
          >
            <SearchIcon />
          </button>
          <Link to="/checkout" className={cn(iconBtn, 'hidden sm:flex')} aria-label="Compte">
            <UserIcon />
          </Link>
          <Link to="/wishlist" className={cn(iconBtn, 'hidden sm:flex')} aria-label="Liste d’envies">
            <HeartIcon />
            {wishlist.length > 0 && (
              <span className="num absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bordeaux px-1 text-[9px] font-medium text-ivory">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            className={iconBtn}
            onClick={() => setCartOpen(true)}
            aria-label={`Panier, ${totals.itemCount} ${totals.itemCount === 1 ? 'article' : 'articles'}`}
          >
            <BagIcon />
            {totals.itemCount > 0 && (
              <span className="num absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-noir">
                {totals.itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-noir/8 bg-ivory-soft/60 lg:hidden">
        <div className="container-luxe flex items-center gap-4 overflow-x-auto py-2.5 no-scrollbar">
          {mainNav.slice(1).map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="whitespace-nowrap text-[10px] uppercase tracking-wider2 text-noir/60 transition-colors hover:text-gold-deep"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
