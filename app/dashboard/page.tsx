"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Cell } from "@/components/cells/Cell";
import { Button } from "@/components/ui/Button";
import { getEventById, Event } from "@/lib/mockEventsStore";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface UpcomingEventCardProps {
  event: Event;
  onViewQR: () => void;
  onViewDetails: () => void;
}

function UpcomingEventCard({
  event,
  onViewQR,
  onViewDetails,
}: UpcomingEventCardProps) {
  const daysUntil = Math.ceil(
    (new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Cell hover className="cursor-pointer" onClick={onViewDetails}>
      <div className="flex gap-4">
        {/* Cover Image */}
        {event.coverImage && (
          <img
            src={event.coverImage}
            alt={event.name}
            className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
          />
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-text-primary mb-1 line-clamp-1">
            {event.name}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-text-secondary mb-2">
            <span>📅 {formatDate(event.date)}</span>
            <span>⏰ {event.time}</span>
          </div>
          {daysUntil === 0 ? (
            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
              Today!
            </span>
          ) : daysUntil === 1 ? (
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              Tomorrow
            </span>
          ) : (
            <span className="text-sm text-text-secondary">
              in {daysUntil} days
            </span>
          )}
        </div>

        {/* QR Quick Access */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewQR();
          }}
          className="btn-secondary text-sm px-3 py-2 flex-shrink-0"
        >
          🎫 QR
        </button>
      </div>
    </Cell>
  );
}

interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

function ActionCard({ icon, title, description, onClick }: ActionCardProps) {
  return (
    <Cell hover onClick={onClick} className="cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
        <div className="text-text-secondary">→</div>
      </div>
    </Cell>
  );
}

interface ProfileData {
  name: string;
  email: string;
  company: string;
  role: string;
}

export default function AttendeeDashboardPage() {
  const router = useRouter();
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Load profile
    const saved = localStorage.getItem("attendeeProfile");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }

    // Load my registered events
    try {
      const registrations = JSON.parse(
        localStorage.getItem("myRegistrations") || "[]"
      );
      const events = registrations
        .map((reg: any) => getEventById(reg.eventId))
        .filter(Boolean)
        .filter((e: Event) => new Date(e.date) >= new Date()) // Only upcoming
        .slice(0, 3); // Next 3 events
      setMyEvents(events);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  }, []);

  const stats = {
    eventsAttended: 0, // TODO: Count past checked-in events
    upcomingEvents: myEvents.length,
    connections: 0, // TODO: Count LinkedIn connections
  };

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border-light sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-text-primary">
            {profileData?.name
              ? `Welcome back, ${profileData.name}!`
              : "Dashboard"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {myEvents.length > 0
              ? `You have ${myEvents.length} upcoming event${
                  myEvents.length > 1 ? "s" : ""
                }`
              : "Discover events happening near you"}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Cell className="text-center">
            <p className="text-3xl font-bold text-text-primary mb-1">
              {stats.upcomingEvents}
            </p>
            <p className="text-sm text-text-secondary">Upcoming</p>
          </Cell>
          <Cell className="text-center">
            <p className="text-3xl font-bold text-text-primary mb-1">
              {stats.eventsAttended}
            </p>
            <p className="text-sm text-text-secondary">Attended</p>
          </Cell>
          <Cell className="text-center">
            <p className="text-3xl font-bold text-text-primary mb-1">
              {stats.connections}
            </p>
            <p className="text-sm text-text-secondary">Connections</p>
          </Cell>
        </div>

        {/* Upcoming Events */}
        {myEvents.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text-primary">
                Your Upcoming Events
              </h2>
              <button
                onClick={() => router.push("/my-events")}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {myEvents.map((event) => (
                <UpcomingEventCard
                  key={event.id}
                  event={event}
                  onViewQR={() => router.push(`/my-events/${event.id}?tab=qr`)}
                  onViewDetails={() => router.push(`/my-events/${event.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-text-primary">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ActionCard
              icon="🔍"
              title="Discover Events"
              description="Browse upcoming events"
              onClick={() => router.push("/events")}
            />
            <ActionCard
              icon="🎫"
              title="My QR Codes"
              description="Access check-in codes"
              onClick={() => router.push("/my-events")}
            />
            <ActionCard
              icon="👥"
              title="Networking"
              description="Connect with attendees"
              onClick={() => router.push("/my-events")}
            />
            <ActionCard
              icon="👤"
              title="My Profile"
              description="Update your information"
              onClick={() => router.push("/profile")}
            />
          </div>
        </section>

        {/* Empty State - No Upcoming Events */}
        {myEvents.length === 0 && (
          <Cell className="text-center py-12">
            <p className="text-4xl mb-4">📅</p>
            <h3 className="text-xl font-semibold mb-2 text-text-primary">
              No upcoming events
            </h3>
            <p className="text-text-secondary mb-6">
              Discover events happening in your area
            </p>
            <button
              onClick={() => router.push("/events")}
              className="btn-primary"
            >
              Browse Events
            </button>
          </Cell>
        )}

        {/* Profile Completion Prompt */}
        {!profileData?.name && (
          <Cell className="bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-text-primary">
                  Complete your profile
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  Make networking easier by adding your details
                </p>
                <button
                  onClick={() => router.push("/profile")}
                  className="btn-secondary text-sm"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </Cell>
        )}
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
