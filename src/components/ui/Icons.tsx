import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export const SearchIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const UserIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c.9-3.6 3.8-5.5 7.5-5.5s6.6 1.9 7.5 5.5" />
  </svg>
)

export const HeartIcon = ({ size = 20, filled = false, ...rest }: IconProps & { filled?: boolean }) => (
  <svg {...base(size)} fill={filled ? 'currentColor' : 'none'} {...rest}>
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 3c0 5-7.5 9.6-7.5 9.6Z" />
  </svg>
)

export const BagIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M5 7.5h14l-1 12.5H6L5 7.5Z" />
    <path d="M9 9.5V6.8a3 3 0 0 1 6 0v2.7" />
  </svg>
)

export const MenuIcon = ({ size = 22, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
)

export const CloseIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ArrowRightIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const ArrowLeftIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M20 12H5" />
    <path d="m11 6-6 6 6 6" />
  </svg>
)

export const ChevronDownIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronRightIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const StarIcon = ({ size = 14, filled = true, ...rest }: IconProps & { filled?: boolean }) => (
  <svg {...base(size)} fill={filled ? 'currentColor' : 'none'} strokeWidth={filled ? 0 : 1.2} {...rest}>
    <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z" />
  </svg>
)

export const ShieldIcon = ({ size = 22, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 3.5 19 6v6c0 4.2-2.9 7.3-7 8.5-4.1-1.2-7-4.3-7-8.5V6l7-2.5Z" />
    <path d="m9.2 12.2 1.9 1.9 3.7-3.9" />
  </svg>
)

export const TruckIcon = ({ size = 22, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M3 7.5h10v9H3z" />
    <path d="M13 11h4l3 3v2.5h-7V11Z" />
    <circle cx="7" cy="18" r="1.7" />
    <circle cx="17" cy="18" r="1.7" />
  </svg>
)

export const RefreshIcon = ({ size = 22, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" />
    <path d="M20 4.5v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" />
    <path d="M4 19.5v-4h4" />
  </svg>
)

export const ChatIcon = ({ size = 22, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M4.5 6.5A2 2 0 0 1 6.5 4.5h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4 3.5v-3.5H6.5a2 2 0 0 1-2-2v-7Z" />
  </svg>
)

export const PlusIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const MinusIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M5 12h14" />
  </svg>
)

export const TrashIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M4.5 7h15M9.5 7V5.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V7" />
    <path d="M6.5 7l.9 12a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l.9-12" />
  </svg>
)

export const EyeIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M2.8 12S6 6.5 12 6.5 21.2 12 21.2 12 18 17.5 12 17.5 2.8 12 2.8 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
)

export const CheckIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const LockIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="1.4" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </svg>
)

export const FilterIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M4 6.5h16M7 12h10M10 17.5h4" />
  </svg>
)

export const SlidersIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M5 6h14M5 12h14M5 18h14" />
    <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="8" cy="18" r="2" fill="currentColor" stroke="none" />
  </svg>
)

export const SparkleIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.6 10.4 12.2 5 10.6 10.4 9 12 3.5Z" />
    <path d="M18.5 4v3M20 5.5h-3" />
  </svg>
)

export const GiftIcon = ({ size = 20, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <rect x="4" y="9" width="16" height="11" rx="1" />
    <path d="M3 9h18M12 9v11" />
    <path d="M12 9S10.6 4.8 8.4 5.4 9.6 9 12 9Zm0 0s1.4-4.2 3.6-3.6S14.4 9 12 9Z" />
  </svg>
)

export const InstagramIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const FacebookIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M14.5 8.5h2V5.6h-2.2c-2 0-3.3 1.3-3.3 3.4v1.6H9v2.9h2v6.4h3v-6.4h2.2l.4-2.9H14V9.4c0-.6.2-.9.5-.9Z" />
  </svg>
)

export const PinterestIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10.4 18.5 12 12m0 0c.7-1.2 1.7-1.8 2.9-1.6 1.5.2 2.2 1.5 1.8 3.1-.5 2-2 3-3.7 2.7-1.6-.3-2.7-1.6-2.6-3.2.1-2 1.8-3.7 4-3.9" />
  </svg>
)

export const YoutubeIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <rect x="3" y="6.5" width="18" height="11" rx="3" />
    <path d="m10.8 9.8 4.2 2.2-4.2 2.2V9.8Z" fill="currentColor" stroke="none" />
  </svg>
)

export const TruckFastIcon = TruckIcon
