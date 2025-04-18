module.exports = {
  content: [
    "./client/pages/**/*.{js,jsx}",
    "./client/components/**/*.{js,jsx}",
    "./client/contexts/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
        mainGrey: '#2C2C2C',
        accentGrey: '#E0E0E0',
        textHex: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
