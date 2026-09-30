import { Link, useLocation, useNavigate } from 'react-router-dom'
import { mainNav, footerColumns, brand } from '../../data/content'
import { categories } from '../../data/categories'
import { useStore } from '../../store/StoreContext'
import { Drawer } from '../ui/Overlay'
import { CloseIcon, ArrowRightIcon, HeartIcon, BagIcon, SearchIcon, UserIcon } from '../ui/Icons'

export function MobileMenu() {
  const { menuOpen, setMenuOpen, setSearchOpen, wishlist, totals } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const close = () => setMenuOpen(false)

  const go = (to: string) => {
    close()
    navigate(to)
  }

  return (
    <Drawer open={menuOpen} onClose={close} side="left" labelledBy="menu-title">
      <header className="flex items-center justify-between border-b border-noir/10 px-5 py-5">
        <div>
          <p className="font-display text-2xl tracking-[0.28em]">{brand.name}</p>
          <p className="mt-1 text-[9px] uppercase tracking-luxe text-gold-deep">
            {brand.signature}
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Fermer le menu"
          className="flex h-9 w-9 items-center justify-center border border-noir/15 transition-colors hover:bg-noir hover:text-ivory"
        >
          <CloseIcon size={17} />
        </button>
      </header>

      <nav className="flex-1 overflow-y-auto px-5 py-6" aria-labelledby="menu-title">
        <h2 id="menu-title" className="sr-only">
          Navigation
        </h2>
        <ul className="flex flex-col">
          {mainNav.map((item) => {
            const active =
              item.to === location.pathname ||
              (item.to !== '/' && location.pathname.startsWith(item.to.split('?')[0]))
            return (
              <li key={item.label} className="border-b border-noir/10">
                <button
                  type="button"
                  onClick={() => go(item.to)}
                  className={
                    'flex w-full items-center justify-between py-4 text-left font-display text-xl font-light transition-colors ' +
                    (active ? 'text-gold-deep' : 'text-noir hover:text-gold-deep')
                  }
                >
                  {item.label}
                  <ArrowRightIcon size={16} />
                </button>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 text-[11px] uppercase tracking-luxe text-noir/45">Catégories</p>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                className="chip w-full justify-center"
                onClick={() => go(`/category/${category.slug}`)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[11px] uppercase tracking-luxe text-noir/45">Accès rapides</p>
        <div className="mt-3 grid gap-2">
          <button
            type="button"
            className="chip w-full justify-between"
            onClick={() => {
              close()
              setSearchOpen(true)
            }}
          >
            <span className="flex items-center gap-2">
              <SearchIcon size={15} /> Recherche
            </span>
            <ArrowRightIcon size={14} />
          </button>
          <button
            type="button"
            className="chip w-full justify-between"
            onClick={() => go('/wishlist')}
          >
            <span className="flex items-center gap-2">
              <HeartIcon size={15} /> Liste d’envies ({wishlist.length})
            </span>
            <ArrowRightIcon size={14} />
          </button>
          <button
            type="button"
            className="chip w-full justify-between"
            onClick={() => go('/cart')}
          >
            <span className="flex items-center gap-2">
              <BagIcon size={15} /> Panier ({totals.itemCount})
            </span>
            <ArrowRightIcon size={14} />
          </button>
          <button
            type="button"
            className="chip w-full justify-between"
            onClick={() => go('/checkout')}
          >
            <span className="flex items-center gap-2">
              <UserIcon size={15} /> Compte
            </span>
            <ArrowRightIcon size={14} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-noir/10 pt-6">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-[10px] uppercase tracking-luxe text-noir/45">{column.title}</p>
              <ul className="mt-2 space-y-1.5">
                {column.links.slice(0, 4).map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      className="text-[13px] text-noir/65 hover:text-gold-deep"
                      onClick={() => go(link.to)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          to="/"
          onClick={close}
          className="mt-6 block border border-noir/15 px-4 py-3 text-center text-[11px] uppercase tracking-wider2"
        >
          Retour à l’accueil
        </Link>
      </nav>
    </Drawer>
  )
}
