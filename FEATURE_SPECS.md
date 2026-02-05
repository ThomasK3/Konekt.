# Konekt. MVP - Feature Specifications

> **Detailní rozpis každé funkce pro development. Reference pro prompty do Claude Code.**

---

## 📖 How to Use This Document

Pro každou feature:
1. **Overview** - Co feature dělá
2. **User Flow** - Krok po kroku průchod
3. **UI Components** - Co je na obrazovce
4. **Data Requirements** - Co potřebuje z DB
5. **Edge Cases** - Co když... scenáře
6. **Success Criteria** - Kdy je hotovo

**Při buildování:** Projdi feature → vezmi user flow → implementuj krok po kroku.

---

## 🎯 ORGANIZER FEATURES

---

### 📐 Layout Context

**IMPORTANT:** All organizer features (Event Setup, Program Builder, Participant Management, QR Check-in, etc.) exist on a **single scrollable Event Detail page** after event creation.

**Layout:**
- Left navigation: Dashboard | Create Event | Settings
- Main content area: Event Detail (single page with vertical cells)
- Each feature = one modular cell/card
- User scrolls to access different functions

**Visual structure:**
```
Event Detail Page (scroll vertically)
├─ Event Info Cell (top)
├─ Program Builder Cell
├─ QR Generator Cell  
├─ Participant Management Cell
└─ QR Check-in Cell (bottom)
```

**Optional Enhancement (Phase 2):** Tab switcher at top for users who prefer separated views.

---

### 1. Event Setup (Create Event)

#### Overview
Organizátor vytváří nový event vyplněním jednoduchého formuláře. Cíl: event ready za 10 minut.

#### User Flow
1. User klikne "Create Event" v left navigation
2. Zobrazí se formulář (dedicated page)
3. Vyplní required fields:
   - Event name
   - Date + Time
   - Location (address)
4. Vyplní optional fields:
   - Description (max 500 chars)
   - Cover image (upload nebo placeholder)
   - Capacity (max participants)
   - Visibility (Public / Private / Invite-only)
5. Klikne "Create Event"
6. Validace → Save to DB
7. **Redirect na Event Detail page** (single scrollable page s všemi cells)
8. Success message: "Event created! Scroll down to add program, share event, and more."
9. Event Info Cell is at top, editable anytime

#### UI Components
**Form fields:**
- Text input: Event name (required)
- Datetime picker: Date + Time (required)
- Text input: Location address (required)
- Textarea: Description (optional, 500 char limit, counter)
- Image uploader: Cover image (optional)
  - Drag & drop nebo "Choose file" button
  - Preview thumbnail
  - Default placeholder pokud není upload
- Number input: Capacity (optional, default 50)
- Radio buttons: Visibility
  - ○ Public (anyone can find)
  - ○ Private (only via link)
  - ○ Invite-only (requires approval)
- Primary button: "Create Event"
- Secondary button: "Cancel" (back to dashboard)

**Validation messages:**
- "Event name is required"
- "Please select date and time"
- "Location is required"

#### Data Requirements
**Database table:** `events`
```sql
INSERT INTO events (
  organizer_id,      -- current user ID
  name,
  description,
  date_time,
  location,
  cover_image_url,
  capacity,
  visibility,
  qr_secret,         -- auto-generated UUID
  created_at
) VALUES (...)
```

**Image upload:**
- Store in Supabase Storage
- Generate public URL
- Save URL to `cover_image_url`

#### Edge Cases
- **No cover image:** Use default placeholder (grey box with event name initial)
- **Past date selected:** Warning "Event is in the past, continue?"
- **Capacity = 0 or negative:** Validation error
- **Location too long:** Truncate at 200 chars
- **Network error during save:** Show error, keep form data, allow retry
- **User navigates away:** "Unsaved changes, are you sure?"

#### Success Criteria
- ✅ Form submits successfully
- ✅ Event appears in organizer's dashboard
- ✅ Event detail page loads with created data
- ✅ QR secret generated automatically
- ✅ All validations work
- ✅ Error states handled gracefully

---

### 2. Program Builder (Agenda/Sessions)

#### Overview
Organizátor přidává sessions (talks, workshops...) k eventu. Každá session má čas, název, speaker.

