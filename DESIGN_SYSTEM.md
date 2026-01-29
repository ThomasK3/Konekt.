# Konekt Design System - MVP Baseline

> **Minimální design základ pro rychlý start. Detaily řešíme iterativně během vývoje.**

---

## 🎨 Color Palette

### Base Colors
```css
--white: #FFFFFF          /* Primary background */
--black: #000000          /* Primary text */
--grey-50: #F9FAFB        /* Page background */
--grey-100: #F3F4F6       /* Subtle borders */
--grey-300: #D1D5DB       /* Borders */
--grey-500: #6B7280       /* Secondary text */
--grey-700: #374151       /* Dark text */
```

### Module Accent Colors
```css
--orange: #FF6B35         /* Event Info module */
--blue: #4A90E2           /* Program module */
--green: #50C878          /* Participants module */
--purple: #9B59B6         /* Check-in module */
```

### Usage
- **Page background:** `grey-50` (#F9FAFB)
- **Card background:** `white` (#FFFFFF)
- **Primary text:** `black` (#000000)
- **Secondary text:** `grey-500` (#6B7280)
- **Module accents:** Top border nebo icon background

---

## 📏 Spacing System

**Base unit:** 4px

### Scale
```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

### Common Uses
- **Card padding:** 24px (`space-6`)
- **Gap between cards:** 16px (`space-4`) mobile, 24px (`space-6`) desktop
- **Button padding:** 12px 24px (`space-3` `space-6`)
- **Input padding:** 12px 16px (`space-3` `space-4`)

---

## 🔤 Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
```
**Note:** Inter z Google Fonts pokud chceš konzistentnější, jinak system fonts.

### Font Sizes
```css
--text-xs: 12px
--text-sm: 14px
--text-base: 16px
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px
--text-3xl: 30px
--text-4xl: 36px
```

### Font Weights
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Usage Examples
```css
/* Heading 1 */
font-size: 36px;
font-weight: 700;
color: #000000;

/* Heading 2 */
font-size: 24px;
font-weight: 600;
color: #000000;

/* Body text */
font-size: 16px;
font-weight: 400;
color: #000000;

/* Secondary text */
font-size: 14px;
font-weight: 400;
color: #6B7280;

/* Small text (labels, captions) */
font-size: 12px;
font-weight: 400;
color: #6B7280;
```

---

## 🧩 Component Basics

### Card / Module Cell
```css
background: #FFFFFF;
border-radius: 16px;
padding: 24px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
border-top: 3px solid [accent-color]; /* Optional accent */
```

**Variants:**
- **With accent:** 3px colored top border
- **Neutral:** No colored border
- **Hover:** `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);`

---

### Button
```css
/* Primary button */
background: #000000;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 8px;
font-size: 16px;
font-weight: 600;
border: none;
cursor: pointer;

/* Hover */
background: #374151; /* grey-700 */

/* With accent color */
background: #FF6B35; /* orange */
```

```css
/* Secondary button */
background: transparent;
color: #000000;
border: 1px solid #D1D5DB; /* grey-300 */
padding: 12px 24px;
border-radius: 8px;

/* Hover */
background: #F9FAFB; /* grey-50 */
```

---

### Input Field
```css
background: #FFFFFF;
border: 1px solid #D1D5DB; /* grey-300 */
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: #000000;

/* Focus */
border-color: #000000;
outline: none;
box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);

/* Error */
border-color: #EF4444; /* red */
```

---

### Icon Background (for module headers)
```css
width: 40px;
height: 40px;
border-radius: 8px;
background: rgba(255, 107, 53, 0.15); /* 15% opacity of accent color */
display: flex;
align-items: center;
justify-content: center;
```

---

## 📐 Layout

### Page Structure
```css
/* Page wrapper */
background: #F9FAFB; /* grey-50 */
min-height: 100vh;
padding: 24px;

/* Content container */
max-width: 1200px;
margin: 0 auto;
```

### Grid / Flexbox Spacing
```css
/* Card grid */
display: grid;
gap: 24px;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

/* Or flexbox */
display: flex;
gap: 16px;
flex-wrap: wrap;
```

---

## 🎭 States

### Loading State (Skeleton)
```css
background: linear-gradient(
  90deg,
  #F3F4F6 25%,
  #E5E7EB 50%,
  #F3F4F6 75%
);
animation: loading 1.5s infinite;
border-radius: 8px;
```

### Empty State
- Grey text (`grey-500`)
- Icon (optional)
- Call-to-action button

### Error State
- Red text (`#EF4444`)
- Border červený
- Clear error message

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
--mobile: 0px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1280px;
```

### Usage
```css
/* Mobile (default) */
padding: 16px;

/* Tablet and up */
@media (min-width: 768px) {
  padding: 24px;
}

/* Desktop and up */
@media (min-width: 1024px) {
  padding: 32px;
}
```

---

## ✨ Effects (Minimal)

### Shadow / Glow
```css
/* Default card shadow */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Hover / elevated */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

/* Focus ring */
box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
```

### Transitions
```css
/* Default */
transition: all 0.2s ease;

/* Hover effects */
transition: transform 0.2s ease, box-shadow 0.2s ease;
```

---

## 🚀 Implementation Notes

### Tailwind CSS Classes (if using)
```html
<!-- Card -->
<div class="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-orange">

<!-- Button Primary -->
<button class="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-grey-700">

<!-- Input -->
<input class="border border-grey-300 rounded-lg px-4 py-3 w-full focus:border-black focus:ring-2 focus:ring-black/10">
```

### CSS Variables (if using vanilla CSS)
```css
:root {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-grey-50: #F9FAFB;
  --color-grey-300: #D1D5DB;
  --color-grey-500: #6B7280;
  
  --color-orange: #FF6B35;
  --color-blue: #4A90E2;
  --color-green: #50C878;
  --color-purple: #9B59B6;
  
  --space-4: 16px;
  --space-6: 24px;
  
  --radius-lg: 16px;
  --radius-md: 8px;
}
```

---

## 🎯 Design Principles for MVP

1. **Start minimal** - Černá/bílá/šedá základ, akcenty jen kde potřeba
2. **Consistency over creativity** - Používej stejné patterns všude
3. **Function first** - Pokud něco funguje ale není krásné, OK pro MVP
4. **Iterate visually** - Když vidíš kód živě, upravuj design
5. **No premature optimization** - Fancy animace až Phase 2

---

## 📝 Evolution Notes

**Během vývoje se společně zaměříme na:**
- Connection lines (mezi moduly)
- Subtle animations (hover, transitions)
- More sophisticated shadows
- Module-specific styling
- Dark mode (later)

**Ale pro start: Keep it simple.** ✅

---

**Tohle je baseline. Builduj funkčnost, design ladíme průběžně.**