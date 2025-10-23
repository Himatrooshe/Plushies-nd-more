/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/routes/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'caveat-brush': ['Caveat Brush', 'cursive'],
      },
      colors: {
        'plush-pink': '#ff7380',
        'plush-red': '#c0424e',
        'plush-light-pink': '#ff99a2',
        'plush-bg-pink': '#ffdddd',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
