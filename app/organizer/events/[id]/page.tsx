import { notFound } from "next/navigation";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Gauge,
  CalendarCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { EventActions } from "@/components/features/EventActions";
import { EventDetailTabs } from "@/components/features/EventDetailTabs";
import { getEventParticipants } from "@/lib/actions/participants";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!event) notFound();

  // Stats (real count from registrations)
  const { count: registeredCount } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", params.id)
    .eq("status", "registered");

  const { count: checkedInCount } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", params.id)
    .eq("status", "checked_in");

  const registered = (registeredCount ?? 0) + (checkedInCount ?? 0);
  const checkedIn = checkedInCount ?? 0;
  const capacityPct = event.capacity
    ? Math.round((registered / event.capacity) * 100)
    : 0;

  const participants = await getEventParticipants(params.id);

  const statusLabel = event.status === "published" ? "Publikováno" : "Draft";
  const statusColor =
    event.status === "published"
      ? "bg-teal/20 text-teal"
      : "bg-orange/20 text-orange";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* HERO ISLAND */}
      <Card className="p-0 overflow-hidden relative">
        {/* Cover image or gradient placeholder */}
        <div className="relative h-72 md:h-80">
          {event.cover_image_url ? (
            <Image
              src={event.cover_image_url}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-cool flex items-center justify-center">
              <CalendarCheck className="w-16 h-16 text-white/30" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-darkblue/80 via-darkblue/20 to-transparent" />

          {/* Action buttons (top right) — client component */}
          <EventActions
            event={{
              id: event.id,
              name: event.name,
              invite_code: event.invite_code,
            }}
          />

          {/* Event info (bottom left) */}
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              {event.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-medium">
              {event.date && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString("cs-CZ", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {event.time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {event.time}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-darkblue/60">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">Registrovaní</span>
            </div>
            <p className="text-2xl font-bold text-darkblue">
              {registered}
              <span className="text-base font-medium text-darkblue/40">
                {" "}
                / {event.capacity}
              </span>
            </p>
            {/* Progress bar */}
            <div className="h-2 rounded-full bg-input overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-warm transition-all"
                style={{ width: `${Math.min(capacityPct, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-darkblue/60">
              <Gauge className="w-4 h-4" />
              <span className="text-sm font-semibold">Check-inů</span>
            </div>
            <p className="text-2xl font-bold text-darkblue">{checkedIn}</p>
            <p className="text-sm text-darkblue/40 font-medium">
              {registered > 0
                ? `${Math.round((checkedIn / registered) * 100)} % účast`
                : "Zatím žádné"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-darkblue/60">
              <CalendarCheck className="w-4 h-4" />
              <span className="text-sm font-semibold">Status</span>
            </div>
            <span
              className={`inline-flex self-start px-4 py-1.5 rounded-full text-sm font-bold ${statusColor}`}
            >
              {statusLabel}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* TABS + TAB CONTENT */}
      <EventDetailTabs
        eventId={event.id}
        eventName={event.name}
        descriptionHtml={event.description}
        participants={participants}
      />
    </div>
  );
}
