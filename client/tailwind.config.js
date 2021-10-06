module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./src/components/*.{js,jsx}", "./src/pages/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FCF9F0",
          dark: "#B2AC87",
          text: "#41493B",
        },
        secondary: {
          text: "#F5FBF0",
        },
      },
      fontFamily: {
        rubik: "Rubik",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
