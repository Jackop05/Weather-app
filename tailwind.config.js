/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "new-green": "#00feba",
        "new-blue": "#5b548a",
      }
    },
  },
  plugins: [],
}