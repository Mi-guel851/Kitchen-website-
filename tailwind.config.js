/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm near-black foundation — depth without cold navy tints
        ink: {
          950: '#0A0807',
          900: '#0F0C0A',
          850: '#141009',
          800: '#181310',
          750: '#1E1813',
          700: '#251E17',
          600: '#2F261D',
        },
        // Brand flame — fire, grill, heat. Used strategically.
        ember: {
          200: '#FFD3B8',
          300: '#FFB27D',
          400: '#FF8A47',
          500: '#FF5A1F',
          600: '#EF4812',
          700: '#C93A0D',
        },
        // Warm amber / golden yellow accents
        gold: {
          200: '#FFE3AE',
          300: '#FFD07C',
          400: '#FFC14D',
          500: '#F2A93B',
          600: '#D98E1F',
        },
        // Warm off-white typography
        cream: {
          50: '#FAF6EF',
          100: '#F1EBE0',
          200: '#E2DACA',
          300: '#CFC7B8',
          400: '#B4AC9E',
          500: '#9C9488',
          600: '#7E776C',
          700: '#5F594F',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 32px -16px rgba(0, 0, 0, 0.65)',
        'card-hover': '0 28px 56px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 90, 31, 0.08)',
        'glow-ember': '0 12px 40px -10px rgba(255, 90, 31, 0.45)',
        'glow-gold': '0 8px 32px -10px rgba(242, 169, 59, 0.35)',
        'glow-soft': '0 24px 60px -24px rgba(0, 0, 0, 0.9)',
      },
      letterSpacing: {
        luxe: '0.3em',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out both',
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-up': 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'toast-in': 'toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pop': 'pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'bounce-subtle': 'bounceSubtle 2.8s ease-in-out infinite',
        float: 'float 4.5s ease-in-out infinite',
        'float-slow': 'float 6.5s ease-in-out infinite',
        'float-reverse': 'floatReverse 5.5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin 48s linear infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          from: { opacity: '0', transform: 'translateX(24px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        pop: {
          '0%': { transform: 'scale(0.7)' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translate(-50%, 0)' },
          '50%': { transform: 'translate(-50%, -6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(7px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
