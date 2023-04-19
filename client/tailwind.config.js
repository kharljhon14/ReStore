/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A2A40',
        secondary: '#F5F5F5',
        tertiary: '#444444',
        accent: '#B20000',
        neutral: '#FCF5E5',
      },
    },
  },
  plugins: [],
};
