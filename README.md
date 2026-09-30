# Aurelia

## AURELIA — Collection du Nouvel An 2027

**« Commencez l’année avec beauté. »**

Boutique e-commerce premium, entièrement fonctionnelle, pour la
**AURELIA — Collection du Nouvel An** : direction artistique luxe (ivoire, crème, noir
profond, champagne, or discret, touches bordeaux maîtrisées), typographies Jost
(sans-serif) et Cormorant Garamond (serif), et un parcours d’achat complet jusqu’à la
confirmation de commande. **Le site est en français** (`lang="fr"`, devises en euros).

---

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # contrôle des types + build de production dans dist/
npm run preview    # sert le build de production sur http://localhost:4173
```

> Sous PowerShell Windows, utilisez `npm.cmd run dev` si le shim `npm.ps1` est bloqué.

---

## Pile technique

| Couche     | Choix |
|------------|--------|
| Build      | Vite 8 |
| Interface  | React 18 + TypeScript (strict) |
| Styles     | Tailwind CSS 3, jetons de design personnalisés |
| Routage    | React Router 7 (`BrowserRouter`) |
| État       | Un seul contexte `StoreProvider` + persistance `localStorage` |
| Polices    | Google Fonts — Jost + Cormorant Garamond |

Aucune autre dépendance d’exécution.

---

## Architecture

```
src/
├── components/
│   ├── layout/        # barre d’annonce, en-tête, pied de page, tiroirs
│   ├── overlays/      # recherche, menu mobile, panier, aperçu rapide, toasts
│   ├── sections/      # héro, compte à rebours, confiance, édition, guide cadeaux…
│   ├── shop/          # ProductExplorer (filtres/tri/recherche), ProductCard
│   └── ui/            # boutons, badges, note, prix, révélations, images paresseuses
├── data/              # products.ts (22 produits), catégories, contenus, FAQ, avis
├── hooks/             # useReveal, usePage, useCountdown…
├── lib/               # SEO/données structurées, formatage, codes promo
├── pages/             # Accueil, Boutique, Catégorie, Produit, Panier, Paiement,
│                      # Confirmation, Liste d’envies, 404
├── store/              # StoreContext : panier, envies, promo, tiroirs, toasts
└── styles/             # couches Tailwind, typographie, jetons
```

### Routes

`/` · `/shop` · `/category/:slug` · `/product/:slug` · `/cart` · `/checkout` ·
`/order-confirmation` · `/wishlist` · `*` (404)

---

## Fonctionnalités

- **Accueil** — barre d’annonce, en-tête premium, héro (« Une nouvelle année. / Un nouveau
  vous. »), compte à rebours (« Le moment du Nouvel An »), bandeau de confiance,
  L’édition du Nouvel An, coups de cœur, guide cadeaux (6 destinataires), Nouvelle année,
  nouvelles habitudes, produit phare, offres du Nouvel An, bannière éditoriale, preuve
  sociale marquée démonstration, grille Instagram (aucun compte publié), newsletter,
  pied de page premium.
- **Boutique** — recherche texte, filtres catégorie / prix / disponibilité, tri, nombre de
  résultats, états vides, Afficher plus ; liens profonds (`/shop?category=tech`,
  `?view=collection`) pris en charge.
- **Pages catégorie** — dynamiques, titres SEO, filtrées depuis le même catalogue.
- **Fiche produit** — galerie avec miniatures et zoom, variantes, quantité, liste d’envies,
  onglets, caractéristiques, FAQ, avis, produits similaires, ajout au panier collant
  (mobile).
- **Aperçu rapide** — modale d’ajout depuis la grille (Échap ferme, gestion du focus).
- **Recherche** — suggestions, produits et catégories, « Voir tous les résultats », état
  « aucun résultat » travaillé, Échap ferme et débloque le corps de page.
- **Liste d’envies** — cœur d’ajout partout, page dédiée, persistance.
- **Panier** — tiroir + page complète, quantités, suppression, codes promo, totaux,
  accès paiement sécurisé. Codes de démonstration : **AURELIA10** (−10 %),
  **NEWYEAR15** (−15 %), **FREESHIP** (livraison offerte).
- **Paiement** — 3 étapes (Informations → Livraison → Paiement) avec validation en ligne,
  modes de livraison, options cadeau, récapitulatif ; les champs bancaires sont
  explicitement des démonstrations — **prêt pour Stripe** : en production ils sont remplacés
  par un Élément Stripe et la boutique **ne stocke jamais de données de carte**.
- **Confirmation de commande** — numéro, totaux, fenêtre de livraison, statut de paiement,
  mention de démonstration, liens de suite.
- **Accessibilité** — repères sémantiques, lien d’évitement, contrôles étiquetés, focus
  visible, toasts `aria-live`, overlays clavier, respect de `prefers-reduced-motion`.
- **Performance** — découpage par route, images différées, révélations hors écran.
- **SEO** — titres/descriptions par page, Open Graph, Twitter, canonical, JSON-LD
  (`Organization`, `WebSite`, `Product`, `BreadcrumbList`), `inLanguage: fr-FR`.

---

## Images

67 photographies issues de l’API Openverse sous licences permettant un usage commercial et
la modification (CC0 / CC BY / CC BY-SA), direction artistique chaude et dorée. Chaque
image dispose d’un repli et d’une attribution complète dans
[`public/images/CREDITS.md`](public/images/CREDITS.md).

Scripts utilitaires :

- `scripts/fetch-images.mjs` — récupération d’images par emplacement
- `scripts/fetch-candidates.mjs` — candidats + planche de contact pour revue
- `scripts/normalize-credits.mjs` — régénère `public/images/CREDITS.md`

---

## Contenu honnête

- Avis, comptes d’abonnés et citations de presse sont explicitement marqués
  **contenu de démonstration**.
- Le bloc Instagram ne renvoie vers aucun compte et précise qu’aucun compte n’est publié.
- L’étape de paiement indique qu’il s’agit d’une boutique de démonstration — aucun
  paiement réel n’est encaissé.
- Aucune certification, récompense, logo de presse ou allégation inventée.

---

## Versionnage & dépôt

- Dépôt : https://github.com/sergegbetin/Aurelia (branche `main`)
- Workflow : branches `feature/*`, `fix/*`, `chore/*`, commits en **Conventional Commits**,
  fusion en `--no-ff`, pas de `push --force`.
- Versionnement sémantique, journal des versions dans [`CHANGELOG.md`](CHANGELOG.md).

---

## Vérifications effectuées

- `tsc --noEmit` propre, `npm audit` → **0 vulnérabilité**, build de production propre
  (Vite 8, 57 modules, ≈ 371 kO de JS et 43 kO de CSS).
- Relecture responsive complète en 390 px (accueil et boutique) et contrôles desktop.
- Parcours fonctionnel validé : recherche, filtres, liens profonds, liste d’envies, aperçu
  rapide, panier, codes promo, paiement en 3 étapes, confirmation, métadonnées par route —
  **aucune erreur console**.
