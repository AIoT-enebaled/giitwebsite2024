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
      animation: {
        'gradient': 'gradient 12s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0) translateZ(0)',
          },
          '50%': {
            transform: 'translateY(-15px) translateZ(0)',
          },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
