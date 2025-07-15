/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          bg: '#17212b',
          secondary: '#242f3d',
          accent: '#2481cc',
          text: '#ffffff',
          hint: '#708499',
          button: '#2481cc',
        },
        gift: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
          premium: '#ff6b6b',
        }
      },
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gift-glow': 'gift-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gift-glow': {
          '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}