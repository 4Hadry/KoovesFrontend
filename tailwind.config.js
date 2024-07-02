/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f42c37",
        secondary: "#f42c37",
        brandYellow: "#fdc62e",
        brandGreen: "#2dcc6f",
        brandBlue: "#1376f4",
        brandWhite: "#eeeeee",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      keyframes: {
        "loading-animation": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "up-and-down": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50%, -20%)" },
        },
        "skeleton-loading": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "loading-animation": "loading-animation 1.5s infinite",
        "up-and-down": "up-and-down 1.5s infinite",
        "skeleton-loading": "skeleton-loading 1.5s infinite",
      },
    },
  },
  plugins: [],
};
