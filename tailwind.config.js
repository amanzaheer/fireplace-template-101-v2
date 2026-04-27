/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01306E",
        secondary: "#01306E",
        /** Main body / heading text (not link red, not brand blue) */
        ink: "#212020",
        
      },
      fontFamily: {
        Poppins:["Poppins","sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", ...defaultTheme.fontFamily.sans],
        barlow: ["var(--font-barlow)", "Barlow", "sans-serif"],
        sans: ["Helvetica", "Arial", "sans-serif"],
        Rubik:["Rubik","sans-serif"],
      },
      gridTemplateColumns: {
        banner: "1.5fr 1fr 0.6fr",
        services: "1fr 1.4fr",
        services2: "1fr 1fr",
        testimonial: "0.4fr 2fr",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

