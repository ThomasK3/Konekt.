# Konekt. - Project Structure

> **Complete overview of the application architecture and page organization**

---

## 📂 Application Routes

### Public Routes (Top Header Navigation)

#### 1. Home Page (`/`)
**File:** `app/page.tsx`
**Type:** Marketing/Landing Page
**Navigation:** Top Header (visible)
**Layout:** Full-width, no sidebars

**Sections:**
- Hero with value proposition and CTAs
- Statistics showcase (10K+ events, 500K+ participants, etc.)
- Features grid (6 key features)
- How It Works (3-step process)
- Testimonials (3 customer reviews)
- Final CTA section
- Footer

**Purpose:** Convert visitors into users, explain platform benefits

---

#### 2. Playground (`/playground`)
**File:** `app/playground/page.tsx`
**Type:** Design System Showcase
**Navigation:** Top Header (visible)
**Layout:** Left Sidebar with section navigation

**Sections:**
- Typography examples
- Color system showcase
- Button variants and sizes
- Form elements (inputs, labels, errors)
- Card layouts
- Icon set
- Data visualization with graphs

**Purpose:** Test and showcase TripGlide design system components

---

#### 3. Test Layout (`/test-layout`)
**File:** `app/test-layout/page.tsx`
**Type:** Development/Testing Page
**Navigation:** Top Header (visible)
**Layout:** Bottom Nav + Left Sidebar (demo implementation)

**Purpose:** Testing ground for navigation patterns and layout structures
**Note:** This was used to prototype the islands navigation system

---

### Organizer Routes (Islands Navigation)

All `/organizer/*` routes hide the Top Header Navigation and use the Islands pattern:
- **Bottom Nav:** Fixed navigation (Dashboard, Events, New, Profile)
- **Left Sidebar:** Context-specific navigation (filters or tabs)

---

#### 4. Dashboard (`/organizer/dashboard`)
**File:** `app/organizer/dashboard/page.tsx`
**Bottom Nav Active:** `dashboard`
**Left Sidebar Type:** Filter-based
**Sidebar Items:** Overview, Upcoming, Past Events, Drafts

**Content:**
- Stats grid (4 cards: Active Events, Total Registrations, Past Events, Drafts)
- Quick actions section
- Recent events list (filtered by sidebar selection)
- Activity timeline

**Navigation Pattern:** Filter-based (no URL change)

---

#### 5. Events List (`/organizer/events`)
**File:** `app/organizer/events/page.tsx`
**Bottom Nav Active:** `events`
**Left Sidebar Type:** Filter-based
**Sidebar Items:** All Events, Live Now, Upcoming, Past Events, Drafts

**Content:**
- Events header with filter description
- Event cards grid (3 columns on desktop)
- Each card shows: cover image, title, date/time, participants, location, status badge
- Click to navigate to Event Detail

**Navigation Pattern:** Filter-based (no URL change)

---

#### 6. Event Detail (`/organizer/events/[id]`)
**File:** `app/organizer/events/[id]/page.tsx`
**Bottom Nav Active:** `events` (stays on Events!)
**Left Sidebar Type:** Tab-based with URL
**Sidebar Items:** Overview, Program, Participants, Check-in

**Layout:**
- EventHeader (cover image, event info, back button)
- Tab content (changes based on ?tab= query param)

**Tab Components:**
- **Overview:** Stats, event info with edit mode, quick actions, danger zone
- **Program:** Session builder (add/edit/delete sessions)
- **Participants:** Registration table with search, filter, export CSV
- **Check-in:** QR scanner with real-time check-in tracking

**Navigation Pattern:** Tab-based with URL (`?tab=overview|program|participants|checkin`)

---

#### 7. Create Event (`/organizer/events/new`)
**File:** `app/organizer/events/new/page.tsx`
**Bottom Nav Active:** None (no Bottom Nav shown)
**Left Sidebar Type:** None (no sidebar)
**Layout:** Full-width form (max-w-3xl centered)

**Content:**
- 3 form cards:
  1. Event Basics (name, cover image)
  2. Event Details (description, date, time, location, capacity)
  3. Event Settings (registration deadline, visibility)
- Fixed bottom action bar (Cancel, Save as Draft, Create Event)

**Navigation Pattern:** No sidebar (full-width form)

---

#### 8. Profile (`/organizer/profile`)
**File:** `app/organizer/profile/page.tsx`
**Bottom Nav Active:** `profile`
**Left Sidebar Type:** Tab-based without URL
**Sidebar Items:** Profile, Settings, Logout

**Tab Content:**
- **Profile:** Personal info with edit mode, avatar upload, account actions
- **Settings:** Notifications (email/SMS toggles), Preferences (language, timezone)
- **Logout:** Special handler (not a tab, triggers logout action)

**Navigation Pattern:** Tab-based without URL (state-only)

---

## 🗺️ Route Map

```
/                              → Home (Landing Page)
├── /playground                → Design System Showcase
├── /test-layout               → Layout Testing (dev only)
└── /organizer                 → Protected Routes (Islands Navigation)
    ├── /dashboard             → Dashboard Overview
    ├── /events                → Events List
    │   ├── /new               → Create Event Form
    │   └── /[id]              → Event Detail
    │       ├── ?tab=overview      → Overview Tab
    │       ├── ?tab=program       → Program Tab
    │       ├── ?tab=participants  → Participants Tab
    │       └── ?tab=checkin       → Check-in Tab
    └── /profile               → User Profile & Settings
        ├── (profile tab)          → Personal Information
        ├── (settings tab)         → Preferences & Notifications
        └── (logout)               → Logout Action
```

---

## 🧩 Component Structure

### Layout Components

