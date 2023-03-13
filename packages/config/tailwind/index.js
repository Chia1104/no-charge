/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c9ada7",
        secondary: "#f2e9e4",
        "primary-dark": "#3d405b",
        "secondary-dark": "#81b29a",
        light: "#f4f1de",
        dark: "#293241",
      },
    },
  },
  plugins: [],
};

module.exports = config;
