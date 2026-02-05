# Konekt. MVP - Page Build Plan

> **Prioritized implementation plan for all MVP pages with detailed specifications**

---

## 🎯 Build Strategy

**Philosophy:** Build core flows first, then expand. Start with Organizer Dashboard → Create Event → Event Detail, then Attendee Discovery → Registration → Event View.

**Goal:** Functional demo by March 2026 that proves the value proposition.

---

## 📊 Priority Levels

**P0 (Critical):** Must have for demo  
**P1 (High):** Important for completeness  
**P2 (Medium):** Nice to have, can be simplified  
**P3 (Low):** Can be mocked/skipped for MVP  

---

## 🏗️ Phase 1: Core Organizer Flow (Week 1-2)

### **1. Organizer Dashboard** - P0
**Route:** `/organizer/dashboard`  
**Layout:** Bottom Nav + Left Sidebar + Main Content

**Purpose:** Central hub for organizers to see all their events at a glance.

**Components Needed:**
- [ ] BottomNav (4 items: Dashboard, Events, New, Profile)
- [ ] LeftSidebar (items: Overview, Upcoming, Past, Drafts)
- [ ] StatsGrid (4 stat cards)
- [ ] EventCardGrid (image cards)
- [ ] EmptyState (when no events)

**Content:**
```
Header: "Dashboard"

Stats Grid (4 cards):
├─ Total Events: 5
├─ Total Registrations: 247
├─ Upcoming Events: 3
└─ Active Check-ins: 0

Recent Events Section:
├─ Event Card 1 (with image)
├─ Event Card 2
└─ Event Card 3

CTA: "Create New Event" button
```

**Data:**
- Mock: 3-5 example events with stats
- Real: Fetch from Supabase `events` table where `organizer_id = user.id`

**Interactions:**
- Click event card → Navigate to Event Detail
- Click "Create New Event" → Navigate to Create Event page
- Bottom nav "Events" → Filter to show only events list
- Sidebar items → Filter events by status (upcoming/past/drafts)

**Success Criteria:**
- ✅ Shows event cards with images
- ✅ Stats are accurate
- ✅ Navigation works
- ✅ Empty state if no events

---

### **2. Create Event Page** - P0
**Route:** `/organizer/events/new`  
**Layout:** Bottom Nav + Left Sidebar + Main Content (Full-width form)

**Purpose:** Quick event creation in under 10 minutes.

**Components Needed:**
- [ ] EventForm (single-page, not wizard)
- [ ] ImageUpload component
- [ ] DateTimePicker
- [ ] LocationInput
- [ ] CapacityInput

**Form Fields:**
```
Event Basics:
├─ Event Name (text, required)
├─ Date (date picker, required)
├─ Time (time picker, required)
├─ Location (text + optional map, required)
├─ Description (textarea, max 500 chars)
├─ Cover Image (upload or select from library)
├─ Capacity (number input, required)
└─ Visibility (radio: Public / Private / Invite-only)

Actions:
├─ Cancel (goes back)
├─ Save as Draft
└─ Create Event (primary button)
```

**Validations:**
- Name: Required, min 3 chars
- Date: Must be future date
- Capacity: Min 1, max 500
- Image: Optional but recommended

**Data Flow:**
1. User fills form
2. Click "Create Event"
3. POST to Supabase `events` table
4. Generate QR code (unique event ID)
5. Redirect to Event Detail page

**Success Criteria:**
- ✅ Form validates properly
- ✅ Event created in DB
- ✅ Redirects to Event Detail
- ✅ Success toast notification

---

### **3. Event Detail - Overview Tab** - P0
**Route:** `/organizer/events/[id]`  
**Layout:** Bottom Nav + Left Sidebar (tabs) + Main Content

**Purpose:** View and edit event details, see stats.

**Left Sidebar Items:**
- Overview (active)
- Program
- Participants
- Check-in

**Components Needed:**
- [ ] EventHeader (image + title + date)
- [ ] EventInfoCell (editable)
- [ ] EventStatsGrid
- [ ] ActionButtons (Edit, Share, Delete)

**Content:**
```
Event Header:
├─ Cover Image (full-width)
├─ Event Name (overlay)
└─ Date + Time (overlay)

Event Info Cell:
├─ Description
├─ Location (with map icon)
├─ Capacity: 50 / 100
├─ Visibility: Public
└─ Edit button (opens inline edit mode)

Stats Grid:
├─ Registered: 50
├─ Checked In: 0
├─ Attendance Rate: 0%
└─ No-shows: 0

Actions:
├─ Share Event (generates link + QR)
├─ Edit Event (inline editing)
├─ Delete Event (with confirmation)
```

