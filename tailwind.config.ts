import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // GlobalUtils Brand Colors
        primary: {
          DEFAULT: "#3B82F6", // Modern Blue
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#8B5CF6", // Purple Accent
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#10B981", // Green Accent
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF",
        foreground: "#0F172A",
        card: {
          DEFAULT: "#F8FAFC",
          foreground: "#0F172A",
        },
        "popover-foreground": "#0F172A",
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        "muted-foreground": "#64748B",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#3B82F6",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
