/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        paper: '#FFFFFF',
        charcoal: '#111111',
        mist: '#F5F5F5',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
      },
    },
  },
  plugins: [],
}

