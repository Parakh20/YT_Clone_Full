/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "yt-black": "#0f0f0f",
        "yt-darker": "#181818",
        "yt-gray": "#282828",
        "yt-light-gray": "#aaa",
        "yt-blue": "#3ea6ff",
        "yt-red": "#ff0000",
      },
    },
  },
  plugins: [],
};
