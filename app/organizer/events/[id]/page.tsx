"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import EventHeader from "@/components/EventHeader";
import OverviewTab from "@/components/tabs/OverviewTab";
import ProgramTab from "@/components/tabs/ProgramTab";
import ParticipantsTab from "@/components/tabs/ParticipantsTab";
import CheckinTab from "@/components/tabs/CheckinTab";

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

function LoadingState() {
  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-text-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-base text-text-secondary">Loading event...</p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-h2 font-bold text-text-primary mb-2">
          Event Not Found
        </h2>
        <p className="text-base text-text-secondary mb-6">{message}</p>
        <button
          onClick={() => router.push("/organizer/dashboard")}
          className="btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = params.id;

  // Tab state from URL
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "overview"
  );
  const [activeNav, setActiveNav] = useState("events");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Event data
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        // TODO: Fetch from Supabase
        // For now: mock data
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock event data
        const mockEvent: Event = {
          id: eventId,
          name: "Startup Meetup Prague",
          date: "2026-03-15",
          time: "18:00",
          location: "Karlin Hall, Prague",
          description:
            "Monthly networking event for Prague startup community. Connect with founders, investors, and enthusiasts.",
          coverImage:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
          capacity: 100,
          visibility: "public",
          status: "published",
          stats: {
            registered: 50,
            checkedIn: 0,
            attendanceRate: 0,
            noShows: 0,
          },
        };

        setEvent(mockEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Update tab from URL changes
  useEffect(() => {
    const tab = searchParams.get("tab") || "overview";
    setActiveTab(tab);
  }, [searchParams]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/organizer/events/${eventId}?tab=${tabId}`);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!event) {
    return <ErrorState message="The event you're looking for doesn't exist." />;
  }

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-button border border-border-light flex items-center justify-center"
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

      {/* Left Sidebar - TABS (not filters) */}
      <LeftSidebar
        items={[
          { id: "overview", label: "Overview", icon: "📋" },
          { id: "program", label: "Program", icon: "🎤" },
          {
            id: "participants",
            label: "Participants",
            icon: "👥",
            badge: event.stats.registered,
          },
          { id: "checkin", label: "Check-in", icon: "✅" },
        ]}
        activeItem={activeTab}
        onItemClick={handleTabChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Event Header - Shows on ALL tabs */}
        <EventHeader event={event} />

        {/* Tab Content */}
        {activeTab === "overview" && (
          <OverviewTab event={event} setEvent={setEvent} />
        )}
        {activeTab === "program" && <ProgramTab eventId={eventId} />}
        {activeTab === "participants" && <ParticipantsTab eventId={eventId} />}
        {activeTab === "checkin" && <CheckinTab eventId={eventId} />}
      </main>

      {/* Bottom Nav */}
      <BottomNav
        items={[
          { id: "dashboard", label: "Dashboard", icon: "🏠" },
          { id: "events", label: "Events", icon: "📊" },
          { id: "new", label: "New Event", icon: "➕" },
          { id: "profile", label: "Profile", icon: "👤" },
        ]}
        activeItem={activeNav}
        onItemClick={(id) => {
          setActiveNav(id);
          if (id === "dashboard") router.push("/organizer/dashboard");
          if (id === "new") router.push("/organizer/events/new");
          if (id === "profile") router.push("/organizer/profile");
          // 'events' stays on current page
        }}
      />
    </div>
  );
}
