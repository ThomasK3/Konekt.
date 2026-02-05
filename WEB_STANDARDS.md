# Konekt. - Web Standards & Design System

> **Official design system and web standards for the Konekt. platform**

---

## 🎨 Design System: TripGlide

### Color Palette

#### Monochrome System
```
Primary:   #212529 (text-primary, bg-primary)
Secondary: #6C757D (text-secondary)
White:     #FFFFFF (bg-white)
Light Grey: #F5F6F7 (bg-page, bg-light)
Border:    #E9ECEF (border-light)
```

#### Data Visualization Colors
```
Coral:     #e66467 (Primary data color - warnings, important metrics)
Orange:    #f29639 (Secondary data color - highlights, growth)
Dark Blue: #315771 (Tertiary data color - stable metrics, comparisons)
Teal:      #409f9c (Quaternary data color - success, completion)
```

**Usage Guidelines:**
- Use monochrome for all UI elements (buttons, text, borders, backgrounds)
- Use data colors ONLY for charts, graphs, stats, and data visualization
- Never mix data colors with UI elements
- Maintain high contrast for accessibility (WCAG AA minimum)

#### Data Visualization Gradients

Gradients should be used to enhance charts and create visual flow in data visualizations.

**Linear Gradients:**
```css
/* Full Spectrum - Use for comprehensive data ranges */
linear-gradient(90deg, #e66467, #f29639, #315771, #409f9c)

/* Warm Gradient - Use for growth, positive trends */
linear-gradient(90deg, #e66467, #f29639)
linear-gradient(180deg, #e66467, #f29639)  /* Vertical variant */

/* Cool Gradient - Use for stable metrics, neutral data */
linear-gradient(90deg, #315771, #409f9c)
linear-gradient(180deg, #315771, #409f9c)  /* Vertical variant */

/* Diagonal Gradient - Use for dynamic presentations */
linear-gradient(135deg, #e66467, #409f9c)
```

**Area Fill Gradients:**
```css
/* Light background under line charts */
linear-gradient(to bottom, rgba(64, 159, 156, 0.2), rgba(64, 159, 156, 0.02))

/* Subtle gradient backgrounds */
linear-gradient(to bottom, rgba(230, 100, 103, 0.15), rgba(230, 100, 103, 0.01))
```

**Gradient Usage Best Practices:**
- **Bar Charts:** Use vertical gradients (180deg) to create depth
- **Line Charts:** Use horizontal gradients for stroke, vertical for area fill
- **Progress Bars:** Use horizontal gradients to indicate movement
- **Background Accents:** Use subtle gradients with low opacity
- **Donut/Pie Charts:** Avoid gradients, use solid colors for clarity

---

## 📐 Typography

### Font Family
**Primary:** Instrument Sans (Google Fonts)
**Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
**Display:** Swap (for optimal loading)

### Type Scale
```css
--text-h1: 2rem (32px)      /* Page titles */
--text-h2: 1.5rem (24px)    /* Section headers */
--text-h3: 1.25rem (20px)   /* Card titles */
--text-base: 1rem (16px)    /* Body text */
--text-small: 0.875rem (14px) /* Meta info, labels */
```

### Font Weights
- **Bold (700):** Page titles (h1), primary headings
- **Semibold (600):** Card titles (h3), button text
- **Medium (500):** Navigation items, labels
- **Regular (400):** Body text, descriptions

---

## 🧱 Component Standards

