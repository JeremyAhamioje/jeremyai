/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        titanium: '#8A8F99',
        orange: {
          surgical: '#FF4D00',
          dim: '#CC3D00',
        },
        arch: {
          white: '#F0EDE8',
          grey: '#1A1A1E',
          mid: '#2A2A2E',
          light: '#3A3A3E',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Instrument Sans', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.3em',
        wide: '0.15em',
      },
      animation: {
        'fade-up': 'fadeUp 1s ease forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'line-expand': 'lineExpand 1.5s ease forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineExpand: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
