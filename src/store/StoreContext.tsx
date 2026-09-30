import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/types'
import { useLocalStorage, useBodyLock, useEscape } from '../hooks'
import { formatPrice, computeDiscount } from '../utils'

export interface CartLine {
  key: string
  productId: string
  slug: string
  name: string
  image: string
  unitPrice: number
  originalPrice?: number
  quantity: number
  options: Record<string, string>
}

export interface Toast {
  id: string
  title: string
  message?: string
  variant?: 'default' | 'success'
}

export type PromoCode = 'AURELIA10' | 'NEWYEAR15' | 'FREESHIP'

interface Promo {
  code: PromoCode
  label: string
  kind: 'percent' | 'shipping'
  value: number
}

export const PROMOS: Record<PromoCode, Promo> = {
  AURELIA10: { code: 'AURELIA10', label: '10% off your order', kind: 'percent', value: 10 },
  NEWYEAR15: { code: 'NEWYEAR15', label: '15% off your order', kind: 'percent', value: 15 },
  FREESHIP: { code: 'FREESHIP', label: 'Free standard delivery', kind: 'shipping', value: 100 },
}

const FREE_SHIPPING_THRESHOLD = 150
const STANDARD_SHIPPING = 9.9
const EXPRESS_SHIPPING = 19.9

export interface Totals {
  subtotal: number
  savings: number
  discount: number
  shipping: number
  total: number
  itemCount: number
  freeShippingThreshold: number
  freeShippingGap: number
}

interface StoreValue {
  lines: CartLine[]
  addItem: (product: Product, quantity?: number, options?: Record<string, string>) => void
  removeItem: (key: string) => void
  setQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  totals: Totals
  shippingMethod: 'standard' | 'express'
  setShippingMethod: (method: 'standard' | 'express') => void
  promo: PromoCode | null
  applyPromo: (code: string) => { ok: boolean; message: string }
  removePromo: () => void
  wishlist: string[]
  toggleWishlist: (product: Product) => void
  isWishlisted: (id: string) => boolean
  toasts: Toast[]
  pushToast: (toast: Omit<Toast, 'id'>) => void
  dismissToast: (id: string) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  quickView: Product | null
  setQuickView: (product: Product | null) => void
}

const StoreContext = createContext<StoreValue | null>(null)

const lineKey = (id: string, options: Record<string, string>) =>
  [id, ...Object.keys(options).sort().map((k) => `${k}:${options[k]}`)].join('|')

const readQuantity = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(Math.round(parsed), 99) : 1
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useLocalStorage<CartLine[]>('aurelia:cart', [])
  const [wishlist, setWishlist] = useLocalStorage<string[]>('aurelia:wishlist', [])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [promo, setPromo] = useState<PromoCode | null>(null)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')

  useBodyLock(cartOpen || searchOpen || menuOpen || Boolean(quickView))
  useEscape(cartOpen || searchOpen || menuOpen || Boolean(quickView), () => {
    setCartOpen(false)
    setSearchOpen(false)
    setMenuOpen(false)
    setQuickView(null)
  })

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
      setToasts((current) => [...current.slice(-2), { ...toast, id }])
      window.setTimeout(() => dismissToast(id), 4200)
    },
    [dismissToast],
  )

  const addItem = useCallback(
    (product: Product, quantity = 1, options: Record<string, string> = {}) => {
      const resolved =
        Object.keys(options).length > 0
          ? options
          : Object.fromEntries(
              product.variants.map((variant) => [variant.label, variant.options[0]]),
            )
      const key = lineKey(product.id, resolved)
      setLines((current) => {
        const existing = current.find((line) => line.key === key)
        if (existing) {
          return current.map((line) =>
            line.key === key ? { ...line, quantity: readQuantity(line.quantity + quantity) } : line,
          )
        }
        return [
          ...current,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            unitPrice: product.price,
            originalPrice: product.originalPrice,
            quantity: readQuantity(quantity),
            options: resolved,
          },
        ]
      })
      pushToast({
        title: 'Added to cart',
        message: `${product.name} · ${formatPrice(product.price)}`,
        variant: 'success',
      })
    },
    [pushToast, setLines],
  )

  const removeItem = useCallback(
    (key: string) => {
      setLines((current) => current.filter((line) => line.key !== key))
      pushToast({ title: 'Removed from cart' })
    },
    [pushToast, setLines],
  )

  const setQuantity = useCallback(
    (key: string, quantity: number) => {
      const next = readQuantity(quantity)
      setLines((current) =>
        current.flatMap((line) =>
          line.key === key ? (next <= 0 ? [] : [{ ...line, quantity: next }]) : [line],
        ),
      )
    },
    [setLines],
  )

  const clearCart = useCallback(() => setLines([]), [setLines])

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((current) => {
        const exists = current.includes(product.id)
        pushToast({
          title: exists ? 'Removed from wishlist' : 'Saved to wishlist',
          message: product.name,
        })
        return exists ? current.filter((id) => id !== product.id) : [...current, product.id]
      })
    },
    [pushToast, setWishlist],
  )

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const applyPromo = useCallback((raw: string) => {
    const code = raw.trim().toUpperCase() as PromoCode
    if (!PROMOS[code]) return { ok: false, message: `Code ${raw.trim()} is not valid.` }
    setPromo(code)
    return { ok: true, message: `${PROMOS[code].label} applied.` }
  }, [])

  const removePromo = useCallback(() => setPromo(null), [])

  const totals = useMemo<Totals>(() => {
    const subtotal = lines.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0,
    )
    const savings = lines.reduce((sum, line) => {
      const original = line.originalPrice ?? line.unitPrice
      return sum + Math.max(0, original - line.unitPrice) * line.quantity
    }, 0)
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
    const promoInfo = promo ? PROMOS[promo] : null
    const discount =
      promoInfo?.kind === 'percent' ? (subtotal * promoInfo.value) / 100 : 0
    const afterDiscount = Math.max(0, subtotal - discount)

    let shipping =
      afterDiscount === 0 || itemCount === 0
        ? 0
        : afterDiscount >= FREE_SHIPPING_THRESHOLD
          ? 0
          : STANDARD_SHIPPING
    if (shippingMethod === 'express' && itemCount > 0) shipping = EXPRESS_SHIPPING
    if (promoInfo?.kind === 'shipping') shipping = 0

    return {
      subtotal,
      savings,
      discount: Math.round(discount * 100) / 100,
      shipping,
      total: Math.round((afterDiscount + shipping) * 100) / 100,
      itemCount,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingGap: Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount),
    }
  }, [lines, promo, shippingMethod])

  const value = useMemo<StoreValue>(
    () => ({
      lines,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      totals,
      shippingMethod,
      setShippingMethod,
      promo,
      applyPromo,
      removePromo,
      wishlist,
      toggleWishlist,
      isWishlisted,
      toasts,
      pushToast,
      dismissToast,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      quickView,
      setQuickView,
    }),
    [
      lines,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      totals,
      shippingMethod,
      promo,
      applyPromo,
      removePromo,
      wishlist,
      toggleWishlist,
      isWishlisted,
      toasts,
      pushToast,
      dismissToast,
      cartOpen,
      searchOpen,
      menuOpen,
      quickView,
    ],
  )

  useEffect(() => {
    document.title = document.title
  }, [])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within <StoreProvider>')
  return context
}

export const computeSavings = computeDiscount
