/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fg: "#111111",
        bg: "#F4F4F6",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        hand: ["Caveat", "cursive"]
      }
    },
  },
  plugins: [],
}
