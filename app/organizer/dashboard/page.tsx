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

  // Get upcoming events (next 3)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return mockEvents
      .filter((e) => e.status === "published" && new Date(e.date) >= today)
      .slice(0, 3);
  }, []);

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
        items={[
          {
            id: "overview",
            label: "Overview",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="7" height="7" rx="1" />
                <rect x="11" y="2" width="7" height="7" rx="1" />
                <rect x="2" y="11" width="7" height="7" rx="1" />
                <rect x="11" y="11" width="7" height="7" rx="1" />
              </svg>
            ),
          },
          {
            id: "activity",
            label: "Activity",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 9 12 3 6 9" />
                <path d="M12 3v12a2 2 0 002 2h2" />
                <path d="M6 9v10a2 2 0 01-2 2H2" />
              </svg>
            ),
          },
          {
            id: "insights",
            label: "Insights",
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="16" y1="16" x2="16" y2="10" />
                <line x1="10" y1="16" x2="10" y2="6" />
                <line x1="4" y1="16" x2="4" y2="12" />
              </svg>
            ),
          },
        ]}
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

        {/* Dashboard Content based on sidebar */}
        {activeSidebar === "overview" && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-h2 font-bold text-text-primary mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleCreateEvent}
                  className="card hover:shadow-md transition-shadow cursor-pointer text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-text-primary flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Create Event</h3>
                      <p className="text-small text-text-secondary">Start organizing a new event</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => router.push("/organizer/events")}
                  className="card hover:shadow-md transition-shadow cursor-pointer text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">View All Events</h3>
                      <p className="text-small text-text-secondary">Manage your event portfolio</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => router.push("/organizer/profile")}
                  className="card hover:shadow-md transition-shadow cursor-pointer text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Profile Settings</h3>
                      <p className="text-small text-text-secondary">Update your preferences</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h2 font-bold text-text-primary">Upcoming Events</h2>
                <Button variant="secondary" size="sm" onClick={() => router.push("/organizer/events")}>
                  View All
                </Button>
              </div>
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
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
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 14c0-2.21-2.686-4-6-4s-6 1.79-6 4M10 4a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {event.registered} registered
                          </span>
                        </div>
                      }
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="📅"
                  title="No upcoming events"
                  description="Create your first event to start organizing amazing experiences."
                  action={
                    <Button variant="primary" onClick={handleCreateEvent}>
                      Create New Event
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        )}

        {activeSidebar === "activity" && (
          <div>
            <h2 className="text-h2 font-bold text-text-primary mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { icon: "👤", text: "New registration for Startup Meetup Prague", time: "2 hours ago" },
                { icon: "✅", text: "Event 'Tech Talks' was published", time: "5 hours ago" },
                { icon: "📝", text: "You updated Design Workshop details", time: "1 day ago" },
                { icon: "🎫", text: "15 new registrations for Product Manager Summit", time: "2 days ago" },
                { icon: "⚙️", text: "Profile settings updated", time: "3 days ago" },
              ].map((activity, index) => (
                <div key={index} className="card flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-page flex items-center justify-center text-xl flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base text-text-primary">{activity.text}</p>
                    <p className="text-small text-text-secondary mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSidebar === "insights" && (
          <div>
            <h2 className="text-h2 font-bold text-text-primary mb-6">Event Insights</h2>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Registration Trend</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-small mb-2">
                      <span className="text-text-secondary">This Month</span>
                      <span className="font-semibold text-text-primary">247 registrations</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-text-primary" style={{ width: "82%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-small mb-2">
                      <span className="text-text-secondary">Last Month</span>
                      <span className="font-semibold text-text-primary">189 registrations</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gray-300" style={{ width: "63%" }} />
                    </div>
                  </div>
                  <p className="text-small text-text-secondary pt-2">
                    <span className="text-text-primary font-semibold">+30.7% </span>
                    increase from last month
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Event Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-small text-text-secondary">Average Attendance</span>
                    <span className="font-semibold text-text-primary">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-small text-text-secondary">Check-in Rate</span>
                    <span className="font-semibold text-text-primary">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-small text-text-secondary">Avg Event Size</span>
                    <span className="font-semibold text-text-primary">62 people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-small text-text-secondary">Events This Year</span>
                    <span className="font-semibold text-text-primary">24 events</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Events */}
            <div className="card">
              <h3 className="font-semibold text-text-primary mb-4">Most Popular Events</h3>
              <div className="space-y-3">
                {[
                  { name: "Product Manager Summit", registrations: 120, trend: "+15%" },
                  { name: "Networking Drinks", registrations: 80, trend: "+8%" },
                  { name: "Startup Meetup Prague", registrations: 50, trend: "+12%" },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                    <div>
                      <p className="font-medium text-text-primary">{event.name}</p>
                      <p className="text-small text-text-secondary">{event.registrations} registrations</p>
                    </div>
                    <span className="text-small font-semibold text-text-primary">{event.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeItem={activeNav} onItemClick={handleNavClick} />
    </div>
  );
}
