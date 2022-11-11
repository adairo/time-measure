/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.25rem",
    },
    fontWeight: {
      regular: "400",
      semibold: "600",
      bold: "700",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
