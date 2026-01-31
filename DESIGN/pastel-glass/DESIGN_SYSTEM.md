# Konekt Design System - Apple Minimalism Edition

> **Ultra-clean, generous spacing, subtle depth. Black/white base + pastel data visualization.**

---

## 🎨 Design Philosophy

### Core Principles
1. **Extreme Clarity** - Every element has purpose
2. **Generous Whitespace** - Breathing room everywhere
3. **Subtle Depth** - Barely-there shadows, glassmorphism accents
4. **Color Restraint** - Black/white base, pastels ONLY for data
5. **Typography Hierarchy** - Clear, large, readable

**Inspiration:** Apple Design + Figma UI + Arc Browser

---

## 🖤 Color Palette

### Base Colors (Primary UI)

```css
/* Backgrounds */
--white: #FFFFFF           /* Primary surface */
--grey-50: #FAFAFA         /* Page background - barely grey */
--grey-100: #F5F5F5        /* Subtle section backgrounds */

/* Text */
--black: #000000           /* Primary text */
--grey-600: #525252        /* Secondary text */
--grey-400: #A3A3A3        /* Tertiary text, disabled */

/* Borders & Dividers */
--grey-200: #E5E5E5        /* Subtle borders */
--grey-300: #D4D4D4        /* Visible borders */

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.7)
--glass-border: rgba(255, 255, 255, 0.3)
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
```

### Pastel Colors (Saturated - For Glass & Data)

**Unified color system - used in both glass tints AND data visualization:**

```css
/* Saturated Pastels (more vibrant than subtle pastels) */
--pastel-blue: #7BA3FF        /* Event Info, primary data */
--pastel-purple: #A77BFF      /* Program, secondary data */
--pastel-green: #7BFFB8       /* Participants, success data */
--pastel-pink: #FF7BC8        /* Check-in, highlight data */
--pastel-yellow: #FFD67B      /* Warnings, attention */
--pastel-orange: #FFAB7B      /* Special metrics */

/* Glass Tints (same colors at low opacity) */
--glass-blue: rgba(123, 163, 255, 0.12)
--glass-purple: rgba(167, 123, 255, 0.12)
--glass-green: rgba(123, 255, 184, 0.12)
--glass-pink: rgba(255, 123, 200, 0.12)

/* Glass Borders (same colors at higher opacity) */
--glass-border-blue: rgba(123, 163, 255, 0.25)
--glass-border-purple: rgba(167, 123, 255, 0.25)
--glass-border-green: rgba(123, 255, 184, 0.25)
--glass-border-pink: rgba(255, 123, 200, 0.25)
```

**Where to use pastels:**
✅ Glass card backgrounds (subtle tints)  
✅ Glass card borders  
✅ Icon backgrounds  
✅ Chart bars/lines  
✅ Stat cards  
✅ Data badges  
✅ Progress indicators  
✅ Graph highlights  

**Everything uses the SAME color palette - unified design system.**  

---

## 📏 Spacing System - Apple Generous Scale

**Base unit:** 4px  
**Philosophy:** More space = more premium

```css
/* Apple-style spacing (extra generous) */
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px     /* Default card padding */
--space-10: 40px
--space-12: 48px    /* Section spacing */
--space-16: 64px    /* Major section breaks */
--space-20: 80px    /* Hero spacing */
--space-24: 96px    /* Page margins (desktop) */
```

### Usage Guidelines

```css
/* Cards/Cells */
padding: 32px;              /* --space-8 minimum */
gap: 48px;                  /* --space-12 between cards */

/* Sections */
margin-bottom: 64px;        /* --space-16 major breaks */

/* Page Containers */
padding: 24px;              /* Mobile */
padding: 96px 24px;         /* Desktop (top/bottom) */
max-width: 1200px;          /* Content max-width */

/* Form Elements */
gap: 20px;                  /* --space-5 between inputs */

/* Buttons */
padding: 12px 24px;         /* Comfortable tap target */
```

---

## 🔤 Typography - Plus Jakarta Sans

### Font Setup

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

--font-primary: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Why Plus Jakarta Sans:**
- ✅ Modern rounded sans-serif
- ✅ Excellent readability
- ✅ Professional yet friendly
- ✅ Free via Google Fonts
- ✅ Variable weights (300-700)