#### User Flow
1. User je na Event Detail page (single scrollable page)
2. Scrollne dolů k **Program Builder Cell**
3. Pokud prázdný: "No sessions yet. Add your first session!"
4. Klikne "+ Add Session" button
5. Zobrazí se formulář (modal nebo inline expandable)
6. Vyplní:
   - Session title
   - Start time
   - End time
   - Room/Stage (optional)
   - Speaker name (optional)
   - Speaker photo (optional)
   - Speaker bio (optional, short)
7. Klikne "Save Session"
8. Session se přidá do listu v Program Cell
9. Může reorder sessions (drag & drop nebo up/down arrows)
10. Může editovat nebo smazat session

**Opakování:**
- Opakuj krok 4-8 pro další sessions

#### UI Components
**Session list:**
- Seřazené podle start_time
- Každý item zobrazuje:
  - Time range (14:00 - 15:00)
  - Session title
  - Speaker name + photo (pokud je)
  - Edit button (✏️)
  - Delete button (🗑️)
  - Reorder handles (☰)

**Add/Edit form:**
- Text input: Session title (required)
- Time picker: Start time (required)
- Time picker: End time (required)
- Text input: Room/Stage (optional)
- Text input: Speaker name (optional)
- Image upload: Speaker photo (optional, small circle avatar)
- Textarea: Speaker bio (optional, 200 chars)
- Buttons: "Save" / "Cancel"

**Empty state:**
- Icon + text: "No sessions yet"
- Primary button: "Add First Session"

#### Data Requirements
**Database table:** `sessions`
```sql
INSERT INTO sessions (
  event_id,
  title,
  start_time,
  end_time,
  room,
  speaker_name,
  speaker_photo_url,
  speaker_bio,
  order,              -- for sorting
  created_at
) VALUES (...)
```

**Reordering:**
- Update `order` field when dragged
- Re-number all sessions in event

#### Edge Cases
- **End time before start time:** Validation error
- **Overlapping sessions:** Warning (allow but warn)
- **Session outside event date:** Warning
- **No sessions:** Show empty state, allow event creation anyway
- **Delete session:** Confirm dialog "Are you sure?"
- **Speaker photo upload fails:** Show error, allow retry or skip

#### Success Criteria
- ✅ Can add multiple sessions
- ✅ Sessions display in chronological order
- ✅ Can edit existing session
- ✅ Can delete session (with confirmation)
- ✅ Can reorder sessions
- ✅ Attendees see this program in their event view

---

### 3. Participant Management

#### Overview
Organizátor vidí kdo se registroval, může exportovat data, manuálně přidat účastníky.

#### User Flow
1. User je na Event Detail page (single scrollable page)
2. Scrollne dolů k **Participant Management Cell**
3. Vidí list všech registrací
4. Každý participant zobrazuje:
   - Name
   - Email
   - Company (if provided)
   - Registration status (Registered / Checked-in)
   - Registration date
5. Může použít actions:
   - **Search/Filter:** Najít konkrétního účastníka
   - **Export CSV:** Download all data
   - **Manual Add:** Přidat účastníka ručně (offline registrace)

**Stats zobrazené nahoře cell:**
- Total registered: X
- Checked in: Y
- Remaining capacity: Z

#### UI Components
**Stats cards:**
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Registered  │  │ Checked In  │  │ Capacity    │
│     47      │  │     32      │  │   50 total  │
└─────────────┘  └─────────────┘  └─────────────┘
```

**Actions bar:**
- Search input (🔍 Search by name or email)
- "Export CSV" button
- "+ Add Participant" button

**Participant list/table:**
| Name | Email | Company | Status | Registered |
|------|-------|---------|--------|------------|
| John Doe | john@... | Startup X | ✅ Checked in | Jan 10 |
| Jane Smith | jane@... | Company Y | ⏳ Registered | Jan 12 |

**Manual add form (modal):**
- Text input: Name (required)
- Email input: Email (required)
- Text input: Company (optional)
- Text input: Role (optional)
- Checkbox: "Send confirmation email?" (default checked)
- Buttons: "Add Participant" / "Cancel"

#### Data Requirements
**Query:**
```sql
SELECT 
  u.name,
  u.email,
  u.company,
  u.job_title,
  r.status,
  r.created_at,
  r.checked_in_at
