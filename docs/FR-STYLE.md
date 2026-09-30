# AURELIA — Guide de traduction FR

But : passer **tout le site en français** sans casser le code, ni le SEO, ni les comportements.

## Règles absolues

1. **Ne modifier que les chaînes visibles par l'utilisateur** : textes JSX, arguments de
   `usePage(...)`, `title` / `label` / `placeholder` / `alt` / `aria-label` / `description` /
   `content` / `message` / `question` / `answer` / `body` / `headline`, textes de toasts,
   états vides, messages d'erreur, JSON-LD (`description`, `slogan`, `name`…).
2. **Ne JAMAIS modifier** : identifiants, noms de variables/props, noms de classes CSS,
   `className`, chemins d'images, `slug`, `id`, `category`, clés de tri/URL (`view=new`,
   `view=bestsellers`, `view=collection`, `view=fresh`, `view=offers`, `q`, `gift`,
   `category`), identifiants de `id` de formulaire, `type`, `value` techniques, regular
   expressions, promo codes (`AURELIA10`, `NEWYEAR15`, `FREESHIP`), numéros de produit
   (`AU-1001`), URL `https://aurelia.example.com`.
3. **Commentaires de code** : on les laisse en anglais (sauf si le commentaire décrit un
   texte affiché — alors on peut le mettre à jour pour coller au nouveau texte).
4. **Aucune suppression ni ajout de ligne de logique**, sauf indication contraire explicite
   dans la mission.
5. Ne pas lancer `tsc` / `vite build` (le lead fait la vérification finale).

## Typographie française

- Guillemets : `« … ` + NBSP + `… »` → écrire `«\u00A0texte\u00A0»`. Utiliser le vrai
  caractère insécable (U+00A0), **pas** une espace normale.
- **NBSP (U+00A0) avant** `:` `;` `!` `?` et avant `»`, **après** `«` :
  `«\u00A0Le prix est de 128\u00A0€\u00A0! »` — en pratique : espace insécable avant les
  ponctuations hautes et à l'intérieur des guillemets.
- Apostrophe typographique `’` pour les élisions : `l’année`, `d’occasion`, `aujourd’hui`.
  (Utiliser `’` U+2019, jamais `'` dans les textes affichés.)
- Chiffres : `2 000` avec espace insécable pour les milliers si occasion ; sinon simples.
- Majuscules d’accentuation obligatoires : `É`, `À`, `Ç` (ex. `ÉTÉ`, `À PARTIR DE`).
- Pas de point final dans les titres/boutons courts ; ponctuation complète dans les
  paragraphes.

## Glossaire

| Anglais | Français |
|---|---|
| Accueil | Accueil |
| Shop / Boutique | Boutique |
| New arrivals / New | Nouveautés |
| Cadeaux / Gifts | Cadeaux |
| Best sellers | Meilleures ventes |
| New Year Collection | Collection du Nouvel An |
| Account | Compte |
| Cart | Panier |
| Wishlist | Liste d’envies |
| Search | Recherche |
| Add to cart | Ajouter au panier |
| Buy now / Purchase | Acheter maintenant |
| Quick view | Aperçu rapide |
| View product / View | Voir le produit / Voir |
| Remove | Supprimer |
| Quantity | Quantité |
| Price | Prix |
| Sale | Promo |
| Discount / Savings | Réduction |
| Free | Offert / Gratuit(e) |
| Subtotal | Sous-total |
| Total | Total |
| Promo code | Code promo |
| Apply | Appliquer |
| Checkout / Proceed to checkout | Paiement / Passer au paiement |
| Secure checkout | Paiement sécurisé |
| Information | Informations |
| Delivery / Shipping | Livraison |
| Standard delivery | Livraison standard |
| Express delivery | Livraison express |
| Business days | jours ouvrés |
| Returns | Retours |
| Order confirmation | Confirmation de commande |
| Order number | Numéro de commande |
| Thank you | Merci |
| Reviews | Avis |
| Description | Description |
| Specifications | Caractéristiques |
| Delivery & returns | Livraison et retours |
| FAQ | FAQ |
| Related products / You may also like | Produits similaires / Vous aimerez aussi |
| Filters / Sort by | Filtres / Trier par |
| Clear all | Tout effacer |
| Load more | Afficher plus |
| Results / No results | Résultats / Aucun résultat |
| Out of stock | Épuisé |
| In stock | En stock |
| Only X left | Plus que X en stock |
| Gift options | Options cadeau |
| Gift message | Message cadeau |
| Hide prices on the parcel | Masquer les prix sur le colis |
| Newsletter | Newsletter |
| Subscribe | S’abonner |
| Email address | Adresse e-mail |
| Footer columns : Shop / Categories / Customer care / Legal | Boutique / Catégories / Service client / Informations légales |
| Contact / Shipping / Returns / Privacy / Terms / Cookies | Contact / Livraison / Retours / Confidentialité / Conditions générales / Cookies |
| Badge NEW | NOUVEAUTÉ |
| Badge BEST SELLER | MEILLEURE VENTE |
| Badge LIMITED | ÉDITION LIMITÉE |
| Badge EXCLUSIVE | EXCLUSIVITÉ |
| Badge SALE | PROMO |
| Hero : « A NEW YEAR. / A NEW YOU. » | « UNE NOUVELLE ANNÉE. / UN NOUVEAU VOUS. » |
| Signature : Start the year beautifully. | Commencez l’année avec beauté. |
| Campaign : AURELIA NEW YEAR COLLECTION | AURELIA — COLLECTION DU NOUVEL AN |
| Section titles (THE NEW YEAR EDIT, START WITH OUR FAVORITES, NEW YEAR. NEW HABITS., MAKE THIS YEAR YOURS., THE ONE EVERYONE WANTS, THE NEW YEAR MOMENT…) | traduire en capitales avec la même élégance, p. ex. « L’ÉDITION DU NOUVEL AN », « COMMENCEZ PAR NOS COUPS DE CŒUR », « NOUVELLE ANNÉE. NOUVELLES HABITUDES. », « FAITES DE CETTE ANNÉE LA VÔTRE. », « LA PIÈCE QUE TOUT LE MONDE VEUT », « LE MOMENT DU NOUVEL AN » |

