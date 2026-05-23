import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono','ui-monospace','monospace'],
        display: ['Inter', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        tx: { 1:'var(--tx-1)', 2:'var(--tx-2)', 3:'var(--tx-3)', 4:'var(--tx-4)' },
        ac: { DEFAULT:'var(--ac)', hover:'var(--ac-hover)', subtle:'var(--ac-subtle)', border:'var(--ac-border)', text:'var(--ac-text)' },
        bg: { DEFAULT:'var(--bg)', subtle:'var(--bg-subtle)' },
        bdr: { DEFAULT:'var(--border)', med:'var(--border-med)' },
        sem: { green:'var(--green)', red:'var(--red)', orange:'var(--orange)' },
      },
      borderRadius: {
        sm:'var(--r-sm)', md:'var(--r-md)', lg:'var(--r-lg)',
        xl:'var(--r-xl)', '2xl':'var(--r-2xl)',
      },
      boxShadow: {
        xs:'var(--shadow-xs)', sm:'var(--shadow-sm)',
        md:'var(--shadow-md)', lg:'var(--shadow-lg)',
      },
      transitionDuration: { DEFAULT: '150ms' },
    },
  },
  plugins: [],
}
export default config
