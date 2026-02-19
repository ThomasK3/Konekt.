import { Trophy, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import type { LeaderboardEntry } from "@/lib/actions/networking";

const MEDAL_STYLES = [
  "bg-orange/20 text-orange border-orange/30",
  "bg-darkblue/10 text-darkblue/60 border-darkblue/20",
  "bg-coral/15 text-coral border-coral/25",
];

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

export function Leaderboard({
  leaderboard,
  currentUserId,
  currentUserRank,
  currentUserEntry,
}: {
  leaderboard: LeaderboardEntry[];
  currentUserId: string;
  currentUserRank: number | null;
  currentUserEntry: LeaderboardEntry | null;
}) {
  if (leaderboard.length === 0) return null;

  const isCurrentInTop = leaderboard.some((e) => e.user_id === currentUserId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-orange" />
        <h2 className="text-lg font-bold text-darkblue">Top Networkeři</h2>
      </div>

      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-0 divide-y divide-darkblue/5">
          {leaderboard.map((entry, i) => {
            const rank = i + 1;
            const isSelf = entry.user_id === currentUserId;
            const name = entry.name ?? "Účastník";

            return (
              <div
                key={entry.user_id}
                className={`flex items-center gap-3 px-4 py-3 ${
                  isSelf ? "bg-coral/5" : ""
                }`}
              >
                {/* Rank badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 border ${
                    rank <= 3
                      ? MEDAL_STYLES[rank - 1]
                      : "bg-darkblue/5 text-darkblue/40 border-transparent"
                  }`}
                >
                  {rank}
                </div>

                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getColor(name)}`}
                >
                  {name.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-darkblue truncate">
                    {name}
                    {isSelf && (
                      <span className="text-coral ml-1 text-xs">(Ty)</span>
                    )}
                  </p>
                  {entry.company && (
                    <p className="text-[11px] text-darkblue/40 font-medium truncate">
                      {entry.company}
                    </p>
                  )}
                </div>

                {/* Points */}
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3.5 h-3.5 text-orange fill-orange" />
                  <span className="text-sm font-bold text-darkblue">
                    {entry.networking_points}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Current user if not in top */}
          {!isCurrentInTop && currentUserEntry && currentUserRank && (
            <>
              <div className="flex items-center justify-center py-1">
                <span className="text-[10px] text-darkblue/20 font-bold tracking-widest">
                  · · ·
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-coral/5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 bg-darkblue/5 text-darkblue/40 border border-transparent">
                  {currentUserRank}
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getColor(currentUserEntry.name ?? "U")}`}
                >
                  {(currentUserEntry.name ?? "U").charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-darkblue truncate">
                    {currentUserEntry.name ?? "Účastník"}
                    <span className="text-coral ml-1 text-xs">(Ty)</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3.5 h-3.5 text-orange fill-orange" />
                  <span className="text-sm font-bold text-darkblue">
                    {currentUserEntry.networking_points}
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
