/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#46B95E",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#EEF8F0",
              foreground: "#182019",
            },
            focus: "#182019",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#46B95E",
              foreground: "#ffffff",
            },
            focus: "#182019",
          },
        },
      },
    }),
  ],
};
