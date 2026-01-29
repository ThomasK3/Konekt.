# Konekt MVP - Technical Specification

> **Phase 1: Minimum Viable Product for March 2026 Demo**

---

## 🎯 MVP Goal

Build a **functional, polished demo** that proves the core value proposition:
- Organizers can set up an event in 10 minutes
- Attendees have everything in one place
- QR check-in works flawlessly (WOW moment)
- Networking is simple and effective

**NOT building:** Full production system with payments, advanced analytics, messaging, or app store deployment.

**Building:** Impressive demo that wins competitions and attracts first clients.

---

## ✅ Must-Have Features (Phase 1)

### For ORGANIZERS:

#### 1. Event Setup
**Single-page form, maximum simplicity:**
- Event name
- Date + time
- Location (address + optional map embed)
- Short description (max 500 chars)
- Cover image (upload or select from library)
- Capacity (max participants)
- Visibility: Public / Private / Invite-only

**Result:** Event created in under 10 minutes.

#### 2. Program/Agenda Builder
**Drag & drop or simple list management:**
- Add session (name, time start/end, room/stage)
- Add speaker (name, photo, short bio)
- Reorder sessions (drag & drop or up/down buttons for mobile)
- Edit/delete sessions
- Preview: How attendees will see the program

**Result:** Clean, professional event schedule.

#### 3. Participant Management
**Organizer dashboard view:**
- List of registered participants (name, email, registration status)
- Export to CSV
- Manual add participant (for offline registrations)
- Basic stats:
  - Total registered
  - Checked in
  - Capacity remaining

**Result:** Clear visibility into who's coming.

#### 4. Event Sharing & QR Generation
**Multiple sharing methods:**
- **QR Code:** Generate unique QR for event (visual sharing - posters, slides)
- **Short Link:** konekt.app/e/ABC123 (shareable URL for email, WhatsApp, social media)
- **Invite Code:** ABC123 (verbal/text sharing - attendee enters on homepage)
- Preview: How the invite looks to recipients
- Analytics: Track which sharing method drives most registrations (optional)

**Use cases:**
- QR on physical poster at venue entrance
- Link in email newsletter or LinkedIn post
- Code announced verbally at previous event

**Result:** Flexible event promotion across channels.

#### 5. QR Code Check-in
**The WOW feature:**
- Generate unique QR code for event
- QR scanner using device camera
- Scan attendee's QR → instant check-in
- Real-time update of check-in count
- Works offline (local cache, sync when online)

**Result:** Professional, fast, impressive check-in experience.

---

### For ATTENDEES:

#### 1. Event Discovery/Registration
**Public event browsing OR direct invite link:**
- Browse list of public events
- See basic info (name, date, location, capacity)
- "Register" button → simple form:
  - Name
  - Email
  - Company (optional)
  - Role (optional)
- Confirmation page + email with event details
- Add to calendar option

**Result:** Easy, friction-free registration.

#### 2. My Event View
**Main screen for registered attendee:**
- Cover image + event info (date, time, location)
- Full program/agenda (sessions, speakers, times)
- Quick access to "My QR Code" button (prominent)
- Participant count (e.g., "47 people registered")
- Link to participant list

**Result:** All event info in one place.

#### 3. My QR Code
**One-tap access for check-in:**
- Large, full-screen QR code
- Name displayed below QR
- "Ready for check-in" message
- Works offline

**Result:** Instant check-in at event entrance.

#### 4. Participant List (Networking)
**Discovery before/during event:**
- Scrollable list of attendees
- Basic filter/search (by company, role)
- Each person shows:
  - Name
  - Company + Role
  - Profile photo
  - LinkedIn link (if provided)
- Tap person → see profile
- "Connect on LinkedIn" button (opens LinkedIn app/web)

**Result:** Easy networking, leveraging LinkedIn (no in-app messaging).

#### 5. Participant Profile
**Minimal profile view:**
- Name
- Company + Role
- Profile photo
- LinkedIn link
- "Connect on LinkedIn" button (external link)

**Result:** Simple connection point, no complexity.

---

## 🚫 Explicitly NOT in MVP

These features are important but NOT needed for demo:

