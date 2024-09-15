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
        whiteBg: "#FFFFFF",
        lightGray: "#F3F4F6",
        gray200: "#E5E7EB",
        gray300: "#D1D5DB",
        gray500: "#6B7280",
        gray900: "#111827",
        darkFont: "#1F2937",
        lightFont: "#6B7280",
      },
      fontFamily: {
        greycliff: "greycliff-cf, sans-serif"
      },
      fontWeight: {
        '700': "700",
      },
    },
  },
  plugins: [],
};
