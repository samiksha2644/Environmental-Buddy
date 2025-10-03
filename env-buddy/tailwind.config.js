/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          green: '#2e7d32',
          blue: '#0277bd',
        },
      },
    },
  },
  plugins: [],
}



