/** @type {import('tailwindcss').Config} */

// const defaultTheme = require("tailwindcss/defaultTheme");
// const colors = require("tailwindcss/colors");
// const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    screens: {
      mobile: { max: "499px", min: "0px" },
      // 'mobile': '1px',
      xs: "500px",
      sm: "600px",
      "2sm": "688px",
      md: "988px",
      lg: "1024px",
      xl: "1078px",
      "2xl": "1265px",
      "3xl": "1385px",
      // ...defaultTheme.screens,
    },

    extend: {
      fontSize: {
        base: "15px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        disco: {
          "0%": { transform: "translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateY(-50%) rotate(360deg)" },
        },
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        endless: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-245px)" },
        },
      },
      animation: {
        endless: "endless 20s linear infinite",

        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        disco: "disco 1.5s linear infinite",
        "spin-forward": "spin 2s linear infinite",
      },
      colors: {
        "color-bg": "rgb(var(--color-bg) / <alpha-value>)",
        "color-bg-2": "rgb(var(--color-bg-2) / <alpha-value>)",
        "color-bg-3": "rgb(var(--color-bg-3) / <alpha-value>)",
        "color-text-main": "rgb(var(--color-text-main) / <alpha-value>)",
        "color-text-dimmed": "rgb(var(--color-text-dimmed) / <alpha-value>)",
        "color-border": "rgb(var(--color-border) / <alpha-value>)",
        "color-dark": "rgb(var(--color-dark) / <alpha-value>)",
        "color-backdrop": "rgb(var(--color-backdrop) / <alpha-value>)",
        "color-blue": "rgb(var(--color-blue) / <alpha-value>)",
        "color-green": "rgb(var(--color-green) / <alpha-value>)",
        "color-red": "rgb(var(--color-red) / <alpha-value>)",

        "color-accent": "rgb(var(--color-accent) / <alpha-value>)",
        "color-accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
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