**Interactions:**
- Click "Edit" → Fields become editable
- Click "Share" → Modal with QR code + link
- Click "Delete" → Confirmation dialog
- Sidebar "Program" → Navigate to Program tab
- Sidebar "Participants" → Navigate to Participants tab

**Success Criteria:**
- ✅ Displays event data correctly
- ✅ Edit mode works
- ✅ Stats update in real-time
- ✅ Share functionality works

---

### **4. Event Detail - Program Tab** - P1
**Route:** `/organizer/events/[id]?tab=program`  
**Layout:** Same as Overview

**Purpose:** Build and manage event agenda/schedule.

**Components Needed:**
- [ ] ProgramBuilder
- [ ] SessionCard
- [ ] AddSessionButton
- [ ] DragDropReorder (optional for MVP)

**Content:**
```
Program Header:
├─ "Add Session" button
└─ "Reorder" toggle (optional)

Session List:
├─ Session 1
│   ├─ Time: 18:00 - 18:30
│   ├─ Title: "Welcome & Introductions"
│   ├─ Speaker: John Doe (optional)
│   ├─ Room: Main Hall (optional)
│   └─ Actions: Edit, Delete
├─ Session 2
└─ Session 3

Empty State:
"No sessions yet. Add your first session to build the program."
```

**Session Form:**
```
├─ Session Title (text, required)
├─ Start Time (time picker, required)
├─ End Time (time picker, required)
├─ Room/Stage (text, optional)
├─ Speaker Name (text, optional)
├─ Speaker Bio (textarea, optional)
├─ Speaker Photo (upload, optional)
└─ Actions: Save, Cancel
```

**Data:**
- Supabase `sessions` table linked to event

**Success Criteria:**
- ✅ Add session works
- ✅ Edit session works
- ✅ Delete session works
- ✅ Sessions display in chronological order
- ✅ Empty state shows if no sessions

---

### **5. Event Detail - Participants Tab** - P1
**Route:** `/organizer/events/[id]?tab=participants`  
**Layout:** Same as Overview

**Purpose:** Manage registrations, see who's coming, export data.

**Components Needed:**
- [ ] ParticipantTable
- [ ] SearchFilter
- [ ] ExportButton
- [ ] ManualAddButton

**Content:**
```
Participants Header:
├─ Search bar
├─ Filter dropdown (All, Registered, Checked-in, Cancelled)
├─ Export CSV button
└─ Add Participant button (manual)

Participant Table:
┌──────────────────────────────────────────────────┐
│ Name          │ Email         │ Status    │ ... │
├──────────────────────────────────────────────────┤
│ John Doe      │ john@...      │ ✅ Checked │ ... │
│ Jane Smith    │ jane@...      │ 📝 Reg.    │ ... │
│ Bob Wilson    │ bob@...       │ ❌ Cancel  │ ... │
└──────────────────────────────────────────────────┘

Stats Summary:
├─ Total Registered: 50
├─ Checked In: 20
└─ Pending: 30
```

**Features:**
- Search by name/email
- Filter by status
- Export to CSV (name, email, company, status, check-in time)
- Manual add (for walk-ins or offline registrations)
- Edit participant (change status)

**Success Criteria:**
- ✅ Displays all registrations
- ✅ Search works
- ✅ Export CSV works
- ✅ Manual add works

---

### **6. Event Detail - Check-in Tab** - P0 (WOW Feature)
**Route:** `/organizer/events/[id]?tab=checkin`  
**Layout:** Same as Overview

**Purpose:** QR code scanner for fast check-in at event entrance.

**Components Needed:**
- [ ] QRScanner (camera access)
- [ ] CheckInConfirmation (success/error modal)
- [ ] RecentCheckIns (live list)

**Content:**
```
Scanner View:
┌─────────────────────────────────────┐
│                                     │
│     [CAMERA VIEWFINDER]            │
│                                     │
│  "Scan attendee's QR code"         │
│                                     │
└─────────────────────────────────────┘

Live Stats (below scanner):
├─ Checked in today: 20 / 50
├─ Last check-in: Jane Smith (2 min ago)

Recent Check-ins List:
├─ Jane Smith - 18:05
├─ John Doe - 18:03
└─ Bob Wilson - 18:00
```

