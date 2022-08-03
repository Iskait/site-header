module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          'montserrat': ['Montserrat Alternates', 'sans-serif'],
        },
        screens: {
          'lg': {'max': '1024px'}
        }
    },
  },
  plugins: [],
}