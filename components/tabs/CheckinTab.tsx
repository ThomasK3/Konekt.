"use client";

import { useState } from "react";
import { Cell } from "@/components/cells/Cell";
import { EmptyState } from "@/components/ui/EmptyState";

interface Participant {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: "registered" | "checked-in" | "cancelled";
  checkedInAt?: string | null;
  qrCode?: string;
}

interface CheckinTabProps {
  eventId: string;
}

const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
    company: "TechStart Inc.",
    status: "checked-in",
    checkedInAt: "2026-03-15T18:05:00Z",
    qrCode: "QR001",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    company: "Innovate Labs",
    status: "registered",
    checkedInAt: null,
    qrCode: "QR002",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    company: "Startup Hub",
    status: "registered",
    checkedInAt: null,
    qrCode: "QR003",
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice@example.com",
    company: "Growth Co.",
    status: "registered",
    checkedInAt: null,
    qrCode: "QR004",
  },
  {
    id: "5",
    name: "Mike Brown",
    email: "mike@example.com",
    company: "Dev Studio",
    status: "registered",
    checkedInAt: null,
    qrCode: "QR005",
  },
];

export default function CheckinTab({ eventId }: CheckinTabProps) {
  const [participants, setParticipants] =
    useState<Participant[]>(mockParticipants);
  const [isScanning, setIsScanning] = useState(false);
  const [lastCheckin, setLastCheckin] = useState<Participant | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  // Stats
  const checkedInCount = participants.filter(
    (p) => p.status === "checked-in"
  ).length;
  const totalCount = participants.length;
  const pendingCount = totalCount - checkedInCount;
  const percentage =
    totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0;

  // Mock scan (for demo without camera)
  const handleMockScan = () => {
    const notCheckedIn = participants.filter((p) => p.status !== "checked-in");

    if (notCheckedIn.length === 0) {
      setScanError("All participants already checked in!");
      setTimeout(() => setScanError(null), 3000);
      return;
    }

    // Pick random participant
    const random =
      notCheckedIn[Math.floor(Math.random() * notCheckedIn.length)];

    // Check in
    const updated = participants.map((p) =>
      p.id === random.id
        ? { ...p, status: "checked-in" as const, checkedInAt: new Date().toISOString() }
        : p
    );
    setParticipants(updated);
    setLastCheckin(random);

    // TODO: Update Supabase
    console.log("Checked in:", random.name);

    // Clear success after 3 seconds
    setTimeout(() => setLastCheckin(null), 3000);
  };

  // Recent check-ins (last 10)
  const recentCheckins = participants
    .filter((p) => p.status === "checked-in" && p.checkedInAt)
    .sort(
      (a, b) =>
        (b.checkedInAt || "").localeCompare(a.checkedInAt || "")
    )
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-h2 font-bold text-text-primary mb-2">
          Check-in Scanner
        </h2>
        <p className="text-text-secondary">
          Scan attendee QR codes for quick check-in at the event entrance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Cell className="text-center">
          <p className="text-4xl font-bold text-green-600">{checkedInCount}</p>
          <p className="text-small text-text-secondary mt-1">Checked In</p>
        </Cell>
        <Cell className="text-center">
          <p className="text-4xl font-bold text-blue-600">{pendingCount}</p>
          <p className="text-small text-text-secondary mt-1">Pending</p>
        </Cell>
        <Cell className="text-center">
          <p className="text-4xl font-bold text-text-primary">{percentage}%</p>
          <p className="text-small text-text-secondary mt-1">Rate</p>
        </Cell>
      </div>

      {/* Scanner */}
      <Cell>
        <div className="flex flex-col items-center justify-center py-8">
          {isScanning ? (
            <div className="w-full max-w-md">
              {/* Camera Viewfinder Placeholder */}
              <div className="aspect-square bg-gray-900 rounded-2xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-white/50 rounded-2xl"></div>
                </div>
                <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                  Position QR code in the frame
                </p>
              </div>

              {/* Mock Scan Button (for demo) */}
              <button
                onClick={handleMockScan}
                className="btn-primary w-full mb-3"
              >
                🎲 Mock Scan (Demo)
              </button>

              <button
                onClick={() => setIsScanning(false)}
                className="btn-secondary w-full"
              >
                Stop Scanning
              </button>
            </div>
          ) : (
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                Ready to Scan
              </h3>
              <p className="text-text-secondary mb-6">
                Position attendee&apos;s QR code in front of the camera for
                instant check-in
              </p>
              <button
                onClick={() => setIsScanning(true)}
                className="btn-primary"
              >
                Start Scanner
              </button>
            </div>
          )}
        </div>

        {/* Success Message */}
        {lastCheckin && (
          <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-2xl text-center animate-pulse">
            <p className="text-4xl mb-3">✅</p>
            <p className="text-xl font-bold text-green-900 mb-1">
              {lastCheckin.name}
            </p>
            <p className="text-green-700">Checked in successfully!</p>
            {lastCheckin.company && (
              <p className="text-small text-green-600 mt-2">
                {lastCheckin.company}
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {scanError && (
          <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-center">
            <p className="text-4xl mb-3">❌</p>
            <p className="font-bold text-red-900">{scanError}</p>
          </div>
        )}
      </Cell>

      {/* Recent Check-ins */}
      <Cell title={`Recent Check-ins (${recentCheckins.length})`}>
        {recentCheckins.length === 0 ? (
          <EmptyState
            icon="⏳"
            title="No check-ins yet"
            description="Scanned attendees will appear here in real-time"
          />
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentCheckins.map((participant, index) => (
              <div
                key={participant.id}
                className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">
                      {participant.name}
                    </p>
                    <p className="text-small text-text-secondary">
                      {participant.company}
                    </p>
                  </div>
                </div>
                <p className="text-small text-text-secondary">
                  {participant.checkedInAt &&
                    new Date(participant.checkedInAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                </p>
              </div>
            ))}
          </div>
        )}
      </Cell>
    </div>
  );
}
