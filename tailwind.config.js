const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,tsx,ts}"
  ],
  theme: {
    extend: {
      colors: {
      purple:{
        300:'#e0e7fe',
        500: "#3e38a7",
        600:'#5046e4'
      }
      },
    },
  },
  plugins: [],
};