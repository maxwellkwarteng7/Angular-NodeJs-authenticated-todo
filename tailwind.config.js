/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005db4',
        blueBackground: '#1e3578 ',
        violetBackground: '#481862',
      }
    },
  },
  plugins: [],
}

