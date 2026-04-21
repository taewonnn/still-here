/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        surface: '#1a1a1a',
        'surface-2': '#242424',
        primary: '#a8d5a2',
        'primary-dim': '#6aab63',
        danger: '#e07070',
        'text-primary': '#f0f0f0',
        'text-secondary': '#9a9a9a',
        'text-muted': '#5a5a5a',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
