"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Cell } from "@/components/cells/Cell";
import { Button } from "@/components/ui/Button";
import { getEventById, Event, Participant } from "@/lib/mockEventsStore";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ParticipantProfilePage({
  params,
}: {
  params: { id: string; participantId: string };
}) {
  const router = useRouter();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const eventData = getEventById(params.id);
    if (!eventData) {
      router.push("/my-events");
      return;
    }
    setEvent(eventData);

    // Find participant
    const p = eventData.participants?.find(
      (p) => p.id === params.participantId
    );
    if (!p) {
      router.push(`/my-events/${params.id}/participants`);
      return;
    }
    setParticipant(p);
  }, [params.id, params.participantId, router]);

  if (!participant || !event) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  // Create LinkedIn search URL
  const linkedinUrl = `https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(
    participant.name
  )}`;

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border-light">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Card */}
        <Cell>
          <div className="text-center">
            {/* Large Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-5xl mx-auto mb-6">
              {participant.name.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {participant.name}
            </h1>

            {/* Role & Company */}
            {(participant.role || participant.company) && (
              <p className="text-lg text-text-secondary mb-6">
                {participant.role && participant.company
                  ? `${participant.role} at ${participant.company}`
                  : participant.role || participant.company}
              </p>
            )}

            {/* Connect Button */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </Cell>

        {/* Contact Info */}
        {participant.email && (
          <Cell title="Contact">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-secondary mb-1">Email</p>
                <a
                  href={`mailto:${participant.email}`}
                  className="text-text-primary hover:text-blue-600 transition-colors"
                >
                  {participant.email}
                </a>
              </div>
            </div>
          </Cell>
        )}

        {/* Event Context */}
        <Cell title="Attending">
          <div className="flex items-center gap-3">
            {event.coverImage && (
              <img
                src={event.coverImage}
                alt={event.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-text-primary">{event.name}</p>
              <p className="text-sm text-text-secondary">
                {formatDate(event.date)} at {event.time}
              </p>
            </div>
          </div>
        </Cell>

        {/* Registration Info */}
        <Cell title="Registration">
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-text-secondary">Status</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {participant.status === "registered"
                  ? "✓ Registered"
                  : participant.status === "checked-in"
                  ? "✓ Checked In"
                  : "Cancelled"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-text-secondary">Registered</span>
              <span className="text-text-primary">
                {formatDate(participant.registeredAt)}
              </span>
            </div>
          </div>
        </Cell>

        {/* Conversation Starters */}
        <Cell title="Conversation Starters">
          <div className="space-y-2 text-sm text-text-secondary">
            {participant.company && (
              <p className="flex items-start gap-2">
                <span>💼</span>
                <span>Ask about their role at {participant.company}</span>
              </p>
            )}
            <p className="flex items-start gap-2">
              <span>🎯</span>
              <span>Discuss the event sessions and topics</span>
            </p>
            <p className="flex items-start gap-2">
              <span>🤝</span>
              <span>Explore potential collaborations</span>
            </p>
          </div>
        </Cell>
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
