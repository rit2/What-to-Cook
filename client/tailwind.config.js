/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#faf3e0',
        cream: '#fff8e7',
        warm: {
          50: '#fefcf5',
          100: '#fdf6e3',
          200: '#f5e6c8',
          300: '#e8d5a3',
          400: '#d4b882',
          500: '#b8956a',
          600: '#8b6914',
          700: '#6b4f10',
          800: '#4a3610',
          900: '#2d2009',
        },
        sage: {
          light: '#d4ddd2',
          DEFAULT: '#8fa68c',
          dark: '#5c7259',
        },
        berry: '#c47a7a',
        sky: '#a3bfcf',
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(139, 105, 20, 0.06)',
        'card': '0 4px 12px rgba(139, 105, 20, 0.08)',
      },
    },
  },
  plugins: [],
};
