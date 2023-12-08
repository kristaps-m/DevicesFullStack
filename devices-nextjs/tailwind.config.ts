import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "x01-theme-colors01-primary-colorp-100":
          "var(--x01-theme-colors01-primary-colorp-100)",
        "x01-theme-colors01-primary-colorp-300":
          "var(--x01-theme-colors01-primary-colorp-300)",
        "x01-theme-colors01-primary-colorp-500":
          "var(--x01-theme-colors01-primary-colorp-500)",
        "x01-theme-colors02-neutral-colorn-100":
          "var(--x01-theme-colors02-neutral-colorn-100)",
        "x01-theme-colors02-neutral-colorn-200":
          "var(--x01-theme-colors02-neutral-colorn-200)",
        "x01-theme-colors02-neutral-colorn-300":
          "var(--x01-theme-colors02-neutral-colorn-300)",
        "x01-theme-colors02-neutral-colorn-400":
          "var(--x01-theme-colors02-neutral-colorn-400)",
        "x01-theme-colors02-neutral-colorn-500":
          "var(--x01-theme-colors02-neutral-colorn-500)",
        "x01-theme-colors02-neutral-colorn-700":
          "var(--x01-theme-colors02-neutral-colorn-700)",
        "x01-theme-colors02-neutral-colorn-800":
          "var(--x01-theme-colors02-neutral-colorn-800)",
        "x01-theme-colors01-primary-colorp-soft":
          "var(--x01-theme-colors01-primary-colorp-soft)",
        "x02-semantic-colors01-dangerdanger-300":
          "var(--x02-semantic-colors01-dangerdanger-300)",
        "x02-semantic-colors01-online-300":
          "var(--x02-semantic-colors01-online-300)",
      },
    },
  },
  plugins: [],
};
export default config;
