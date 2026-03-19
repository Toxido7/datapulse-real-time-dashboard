import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        soft: "0 18px 50px -26px rgba(8, 15, 30, 0.85)",
        panel: "0 28px 70px -32px rgba(2, 8, 23, 0.95)",
        glow: "0 0 0 1px rgba(96, 165, 250, 0.14), 0 0 32px rgba(37, 99, 235, 0.2)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(59,130,246,0.22), transparent 32%), radial-gradient(circle at top right, rgba(34,211,238,0.12), transparent 26%), radial-gradient(circle at 50% 120%, rgba(139,92,246,0.12), transparent 26%), linear-gradient(180deg, rgba(8,17,31,0.98), rgba(10,19,35,0.98))",
      },
    },
  },
  plugins: [],
};

export default config;