❌ **In-app messaging** - Use WhatsApp/Telegram/LinkedIn  
❌ **Social feed/posts** - No critical mass yet  
❌ **Advanced analytics** - Basic stats only  
❌ **Payment integration** - Not selling yet  
❌ **Multi-language** - English/Czech only for now  
❌ **Email notifications** - Manual confirmations OK for demo  
❌ **Push notifications** - Not critical for Phase 1  
❌ **App store deployment** - Web app sufficient for demo  
❌ **OAuth/Social login** - Email/password enough  
❌ **Admin panel** - Organizer IS the admin for their events  
❌ **White-label customization UI** - Manual configs in code  

**Principle:** Ship core functionality. Add complexity later based on real usage.

---

## 🧩 Architecture Philosophy: Modular Cells

**CRITICAL DESIGN DECISION:** Everything is built as self-contained, reusable "cells" (modules).

### Why Modular?
- ✅ **Flexibility:** Swap, rearrange, remove features easily
- ✅ **White-label ready:** Clients can pick which modules they want
- ✅ **Development speed:** Build once, use everywhere
- ✅ **Visual consistency:** Each module = standardized card format
- ✅ **Future-proof:** Easy to add new modules without refactoring

### Cell Architecture:
```typescript
// Every feature is a standalone cell
<EventInfoCell />      // Orange accent
<ProgramCell />        // Blue accent
<ParticipantListCell /> // Green accent
<QRCheckinCell />      // Purple accent
<StatsCell />          // Neutral grey
```

### Development Approach:
**Week 1: Build Component Library**
- Create `/library` or `/playground` page
- Build individual cells in isolation
- Test appearance, functionality, interactions
- Perfect each module before composing pages

**Week 2+: Compose Pages from Cells**
- Dashboard = EventInfoCell + StatsCell + ActionButtons
- Event Detail = ProgramCell + ParticipantListCell + ...
- Each page = composition of pre-built cells

