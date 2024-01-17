/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      blur: {
        DEFAULT: "5px",
      },
      minWidth: {
        "screen-lg": "1024px",
      },
      fontFamily: {
        sans: ["Inter Regular", ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        "light-background": "#F5F5F5",
        "dark-background": "#212121",
        "light-card": "#FFFFFF",
        "dark-card": "#2C2C2C",
        "light-button": "bg-indigo-500",
        "dark-button": "#4DB6AC",
        "light-button-hover": "#319795",
        "dark-button-hover": "#319795",
      },
      boxShadow: {
        "light-card":
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        "dark-card":
          "0 4px 6px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        "brand-primary": "#4F46E5",
        "brand-secondary": "#4338CA",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) white",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white",
          },
          ".break-before": { "page-break-before": "always" },
          ".break-after": { "page-break-after": "always" },
          ".break-inside-avoid": { "page-break-inside": "avoid" },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