FROM registrations r
JOIN users u ON r.user_id = u.id
WHERE r.event_id = :event_id
ORDER BY r.created_at DESC
```

**Export CSV:**
```csv
Name,Email,Company,Role,Status,Registered,Checked In
John Doe,john@example.com,Startup X,Founder,Checked in,2026-01-10,2026-01-15 14:23
```

**Manual add:**
```sql
-- Create user if doesn't exist
INSERT INTO users (email, name, company, job_title)
VALUES (...)
ON CONFLICT (email) DO UPDATE SET ...;

-- Create registration
INSERT INTO registrations (event_id, user_id, status, qr_code_data)
VALUES (...);
```

#### Edge Cases
- **No participants yet:** Show empty state "No registrations yet. Share your event!"
- **Duplicate email on manual add:** Update existing user, create new registration
- **Export with 0 participants:** Download empty CSV with headers
- **Search no results:** "No participants match 'query'"
- **Capacity full:** Show warning when reaching 100% capacity
- **Network error on export:** Show error, allow retry

#### Success Criteria
- ✅ All participants visible in list
- ✅ Stats update in real-time (after check-in)
- ✅ CSV export works with all data
- ✅ Manual add creates registration
- ✅ Search filters list correctly
- ✅ Handles large lists (50+ participants) without lag

---

### 4. Event Sharing (QR / Link / Code)

#### Overview
Organizátor může sdílet event třemi způsoby: QR code (vizuální), short link (URL), invite code (text).

#### User Flow
1. User je na Event Detail page (single scrollable page)
2. Scrollne k **QR Generator Cell** (nebo klikne "Share" quick button)
3. Zobrazí se 3 sharing options v cell:

**Option A: QR Code**
- Large QR code displayed
- "Download QR" button → save as PNG
- Use case text: "Print on posters, add to slides"

**Option B: Short Link**
- Displayed: `konekt.app/e/ABC123`
- "Copy Link" button
- Use case text: "Share via email, WhatsApp, social media"

**Option C: Invite Code**
- Displayed: `ABC123`
- "Copy Code" button
- Use case text: "Attendees enter code on homepage"

4. User zvolí preferred method a sdílí

**Tracking (optional MVP):**
- Show stats within cell: "X people joined via QR, Y via link, Z via code"

#### UI Components
**Share modal/page:**
```
┌─────────────────────────────────┐
│ Share Your Event                │
├─────────────────────────────────┤
│                                 │
│ [QR Code - Large Display]       │
│ Download QR (button)            │
│ "For posters and presentations" │
│                                 │
├─────────────────────────────────┤
│ 🔗 konekt.app/e/ABC123          │
│ [Copy Link] button              │
│ "Share via email or messaging"  │
│                                 │
├─────────────────────────────────┤
│ 🔢 Code: ABC123                 │
│ [Copy Code] button              │
│ "For verbal sharing"            │
│                                 │
└─────────────────────────────────┘
```

**Copy feedback:**
- "✓ Link copied to clipboard!"
- Toast notification, 2 seconds

#### Data Requirements
**Event already has:**
- `id` (UUID) → used for link/code generation
- `qr_secret` (UUID) → encoded in QR

**Generate short code:**
```javascript
// From event.id, generate 6-char alphanumeric
// e.g., UUID abc123... → ABC123
const shortCode = generateShortCode(event.id)
```

**QR Code generation:**
```javascript
// Encode URL in QR
const qrData = `https://konekt.app/register/${event.id}`
// Library: qrcode.react nebo similar
```

**URL patterns:**
- QR scan → `konekt.app/register/[uuid]`
- Short link → `konekt.app/e/[code]` (redirect to /register/[uuid])
- Code entry → User inputs on homepage → redirects to /register/[uuid]

#### Edge Cases
- **QR download fails:** Show error, allow retry
- **Copy not supported (old browser):** Fallback to "Select text to copy"
- **Short code collision:** Regenerate (very rare with 6 alphanumeric)
- **Event visibility = Private:** QR/Link still work, but not discoverable
- **Event capacity full:** Link shows "Event is full" message

#### Success Criteria
- ✅ QR code renders correctly
- ✅ QR scan opens registration page
- ✅ Short link works and redirects properly
- ✅ Code entry on homepage works
- ✅ Copy buttons work (clipboard API)
- ✅ Download QR produces usable PNG

---

### 5. QR Check-in (Scanner)

#### Overview
Organizátor skenuje QR kódy účastníků při vchodu na event → instant check-in.

#### User Flow
1. User je na Event Detail page (single scrollable page)
2. Scrollne dolů k **QR Check-in Cell** (nebo rychlý jump-link)
3. Otevře se kamera view uvnitř cell
4. Účastník ukáže svůj QR code (z My QR tab)
5. Organizátor namíří kameru na QR
6. QR se načte → validace
7. Pokud valid:
   - ✅ Check-in successful
   - Zobrazí se jméno účastníka v cell
   - +1 k checked-in counter (updates stats nahoře stránky)
   - Zelený flash feedback
8. Pokud invalid:
   - ❌ Error message (wrong event, already checked in...)
   - Červený flash feedback
9. Scan další QR (opakuj 5-8)

**Stats zobrazené v cell header:**
- Checked in: 32 / 50

**Recent scans list v cell:**
- Shows last 5-10 scans below camera

#### UI Components
**Camera view:**
```
┌─────────────────────────────────┐
│ Stats: 32/50 checked in         │
├─────────────────────────────────┤
│                                 │
│     [Camera Preview]            │
│     [Scan Frame Overlay]        │
│                                 │
│  "Point camera at QR code"      │
│                                 │
├─────────────────────────────────┤
│ Recent scans:                   │
│ ✅ John Doe (14:23)             │
│ ✅ Jane Smith (14:21)           │
│ ❌ Invalid QR (14:20)           │
└─────────────────────────────────┘
```

**Success feedback:**
```
┌─────────────────────┐
│   ✅ CHECK-IN       │
│   John Doe          │
│   Startup X         │
└─────────────────────┘
[Green flash animation, 1.5s]
```

**Error feedback:**
```
┌─────────────────────┐
│   ❌ ERROR          │
│   Already checked in│
│   or wrong event    │
└─────────────────────┘
[Red flash animation, 1.5s]
```

#### Data Requirements
**QR Code data structure:**
```json
{
  "registration_id": "uuid",
  "event_id": "uuid",
  "user_id": "uuid"
}
```
Encoded as base64 or JSON string in QR.

**Scan validation:**
1. Decode QR data
2. Check `event_id` matches current event
3. Check `registration_id` exists and status != "cancelled"
4. Check status != "checked_in" (prevent double scan)

**Update database:**
```sql
UPDATE registrations
SET 
  status = 'checked_in',
  checked_in_at = NOW()
