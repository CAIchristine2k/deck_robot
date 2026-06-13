/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0B0B14',
        'space-blue': '#1A1B3A',
        'cosmic-purple': '#2D1B69',
        'stellar-blue': '#4A90E2',
        'neon-blue': '#00D9FF',
        'star-white': '#F8FAFC',
        // Semantic colors
        'success': '#10B981',
        'success-light': '#34D399',
        'warning': '#F59E0B',
        'warning-light': '#FBBF24',
        'error': '#EF4444',
        'error-light': '#F87171',
        'info': '#3B82F6',
        'info-light': '#60A5FA',
        // Enhanced grays
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-400': '#9CA3AF',
        'gray-500': '#6B7280',
        'gray-600': '#4B5563',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00D9FF, 0 0 10px #00D9FF, 0 0 15px #00D9FF' },
          '100%': { boxShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0px)' },
          '100%': { transform: 'translateY(-100vh) translateX(100px)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
} 