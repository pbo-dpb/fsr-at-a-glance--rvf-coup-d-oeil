module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mulberry': {
          DEFAULT: '#C85C7A',
          50: '#F6E5EA',
          100: '#F1D6DE',
          200: '#E7B8C5',
          300: '#DD99AC',
          400: '#D27B93',
          500: '#C85C7A',
          600: '#B03C5C',
          700: '#862D46',
          800: '#5C1F30',
          900: '#33111A',
          950: '#1E0A0F'
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
