/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rialo-blue': '#00F2FF',
        'rialo-blue-dark': '#00C4CC',
        'rialo-deep': '#050505',
        'rialo-surface': '#0A0A0A',
        'rialo-card': '#111111',
        'rialo-border': '#1a1a1a',
        'optimistic-green': '#00FF88',
        'pessimistic-blue': '#0066FF',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 242, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 242, 255, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}