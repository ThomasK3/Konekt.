# Konekt. Design System - TripGlide Edition

> **Image-driven, bold & clean. Travel app aesthetics meet event management.**

---

## 🎨 Design Philosophy

### Core Principles
1. **Image-First** - Beautiful event photography drives the experience
2. **Bold Typography** - Strong, readable hierarchy with Instrument Sans
3. **Rounded Everything** - Soft, approachable aesthetic (24px+ corners)
4. **Dark Accents** - Black buttons and text for strong contrast
5. **Minimal Color** - Let event images provide color, UI stays monochrome

**Inspiration:** TripGlide mobile app - modern travel UI adapted for event management

---

## 🖤 Color Palette

### Base Colors (Monochrome Focus)

```css
/* Backgrounds */
--white: #FFFFFF           /* Cards, surfaces */
--grey-50: #F5F6F7         /* Page background */
--grey-100: #EAEBED        /* Alternative surfaces */

/* Text */
--black: #212529           /* Primary text, dark buttons */
--grey-600: #6C757D        /* Secondary text */
--grey-400: #ADB5BD        /* Tertiary text, placeholders */

/* Borders */
--grey-200: #DEE2E6        /* Subtle dividers */
--grey-300: #CED4DA        /* Visible borders */

/* Image Overlays */
--overlay-gradient: linear-gradient(
  180deg,
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,0.7) 100%
);
```

### Accent Colors (Minimal Use)

**Use ONLY for status indicators and data visualization:**

```css
/* Status colors */
--accent-blue: #4A90E2      /* Info, links */
--accent-green: #10B981     /* Success, confirmed */
--accent-orange: #F97316    /* Warning, pending */
--accent-red: #EF4444       /* Error, cancelled */
```

**Where to use accents:**
✅ Status badges ("Registered", "Checked-in")  
✅ Data charts (minimal)  
✅ Icons (sparingly)  

❌ NOT for buttons (use black)  
❌ NOT for card backgrounds  
❌ NOT as primary UI elements  

---

## 📏 Spacing System

**Base unit:** 8px  
**Philosophy:** Generous but not excessive

```css
/* Tight */
--space-1: 8px
--space-2: 16px

/* Standard */
--space-3: 24px
--space-4: 32px

/* Generous */
--space-6: 48px
--space-8: 64px
```

### Common Uses:

```css
/* Cards */
padding: 24px;              /* Card content */
border-radius: 24px;        /* Card corners */
gap: 16px;                  /* Between cards (mobile) */
gap: 24px;                  /* Between cards (desktop) */

/* Sections */
margin-bottom: 48px;        /* Between major sections */

/* Page */
padding: 24px;              /* Page padding (mobile) */
padding: 32px 48px;         /* Page padding (desktop) */
```

---

## 🔤 Typography - Instrument Sans

### Font Setup

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');

font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Why Instrument Sans:**
- ✅ Modern geometric sans-serif
- ✅ Excellent screen readability
- ✅ Professional yet approachable
- ✅ Used by TripGlide and modern travel apps
- ✅ Free via Google Fonts

### Type Scale

```css
/* Display */
--text-display: 48px;       /* Hero sections */
--text-h1: 32px;            /* Page titles */
--text-h2: 28px;            /* Section headers */
--text-h3: 22px;            /* Card titles */
--text-h4: 18px;            /* Subheadings */

/* Body */
--text-large: 17px;         /* Prominent text */
--text-base: 16px;          /* Standard body */
--text-small: 14px;         /* Secondary text */
--text-tiny: 12px;          /* Labels, captions */
```

### Font Weights

```css
--font-regular: 400         /* Body text */
--font-medium: 500          /* Emphasis */
--font-semibold: 600        /* Headings, buttons */
--font-bold: 700            /* Strong emphasis */
```

### Typography Examples

```css
/* Page Title */
h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: #212529;
  letter-spacing: -0.02em;
}

/* Card Title */
h3 {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  color: #212529;
}

/* Body Text */
p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
}

/* Secondary Text */
.text-secondary {
  font-size: 14px;
  font-weight: 400;
  color: #6C757D;
}

/* Text over images */
.text-overlay {
  color: #FFFFFF;
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
```

---

## 🧩 Component Patterns

### Card - Image-Driven

**Primary card with event photo:**

```css
.card {
  background: #FFFFFF;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.06);
  transform: translateY(-4px);
}

/* Image container */
.card-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Dark gradient overlay */
.card-image::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.7) 100%
  );
  pointer-events: none;
}

/* Text over image */
.card-image-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 1;
  color: #FFFFFF;
}

.card-image-title {
  font-size: 22px;
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  margin-bottom: 4px;
}

.card-image-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

/* Card body (below image) */
.card-body {
  padding: 20px 24px 24px;
}
```

**Simple card (no image):**

```css
.card-simple {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.03);
}
```

**Example HTML:**
```html
<!-- Event Card with Image -->
<div class="card">
  <div class="card-image">
    <img src="event-photo.jpg" alt="Startup Meetup">
    <div class="card-image-content">
      <h3 class="card-image-title">Startup Meetup Prague</h3>
      <p class="card-image-subtitle">March 15 • 18:00 • Karlin Hall</p>
    </div>
  </div>
  <div class="card-body">
    <p class="text-secondary">50 registered</p>
  </div>
</div>
```

---

