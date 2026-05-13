/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#0e1116',
        'ink-2': '#3a4150',
        'ink-3': '#6b7280',
        'ink-4': '#9aa3b2',
        line:    'rgba(10, 14, 22, 0.08)',
        soft:    '#f7f8fa',
        loki:    '#c8102e',
        nova:    '#f5b400',
        hilde:   '#0a6cf0',
        tt:      '#7a3fc8',
        fx:      '#ff6b35',
        ki:      '#1f8a3a',
        yellow:  '#f5b400'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        wrap: '1240px'
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.1) both',
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite'
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'none' } },
        pulseDot: { '0%, 100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.55', transform: 'scale(1.25)' } }
      }
    }
  },
  plugins: []
};