### Type Scale (Large & Clear)

```css
/* Headings */
--text-5xl: 48px;          /* Hero titles */
--text-4xl: 36px;          /* Page titles */
--text-3xl: 30px;          /* Section titles */
--text-2xl: 24px;          /* Card titles */
--text-xl: 20px;           /* Subheadings */
--text-lg: 18px;           /* Large body */

/* Body */
--text-base: 16px;         /* Default body text */
--text-sm: 14px;           /* Secondary text */
--text-xs: 12px;           /* Captions, labels */
```

### Font Weights

```css
--font-light: 300;         /* Rarely used */
--font-normal: 400;        /* Body text */
--font-medium: 500;        /* Emphasis */
--font-semibold: 600;      /* Headings */
--font-bold: 700;          /* Strong emphasis */
```

### Typography Examples

```css
/* Hero Title (Homepage) */
font-size: 48px;
font-weight: 700;
line-height: 1.1;
letter-spacing: -0.02em;   /* Tight tracking for large text */
color: #000000;

/* Page Title */
font-size: 36px;
font-weight: 600;
line-height: 1.2;
color: #000000;

/* Section Title */
font-size: 24px;
font-weight: 600;
line-height: 1.3;
color: #000000;

/* Body Text */
font-size: 16px;
font-weight: 400;
line-height: 1.6;
color: #000000;

/* Secondary Text */
font-size: 14px;
font-weight: 400;
line-height: 1.5;
color: #525252;            /* grey-600 */

/* Caption/Label */
font-size: 12px;
font-weight: 500;
line-height: 1.4;
color: #A3A3A3;            /* grey-400 */
text-transform: uppercase;
letter-spacing: 0.05em;
```

### Icon Backgrounds (Pastel Tints)

**Icons with glass backgrounds matching cell colors:**

```css
.icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Glassmorphism + pastel tint */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  
  transition: all 0.2s ease;
}

/* Color variants (matching cell types) */
.icon-blue {
  background: rgba(123, 163, 255, 0.15);
  border: 1px solid rgba(123, 163, 255, 0.25);
  color: #2563EB;  /* Darker blue for icon */
}

.icon-purple {
  background: rgba(167, 123, 255, 0.15);
  border: 1px solid rgba(167, 123, 255, 0.25);
  color: #7C3AED;  /* Darker purple */
}

.icon-green {
  background: rgba(123, 255, 184, 0.15);
  border: 1px solid rgba(123, 255, 184, 0.25);
  color: #059669;  /* Darker green */
}

.icon-pink {
  background: rgba(255, 123, 200, 0.15);
  border: 1px solid rgba(255, 123, 200, 0.25);
  color: #DB2777;  /* Darker pink */
}

/* Hover state */
.icon-wrapper:hover {
  transform: scale(1.05);
}

/* Usage */
.icon-wrapper svg {
  width: 24px;
  height: 24px;
}
```

**Example HTML:**
```html
<!-- Event Info icon (blue) -->
<div class="icon-wrapper icon-blue">
  <svg><!-- calendar icon --></svg>
</div>

<!-- Program icon (purple) -->
<div class="icon-wrapper icon-purple">
  <svg><!-- schedule icon --></svg>
</div>

<!-- Participants icon (green) -->
<div class="icon-wrapper icon-green">
  <svg><!-- users icon --></svg>
</div>

<!-- Check-in icon (pink) -->
<div class="icon-wrapper icon-pink">
  <svg><!-- qr-code icon --></svg>
</div>
```

---

### Cell Header (with colored icon)

**Unified header pattern across all cells:**

```css
.cell-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;           /* Generous gap before content */
}

.cell-title {
  font-size: 24px;
  font-weight: 600;
  color: #000000;
}

/* Example: Event Info Cell */
<div class="card card-blue">
  <div class="cell-header">
    <div class="icon-wrapper icon-blue">
      <svg><!-- icon --></svg>
    </div>
    <h2 class="cell-title">Event Info</h2>
  </div>
  <!-- Cell content -->
</div>
```

### Card / Cell (Glass with Pastel Tints)

**Glassmorphism cards with subtle color identity:**

