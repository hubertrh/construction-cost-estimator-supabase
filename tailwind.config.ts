import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
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
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
export default config;
