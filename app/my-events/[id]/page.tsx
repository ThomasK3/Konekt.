import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock,
  CheckCircle2,
  Ticket,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { PublicAgenda } from "@/components/features/PublicAgenda";
import { NetworkingList } from "@/components/features/NetworkingList";
import { getAgendaItems } from "@/lib/actions/agenda";
import { getPublicAttendees } from "@/lib/actions/participants";
import { getMyConnectionIds } from "@/lib/actions/networking";

export default async function MyEventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Find registration
  const { data: registration } = await supabase
    .from("registrations")
    .select("id, status, qr_code_data, checked_in_at, created_at")
    .eq("event_id", params.id)
    .eq("user_id", user.id)
    .in("status", ["registered", "checked_in"])
    .maybeSingle();

  if (!registration) redirect("/my-events");

  // Fetch event
  const { data: event } = await supabase
    .from("events")
    .select("id, name, date, time, location, cover_image_url")
    .eq("id", params.id)
    .single();

  if (!event) redirect("/my-events");

  // Fetch profile for ticket info
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, company, job_title")
    .eq("id", user.id)
    .maybeSingle();

  const [agendaItems, publicAttendees, connectedIds] = await Promise.all([
    getAgendaItems(params.id),
    getPublicAttendees(params.id),
    getMyConnectionIds(),
  ]);

  const isCheckedIn = registration.status === "checked_in";
  const attendeeName = profile?.name || user.email || "Účastník";
  const attendeeDetail = [profile?.company, profile?.job_title]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="space-y-8">
        {/* Back link */}
        <Link
          href="/my-events"
          className="inline-flex items-center gap-2 text-sm font-medium text-darkblue/50 hover:text-darkblue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zpět na Moje eventy
        </Link>

        {/* Event header */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
            {event.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-darkblue/60 font-medium">
            {event.date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-coral" />
                {new Date(event.date).toLocaleDateString("cs-CZ", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            {event.time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-coral" />
                {event.time}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-coral" />
                {event.location}
              </span>
            )}
          </div>
        </div>

        {/* TICKET ISLAND */}
        <Card className="rounded-3xl shadow-float overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left: Info */}
              <div className="flex-1 p-8 md:p-10 space-y-6">
                <div className="space-y-1">
                  <p className="text-xs text-darkblue/40 font-semibold uppercase tracking-wider">
                    Účastník
                  </p>
                  <p className="text-xl font-bold text-darkblue">
                    {attendeeName}
                  </p>
                  {attendeeDetail && (
                    <p className="text-sm text-darkblue/50 font-medium">
                      {attendeeDetail}
                    </p>
                  )}
                </div>

                {/* Status */}
                {isCheckedIn ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-teal">
                        Vstupenka odbavena
                      </p>
                      <p className="text-xs text-darkblue/40 font-medium">
                        {registration.checked_in_at &&
                          new Date(
                            registration.checked_in_at
                          ).toLocaleString("cs-CZ", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-coral" />
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-teal rounded-full border-2 border-surface animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-darkblue">
                        Jste úspěšně registrováni
                      </p>
                      <p className="text-xs text-darkblue/40 font-medium">
                        Registrace:{" "}
                        {new Date(
                          registration.created_at
                        ).toLocaleDateString("cs-CZ", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-darkblue/5 my-8" />
              <div className="block md:hidden h-px bg-darkblue/5 mx-8" />

              {/* Right: QR Code */}
              <div className="flex flex-col items-center justify-center p-8 md:p-10 md:w-72">
                <div className="bg-white p-5 rounded-2xl shadow-card mb-4">
                  <QRCodeSVG
                    value={registration.qr_code_data}
                    size={180}
                    fgColor="#315771"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-xs text-darkblue/40 font-medium text-center">
                  Ukažte tento kód u vstupu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PROGRAM */}
        <PublicAgenda items={agendaItems} />

        {/* NETWORKING */}
        <NetworkingList
          attendees={publicAttendees}
          eventId={params.id}
          connectedIds={connectedIds}
          currentUserId={user.id}
        />
    </div>
  );
}
