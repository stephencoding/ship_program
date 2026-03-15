/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f3b6d', // Navy Blue from PRD
          light: '#2c5282',
          dark: '#1a365d',
        },
        secondary: {
          DEFAULT: '#1976d2', // Bright Blue from PRD
        },
        accent: {
          DEFAULT: '#12b312', // Green for vessels
        },
        background: '#f5f5f5', // Light beige/gray background
      }
    },
  },
  plugins: [],
}
