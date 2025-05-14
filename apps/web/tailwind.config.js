// apps/web/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          background: "#F8F6F3",
          primary:    "#0732EF",
          accent1:    "#D9FB99",
          accent2:    "#517A06",
        },
        fontFamily: {
          heading: ["Familjen Grotesk", "sans-serif"],
          body:    ["Wix Madefor Text", "serif"],
        },
      },
    },
    plugins: [],
  }
  