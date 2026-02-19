import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Users,
  Ticket,
  MapPin,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";

export default async function OrganizerDashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch all organizer's events
  const { data: events } = await supabase
    .from("events")
    .select("id, name, date, time, location, capacity, status, cover_image_url")
    .eq("organizer_id", user.id)
    .order("date", { ascending: true });

  const allEvents = events ?? [];

  // Total events count
  const totalEvents = allEvents.length;

  // Total registrations across all events
  const eventIds = allEvents.map((e) => e.id);

  let totalRegistrations = 0;
  let totalCheckedIn = 0;

  if (eventIds.length > 0) {
    const { count: regCount } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .in("event_id", eventIds)
      .in("status", ["registered", "checked_in"]);

    const { count: checkinCount } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .in("event_id", eventIds)
      .eq("status", "checked_in");

    totalRegistrations = regCount ?? 0;
    totalCheckedIn = checkinCount ?? 0;
  }

  // Upcoming events (date >= today)
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = allEvents.filter(
    (e) => e.date && e.date >= today
  );

  // Get registration counts per upcoming event
  const upcomingIds = upcomingEvents.map((e) => e.id);
  let regCountsMap: Record<string, number> = {};

  if (upcomingIds.length > 0) {
    const { data: regCounts } = await supabase
      .from("registrations")
      .select("event_id")
      .in("event_id", upcomingIds)
      .in("status", ["registered", "checked_in"]);

    if (regCounts) {
      for (const r of regCounts) {
        regCountsMap[r.event_id] = (regCountsMap[r.event_id] ?? 0) + 1;
      }
    }
  }

  const stats = [
    {
      label: "Celkem eventů",
      value: totalEvents.toString(),
      icon: CalendarDays,
      color: "text-coral",
      bg: "bg-coral/20",
    },
    {
      label: "Registrací",
      value: totalRegistrations.toString(),
      icon: Users,
      color: "text-teal",
      bg: "bg-teal/20",
    },
    {
      label: "Check-inů",
      value: totalCheckedIn.toString(),
      icon: Ticket,
      color: "text-orange",
      bg: "bg-orange/20",
    },
  ];

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue mb-8">
        Vítejte zpět
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:-translate-y-1 transition-all">
            <CardContent className="flex flex-col gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-darkblue">{stat.value}</p>
                <p className="text-sm text-darkblue/60 font-medium">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-darkblue">
            Vaše nadcházející eventy
          </h2>
          <Link
            href="/organizer/events/new"
            className="flex items-center gap-2 text-sm font-bold text-coral hover:text-coral/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nový event
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center text-center py-12 gap-4">
              <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center">
                <CalendarDays className="w-7 h-7 text-coral" />
              </div>
              <div>
                <p className="text-darkblue font-bold mb-1">
                  Zatím nemáte žádné eventy
                </p>
                <p className="text-sm text-darkblue/50 font-medium">
                  Vytvořte svůj první event a začněte sbírat registrace.
                </p>
              </div>
              <Link
                href="/organizer/events/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-warm text-white rounded-full font-bold text-sm shadow-glow hover:shadow-float hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                Vytvořit první event
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.slice(0, 6).map((event) => {
              const regCount = regCountsMap[event.id] ?? 0;

              return (
                <Link key={event.id} href={`/organizer/events/${event.id}`}>
                  <Card className="hover:-translate-y-1 hover:shadow-float transition-all cursor-pointer h-full">
                    <CardContent className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-darkblue line-clamp-2">
                          {event.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-darkblue/30 shrink-0 mt-1" />
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-darkblue/50 font-medium">
                        {event.date && (
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {new Date(event.date).toLocaleDateString("cs-CZ", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                        {event.time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.location}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-teal">
                          <Users className="w-3.5 h-3.5" />
                          {regCount}
                          {event.capacity && (
                            <span className="text-darkblue/40 font-medium">
                              / {event.capacity}
                            </span>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            event.status === "published"
                              ? "bg-teal/10 text-teal"
                              : "bg-orange/10 text-orange"
                          }`}
                        >
                          {event.status === "published" ? "Publikováno" : "Draft"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
