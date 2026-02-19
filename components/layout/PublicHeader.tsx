import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PublicHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="relative z-20 max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-extrabold tracking-tight text-darkblue"
      >
        Konekt.
      </Link>

      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <Link href="/organizer/dashboard">
            <Button size="sm">Přejít do Dashboardu</Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Přihlásit se
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Registrace</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