WHERE id = :registration_id
  AND event_id = :event_id
  AND status = 'registered';
```

**Real-time update:**
- Use Supabase realtime subscriptions
- All organizers see check-in count update instantly

#### Edge Cases
- **Wrong event QR:** "This QR is for a different event"
- **Already checked in:** "John Doe already checked in at 14:15"
- **Cancelled registration:** "This registration was cancelled"
- **Corrupted QR:** "Invalid QR code, please try again"
- **Camera permission denied:** Show message "Please enable camera access"
- **Poor lighting:** "QR code not detected, improve lighting"
- **Network offline:** Cache check-ins locally, sync when online
- **Multiple organizers scanning:** Real-time sync prevents duplicates

#### Success Criteria
- ✅ Camera opens and displays preview
- ✅ QR scan triggers validation
- ✅ Successful check-in updates DB
- ✅ Stats update in real-time
- ✅ Error messages clear and helpful
- ✅ Fast scan-to-feedback (<1 second)
- ✅ Works offline (with sync when online)

---

## 👥 ATTENDEE FEATURES

---

### 📐 Layout Context

**IMPORTANT:** Attendee Event Detail page is also a **single scrollable page** with all info and features vertically stacked.

**Layout:**
- Mobile-first design (primary use case during events)
- All event info, QR code, and networking on ONE page
- Natural scroll navigation

**Visual structure:**
```
Event Detail Page (scroll vertically)
├─ Event Info (cover, name, date, location, program)
├─ My QR Code Cell (quick access for check-in)
└─ Participants List Cell (networking)
```

**Quick Access:** Floating "Show My QR" button for instant access during event.

---

### 6. Event Discovery & Registration

#### Overview
Účastník najde public event (nebo dostane link) a zaregistruje se.

#### User Flow

**Path A: Browse public events**
1. User přijde na konekt.app
2. Vidí list public eventů
3. Klikne na event → Event detail page
4. Klikne "Register" button
5. Přejde na registration form

**Path B: Direct link**
1. User dostane link `konekt.app/e/ABC123`
2. Klikne → redirectuje na Event detail
3. Klikne "Register"
4. Přejde na registration form

**Path C: Code entry**
1. User přijde na konekt.app
2. Vidí "Have an invite code? Enter here"
3. Zadá ABC123
4. Redirectuje na Event detail
5. Klikne "Register"
6. Přejde na registration form

**Registration form:**
1. Vyplní:
   - Name (required)
   - Email (required)
   - Company (optional)
   - Role/Job title (optional)
2. Klikne "Register for Event"
3. Validace → Save to DB
4. Confirmation page: "You're registered!"
5. Email confirmation sent (optional MVP)
6. Button: "View My Events" nebo "View Event Details"

#### UI Components
**Event discovery (homepage):**
- List of public events
- Each card shows:
  - Cover image
  - Event name
  - Date + time
  - Location
  - "X people registered"
  - "Register" button

**Event detail (pre-registration):**
- Cover image
- Event info (name, date, location, description)
- Program preview (sessions)
- Participant count
- **Primary CTA: "Register for This Event"**

**Registration form:**
- Text input: Name (required)
- Email input: Email (required)
- Text input: Company (optional)
- Text input: Role (optional)
- Checkbox: "I agree to share my info with organizer"
- Primary button: "Register for Event"
- Secondary: "Cancel"

**Confirmation page:**
```
┌────────────────────────────┐
│     ✓ You're Registered!  │
│                            │
│  Event: Startup Meetup     │
│  Date: March 15, 6pm       │
│                            │
│  [View Event Details]      │
│  [View My QR Code]         │
└────────────────────────────┘
```

#### Data Requirements
**Query public events:**
```sql
SELECT *
FROM events
WHERE visibility = 'public'
  AND date_time > NOW()
