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
          bg: '#0a0a0b',
          secondary: '#1a1a1d',
          accent: '#6b46c1',
          text: '#ffffff',
          hint: '#9ca3af',
          button: '#6b46c1',
        },
        case: {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          gradient: {
            from: '#8b5cf6',
            to: '#06b6d4',
          },
          dark: '#0f0f23',
          darker: '#0a0a0f',
          light: '#f8fafc',
          muted: '#64748b',
        },
        gift: {
          gold: '#fbbf24',
          silver: '#e5e7eb',
          bronze: '#f59e0b',
          premium: '#8b5cf6',
        }
      },
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gift-glow': 'gift-glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gift-glow': {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'case-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
        'case-gradient-reverse': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
        'case-radial': 'radial-gradient(circle at center, #8b5cf6 0%, #06b6d4 100%)',
      }
    },
  },
  plugins: [],
}