```css
.card {
  /* Glassmorphism base */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  /* Rounded corners */
  border-radius: 20px;
  
  /* Generous padding */
  padding: 40px;
  
  /* Subtle shadow + glow */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  
  /* Subtle border (neutral by default) */
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover state (lift + enhance) */
.card:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

/* Cell variants with pastel tints */
.card-blue {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(123, 163, 255, 0.08) 100%
  );
  border: 1px solid rgba(123, 163, 255, 0.25);
}

.card-purple {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(167, 123, 255, 0.08) 100%
  );
  border: 1px solid rgba(167, 123, 255, 0.25);
}

.card-green {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(123, 255, 184, 0.08) 100%
  );
  border: 1px solid rgba(123, 255, 184, 0.25);
}

.card-pink {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(255, 123, 200, 0.08) 100%
  );
  border: 1px solid rgba(255, 123, 200, 0.25);
}
```

**Example HTML:**
```html
<!-- Event Info Cell with blue tint -->
<div class="card card-blue">
  <h2 class="text-2xl font-semibold mb-6">Event Info</h2>
  <div class="space-y-4">
    <!-- Content -->
  </div>
</div>

<!-- Program Cell with purple tint -->
<div class="card card-purple">
  <h2 class="text-2xl font-semibold mb-6">Program</h2>
  <!-- Content -->
</div>
```

**React Component:**
```tsx
interface CardProps {
  children: ReactNode
  variant?: 'blue' | 'purple' | 'green' | 'pink' | 'neutral'
  className?: string
}

export function Card({ children, variant = 'neutral', className }: CardProps) {
  return (
    <div className={cn(
      'card',
      variant !== 'neutral' && `card-${variant}`,
      className
    )}>
      {children}
    </div>
  )
}
```

---

### Buttons - Glassmorphism (With Pastel Tints)

**Primary Button (Glass with saturated blue tint):**

```css
.btn-glass-primary {
  /* Glassmorphism effect with blue tint */
  background: rgba(123, 163, 255, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border: 1px solid rgba(123, 163, 255, 0.35);
  box-shadow: 
    0 8px 32px rgba(123, 163, 255, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  
  /* Typography */
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  
  /* Spacing */
  padding: 14px 28px;
  border-radius: 12px;
  
  /* Interaction */
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-glass-primary:hover {
  background: rgba(123, 163, 255, 0.28);
  border-color: rgba(123, 163, 255, 0.5);
  transform: translateY(-1px);
  box-shadow: 
    0 12px 48px rgba(123, 163, 255, 0.35);
}

.btn-glass-primary:active {
  transform: translateY(0);
  box-shadow: 
    0 4px 16px rgba(123, 163, 255, 0.2);
}
```

**Secondary Button (Glass with no tint - pure white):**

```css
.btn-glass-secondary {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  
  padding: 14px 28px;
  border-radius: 12px;
  
  transition: all 0.2s ease;
}

.btn-glass-secondary:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}
```

**Colored Button Variants (for specific actions):**

```css
/* Success/Confirm (green) */
.btn-glass-success {
  background: rgba(123, 255, 184, 0.18);
  border: 1px solid rgba(123, 255, 184, 0.35);
  box-shadow: 0 8px 32px rgba(123, 255, 184, 0.25);
  color: #000000;
}

/* Danger/Delete (pink) */
.btn-glass-danger {
  background: rgba(255, 123, 200, 0.18);
  border: 1px solid rgba(255, 123, 200, 0.35);
  box-shadow: 0 8px 32px rgba(255, 123, 200, 0.25);
  color: #000000;
}

/* Special action (purple) */
.btn-glass-purple {
  background: rgba(167, 123, 255, 0.18);
  border: 1px solid rgba(167, 123, 255, 0.35);
  box-shadow: 0 8px 32px rgba(167, 123, 255, 0.25);
  color: #000000;
}
```

**Icon Button (Minimal Glass):**

```css
.btn-icon-glass {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  
  color: #666666;
  transition: all 0.2s ease;
}

.btn-icon-glass:hover {
  background: rgba(255, 255, 255, 0.85);
  color: #000000;
  border-color: rgba(0, 0, 0, 0.1);
}
```

