/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        caveat: ["Caveat", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "zen-gradient":
          "linear-gradient(135deg, #FEFCFF 0%, #F8F4FF 50%, #F5F0FF 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        zen: "24px",
      },
      colors: {
        // Mental health themed color palette
        zen: {
          lavender: "#C8A2C8",
          blue: "#B8D8F0",
          pink: "#F2C2C2",
          white: "#FEFCFF",
          gray: "#4A4458",
          light: "#F8F4FF",
          soft: "#F5F0FF",
        },
        // Original shadcn colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "zen-blue": "#B8D8F0",
        "zen-lavender": "#C8A2C8",
        "zen-pink": "#F2C2C2",
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        drift: {
          "0%": { transform: "translateX(0px) translateY(0px)" },
          "33%": { transform: "translateX(20px) translateY(-20px)" },
          "66%": { transform: "translateX(-10px) translateY(-30px)" },
          "100%": { transform: "translateX(0px) translateY(0px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        drift: "drift 20s ease-in-out infinite",
      },
      boxShadow: {
        zen: "0 20px 40px -12px rgba(200, 162, 200, 0.25)",
        "zen-hover": "0 25px 50px -12px rgba(200, 162, 200, 0.4)",
        "inner-zen": "inset 0 2px 4px 0 rgba(200, 162, 200, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
