"use client";

import { useMemo, useState } from "react";
import { Search, Download } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Participant } from "@/lib/actions/participants";

const AVATAR_COLORS = [
  "bg-coral/20 text-coral",
  "bg-teal/20 text-teal",
  "bg-orange/20 text-orange",
  "bg-darkblue/20 text-darkblue",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitial(name: string | null) {
  return name?.charAt(0)?.toUpperCase() ?? "?";
}

export function ParticipantsTab({
  participants,
  eventName,
}: {
  participants: Participant[];
  eventName: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return participants;
    const q = query.toLowerCase();
    return participants.filter(
      (p) =>
        p.user?.name?.toLowerCase().includes(q) ||
        p.user?.email?.toLowerCase().includes(q) ||
        p.user?.company?.toLowerCase().includes(q)
    );
  }, [participants, query]);

  function exportCSV() {
    const header = "Jméno,Email,Společnost,Pozice,Status,Registrace\n";
    const rows = filtered
      .map((p) => {
        const name = p.user?.name ?? "";
        const email = p.user?.email ?? "";
        const company = p.user?.company ?? "";
        const position = p.user?.job_title ?? "";
        const status = p.status === "checked_in" ? "Check-in OK" : "Registrovaný";
        const date = new Date(p.created_at).toLocaleDateString("cs-CZ");
        return `"${name}","${email}","${company}","${position}","${status}","${date}"`;
      })
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventName.replace(/\s+/g, "-").toLowerCase()}-ucastnici.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportováno!");
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-darkblue/40" />
            <Input
              placeholder="Hledat podle jména..."
              className="pl-11 h-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={exportCSV}
            className="gap-2 shrink-0"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Count */}
        <p className="text-sm text-darkblue/50 font-medium">
          {filtered.length} účastník{filtered.length === 1 ? "" : filtered.length < 5 ? "i" : "ů"}
        </p>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-darkblue/40 font-medium">
              {query ? "Nikdo nenalezen." : "Zatím žádní účastníci."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-darkblue/5">
            {filtered.map((p) => {
              const name = p.user?.name ?? "Neznámý";
              const isCheckedIn = p.status === "checked_in";

              return (
                <div
                  key={p.id}
                  className="flex items-center gap-4 py-3 hover:bg-background/50 -mx-2 px-2 rounded-xl transition-colors"
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getAvatarColor(name)}`}
                  >
                    {getInitial(name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-darkblue truncate">
                      {name}
                    </p>
                    <p className="text-xs text-darkblue/50 font-medium truncate">
                      {[p.user?.company, p.user?.job_title]
                        .filter(Boolean)
                        .join(" · ") || p.user?.email}
                    </p>
                  </div>

                  {/* Status + date */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isCheckedIn
                          ? "bg-teal/10 text-teal"
                          : "bg-orange/10 text-orange"
                      }`}
                    >
                      {isCheckedIn ? "Check-in OK" : "Registrovaný"}
                    </span>
                    <span className="text-[11px] text-darkblue/40 font-medium">
                      {new Date(
                        isCheckedIn && p.checked_in_at
                          ? p.checked_in_at
                          : p.created_at
                      ).toLocaleDateString("cs-CZ", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
