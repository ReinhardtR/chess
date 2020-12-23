module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#3952fe",
        secondary: "#191a45",
        tertiary: "#fe143e",
        neutral: "#d1d1db",
      },
      backgroundImage: (theme) => ({
        "primary-gradient":
          "linear-gradient(to bottom right, #6d88fe, #4d66fe)",
      }),
      fontFamily: {
        main: ["Roboto"],
      },
    },
  },
  variants: {
    extend: {
      scale: ["hover", "group-hover"],
      translate: ["hover", "group-hover"],
      backgroundColor: ["hover", "group-hover", "checked"],
      borderColor: ["checked"],
    },
  },
  plugins: [],
};
