"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/organizer/dashboard", label: "Přehled", icon: LayoutDashboard },
  { href: "/organizer/events", label: "Eventy", icon: CalendarDays },
  { href: "/organizer/events/new", label: "Nový", icon: PlusCircle },
  { href: "/organizer/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-darkblue rounded-full shadow-float flex justify-around items-center h-16">
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
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-coral" : "text-white/60"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
