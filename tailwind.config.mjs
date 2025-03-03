/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'ghost-left': {
          '0%': {
            transform: 'translateY(0.25rem) translateX(-0.25rem)',
            opacity: '0.75',
          },
          '16%': {
            transform: 'translateY(0.5rem) translateX(-0.5rem)',
            opacity: '0.5',
          },
          '33%': {
            transform: 'translateY(0.75rem) translateX(-0.75rem)',
            opacity: '0.25',
          },
          '50%': {
            transform: 'translateY(0.5rem) translateX(-0.5rem)',
            opacity: '0.5',
          },
          '66%': {
            transform: 'translateY(0.25rem) translateX(-0.25rem)',
            opacity: '0.75',
          },
          '100%': {
            transform: 'translateY(0rem) translateX(-0rem)',
            opacity: '1.0',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-10px) rotate(-5deg)',
          },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px) rotate(5deg)' },
        },
      },
      colors: {
        'primary-bg': '#FFFFFF',
        'primary-text': '#FFFFFF',
        'light-bg': '#B2A384',
        'brown-lite': '#D3C0AF',
        'brown-dark': '#937F77',
      },
      fontFamily: {
        helvetica: ['Helvetica', 'sans-serif'],
        'tango-sans': ['TangoSans', 'sans'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ghost-left': 'ghost-left 10s ease-in-out infinite',
        shake: 'shake 4s ease-in-out infinite',
      },
    },
  },
};
