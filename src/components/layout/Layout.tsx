import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnnouncementBar, Header } from './Header'
import { Footer } from './Footer'
import { SearchOverlay } from '../overlays/SearchOverlay'
import { CartDrawer } from '../overlays/CartDrawer'
import { MobileMenu } from '../overlays/MobileMenu'
import { QuickView } from '../overlays/QuickView'
import { Toasts } from '../ui/Toasts'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-noir focus:px-4 focus:py-3 focus:text-ivory"
      >
        Aller au contenu principal
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SearchOverlay />
      <CartDrawer />
      <MobileMenu />
      <QuickView />
      <Toasts />
    </div>
  )
}
