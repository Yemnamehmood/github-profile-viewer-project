/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Here you can add custom styles like colors, spacing, etc.
      colors: {
        customGray: '#1a1a1a',
        customBlack: '#0d0d0d',
        customWhite: '#f5f5f5',
      },
      backgroundImage: {
        'hero-pattern': "url('/public/background.jpg')", // Add background image path
      },
    },
  },
  plugins: [],
};
