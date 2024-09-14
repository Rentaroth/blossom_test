/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary100: "#EEE3FF",
        primary600: "#8054C7",
        primary700: "#5A3696",
        secondary600: "#63D838",
      },
    },
  },
  plugins: [],
};
