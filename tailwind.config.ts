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
          secondary: "#D68B1A",
        },
        background: {
          light: "#F2F4F7",
          DEFAULT: "#E1E4EB",
          dark: "#262630",
        },
        grey: {
          light: "#C2C5CC",
          DEFAULT: "#7F8C8D",
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
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
export default config;