ORDER BY date_time ASC
LIMIT 20
```

**Registration insert:**
```sql
-- Create user if not exists
INSERT INTO users (email, name, company, job_title)
VALUES (...)
ON CONFLICT (email) DO UPDATE SET ...;

-- Create registration
INSERT INTO registrations (
  event_id,
  user_id,
  status,            -- 'registered'
  qr_code_data,      -- JSON with IDs
  created_at
) VALUES (...);
```

**QR code data generation:**
```json
{
  "registration_id": "new-uuid",
  "event_id": "event-uuid",
  "user_id": "user-uuid"
}
```

#### Edge Cases
- **Event capacity full:** Show "Event is full" message, disable register
- **Already registered:** Show "You're already registered!" with link to event
- **Invalid invite code:** "Code not found. Check and try again."
- **Email already in system:** Merge profiles, create new registration
- **Event in the past:** Can't register, show "This event has passed"
- **Network error during registration:** Show error, allow retry, don't lose form data
- **Duplicate registration attempt:** Prevent double-registration (check email + event)

#### Success Criteria
- ✅ Can discover public events
- ✅ Direct link works
- ✅ Code entry works
- ✅ Registration form validates correctly
- ✅ Registration saves to database
- ✅ QR code generated for new registration
- ✅ User redirected to confirmation page
- ✅ Email confirmation sent (optional)

---

### 7. My Events View

#### Overview
Účastník vidí všechny eventy na které je registrovaný.

#### User Flow
1. User se přihlásí / otevře app
2. Defaultně přijde na "My Events" page
3. Vidí list eventů:
   - **Upcoming** (datum v budoucnu)
   - **Past** (datum v minulosti)
4. Klikne na event → Event detail page

#### UI Components
**My Events list:**
```
┌───────────────────────────────┐
│  My Events                    │
├───────────────────────────────┤
│  Upcoming (2)                 │
│                               │
│  [Event Card]                 │
│  Startup Meetup Prague        │
│  March 15, 2026 • 6:00 PM    │
│  Location: Karlin Hall        │
│  50 registered                │
│                               │
│  [Event Card]                 │
│  Product Tank Prague          │
│  April 2, 2026 • 7:00 PM     │
│  Location: Impact Hub         │
│  32 registered                │
│                               │
├───────────────────────────────┤
│  Past (1)                     │
│                               │
│  [Event Card - greyed out]    │
│  Innovation Week Kickoff      │
│  January 10, 2026             │
│                               │
└───────────────────────────────┘
```

**Event card (compact):**
- Cover image thumbnail
- Event name
- Date + time
- Location (city)
- Registration count
- Quick action: "View Details" button

**Empty state:**
- Icon + text: "No events yet"
- CTA button: "Discover Events"

#### Data Requirements
**Query user's events:**
```sql
SELECT 
  e.*,
  r.status,
  r.created_at as registered_at,
  COUNT(r2.id) as total_registered
