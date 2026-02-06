"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { BottomNav } from "@/components/layout/BottomNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { Cell } from "@/components/cells/Cell";
import { getEventById, Event } from "@/lib/mockEventsStore";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between py-2 border-b border-border-light last:border-0">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}

interface EventInfoTabProps {
  event: Event;
}

function EventInfoTab({ event }: EventInfoTabProps) {
  return (
    <div className="space-y-6">
      <Cell title="Event Details">
        <div className="space-y-0">
          <InfoRow label="Date" value={formatDate(event.date)} />
          <InfoRow label="Time" value={event.time} />
          <InfoRow label="Location" value={event.location} />
          <InfoRow label="Capacity" value={`${event.stats.registered} / ${event.capacity}`} />
        </div>
      </Cell>

      {event.description && (
        <Cell title="About">
          <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
            {event.description}
          </p>
        </Cell>
      )}
    </div>
  );
}

interface QRCodeTabProps {
  qrDataUrl: string;
  event: Event;
}

function QRCodeTab({ qrDataUrl, event }: QRCodeTabProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <h2 className="text-2xl font-bold text-text-primary mb-2">
        Ready for Check-in
      </h2>
      <p className="text-text-secondary mb-8 text-center">
        Show this QR code at the event entrance
      </p>

      {qrDataUrl ? (
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <img src={qrDataUrl} alt="My QR Code" className="w-80 h-80" />
        </div>
      ) : (
        <div className="w-80 h-80 bg-gray-100 rounded-3xl flex items-center justify-center">
          <p className="text-text-secondary">Generating QR code...</p>
        </div>
      )}

      <p className="text-lg font-semibold text-text-primary mt-6">
        {event.name}
      </p>
      <p className="text-text-secondary">
        {formatDate(event.date)} at {event.time}
      </p>
    </div>
  );
}

export default function MyEventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "info");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [myParticipantId, setMyParticipantId] = useState<string>("");

  useEffect(() => {
    const eventData = getEventById(params.id);
    if (!eventData) {
      router.push("/my-events");
      return;
    }
    setEvent(eventData);

    // Get my participant ID from localStorage
    try {
      const registrations = JSON.parse(
        localStorage.getItem("myRegistrations") || "[]"
      );
      const myReg = registrations.find((r: any) => r.eventId === params.id);
      if (myReg) {
        setMyParticipantId(myReg.participantId);

        // Generate QR code
        QRCode.toDataURL(myReg.participantId, { width: 400 })
          .then(setQrDataUrl)
          .catch((err) => console.error("QR generation error:", err));
      }
    } catch (error) {
      console.error("Error loading registration:", error);
    }
  }, [params.id, router]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/my-events/${params.id}?tab=${tabId}`);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-sm border border-border-light flex items-center justify-center"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {sidebarOpen ? (
            <>
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </>
          )}
        </svg>
      </button>

      {/* Left Sidebar */}
      <LeftSidebar
        items={[
          {
            id: "info",
            label: "Event Info",
            icon: (
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
                <circle cx="10" cy="10" r="8" />
                <line x1="10" y1="14" x2="10" y2="10" />
                <line x1="10" y1="6" x2="10" y2="6" />
              </svg>
            ),
          },
          {
            id: "qr",
            label: "My QR Code",
            icon: (
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
                <rect x="3" y="3" width="6" height="6" rx="1" />
                <rect x="11" y="3" width="6" height="6" rx="1" />
                <rect x="3" y="11" width="6" height="6" rx="1" />
                <rect x="13" y="13" width="2" height="2" />
                <rect x="13" y="11" width="2" height="2" />
                <rect x="11" y="13" width="2" height="2" />
              </svg>
            ),
          },
          {
            id: "networking",
            label: "Networking",
            icon: (
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
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            ),
          },
        ]}
        activeItem={activeTab}
        onItemClick={handleTabChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Back Button & Title */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/my-events")}
            className="text-text-secondary hover:text-text-primary flex items-center gap-2 transition-colors mb-4"
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
            Back to My Events
          </button>
          <h1 className="text-h1 font-bold text-text-primary">{event.name}</h1>
        </div>

        {/* Tab Content */}
        {activeTab === "info" && <EventInfoTab event={event} />}
        {activeTab === "qr" && <QRCodeTab qrDataUrl={qrDataUrl} event={event} />}
        {activeTab === "networking" && (
          <div className="space-y-6">
            <Cell title="Meet Other Attendees">
              <p className="text-text-secondary mb-4">
                Connect with {event.participants?.length || 0} other{" "}
                {event.participants?.length === 1 ? "person" : "people"}{" "}
                attending this event.
              </p>
              <button
                onClick={() => router.push(`/my-events/${params.id}/participants`)}
                className="btn-primary w-full"
              >
                View All Participants
              </button>
            </Cell>

            <Cell title="Networking Tips">
              <div className="space-y-2 text-sm text-text-secondary">
                <p className="flex items-start gap-2">
                  <span>💡</span>
                  <span>Browse the participant list before the event</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>🤝</span>
                  <span>
                    Reach out to people with similar interests on LinkedIn
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span>📝</span>
                  <span>Prepare conversation starters based on their profiles</span>
                </p>
              </div>
            </Cell>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
