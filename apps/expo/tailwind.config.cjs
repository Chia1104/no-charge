/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@chia/tailwind-config")],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
};
