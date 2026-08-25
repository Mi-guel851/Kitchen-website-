/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#08090C',
          dark: '#0E1015',
          card: '#151821',
          cardHover: '#1C202C',
          cardLight: '#232836',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 90, 31, 0.35)',
          orange: '#FF5A1F',
          orangeHover: '#E84A12',
          gold: '#F59E0B',
          yellow: '#FFB800',
          red: '#EF4444',
          green: '#10B981',
          textMuted: '#94A3B8',
          textDim: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(255, 90, 31, 0.35)',
        'glow-gold': '0 0 30px -5px rgba(245, 158, 11, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 0 rgba(255, 90, 31, 0.15)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
