import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        newsprint: {
          bg: "#F7F6F3",
          ink: "#0D0D0D",
          muted: "#E0DFDA",
          accent: "#B31B1B",
        },
        neutral: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        body: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
      boxShadow: {
        "hard-hover": "4px 4px 0px 0px #111111",
      },
    },
  },
  plugins: [],
};
export default config;