**React Component Example:**
```tsx
export function GlassButton({ 
  children, 
  variant = 'primary',
  onClick 
}: ButtonProps) {
  const variants = {
    primary: 'btn-glass-primary',
    secondary: 'btn-glass-secondary',
    success: 'btn-glass-success',
    danger: 'btn-glass-danger',
    purple: 'btn-glass-purple',
  }
  
  return (
    <button 
      className={variants[variant]}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

---

### Input Fields

**Minimal, clean inputs:**

```css
.input {
  background: #FFFFFF;
  border: 1.5px solid #E5E5E5;
  border-radius: 10px;
  
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.input::placeholder {
  color: #A3A3A3;
}

/* Error state */
.input.error {
  border-color: #FFA8E8; /* Pastel pink */
}

/* Disabled state */
.input:disabled {
  background: #FAFAFA;
  color: #A3A3A3;
  cursor: not-allowed;
}
```

---

### Data Display - Saturated Pastels (Unified System)

**Stat Card (with saturated pastel accent):**

```css
.stat-card {
  /* Glassmorphism base (same as regular cards) */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 24px;
  
  /* Pastel accent bar (saturated) */
  border-left: 4px solid var(--accent-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.stat-card.blue {
  --accent-color: #7BA3FF;
  border: 1px solid rgba(123, 163, 255, 0.2);
}

.stat-card.green {
  --accent-color: #7BFFB8;
  border: 1px solid rgba(123, 255, 184, 0.2);
}

.stat-card.purple {
  --accent-color: #A77BFF;
  border: 1px solid rgba(167, 123, 255, 0.2);
}

.stat-card.pink {
  --accent-color: #FF7BC8;
  border: 1px solid rgba(255, 123, 200, 0.2);
}

/* Stat value (large number) */
.stat-value {
  font-size: 40px;
  font-weight: 700;
  color: #000000;
  line-height: 1;
  margin-bottom: 4px;
}

/* Stat label */
.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: #525252;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

**Badge (saturated pastel background):**

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  padding: 6px 12px;
  border-radius: 8px;
  
  font-size: 12px;
  font-weight: 600;
  
  /* Glassmorphism + color tint */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.badge.registered {
  background: rgba(123, 163, 255, 0.2); /* Saturated blue @ 20% */
  border: 1px solid rgba(123, 163, 255, 0.3);
  color: #2563EB;                        /* Darker blue for contrast */
}

.badge.checked-in {
  background: rgba(123, 255, 184, 0.2); /* Saturated green @ 20% */
  border: 1px solid rgba(123, 255, 184, 0.3);
  color: #059669;                        /* Darker green */
}

.badge.pending {
  background: rgba(255, 214, 123, 0.2); /* Saturated yellow @ 20% */
  border: 1px solid rgba(255, 214, 123, 0.3);
  color: #D97706;                        /* Darker yellow */
}

.badge.cancelled {
  background: rgba(255, 123, 200, 0.2); /* Saturated pink @ 20% */
  border: 1px solid rgba(255, 123, 200, 0.3);
  color: #DC2626;                        /* Red text */
}
```

**Chart Colors (for Chart.js / Recharts):**

```javascript
// Saturated pastel palette for data visualization
export const chartColors = {
  // Primary data colors (saturated pastels)
  primary: [
    '#7BA3FF',  // Blue
    '#A77BFF',  // Purple
    '#7BFFB8',  // Green
    '#FF7BC8',  // Pink
    '#FFD67B',  // Yellow
    '#FFAB7B',  // Orange
  ],
  
  // Specific use cases
  registration: '#7BA3FF',      // Blue
  checkedIn: '#7BFFB8',         // Green
  pending: '#FFD67B',           // Yellow
  cancelled: '#FF7BC8',         // Pink
  
  // With opacity for fills
  registrationFill: 'rgba(123, 163, 255, 0.3)',
  checkedInFill: 'rgba(123, 255, 184, 0.3)',
}

// Usage in Chart.js
const chartConfig = {
  datasets: [{
    label: 'Registrations',
    data: [32, 50, 42, 65],
    backgroundColor: 'rgba(123, 163, 255, 0.3)',
    borderColor: '#7BA3FF',
    borderWidth: 3,
    borderRadius: 8,
  }]
}
```

**Progress Bar (with saturated pastel):**

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    #7BA3FF 0%,
    #A77BFF 100%
  );
  border-radius: 8px;
  transition: width 0.3s ease;
}

/* Color variants */
.progress-fill.blue {
  background: #7BA3FF;
}

.progress-fill.green {
  background: #7BFFB8;
}

.progress-fill.purple {
  background: #A77BFF;
}
```

---

## 📐 Layout Structure

### Page Container

```css
.page-container {
  min-height: 100vh;
  background: #FAFAFA; /* grey-50 */
  
  /* Generous padding */
  padding: 24px;
}

/* Desktop */
@media (min-width: 1024px) {
  .page-container {
    padding: 96px 48px; /* Tons of vertical space */
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Grid Layout (Cards)

```css
.card-grid {
  display: grid;
  gap: 48px; /* Generous gap between cards */
  
  /* Single column on mobile */
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid {
    gap: 64px; /* Even more space on desktop */
  }
}
```

### Stack Layout (Vertical Cells)

```css
.cell-stack {
  display: flex;
  flex-direction: column;
  gap: 48px; /* Generous vertical spacing */
}

@media (min-width: 1024px) {
  .cell-stack {
    gap: 64px;
  }
}
```

---

## 🎭 Effects & Interactions

### Shadows - Apple Subtle

```css
/* Barely visible (resting state) */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.03);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);

/* Subtle depth (cards) */
--shadow-md: 
  0 1px 3px rgba(0, 0, 0, 0.05),
  0 1px 2px rgba(0, 0, 0, 0.03);

/* Elevated (hover) */
--shadow-lg: 
  0 4px 12px rgba(0, 0, 0, 0.08),
  0 2px 4px rgba(0, 0, 0, 0.04);

/* Floating (modals, dropdowns) */
--shadow-xl: 
  0 8px 24px rgba(0, 0, 0, 0.10),
  0 4px 8px rgba(0, 0, 0, 0.05);

/* Glassmorphism shadow */
--shadow-glass: 
  0 8px 32px rgba(0, 0, 0, 0.12),
  inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

### Transitions

```css
/* Default transition */
transition: all 0.2s ease;

/* Fast transitions (hover) */
transition: all 0.15s ease;

/* Slow transitions (layout shifts) */
transition: all 0.3s ease;

/* Cubic bezier for smooth feel */
transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Effects

```css
/* Lift on hover */
.interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Scale on hover (buttons) */
.button:hover {
  transform: scale(1.02);
}

/* Opacity change (text links) */
.link:hover {
  opacity: 0.7;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
--mobile: 0px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1280px;
--ultrawide: 1536px;
```

### Usage

```css
/* Mobile (default) */
.card {
  padding: 24px;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .card {
    padding: 32px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card {
    padding: 40px;
    font-size: 18px;
  }
}
```

---

## ✨ Animation Principles

### Micro-interactions

```css
/* Button press */
.button:active {
  transform: scale(0.98);
}

/* Checkbox check */
@keyframes check {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Page Transitions (Optional - Phase 2)

```css
/* Fade in on load */
@keyframes fadeIn {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeIn 0.3s ease;
}
```

---

## 🎯 Design Principles Summary

### Do's ✅
- Use generous whitespace (48px+ between sections)
- Keep it black/white (pastel ONLY for data)
- Apple-subtle shadows (barely visible)
- Large typography (36px+ for titles)
- Glassmorphism for interactive elements
- Rounded corners (12-16px)
- Clean, clear hierarchy

### Don'ts ❌
- No Bootstrap vibes (no gradients, no loud colors)
- No pastels in general UI (ONLY data/charts)
- No heavy shadows (keep it subtle)
- No tight spacing (breathing room!)
- No small text (16px minimum body)
- No sharp corners (always rounded)
- No clutter (less is more)

---

## 🚀 Implementation Priority

### Phase 1: Base System
1. Typography (Plus Jakarta Sans setup)
2. Color variables (black/white/grey + pastels)
3. Spacing system (generous scale)
4. Card component (subtle shadows)

### Phase 2: Interactive Elements
1. Glassmorphism buttons (primary/secondary)
2. Input fields (clean, minimal)
3. Hover states (subtle lift)

### Phase 3: Data Visualization
1. Stat cards (pastel accents)
2. Badges (pastel backgrounds)
3. Charts (pastel palette)

### Phase 4: Polish
1. Animations (micro-interactions)
2. Transitions (smooth)
3. Loading states (elegant)
4. Empty states (helpful)

---

**This is your design system. Apple-level quality. No Bootstrap bullshit. 🎨**