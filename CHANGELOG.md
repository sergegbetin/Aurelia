# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et le projet suit le [Versionnement sémantique](https://semver.org/lang/fr/).

## [Unreleased]

## [0.2.1] - 2026-09-30

### Fixed

- Le fil d’Ariane de la fiche produit, le surtitre de la fiche et du produit phare, et les
  résultats de recherche affichent désormais le **nom français de la catégorie** au lieu du
  slug anglais (« Accessoires » au lieu de « ACCESSORIES »).

## [0.2.0] - 2026-09-30

### Added

- **Traduction intégrale du site en français** : interface, contenus, fiches produits,
  avis, états vides, messages d’erreur, libellés d’accessibilité, métadonnées SEO
  (`lang="fr"`, `og:locale fr_FR`, JSON-LD `inLanguage`).
- Fonction de recherche unifiée `productSearchText` : catégorie en français, mots-clés
  de badge et synonymes cadeaux — les suggestions de recherche (« Cadeaux du Nouvel An »,
  « Meilleures ventes », « High-tech »…) renvoient désormais des résultats.
- Guide de style de traduction `docs/FR-STYLE.md` (glossaire et typographie française).

### Changed

- **Devise passée de USD en EUR**, formatage `fr-FR` (« 296,10 € ») ; libellés de
  fourchettes de prix et de livraison convertis.
- Mise à jour des dépendances : `react-router-dom` 6 → 7, `vite` 5 → 8,
  `@vitejs/plugin-react` 4 → 5 ; suppression du prop `future` devenu obsolète.
- Vocabulaire aligné : « Aperçu rapide », codes promo (`10 % de réduction sur la
  commande`, `Livraison standard offerte`), message `Code appliqué : …`.

### Fixed

- Pluriels « 1 produit / n produits » et « 1 article / n articles » sur la confirmation
  et dans le libellé d’accessibilité du panier.
- Monogrammes des cartes du guide cadeaux (`Pour ` au lieu de `For `).
- Double ponctuation de la description en aperçu rapide.

## [0.1.0] - 2026-09-30

### Added

- Squelette de la boutique **AURELIA — Collection du Nouvel An 2027** : Vite 5,
  React 18, TypeScript strict, Tailwind CSS 3, React Router 6.
- Parcours d’achat complet : accueil → boutique → catégorie → fiche produit →
  panier → paiement en 3 étapes → confirmation de commande.
- 22 produits de démonstration, 6 catégories, guide cadeaux (6 destinataires).
- Recherche avec suggestions, filtres et tri, liste d’envies, aperçu rapide
  (quick view), code promo (`AURELIA10`, `NEWYEAR15`, `FREESHIP`).
- Design system : palette ivoire/crème/noir champagne + or, typographies
  Jost et Cormorant Garamond, animations avec respect de
  `prefers-reduced-motion`.
- Accessibilité WCAG (repères, lien d’évitement, focus visible, ARIA),
  SEO (titres/descriptions par page, Open Graph, données structurées).
- 67 photographies sous licence libre/commerciale avec attribution dans
  `public/images/CREDITS.md`.
- Configuration Git et dépôt GitHub `sergegbetin/Aurelia`.

[Unreleased]: https://github.com/sergegbetin/Aurelia/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/sergegbetin/Aurelia/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/sergegbetin/Aurelia/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/sergegbetin/Aurelia/releases/tag/v0.1.0
