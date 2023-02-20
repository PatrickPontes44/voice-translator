/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js, ts,jsx,tsx}"],
  content: ['./src/**/*.{html,js}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
