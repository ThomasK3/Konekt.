"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Compass, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/my-events", label: "Eventy", icon: Ticket },
  { href: "/explore", label: "Objevit", icon: Compass },
  { href: "/my-events/contacts", label: "Kontakty", icon: Users },
  { href: "/my-events/profile", label: "Profil", icon: User },
];

export function AttendeeNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-darkblue/10 pb-6 pt-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive =
            item.href === "/my-events"
              ? pathname === "/my-events"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 transition-colors min-w-[56px]",
                isActive ? "text-coral" : "text-darkblue/40"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
