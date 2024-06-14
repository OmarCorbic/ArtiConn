/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "faster-spin": "spin 0.5s linear infinite",
      },
    },
  },
  plugins: [],
};
