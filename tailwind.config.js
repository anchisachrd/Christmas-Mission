/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
        cinzel: ['"Cinzel"', "serif"],
        goudy: ['"Goudy Bookletter 1911"', "serif"],
      },
    },
  },
  plugins: [],
};
