"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/Card";
import { ParticipantsTab } from "./ParticipantsTab";
import type { Participant } from "@/lib/actions/participants";

// Lazy-load QRScanner so camera only mounts when tab is active
const QRScanner = dynamic(
  () => import("./QRScanner").then((m) => ({ default: m.QRScanner })),
  { ssr: false }
);

const tabItems = ["Přehled", "Program", "Účastníci", "Check-in"] as const;
type Tab = (typeof tabItems)[number];

interface EventDetailTabsProps {
  eventId: string;
  eventName: string;
  descriptionHtml: string | null;
  participants: Participant[];
}

export function EventDetailTabs({
  eventId,
  eventName,
  descriptionHtml,
  participants,
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
        <Card>
          <CardContent className="flex flex-col items-center text-center py-12 gap-2">
            <p className="text-darkblue/40 font-medium">
              Program bude brzy k dispozici.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "Účastníci" && (
        <ParticipantsTab participants={participants} eventName={eventName} />
      )}

      {activeTab === "Check-in" && <QRScanner eventId={eventId} />}
    </>
  );
}
