# Konekt Layout Guide - TripGlide Edition

## 📐 Layout System Overview

Tento dokument popisuje layoutovou architekturu projektu Konekt s TripGlide designem. Účelem je zajistit konzistentní implementaci napříč všemi stránkami.

---

## 🏗️ Základní Struktura

### Desktop Layout (≥768px)
```
┌─────────────────────────────────────────────┐
│ [Left Sidebar Island]  [Main Content]      │
│ (fixed, vertically     (centered, with     │
│  centered)              max-width)          │
│                                             │
│                    [Bottom Nav Island]      │
└─────────────────────────────────────────────┘
```

### Mobile Layout (<768px)
```
┌─────────────────────┐
│ [Hamburger - top R] │
│                     │
│  [Main Content]     │
│  (full width)       │
│                     │
│  [Bottom Nav]       │
└─────────────────────┘
```

---

## 🎯 Main Content Area (`.main-content`)

### CSS Definice
```css
.main-content {
  /* Desktop */
  margin-left: 224px;      /* Offset pro left sidebar */
  margin-right: auto;      /* Umožní centrování */
  margin-top: 24px;
  margin-bottom: 100px;    /* Prostor pro bottom nav */
  max-width: 1200px;       /* Maximální šířka contentu */
  padding-left: 24px;      /* Vnitřní odsazení */
  padding-right: 24px;
}

@media (max-width: 767px) {
  .main-content {
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 16px;
    margin-bottom: 80px;
    padding-top: 0;
  }
}
```

### ⚠️ Klíčové Body

1. **Margin vs Padding**
   - `margin-left: 224px` - vytváří prostor pro fixed left sidebar
   - `padding-left/right: 24px` - vnitřní odsazení, neovlivňuje layout child elementů
   - `margin-right: auto` - umožňuje centrování v dostupném prostoru

2. **Max-width**
   - Desktop: `1200px` pro čitelnost a vyvážený design
   - Mobile: full width minus small margins (12px)

3. **Bottom Spacing**
   - Desktop: `100px` pro floating bottom nav (20px bottom + 40px nav height + padding)
   - Mobile: `80px` pro menší bottom nav

---

## 🏝️ Left Sidebar Island

### Pozicování
```css
.sidebar-island {
  position: fixed;
  left: 0;

  /* Desktop: vertically centered */
  top: 50%;
  transform: translateY(-50%);

  /* Mobile: full height drawer */
  @media (max-width: 767px) {
    top: 0;
    height: 100%;
  }

  width: 208px;          /* 52 * 4 = 208px */
  max-height: 70vh;      /* Desktop max height */

  /* Asymetrické rohy - levé ostré, pravé zaoblené */
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
```

### ⚠️ Důležité
- **VŽDY fixed position** - nescrolluje s contentem
- **Vertikálně centrovaný na desktopu** - používej `top: 50%` + `translateY(-50%)`
- **Nikdy nepřekrývá header** - díky vertical centering
- **Mobile drawer** - animace pomocí `transform: translateX(-100%)` / `translateX(0)`
- **Žádný internal close button** - zavírání se řeší přes top-right menu button a overlay click

---

## 🧭 Bottom Navigation Island

### Pozicování
```css
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  /* Pill shape */
  border-radius: 100px;
  background: #212529;
  padding: 8px 16px;

  @media (max-width: 767px) {
    bottom: 12px;
    left: 12px;
    right: 12px;
    transform: none;
    width: calc(100% - 24px);
  }
}
```

### Nav Items
```css
.nav-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @media (max-width: 767px) {
    width: 36px;
    height: 36px;
  }
}
```

---

## 📱 Mobile Menu Button (Hamburger/Close)

### Implementace
```jsx
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-sm border border-border-light flex items-center justify-center"
  aria-label={sidebarOpen ? "Close menu" : "Open menu"}
>
  {sidebarOpen ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="4" x2="14" y2="14" />
      <line x1="14" y1="4" x2="4" y2="14" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="4" x2="16" y2="4" />
      <line x1="2" y1="14" x2="16" y2="14" />
    </svg>
  )}
</button>
```

