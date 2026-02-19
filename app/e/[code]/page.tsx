import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users, CalendarCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RegistrationForm } from "@/components/features/RegistrationForm";

export default async function EventPublicPage({
  params,
}: {
  params: { code: string };
}) {
  const supabase = createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("invite_code", params.code)
    .single();

  if (!event) notFound();

  // Registration count for capacity display
  const { count } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", event.id)
    .in("status", ["registered", "checked_in"]);

  const registered = count ?? 0;
  const spotsLeft = event.capacity ? event.capacity - registered : null;

  // Detect logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let alreadyRegistered = false;
  let userName: string | undefined;
  let userEmail: string | undefined;

  if (user) {
    userEmail = user.email;

    // Get profile name
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .maybeSingle();

    userName = profile?.name ?? undefined;

    // Check if already registered
    const { data: existingReg } = await supabase
      .from("registrations")
      .select("id")
      .eq("event_id", event.id)
      .eq("user_id", user.id)
      .maybeSingle();

    alreadyRegistered = !!existingReg;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple top nav */}
      <nav className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-darkblue"
        >
          Konekt.
        </Link>
        {user && (
          <Link href="/my-events">
            <Button variant="secondary" size="sm">
              Moje Eventy
            </Button>
          </Link>
        )}
      </nav>

      <div className="max-w-3xl mx-auto px-6 pb-16 space-y-8">
        {/* HERO CARD */}
        <Card className="p-0 overflow-hidden rounded-3xl">
          {/* Cover */}
          <div className="relative h-56 md:h-72">
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
                <CalendarCheck className="w-14 h-14 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-darkblue/70 via-darkblue/10 to-transparent" />

            {/* Spots left badge */}
            {spotsLeft !== null && (
              <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-card">
                <span className="text-sm font-bold text-darkblue">
                  {spotsLeft > 0
                    ? `Zbývá ${spotsLeft} míst`
                    : "Plně obsazeno"}
                </span>
              </div>
            )}

            {/* Title over image */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {event.name}
              </h1>
            </div>
          </div>

          {/* Meta info */}
          <CardContent>
            <div className="flex flex-wrap gap-5 text-sm font-medium text-darkblue/70">
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
              {event.capacity && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-coral" />
                  {registered} / {event.capacity} účastníků
                </span>
              )}
            </div>

            {/* Description */}
            {event.description && (
              <div className="mt-6 pt-6 border-t border-darkblue/5">
                <h2 className="text-base font-bold text-darkblue mb-2">
                  O eventu
                </h2>
                <p className="text-darkblue/60 font-medium leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* REGISTRATION SECTION */}
        {alreadyRegistered ? (
          <Card className="rounded-3xl">
            <CardContent className="flex flex-col items-center text-center py-10 gap-4">
              <div className="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center">
                <CalendarCheck className="w-7 h-7 text-teal" />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-darkblue">
                Už jste registrováni
              </h2>
              <p className="text-darkblue/60 font-medium">
                Na tento event jste již přihlášeni.
              </p>
              <Link href="/my-events">
                <Button>Zobrazit můj QR kód</Button>
              </Link>
            </CardContent>
          </Card>
        ) : spotsLeft === null || spotsLeft > 0 ? (
          <RegistrationForm
            eventId={event.id}
            loggedInUser={
              user
                ? { name: userName ?? "", email: userEmail ?? "" }
                : undefined
            }
          />
        ) : (
          <Card className="rounded-3xl">
            <CardContent className="text-center py-10">
              <p className="text-lg font-bold text-darkblue">
                Event je plně obsazen
              </p>
              <p className="text-darkblue/50 font-medium mt-1">
                Zkuste to příště!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
