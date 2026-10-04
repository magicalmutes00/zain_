/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Original brand theme: deep navy surfaces + orange CTAs, taken from the logo.
        // Keep using tokens, never raw hex.
        primary: "#0A2647",
        primaryDark: "#051525",
        secondary: "#FF6B35",
        secondaryLight: "#FF8F5E",
        brand: {
          DEFAULT: "#FF6B35",
          soft: "#FF8F5E",
          // Ember: darkened brand orange for WCAG AA small-text contrast on white.
          // Use text-ember for <18px / non-bold text; keep brand for fills, large display type, dark-bg accents.
          ember: "#C2410C",
          ink: "#7A2E0A",
        },
        navy: {
          DEFAULT: "#0A2647",
          deep: "#144272",
          abyss: "#051525",
        },
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
        display: ["Playfair Display", "Georgia", "serif"],
        arabic: ["Noto Sans Arabic", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(10, 38, 71, 0.06)",
        lift: "0 16px 32px rgba(10, 38, 71, 0.14)",
        glow: "0 8px 24px rgba(255, 107, 53, 0.35)",
      },
      borderRadius: {
        card: "1rem",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
