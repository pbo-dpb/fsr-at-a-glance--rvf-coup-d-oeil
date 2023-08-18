module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blush': {
          DEFAULT: '#C95C7A',
        },
        'dodger-blue': {
          DEFAULT: '#369EFF',
          50: '#EEF7FF',
          100: '#D9EDFF',
          200: '#B0D9FF',
          300: '#88C5FF',
          400: '#5FB2FF',
          500: '#369EFF',
          600: '#0083FD',
          700: '#0066C5',
          800: '#00498D',
          900: '#002C55',
          950: '#001D39'
        },
      }
    },

  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