**QR Scanner Logic:**
1. Request camera permission
2. Scan QR code (contains registration ID)
3. Validate against DB
4. Update registration status to "checked_in"
5. Show success animation
6. Update live stats
7. Ready for next scan

**Success States:**
- ✅ Valid QR → Green flash + name display
- ❌ Invalid QR → Red flash + error message
- ⚠️ Already checked in → Yellow flash + warning

**Success Criteria:**
- ✅ Camera works on mobile
- ✅ QR scanning is fast (<1 second)
- ✅ Real-time updates
- ✅ Works offline (local cache, sync later)

---

## 🎫 Phase 2: Core Attendee Flow (Week 3)

### **7. Event Discovery Page** - P0
**Route:** `/events` or `/discover`  
**Layout:** Bottom Nav + Left Sidebar + Main Content

**Purpose:** Browse public events, search, filter, register.

**Left Sidebar Items:**
- All Events (active)
- Today
- This Week
- This Month
- Past Events

**Components Needed:**
- [ ] SearchBar
- [ ] FilterDropdowns (date, location, category)
- [ ] EventCardGrid (image-first cards)
- [ ] EmptyState

**Content:**
```
Header: "Discover Events"

Search + Filters:
├─ Search input
├─ Date filter
├─ Location filter
└─ Category filter (optional)

Event Grid:
├─ Event Card 1 (with image, date, location, registration count)
├─ Event Card 2
├─ Event Card 3
└─ ...

Empty State (if no results):
"No events found. Try adjusting your filters."
```

**Event Card Info:**
```
[Event Cover Image]
├─ Event Name (overlay)
├─ Date + Time (overlay)
├─ Location
├─ 50 registered
└─ "Register" button
```

**Interactions:**
- Click event card → Navigate to Event Detail (Attendee view)
- Click "Register" → Opens registration form or marks as registered
- Search → Filters events by name/description
- Sidebar filters → Filter by date range

**Success Criteria:**
- ✅ Shows public events
- ✅ Search works
- ✅ Filters work
- ✅ Cards display correctly
- ✅ Registration works

---

### **8. My Events (Attendee)** - P0
**Route:** `/my-events`  
**Layout:** Bottom Nav + Left Sidebar + Main Content

**Purpose:** See events I'm registered for, access QR codes.

**Left Sidebar Items:**
- Upcoming (active)
- Past
- Cancelled

**Components Needed:**
- [ ] EventList (registered events)
- [ ] QuickQRButton (access QR without opening event)
- [ ] EmptyState

**Content:**
```
Header: "My Events"

Event List:
├─ Event Card 1
│   ├─ Event Name
│   ├─ Date + Time
│   ├─ Location
│   ├─ Status: Registered
│   └─ Quick actions: View QR, View Event
├─ Event Card 2
└─ ...

Empty State:
"You're not registered for any events yet. 
Browse events to get started."
[Browse Events button]
```

**Success Criteria:**
- ✅ Shows registered events
- ✅ Filter by status works
- ✅ Quick QR access works
- ✅ Empty state displays

---

### **9. Event Detail (Attendee View) - Info Tab** - P0
**Route:** `/events/[id]`  
**Layout:** Bottom Nav + Left Sidebar + Main Content

**Purpose:** View event details, see program, network with attendees.

**Left Sidebar Items:**
- Info (active)
- My QR Code
- Participants

**Components Needed:**
- [ ] EventHeader
- [ ] EventInfoCell
- [ ] ProgramDisplay (read-only)
- [ ] RegisterButton

**Content:**
```
Event Header:
├─ Cover Image
├─ Event Name (overlay)
└─ Date + Time (overlay)

Event Info:
├─ Description
├─ Location (with map)
├─ Organizer: [Name]
├─ Capacity: 50 / 100 spots
└─ Registration status: ✅ Registered

Program:
├─ Session 1: 18:00 - 18:30
├─ Session 2: 18:30 - 19:00
└─ Session 3: 19:00 - 20:00

Actions:
├─ [Register] / [Cancel Registration] button
├─ [Add to Calendar] button
└─ [Share Event] button
```

**Success Criteria:**
- ✅ Displays event info
- ✅ Shows program
- ✅ Registration works
- ✅ Add to calendar works

---

### **10. Event Detail - My QR Code Tab** - P0
**Route:** `/events/[id]?tab=qr`  
**Layout:** Bottom Nav + Left Sidebar + Full-screen QR

**Purpose:** Show QR code for check-in at event entrance.

**Components Needed:**
- [ ] QRCodeDisplay (large, full-screen)
- [ ] AttendeeInfo (name below QR)

