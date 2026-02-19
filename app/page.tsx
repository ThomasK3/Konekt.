import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Atmospheric gradient blob */}
      <div className="fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-coral/10 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal/10 blur-[140px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-20 max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-2xl font-extrabold tracking-tight text-darkblue">
          Konekt.
        </span>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Přihlásit se
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Registrace</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 md:pt-32 md:pb-44">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-darkblue leading-[1.1] mb-6">
          Eventy, které
          <br />
          lidi milují.
        </h1>
        <p className="text-xl md:text-2xl text-darkblue/60 font-medium max-w-xl mb-10 leading-relaxed">
          Všechny nástroje v jedné aplikaci.
          <br />
          Pro organizátory i komunity.
        </p>
        <Link href="/organizer/dashboard">
          <Button size="lg">Vstoupit do aplikace</Button>
        </Link>
      </section>
    </div>
  );
}
