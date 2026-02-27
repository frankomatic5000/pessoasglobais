import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pg: {
          red:          '#E8202A',
          'red-dark':   '#C41820',
          'red-light':  '#FF4D55',
          navy:         '#1E3560',
          'navy-dark':  '#152545',
          'navy-light': '#2D4F8A',
          ink:          '#0F0F0F',
          paper:        '#FAFAFA',
          surface:      '#FFFFFF',
          muted:        '#6B6B6B',
          border:       '#E5E5E5',
          tag:          '#F2F2F2',
          highlight:    '#FFF2F2',
        }
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
