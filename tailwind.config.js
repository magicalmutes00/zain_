/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0A2647",
        primaryDark: "#051525",
        secondary: "#FF6B35",
        secondaryLight: "#FF8F5E",
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#0A2647",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#051525",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        arabic: ["Noto Sans Arabic", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};