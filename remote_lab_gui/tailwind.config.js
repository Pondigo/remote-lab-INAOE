/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        inaoe: "#271970",
        inaoec1: "#6F52FF",
        inaoe_comp2: "#5636F5",
        inaoe_comp3: "#5737FA",
        inaoe_comp4: "#F5DE36",
        signalA_border: "#466CE8",
        signalA_fill: "#466CE84D",
        signalB_border: "#452BC4",
        signalB_fill: "#452BC44D",
        salida_border: "#639E62",
        salida_fill: "#639E624D",
      },
    },
  },
};
