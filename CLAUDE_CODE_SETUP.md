# Konekt - Claude Code Setup Guide

> **Complete setup guide for professional Next.js 14 + Supabase architecture with modular cell system**

---

## 🎯 Architecture Philosophy

**Key Principles:**
1. **Pages are empty containers** - Only composition, no logic
2. **Views compose cells** - Reusable, self-contained modules
3. **Cells own their logic** - Data fetching, state, interactions
4. **Server-first** - Use React Server Components by default
5. **Type-safe** - Full TypeScript, no `any`

---

## 📁 Project Structure

```
konekt/
├─ app/                          # Next.js 14 App Router
│  ├─ (auth)/                    # Route group (auth layout)
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  └─ register/
│  │     └─ page.tsx
│  │
│  ├─ (public)/                  # Route group (public layout)
│  │  └─ page.tsx                # Homepage
│  │
│  ├─ dashboard/
│  │  └─ page.tsx                # Role-based dashboard
│  │
│  ├─ events/
│  │  ├─ [id]/
│  │  │  └─ page.tsx             # Event detail (role-based views)
│  │  └─ create/
│  │     └─ page.tsx             # Create event form
│  │
│  ├─ library/                   # Component playground (dev only)
│  │  └─ page.tsx
│  │
│  ├─ layout.tsx                 # Root layout
│  ├─ globals.css
│  └─ not-found.tsx
│
├─ components/
│  ├─ cells/                     # ⭐ Modular cells (core features)
│  │  ├─ Cell.tsx                # Base cell wrapper
│  │  ├─ EventInfoCell/
│  │  │  ├─ index.tsx            # Main export
│  │  │  ├─ EventInfoCell.tsx   # Component logic
│  │  │  ├─ EditMode.tsx         # Edit view
│  │  │  └─ DisplayMode.tsx      # Display view
│  │  ├─ ProgramCell/
│  │  │  ├─ index.tsx
│  │  │  ├─ ProgramCell.tsx
│  │  │  ├─ SessionList.tsx
│  │  │  └─ AddSessionForm.tsx
│  │  ├─ ParticipantListCell/
│  │  ├─ QRGeneratorCell/
│  │  └─ QRCheckinCell/
│  │
│  ├─ views/                     # Composed views
│  │  ├─ OrganizerEventView.tsx
│  │  └─ AttendeeEventView.tsx
│  │
│  ├─ ui/                        # Base UI components (shadcn/ui style)
│  │  ├─ Button.tsx
│  │  ├─ Card.tsx
│  │  ├─ Input.tsx
│  │  ├─ Modal.tsx
│  │  └─ ...
│  │
│  └─ layouts/
│     ├─ MainLayout.tsx
│     └─ EventLayout.tsx
│
├─ lib/
│  ├─ supabase/
│  │  ├─ client.ts               # Client-side Supabase
│  │  ├─ server.ts               # Server-side Supabase
│  │  ├─ middleware.ts           # Middleware client
│  │  ├─ queries/                # Typed database queries
│  │  │  ├─ events.ts
│  │  │  ├─ sessions.ts
│  │  │  ├─ users.ts
│  │  │  └─ registrations.ts
│  │  └─ types.ts                # Generated TypeScript types
│  │
│  └─ utils/
│     ├─ permissions.ts          # Permission checking
│     ├─ date.ts                 # Date formatting
│     └─ qr.ts                   # QR code utilities
│
├─ hooks/
│  ├─ useUser.ts                 # Current user hook
│  ├─ useEvent.ts                # Event data hook
│  ├─ usePermissions.ts          # Permission checking hook
│  └─ useSessions.ts             # Sessions data hook
│
├─ types/
│  └─ index.ts                   # Shared TypeScript types
│
├─ middleware.ts                 # Next.js middleware (auth, routing)
├─ .env.local                    # Environment variables
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

---

## 🚀 Step 1: Project Initialization

### Install Next.js 14

```bash
# Create Next.js project
npx create-next-app@latest konekt --typescript --tailwind --app --no-src-dir

