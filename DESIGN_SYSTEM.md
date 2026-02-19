# Konekt. Design System - "Warm Community Edition"

> **Philosophy:** Human-centric, Energetic, Soft & Approachable.
> **Core Rule:** "Soft over Hard" & "Depth over Borders".
> **Visuals:** No sharp edges, no pure black text, no harsh borders. Use shadows and gradients to create depth.

---

## 1. The "Juicy" Palette (Colors)

We strictly avoid standard black or gray. We use **Dark Blue** for text and **Off-White** for backgrounds.

### Brand Colors (The Warm 4)
| Semantic Name | Tailwind Class | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `bg-coral` | `#E66467` | **Primary Action**, Key CTA, Notification dots |
| **Secondary** | `bg-orange` | `#F29639` | **Energy**, Gradients, Hover states, Tags |
| **Text Base** | `text-darkblue`| `#315771` | **Base Text**, Headings, Navigation icons |
| **Accent** | `bg-teal` | `#409F9C` | **Success**, Secondary buttons, Charts |

### Neutral Surfaces
| Semantic Name | Tailwind Class | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `bg-background`| `#F4F7F9` | **Main Page Background** (Blue-ish Grey tint) |
| **Surface** | `bg-surface` | `#FFFFFF` | **Cards** (Floating on Page Bg) |
| **Input** | `bg-input` | `#EFF4F7` | **Form Fields** (Darker than card, inner depth) |

### Text Hierarchy
* **Primary Text:** `text-darkblue` (#315771) - Headings, Body.
* **Secondary Text:** `text-darkblue/60` (Slate Blue) - Meta data, Labels.
* **Tertiary Text:** `text-darkblue/40` (Light Blue) - Placeholders.

---

## 2. Component Rules (Strict)

### A. Buttons (Juicy & Touchable)
* **Shape:** Always `rounded-full` (Pill shape).
* **Primary Button:**
    * Background: `bg-gradient-warm` (Linear gradient Coral → Orange).
    * Text: White, Font-weight 700.
    * Shadow: `shadow-glow` (Colored shadow, not black).
    * Hover: `hover:scale-105` + `hover:shadow-float`.
    * Active: `active:scale-95`.
* **Secondary Button:**
    * Background: `bg-darkblue/5`.
    * Text: `text-darkblue`.
* **Ghost Button:**
    * Background: Transparent.
    * Text: `text-coral`.

### B. Cards (Floating)
* **Border:** `border-none` (Strictly NO borders).
* **Shadow:** `shadow-card` (Soft blue tint).
* **Background:** `bg-surface` (White).
* **Radius:** `rounded-2xl` (20px) or `rounded-3xl` (32px).
* **Hover Effect:** `hover:-translate-y-1` + `transition-all`.

### C. Inputs (Friendly Forms)
* **Style:** Filled, not outlined.
* **Background:** `bg-input` (#EFF4F7).
* **Border:** `border-transparent` by default.
* **Radius:** `rounded-xl` (12px).
* **Height:** Minimum `h-11` or `h-12`.
* **Focus:** `ring-2 ring-coral/20 bg-surface`.

### D. Typography (Plus Jakarta Sans)
* **Headings:** `font-bold` (700) or `font-extrabold` (800). `tracking-tight`.
* **Body:** `font-medium` (500) - needed for readability on off-white backgrounds.

---

## 3. Gradients (The Juice)
* **Warm Gradient:** `bg-gradient-to-br from-coral to-orange` (Use for Primary Actions).
* **Cool Gradient:** `bg-gradient-to-br from-teal to-darkblue` (Use for backgrounds).

---

## 4. Micro-interactions
* **Click:** `active:scale-95` (tactile feedback).
* **Hover:** `hover:-translate-y-0.5` (subtle lift).
* **Loading:** Pulse animation in `bg-input` color.