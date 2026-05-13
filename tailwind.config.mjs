/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial
        ink:    '#1a1d23',
        'ink-2':'#3a4150',
        'ink-3':'#6b7280',
        'ink-4':'#9aa3b2',
        line:   'rgba(20, 24, 32, 0.10)',
        soft:   '#f6f7f8',
        cream:  '#fafaf8',

        // Brand accents (byggkon.no icon palette)
        green:  '#1f8a3a',
        red:    '#c8102e',
        yellow: '#f5b400',
        blue:   '#0a6cf0',
        purple: '#7a3fc8',
        orange: '#ff6b35',

        // Agent slots (aliases)
        loki:   '#c8102e',
        nova:   '#f5b400',
        hilde:  '#0a6cf0',
        tt:     '#7a3fc8',
        fx:     '#ff6b35',
        ki:     '#1f8a3a'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      maxWidth: {
        wrap: '1240px'
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter:  '-0.02em'
      }
    }
  },
  plugins: []
};
