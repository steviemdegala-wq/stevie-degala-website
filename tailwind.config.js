/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#0A0A0A',
        'bg-secondary': '#111111',
        'bg-tertiary':  '#1A1A1A',
        'bg-elevated':  '#2E2E2E',
        'text-primary': '#F8F8F8',
        'text-secondary':'#E8E8E8',
        'text-muted':   '#C4C4C4',
        'text-faint':   '#888888',
        'border-color': '#2E2E2E',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


