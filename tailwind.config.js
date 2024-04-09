/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        font1: ["YourCustomFont1", "sans"],
        font2: ["YourCustomFont2", "sans"],
        font3: ["YourCustomFont3", "sans"],
      },
      fontSize: {
        size14: "14px",
        size18: "18px",
        size22: "22px",
      },
      colors: {
        first: "#00DABC",
        second: "#00BCB6",
        thirty: "#009DA8",
        fourth: "#0D8093",
        fifth: "#296377",
        main: "#2F4858",
        text: "#ffffff",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ".base-btn": {
          padding: theme("spacing.2") + " " + theme("spacing.4"),
          borderRadius: theme("borderRadius.full"),
          borderWidth: "1px",
          borderColor: theme("colors.white"),
          color: theme("colors.white"),
          backgroundColor: theme("colors.first"),
          transition: "background-color 0.3s, color 0.3s",
          outline: "none",
          fontWeight: "bold",
          "&:hover, &:focus": {
            backgroundColor: theme("colors.white"),
            color: theme("colors.second"),
            borderColor: theme("colors.second"),
          },
        },
      });
    },
  ],
};