FROM registrations r
JOIN events e ON r.event_id = e.id
LEFT JOIN registrations r2 ON r2.event_id = e.id
WHERE r.user_id = :current_user_id
  AND r.status != 'cancelled'
GROUP BY e.id
ORDER BY e.date_time ASC
```

**Categorize:**
```javascript
const upcoming = events.filter(e => new Date(e.date_time) > new Date())
const past = events.filter(e => new Date(e.date_time) <= new Date())
```

#### Edge Cases
- **No events registered:** Show empty state with "Discover Events" CTA
- **Event deleted by organizer:** Hide from list (or show "Event cancelled")
- **Event date changed:** Updates automatically
- **Large list (10+ events):** Implement pagination or infinite scroll

#### Success Criteria
- ✅ Shows all registered events
- ✅ Separates upcoming vs past
- ✅ Updates when new registration happens
- ✅ Click navigates to event detail
- ✅ Empty state shows helpful CTA

---

### 8. Event Detail (Attendee View)

#### Overview
Účastník vidí kompletní info o eventu: program, místo, čas, účastníky, svůj QR.

#### User Flow
1. User klikne na event (z My Events nebo discovery)
2. Zobrazí se Event Detail page (**single scrollable page**)
3. Scrolluje vertikálně pro různé sekce:

**Top of page:**
- Cover image
- Event name, date, time, location
- Description
- Full program (sessions + speakers)
- Organizer info
- "Add to Calendar" button (optional)

**Scroll down - My QR Code Cell:**
- Large QR code for check-in
- Name displayed below
- "Ready for check-in" message
- **Quick access:** Floating button always visible

**Scroll down - Participants Cell:**
- List of all attendees
- Search/filter functionality
- Click → participant profile

#### UI Components
**Single scrollable page:**
```
┌──────────────────────────────┐
│ [Cover Image]                │
├──────────────────────────────┤
│ Startup Meetup Prague        │
│ 📅 March 15, 2026            │
│ 🕐 6:00 PM - 9:00 PM         │
│ 📍 Karlin Hall, Prague       │
│ 👥 50 people registered      │
├──────────────────────────────┤
│ About This Event             │
│ [Description text...]        │
├──────────────────────────────┤
│ Program                      │
│                              │
│ 6:00 - 6:15 PM               │
│ Welcome & Networking         │
│                              │
│ 6:15 - 7:00 PM               │
│ Keynote: Scaling Startups    │
│ Speaker: John Doe            │
│ [Speaker photo + bio]        │
│ ...                          │
├──────────────────────────────┤
│ MY QR CODE CELL              │
│                              │
│   [Large QR Code]            │
│   (displayed inline)         │
│                              │
│   Your Name                  │
│   "Ready for check-in"       │
│                              │
├──────────────────────────────┤
│ PARTICIPANTS CELL            │
│                              │
│ [Search participants...]     │
│                              │
│ [Participant cards...]       │
│                              │
└──────────────────────────────┘

[Floating "Show QR" Button]
```

**Quick Access Button:**
- Sticky/floating button (bottom-right on mobile)
- Icon: QR code
- Click → smooth scroll to My QR Cell
- Always visible during event day

#### Data Requirements
**Event data:**
```sql
SELECT 
  e.*,
  u.name as organizer_name
FROM events e
JOIN users u ON e.organizer_id = u.id
WHERE e.id = :event_id
```

**Program/Sessions:**
```sql
SELECT *
FROM sessions
WHERE event_id = :event_id
ORDER BY start_time ASC
```

**User's QR:**
```sql
SELECT qr_code_data
FROM registrations
WHERE event_id = :event_id
  AND user_id = :current_user_id
