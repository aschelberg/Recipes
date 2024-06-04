/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'recipe-primary': '#000000',
        'recipe-secondary': '#FFFFFF',
      },
    },
    fontFamily: {
      Inter: ['inter, sans-serif'],
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
