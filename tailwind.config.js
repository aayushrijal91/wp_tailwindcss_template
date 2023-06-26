/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{scss,js,php}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#C62026',
        'dark': '#040505',
        'white': '#ffffff',
        'black': '#000000',
        'grey': '#555656',
        'light-grey': '#f5f5f5'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        baukasten: ['Baukasten', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

