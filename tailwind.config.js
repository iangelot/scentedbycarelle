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
          navy: '#252D61',
          'navy-dark': '#0d1329',
          'navy-light': '#1F2755',
          gold: '#c5a059',
          'gold-light': '#e5c98d',
          'gold-dark': '#9f7d38',
          sand: '#f7f5f0',
          ivory: '#fcfbf9',
          cream: '#f3efe6',
          charcoal: '#1a1f2c',
          muted: '#989898',
          'muted-light': '#b5b9c5',
        }
      },
      fontFamily: {
        elgina: ['Elgina', 'Playfair Display', 'Georgia', 'serif'],
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['Elgina', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-3deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
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

