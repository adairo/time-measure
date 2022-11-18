/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "1.875rem",
    },

    extend: {
      fontWeight: {
        regular: "400",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