# Navigate to project
cd konekt

# Install dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react clsx tailwind-merge
npm install qrcode.react date-fns
npm install -D @types/qrcode.react

# Optional: shadcn/ui components
npx shadcn-ui@latest init
```

### Create Folder Structure

```bash
# Create main directories
mkdir -p components/{cells,views,ui,layouts}
mkdir -p lib/{supabase/queries,utils}
mkdir -p hooks
mkdir -p types

# Create cell directories
cd components/cells
mkdir EventInfoCell ProgramCell ParticipantListCell QRGeneratorCell QRCheckinCell
cd ../..
```

---

## 🗄️ Step 2: Supabase Setup

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project: `konekt-mvp`
3. Save credentials:
   - Project URL: `https://xxx.supabase.co`
   - Anon key: `eyJxxx...`
   - Service role key: `eyJxxx...` (keep secret)

### 2.2 Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2.3 Database Schema

Run in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  default_role TEXT NOT NULL DEFAULT 'attendee' CHECK (default_role IN ('organizer', 'attendee')),
  company TEXT,
  job_title TEXT,
  linkedin_url TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  cover_image_url TEXT,
  capacity INTEGER DEFAULT 50,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'invite-only')),
  qr_secret UUID DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  room TEXT,
  speaker_name TEXT,
  speaker_photo_url TEXT,
  speaker_bio TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'checked_in', 'cancelled')),
  checked_in_at TIMESTAMP WITH TIME ZONE,
  qr_code_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(event_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_date ON events(date_time);
CREATE INDEX idx_sessions_event ON sessions(event_id);
CREATE INDEX idx_sessions_start_time ON sessions(start_time);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_status ON registrations(status);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2.4 Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Anyone can view public events"
  ON events FOR SELECT
  USING (visibility = 'public' OR organizer_id = auth.uid());

CREATE POLICY "Organizers can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their events"
  ON events FOR UPDATE
  USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete their events"
  ON events FOR DELETE
  USING (auth.uid() = organizer_id);

-- Sessions policies
CREATE POLICY "Anyone can view sessions for events they can see"
  ON sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = sessions.event_id
      AND (events.visibility = 'public' OR events.organizer_id = auth.uid())
    )
  );

CREATE POLICY "Organizers can manage sessions"
  ON sessions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = sessions.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Registrations policies
CREATE POLICY "Users can view registrations for events they're part of"
  ON registrations FOR SELECT
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM events
      WHERE events.id = registrations.event_id
      AND events.organizer_id = auth.uid()
    )
  );

CREATE POLICY "Users can register for events"
  ON registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Organizers can update registrations"
  ON registrations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = registrations.event_id
      AND events.organizer_id = auth.uid()
    )
  );
```

### 2.5 Storage Buckets

```sql
-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true);

-- Storage policies
CREATE POLICY "Anyone can view event images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated users can upload event images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'event-images'
    AND auth.role() = 'authenticated'
  );
```

### 2.6 Generate TypeScript Types

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref xxx

# Generate types
npx supabase gen types typescript --project-id xxx > lib/supabase/types.ts
```

---

## 🔧 Step 3: Supabase Client Setup

### `lib/supabase/client.ts` (Client-side)

```typescript
import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### `lib/supabase/server.ts` (Server-side)

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './types'

export async function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server Component
          }
        },
      },
    }
  )
}
```

### `lib/supabase/middleware.ts` (Middleware client)

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from './types'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}
```

---

## 🎨 Step 4: Base Components

### `components/cells/Cell.tsx` (Base Cell Wrapper)

```typescript
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CellProps {
  children: ReactNode
  title?: string
  icon?: ReactNode
  accentColor?: 'orange' | 'blue' | 'green' | 'purple'
  className?: string
}

