"use client";

import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { EventCard } from "@/components/cards/EventCard";
import { StatCard } from "@/components/cards/StatCard";
import { Button } from "@/components/ui/Button";

export default function TestLayoutPage() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeSidebar, setActiveSidebar] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Demo event data
  const demoEvents = [
    {
      id: 1,
      title: "Startup Meetup Prague",
      subtitle: "📅 March 15, 2026 • ⏰ 18:00",
      imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      registered: 50,
      location: "Karlin Hall",
    },
    {
      id: 2,
      title: "Tech Talks: AI in Business",
      subtitle: "📅 March 22, 2026 • ⏰ 19:00",
      imageSrc: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      registered: 35,
      location: "Impact Hub",
    },
    {
      id: 3,
      title: "Networking Drinks",
      subtitle: "📅 March 29, 2026 • ⏰ 17:30",
      imageSrc: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      registered: 80,
      location: "Café Louvre",
    },
    {
      id: 4,
      title: "Product Manager Summit",
      subtitle: "📅 April 5, 2026 • ⏰ 09:00",
      imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      registered: 120,
      location: "Forum Karlín",
    },
  ];

  // Render content based on active navigation
  const renderContent = () => {
    switch (activeNav) {
      case "home":
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-h1 font-bold text-text-primary mb-2">
                  Dashboard
                </h1>
                <p className="text-base text-text-secondary">
                  Welcome back! Here's what's happening with your events.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                value={5}
                label="Active Events"
                trend={{ value: 12, isPositive: true }}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              />
              <StatCard
                value={247}
                label="Total Registrations"
                trend={{ value: 8, isPositive: true }}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                }
              />
              <StatCard
                value={12}
                label="Past Events"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                }
              />
              <StatCard
                value={3}
                label="Draft Events"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                }
              />
            </div>

            {/* Recent Events */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h2 font-bold text-text-primary">Recent Events</h2>
                <Button variant="secondary" size="sm">View All</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    subtitle={event.subtitle}
                    imageSrc={event.imageSrc}
                    imageAlt={event.title}
                    meta={
                      <div className="flex gap-4 text-small text-text-secondary">
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 14c0-2.21-2.686-4-6-4s-6 1.79-6 4M10 4a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {event.registered} registered
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 14s-6-4.477-6-8a6 6 0 0112 0c0 3.523-6 8-6 8z" />
                          </svg>
                          {event.location}
                        </span>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </>
        );

      case "events":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-h1 font-bold text-text-primary mb-2">
                All Events
              </h1>
              <p className="text-base text-text-secondary">
                Showing {activeSidebar} events
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  subtitle={event.subtitle}
                  imageSrc={event.imageSrc}
                  imageAlt={event.title}
                  meta={
                    <div className="flex gap-4 text-small text-text-secondary">
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 14c0-2.21-2.686-4-6-4s-6 1.79-6 4M10 4a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {event.registered} registered
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 14s-6-4.477-6-8a6 6 0 0112 0c0 3.523-6 8-6 8z" />
                        </svg>
                        {event.location}
                      </span>
                    </div>
                  }
                />
              ))}
            </div>
          </>
        );

      case "new":
        return (
          <div className="card max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 rounded-full bg-bg-page flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="16" cy="16" r="12" />
                <line x1="16" y1="10" x2="16" y2="22" />
                <line x1="10" y1="16" x2="22" y2="16" />
              </svg>
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-2">
              Create New Event
            </h1>
            <p className="text-base text-text-secondary mb-6">
              Event creation form would go here
            </p>
            <Button variant="primary">Start Creating</Button>
          </div>
        );

      case "profile":
        return (
          <div className="card max-w-2xl mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-bg-page flex items-center justify-center mx-auto mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M33 35v-3a7 7 0 00-7-7h-12a7 7 0 00-7 7v3" />
                <circle cx="20" cy="12" r="7" />
              </svg>
            </div>
            <h1 className="text-h1 font-bold text-text-primary mb-2">
              Profile Settings
            </h1>
            <p className="text-base text-text-secondary mb-6">
              User profile and settings would go here
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary">Edit Profile</Button>
              <Button variant="secondary">Settings</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button - Right Side */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-sm border border-border-light flex items-center justify-center"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="14" y2="14" />
            <line x1="14" y1="4" x2="4" y2="14" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
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
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeItem={activeNav}
        onItemClick={setActiveNav}
      />
    </div>
  );
}
