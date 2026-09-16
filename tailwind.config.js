/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ===== Warm paper foundation ===== */
        cream: {
          50: '#FCFAF7',
          100: '#F7F3EE', // primary page background
          200: '#F1EBE3',
          300: '#E5D9CF', // hairline borders
          400: '#D8C7B8',
        },
        /* ===== Chocolate / brown ink ===== */
        cocoa: {
          950: '#1A0E08',
          900: '#24130D', // deep brown — primary text, dark surfaces
          850: '#2E1A11',
          800: '#3A2117', // primary brown
          700: '#4A2A1C', // chocolate
          600: '#5F4130',
          500: '#765F52', // secondary text
          400: '#9A8375',
        },
        /* ===== Roasted caramel ===== */
        caramel: {
          600: '#8F5426',
          500: '#A9683A', // caramel
          400: '#C9944A', // warm gold
          300: '#DBAF6F',
          200: '#ECD3AF',
          100: '#F7E9D5',
          50: '#FBF3E5',
        },
        ember: {
          500: '#D2531F', // legacy brand orange — small accent only
        },
        success: {
          500: '#3E7C4F',
          400: '#4E9463',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        /* Brown-tinted, physical, quiet */
        card: '0 1px 2px rgba(36, 19, 13, 0.04), 0 10px 28px -14px rgba(36, 19, 13, 0.14)',
        'card-hover':
          '0 2px 4px rgba(36, 19, 13, 0.05), 0 26px 52px -22px rgba(36, 19, 13, 0.28)',
        float: '0 6px 16px -6px rgba(36, 19, 13, 0.12), 0 24px 48px -20px rgba(36, 19, 13, 0.22)',
        overlay: '0 32px 80px -24px rgba(26, 14, 8, 0.45)',
        btn: '0 1px 2px rgba(36, 19, 13, 0.2), 0 8px 20px -8px rgba(36, 19, 13, 0.4)',
        'btn-hover': '0 2px 4px rgba(36, 19, 13, 0.22), 0 14px 30px -10px rgba(36, 19, 13, 0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      letterSpacing: {
        luxe: '0.28em',
      },
      maxWidth: {
        shell: '80rem', // 1280px content shell
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out both',
        'fade-up': 'fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'toast-in': 'toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        pop: 'pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        /* One very quiet ambient float for the hero badge only */
        float: 'float 7s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
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
          from: { opacity: '0', transform: 'scale(0.97) translateY(8px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
