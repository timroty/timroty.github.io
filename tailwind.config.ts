import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        link: "rgb(var(--link) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;

export default config;
