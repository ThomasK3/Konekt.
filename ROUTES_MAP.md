# Konekt. - Routes Map

> **Complete overview of all application routes and navigation structure**

---

## 📂 Route Structure

```
app/
├── page.tsx                                    → / (Landing Page)
├── playground/
│   └── page.tsx                                → /playground (Design System)
├── test-layout/
│   └── page.tsx                                → /test-layout (Testing Only)
└── organizer/
    ├── dashboard/
    │   └── page.tsx                            → /organizer/dashboard ✅
    ├── events/
    │   ├── page.tsx                            → /organizer/events ✅
    │   ├── new/
    │   │   └── page.tsx                        → /organizer/events/new ✅
    │   └── [id]/
    │       └── page.tsx                        → /organizer/events/[id] ✅
    └── profile/
        └── page.tsx                            → /organizer/profile ✅
```

---

## 🌐 Public Routes (Top Header Navigation)

### 1. Landing Page
**Route:** `/`
**File:** [app/page.tsx](app/page.tsx)
**Layout:** Top Header + Full Landing Page
**Sections:**
- Hero with CTAs ("Get Started Free" → Dashboard)
- Stats showcase (10K+ events, 500K+ participants)
- Features grid (6 features)
- How It Works (3 steps)
- Testimonials (3 reviews)
- CTA section + Footer

**Navigation:**
- "Get Started Free" button → `/organizer/dashboard`
- "View Demo" button → `/playground`

---

### 2. Playground
**Route:** `/playground`
**File:** [app/playground/page.tsx](app/playground/page.tsx)
**Layout:** Top Header + Left Sidebar + Content
**Purpose:** Design system showcase with all components

**Sections:**
- Typography
- Colors (Monochrome + Data Viz + Gradients)
- Data Visualization (Charts with gradients)
- Buttons
- Badges
- Event Cards
- Simple Cards
- Inputs

---

### 3. Test Layout
**Route:** `/test-layout`
**File:** [app/test-layout/page.tsx](app/test-layout/page.tsx)
**Layout:** Bottom Nav + Left Sidebar + Content
**Purpose:** Development testing only (navigation patterns demo)

---

## 🎯 Organizer Routes (Islands Navigation)

All `/organizer/*` routes hide Top Header and use Islands pattern:
- **Bottom Nav:** Fixed navigation (Dashboard, Events, New, Profile)
- **Left Sidebar:** Context-specific (filters or tabs)

---

### 4. Dashboard
**Route:** `/organizer/dashboard`
**File:** [app/organizer/dashboard/page.tsx](app/organizer/dashboard/page.tsx)
**Bottom Nav Active:** `dashboard`
**Left Sidebar:** Filter-based (Overview, Upcoming, Past Events, Drafts)

**Content:**
- Stats grid (4 cards: Active Events, Total Registrations, Past Events, Drafts)
- Quick actions section
- Recent events list (filtered by sidebar)
- Activity timeline

**Navigation Pattern:** Filter-based (no URL change)

---

### 5. Events List
**Route:** `/organizer/events`
**File:** [app/organizer/events/page.tsx](app/organizer/events/page.tsx)
**Bottom Nav Active:** `events`
**Left Sidebar:** Filter-based (All Events, Live Now, Upcoming, Past Events, Drafts)

**Content:**
- Events header with filter description
- Event cards grid (3 columns desktop, 1 mobile)
- Each card: cover image, title, date/time, participants, location, status badge
- Click → Navigate to Event Detail

**Navigation Pattern:** Filter-based (no URL change)

---

### 6. Event Detail
**Route:** `/organizer/events/[id]`
**Example:** `/organizer/events/123`
**File:** [app/organizer/events/[id]/page.tsx](app/organizer/events/[id]/page.tsx)
**Bottom Nav Active:** `events` (stays on Events!)
**Left Sidebar:** Tab-based with URL (Overview, Program, Participants, Check-in)

**Layout:**
- EventHeader component (cover image, event info, back button)
- Tab content changes based on `?tab=` query param

**Tabs:**
- **Overview** (`?tab=overview` or default):
  - Stats grid
  - Event info with edit mode
  - Quick actions
  - Danger zone

- **Program** (`?tab=program`):
  - Session builder
  - Add/edit/delete sessions
  - Chronological sorting

- **Participants** (`?tab=participants`):
  - Registration table with search
  - Filter by status
  - Export CSV
  - Stats summary

- **Check-in** (`?tab=checkin`):
  - QR scanner interface
  - Mock check-in functionality
  - Real-time stats
  - Recent check-ins list

**Navigation Pattern:** Tab-based with URL (`?tab=overview|program|participants|checkin`)

---

### 7. Create Event
**Route:** `/organizer/events/new`
**File:** [app/organizer/events/new/page.tsx](app/organizer/events/new/page.tsx)
**Bottom Nav Active:** None (hidden)
**Left Sidebar:** None (full-width layout)

**Layout:**
- Full-width centered form (max-w-3xl)
- 3 form cards:
  1. **Event Basics:** Name, cover image
  2. **Event Details:** Description, date, time, location, capacity
  3. **Event Settings:** Registration deadline, visibility
- Fixed bottom action bar (Cancel, Save as Draft, Create Event)

**Navigation Pattern:** No sidebar (full-width form)

---