const accentColors = {
  orange: 'border-t-orange',
  blue: 'border-t-blue',
  green: 'border-t-green',
  purple: 'border-t-purple',
}

export function Cell({ 
  children, 
  title, 
  icon, 
  accentColor = 'orange',
  className 
}: CellProps) {
  return (
    <div className={cn(
      'bg-white rounded-2xl p-6 shadow-sm',
      'border-t-4',
      accentColors[accentColor],
      className
    )}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              `bg-${accentColor}/10`
            )}>
              {icon}
            </div>
          )}
          {title && (
            <h2 className="text-xl font-semibold text-black">{title}</h2>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
```

---

## 🏗️ Step 5: Architecture Patterns

### Pattern 1: Page Composition (Server Component)

```typescript
// app/events/[id]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { OrganizerEventView } from '@/components/views/OrganizerEventView'
import { AttendeeEventView } from '@/components/views/AttendeeEventView'
import { notFound } from 'next/navigation'

export default async function EventDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  // Get event
  const { data: event, error } = await supabase
    .from('events')
    .select('*, organizer:users(*)')
    .eq('id', params.id)
    .single()
  
  if (error || !event) {
    notFound()
  }
  
  // Check if user is organizer
  const isOrganizer = user?.id === event.organizer_id
  
  return (
    <main className="min-h-screen bg-grey-50 py-6">
      <div className="max-w-5xl mx-auto px-4">
        {isOrganizer ? (
          <OrganizerEventView event={event} />
        ) : (
          <AttendeeEventView event={event} userId={user?.id} />
        )}
      </div>
    </main>
  )
}
```

### Pattern 2: View Composition

```typescript
// components/views/OrganizerEventView.tsx
import { EventInfoCell } from '@/components/cells/EventInfoCell'
import { ProgramCell } from '@/components/cells/ProgramCell'
import { QRGeneratorCell } from '@/components/cells/QRGeneratorCell'
import { ParticipantManagementCell } from '@/components/cells/ParticipantManagementCell'
import { QRCheckinCell } from '@/components/cells/QRCheckinCell'
import type { Event } from '@/types'

interface OrganizerEventViewProps {
  event: Event
}

export function OrganizerEventView({ event }: OrganizerEventViewProps) {
  return (
    <div className="space-y-6">
      <EventInfoCell event={event} editable />
      <ProgramCell eventId={event.id} />
      <QRGeneratorCell event={event} />
      <ParticipantManagementCell eventId={event.id} />
      <QRCheckinCell eventId={event.id} />
    </div>
  )
}
```

### Pattern 3: Cell with Data Fetching

```typescript
// components/cells/ProgramCell/index.tsx
'use client'

import { useState } from 'react'
import { Cell } from '../Cell'
import { Calendar } from 'lucide-react'
import { useSessions } from '@/hooks/useSessions'
import { SessionList } from './SessionList'
import { AddSessionForm } from './AddSessionForm'

interface ProgramCellProps {
  eventId: string
  editable?: boolean
}

export function ProgramCell({ eventId, editable = false }: ProgramCellProps) {
  const { sessions, isLoading, addSession, updateSession, deleteSession } = useSessions(eventId)
  const [isAdding, setIsAdding] = useState(false)

  return (
    <Cell 
      title="Program" 
      icon={<Calendar />} 
      accentColor="blue"
    >
      {isLoading ? (
        <div>Loading sessions...</div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-grey-500 mb-4">No sessions yet.</p>
          {editable && (
            <button 
              onClick={() => setIsAdding(true)}
              className="btn-primary"
            >
              Add First Session
            </button>
          )}
        </div>
      ) : (
        <>
          <SessionList 
            sessions={sessions}
            editable={editable}
            onUpdate={updateSession}
            onDelete={deleteSession}
          />
          {editable && (
            <button 
              onClick={() => setIsAdding(true)}
              className="btn-secondary mt-4"
            >
              + Add Session
            </button>
          )}
        </>
      )}
      
      {isAdding && (
        <AddSessionForm
          onSubmit={addSession}
          onCancel={() => setIsAdding(false)}
        />
      )}
    </Cell>
  )
}
```

---

## 🪝 Step 6: Custom Hooks

### `hooks/useSessions.ts`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Session } from '@/types'

export function useSessions(eventId: string) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSessions()
  }, [eventId])

  async function fetchSessions() {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('event_id', eventId)
      .order('start_time', { ascending: true })

    if (data) {
      setSessions(data)
    }
    setIsLoading(false)
  }

  async function addSession(sessionData: Partial<Session>) {
    const { data, error } = await supabase
      .from('sessions')
      .insert({ ...sessionData, event_id: eventId })
      .select()
      .single()

    if (data) {
      setSessions(prev => [...prev, data])
    }
    return { data, error }
  }

  async function updateSession(id: string, updates: Partial<Session>) {
    const { data, error } = await supabase
      .from('sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (data) {
      setSessions(prev => prev.map(s => s.id === id ? data : s))
    }
    return { data, error }
  }

  async function deleteSession(id: string) {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id)

    if (!error) {
      setSessions(prev => prev.filter(s => s.id !== id))
    }
    return { error }
  }

  return {
    sessions,
    isLoading,
    addSession,
    updateSession,
    deleteSession,
    refetch: fetchSessions
  }
}
```

---

## 🛡️ Step 7: Middleware & Auth

### `middleware.ts`

```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## 📋 Step 8: Development Workflow

### Build a New Cell

1. **Create cell directory:**
```bash
mkdir components/cells/MyCoolCell
```

2. **Create index.tsx:**
```typescript
'use client'

import { Cell } from '../Cell'
import { Icon } from 'lucide-react'

export function MyCoolCell({ data }) {
  return (
    <Cell title="My Cool Feature" icon={<Icon />} accentColor="blue">
      {/* Your content */}
    </Cell>
  )
}
```

3. **Add to view:**
```typescript
import { MyCoolCell } from '@/components/cells/MyCoolCell'

export function MyView() {
  return (
    <>
      <EventInfoCell />
      <MyCoolCell data={...} />  {/* ← Add here */}
    </>
  )
}
```

---

## 🧪 Step 9: Testing in Library

Create `app/library/page.tsx`:

```typescript
import { EventInfoCell } from '@/components/cells/EventInfoCell'
import { ProgramCell } from '@/components/cells/ProgramCell'

export default function LibraryPage() {
  const mockEvent = {
    id: '123',
    name: 'Test Event',
    date_time: new Date(),
    location: 'Prague'
  }

  return (
    <main className="min-h-screen bg-grey-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Component Library</h1>
      
      <div className="space-y-6 max-w-5xl">
        <section>
          <h2 className="text-xl mb-4">Event Info Cell</h2>
          <EventInfoCell event={mockEvent} editable />
        </section>

        <section>
          <h2 className="text-xl mb-4">Program Cell</h2>
          <ProgramCell eventId={mockEvent.id} editable />
        </section>
      </div>
    </main>
  )
}
```

---

## ✅ Ready to Start Coding

**Next steps:**

1. Run setup:
```bash
npm install
npm run dev
```

2. Visit: `http://localhost:3000/library`

3. Build first cell: `EventInfoCell`

4. Test in Library page

5. Compose into views

6. Build pages

---

## 🎯 Code Quality Checklist

For every component:
- [ ] TypeScript types defined
- [ ] Props interface documented
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Mobile responsive
- [ ] Accessible (ARIA labels)
- [ ] No console errors

For every cell:
- [ ] Self-contained (data, logic, UI)
- [ ] Uses Cell wrapper with accent color
- [ ] Handles empty state
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Exports clean interface

---

**This setup gives you professional, scalable, maintainable architecture. Start building! 🚀**
