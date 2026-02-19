import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Plus,
  CalendarDays,
  MapPin,
  Users,
  Pencil,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function EventsListPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch all events for this organizer
  const { data: events } = await supabase
    .from("events")
    .select("id, name, date, time, location, capacity, status, cover_image_url")
    .eq("organizer_id", user.id)
    .order("date", { ascending: false });

  const allEvents = events ?? [];

  // Fetch registration counts per event
  const eventIds = allEvents.map((e) => e.id);
  let regCountsMap: Record<string, number> = {};

  if (eventIds.length > 0) {
    const { data: regCounts } = await supabase
      .from("registrations")
      .select("event_id")
      .in("event_id", eventIds)
      .in("status", ["registered", "checked_in"]);

    if (regCounts) {
      for (const r of regCounts) {
        regCountsMap[r.event_id] = (regCountsMap[r.event_id] ?? 0) + 1;
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
          Moje Eventy
        </h1>
        <Link href="/organizer/events/new">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Nová událost
          </Button>
        </Link>
      </div>

      {/* List */}
      {allEvents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center text-center py-16 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center">
              <CalendarCheck className="w-7 h-7 text-coral" />
            </div>
            <div>
              <p className="text-darkblue font-bold mb-1">
                Zatím nemáte žádné eventy
              </p>
              <p className="text-sm text-darkblue/50 font-medium">
                Vytvořte svůj první event a začněte sbírat registrace.
              </p>
            </div>
            <Link href="/organizer/events/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Vytvořit první event
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {allEvents.map((event) => {
            const regCount = regCountsMap[event.id] ?? 0;

            return (
              <Card
                key={event.id}
                className="hover:-translate-y-0.5 hover:shadow-float transition-all"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Cover thumbnail */}
                    <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl overflow-hidden">
                      {event.cover_image_url ? (
                        <Image
                          src={event.cover_image_url}
                          alt={event.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-cool flex items-center justify-center">
                          <CalendarCheck className="w-8 h-8 text-white/30" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start gap-3">
                          <h2 className="text-base font-bold text-darkblue line-clamp-1">
                            {event.name}
                          </h2>
                          <span
                            className={`px-3 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                              event.status === "published"
                                ? "bg-teal/10 text-teal"
                                : "bg-orange/10 text-orange"
                            }`}
                          >
                            {event.status === "published"
                              ? "Publikováno"
                              : "Draft"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-darkblue/50 font-medium">
                          {event.date && (
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {new Date(event.date).toLocaleDateString(
                                "cs-CZ",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {event.location}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-teal" />
                          <span className="text-xs font-bold text-teal">
                            {regCount}
                          </span>
                          {event.capacity && (
                            <span className="text-xs text-darkblue/40 font-medium">
                              / {event.capacity} obsazeno
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/organizer/events/${event.id}/edit`}>
                          <Button variant="ghost" size="sm" className="gap-1.5">
                            <Pencil className="w-3.5 h-3.5" />
                            Upravit
                          </Button>
                        </Link>
                        <Link href={`/organizer/events/${event.id}`}>
                          <Button variant="secondary" size="sm" className="gap-1.5">
                            Spravovat
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