### Catégories

`Beauty → Beauté` · `Fashion → Mode` · `Tech → High-tech` · `Home → Maison` ·
`Accessories → Accessoires` · `Gifts → Cadeaux`

### Noms de produits

Traduire le **sens** tout en conservant le nom de la gamme ; **ne jamais changer le `slug`**.

- `Aurora Chrono Watch → Montre Aurora Chrono`
- `The New Year Gift Box → Coffret Cadeau du Nouvel An`
- `Solstice Marble Candle Trio → Trio de bougies Solstice en marbre`
- `Aura Pro Wireless Earbuds → Écouteurs sans fil Aura Pro`
- `Nocturne Eau de Parfum → Eau de parfum Nocturne`
- `Lumen Radiance Serum → Sérum éclat Lumen`
- `Halo Smartwatch Series 3 → Montre connectée Halo Série 3`
- `2027 Leather Agenda → Agenda en cuir 2027`
- `Stride Insulated Bottle → Gourde isotherme Stride`
- `Lumen Arc Desk Lamp → Lampe de bureau Lumen Arc`
- `Align Cork Yoga Mat → Tapis de yoga en liège Align`
- Continuer ainsi, dans le même esprit.

### Variantes, specs, tags

- `Size → Taille`, `Finish → Finition`, `Colour/Couleur → Couleur`, `Material → Matière`,
  `Capacity → Contenance`, `Colorway → Coloris`.
- Options : `Classic box → Coffret classique`, `Gift wrapped → Emballé cadeau`,
  `Black → Noir`, `Gold → Or`, `Cognac leather → Cuir cognac`, `30 ml → 30 ml` (inchangé).
- **`tags` doivent rester cohérents avec la recherche** : traduire en français simple et
  sans accent si possible pour la recherche (`gift → cadeau`, `bestseller → meilleure-vente`,
  `fragrance → parfum`, `candle → bougie`, `watch → montre`, `tech → high-tech`…).
  Le filtre cadeau dépend du tag `cadeau` (voir plus bas).

## Devise : EURO

- La devise affichée est **l’euro**, via `formatPrice` / `formatPriceFull` (`fr-FR`, `EUR`).
- Dans les labels, écrire `75 €` (espace insécable avant `€`), p. ex.
  `Moins de 75 €`, `75 € – 150 €`, `150 € et plus`, `Offert dès 150 €`, `19,90 €`.
- Ne pas modifier les valeurs numériques des prix.

## Fréquences à respecter (tons)

- Ton premium, chaleureux, sobre : pas d’exclamation, pas d’emojis, pas de langage familier.
- « vous » (vouvoiement) partout.
- Les mentions de démonstration traduites littéralement :
  - `This is a demonstration storefront — no real payment is captured.` →
    `Ceci est une boutique de démonstration — aucun paiement réel n’est encaissé.`
  - `Demo content` → `Contenu de démonstration`
  - `no real account is published` → `aucun compte n’est publié`
  - champs carte : `Champs de démonstration — en production, ce bloc est remplacé par un
    élément Stripe. Rien de ce qui est saisi n’est stocké ni transmis.`
- Les mentions de confiance restent **crédibles et vérifiables** : ne rien inventer
  (aucun label, aucune certification, aucune presse).