### Buttons - Dark & Bold

**Primary Button (Black/Dark):**

```css
.btn-primary {
  /* Dark background */
  background: #212529;
  
  /* Rounded pill shape */
  border-radius: 100px;
  padding: 14px 28px;
  
  /* Typography */
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  letter-spacing: -0.01em;
  
  /* Shadow */
  box-shadow: 
    0 4px 12px rgba(33, 37, 41, 0.2),
    0 2px 4px rgba(33, 37, 41, 0.1);
  
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #343A40;
  transform: translateY(-2px);
  box-shadow: 
    0 6px 20px rgba(33, 37, 41, 0.25);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button (Outlined):**

```css
.btn-secondary {
  background: transparent;
  border: 2px solid #212529;
  border-radius: 100px;
  padding: 12px 26px;
  
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #212529;
  color: #FFFFFF;
}
```

**Icon Button (Circle):**

```css
.btn-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  
  background: #FFFFFF;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #212529;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: #F5F6F7;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: scale(1.05);
}

/* Favorite/Heart button (floating on images) */
.btn-favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
```

**React Component:**
```tsx
export function Button({ 
  children, 
  variant = 'primary',
  onClick 
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    icon: 'btn-icon',
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

```css
.input {
  background: #F5F6F7;
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 14px 16px;
  
  font-size: 16px;
  font-weight: 400;
  color: #212529;
  
  transition: all 0.2s ease;
}

.input::placeholder {
  color: #ADB5BD;
}

.input:focus {
  outline: none;
  background: #FFFFFF;
  border-color: #212529;
  box-shadow: 0 0 0 4px rgba(33, 37, 41, 0.1);
}

/* Search input */
.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6C757D;
}

.search-input {
  padding-left: 48px;
}
```

---

### Navigation - Rounded Pill (Bottom)

**TripGlide-style floating bottom nav:**

```css
.bottom-nav {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  
  /* Pill shape */
  background: #212529;
  border-radius: 100px;
  padding: 12px 24px;
  
  /* Shadow */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.15);
  
  display: flex;
  gap: 8px;
  align-items: center;
  
  z-index: 100;
}

.nav-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: rgba(255,255,255,0.6);
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #FFFFFF;
  background: rgba(255,255,255,0.1);
}

.nav-item.active {
  background: #FFFFFF;
  color: #212529;
}
```

**Mobile responsive:**
```css
@media (max-width: 767px) {
  .bottom-nav {
    bottom: 16px;
    left: 16px;
    right: 16px;
    transform: none;
    width: calc(100% - 32px);
  }
}
```

**Example HTML:**
```html
<nav class="bottom-nav">
  <a href="/" class="nav-item active">
    <svg><!-- home icon --></svg>
  </a>
  <a href="/events" class="nav-item">
    <svg><!-- calendar icon --></svg>
  </a>
  <a href="/favorites" class="nav-item">
    <svg><!-- heart icon --></svg>
  </a>
  <a href="/profile" class="nav-item">
    <svg><!-- user icon --></svg>
  </a>
</nav>
```

---

### Status Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  padding: 6px 12px;
  border-radius: 100px;
  
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-success {
  background: #10B981;
  color: #FFFFFF;
}

.badge-warning {
  background: #F97316;
  color: #FFFFFF;
}

.badge-info {
  background: #4A90E2;
  color: #FFFFFF;
}

.badge-subtle {
  background: #F5F6F7;
  color: #6C757D;
  border: 1px solid #DEE2E6;
}
```

---

## 📐 Layout Structure

### Page Layout

```css
.page {
  min-height: 100vh;
  background: #F5F6F7;
  padding: 24px;
  padding-bottom: 120px;    /* Space for bottom nav */
}

@media (min-width: 768px) {
  .page {
    padding: 48px;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Grid Layout

```css
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## ✨ Image Treatments

### Hero Image

```css
.hero-image {
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.85) 100%
  );
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}
```

### Avatar/Profile Image

```css
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #FFFFFF;
}

.avatar-large {
  width: 80px;
  height: 80px;
}
```

---

## 📱 Responsive Behavior

```css
/* Mobile: Stack everything, full-width buttons */
@media (max-width: 767px) {
  .btn-primary {
    width: 100%;
  }
  
  .card {
    margin-bottom: 16px;
  }
}

/* Desktop: More spacious */
@media (min-width: 1024px) {
  .page {
    padding: 64px 48px;
  }
  
  .card {
    margin-bottom: 24px;
  }
}
```

---

## 🎯 Design Principles

**TripGlide-Inspired:**

✅ **Image-first** - Event photos are the star  
✅ **Bold dark buttons** - Black primary (not colorful)  
✅ **Rounded pills** - Navigation, buttons, badges  
✅ **Strong shadows** - Physical depth, not subtle  
✅ **Instrument Sans** - Modern, geometric  
✅ **Minimal color** - Let images provide color  
✅ **Text overlays** - Dark gradients for readability  
✅ **Very rounded** - 24px cards, 100px buttons  
✅ **Clean & simple** - No unnecessary decoration  

**What makes this work:**
- Event photography = natural color and personality
- Dark buttons = strong CTAs that pop
- Rounded shapes = friendly, approachable
- Monochrome UI = lets content shine
- Bottom pill nav = modern, mobile-optimized

---

**This is travel app aesthetics for event management. Visual, bold, modern.** 🚀