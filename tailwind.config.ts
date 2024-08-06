/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Light: {
          ColorPrimary: "#6C63FF",
          TextColor: "#9ca6ff",
          Place: "#C3C1E5",
          BackgroundColor: "#F7F7F7",
        },
        Dark: {
          ColorPrimary: "#F7F7F7",
          TextColor: "#F7F7F7",
          Place: "#666",
          BackgroundColor: "#252525",
        },
      },
      fontFamily: {
        "noto-sans": ['"Noto Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
