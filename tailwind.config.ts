import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          dark: "#2f3136",
          darker: "#202225",
          main: "#36393f",
          text: "#dcddde",
          textMuted: "#72767d",
          accent: "#5865f2",
        },
      },
    },
  },
  plugins: [],
};
export default config;

