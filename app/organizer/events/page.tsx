"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Cell } from "@/components/cells/Cell";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  coverImage?: string;
  capacity: number;
  registered: number;
  status: "draft" | "published";
  visibility: "public" | "private" | "invite-only";
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Startup Meetup Prague",
    date: "2026-03-15",
    time: "18:00",
    location: "Karlin Hall, Prague",
    description: "Monthly networking event for Prague startup community",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    capacity: 100,
    registered: 50,
    status: "published",
    visibility: "public",
  },
  {
    id: "2",
    title: "Tech Talks: AI in Business",
    date: "2026-03-22",
    time: "19:00",
    location: "Tech Hub Prague",
    description: "Expert panel on AI adoption in enterprise",
    capacity: 75,
    registered: 35,
    status: "published",
    visibility: "public",
  },
  {
    id: "3",
    title: "Founders Dinner",
    date: "2026-02-28",
    time: "20:00",
    location: "Restaurant XYZ",
    description: "Exclusive dinner for startup founders",
    capacity: 30,
    registered: 28,
    status: "published",
    visibility: "invite-only",
  },
  {
    id: "4",
    title: "Workshop: Product-Market Fit",
    date: "2026-01-15",
    time: "14:00",
    location: "Innovation Lab",
    description: "Hands-on workshop on finding PMF",
    capacity: 40,
    registered: 40,
    status: "published",
    visibility: "public",
  },
  {
    id: "5",
    title: "Summer Hackathon",
    date: "2026-04-10",
    time: "09:00",
    location: "TBD",
    description: "24-hour coding challenge",
    capacity: 100,
    registered: 12,
    status: "draft",
    visibility: "public",
  },
  {
    id: "6",
    title: "Investor Pitch Night",
    date: "2026-02-01",
    time: "18:30",
    location: "Coworking Space Alpha",
    description: "Present your startup to investors",
    capacity: 50,
    registered: 45,
    status: "published",
    visibility: "private",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getEventStatus(event: Event): "live" | "upcoming" | "past" {
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  const todayTime = today.getTime();
  const eventTime = eventDate.getTime();

  if (eventTime === todayTime) return "live";
  if (eventTime > todayTime) return "upcoming";
  return "past";
}

export default function EventsListPage() {
  const router = useRouter();
  const [activeSidebar, setActiveSidebar] = useState("all");
  const [activeNav, setActiveNav] = useState("events");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter events based on active sidebar item
  const filteredEvents = useMemo(() => {
    if (activeSidebar === "all") {
      return mockEvents.filter((e) => e.status === "published");
    }

    if (activeSidebar === "live") {
      return mockEvents.filter(
        (e) => e.status === "published" && getEventStatus(e) === "live"
      );
    }

    if (activeSidebar === "upcoming") {
      return mockEvents.filter(
        (e) => e.status === "published" && getEventStatus(e) === "upcoming"
      );
    }

    if (activeSidebar === "past") {
      return mockEvents.filter(
        (e) => e.status === "published" && getEventStatus(e) === "past"
      );
    }

    if (activeSidebar === "drafts") {
      return mockEvents.filter((e) => e.status === "draft");
    }

    return mockEvents;
  }, [activeSidebar]);

  const handleEventClick = (eventId: string) => {
    router.push(`/organizer/events/${eventId}`);
  };

  const handleShare = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    const eventUrl = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(eventUrl);
    alert("Event link copied to clipboard!");
  };

  const getEmptyStateContent = () => {
    switch (activeSidebar) {
      case "live":
        return {
          icon: "📅",
          title: "No live events",
          description: "No events are happening today",
        };
      case "upcoming":
        return {
          icon: "🔮",
          title: "No upcoming events",
          description: "You don't have any scheduled events",
          action: (
            <button
              onClick={() => router.push("/organizer/events/new")}
              className="btn-primary"
            >
              Create Event
            </button>
          ),
        };
      case "past":
        return {
          icon: "📚",
          title: "No past events",
          description: "Your completed events will appear here",
        };
      case "drafts":
        return {
          icon: "✏️",
          title: "No drafts",
          description: "Your draft events will appear here",
          action: (
            <button
              onClick={() => router.push("/organizer/events/new")}
              className="btn-primary"
            >
              Create Event
            </button>
          ),
        };
      default:
        return {
          icon: "📊",
          title: "No events yet",
          description: "Create your first event to get started",
          action: (
            <button
              onClick={() => router.push("/organizer/events/new")}
              className="btn-primary"
            >
              Create Event
            </button>
          ),
        };
    }
  };

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-button border border-border-light flex items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {sidebarOpen ? (
            <>
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </>
          )}
        </svg>
      </button>

      {/* Left Sidebar - FILTERS */}
      <LeftSidebar
        items={[
          { id: "all", label: "All Events", icon: "📋" },
          { id: "live", label: "Live Now", icon: "🔴" },
          { id: "upcoming", label: "Upcoming", icon: "📅" },
          { id: "past", label: "Past Events", icon: "📊" },
          { id: "drafts", label: "Drafts", icon: "✏️" },
        ]}
        activeItem={activeSidebar}
        onItemClick={setActiveSidebar}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h1 font-bold text-text-primary mb-2">
              My Events
            </h1>
            <p className="text-base text-text-secondary">
              Manage and track your events
            </p>
          </div>
          <button
            onClick={() => router.push("/organizer/events/new")}
            className="btn-primary"
          >
            + Create Event
          </button>
        </div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <EmptyState {...getEmptyStateContent()} />
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => {
              const eventStatus = getEventStatus(event);
              const isFull = event.registered >= event.capacity;

              return (
                <Cell
                  key={event.id}
                  hover
                  onClick={() => handleEventClick(event.id)}
                >
                  <div className="flex items-start gap-6">
                    {/* Event Image */}
                    {event.coverImage && (
                      <div className="hidden md:block w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-bg-page">
                        <img
                          src={event.coverImage}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      {/* Title & Status */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-text-primary">
                          {event.title}
                        </h3>
                        <div className="flex gap-2 flex-shrink-0">
                          {event.status === "draft" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                              ✏️ Draft
                            </span>
                          )}
                          {eventStatus === "live" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 animate-pulse">
                              🔴 Live
                            </span>
                          )}
                          {isFull && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                              Full
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-small text-text-secondary mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-small text-text-secondary mb-4">
                        <span className="flex items-center gap-2">
                          📅 {formatDate(event.date)} at {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          📍 {event.location}
                        </span>
                        <span className="flex items-center gap-2">
                          👥 {event.registered} / {event.capacity} registered
                        </span>
                        <span className="flex items-center gap-2">
                          {event.visibility === "public" && "🌐 Public"}
                          {event.visibility === "private" && "🔒 Private"}
                          {event.visibility === "invite-only" &&
                            "✉️ Invite Only"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event.id);
                          }}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          View Details
                        </button>
                        <button
                          onClick={(e) => handleShare(event, e)}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          📤 Share
                        </button>
                      </div>
                    </div>
                  </div>
                </Cell>
              );
            })}
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <BottomNav
        items={[
          { id: "dashboard", label: "Dashboard", icon: "🏠" },
          { id: "events", label: "Events", icon: "📊" },
          { id: "new", label: "New Event", icon: "➕" },
          { id: "profile", label: "Profile", icon: "👤" },
        ]}
        activeItem={activeNav}
        onItemClick={(id) => {
          setActiveNav(id);
          if (id === "dashboard") router.push("/organizer/dashboard");
          if (id === "new") router.push("/organizer/events/new");
          if (id === "profile") router.push("/organizer/profile");
          // 'events' stays on current page
        }}
      />
    </div>
  );
}