### Cards
```tsx
className="card"  // Base card with padding, shadow, border-radius
```
- Background: White (#FFFFFF)
- Border radius: 8px
- Padding: 24px (p-6)
- Shadow: 0px 1px 3px rgba(0, 0, 0, 0.1)
- Border: 1px solid #E9ECEF

### Buttons
```tsx
<Button variant="primary|secondary|danger" size="sm|md|lg">
```

**Primary Button:**
- Background: #212529
- Text: White
- Hover: Slightly lighter background
- Padding: px-7 py-3.5 (medium)

**Secondary Button:**
- Background: White
- Text: #212529
- Border: 1px solid #E9ECEF
- Hover: Light grey background (#F5F6F7)
- Padding: px-7 py-3.5 (medium)

**Danger Button:**
- Background: #e66467 (coral)
- Text: White
- Hover: Darker coral

**Button Sizes:**
- Small: px-4 py-2 text-small
- Medium: px-7 py-3.5 text-base
- Large: px-10 py-4 text-base

### Forms
**Input Fields:**
```tsx
className="input"
```
- Border: 1px solid #E9ECEF
- Border radius: 6px
- Padding: 12px 16px
- Focus: Border color #212529, ring

**Labels:**
```tsx
className="label"
```
- Font weight: 600 (Semibold)
- Color: #212529
- Margin bottom: 8px

**Error States:**
- Border: #e66467 (coral)
- Error text: #e66467, text-small

---

## 📱 Layout Architecture

### Navigation System: "Islands"

Konekt. uses an **islands navigation pattern** with three distinct navigation components:

#### 1. Top Header Navigation
**Component:** `components/layout/Navigation.tsx`
- **Visibility:** Public pages only (Home, Playground, Test Layout)
- **Hidden on:** All `/organizer/*` routes
- **Structure:** Logo + horizontal nav links
- **Position:** Fixed top, full width

#### 2. Bottom Navigation (Mobile Primary)
**Component:** `components/layout/BottomNav.tsx`
- **Visibility:** Organizer pages only
- **Structure:** 4 fixed items (Dashboard, Events, New, Profile)
- **Position:** Fixed bottom on all screen sizes
- **Behavior:** Always visible, active state highlights current section

**Bottom Nav Items:**
```tsx
[
  { id: "dashboard", label: "Dashboard", icon: IconComponent },
  { id: "events", label: "Events", icon: IconComponent },
  { id: "new", label: "New", icon: IconComponent },
  { id: "profile", label: "Profile", icon: IconComponent },
]
```

#### 3. Left Sidebar (Desktop Primary)
**Component:** `components/layout/LeftSidebar.tsx`
- **Visibility:** Context-specific (most organizer pages)
- **Position:** Fixed left, 200px width on desktop
- **Mobile:** Drawer with overlay (toggled by menu button)
- **Types:**
  - **Filter-based:** Content filtering without URL change
  - **Tab-based with URL:** Navigation with `?tab=` query params
  - **Tab-based without URL:** State-only navigation
  - **None:** Full-width layouts (e.g., Create Event)

---

## 🗺️ Navigation Patterns

### Pattern 1: Filter-based Sidebar
**Used in:** Dashboard, Events List
**Behavior:** Filters content without changing URL

```tsx
const [activeSidebar, setActiveSidebar] = useState("all");

const filteredData = useMemo(() => {
  return data.filter(item => matchesFilter(item, activeSidebar));
}, [activeSidebar, data]);

<LeftSidebar
  activeItem={activeSidebar}
  onItemClick={setActiveSidebar}  // No router.push
/>
```

### Pattern 2: Tab-based with URL
**Used in:** Event Detail
**Behavior:** Changes content and updates URL with query param

```tsx
const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");

const handleTabChange = (tabId: string) => {
  setActiveTab(tabId);
  router.push(`/organizer/events/${id}?tab=${tabId}`);
};

<LeftSidebar
  activeItem={activeTab}
  onItemClick={handleTabChange}
/>
```

### Pattern 3: Tab-based without URL
**Used in:** Profile
**Behavior:** Changes content without updating URL

```tsx
const [activeTab, setActiveTab] = useState("profile");

<LeftSidebar
  activeItem={activeTab}
  onItemClick={(id) => {
    if (id === "logout") handleLogout();
    else setActiveTab(id);  // No router.push
  }}
/>
```

### Pattern 4: No Sidebar
**Used in:** Create Event
**Behavior:** Full-width layout with fixed action bar

```tsx
// No LeftSidebar component
// Layout: max-w-3xl centered
// Fixed bottom action bar with buttons
```

---

## 📏 Spacing System

### Container Spacing
```css
--container-max-width: 1400px
--page-padding: 24px (p-6)
--section-gap: 32px (gap-8)
```

### Component Spacing
- **Card padding:** 24px (p-6)
- **Section margins:** 32px (mb-8)
- **Element gaps:** 16px (gap-4)
- **Small gaps:** 8px (gap-2)

### Layout Measurements
- **Left Sidebar width:** 200px (desktop)
- **Bottom Nav height:** 80px
- **Top Header height:** ~60px
- **Mobile padding:** 16px (p-4)

---

## 🎯 Component Props Standards

### Required Props Pattern
All reusable components should follow this pattern:

```tsx
interface ComponentProps {
  // Required props (no defaults)
  id: string;

  // Optional props with defaults
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";

  // Optional customization
  className?: string;
  children?: React.ReactNode;
}

export function Component({
  id,
  variant = "primary",
  size = "md",
  className,
  children,
}: ComponentProps) {
  // Implementation
}
```

### Navigation Components Props

**BottomNav:**
```tsx
interface BottomNavProps {
  items?: NavItem[];  // Optional: custom items or default
  activeItem: string;
  onItemClick: (id: string) => void;
}
```

**LeftSidebar:**
```tsx
interface LeftSidebarProps {
  items?: SidebarItem[];  // Optional: custom items or default
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen: boolean;  // Mobile drawer state
  onClose: () => void;
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
sm:  640px  /* Small devices */
md:  768px  /* Tablets */
lg:  1024px /* Desktops */
xl:  1280px /* Large desktops */
```

### Mobile-First Approach
- Start with mobile layout
- Use `md:` prefix for tablet+
- Use `lg:` prefix for desktop+

### Sidebar Behavior
- **Desktop (≥768px):** Fixed left sidebar (200px), always visible
- **Mobile (<768px):** Drawer with overlay, toggled by menu button

### Grid Systems
**Event Cards:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Stat Cards:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

---

## 🖼️ Image Standards

### Event Covers
- **Aspect ratio:** 16:9
- **Recommended size:** 1200x675px
- **Max file size:** 2MB
- **Formats:** JPG, PNG, WebP
- **Optimization:** Always use next/image for optimization

### Avatar Images
- **Aspect ratio:** 1:1 (square)
- **Recommended size:** 400x400px
- **Max file size:** 500KB

### Image Upload Component
```tsx
<ImageUpload
  value={file}
  onChange={setFile}
  error={errors.cover}
/>
```

---

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- All interactive elements must be keyboard accessible
- Focus indicators must be visible

### Semantic HTML
```tsx
// ✅ Good
<nav>...</nav>
<main>...</main>
<button>...</button>
<h1>...</h1>

// ❌ Bad
<div onClick={...}>...</div>
<span className="heading">...</span>
```

### ARIA Labels
```tsx
<button aria-label="Open menu">...</button>
<input aria-describedby="error-message" />
<div role="alert" aria-live="polite">...</div>
```

---

## 📊 Data Visualization Standards

### Chart Colors
Always use the 4 data visualization colors in this order:
1. **Primary:** Coral (#e66467)
2. **Secondary:** Orange (#f29639)
3. **Tertiary:** Dark Blue (#315771)
4. **Quaternary:** Teal (#409f9c)

### Chart Types
- **Bar charts:** Monthly/weekly comparisons
- **Line charts:** Trends over time
- **Donut charts:** Distribution percentages
- **Progress bars:** Completion/capacity tracking

### Chart Standards
- Always include labels and values
- Use consistent spacing and padding
- Include grid lines for readability
- Provide legends for multi-series charts

---

## 🧪 Code Standards

### File Naming
- **Components:** PascalCase (`EventCard.tsx`)
- **Pages:** lowercase (`page.tsx`, `layout.tsx`)
- **Utils:** camelCase (`formatDate.ts`)
- **Types:** PascalCase (`types.ts` with PascalCase exports)

### Import Order
```tsx
// 1. React & Next.js
import { useState } from "react";
import { useRouter } from "next/navigation";

// 2. Third-party libraries
import { cn } from "@/lib/utils";

// 3. Components
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";

// 4. Types & Utils
import type { Event } from "@/types";
```

### Component Structure
```tsx
"use client";  // If needed

import ...

// Types/Interfaces
interface Props {
  ...
}

// Component
export function ComponentName({ props }: Props) {
  // 1. Hooks
  const [state, setState] = useState();
  const router = useRouter();

  // 2. Handlers
  const handleClick = () => { ... };

  // 3. Effects
  useEffect(() => { ... }, []);

  // 4. Render helpers (if complex)
  const renderContent = () => { ... };

  // 5. Return JSX
  return (
    ...
  );
}
```

---

## 🔒 Security Standards

### Input Validation
- Always validate user input on both client and server
- Sanitize HTML content
- Use TypeScript for type safety

### Authentication
- Use secure session management
- Implement CSRF protection
- Follow OAuth 2.0 best practices

### Data Handling
- Never expose sensitive data in URLs
- Use environment variables for secrets
- Implement proper error handling without exposing system details

---

## 🚀 Performance Standards

### Code Splitting
- Use dynamic imports for large components
- Lazy load below-the-fold content
- Separate vendor bundles

### Image Optimization
- Always use `next/image` component
- Provide width and height attributes
- Use appropriate formats (WebP preferred)

### Caching Strategy
- Cache static assets
- Use SWR or React Query for data fetching
- Implement optimistic updates

---

## 📝 Documentation Standards

### Component Documentation
Each component should include:
- Purpose and usage description
- Props interface with JSDoc comments
- Example usage
- Accessibility notes

### Code Comments
```tsx
// ✅ Good: Explains WHY, not WHAT
// Filter out checked-in participants to avoid duplicate scans
const availableParticipants = participants.filter(p => p.status !== "checked-in");

// ❌ Bad: States the obvious
// Filter participants
const availableParticipants = participants.filter(p => p.status !== "checked-in");
```

---

## ✅ Quality Checklist

Before committing code, ensure:
- [ ] TypeScript: No type errors
- [ ] Linting: No ESLint warnings
- [ ] Formatting: Prettier formatted
- [ ] Accessibility: ARIA labels where needed
- [ ] Responsive: Tested on mobile and desktop
- [ ] Performance: No unnecessary re-renders
- [ ] Documentation: Comments for complex logic

---

## 🎯 Summary

**Design System:** TripGlide (monochrome + 4 data colors)
**Framework:** Next.js 14 App Router + TypeScript
**Navigation:** Islands pattern (Top Header, Bottom Nav, Left Sidebar)
**Responsive:** Mobile-first with md: and lg: breakpoints
**Accessibility:** WCAG 2.1 AA compliant
**Code Quality:** TypeScript, ESLint, Prettier

**Status:** ✅ MVP Standards Established

---

*Last updated: February 5, 2026*
