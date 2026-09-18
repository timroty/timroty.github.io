import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        link: "rgb(var(--link) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(var(--foreground))",
            maxWidth: "none",
            "h1, h2, h3, h4": {
              color: "rgb(var(--foreground))",
              letterSpacing: "-0.025em",
            },
            strong: {
              color: "rgb(var(--foreground))",
            },
            a: {
              color: "rgb(var(--link))",
              textDecorationColor: "rgb(var(--link) / 0.45)",
              textUnderlineOffset: "0.2em",
            },
            code: {
              color: "rgb(var(--foreground))",
            },
            blockquote: {
              color: "rgb(var(--foreground))",
              borderLeftColor: "rgb(var(--border))",
            },
            hr: {
              borderColor: "rgb(var(--border))",
            },
            "ol > li::marker, ul > li::marker": {
              color: "rgb(var(--muted-foreground))",
            },
            pre: {
              color: "rgb(var(--foreground))",
              backgroundColor: "rgb(var(--muted))",
            },
            table: {
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            th: {
              borderBottom: "2px solid rgb(var(--border))",
              padding: "0.75em",
              textAlign: "left",
              fontWeight: "600",
            },
            td: {
              borderBottom: "1px solid rgb(var(--border))",
              padding: "0.75em",
            },
            "tr:last-child td": {
              borderBottom: "none",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
