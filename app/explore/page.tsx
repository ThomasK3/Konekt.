import { redirect } from "next/navigation";
import { Compass } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { PublicEventCard } from "@/components/features/PublicEventCard";

export default async function ExplorePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const today = new Date().toISOString().slice(0, 10);

  // Fetch public upcoming events
  const { data: events } = await supabase
    .from("events")
    .select("id, name, date, location, cover_image_url, invite_code")
    .eq("status", "published")
    .eq("is_public", true)
    .gte("date", today)
    .order("date", { ascending: true });

  // Fetch user's registrations to check which events they're already in
  const { data: registrations } = await supabase
    .from("registrations")
    .select("event_id")
    .eq("user_id", user.id)
    .in("status", ["registered", "checked_in"]);

  const registeredEventIds = new Set(
    (registrations ?? []).map((r) => r.event_id)
  );

  const publicEvents = events ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
          Objevte nové eventy
        </h1>
        <p className="text-darkblue/50 font-medium mt-1">
          Připojte se k dalším akcím a rozšiřte svůj Pokédex kontaktů.
        </p>
      </div>

      {publicEvents.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center text-center py-16 gap-4">
            <div className="w-16 h-16 rounded-full bg-darkblue/10 flex items-center justify-center">
              <Compass className="w-8 h-8 text-darkblue/30" />
            </div>
            <h2 className="text-xl font-bold text-darkblue">
              Žádné nadcházející eventy
            </h2>
            <p className="text-darkblue/50 font-medium max-w-sm">
              Momentálně nejsou k dispozici žádné veřejné eventy. Zkuste to
              později nebo požádejte organizátora o kód pozvánky.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicEvents.map((event) => (
            <PublicEventCard
              key={event.id}
              event={event}
              registeredEventId={
                registeredEventIds.has(event.id) ? event.id : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
