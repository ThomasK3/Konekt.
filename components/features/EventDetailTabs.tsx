"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/Card";
import { ParticipantsTab } from "./ParticipantsTab";
import { ProgramTab } from "./ProgramTab";
import { AnalyticsTab } from "./AnalyticsTab";
import type { Participant } from "@/lib/actions/participants";
import type { AgendaItem } from "@/lib/actions/agenda";
import type { EventAnalytics } from "@/lib/actions/analytics";

// Lazy-load QRScanner so camera only mounts when tab is active
const QRScanner = dynamic(
  () => import("./QRScanner").then((m) => ({ default: m.QRScanner })),
  { ssr: false }
);

const tabItems = ["Přehled", "Program", "Účastníci", "Check-in", "Analytika"] as const;
type Tab = (typeof tabItems)[number];

interface EventDetailTabsProps {
  eventId: string;
  eventName: string;
  descriptionHtml: string | null;
  participants: Participant[];
  agendaItems: AgendaItem[];
  analytics: EventAnalytics;
}

export function EventDetailTabs({
  eventId,
  eventName,
  descriptionHtml,
  participants,
  agendaItems,
  analytics,
}: EventDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Přehled");

  return (
    <>
      {/* Tab bar */}
      <div className="flex gap-1 bg-surface rounded-2xl shadow-card p-1.5">
        {tabItems.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab
                ? "bg-coral/10 text-coral"
                : "text-darkblue/50 hover:text-darkblue hover:bg-input"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Přehled" && descriptionHtml && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold text-darkblue mb-3">O eventu</h2>
            <p className="text-darkblue/70 font-medium leading-relaxed whitespace-pre-wrap">
              {descriptionHtml}
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "Program" && (
        <ProgramTab items={agendaItems} eventId={eventId} />
      )}

      {activeTab === "Účastníci" && (
        <ParticipantsTab participants={participants} eventName={eventName} />
      )}

      {activeTab === "Check-in" && <QRScanner eventId={eventId} />}

      {activeTab === "Analytika" && <AnalyticsTab data={analytics} />}
    </>
  );
}
