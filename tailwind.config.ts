import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Font Family
      fontFamily: {
        sans: [
          'Instrument Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },

      colors: {
        // TripGlide Monochrome Base
        white: "#FFFFFF",
        black: "#000000",

        // Backgrounds
        "bg-page": "#F5F6F7",
        "bg-card": "#FFFFFF",
        "bg-input": "#F5F6F7",
        "bg-input-focus": "#FFFFFF",

        // Text hierarchy
        "text-primary": "#212529",
        "text-secondary": "#6C757D",
        "text-tertiary": "#ADB5BD",
        "text-on-dark": "#FFFFFF",

        // Borders
        "border-light": "#DEE2E6",
        "border-medium": "#CED4DA",
        "border-dark": "#212529",

        // Button colors
        "btn-primary-bg": "#212529",
        "btn-primary-hover": "#343A40",
        "btn-primary-text": "#FFFFFF",

        // Status colors (minimal use, badges only)
        "status-success": "#10B981",
        "status-warning": "#F97316",
        "status-info": "#4A90E2",
        "status-error": "#EF4444",
      },

      // Spacing (8px base - TripGlide)
      spacing: {
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        6: "48px",
        8: "64px",
        12: "96px",
      },

      // Font sizes (TripGlide)
      fontSize: {
        tiny: "12px",
        small: "14px",
        base: "16px",
        large: "17px",
        h4: "18px",
        h3: "22px",
        h2: "28px",
        h1: "32px",
        display: "48px",
      },

      // Font weights
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // Line heights
      lineHeight: {
        tight: "1.2",
        normal: "1.5",
        relaxed: "1.75",
      },

      // Border radius (TripGlide)
      borderRadius: {
        none: "0px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        pill: "100px",
        full: "9999px",
      },

      // Box shadows (TripGlide - physical depth)
      boxShadow: {
        none: "none",
        sm: "0 1px 2px rgba(0, 0, 0, 0.03)",
        card: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)",
        button: "0 4px 12px rgba(33, 37, 41, 0.2), 0 2px 4px rgba(33, 37, 41, 0.1)",
        "button-hover": "0 6px 20px rgba(33, 37, 41, 0.25), 0 4px 8px rgba(33, 37, 41, 0.15)",
        "button-active": "0 2px 8px rgba(33, 37, 41, 0.2)",
        icon: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "icon-hover": "0 4px 12px rgba(0, 0, 0, 0.15)",
        nav: "0 8px 32px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)",
        focus: "0 0 0 4px rgba(33, 37, 41, 0.1)",
      },

      // Letter spacing
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
      },

      // Background images (TripGlide overlays)
      backgroundImage: {
        "overlay-medium": "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
        "overlay-strong": "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
