/**
 * Design Tokens - Glassmorphism + Saturated Pastels
 * Based on DESIGN_SYSTEM.md
 *
 * Core Philosophy:
 * - Unified color system (same 6 colors everywhere)
 * - Glassmorphism cards with colored gradients
 * - Saturated pastels (more alive, more vibrant)
 * - ONE palette at different opacities = cohesive design
 */

export const colors = {
  // Primary UI Colors (Monochrome base)
  white: "#FFFFFF",
  black: "#000000",
  background: "#FFFFFF",
  backgroundSecondary: "#FAFAFA",
  surface: "#FFFFFF",

  // Text (monochrome hierarchy)
  text: {
    primary: "#000000",
    secondary: "#666666",
    tertiary: "#999999",
  },

  // Borders (subtle)
  border: {
    light: "#F0F0F0",
    medium: "#E0E0E0",
    dark: "#CCCCCC",
  },

  // Interactive States
  hover: "rgba(0, 0, 0, 0.04)",
  active: "rgba(0, 0, 0, 0.08)",

  // Saturated Pastels (UNIFIED - used everywhere)
  pastel: {
    blue: "#7BA3FF",       // Event Info, primary data, blue cells
    purple: "#A77BFF",     // Program, secondary data, purple cells
    green: "#7BFFB8",      // Participants, success, green cells
    pink: "#FF7BC8",       // Check-in, highlights, pink cells
    yellow: "#FFD67B",     // Warnings, attention
    orange: "#FFAB7B",     // Special metrics, alerts
  },

  // Glass Tints (same colors at 8% for card gradients)
  glassTint: {
    blue: "rgba(123, 163, 255, 0.08)",
    purple: "rgba(167, 123, 255, 0.08)",
    green: "rgba(123, 255, 184, 0.08)",
    pink: "rgba(255, 123, 200, 0.08)",
    yellow: "rgba(255, 214, 123, 0.08)",
    orange: "rgba(255, 171, 123, 0.08)",
  },

  // Glass Borders (same colors at 25%)
  glassBorder: {
    blue: "rgba(123, 163, 255, 0.25)",
    purple: "rgba(167, 123, 255, 0.25)",
    green: "rgba(123, 255, 184, 0.25)",
    pink: "rgba(255, 123, 200, 0.25)",
    yellow: "rgba(255, 214, 123, 0.25)",
    orange: "rgba(255, 171, 123, 0.25)",
  },

  // Button Glass (same colors at 18% for visibility)
  buttonGlass: {
    blue: "rgba(123, 163, 255, 0.18)",
    purple: "rgba(167, 123, 255, 0.18)",
    green: "rgba(123, 255, 184, 0.18)",
    pink: "rgba(255, 123, 200, 0.18)",
    yellow: "rgba(255, 214, 123, 0.18)",
    orange: "rgba(255, 171, 123, 0.18)",
  },

  // Icon Backgrounds (same colors at 15%)
  iconBg: {
    blue: "rgba(123, 163, 255, 0.15)",
    purple: "rgba(167, 123, 255, 0.15)",
    green: "rgba(123, 255, 184, 0.15)",
    pink: "rgba(255, 123, 200, 0.15)",
    yellow: "rgba(255, 214, 123, 0.15)",
    orange: "rgba(255, 171, 123, 0.15)",
  },

  // Glass shadows (colored)
  glassShadow: {
    blue: "rgba(123, 163, 255, 0.15)",
    purple: "rgba(167, 123, 255, 0.15)",
    green: "rgba(123, 255, 184, 0.15)",
    pink: "rgba(255, 123, 200, 0.15)",
    yellow: "rgba(255, 214, 123, 0.15)",
    orange: "rgba(255, 171, 123, 0.15)",
  },

  // Darker versions for text/icons on light backgrounds
  dark: {
    blue: "#2563EB",
    purple: "#7C3AED",
    green: "#059669",
    pink: "#DB2777",
    yellow: "#D97706",
    orange: "#EA580C",
  },

  // Module mapping (for convenience)
  module: {
    eventInfo: "#7BA3FF",      // Blue
    program: "#A77BFF",        // Purple
    participants: "#7BFFB8",   // Green
    checkin: "#FF7BC8",        // Pink
  },
} as const;

