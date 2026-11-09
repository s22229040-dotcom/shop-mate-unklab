/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unklabBlue: '#003366',
        unklabGold: '#F59E0B',
      }
    },
  },
  plugins: [],
}
