/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#161f2e",
        offBackground: "#1e293b",
        off2Background: "#28354a",
        button: "#246396",
        offButton: "#1b507a",
        primary: "#1D4ED8",
        secondary: "#9333EA",
        accent: "#F59E0B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
