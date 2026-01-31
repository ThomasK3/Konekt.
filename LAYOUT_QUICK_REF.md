# Layout Quick Reference

Rychlá referenční příručka pro běžné layout úkoly.

---

## 🚀 Nová Stránka s Islands

```tsx
// 1. Vytvořit layout.tsx (bez top nav)
export default function PageLayout({ children }) {
  return <>{children}</>;
}

// 2. Page structure
export default function Page() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeSidebar, setActiveSidebar] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button */}
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

      {/* Left Sidebar */}
      <LeftSidebar
        activeItem={activeSidebar}
        onItemClick={setActiveSidebar}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Your content */}
      </main>

      {/* Bottom Nav */}
      <BottomNav
        activeItem={activeNav}
        onItemClick={setActiveNav}
      />
    </div>
  );
}
```

---

## 📐 Klíčové CSS Hodnoty

```css
/* Main Content */
.main-content {
  margin-left: 224px;     /* Desktop sidebar offset */
  margin-right: auto;     /* Centering */
  max-width: 1200px;      /* Content width */
  padding: 24px;          /* Internal spacing */
  margin-bottom: 100px;   /* Bottom nav space */
}

/* Mobile: 12px margins, no left offset */

/* Left Sidebar */
.sidebar-island {
  width: 208px;           /* Desktop */
  top: 50%;               /* Vertical center */
  transform: translateY(-50%);
  max-height: 70vh;
}

/* Bottom Nav */
.bottom-nav {
  bottom: 20px;           /* Desktop */
  z-index: 1000;
}

/* Mobile Menu Button */
position: fixed;
top: 12px;              /* top-3 */
right: 12px;            /* right-3 */
z-index: 50;            /* Nad overlay, stejně jako sidebar */
border: 1px solid;      /* border-border-light */
```

---

## 🎴 Komponenty

### Cell (Responsive Card)
```tsx
<Cell
  title="Title"
  subtitle="Subtitle"
  icon={<Icon />}
  actions={<Button size="sm">Edit</Button>}  // Wraps na mobile
  hover
>
  Content
</Cell>
```

**Klíč:** Actions mají `w-full sm:w-auto` → wrap na mobile

### EventCard (Image-First)
```tsx
<EventCard
  title="Event"
  subtitle="📅 Date • ⏰ Time"
  imageSrc="https://..."
  imageAlt="Alt text"
  meta={<div>Icons and info</div>}
/>
```

---

## 📱 Responsive Pattern

```tsx
// Wrap element na mobile, inline na desktop
<div className="w-full sm:w-auto">

// Hide na mobile, show na desktop
<div className="hidden md:flex">

// Different spacing
<div className="gap-3 md:gap-4">

// Full width mobile, fixed desktop
<div className="w-full md:w-64">
```

---

## ✨ Scroll Tracking

```tsx
useEffect(() => {
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

  ["section1", "section2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

---

## 🚨 Rychlé Opravy

| Problém | Řešení |
|---------|--------|
| Content přilehlý k sidebaru | `padding-left: 24px` na `.main-content` |
| Content není vycentrovaný | `margin-right: auto` na `.main-content` |
| Sidebar překrývá header | `top: 50%` + `translateY(-50%)` |
| Button overflow na mobile | `w-full sm:w-auto` na actions wrapper |
| Menu button překrývá logo | `right-3` místo `left-3` |
| Menu button překrytý overlay | `z-50` místo `z-30` |

---

## 📏 Spacing

```
12px  - Mobile margins
24px  - Desktop spacing, padding
48px  - Large spacing
100px - Bottom nav clearance (desktop)
80px  - Bottom nav clearance (mobile)
224px - Sidebar offset
```

---

## 🎯 Z-Index Hierarchy

```
1000 - Bottom Nav
50   - Left Sidebar (mobile) + Mobile Menu Button
40   - Drawer Overlay
10   - Left Sidebar (desktop)
```

**Klíč:** Menu button má z-50 aby byl viditelný i když je drawer otevřený

---

## ✅ Pre-Launch Checklist

- [ ] Mobile menu button `top-3 right-3 z-50`
- [ ] Menu button toggle mezi hamburger/křížek
- [ ] Menu button má border pro viditelnost
- [ ] Sidebar vertical center desktop
- [ ] Sidebar BEZ internal close button
- [ ] Main content `margin-left: 224px`
- [ ] Bottom spacing `pb-20` nebo `mb-100`
- [ ] Test 375px, 768px, 1440px
- [ ] Card actions wrap properly
- [ ] No horizontal scroll
