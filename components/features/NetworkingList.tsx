"use client";

import { useTransition } from "react";
import { Users, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { connectWithUser } from "@/lib/actions/networking";
import type { PublicAttendee } from "@/lib/actions/participants";

const AVATAR_COLORS = [
  "bg-coral/20 text-coral",
  "bg-teal/20 text-teal",
  "bg-darkblue/20 text-darkblue",
  "bg-orange/20 text-orange",
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function NetworkingList({
  attendees,
  eventId,
  connectedIds = [],
  currentUserId,
}: {
  attendees: PublicAttendee[];
  eventId: string;
  connectedIds?: string[];
  currentUserId?: string;
}) {
  if (attendees.length <= 1) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-darkblue/40" />
        <h2 className="text-xl font-bold text-darkblue">
          Kdo další dorazí?
        </h2>
        <span className="text-sm text-darkblue/40 font-medium">
          ({attendees.length})
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {attendees.map((person) => {
          const isSelf = currentUserId === person.id;
          const isConnected = connectedIds.includes(person.id);

          return (
            <AttendeeCard
              key={person.id}
              person={person}
              eventId={eventId}
              isSelf={isSelf}
              isConnected={isConnected}
            />
          );
        })}
      </div>
    </div>
  );
}

function AttendeeCard({
  person,
  eventId,
  isSelf,
  isConnected,
}: {
  person: PublicAttendee;
  eventId: string;
  isSelf: boolean;
  isConnected: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const name = person.name ?? "Účastník";
  const detail = [person.company, person.job_title]
    .filter(Boolean)
    .join(" · ");

  function handleConnect() {
    startTransition(async () => {
      const result = await connectWithUser(person.id, eventId);
      if (result.success) {
        toast.success(`Propojeno! +10 XP`);
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Card className="shadow-sm hover:-translate-y-1 transition-transform">
      <CardContent className="flex flex-col items-center text-center p-4">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold ${getColor(name)}`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <p className="text-darkblue font-medium mt-3 text-sm truncate w-full">
          {name}
        </p>
        {detail && (
          <p className="text-xs text-darkblue/50 font-medium mt-1 truncate w-full">
            {detail}
          </p>
        )}

        {/* Connect button (not shown for self) */}
        {!isSelf && (
          <button
            onClick={handleConnect}
            disabled={isConnected || pending}
            className={`mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isConnected
                ? "bg-teal/10 text-teal cursor-default"
                : "bg-darkblue/5 text-darkblue/60 hover:bg-coral/10 hover:text-coral"
            }`}
          >
            {isConnected ? (
              <>
                <Check className="w-3 h-3" />
                Propojeno
              </>
            ) : pending ? (
              "Ukládám..."
            ) : (
              <>
                <Plus className="w-3 h-3" />
                Propojit
              </>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
