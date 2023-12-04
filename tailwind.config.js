/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    screens: {
      xs: "500px",
      "2sm": "670px",
      "2md": "990px",
      "2lg": "1080px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        // 'cc-': 'rgb(var(--color-) / <alpha-value>)',
        'cc-bg-primary': 'rgb(var(--cc-bg-primary) / <alpha-value>)',
        'cc-bg-secondary': 'rgb(var(--cc-bg-secondary) / <alpha-value>)',
        'cc-text-primary': 'rgb(var(--cc-text-primary) / <alpha-value>)',
        'cc-text-secondary': 'rgb(var(--cc-text-secondary) / <alpha-value>)',
        'cc-text-tertiary': 'rgb(var(--cc-text-tertiary) / <alpha-value>)',
        'cc-hover-primary': 'rgb(var(--cc-hover-primary) / <alpha-value>)',
        'cc-hover-secondary': 'rgb(var(--cc-hover-secondary) / <alpha-value>)',
        'cc-backdrop': 'rgb(var(--cc-backdrop) / <alpha-value>)',
        'cc-accent': 'rgb(var(--cc-accent) / <alpha-value>)',
        'cc-accent-inv': 'rgb(var(--cc-accent-inv) / <alpha-value>)',
        // 'th-background': 'rgb(var(--background) / <alpha-value>)',
        // 'th-background-secondary': 'rgb(var(--background-secondary) / <alpha-value>)',
        // 'th-background-search': 'rgb(var(--background-search) / <alpha-value>)',
        // 'th-hover': 'rgb(var(--hover) / <alpha-value>)',
        // 'th-hover-secondary': 'rgb(var(--hover-secondary) / <alpha-value>)',
        // 'th-primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
        // 'th-primary-light': 'rgb(var(--primary-light) / <alpha-value>)',
        // 'th-accent-dark': colors.sky[500], // Directly use Tailwind's color
        // 'th-accent-light': colors.sky[300], // Directly use Tailwind's color
        // "th-background": "rgb(var(--background)",
        // "th-background-secondary": "var(--background-secondary)",
        // "th-background-search": "var(--background-search)",
        // "th-backdrop": "var(--backdrop)",
        // "th-hover": "var(--hover)",
        // "th-hover-secondary": "var(--hover-secondary)",
        // "th-accent-dark": "var(--accent-dark)",
        // "th-accent-light": "var(--accent-light)",
        // "th-primary-dark": "var(--primary-dark)",
        // "th-primary-light": "var(--primary-light)",
      },
      boxShadow: {
        uniform: "0 0 10px 0",
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [],
  plugins: [
    function ({ addBase }) {
      const baseStyles = {
        ".fi": {
          "-ms-flex-align": "stretch",
          "-ms-flex-direction": "column",
          "-ms-flex-negative": 0,
          "-ms-flex-preferred-size": "auto",
          "-webkit-align-items": "stretch",
          "-webkit-box-align": "stretch",
          "-webkit-box-direction": "normal",
          "-webkit-box-orient": "vertical",
          "-webkit-flex-basis": "auto",
          "-webkit-flex-direction": "column",
          "-webkit-flex-shrink": 0,
          "align-items": "stretch",
          border: "0 solid black",
          "box-sizing": "border-box",
          display: [
            "-webkit-box",
            "-moz-box",
            "-ms-flexbox",
            "-webkit-flex",
            "flex",
          ],
          "flex-basis": "auto",
          "flex-direction": "column",
          "flex-shrink": 0,
          "margin-bottom": "0px",
          "margin-left": "0px",
          "margin-right": "0px",
          "margin-top": "0px",
          "min-height": "0px",
          "min-width": "0px",
          "padding-bottom": "0px",
          "padding-left": "0px",
          "padding-right": "0px",
          "padding-top": "0px",
          position: "relative",
          "z-index": 0,
        },
      };
      addBase(baseStyles);
    },
    function ({ addBase }) {
      const gridTemmplate = {
        ".grid-template-columns": {
          "grid-template-columns": "275px 600px 350px",
          "grid-template-areas": "header content sidebar",
          display: "grid",
        },
      };
      addBase(gridTemmplate);
    },
  ],
};
