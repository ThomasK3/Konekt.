"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StatCard } from "@/components/cards/StatCard";
import { Cell } from "@/components/cells/Cell";
import { updateEvent, deleteEvent } from "@/lib/mockEventsStore";

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

interface OverviewTabProps {
  event: Event;
  setEvent: (event: Event) => void;
  onShare?: () => void;
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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      <span className="text-small font-medium text-text-secondary w-32 flex-shrink-0">
        {label}
      </span>
      <span className="text-base text-text-primary">{value}</span>
    </div>
  );
}

function EventInfoDisplay({ event }: { event: Event }) {
  return (
    <div className="space-y-4">
      <InfoRow
        label="Description"
        value={event.description || "No description provided"}
      />
      <InfoRow label="Date" value={formatDate(event.date)} />
      <InfoRow label="Time" value={event.time} />
      <InfoRow label="Location" value={event.location} />
      <InfoRow
        label="Capacity"
        value={`${event.stats.registered} / ${event.capacity} registered`}
      />
      <InfoRow
        label="Visibility"
        value={
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-bg-page text-text-primary">
            {event.visibility === "public"
              ? "🌐 Public"
              : event.visibility === "private"
              ? "🔒 Private"
              : "✉️ Invite Only"}
          </span>
        }
      />
      <InfoRow
        label="Status"
        value={
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
              event.status === "published"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {event.status === "published" ? "🟢 Published" : "✏️ Draft"}
          </span>
        }
      />
    </div>
  );
}

function EventEditForm({
  formData,
  setFormData,
}: {
  formData: Event;
  setFormData: (data: Event) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Event Name */}
      <div>
        <label className="block text-small font-medium text-text-primary mb-2">
          Event Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-small font-medium text-text-primary mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="textarea"
          rows={4}
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-small font-medium text-text-primary mb-2">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="input"
          />
        </div>
        <div>
          <label className="block text-small font-medium text-text-primary mb-2">
            Time
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            className="input"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-small font-medium text-text-primary mb-2">
          Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="input"
        />
      </div>

      {/* Capacity */}
      <div>
        <label className="block text-small font-medium text-text-primary mb-2">
          Capacity
        </label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) =>
            setFormData({ ...formData, capacity: parseInt(e.target.value) })
          }
          className="input"
          min={1}
        />
      </div>

      {/* Visibility */}
      <div>
        <label className="block text-small font-medium text-text-primary mb-2">
          Visibility
        </label>
        <select
          value={formData.visibility}
          onChange={(e) =>
            setFormData({
              ...formData,
              visibility: e.target.value as Event["visibility"],
            })
          }
          className="input"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="invite-only">Invite Only</option>
        </select>
      </div>
    </div>
  );
}

export default function OverviewTab({
  event,
  setEvent,
  onShare,
}: OverviewTabProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Event>({ ...event });

  const handleSave = async () => {
    try {
      // Update in mock store
      const success = updateEvent(event.id, formData);

      if (success) {
        setEvent(formData);
        setIsEditing(false);
        alert("Event updated successfully!");
      } else {
        throw new Error("Event not found in store");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this event? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      // Delete from mock store
      const success = deleteEvent(event.id);

      if (success) {
        alert("Event deleted successfully!");
        router.push("/organizer/events");
      } else {
        throw new Error("Event not found in store");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      // Fallback for legacy behavior
      const eventUrl = `${window.location.origin}/events/${event.id}`;
      navigator.clipboard.writeText(eventUrl);
      alert("Event link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value={event.stats.registered} label="Registered" />
        <StatCard value={event.stats.checkedIn} label="Checked In" />
        <StatCard
          value={`${event.stats.attendanceRate}%`}
          label="Attendance Rate"
        />
        <StatCard value={event.stats.noShows} label="No-shows" />
      </div>

      {/* Event Information Card */}
      <Cell
        title="Event Information"
        actions={
          !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary text-sm px-4 py-2"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ ...event });
                }}
                className="btn-secondary text-sm px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary text-sm px-4 py-2"
              >
                Save
              </button>
            </div>
          )
        }
      >
        {isEditing ? (
          <EventEditForm formData={formData} setFormData={setFormData} />
        ) : (
          <EventInfoDisplay event={event} />
        )}
      </Cell>

      {/* Quick Actions Card */}
      <Cell title="Quick Actions">
        <div className="flex flex-wrap gap-3">
          <button onClick={handleShare} className="btn-secondary">
            📤 Share Event
          </button>
          <button
            onClick={() =>
              router.push(`/organizer/events/${event.id}?tab=program`)
            }
            className="btn-secondary"
          >
            🎤 Manage Program
          </button>
          <button
            onClick={() =>
              router.push(`/organizer/events/${event.id}?tab=participants`)
            }
            className="btn-secondary"
          >
            👥 View Participants
          </button>
        </div>
      </Cell>

      {/* Danger Zone Card */}
      <Cell title="Danger Zone">
        <div className="flex flex-col gap-3">
          <p className="text-small text-text-secondary">
            Once you delete an event, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDelete}
            className="btn-secondary text-red-600 border-red-600 hover:bg-red-600 hover:text-white w-fit"
          >
            🗑️ Delete Event
          </button>
        </div>
      </Cell>
    </div>
  );
}
