import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: {
          primary: {
            DEFAULT: "#3D62B2",
            dark: "#32549C",
          },
          secondary: {
            DEFAULT: "#D68B1A",
            dark: "#BD822A",
          },
          red: "#D90000",
        },
        background: {
          light: "#F2F4F7",
          DEFAULT: "#E1E4EB",
          dark: "#262630",
        },
        gray: {
          light: "#C2C5CC",
          DEFAULT: "#9AA5A6",
          dark: "#333333",
        },
        black: "#171717",
      },
      height: {
        dvh: "100dvh",
      },
      minHeight: {
        dvh: "100dvh",
      },
      transitionDuration: {
        250: "250ms",
      },
      fontFamily: {
        ubuntu: ["var(--font-ubuntu)"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
