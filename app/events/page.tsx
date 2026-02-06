"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Cell } from "@/components/cells/Cell";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublicEvents, Event } from "@/lib/mockEventsStore";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isEventPast(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

function getSpotsLeft(event: Event): number {
  return event.capacity - event.stats.registered;
}

interface EventCardProps {
  event: Event;
  onClick: () => void;
  isPast?: boolean;
}

function EventCard({ event, onClick, isPast = false }: EventCardProps) {
  const spotsLeft = getSpotsLeft(event);
  const isFull = spotsLeft <= 0;

  return (
    <Cell hover onClick={onClick} className="cursor-pointer">
      <div className="flex gap-4">
        {/* Cover Image */}
        {event.coverImage && (
          <img
            src={event.coverImage}
            alt={event.name}
            className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
          />
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-text-primary line-clamp-1">
              {event.name}
            </h3>
            {isFull && !isPast && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 flex-shrink-0">
                Full
              </span>
            )}
            {isPast && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 flex-shrink-0">
                Past
              </span>
            )}
          </div>

          {event.description && (
            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {event.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              📅 {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1">⏰ {event.time}</span>
            <span className="flex items-center gap-1">📍 {event.location}</span>
          </div>

          {!isPast && !isFull && (
            <div className="mt-3 text-sm text-green-600 font-medium">
              {spotsLeft} spots left
            </div>
          )}
        </div>
      </div>
    </Cell>
  );
}

export default function EventDiscoveryPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Get only published, public events
    const publicEvents = getPublicEvents();
    setEvents(publicEvents);
  }, []);

  // Filter events by search
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group events by status
  const upcomingEvents = filteredEvents.filter((e) => !isEventPast(e.date));
  const pastEvents = filteredEvents.filter((e) => isEventPast(e.date));

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border-light sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold mb-4 text-text-primary">
            Discover Events
          </h1>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="input w-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 text-text-primary">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => router.push(`/events/${event.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-text-primary">
              Past Events
            </h2>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => router.push(`/events/${event.id}`)}
                  isPast
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <EmptyState
            icon="🔍"
            title="No events found"
            description={
              searchQuery
                ? "Try a different search term"
                : "Check back later for new events"
            }
          />
        )}
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