**Visual Design:**
- All cells are white cards on light-grey background (#F9FAFB)
- Rounded corners (16px)
- Soft shadow/glow effect
- Color-coded top border or icon per module type
- Consistent padding (24px internal)
- Gap between cells (16-24px)

---

## 🛠 Tech Stack

### Frontend:
- **Next.js 14** (App Router) - SSR, routing, performance
- **React 18** - Component architecture
- **TypeScript** - Type safety, better DX
- **Tailwind CSS** - Rapid styling, consistent design system
- **Shadcn/UI** - Pre-built accessible components (buttons, forms, dialogs)

**Why:** Modern, fast, great DX. TypeScript catches bugs early. Tailwind speeds up styling.

### Backend:
- **Supabase** - PostgreSQL database + Auth + Storage
  - Real-time subscriptions (for live check-in updates)
  - Row-level security (data isolation per organizer)
  - File storage (event images, user avatars)

**Why:** Fast setup, handles auth/DB/storage. No backend code needed for MVP.

### Deployment:
- **Vercel** - Next.js hosting, automatic deploys from Git
- **Custom domain** - konekt.app (to be purchased)

**Why:** Zero-config deployment, preview URLs for testing, fast global CDN.

### Development Tools:
- **Git/GitHub** - Version control, single repo with branches
- **Claude Code** - AI-assisted rapid development
- **VS Code** - Primary IDE

---

## 🏗 Architecture Overview

### User Roles:
```
┌─ ORGANIZER ──────────────────┐
│ • Creates events             │
│ • Manages participants       │
│ • Scans QR codes            │
│ • Views stats                │
└──────────────────────────────┘

┌─ ATTENDEE ───────────────────┐
│ • Discovers events           │
│ • Registers for events       │
│ • Views program              │
│ • Networks with participants │
│ • Gets checked in via QR     │
└──────────────────────────────┘
```

### Database Schema (simplified):

```sql
-- Users (both organizers and attendees)
users
├─ id (uuid, primary key)
├─ email (unique)
├─ name
├─ role (organizer | attendee)
├─ company (optional)
├─ job_title (optional)
├─ linkedin_url (optional)
├─ avatar_url (optional)
└─ created_at

-- Events
events
├─ id (uuid, primary key)
├─ organizer_id (foreign key → users)
├─ name
├─ description
├─ date_time
├─ location
├─ cover_image_url
├─ capacity
├─ visibility (public | private | invite-only)
├─ qr_secret (for check-in validation)
└─ created_at

-- Sessions (program items)
sessions
├─ id (uuid, primary key)
├─ event_id (foreign key → events)
├─ title
├─ start_time
├─ end_time
├─ room (optional)
├─ speaker_name (optional)
├─ speaker_bio (optional)
├─ speaker_photo_url (optional)
├─ order (for sorting)
└─ created_at

-- Registrations (attendee → event)
registrations
├─ id (uuid, primary key)
├─ event_id (foreign key → events)
├─ user_id (foreign key → users)
├─ status (registered | checked_in | cancelled)
├─ checked_in_at (timestamp)
├─ qr_code_data (unique per registration)
└─ created_at
```

**Relationships:**
- 1 User (organizer) → Many Events
- 1 Event → Many Sessions
- 1 Event → Many Registrations
- 1 User (attendee) → Many Registrations

---

## 📱 Screen Breakdown

### DEVELOPMENT PAGE:

**Component Library / Playground** - Sandbox for building and testing cells
- Grid of all available cells/modules
- Interactive preview of each cell type
- Toggle different states (loading, error, empty, filled)
- Test drag & drop (future)
- Visual style testing ground

**Purpose:** Build modules in isolation before composing real pages.

---

### ORGANIZER SIDE (Desktop-first):

**Layout Structure:**
```
┌─────────────┬─────────────────────────────────────┐
│             │                                     │
│ Left Nav    │  Main Content Area                  │
│             │                                     │
│ Dashboard   │  (Selected Page Content)            │
│ Create Event│                                     │
│ Settings    │                                     │
│             │                                     │
└─────────────┴─────────────────────────────────────┘
```

**Pages:**

1. **Dashboard** 
   - List of my events (cards with stats)
   - "Create Event" CTA button

2. **Create Event** 
   - Single-page form
   - Submit → redirects to Event Detail

3. **Event Detail** (Single Scrollable Page)
   - **ONE long page** with all modules vertically stacked:
   
   ```
   ┌─────────────────────────────────┐
   │ EVENT INFO CELL                 │ ← Top
   │ [Orange accent]                 │
   │ Name, Date, Location, Edit      │
   └─────────────────────────────────┘
   
   ┌─────────────────────────────────┐
   │ PROGRAM BUILDER CELL            │ ← Scroll down
   │ [Blue accent]                   │
   │ Sessions, Speakers, +Add        │
   └─────────────────────────────────┘
   
   ┌─────────────────────────────────┐
   │ QR GENERATOR CELL               │ ← Scroll down
   │ [Purple accent]                 │
   │ QR Code, Link, Code sharing     │
   └─────────────────────────────────┘
   
   ┌─────────────────────────────────┐
   │ PARTICIPANT MANAGEMENT CELL     │ ← Scroll down
   │ [Green accent]                  │
   │ List, Stats, Export, +Add       │
   └─────────────────────────────────┘
   
   ┌─────────────────────────────────┐
   │ QR CHECK-IN CELL                │ ← Scroll down
   │ [Purple accent]                 │
   │ Scanner, Recent scans, Stats    │
   └─────────────────────────────────┘
   ```
   
   **Optional Enhancement (Phase 2):**
   - Tab switcher at top: [Info] [Program] [Participants] [Check-in]
   - For users who prefer separated views
   - Default: Single scrollable page

4. **Settings** 
   - (Optional Phase 2: Profile edit)

---

### ATTENDEE SIDE (Mobile-first):

**Pages:**

1. **Discover Events** 
   - Browse public events
   - Enter invite code
   - Direct link entry

2. **My Events** 
   - List of events I'm registered for
   - Upcoming / Past sections

3. **Event Detail** (Single Scrollable Page)
   - **ONE long page** with all info vertically stacked:
   
   ```
   ┌─────────────────────────────────┐
   │ EVENT INFO                      │ ← Top
   │ Cover, Name, Date, Location     │
   │ Description, Program            │
   └─────────────────────────────────┘
   
   ┌─────────────────────────────────┐
   │ MY QR CODE CELL                 │ ← Scroll down
   │ Large QR for check-in           │
   │ One-tap access                  │
   └─────────────────────────────────┘
   
   ┌─────────────────────────────────┐
   │ PARTICIPANTS LIST CELL          │ ← Scroll down
   │ Networking, Search, Filter      │
   └─────────────────────────────────┘
   ```
   
   **Quick Access:**
   - Floating "Show My QR" button for instant access
   - Always visible during event day

4. **Participant Profile** (Modal or separate page)
   - View someone's details + LinkedIn link

5. **Settings** 
   - (Optional Phase 2: My profile edit)

---

**Total: ~8-10 core screens** 
- Simpler navigation with single-page layouts
- Less cognitive load (scroll vs. tabs)
- Mobile-friendly (natural scrolling)

---

## 🔄 User Flows

### Organizer Flow:
```
1. Sign up / Log in
   ↓
2. Dashboard (empty state: "Create your first event")
   ↓
3. Click "Create Event" (left nav)
   ↓
4. Fill form (name, date, location...) → Save
   ↓
5. Redirected to Event Detail page (single scrollable page)
   ↓
6. Event Info Cell at top (can edit anytime)
   ↓
7. Scroll down → Program Builder Cell → Add sessions
   ↓
8. Scroll down → QR Generator Cell → Share event (QR/Link/Code)
   ↓
9. Scroll down → Participant Management Cell → See registrations
   ↓
10. On event day: Scroll to QR Check-in Cell → Scan QR codes
   ↓
11. View real-time stats (checked in counter updates)
   ↓
12. After event: Scroll to Participant Management → Export CSV
```

**Navigation:**
- All cells on ONE page
- Scroll to access different functions
- Optional: Jump-to links at top (anchor navigation)

### Attendee Flow:
```
1. Receive invite link OR browse public events OR enter code
   ↓
2. Click event → See event detail page
   ↓
3. Click "Register" → Fill name, email, company
   ↓
4. Confirmation + Email sent
   ↓
5. Event Detail page loads (single scrollable page):
   - Event info at top (program, speakers, location)
   - Scroll down → My QR Code Cell
   - Scroll down → Participants List Cell
   ↓
6. Before event: Browse participants → Click profiles → Connect on LinkedIn
   ↓
7. On event day: Scroll to "My QR Code" (or use quick access button)
   ↓
8. Show QR at entrance → Get checked in by organizer
   ↓
9. During event: Scroll to Participants → Network with attendees
```

**Navigation:**
- All info on ONE page
- Natural scroll on mobile
- Quick access button for QR (floating/sticky)

---

## 🎨 Design System (High-Level)

**Theme:** Minimal with Modular Accents

### Visual Structure:
**Everything lives in "cards" (cells):**
```css
/* Page/Background */
background: #F9FAFB         /* Light grey - subtle, not pure white */

/* Individual Cards/Cells */
background: #FFFFFF         /* Pure white - stands out from page bg */
border-radius: 16px         /* Rounded, friendly (NOT sharp 0px) */
padding: 24px               /* Generous internal spacing */
box-shadow: 0 4px 12px rgba(0,0,0,0.08)  /* Soft glow/elevation */
gap: 16px-24px             /* Space between cards */
```

### Color Palette:
```css
/* Base */
--background: #F9FAFB       /* Page background - light grey */
--card-bg: #FFFFFF          /* Card/cell background - pure white */
--text-primary: #000000
--text-secondary: #666666

/* Module Accents (top border or icon background) */
--event-info: #FF6B35       /* Orange */
--program: #4A90E2          /* Blue */
--participants: #50C878     /* Green */
--checkin: #9B59B6          /* Purple */

/* UI Elements */
--border: #E5E7EB           /* Light grey borders */
--connection-line: #E5E7EB  /* Subtle grey for flow lines */
```

### Typography:
- **Font:** Inter (or SF Pro for Apple-like feel)
- **Headings:** 600-700 weight
- **Body:** 400 weight
- **Scale:** 12px, 14px, 16px, 20px, 24px, 32px

### Spacing:
- **Grid:** 4px base unit
- **Common:** 8px, 16px, 24px, 32px, 48px
- **Between cards:** 16px (tight) or 24px (comfortable)

### Module/Cell Structure:
```
┌─────────────────────────────────┐
│ 🎉 Module Title    [Orange icon]│ ← Colored accent
│─────────────────────────────────│
│                                 │
│  Content area                   │ ← White card interior
│  • List item                    │
│  • Another item                 │
│                                 │
│  [Action Button]                │
└─────────────────────────────────┘
  ↑                               ↑
Rounded corners (16px)    Soft shadow (glow)
```

**Detail:** See DESIGN_SYSTEM.md for exact values and component specs (to be created).

---

## 🏁 Development Priorities

### Week 1: Component Library / Cell Playground
- Create `/library` or `/playground` page (development sandbox)
- Build base Cell component (wrapper with styling)
- Create individual cells:
  - EventInfoCell (form + display modes)
  - ProgramCell (session list, add/edit)
  - ParticipantListCell (table/grid view)
  - QRDisplayCell (attendee's QR code)
  - QRScannerCell (organizer's camera scanner)
  - StatsCell (numbers, charts)
- Test each cell in isolation
- Perfect styling (cards, shadows, accents, responsive)

**Goal:** Library of polished, reusable modules ready to compose.

### Week 2: Database & Auth
- Supabase setup (tables, relationships, RLS)
- Basic auth (email/password)
- Connect cells to real data (not just mock)
- CRUD operations for events, sessions, registrations

**Goal:** Cells now work with real backend data.

### Week 3: Compose Real Pages
- Organizer Dashboard = compose cells
- Event Detail pages = different cell combinations
- Attendee views = reuse same cells, different context
- Routing between pages
- Basic navigation

**Goal:** Functional app assembled from pre-built cells.

### Week 4: Core Flows
- Event creation wizard (multi-step or single page)
- Registration flow (attendee → event)
- QR generation + scanning logic
- Check-in functionality (scan → update DB → real-time)
- Event sharing (QR, link, code)

**Goal:** All critical user flows work end-to-end.

### Week 5: Polish & Edge Cases
- Empty states (no events, no participants)
- Loading states (skeleton screens)
- Error handling (network errors, validation)
- Mobile responsiveness check
- Animations (subtle, not distracting)

**Goal:** Professional, bug-free experience.

### Week 6: Demo Prep
- Seed demo data (fake event with realistic participants)
- Practice presentation flow
- Fix last-minute bugs
- Performance optimization
- Deploy to production URL

**Goal:** Confident, impressive demo for March presentation.

---

## 🧪 Testing Strategy

**For MVP:**
- **Manual testing** - Click through all flows yourself
- **Friend testing** - Ask 2-3 people to try it, watch them struggle, fix issues
- **Demo rehearsal** - Practice presentation flow 5+ times

**NOT doing (yet):**
- Unit tests (too early, features changing rapidly)
- E2E tests (overkill for MVP)
- Load testing (no users yet)

**Principle:** Ship fast, test manually, iterate based on real feedback.

---

## 📊 Success Metrics (for MVP Demo)

**Qualitative:**
- ✅ "Wow, this actually solves my problem" reactions
- ✅ Organizers ask "When can I use this?"
- ✅ Judges/audience impressed by QR check-in demo
- ✅ Zero crashes during live demo

**Quantitative (if we get early users):**
- 1-3 real events created
- 10-50 real registrations
- QR check-in working at live event

**Demo Day Goals:**
- Present confidently without technical issues
- Show clear before/after (fragmentation vs unified)
- Get 3+ people to sign up as beta testers

---

## 🚧 Known Limitations (MVP)

These are acceptable trade-offs for speed:

⚠️ **No email automation** - Manual confirmations for now  
⚠️ **No push notifications** - Attendees check app manually  
⚠️ **Limited error handling** - Happy path works, edge cases minimal  
⚠️ **No offline mode** (except QR display) - Requires internet  
⚠️ **Single language** - English UI, Czech events OK  
⚠️ **No payment processing** - Free for everyone in MVP  
⚠️ **Basic search** - No fuzzy matching or advanced filters  

**These will be addressed in Phase 2 based on user feedback.**

---

## 🔗 Related Documentation

- **[README.md](./README.md)** - Vision, philosophy, market positioning
- **[FUTURE-README.md](./FUTURE-README.md)** - Phase 2+ features and expansion ideas
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Detailed design tokens and component library (to be created)
- **[FEATURE_SPECS.md](./FEATURE_SPECS.md)** - Detailed specs for each feature (to be created)

---

## 🎯 Definition of "MVP Done"

MVP is considered complete when:

✅ Organizer can create event with program in under 10 minutes  
✅ Attendee can register and view event info seamlessly  
✅ QR check-in works reliably (scan → instant update)  
✅ Participant networking list is browsable and useful  
✅ All screens look polished (design system applied)  
✅ Demo can be presented without bugs or crashes  
✅ At least 1 real event has used the platform successfully  

**Deadline:** March 2026 (competition presentation)

**Approach:** Ship fast, iterate based on feedback, don't over-engineer.

---

**Let's build something people actually want to use.**