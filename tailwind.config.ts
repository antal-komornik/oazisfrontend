/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // darkMode: ['class', '[data-theme="forest"]'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          ...require("daisyui/src/theming/themes")["light"],
          maintext: "black",
          secondary: "teal",
        },
        dark:{
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          ...require("daisyui/src/theming/themes")["dark"],
          maintext: "white",
          secondary: "teal",
        }
      },
    ],    
    // darkTheme: "forest",
    base: true,
    styled: true,
    utils: true,
  },
}