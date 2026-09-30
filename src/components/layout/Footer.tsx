import { Link } from 'react-router-dom'
import { brand, footerColumns, paymentMethods, socialLinks } from '../../data/content'
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
} from '../ui/Icons'

const socialIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  Pinterest: PinterestIcon,
  TikTok: FacebookIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
}

export function Footer() {
  return (
    <footer className="bg-noir text-ivory">
      <div className="container-luxe py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex flex-col items-start" aria-label="Accueil AURELIA">
              <span className="font-display text-3xl tracking-[0.3em]">{brand.name}</span>
              <span className="mt-2 text-[9px] uppercase tracking-luxe text-gold-light">
                {brand.signature}
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
              Une sélection soignée de cadeaux, d’objets de style de vie et d’objets du quotidien
              pour le Nouvel An — choisis pour leur qualité, leur design et le plaisir de
              recommencer.
            </p>
            <ul className="mt-7 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label] ?? InstagramIcon
                return (
                  <li key={social.label}>
                    <Link
                      to={social.to}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold-light"
                    >
                      <Icon size={17} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-[11px] uppercase tracking-luxe text-gold-light">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ivory/12 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-2" aria-label="Moyens de paiement acceptés">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="border border-ivory/18 px-3 py-1.5 text-[10px] uppercase tracking-wider text-ivory/55"
              >
                {method}
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-ivory/45">
            © {new Date().getFullYear()} {brand.name}. Tous droits réservés.
          </p>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-ivory/35">
          Avis de prototype : tous les produits, prix, avis et témoignages affichés sur ce site
          sont des données de démonstration, destinées à la conception. Le paiement sécurisé est
          assuré par un prestataire — aucune donnée de carte n’est jamais stockée par la boutique.
        </p>
      </div>
    </footer>
  )
}
