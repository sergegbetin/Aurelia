/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FBF8F2',
          soft: '#F6F1E7',
          deep: '#EFE8DA',
        },
        cream: '#F3ECE0',
        champagne: {
          DEFAULT: '#E7DAC4',
          light: '#F0E7D8',
          dark: '#D6C4A6',
        },
        noir: {
          DEFAULT: '#111008',
          soft: '#1B1A14',
          mute: '#3A382F',
        },
        gold: {
          DEFAULT: '#C0964B',
          light: '#E2C688',
          deep: '#9A7431',
          pale: '#F2E6CD',
        },
        bordeaux: {
          DEFAULT: '#6C1D2C',
          light: '#8A2C3D',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Jost', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.34em',
        wider2: '0.2em',
      },
      fontSize: {
        'display-lg': ['clamp(2.75rem, 6.4vw, 5.75rem)', { lineHeight: '0.98', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.02' }],
        'display-sm': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.1' }],
      },
      boxShadow: {
        luxe: '0 24px 60px -30px rgba(17, 16, 8, 0.35)',
        card: '0 18px 40px -28px rgba(17, 16, 8, 0.45)',
        drawer: '-24px 0 60px -30px rgba(17, 16, 8, 0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 26px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translate3d(100%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translate3d(-100%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translate3d(0, 18px, 0) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.85)' },
          '50%': { opacity: '0.9', transform: 'scale(1.1)' },
        },
        tick: {
          '0%': { opacity: '0', transform: 'translate3d(0, 60%, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        fadeIn: 'fadeIn 0.5s ease both',
        slideInRight: 'slideInRight 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        slideInLeft: 'slideInLeft 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        riseIn: 'riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 3.5s linear infinite',
        floatSoft: 'floatSoft 7s ease-in-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        tick: 'tick 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
