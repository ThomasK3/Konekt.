"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { StatCard } from "@/components/cards/StatCard";
import { EventCard } from "@/components/cards/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

// Mock event data
const mockEvents = [
  {
    id: "1",
    title: "Startup Meetup Prague",
    subtitle: "📅 March 15, 2026 • ⏰ 18:00",
    imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    imageAlt: "Startup Meetup",
    date: "2026-03-15",
    status: "published" as const,
    registered: 50,
    location: "Karlin Hall",
  },
  {
    id: "2",
    title: "Tech Talks: AI in Business",
    subtitle: "📅 March 22, 2026 • ⏰ 19:00",
    imageSrc: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    imageAlt: "Tech Talks",
    date: "2026-03-22",
    status: "published" as const,
    registered: 35,
    location: "Tech Hub",
  },
  {
    id: "3",
    title: "Networking Drinks",
    subtitle: "📅 March 29, 2026 • ⏰ 17:30",
    imageSrc: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    imageAlt: "Networking Event",
    date: "2026-03-29",
    status: "published" as const,
    registered: 80,
    location: "Rooftop Bar",
  },
  {
    id: "4",
    title: "Product Manager Summit",
    subtitle: "📅 April 5, 2026 • ⏰ 09:00",
    imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    imageAlt: "PM Summit",
    date: "2026-04-05",
    status: "published" as const,
    registered: 120,
    location: "Forum Karlín",
  },
  {
    id: "5",
    title: "Design Workshop",
    subtitle: "📅 January 20, 2026 • ⏰ 14:00",
    imageSrc: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=800&q=80",
    imageAlt: "Design Workshop",
    date: "2026-01-20",
    status: "published" as const,
    registered: 25,
    location: "Creative Space",
  },
  {
    id: "6",
    title: "Marketing Strategy Draft",
    subtitle: "📅 TBD",
    imageSrc: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    imageAlt: "Marketing Event",
    date: "2026-05-01",
    status: "draft" as const,
    registered: 0,
    location: "TBD",
  },
];

export default function OrganizerDashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeSidebar, setActiveSidebar] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter events based on sidebar selection
  const filteredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (activeSidebar) {
      case "upcoming":
        return mockEvents.filter(
          (event) => new Date(event.date) >= today && event.status === "published"
        );
      case "past":
        return mockEvents.filter(
          (event) => new Date(event.date) < today && event.status === "published"
        );
      case "drafts":
        return mockEvents.filter((event) => event.status === "draft");
      default: // overview
        return mockEvents;
    }
  }, [activeSidebar]);

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeEvents = mockEvents.filter(
      (e) => e.status === "published" && new Date(e.date) >= today
    ).length;

    const totalRegistrations = mockEvents
      .filter((e) => e.status === "published")
      .reduce((sum, e) => sum + e.registered, 0);

    const upcomingEvents = mockEvents.filter(
      (e) => e.status === "published" && new Date(e.date) >= today
    ).length;

    const drafts = mockEvents.filter((e) => e.status === "draft").length;

    return {
      activeEvents,
      totalRegistrations,
      upcomingEvents,
      drafts,
    };
  }, []);

  // Event handlers
  const handleEventClick = (eventId: string) => {
    router.push(`/organizer/events/${eventId}`);
  };

  const handleCreateEvent = () => {
    router.push("/organizer/events/new");
  };

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);

    if (itemId === "events") {
      router.push("/organizer/events");
    } else if (itemId === "new") {
      router.push("/organizer/events/new");
    } else if (itemId === "profile") {
      router.push("/organizer/profile");
    }
    // 'dashboard' stays on current page
  };

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-sm border border-border-light flex items-center justify-center"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="4" y1="4" x2="14" y2="14" />
            <line x1="14" y1="4" x2="4" y2="14" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-h1 font-bold text-text-primary mb-2">
            Dashboard
          </h1>
          <p className="text-large text-text-secondary">
            Welcome back! Here's what's happening with your events.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            value={stats.activeEvents}
            label="Active Events"
            trend={{ value: 12, isPositive: true }}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          />
          <StatCard
            value={stats.totalRegistrations}
            label="Total Registrations"
            trend={{ value: 8, isPositive: true }}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            }
          />
          <StatCard
            value={stats.upcomingEvents}
            label="Upcoming Events"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
          <StatCard
            value={stats.drafts}
            label="Draft Events"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            }
          />
        </div>

        {/* Events Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h2 font-bold text-text-primary">
              {activeSidebar === "upcoming" && "Upcoming Events"}
              {activeSidebar === "past" && "Past Events"}
              {activeSidebar === "drafts" && "Draft Events"}
              {activeSidebar === "overview" && "Recent Events"}
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCreateEvent}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="4" x2="8" y2="12" />
                <line x1="4" y1="8" x2="12" y2="8" />
              </svg>
              New Event
            </Button>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  subtitle={event.subtitle}
                  imageSrc={event.imageSrc}
                  imageAlt={event.imageAlt}
                  onClick={() => handleEventClick(event.id)}
                  meta={
                    <div className="flex gap-4 text-small text-text-secondary">
                      <span className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 14c0-2.21-2.686-4-6-4s-6 1.79-6 4M10 4a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {event.registered} registered
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M8 14s-6-4.477-6-8a6 6 0 0112 0c0 3.523-6 8-6 8z" />
                        </svg>
                        {event.location}
                      </span>
                    </div>
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="📅"
              title="No events yet"
              description="Create your first event to start organizing amazing experiences."
              action={
                <Button variant="primary" onClick={handleCreateEvent}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="10" y1="5" x2="10" y2="15" />
                    <line x1="5" y1="10" x2="15" y2="10" />
                  </svg>
                  Create New Event
                </Button>
              }
            />
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeItem={activeNav} onItemClick={handleNavClick} />
    </div>
  );
}