### ⚠️ Klíčové Body
- **VŽDY v pravém horním rohu** (`top-3 right-3`)
- **Nikdy vlevo** - zabránění překrytí s header/logo
- **Z-index: 50** - stejný jako sidebar, nad overlay (40), viditelný i když je drawer otevřený
- **Toggle behavior** - mění se mezi hamburger ikonou a křížkem
- **Velikost: 36px (w-9 h-9)** - dostatečně velký touch target
- **Border** - `border border-border-light` pro lepší viditelnost
- **Žádný close button v sidebaru** - ten je nyní redundantní

---

## 🎴 Component Layouts

### Cell Component (Simple Cards)

```jsx
// Header wrapping behavior
<div className="flex flex-wrap items-start gap-3 mb-4">
  <div className="flex items-start gap-3 flex-1 min-w-0">
    {icon && <div className="w-12 h-12">...</div>}
    <div className="flex-1 min-w-0">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  </div>

  {/* Actions wrap na mobile */}
  {actions && (
    <div className="flex-shrink-0 w-full sm:w-auto sm:ml-auto">
      {actions}
    </div>
  )}
</div>
```

**Proč to funguje:**
- `flex-wrap` - umožní zabalení na mobile
- `w-full sm:w-auto` - full width na mobile → wrap, auto na desktopu
- `min-w-0` - prevence overflow u flex items
- `gap-3` - menší gap pro lepší responsive (původně gap-4)

---

## 📏 Spacing Scale

```css
/* Margins */
Mobile:   12px    (edges)
Desktop:  24px    (edges, vertical spacing)
Sidebar:  224px   (left offset)

/* Padding */
Container:  24px   (main-content internal)
Cards:      24px   (p-6 in Tailwind)
Sidebar:    20px   (p-5)

/* Gaps */
Small:   12px   (gap-3)
Medium:  16px   (gap-4)
Large:   24px   (gap-6)
```

---

## 🎨 Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 767px) {
  /* Mobile styles */
}

/* Desktop */
@media (min-width: 768px) {
  /* Desktop styles */
}
```

**⚠️ Kritické pravidlo:**
- Breakpoint je **768px** (Tailwind `md:`)
- Vše pod 768px = mobile (hamburger, drawer, full-width content)
- Vše nad 768px = desktop (visible sidebar, centered content)

---

## 🚨 Častá Úskalí a Řešení

### 1. Content Přilehlý k Left Sidebaru
**Problém:** Content začína hned vedle sidebaru bez prostoru.

**Řešení:**
```css
.main-content {
  margin-left: 224px;  /* Offset */
  padding-left: 24px;  /* Vnitřní prostor */
}
```

### 2. Content Off-Center
**Problém:** Content vypadá jako přilehlý k levému okraji.

**Řešení:**
```css
.main-content {
  margin-left: 224px;
  margin-right: auto;  /* ← Klíčové pro centrování */
  max-width: 1200px;
}
```

### 3. Button Overflow na Mobile
**Problém:** Buttony v Card headers přetékají mimo.

**Řešení:**
```jsx
<div className="flex flex-wrap items-start gap-3">
  <div className="flex-1 min-w-0">{/* Content */}</div>
  <div className="w-full sm:w-auto">{/* Button */}</div>
