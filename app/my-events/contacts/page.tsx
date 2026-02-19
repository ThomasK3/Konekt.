import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Mail, Ticket } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getMyConnections } from "@/lib/actions/networking";

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

export default async function ContactsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const connections = await getMyConnections();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
          Moje kontakty
        </h1>
        <p className="text-darkblue/50 font-medium mt-1">
          Lidé, se kterými jste se propojili na eventech.
        </p>
      </div>

      {connections.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center text-center py-16 gap-4">
            <div className="w-16 h-16 rounded-full bg-darkblue/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-darkblue/30" />
            </div>
            <h2 className="text-xl font-bold text-darkblue">
              Zatím nemáte žádné kontakty
            </h2>
            <p className="text-darkblue/50 font-medium max-w-sm">
              Běžte na nějaký event a seznamte se! Za každé propojení získáte
              +10 XP.
            </p>
            <Link href="/my-events">
              <Button variant="secondary" className="gap-2 mt-2">
                <Ticket className="w-4 h-4" />
                Prohlédnout eventy
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {connections.map((conn) => {
            const name = conn.profile?.name ?? "Účastník";
            const detail = [conn.profile?.company, conn.profile?.job_title]
              .filter(Boolean)
              .join(" · ");

            return (
              <Card key={conn.id} className="rounded-2xl">
                <CardContent className="flex items-center gap-4 py-4 px-5">
                  {/* Avatar */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getColor(name)}`}
                  >
                    {name.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-darkblue truncate">
                      {name}
                    </p>
                    {detail && (
                      <p className="text-xs text-darkblue/50 font-medium truncate">
                        {detail}
                      </p>
                    )}
                  </div>

                  {/* Email button */}
                  {conn.profile?.email && (
                    <a
                      href={`mailto:${conn.profile.email}`}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral/10 text-coral text-xs font-bold hover:bg-coral/20 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Napsat e-mail</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
