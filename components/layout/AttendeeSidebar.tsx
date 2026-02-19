"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Ticket, Compass, Users, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/my-events", label: "Moje eventy", icon: Ticket, exact: true },
  { href: "/explore", label: "Objevit", icon: Compass, exact: false },
  { href: "/my-events/contacts", label: "Kontakty", icon: Users, exact: false },
];

export function AttendeeSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 w-64 flex-col bg-surface rounded-3xl shadow-float p-4">
      {/* Logo */}
      <div className="px-3 pt-2 pb-6">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-darkblue"
        >
          Konekt.
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-coral/10 text-coral font-bold"
                  : "text-darkblue/60 hover:bg-input hover:text-darkblue"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Profile + Logout */}
      <div className="border-t border-darkblue/5 pt-3 mt-3 space-y-1">
        <Link
          href="/my-events/profile"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
            pathname.startsWith("/my-events/profile")
              ? "bg-coral/10 text-coral font-bold"
              : "text-darkblue/60 hover:bg-input hover:text-darkblue"
          )}
        >
          <User className="w-5 h-5 flex-shrink-0" />
          Profil
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-darkblue/40 hover:text-coral hover:bg-coral/5 transition-all w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Odhlásit se
        </button>
      </div>
    </aside>
  );
}
