/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DevTime primary blue (from Figma)
        primary: {
          DEFAULT: '#3D5AF1',
          50:  '#EEF1FE',
          100: '#D5DCFC',
          200: '#ABB9FA',
          300: '#8096F7',
          400: '#5673F4',
          500: '#3D5AF1',
          600: '#1A3CE8',
          700: '#142EB5',
          800: '#0F2182',
          900: '#0A144F',
        },
      },
      fontFamily: {
        // Digital clock display font — import this in index.css
        mono: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
