/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enables class-based dark mode toggle
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Product Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      },
      colors: {
        primary: 'white', // example custom color
      },
    },
  },
  plugins: [],
};
