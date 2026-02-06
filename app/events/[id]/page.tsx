"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Cell } from "@/components/cells/Cell";
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

function getSpotsLeft(event: Event): number {
  return event.capacity - event.stats.registered;
}

export default function EventDetailPublicPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const eventData = getEventById(params.id);
    if (!eventData) {
      router.push("/events");
      return;
    }
    setEvent(eventData);
  }, [params.id, router]);

  if (!event) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  const spotsLeft = getSpotsLeft(event);
  const isFull = spotsLeft <= 0;
  const isPast = isEventPast(event.date);

  return (
    <div className="min-h-screen bg-bg-page pb-32">
      {/* Cover Image Header */}
      <div className="relative h-64 md:h-80">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-button transition-all"
          aria-label="Go back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5L7 10L12 15" />
          </svg>
        </button>

        {/* Event Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
          <div className="flex flex-wrap gap-3 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              📅 {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1">⏰ {event.time}</span>
            <span className="flex items-center gap-1">📍 {event.location}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Spots Available */}
        {!isPast && (
          <Cell>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">
                  Availability
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {isFull ? "Event Full" : `${spotsLeft} spots left`}
                </p>
              </div>
              <p className="text-text-secondary">
                {event.stats.registered} / {event.capacity} registered
              </p>
            </div>
          </Cell>
        )}

        {/* Description */}
        {event.description && (
          <Cell title="About This Event">
            <p className="text-text-primary whitespace-pre-wrap">
              {event.description}
            </p>
          </Cell>
        )}

        {/* Organizer Info */}
        <Cell title="Organized By">
          <p className="text-text-primary">Event Team</p>
        </Cell>
      </main>

      {/* Sticky Register Button */}
      {!isPast && (
        <div className="fixed bottom-24 left-0 right-0 px-6 max-w-4xl mx-auto">
          <button
            onClick={() => router.push(`/events/${event.id}/register`)}
            disabled={isFull}
            className={`btn-primary w-full py-4 text-lg shadow-lg ${
              isFull ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFull ? "Event Full" : "Register for Event"}
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
