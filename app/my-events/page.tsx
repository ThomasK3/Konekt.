import { redirect } from "next/navigation";
import Link from "next/link";
import { Ticket } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EventTicketCard } from "@/components/features/EventTicketCard";

export default async function MyEventsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: registrations } = await supabase
    .from("registrations")
    .select(
      `
      id,
      status,
      qr_code_data,
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
    .order("created_at", { ascending: false });

  const items = registrations ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Simple nav */}
      <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-darkblue"
        >
          Konekt.
        </Link>
        <Link href="/my-events">
          <Button variant="secondary" size="sm">
            Moje Eventy
          </Button>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pb-16 space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
          Moje Eventy
        </h1>

        {items.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((reg: any) => (
              <EventTicketCard
                key={reg.id}
                event={reg.event}
                qrCodeData={reg.qr_code_data}
                status={reg.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
