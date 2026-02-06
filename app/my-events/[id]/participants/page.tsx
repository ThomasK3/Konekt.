"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { Cell } from "@/components/cells/Cell";
import { EmptyState } from "@/components/ui/EmptyState";
import { getEventById, Event, Participant } from "@/lib/mockEventsStore";

export default function ParticipantsListPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");

  useEffect(() => {
    const eventData = getEventById(params.id);
    if (!eventData) {
      router.push("/my-events");
      return;
    }
    setEvent(eventData);
    setParticipants(eventData.participants || []);
  }, [params.id, router]);

  // Filter participants
  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.company &&
        p.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.role && p.role.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCompany =
      filterCompany === "all" || p.company === filterCompany;

    return matchesSearch && matchesCompany;
  });

  // Get unique companies for filter
  const companies = [
    "all",
    ...Array.from(
      new Set(
        participants.map((p) => p.company).filter((c): c is string => Boolean(c))
      )
    ),
  ];

  if (!event) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border-light sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
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
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-text-primary">
                Networking
              </h1>
              <p className="text-sm text-text-secondary truncate">
                {event.name}
              </p>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, or role..."
            className="input w-full mb-3"
          />

          {/* Company Filter */}
          {companies.length > 2 && (
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="input w-full"
            >
              <option value="all">All Companies</option>
              {companies.slice(1).map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="mb-6">
          <p className="text-text-secondary">
            {filteredParticipants.length}{" "}
            {filteredParticipants.length === 1 ? "person" : "people"} attending
          </p>
        </div>

        {/* Participant Cards */}
        {filteredParticipants.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No participants found"
            description={
              searchQuery
                ? "Try a different search term"
                : "No one has registered yet"
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredParticipants.map((participant) => (
              <Cell
                key={participant.id}
                hover
                onClick={() =>
                  router.push(
                    `/my-events/${params.id}/participants/${participant.id}`
                  )
                }
                className="cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary">
                      {participant.name}
                    </h3>
                    {(participant.role || participant.company) && (
                      <p className="text-sm text-text-secondary">
                        {participant.role && participant.company
                          ? `${participant.role} at ${participant.company}`
                          : participant.role || participant.company}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="text-text-secondary">
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
                      <path d="M7 5L12 10L7 15" />
                    </svg>
                  </div>
                </div>
              </Cell>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
