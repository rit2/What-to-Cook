/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#e8b4b8',
          'pink-light': '#f5d5d8',
          teal: '#7ec8c8',
          'teal-light': '#b8e4e4',
          sage: '#a8c5a0',
          'sage-light': '#d4e8d0',
          orange: '#f0a868',
          'orange-light': '#fcd4a8',
          cream: '#fef9f0',
          navy: '#2a3d5c',
          'navy-light': '#3d5680',
        },
        surface: {
          primary: '#fef9f0',
          card: '#ffffff',
          elevated: '#ffffff',
          muted: '#f8f4ed',
        },
        text: {
          primary: '#2a3d5c',
          secondary: '#5a6b80',
          muted: '#9ca8b8',
        },
      },
      fontFamily: {
        display: ['"Quicksand"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'clay': '8px 8px 16px rgba(42, 61, 92, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.9)',
        'clay-sm': '4px 4px 8px rgba(42, 61, 92, 0.06), -2px -2px 6px rgba(255, 255, 255, 0.8)',
        'clay-lg': '12px 12px 24px rgba(42, 61, 92, 0.1), -6px -6px 16px rgba(255, 255, 255, 0.95)',
        'clay-inset': 'inset 2px 2px 4px rgba(42, 61, 92, 0.06), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
        'clay-button': '4px 4px 10px rgba(42, 61, 92, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(42, 61, 92, 0.05)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #fef9f0 0%, #f5d5d8 50%, #b8e4e4 100%)',
        'gradient-card': 'linear-gradient(145deg, #ffffff 0%, #fef9f0 100%)',
        'gradient-pink': 'linear-gradient(135deg, #f5d5d8 0%, #e8b4b8 100%)',
        'gradient-teal': 'linear-gradient(135deg, #b8e4e4 0%, #7ec8c8 100%)',
        'gradient-sage': 'linear-gradient(135deg, #d4e8d0 0%, #a8c5a0 100%)',
        'gradient-orange': 'linear-gradient(135deg, #fcd4a8 0%, #f0a868 100%)',
      },
    },
  },
  plugins: [],
};
