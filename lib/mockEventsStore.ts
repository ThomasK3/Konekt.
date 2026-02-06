// Mock Events Store - Simple localStorage-based storage for MVP
// This will be replaced with Supabase in production

export interface Participant {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  status: "registered" | "checked-in" | "cancelled";
  registeredAt: string;
  checkedInAt: string | null;
  qrCode: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  coverImage?: string;
  capacity: number;
  visibility: "public" | "private" | "invite-only";
  status: "draft" | "published";
  createdAt: string;
  participants?: Participant[];
  stats: {
    registered: number;
    checkedIn: number;
    attendanceRate: number;
    noShows: number;
  };
}

const STORAGE_KEY = "konekt_mock_events";

// Initialize with some default events if storage is empty
const getDefaultEvents = (): Event[] => [
  {
    id: "default-1",
    name: "Startup Meetup Prague",
    date: "2026-03-15",
    time: "18:00",
    location: "Karlin Hall, Prague",
    description:
      "Monthly networking event for Prague startup community. Connect with founders, investors, and enthusiasts.",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    capacity: 100,
    visibility: "public",
    status: "published",
    createdAt: "2026-02-01T10:00:00Z",
    stats: {
      registered: 50,
      checkedIn: 0,
      attendanceRate: 0,
      noShows: 0,
    },
  },
  {
    id: "default-2",
    name: "Tech Conference 2026",
    date: "2026-04-20",
    time: "09:00",
    location: "Prague Congress Center",
    description:
      "Annual technology conference featuring speakers from leading tech companies.",
    coverImage:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    capacity: 500,
    visibility: "public",
    status: "published",
    createdAt: "2026-01-15T10:00:00Z",
    stats: {
      registered: 234,
      checkedIn: 0,
      attendanceRate: 0,
      noShows: 0,
    },
  },
  {
    id: "default-3",
    name: "Workshop: Product Design",
    date: "2026-03-08",
    time: "14:00",
    location: "Impact Hub, Brno",
    description:
      "Hands-on workshop covering modern product design principles and tools.",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    capacity: 30,
    visibility: "public",
    status: "draft",
    createdAt: "2026-02-03T10:00:00Z",
    stats: {
      registered: 0,
      checkedIn: 0,
      attendanceRate: 0,
      noShows: 0,
    },
  },
];

// Get all events from storage
export const getAllEvents = (): Event[] => {
  if (typeof window === "undefined") return getDefaultEvents();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with defaults
      const defaultEvents = getDefaultEvents();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
      return defaultEvents;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading events from storage:", error);
    return getDefaultEvents();
  }
};

// Get single event by ID
export const getEventById = (id: string): Event | null => {
  const events = getAllEvents();
  return events.find((e) => e.id === id) || null;
};

// Create new event
export const createEvent = (
  eventData: Omit<Event, "id" | "createdAt" | "stats">
): Event => {
  const newEvent: Event = {
    ...eventData,
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    stats: {
      registered: 0,
      checkedIn: 0,
      attendanceRate: 0,
      noShows: 0,
    },
  };

  const events = getAllEvents();
  events.push(newEvent);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("Error saving event to storage:", error);
  }

  return newEvent;
};

// Update existing event
export const updateEvent = (id: string, updates: Partial<Event>): boolean => {
  const events = getAllEvents();
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return false;

  events[index] = { ...events[index], ...updates };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return true;
  } catch (error) {
    console.error("Error updating event in storage:", error);
    return false;
  }
};

// Delete event
export const deleteEvent = (id: string): boolean => {
  const events = getAllEvents();
  const filtered = events.filter((e) => e.id !== id);

  if (filtered.length === events.length) return false;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting event from storage:", error);
    return false;
  }
};

// Get events by status
export const getEventsByStatus = (
  status: "draft" | "published"
): Event[] => {
  return getAllEvents().filter((e) => e.status === status);
};

// Get events by visibility
export const getEventsByVisibility = (
  visibility: "public" | "private" | "invite-only"
): Event[] => {
  return getAllEvents().filter((e) => e.visibility === visibility);
};

// Attendee-specific functions

// Get only public published events (for event discovery)
export const getPublicEvents = (): Event[] => {
  return getAllEvents().filter(
    (e) => e.status === "published" && e.visibility === "public"
  );
};

// Register for an event
export const registerForEvent = (
  eventId: string,
  participantData: {
    name: string;
    email: string;
    company?: string;
    role?: string;
  }
): Participant | null => {
  const events = getAllEvents();
  const eventIndex = events.findIndex((e) => e.id === eventId);

  if (eventIndex === -1) return null;

  const event = events[eventIndex];

  // Check capacity
  if (event.stats.registered >= event.capacity) {
    return null; // Event full
  }

  // Initialize participants array if it doesn't exist
  if (!event.participants) {
    event.participants = [];
  }

  // Create new participant with QR code
  const newParticipant: Participant = {
    id: `P${Date.now()}`,
    name: participantData.name,
    email: participantData.email,
    company: participantData.company,
    role: participantData.role,
    status: "registered",
    registeredAt: new Date().toISOString(),
    checkedInAt: null,
    qrCode: `QR${Date.now()}`,
  };

  // Add participant to event
  event.participants.push(newParticipant);

  // Update stats
  event.stats.registered++;

  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return newParticipant;
  } catch (error) {
    console.error("Error saving registration:", error);
    return null;
  }
};

// Get participant by ID
export const getParticipantById = (
  eventId: string,
  participantId: string
): Participant | undefined => {
  const event = getEventById(eventId);
  if (!event || !event.participants) return undefined;
  return event.participants.find((p) => p.id === participantId);
};

// Get all participants for an event
export const getEventParticipants = (eventId: string): Participant[] => {
  const event = getEventById(eventId);
  return event?.participants || [];
};