```
components/layout/
├── Navigation.tsx          → Top Header (public pages only)
├── BottomNav.tsx           → Bottom Navigation (organizer pages)
└── LeftSidebar.tsx         → Left Sidebar (context-specific)
```

### UI Components

```
components/ui/
├── Button.tsx              → Primary, Secondary, Danger buttons
├── Input.tsx               → Text inputs with labels & errors
├── ImageUpload.tsx         → Drag & drop image upload with preview
└── EmptyState.tsx          → Empty state placeholder
```

### Card Components

```
components/cards/
├── EventCard.tsx           → Event display card (with image)
├── StatCard.tsx            → Statistics card with trend indicator
└── Cell.tsx                → Generic content cell
```

### Feature Components

```
components/
├── EventHeader.tsx         → Event detail page header
└── tabs/
    ├── OverviewTab.tsx     → Event overview with stats & actions
    ├── ProgramTab.tsx      → Session management
    ├── ParticipantsTab.tsx → Registration table
    └── CheckinTab.tsx      → QR check-in interface
```

---

## 📐 Layout Patterns

### Public Pages Layout
```tsx
<html>
  <body>
    <Navigation />  {/* Top header with logo + nav links */}
    <main>
      {children}    {/* Full-width page content */}
    </main>
  </body>
</html>
```

### Organizer Pages Layout (Most Pages)
```tsx
<html>
  <body>
    {/* No Top Navigation */}
    <div className="min-h-screen bg-bg-page pb-20">
      <button />      {/* Mobile menu button (top-right) */}
      <LeftSidebar /> {/* Fixed left on desktop, drawer on mobile */}
      <main className="main-content">
        {children}    {/* Page content with left margin */}
      </main>
      <BottomNav />   {/* Fixed bottom navigation */}
    </div>
  </body>
</html>
```

### Create Event Layout (Exception)
```tsx
<html>
  <body>
    {/* No Top Navigation */}
    {/* No Left Sidebar */}
    {/* No Bottom Nav */}
    <main className="ml-0 mr-6 mt-6 mb-40">
      <div className="max-w-3xl mx-auto">
        {children}    {/* Full-width centered form */}
      </div>
    </main>
    <div className="fixed bottom-0 left-0 right-0">
      {/* Fixed action bar */}
    </div>
  </body>
</html>
```

---

## 🎯 Navigation Logic

### Top Header Navigation
- **Shows on:** `/`, `/playground`, `/test-layout`
- **Hides on:** `/organizer/*` routes
- **Implementation:** `components/layout/Navigation.tsx` checks pathname

```tsx
if (pathname.startsWith("/organizer")) {
  return null; // Hide on organizer routes
}
```

### Bottom Navigation
- **Shows on:** `/organizer/dashboard`, `/organizer/events`, `/organizer/events/[id]`, `/organizer/profile`
- **Hides on:** `/organizer/events/new` (Create Event)
- **Active Item Logic:**
  - Dashboard page: `activeItem="dashboard"`
  - Events List page: `activeItem="events"`
  - Event Detail page: `activeItem="events"` (stays on events!)
  - Profile page: `activeItem="profile"`

### Left Sidebar
- **Shows on:** All organizer pages except Create Event
- **Types:**
  1. **Filter-based:** Dashboard, Events List (no URL change)
  2. **Tab-based with URL:** Event Detail (updates ?tab=)
  3. **Tab-based without URL:** Profile (state-only)
  4. **None:** Create Event (no sidebar)

---

## 📊 Data Flow

### Mock Data (Current MVP)
All pages currently use mock data defined in the page components:
- Events: Static array of event objects
- Participants: Static array of participant objects
- Stats: Calculated from mock data

### Future: Supabase Integration
The data structure is designed to be easily replaced with Supabase queries:
- Events table → `events` array
- Participants table → `participants` array
- Real-time updates → WebSocket subscriptions

---

## 🎨 Design System

**System:** TripGlide
**Documentation:** See [WEB_STANDARDS.md](WEB_STANDARDS.md)

**Key Files:**
- `app/globals.css` - Global styles, utilities, component classes
- `tailwind.config.ts` - Tailwind configuration
- `WEB_STANDARDS.md` - Complete design system documentation

**Color Palette:**
- Monochrome: #212529, #6C757D, #FFFFFF, #F5F6F7, #E9ECEF
- Data Colors: #e66467, #f29639, #315771, #409f9c

---

## 📝 Documentation Files

```
PROJECT_STRUCTURE.md           → This file (project architecture)
WEB_STANDARDS.md               → Design system & coding standards
NAVIGATION_IMPLEMENTATION.md   → Navigation system implementation details
README.md                      → Project overview and setup
```

---

## ✅ Current Status

**Completed:**
- ✅ TripGlide design system implementation
- ✅ Islands navigation architecture
- ✅ All 5 organizer pages (Dashboard, Events, Event Detail, Create Event, Profile)
- ✅ Home landing page with marketing content
- ✅ Playground design system showcase
- ✅ Component library (buttons, cards, forms, etc.)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Comprehensive documentation

**Ready For:**
- 🔄 Supabase integration
- 🔄 Authentication system
- 🔄 Real event data
- 🔄 Payment processing
- 🔄 Email/SMS notifications

---

## 🚀 Getting Started

1. **Home Page:** Marketing landing page with CTAs to Dashboard
2. **Playground:** View all design system components and colors
3. **Organizer Dashboard:** Main hub for event management
4. **Create Event:** Build a new event with full form
5. **Events List:** View and filter all events
6. **Event Detail:** Manage specific event (4 tabs)
7. **Profile:** User settings and preferences

---

*Last updated: February 5, 2026*
