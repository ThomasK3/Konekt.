import Link from "next/link";
import { QrCode, Palette, BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { JoinEventForm } from "@/components/features/JoinEventForm";

const features = [
  {
    icon: QrCode,
    title: "Bleskový Check-in",
    description:
      "Odbavte návštěvníky za sekundu pomocí zabudovaného QR skeneru. Žádné fronty, žádné papíry.",
    color: "text-teal",
    bg: "bg-teal/20",
  },
  {
    icon: Palette,
    title: "Nádherný design",
    description:
      "Vaše značka a účastníci na prvním místě. Registrační stránky, které udělají dojem.",
    color: "text-coral",
    bg: "bg-coral/20",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytika",
    description:
      "Sledujte, kdo opravdu dorazil, a vyhodnoťte úspěch eventu v reálném čase.",
    color: "text-orange",
    bg: "bg-orange/20",
  },
];

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Atmospheric gradient blobs */}
      <div className="fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-coral/10 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal/10 blur-[140px] pointer-events-none" />

      <PublicHeader isLoggedIn={isLoggedIn} />

      <div className="relative z-10 space-y-24">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 md:pt-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-darkblue leading-[1.1] mb-6">
            Eventy, které lidé milují.
            <br />
            <span className="bg-gradient-to-r from-coral to-orange text-transparent bg-clip-text">
              Správa, kterou budete zbožňovat.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-darkblue/60 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Od nádherných registračních stránek po bleskový QR check-in
            a real-time analytiku. Vše v jednom nástroji.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={isLoggedIn ? "/organizer/dashboard" : "/signup"}>
              <Button size="lg">
                {isLoggedIn
                  ? "Přejít do Dashboardu"
                  : "Vytvořit event zdarma"}
              </Button>
            </Link>
            <a href="#join">
              <Button variant="secondary" size="lg">
                Zadat kód vstupenky
              </Button>
            </a>
          </div>
        </section>

        {/* JOIN EVENT */}
        <section id="join" className="max-w-2xl mx-auto px-4">
          <Card className="rounded-3xl shadow-float">
            <CardContent className="p-8 md:p-10 space-y-6">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-darkblue mb-2">
                  Jdete na event?
                </h2>
                <p className="text-darkblue/50 font-medium">
                  Zadejte svůj 6místný kód a vstupte.
                </p>
              </div>
              <JoinEventForm />
            </CardContent>
          </Card>
        </section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-darkblue mb-3">
              Všechno, co potřebujete
            </h2>
            <p className="text-darkblue/50 font-medium max-w-lg mx-auto">
              Konekt. spojuje organizátory a účastníky v jednom elegantním
              nástroji.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card
                key={f.title}
                className="hover:-translate-y-1 hover:shadow-float transition-all"
              >
                <CardContent className="p-8 space-y-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${f.bg}`}
                  >
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-darkblue">
                    {f.title}
                  </h3>
                  <p className="text-sm text-darkblue/60 font-medium leading-relaxed">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
