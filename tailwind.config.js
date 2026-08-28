/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F3EEDC',
        surface: '#FAF8F1',
        ink: '#2B1B17',
        muted: '#74655D',
        dark: '#3A241D',
        primary: {
          DEFAULT: '#45B5BE',
          hover: '#159FC2',
        },
        gold: '#B49762',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '999px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(43, 27, 23, 0.06)',
      },
    },
  },
  plugins: [],
};
