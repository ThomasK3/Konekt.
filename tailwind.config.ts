import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        // Brand Colors (The Warm 4)
        coral: '#E66467',
        orange: '#F29639',
        darkblue: '#315771',
        teal: '#409F9C',
        
        // Semantic Aliases
        primary: '#E66467', 
        secondary: '#F29639',
        
        // Surfaces
        background: '#EEF2F6', // Page bg
        surface: '#FFFFFF',    // Card bg
        input: '#EFF4F7',      // Input bg
        
        // Text
        muted: '#94A8B6',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',    // Inputs
        '2xl': '20px',   // Cards
        '3xl': '32px',   // Large Containers
        'full': '9999px', // Buttons
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(49, 87, 113, 0.08), 0 10px 15px -3px rgba(49, 87, 113, 0.12)',
        'float': '0 20px 25px -5px rgba(230, 100, 103, 0.15), 0 8px 10px -6px rgba(230, 100, 103, 0.1)',
        'glow': '0 0 15px rgba(230, 100, 103, 0.3)',
        'inner': 'inset 0 2px 4px 0 rgba(49, 87, 113, 0.06)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #E66467 0%, #F29639 100%)',
        'gradient-cool': 'linear-gradient(135deg, #409F9C 0%, #315771 100%)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;