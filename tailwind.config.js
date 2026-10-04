/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Crimson + zinc theme (v2). Token names are legacy; values define the theme:
        // ink surfaces (zinc) + signal red CTAs. Keep using tokens, never raw hex.
        primary: "#18181B",
        primaryDark: "#09090B",
        secondary: "#DC2626",
        secondaryLight: "#F87171",
        brand: {
          DEFAULT: "#DC2626",
          soft: "#F87171",
          // Ember: darkened signal red for WCAG AA small-text contrast on white.
          // Use text-ember for <18px / non-bold text; keep brand for fills, large display type, dark-bg accents.
          ember: "#B91C1C",
          ink: "#7F1D1D",
        },
        navy: {
          DEFAULT: "#18181B",
          deep: "#27272A",
          abyss: "#09090B",
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
        glow: "0 8px 24px rgba(220, 38, 38, 0.35)",
      },
      borderRadius: {
        card: "1rem",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