### 8. Profile
**Route:** `/organizer/profile`
**File:** [app/organizer/profile/page.tsx](app/organizer/profile/page.tsx)
**Bottom Nav Active:** `profile`
**Left Sidebar:** Tab-based without URL (Profile, Settings, Logout)

**Tabs:**
- **Profile:** Personal info with edit mode, avatar upload, account actions
- **Settings:** Notifications (email/SMS toggles), Preferences (language, timezone)
- **Logout:** Special handler (triggers logout action, not a tab)

**Navigation Pattern:** Tab-based without URL (state-only)

---

## 🔗 Navigation Flow

### From Landing Page:
```
/ (Landing)
├─→ "Get Started Free" → /organizer/dashboard
├─→ "View Demo" → /playground
├─→ Footer "Dashboard" → /organizer/dashboard
└─→ Footer "Playground" → /playground
```

### Within Organizer:
```
/organizer/dashboard (Bottom Nav: Dashboard active)
├─→ Bottom Nav "Events" → /organizer/events
├─→ Bottom Nav "New" → /organizer/events/new
├─→ Bottom Nav "Profile" → /organizer/profile
└─→ Event card click → /organizer/events/[id]

/organizer/events (Bottom Nav: Events active)
├─→ Event card click → /organizer/events/[id]
├─→ Bottom Nav "Dashboard" → /organizer/dashboard
├─→ Bottom Nav "New" → /organizer/events/new
└─→ Bottom Nav "Profile" → /organizer/profile

/organizer/events/[id] (Bottom Nav: Events active)
├─→ Back button → /organizer/events
├─→ Tab clicks → ?tab=overview|program|participants|checkin
├─→ Bottom Nav "Dashboard" → /organizer/dashboard
├─→ Bottom Nav "New" → /organizer/events/new
└─→ Bottom Nav "Profile" → /organizer/profile

/organizer/events/new (No Bottom Nav)
├─→ Cancel → /organizer/events (or back to previous)
├─→ Save as Draft → /organizer/events (redirect after save)
└─→ Create Event → /organizer/events/[newId] (redirect to new event)

/organizer/profile (Bottom Nav: Profile active)
├─→ Logout → / (back to landing)
├─→ Bottom Nav "Dashboard" → /organizer/dashboard
├─→ Bottom Nav "Events" → /organizer/events
└─→ Bottom Nav "New" → /organizer/events/new
```

---

## ✅ Route Verification Checklist

### Public Routes:
- [x] `/` - Landing page loads with hero, features, testimonials
- [x] `/playground` - Design system with all components and gradients
- [x] `/test-layout` - Development testing page

### Organizer Routes:
- [x] `/organizer/dashboard` - Dashboard with stats and events
- [x] `/organizer/events` - Events list with filters
- [x] `/organizer/events/new` - Create event form
- [x] `/organizer/events/123` - Event detail with tabs (mock ID)
- [x] `/organizer/events/123?tab=overview` - Overview tab (default)
- [x] `/organizer/events/123?tab=program` - Program tab
- [x] `/organizer/events/123?tab=participants` - Participants tab
- [x] `/organizer/events/123?tab=checkin` - Check-in tab
- [x] `/organizer/profile` - Profile with settings

### Navigation:
- [x] Top Header visible on `/`, `/playground`, `/test-layout`
- [x] Top Header hidden on `/organizer/*`
- [x] Bottom Nav works on organizer pages (except Create Event)
- [x] Left Sidebar context-specific per page
- [x] All links navigate correctly

---

## 🎨 Layout Summary

### Landing Page Layout:
```
┌──────────────────────────────────────┐
│ [Top Header: Konekt. | Nav Links]   │
├──────────────────────────────────────┤
│                                      │
│         Landing Page Content         │
│    (Hero, Features, Testimonials)    │
│                                      │
├──────────────────────────────────────┤
│            [Footer]                  │
└──────────────────────────────────────┘
```

### Organizer Pages Layout (Most):
```
┌────────────┬─────────────────────────┐
│            │                         │
│   Left     │      Main Content       │
│  Sidebar   │                         │
│            │                         │
├────────────┴─────────────────────────┤
│        Bottom Nav (Fixed)            │
└──────────────────────────────────────┘
```

### Create Event Layout (Exception):
```
┌──────────────────────────────────────┐
│                                      │
│      Full-Width Centered Form        │
│           (max-w-3xl)                │
│                                      │
├──────────────────────────────────────┤
│    Fixed Action Bar (3 buttons)     │
└──────────────────────────────────────┘
```

---

## 📊 Route Count Summary

**Total Routes:** 8
- **Public Routes:** 3 (Landing, Playground, Test Layout)
- **Organizer Routes:** 5 (Dashboard, Events List, Event Detail, Create Event, Profile)

**Navigation Components:** 3
- Top Header Navigation (public pages only)
- Bottom Navigation (organizer pages)
- Left Sidebar (context-specific)

**Status:** ✅ **All Routes Implemented**

---

## 🚀 Quick Navigation Commands

```bash
# Development
npm run dev

# Visit routes directly:
open http://localhost:3000
open http://localhost:3000/playground
open http://localhost:3000/organizer/dashboard
open http://localhost:3000/organizer/events
open http://localhost:3000/organizer/events/new
open http://localhost:3000/organizer/events/123
open http://localhost:3000/organizer/profile
```

---

*Last updated: February 5, 2026*