```

#### Edge Cases
- **Event cancelled:** Show banner "This event has been cancelled"
- **Session times change:** Updates automatically
- **QR not loading:** Show error, provide refresh button
- **Event past date:** Show "This event has ended"
- **Network offline:** Cache event data for offline viewing

#### Success Criteria
- ✅ All event info displays correctly
- ✅ Program shows in chronological order
- ✅ My QR code renders properly
- ✅ Tabs switch smoothly
- ✅ Works on mobile (primary use case)

---

### 9. My QR Code (Full Screen)

#### Overview
Účastník otevře svůj QR code na fullscreen pro rychlý check-in.

#### User Flow
1. User je na Event Detail page (single scrollable page)
2. Scrollne dolů k **My QR Code Cell** (nebo použije floating quick button)
3. QR se zobrazí v cell (inline, ne fullscreen initially)
4. Může kliknout "Expand QR" pro fullscreen view (optional)
5. Phone screen stays awake (prevent lock)
6. Organizátor scanuje QR
7. Check-in proběhne → feedback (optional in-cell)

**Quick access:**
- Floating "Show My QR" button (sticky bottom-right)
- One-tap smooth scroll to QR cell
- Or opens fullscreen QR modal directly

#### UI Components
**Fullscreen QR:**
```
┌──────────────────────────────┐
│                              │
│                              │
│      [QR Code Image]         │
│       (large, centered)      │
│                              │
│      John Doe                │
│      Startup X               │
│                              │
│  "Ready for check-in"        │
│                              │
│  [✓] Checked in at 6:23 PM   │  ← shown after scan
│                              │
└──────────────────────────────┘
```

**Design details:**
- QR code: 70% of screen width
- White background (high contrast)
- Black border around QR (optional)
- Name + company below QR
- Status indicator (checked in = green checkmark)

#### Data Requirements
**QR data payload:**
```json
{
  "registration_id": "uuid",
  "event_id": "uuid",
  "user_id": "uuid"
}
```
Encoded as base64 or JSON in QR.

**Check-in status:**
```sql
SELECT status, checked_in_at
FROM registrations
WHERE id = :registration_id
```

**Real-time update:**
- After scan, status changes to "checked_in"
- UI updates to show checkmark + timestamp

#### Edge Cases
- **QR doesn't render:** Show error, reload button
- **Screen lock during display:** Use wake lock API (prevent sleep)
- **Low brightness warning:** "Increase brightness for easier scanning"
- **Network offline:** QR works offline (data encoded in QR itself)
- **Already checked in:** Show status, prevent duplicate scan
- **Wrong event scanned:** Organizer's scanner shows error, not user's QR

#### Success Criteria
- ✅ QR code renders large and scannable
- ✅ Works without network (offline check-in)
- ✅ Screen stays awake during display
- ✅ Status updates after check-in
- ✅ High contrast for easy scanning
- ✅ Fast load time (<1 second)

---

### 10. Participant List (Networking)

#### Overview
Účastník vidí ostatní účastníky eventu pro networking.

#### User Flow
1. User je na Event Detail page (single scrollable page)
2. Scrollne dolů k **Participants Cell**
3. Vidí list všech registrovaných účastníků
4. Každý zobrazuje:
   - Name
   - Company + Role
   - Profile photo (if uploaded)
5. Může search/filter:
   - By name
   - By company
   - By role
6. Klikne na osobu → Participant Profile (modal nebo separate page)

#### UI Components
**Participant list:**
```
┌──────────────────────────────┐
│ Participants (50)            │
│                              │
│ [🔍 Search by name...]       │
│ [Filter: All / Company / ... ]│
│                              │
├──────────────────────────────┤
│ [Avatar] John Doe            │
│          Founder, Startup X  │
│          → View Profile      │
├──────────────────────────────┤
│ [Avatar] Jane Smith          │
│          CTO, Company Y      │
│          → View Profile      │
├──────────────────────────────┤
│ [Avatar] Alex Johnson        │
│          Designer, Freelance │
│          → View Profile      │
├──────────────────────────────┤
│ ...                          │
└──────────────────────────────┘
```

**Card style (each participant):**
- Avatar (circle, 48px)
- Name (bold)
- Company + Role (grey text)
- Right arrow (→) for navigation

**Search/Filter:**
- Real-time search (filters as you type)
- Filter dropdown: Company, Role

#### Data Requirements
**Query participants:**
```sql
SELECT 
  u.id,
  u.name,
  u.company,
  u.job_title,
  u.avatar_url,
  u.linkedin_url,
  r.status
FROM registrations r
JOIN users u ON r.user_id = u.id
WHERE r.event_id = :event_id
  AND r.status IN ('registered', 'checked_in')
