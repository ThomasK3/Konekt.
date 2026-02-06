"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Cell } from "@/components/cells/Cell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { getEventById, Event } from "@/lib/mockEventsStore";

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

interface MyEventCardProps {
  event: Event;
  onClick: () => void;
  onViewQR: (e: React.MouseEvent) => void;
  isPast?: boolean;
}

function MyEventCard({ event, onClick, onViewQR, isPast = false }: MyEventCardProps) {
  return (
    <Cell hover onClick={onClick} className="cursor-pointer">
      <div className="flex gap-4">
        {event.coverImage && (
          <img
            src={event.coverImage}
            alt={event.name}
            className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-text-primary">{event.name}</h3>
            {isPast && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 flex-shrink-0">
                Past
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-text-secondary mb-3">
            <span className="flex items-center gap-1">
              📅 {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1">⏰ {event.time}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onViewQR}
              className="btn-secondary text-sm px-3 py-1"
            >
              🎫 My QR Code
            </button>
          </div>
        </div>
      </div>
    </Cell>
  );
}

export default function MyEventsPage() {
  const router = useRouter();
  const [myEvents, setMyEvents] = useState<
    (Event & { participantId: string })[]
  >([]);

  useEffect(() => {
    // Get my registrations from localStorage
    try {
      const registrations = JSON.parse(
        localStorage.getItem("myRegistrations") || "[]"
      );

      // Load full event data
      const events = registrations
        .map((reg: any) => {
          const event = getEventById(reg.eventId);
          return event
            ? { ...event, participantId: reg.participantId }
            : null;
        })
        .filter(Boolean);

      setMyEvents(events);
    } catch (error) {
      console.error("Error loading registrations:", error);
    }
  }, []);

  const upcomingEvents = myEvents.filter((e) => !isEventPast(e.date));
  const pastEvents = myEvents.filter((e) => isEventPast(e.date));

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border-light">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-text-primary">My Events</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {myEvents.length === 0 ? (
          <EmptyState
            icon="📅"
            title="No events yet"
            description="Browse and register for events to see them here"
            action={
              <Button
                variant="primary"
                onClick={() => router.push("/events")}
              >
                Discover Events
              </Button>
            }
          />
        ) : (
          <>
            {/* Upcoming */}
            {upcomingEvents.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <MyEventCard
                      key={event.id}
                      event={event}
                      onClick={() => router.push(`/my-events/${event.id}`)}
                      onViewQR={(e) => {
                        e.stopPropagation();
                        router.push(`/my-events/${event.id}?tab=qr`);
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Past */}
            {pastEvents.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  Past Events
                </h2>
                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <MyEventCard
                      key={event.id}
                      event={event}
                      onClick={() => router.push(`/my-events/${event.id}`)}
                      onViewQR={(e) => {
                        e.stopPropagation();
                        router.push(`/my-events/${event.id}?tab=qr`);
                      }}
                      isPast
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