// Spacing System (Apple-style Generous) - Base unit: 8px
export const spacing = {
  1: "8px",     // Extra tight (rare)
  2: "16px",    // Tight
  3: "24px",    // Standard
  4: "32px",    // Standard
  5: "40px",    // Generous (common)
  6: "48px",    // Generous
  8: "64px",    // Extra generous
  10: "80px",   // Extra generous
  12: "96px",   // Massive (sections)
  16: "128px",  // Massive (sections)
} as const;

// Typography (Apple-style Large & Light)
export const fontSize = {
  tiny: "12px",      // Metadata, timestamps
  small: "14px",     // Captions, labels
  base: "16px",      // Standard body
  large: "18px",     // Prominent body text
  h4: "20px",        // Subsections
  h3: "24px",        // Card titles
  h2: "32px",        // Section headers
  h1: "40px",        // Page titles
  display: "56px",   // Hero sections
} as const;

export const fontWeight = {
  light: 300,      // Subtle text (rare)
  regular: 400,    // Body text (not common - prefer medium)
  medium: 500,     // Default body (most common)
  semibold: 600,   // Headings
  bold: 700,       // Emphasis (rare)
} as const;

export const lineHeight = {
  tight: 1.2,      // Headings
  normal: 1.5,     // Body text
  relaxed: 1.75,   // Long-form content
} as const;

// Border Radius (Large, Apple-style)
export const borderRadius = {
  none: "0px",
  sm: "8px",      // Badges
  md: "12px",     // Buttons, inputs
  lg: "16px",     // Small cards
  xl: "20px",     // Large cards (most common)
  full: "9999px", // Pills, avatars
} as const;

// Box Shadow (Glassmorphism style)
export const boxShadow = {
  none: "none",

  // Glass card shadows with inner glow
  glass: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  glassHover: "0 12px 48px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",

  // Colored glass shadows
  glassBlue: "0 8px 32px rgba(123, 163, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  glassBlueHover: "0 12px 48px rgba(123, 163, 255, 0.25)",

  glassPurple: "0 8px 32px rgba(167, 123, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  glassPurpleHover: "0 12px 48px rgba(167, 123, 255, 0.25)",

  glassGreen: "0 8px 32px rgba(123, 255, 184, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  glassGreenHover: "0 12px 48px rgba(123, 255, 184, 0.25)",

  glassPink: "0 8px 32px rgba(255, 123, 200, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  glassPinkHover: "0 12px 48px rgba(255, 123, 200, 0.25)",

  // Button shadows
  buttonGlass: "0 8px 32px rgba(123, 163, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
  buttonGlassHover: "0 12px 48px rgba(123, 163, 255, 0.35)",

  // Focus state
  focus: "0 0 0 3px rgba(0, 0, 0, 0.06)",
} as const;

// Common component configs (Glassmorphism)
export const card = {
  background: "rgba(255, 255, 255, 0.7)",
  borderRadius: borderRadius.xl,    // 20px
  padding: spacing[5],               // 40px
  shadow: boxShadow.glass,
  shadowHover: boxShadow.glassHover,
  border: "1px solid rgba(255, 255, 255, 0.3)",
  gap: spacing[4],                   // 32px
  backdropFilter: "blur(16px)",
} as const;

export const button = {
  padding: {
    vertical: "14px",
    horizontal: "28px",
  },
  borderRadius: borderRadius.md,    // 12px
  fontSize: fontSize.base,           // 16px
  fontWeight: fontWeight.semibold,   // 600
  backdropFilter: "blur(12px)",
} as const;

export const input = {
  padding: {
    vertical: "14px",
    horizontal: "16px",
  },
  borderRadius: borderRadius.md,    // 12px
  fontSize: fontSize.base,           // 16px
  borderColor: colors.border.medium,
  focusBorderColor: colors.black,
} as const;

// Responsive breakpoints
export const breakpoints = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
} as const;

// Module accent mapping (for easy reference)
export const moduleColors = {
  "event-info": colors.module.eventInfo,
  "program": colors.module.program,
  "participants": colors.module.participants,
  "checkin": colors.module.checkin,
} as const;

export type ModuleType = keyof typeof moduleColors;