ORDER BY u.name ASC
```

**Search/Filter:**
```javascript
// Client-side filtering
const filtered = participants.filter(p => 
  p.name.toLowerCase().includes(query.toLowerCase()) ||
  p.company?.toLowerCase().includes(query.toLowerCase())
)
```

#### Edge Cases
- **No participants yet:** "No participants yet. Be the first!"
- **Only 1 participant (user):** "You're the only one registered so far"
- **Search no results:** "No participants match 'query'"
- **Missing company/role:** Show "Company not provided"
- **No avatar:** Show placeholder with initials
- **Large list (100+):** Implement virtual scrolling or pagination

#### Success Criteria
- ✅ All participants visible
- ✅ Search works in real-time
- ✅ Filter works correctly
- ✅ Click navigates to profile
- ✅ Handles missing data gracefully
- ✅ Responsive on mobile

---

### 11. Participant Profile

#### Overview
Účastník klikne na někoho z networking listu → vidí jejich profil + možnost propojit na LinkedIn.

#### User Flow
1. User klikne na participant (z Networking tab)
2. Zobrazí se jejich profile (modal nebo full page)
3. Vidí:
   - Name
   - Company + Role
   - Profile photo
   - LinkedIn link (if provided)
4. Klikne "Connect on LinkedIn"
5. Otevře se LinkedIn (app nebo web)
6. User může poslat connection request

**Close profile:**
- X button nebo back navigation

#### UI Components
**Profile view:**
```
┌────────────────────────────────┐
│           [X] Close            │
├────────────────────────────────┤
│                                │
│      [Large Avatar]            │
│         (120px)                │
│                                │
│      John Doe                  │
│      Founder at Startup X      │
│                                │
│  📧 john@example.com           │
│  🔗 linkedin.com/in/johndoe    │
│                                │
│  [Connect on LinkedIn] →       │
│                                │
└────────────────────────────────┘
```

**Connect button:**
- Primary button
- Opens LinkedIn in new tab/app
- URL: `https://linkedin.com/in/[username]`
- Fallback: LinkedIn search with name

#### Data Requirements
**Query user profile:**
```sql
SELECT 
  u.id,
  u.name,
  u.company,
  u.job_title,
  u.email,
  u.linkedin_url,
  u.avatar_url
FROM users u
WHERE u.id = :user_id
```

**LinkedIn integration:**
- Store full LinkedIn URL in `linkedin_url` field
- Example: `https://linkedin.com/in/johndoe`
- If not provided: Show "LinkedIn not available"

#### Edge Cases
- **No LinkedIn provided:** Hide "Connect on LinkedIn" button
- **Email hidden:** Show "Email not shared"
- **Incomplete profile:** Show available fields only
- **No avatar:** Show initials placeholder
- **LinkedIn URL malformed:** Validate format, show error if broken
- **User viewing own profile:** Show "This is you!" message

#### Success Criteria
- ✅ Profile displays all available info
- ✅ LinkedIn button opens correct profile
- ✅ Handles missing data gracefully
- ✅ Close/back navigation works
- ✅ Mobile-friendly layout

---

## 🎯 Implementation Priority

**Week 1-2:** Build cells in Library
1. EventInfoCell (display + edit modes)
2. SessionCard (for program)
3. ParticipantCard (for lists)
4. QRDisplayCell
5. StatsCard

**Week 3:** Organizer core flows
1. Event Setup (Feature #1)
2. Program Builder (Feature #2)
3. Event Sharing (Feature #4)

**Week 4:** Attendee core flows
1. Event Discovery (Feature #6)
2. My Events (Feature #7)
3. Event Detail (Feature #8)
4. My QR Code (Feature #9)

**Week 5:** Advanced features
1. Participant Management (Feature #3)
2. QR Check-in Scanner (Feature #5)
3. Networking List (Feature #10)
4. Participant Profile (Feature #11)

**Week 6:** Polish & testing
- Edge cases
- Error handling
- Mobile responsiveness
- Demo data seeding

---

## ✅ Feature Completion Checklist

For each feature, check off when:
- [ ] UI components implemented
- [ ] Database queries working
- [ ] User flow tested end-to-end
- [ ] Edge cases handled
- [ ] Mobile responsive
- [ ] Error states implemented
- [ ] Loading states implemented

---

**Toto je tvůj reference guide. Otevři feature → vezmi user flow → promptuj Claude Code step by step.**