**Content:**
```
Full-screen QR Code:
┌─────────────────────────────────────┐
│                                     │
│          [LARGE QR CODE]           │
│                                     │
│         John Doe                    │
│    Ready for check-in              │
│                                     │
└─────────────────────────────────────┘

[Back to Event] button
```

**QR Code Contains:**
- Registration ID (unique per attendee per event)
- Event ID
- Timestamp

**Success Criteria:**
- ✅ QR code displays clearly
- ✅ Works offline
- ✅ Name displayed below QR
- ✅ Brightness boost (optional)

---

### **11. Event Detail - Participants Tab (Networking)** - P1
**Route:** `/events/[id]?tab=participants`  
**Layout:** Bottom Nav + Left Sidebar + Main Content

**Purpose:** See who's attending, connect on LinkedIn.

**Components Needed:**
- [ ] ParticipantGrid
- [ ] SearchFilter
- [ ] ParticipantCard

**Content:**
```
Participants Header:
├─ Search bar
├─ Filter: All, My Company, My Role
└─ "50 people registered"

Participant Grid:
├─ Participant Card 1
│   ├─ Profile photo (or avatar)
│   ├─ Name
│   ├─ Company + Role
│   └─ Connect on LinkedIn button
├─ Participant Card 2
└─ ...
```

**Participant Card:**
```
[Avatar]
John Doe
Product Manager @ Startup
[Connect on LinkedIn] → Opens LinkedIn app/web
```

**Success Criteria:**
- ✅ Shows registered attendees
- ✅ Search works
- ✅ Filter works
- ✅ LinkedIn button works (external link)

---

### **12. Participant Profile** - P2
**Route:** `/events/[id]/participants/[userId]`  
**Layout:** Bottom Nav + Main Content (full-width)

**Purpose:** View detailed profile of an attendee.

**Content:**
```
Profile Header:
├─ Large avatar
├─ Name
├─ Company + Role
└─ LinkedIn button

Bio/Description (optional)

Shared Events:
"You're both attending: Event X, Event Y"

[Connect on LinkedIn] button
[Back to Participants] button
```

**Success Criteria:**
- ✅ Displays profile info
- ✅ LinkedIn link works
- ✅ Shows shared events (optional)

---

## 🔧 Phase 3: Support Pages (Week 4)

### **13. Profile / Settings** - P2
**Route:** `/profile`  
**Layout:** Bottom Nav + Left Sidebar + Main Content

**Purpose:** Edit user profile, settings, logout.

**Left Sidebar Items:**
- Profile
- Settings
- Logout

**Content:**
```
Profile Section:
├─ Avatar upload
├─ Name (editable)
├─ Email (read-only)
├─ Company (editable)
├─ Role (editable)
├─ LinkedIn URL (editable)
└─ Save button

Settings Section:
├─ Notifications (toggle)
├─ Email preferences
└─ Language (optional)

Account Section:
├─ Change password
├─ Delete account
└─ Logout button
```

---

## 📦 Component Library Status

**Already Built:**
- ✅ BottomNav
- ✅ LeftSidebar
- ✅ Cell (simple card)
- ✅ EventCard (image card)

**Need to Build:**
- [ ] EventForm
- [ ] QRScanner
- [ ] QRCodeDisplay
- [ ] ProgramBuilder
- [ ] ParticipantTable
- [ ] SearchBar + Filters
- [ ] StatsGrid
- [ ] ImageUpload
- [ ] DateTimePicker

---

## 🎯 Recommended Build Order

**Week 1:**
1. Organizer Dashboard (with mock data)
2. Create Event Page (form only)
3. Event Detail - Overview Tab

**Week 2:**
4. Event Detail - Program Tab
5. Event Detail - Participants Tab
6. Event Detail - Check-in Tab (QR scanner)

**Week 3:**
7. Event Discovery Page
8. My Events (Attendee)
9. Event Detail (Attendee View) - Info Tab
10. Event Detail - My QR Code Tab

**Week 4:**
11. Event Detail - Participants Tab (Networking)
12. Participant Profile (optional)
13. Profile / Settings

---

## 🚀 Next Steps

1. **Pick starting point:** Organizer Dashboard
2. **Create page file:** `/app/organizer/dashboard/page.tsx`
3. **Use existing layout components:** BottomNav, LeftSidebar
4. **Build with mock data first:** Get UI working before connecting DB
5. **Add real data:** Connect Supabase once UI is solid

---

**Ready to start building? Let's go with Organizer Dashboard first! 🔥**
