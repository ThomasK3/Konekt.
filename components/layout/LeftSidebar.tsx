"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/organizer/dashboard", label: "Přehled", icon: LayoutDashboard },
  { href: "/organizer/events", label: "Eventy", icon: CalendarDays },
  { href: "/organizer/events/new", label: "Nový Event", icon: PlusCircle },
  { href: "/organizer/profile", label: "Profil", icon: User },
];

export function LeftSidebar() {
  const pathname = usePathname();

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
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/organizer/dashboard" &&
              pathname.startsWith(item.href));

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
    </aside>
  );
}
