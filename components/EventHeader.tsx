"use client";

import { useRouter } from "next/navigation";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  coverImage?: string;
  capacity: number;
  visibility: "public" | "private" | "invite-only";
  status: "draft" | "published";
  stats: {
    registered: number;
    checkedIn: number;
    attendanceRate: number;
    noShows: number;
  };
}

interface EventHeaderProps {
  event: Event;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getStatusClass(status: string): string {
  return status === "published"
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
}

export default function EventHeader({ event }: EventHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      {/* Back Button - Above Cover */}
      <button
        onClick={() => router.back()}
        className="text-text-secondary hover:text-text-primary flex items-center gap-2 mb-4 transition-colors"
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
        Back to Events
      </button>

      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-text-primary to-text-secondary" />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Event info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-h1 text-white mb-2 drop-shadow-lg">
            {event.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/90 text-base md:text-lg drop-shadow-md">
            <span className="flex items-center gap-2">
              📅 {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2">⏰ {event.time}</span>
            <span className="flex items-center gap-2">📍 {event.location}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusClass(
              event.status
            )}`}
          >
            {event.status === "published" ? "🟢 Live" : "✏️ Draft"}
          </span>
        </div>
      </div>
    </div>
  );
}
