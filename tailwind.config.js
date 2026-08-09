/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pinkBrand: {
          50: '#FFF0F5',
          100: '#FFE4E9',
          200: '#FFCCD5',
          300: '#FFA3B5',
          400: '#FF7092',
          500: '#FF477E',
          600: '#E6396E',
          700: '#C22055',
          800: '#9E1543',
          900: '#750B2F',
        },
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#6C5DD3',
          700: '#5B4EB5',
          800: '#4C1D95',
          900: '#331B69',
        },
        pastel: {
          pink: '#FFE5EC',
          softRed: '#FF6584',
          cream: '#FFF9F5',
          yellow: '#FFF8E7',
          mint: '#E8F5E9',
          blue: '#E1F5FE'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 8px 24px -6px rgba(255, 71, 126, 0.12), 0 4px 10px -4px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 16px 32px -8px rgba(255, 71, 126, 0.22), 0 8px 16px -6px rgba(0, 0, 0, 0.06)',
        'pink-glow': '0 0 25px rgba(255, 71, 126, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
