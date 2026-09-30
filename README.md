# AURELIA — New Year Collection 2027

**"Start the year beautifully."**

A premium, fully functional e-commerce storefront for the **AURELIA NEW YEAR COLLECTION**:
luxury New Year art direction (ivory, cream, deep black, champagne, subtle gold, controlled
bordeaux), modern sans (Jost) + elegant serif (Cormorant Garamond), and a complete purchase
journey from home page to order confirmation.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build in dist/
npm run preview    # serve the production build on http://localhost:4173
```

> On Windows PowerShell, call `npm.cmd run dev` if the `npm.ps1` shim is blocked.

---

## Tech stack

| Layer     | Choice |
|-----------|--------|
| Build     | Vite 5 |
| UI        | React 18 + TypeScript (strict) |
| Styling   | Tailwind CSS 3, custom design tokens |
| Routing   | React Router 6 (`BrowserRouter`, v7 future flags) |
| State     | Single `StoreProvider` context + `localStorage` persistence |
| Fonts     | Google Fonts — Jost + Cormorant Garamond |

No other runtime dependencies.

---

## Architecture

```
src/
├── components/
│   ├── layout/        # Announcement bar, header, footer, drawers
│   ├── overlays/      # Search, mobile menu, cart drawer, quick view, toasts
│   ├── sections/      # Hero, countdown, trust bar, edit, gift guide, editorial…
│   ├── shop/          # ProductExplorer (filters/sort/search), ProductCard
│   └── ui/            # Buttons, badges, rating, price, reveal, lazy image
├── data/              # products.ts (22 products), categories, content, faqs, reviews
├── hooks/             # useReveal, useDebounce, usePageMeta, useMediaQuery…
├── lib/               # seo/structured data, formatting, promo codes
├── pages/             # Home, Shop, Category, Product, Cart, Checkout,
│                      # OrderConfirmation, Wishlist, NotFound
├── store/             # StoreContext: cart, wishlist, promo, drawers, toasts
└── styles/            # Tailwind layers, typography, tokens
```

### Routes

`/` · `/shop` · `/category/:slug` · `/product/:slug` · `/cart` · `/checkout` ·
`/order-confirmation` · `/wishlist` · `*` (404)

---

## Features

- **Home** — announcement bar, premium header, hero ("A NEW YEAR. / A NEW YOU."),
  live countdown ("THE NEW YEAR MOMENT"), trust bar, THE NEW YEAR EDIT, favorites grid,
  Gift Guide (6 audiences), NEW YEAR. NEW HABITS., featured product, New Year Offers,
  editorial banner, marked demo social proof, Instagram-style grid (no fake account),
  newsletter, premium footer.
- **Shop** — text search, category / price / availability filters, sorting, result count,
  empty states, Load More; deep links (`/shop?category=tech`, `?view=collection`) supported.
- **Category pages** — dynamic, SEO-titled, filtered from the same catalogue.
- **Product page** — gallery with thumbnails + zoom, variants, quantity, wishlist,
  accordions/tabs, FAQ, reviews, related products, sticky mobile add-to-cart.
- **Quick view modal** — quick add without leaving the grid (Escape closes, focus-managed).
- **Search overlay** — live suggestions, product/category hits, "See all results",
  designed no-results state, Escape closes and unlocks the body.
- **Wishlist** — heart toggles everywhere, dedicated page, persisted.
- **Cart** — drawer + full page, quantities, remove, promo codes, totals, secure-checkout CTA.
  Demo codes: **AURELIA10** (−10%), **NEWYEAR15** (−15%), **FREESHIP** (free delivery).
- **Checkout** — 3 steps (Information → Delivery → Payment) with inline validation,
  delivery methods, gift options, order summary; card fields are clearly marked demo
  placeholders — Stripe-Ready: production swaps them for a Stripe Element and the
  storefront **never stores card data**.
- **Order confirmation** — order number, totals, delivery window, payment status,
  demo disclosure, next-step links.
- **Accessibility** — semantic landmarks, skip link, labelled controls, visible focus,
  `aria-live` toasts, keyboard-operable overlays, `prefers-reduced-motion` respected.
- **Performance** — route-level code splitting, lazy images with `srcset`-friendly
  sizing, deferred offscreen reveals.
- **SEO** — per-page titles/descriptions/OG/Twitter tags, canonical, JSON-LD
  (`Organization`, `WebSite`, `Product`, `BreadcrumbList`).

---

## Imagery

67 photographs sourced via the Openverse API under commercial-use + modification licences
(CC0 / CC BY / CC BY-SA), art-directed for warm light, gold detail and premium composition.
Every image has a per-file fallback and full attribution in
[`public/images/CREDITS.md`](public/images/CREDITS.md).

Helper scripts:

- `scripts/fetch-images.mjs` — curated slot-based image fetching
- `scripts/fetch-candidates.mjs` — candidate downloads + contact sheet for review
- `scripts/normalize-credits.mjs` — regenerates `public/images/CREDITS.md`

---

## Honest-by-design content

- Testimonials, follower counts and press mentions are explicitly labelled **demo content**.
- The Instagram block links to no account and states that no account is published.
- Payment step states it is a demonstration storefront — no real payment is captured.
- No invented certifications, awards, press logos or medical/efficacy claims.

---

## Verification performed

- `tsc --noEmit` clean, production build clean (≈344 kB JS / 42 kB CSS gzipped-ish, 68 modules).
- Responsive review at 390 px (full home page + shop) and desktop layout checks.
- Functional pass: search, filters, deep links, wishlist, quick view, cart, promo codes,
  3-step checkout validation, order confirmation, per-route metadata — no console errors.
