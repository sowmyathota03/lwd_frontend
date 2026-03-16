/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enables class-based dark mode toggle
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'white', // example custom color
      },
    },
  },
  plugins: [],
};
