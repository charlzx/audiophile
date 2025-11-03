import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  safelist: ["xl:list-item"],
  theme: {
    screens: {
      xs: "23.4375rem", // 375px
      sm: "30rem", // 480px
      md: "40rem", // 640px
      lg: "48rem", // 768px
      xl: "64rem", // 1024px
      "2xl": "80rem", // 1280px
      "3xl": "90rem", // 1440px
    },
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      neutral: {
        100: "#FFFFFF",
        300: "#FAFAFA",
        400: "#F1F1F1",
        600: "#4C4C4C",
        800: "#101010",
        900: "#000000",
      },
      orange: {
        light: "#FBAF85",
        DEFAULT: "#D87D4A",
      },
      'form-border': '#CFCFCF',
      'form-error': '#CD2C2C',
    },
    fontSize: {
      xs: [
        "0.8125rem", // 13px
        {
          lineHeight: "1.5625rem", // 25px
          letterSpacing: "0.05806rem", // 0.93px
          fontWeight: 700, // Bold
        },
      ],
      sm: [
        "0.875rem", // 14px
        {
          lineHeight: "1.1875rem", // 19px
          letterSpacing: "0.625rem", // 10px
          fontWeight: 400, // Regular
        },
      ],
      base: [
        "0.9375rem", // 15px
        {
          lineHeight: "1.5625rem", // 25px
          letterSpacing: undefined,
          fontWeight: 500, // Medium
        },
      ],
      lg: [
        "1.125rem", // 18px
        {
          lineHeight: "1.5rem", // 24px
          letterSpacing: "0.08038rem", // 1.29px
          fontWeight: 700, // Bold
        },
      ],
      xl: [
        "1.5rem", // 24px
        {
          lineHeight: "2.0625rem", // 33px
          letterSpacing: "0.10713rem", // 1.71px
          fontWeight: 700, // Bold
        },
      ],
      "2xl": [
        "1.75rem", // 28px
        {
          lineHeight: "2.375rem", // 38px
          letterSpacing: "0.125rem", // 2px
          fontWeight: 700, // Bold
        },
      ],
      "3xl": [
        "2rem", // 32px
        {
          lineHeight: "2.25rem", // 36px
          letterSpacing: "0.07144rem", // 1.14px
          fontWeight: 700, // Bold
        },
      ],
      "4xl": [
        "2.5rem", // 40px
        {
          lineHeight: "2.75rem", // 44px
          letterSpacing: "0.08931rem", // 1.43px
          fontWeight: 700, // Bold
        },
      ],
      "5xl": [
        "3.5rem", // 56px
        {
          lineHeight: "3.625rem", // 58px
          letterSpacing: "0.125rem", // 2px
          fontWeight: 700, // Bold
        },
      ],
    },
    extend: {
      backgroundImage: {
        "zx9-speaker-pattern":
          'url("/assets/home/desktop/pattern-circles.svg")',
      },
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        "navigation-height": "var(--navigation-height)",
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".full-bleed": {
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          width: "100vw",
        },
        ".no-bleed": {
          position: "unset",
          left: "unset",
          right: "unset",
          marginLeft: "unset",
          marginRight: "unset",
          width: "unset",
        },
        ".slim-scrollbar": {
          scrollbarWidth: "thin",
          scrollbarColor: `${theme("colors.neutral.900")}D9 ${theme(
            "colors.neutral.100",
          )}`,
          "&::-webkit-scrollbar": {
            width: "0.75rem",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme("colors.neutral.100"),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `${theme("colors.neutral.900")}D9`,
            borderRadius: theme("borderRadius.lg"),

            "&:hover": {
              backgroundColor: `${theme("colors.neutral.900")}B3`,
            },
          },
        },
      });
    }),
  ],
};