</div>
```

### 4. Sidebar Překrývá Header
**Problém:** Fixed sidebar má `top: 0` a překrývá horní navigaci.

**Řešení:**
```css
.sidebar-island {
  top: 50%;                    /* ← Vertikální střed */
  transform: translateY(-50%); /* ← Posun zpět */
}
```

### 5. Mobile Menu Button Překrytý Overlay
**Problém:** Hamburger/křížek je šedivě překrytý overlay když je drawer otevřený.

**Řešení:**
```jsx
<button className="fixed top-3 right-3 z-50"> {/* ← z-50 stejně jako sidebar */}
```

### 6. Mobile Menu Button Překrývá Logo
**Problém:** Menu button vlevo koliduje s logem/názvem.

**Řešení:**
```jsx
<button className="fixed top-3 right-3"> {/* ← Vždy vpravo */}
```

---

## ✅ Checklist pro Novou Stránku

Při vytváření nové stránky s islands layoutem:

- [ ] Vytvořit layout.tsx bez top navigation (pokud má islands)
- [ ] Použít `.main-content` třídu pro main wrapper
- [ ] Left sidebar má `top: 50%` + `translateY(-50%)` na desktopu
- [ ] Mobile menu button je `top-3 right-3 z-50` s toggle mezi hamburger/křížek
- [ ] Mobile menu button má border pro viditelnost
- [ ] Bottom nav má `z-index: 1000` a správný bottom spacing
- [ ] Mobile: `pb-20` na page wrapperu pro bottom nav prostor
- [ ] Card components používají `flex-wrap` pro responsive actions
- [ ] Sidebar má mobile drawer s overlay (`bg-black/40 z-40`)
- [ ] Sidebar NEMÁ internal close button (redundantní)
- [ ] Testovat na šířkách: 375px (mobile), 768px (breakpoint), 1440px (desktop)

---

## 🎯 Scroll-Based Navigation Tracking

Pokud máš sekce na stránce, které chceš trackovat v sidebaru:

```jsx
useEffect(() => {
  const sectionIds = ["section1", "section2", "section3"];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-100px 0px -60% 0px",
      threshold: [0, 0.3, 0.5, 0.7, 1],
    }
  );

  sectionIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
}, []);
```

**Parametry:**
- `rootMargin: "-100px 0px -60% 0px"` - Sekce se aktivuje když je 100px od vrchu viewportu
- `threshold: [0, 0.3, 0.5, 0.7, 1]` - Detekuje různé úrovně viditelnosti
- `intersectionRatio > 0.3` - Aktivuje se při 30% viditelnosti sekce

---

## 📦 Komponenty a Jejich Props

### BottomNav
```tsx
<BottomNav
  activeItem={activeNav}      // string: "home" | "events" | "new" | "profile"
  onItemClick={setActiveNav}  // (id: string) => void
/>
```

### LeftSidebar
```tsx
<LeftSidebar
  activeItem={activeSidebar}  // string: ID aktivní položky
  onItemClick={setActiveSidebar}  // (id: string) => void
  isOpen={sidebarOpen}        // boolean: mobile drawer state
  onClose={() => setSidebarOpen(false)}  // () => void
/>
```

### Cell (Simple Card)
```tsx
<Cell
  title="Card Title"
  subtitle="Optional subtitle"
  icon={<span>📅</span>}
  actions={<Button size="sm">Action</Button>}
  footer={<div>Footer content</div>}
  hover={true}  // Přidá hover efekt
>
  <p>Card content</p>
</Cell>
```

---

### Z-Index Hierarchy (Aktualizováno)
```
1000 - Bottom Nav
50   - Left Sidebar (mobile) + Mobile Menu Button
40   - Drawer Overlay
10   - Left Sidebar (desktop)
```

**Důležité:** Mobile menu button má `z-50` aby byl viditelný nad overlay když je drawer otevřený.

---

## 🔧 Troubleshooting

### Layout vypadá správně na desktopu, ale rozbíjí se na mobile
→ Zkontroluj, že máš responsive breakpoints (`md:`) a mobile-first přístup

### Content je příliš široký/úzký
→ Zkontroluj `max-width` a `padding` na `.main-content`

### Sidebar překrývá ostatní obsah
→ Zkontroluj `z-index` hierarchy: drawer overlay (40), sidebar + menu button (50), bottom nav (1000)

### Mobile menu button je překrytý overlay
→ Ujisti se, že má `z-50` (stejně jako sidebar)

### Scrolling se chová divně s islands
→ Ujisti se, že `position: fixed` je správně aplikován a `overflow-y: auto` je na sidebaru

### Button v Card se nepřizpůsobuje mobile
→ Zkontroluj, že header má `flex-wrap` a actions mají `w-full sm:w-auto`

---

## 📚 Další Zdroje

- **Design System:** `/DESIGN_SYSTEM.md`
- **Tailwind Config:** `/tailwind.config.ts`
- **Global Styles:** `/app/globals.css`
- **Layout Components:** `/components/layout/`

---

**Vytvořeno:** 31.1.2025
**Poslední Update:** 31.1.2025
**Autor:** Claude + Tomas
