/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
        dark: {
          DEFAULT: '#0A0118',
          light: '#170229',
          lighter: '#1E0836',
          card: 'rgba(30, 8, 54, 0.7)'
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
