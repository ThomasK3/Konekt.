import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Ticket,
  CalendarCheck,
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  History,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EventTicketCard } from "@/components/features/EventTicketCard";
import { getNetworkingPoints } from "@/lib/actions/networking";

export default async function MyEventsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, { data: registrations }, xp] = await Promise.all([
    supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("registrations")
      .select(
        `
        id,
        status,
        event:events (
          id,
          name,
          date,
          location,
          cover_image_url
        )
      `
      )
      .eq("user_id", user.id)
      .in("status", ["registered", "checked_in"])
      .order("created_at", { ascending: false }),
    getNetworkingPoints(),
  ]);

  const items = (registrations ?? []) as any[];
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = items.filter(
    (r) => r.event?.date && r.event.date >= today
  );
  const past = items.filter(
    (r) => !r.event?.date || r.event.date < today
  );

  // Sort upcoming by date ascending (nearest first)
  upcoming.sort((a: any, b: any) =>
    (a.event.date ?? "").localeCompare(b.event.date ?? "")
  );

  const nextEvent = upcoming[0] ?? null;
  const remainingUpcoming = upcoming.slice(1);

  const firstName = profile?.name?.split(" ")[0] || user.email?.split("@")[0] || "Účastník";

  const level =
    xp >= 200 ? 5 : xp >= 100 ? 4 : xp >= 50 ? 3 : xp >= 20 ? 2 : 1;
  const levelLabel = `Level ${level}`;

  return (
    <div className="space-y-10">
        {/* Greeting */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
            Ahoj, {firstName}
          </h1>
          <p className="text-darkblue/50 font-medium mt-1">
            Tady máš přehled svých eventů.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="flex flex-col items-center text-center py-5 px-3">
              <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center mb-2">
                <CalendarCheck className="w-5 h-5 text-coral" />
              </div>
              <p className="text-2xl font-extrabold text-darkblue">
                {past.length}
              </p>
              <p className="text-xs text-darkblue/40 font-semibold">
                Navštívené
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="flex flex-col items-center text-center py-5 px-3">
              <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center mb-2">
                <CalendarDays className="w-5 h-5 text-teal" />
              </div>
              <p className="text-2xl font-extrabold text-darkblue">
                {upcoming.length}
              </p>
              <p className="text-xs text-darkblue/40 font-semibold">
                Nadcházející
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="flex flex-col items-center text-center py-5 px-3">
              <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-orange" />
              </div>
              <p className="text-2xl font-extrabold text-darkblue">
                {xp} <span className="text-sm font-bold text-darkblue/40">XP</span>
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-orange/10 text-orange text-[10px] font-bold">
                {levelLabel}
              </span>
            </CardContent>
          </Card>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <Card className="rounded-3xl">
            <CardContent className="flex flex-col items-center text-center py-16 gap-4">
              <div className="w-16 h-16 rounded-full bg-darkblue/10 flex items-center justify-center">
                <Ticket className="w-8 h-8 text-darkblue/30" />
              </div>
              <h2 className="text-xl font-bold text-darkblue">
                Zatím nejste nikde přihlášeni
              </h2>
              <p className="text-darkblue/50 font-medium max-w-sm">
                Zadejte kód pozvánky od organizátora nebo se podívejte na
                veřejné eventy.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* HERO: Next Event */}
            {nextEvent && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-darkblue flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-coral" />
                  Tvůj další event
                </h2>
                <Link href={`/my-events/${nextEvent.event.id}`}>
                  <Card className="rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-float transition-all cursor-pointer">
                    <div className="relative h-48 md:h-56">
                      {nextEvent.event.cover_image_url ? (
                        <Image
                          src={nextEvent.event.cover_image_url}
                          alt={nextEvent.event.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-cool flex items-center justify-center">
                          <CalendarCheck className="w-12 h-12 text-white/30" />
                        </div>
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {/* Content over image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                          {nextEvent.event.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-white/80 font-medium">
                          {nextEvent.event.date && (
                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="w-4 h-4" />
                              {new Date(nextEvent.event.date).toLocaleDateString(
                                "cs-CZ",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          )}
                          {nextEvent.event.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {nextEvent.event.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 md:p-6">
                      <Button className="w-full gap-2">
                        Otevřít vstupenku
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )}

            {/* Remaining upcoming */}
            {remainingUpcoming.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-darkblue flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-teal" />
                  Další v plánu
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingUpcoming.map((reg: any) => (
                    <EventTicketCard
                      key={reg.id}
                      event={reg.event}
                      status={reg.status}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past events */}
            {past.length > 0 && (
              <div className="space-y-4 opacity-60">
                <h2 className="text-lg font-bold text-darkblue flex items-center gap-2">
                  <History className="w-5 h-5 text-darkblue/40" />
                  Historie eventů
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {past.map((reg: any) => (
                    <EventTicketCard
                      key={reg.id}
                      event={reg.event}
                      status={reg.status}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
    </div>
  );
}
