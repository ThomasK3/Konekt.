"use client";

import { useState } from "react";
import { Cell } from "@/components/cells/Cell";
import { EmptyState } from "@/components/ui/EmptyState";

interface Session {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  room: string;
  speakerName: string;
  speakerBio: string;
  eventId?: string;
}

interface ProgramTabProps {
  eventId: string;
}

const mockSessions: Session[] = [
  {
    id: "1",
    title: "Welcome & Introductions",
    startTime: "18:00",
    endTime: "18:30",
    room: "Main Hall",
    speakerName: "John Doe",
    speakerBio: "Event organizer and startup mentor",
  },
  {
    id: "2",
    title: "Networking Session",
    startTime: "18:30",
    endTime: "19:30",
    room: "Main Hall",
    speakerName: "",
    speakerBio: "",
  },
];

export default function ProgramTab({ eventId }: ProgramTabProps) {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    room: "",
    speakerName: "",
    speakerBio: "",
  });

  const handleAdd = () => {
    if (!formData.title || !formData.startTime || !formData.endTime) {
      alert("Please fill in required fields");
      return;
    }

    const newSession: Session = {
      id: Date.now().toString(),
      ...formData,
      eventId,
    };

    setSessions([...sessions, newSession]);
    setIsAddingSession(false);
    resetForm();

    // TODO: Save to Supabase
    console.log("Added session:", newSession);
  };

  const handleEdit = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setFormData({
        title: session.title,
        startTime: session.startTime,
        endTime: session.endTime,
        room: session.room,
        speakerName: session.speakerName,
        speakerBio: session.speakerBio,
      });
      setEditingId(sessionId);
      setIsAddingSession(true);
    }
  };

  const handleUpdate = () => {
    const updated = sessions.map((s) =>
      s.id === editingId ? { ...s, ...formData } : s
    );
    setSessions(updated);
    setIsAddingSession(false);
    setEditingId(null);
    resetForm();

    // TODO: Update in Supabase
    console.log("Updated session:", editingId);
  };

  const handleDelete = (sessionId: string) => {
    if (!confirm("Delete this session?")) return;

    setSessions(sessions.filter((s) => s.id !== sessionId));

    // TODO: Delete from Supabase
    console.log("Deleted session:", sessionId);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      startTime: "",
      endTime: "",
      room: "",
      speakerName: "",
      speakerBio: "",
    });
  };

  // Sort sessions by start time
  const sortedSessions = [...sessions].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-bold text-text-primary">Event Program</h2>
        <button
          onClick={() => setIsAddingSession(true)}
          className="btn-primary"
        >
          + Add Session
        </button>
      </div>

      {/* Add/Edit Session Form */}
      {isAddingSession && (
        <Cell title={editingId ? "Edit Session" : "Add New Session"}>
          <div className="space-y-4">
            {/* Session Title */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Session Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Welcome & Introductions"
                className="input"
              />
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-small font-medium text-text-primary mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="input"
                />
              </div>
              <div>
                <label className="block text-small font-medium text-text-primary mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="input"
                />
              </div>
            </div>

            {/* Room/Stage */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Room/Stage
              </label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) =>
                  setFormData({ ...formData, room: e.target.value })
                }
                placeholder="e.g., Main Hall"
                className="input"
              />
            </div>

            {/* Speaker Info */}
            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Speaker Name
              </label>
              <input
                type="text"
                value={formData.speakerName}
                onChange={(e) =>
                  setFormData({ ...formData, speakerName: e.target.value })
                }
                placeholder="e.g., John Doe"
                className="input"
              />
            </div>

            <div>
              <label className="block text-small font-medium text-text-primary mb-2">
                Speaker Bio
              </label>
              <textarea
                value={formData.speakerBio}
                onChange={(e) =>
                  setFormData({ ...formData, speakerBio: e.target.value })
                }
                placeholder="Brief speaker introduction..."
                className="textarea"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsAddingSession(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="btn-primary"
              >
                {editingId ? "Update" : "Add"} Session
              </button>
            </div>
          </div>
        </Cell>
      )}

      {/* Sessions List */}
      {sortedSessions.length === 0 ? (
        <EmptyState
          icon="🎤"
          title="No sessions yet"
          description="Add your first session to build the event program"
          action={
            <button
              onClick={() => setIsAddingSession(true)}
              className="btn-primary"
            >
              Add Session
            </button>
          }
        />
      ) : (
        <div className="space-y-4">
          {sortedSessions.map((session) => (
            <Cell key={session.id} hover>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Time & Room */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-base font-semibold text-text-primary">
                      {session.startTime} - {session.endTime}
                    </span>
                    {session.room && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-bg-page text-text-primary">
                        {session.room}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {session.title}
                  </h3>

                  {/* Speaker */}
                  {session.speakerName && (
                    <div className="mb-2">
                      <p className="text-small text-text-secondary">
                        <span className="font-medium">Speaker:</span>{" "}
                        {session.speakerName}
                      </p>
                      {session.speakerBio && (
                        <p className="text-small text-text-secondary mt-1">
                          {session.speakerBio}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(session.id)}
                    className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="w-9 h-9 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </Cell>
          ))}
        </div>
      )}
    </div>
  );
}
