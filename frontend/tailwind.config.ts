import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        // Brand colors
        pink: {
          DEFAULT: "hsl(var(--pink))",
          50: "#fff1f6",
          100: "#ffe2ed",
          200: "#ffc6db",
          300: "#ff99bc",
          400: "#ff5c96",
          500: "#ff006e",
          600: "#e50057",
          700: "#c00047",
          800: "#a1003c",
          900: "#850334",
          950: "#4f001c",
        },
        orange: {
          DEFAULT: "hsl(var(--orange))",
          50: "#fff5ed",
          100: "#ffe9d5",
          200: "#ffcfab",
          300: "#ffad75",
          400: "#fb8138",
          500: "#fb5607",
          600: "#e13c04",
          700: "#bb2a06",
          800: "#97210c",
          900: "#7c1d0c",
          950: "#430c04",
        },
        yellow: {
          DEFAULT: "hsl(var(--yellow))",
          50: "#fffbeb",
          100: "#fff4c6",
          200: "#ffea85",
          300: "#ffdb4a",
          400: "#ffce1f",
          500: "#ffbe0b",
          600: "#e29c00",
          700: "#bb7800",
          800: "#985d08",
          900: "#7c4c0d",
          950: "#432805",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
          50: "#f6f3ff",
          100: "#ede9fe",
          200: "#dcd2fd",
          300: "#c2aefa",
          400: "#a37ef6",
          500: "#8338ec",
          600: "#6c20d4",
          700: "#5a16b4",
          800: "#491593",
          900: "#3d1478",
          950: "#240a4a",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8dc2ff",
          400: "#5aa0ff",
          500: "#3a86ff",
          600: "#1e63ff",
          700: "#1a4eeb",
          800: "#1c3fd0",
          900: "#1c39a7",
          950: "#172667",
        },
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
      fontFamily: {
        crimson: ["var(--font-crimson-text)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
