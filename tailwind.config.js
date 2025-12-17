/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#10b981", // emerald green (buttons, tags)
        dark: "#0b0f14",    // background overlay
        glass: "rgba(255, 255, 255, 0.10)",
        glassBorder: "rgba(255, 255, 255, 0.20)",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        glass: "16px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      lineHeight: {
        tight: "1.25",
        relaxed: "1.75",
      },
    },
  },
  plugins: [],
};
