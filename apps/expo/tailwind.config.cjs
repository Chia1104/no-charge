/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@nc/tailwind-config")],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
};
