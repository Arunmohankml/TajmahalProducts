import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hmc: {
          navy: "#0F2C59",
          "navy-dark": "#0A1C38",
          "navy-light": "#18417E",
          maroon: "#0F2C59",
          "maroon-dark": "#0A1C38",
          "maroon-light": "#18417E",
          dark: "#1C1C1C",
          subdued: "#767676",
          border: "#EBEBEB",
          sand: "#F8F9FA",
          cream: "#EDF2F7",
          gold: "#C6A25E",
        },
        gold: {
          DEFAULT: "#C6A25E",
          soft: "#E8D39D",
          dark: "#9E7E3C",
        },
      },
      fontFamily: {
        sans: ["'Century Gothic'", "'Century Gothic Paneuropean'", "CenturyGothic", "AppleGothic", "sans-serif"],
        display: ["'Century Gothic'", "'Century Gothic Paneuropean'", "CenturyGothic", "AppleGothic", "sans-serif"],
        serif: ["'Century Gothic'", "'Century Gothic Paneuropean'", "CenturyGothic", "AppleGothic", "sans-serif"],
        script: ["'Century Gothic'", "'Century Gothic Paneuropean'", "CenturyGothic", "AppleGothic", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
