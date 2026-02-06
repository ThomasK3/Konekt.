"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const organizerItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/organizer/dashboard",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="17" x2="3" y2="11" />
        <line x1="7" y1="17" x2="7" y2="7" />
        <line x1="11" y1="17" x2="11" y2="13" />
        <line x1="15" y1="17" x2="15" y2="3" />
      </svg>
    ),
  },
  {
    id: "events",
    label: "Events",
    href: "/organizer/events",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="14" height="14" rx="2" />
        <line x1="3" y1="8" x2="17" y2="8" />
        <line x1="7" y1="2" x2="7" y2="6" />
        <line x1="13" y1="2" x2="13" y2="6" />
      </svg>
    ),
  },
  {
    id: "new",
    label: "New",
    href: "/organizer/events/new",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="10" y1="5" x2="10" y2="15" />
        <line x1="5" y1="10" x2="15" y2="10" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    href: "/organizer/profile",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="7" r="4" />
        <path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
];

const attendeeItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Home",
    href: "/dashboard",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "discover",
    label: "Discover",
    href: "/events",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="9" r="6" />
        <path d="m13.5 13.5 3 3" />
      </svg>
    ),
  },
  {
    id: "my-events",
    label: "My Events",
    href: "/my-events",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="14" height="14" rx="2" />
        <line x1="3" y1="8" x2="17" y2="8" />
        <line x1="7" y1="2" x2="7" y2="6" />
        <line x1="13" y1="2" x2="13" y2="6" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="7" r="4" />
        <path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Detect context from route
  const isOrganizerSide = pathname?.startsWith("/organizer");
  const isAttendeeSide =
    pathname === "/dashboard" ||
    pathname?.startsWith("/events") ||
    pathname?.startsWith("/my-events") ||
    pathname === "/profile";

  // Return null for public pages (home, about, etc.)
  if (!isOrganizerSide && !isAttendeeSide) {
    return null;
  }

  // Choose nav items based on context
  const navItems = isOrganizerSide ? organizerItems : attendeeItems;

  // Auto-detect active item from pathname
  const getActiveItem = (): string => {
    if (isOrganizerSide) {
      if (pathname === "/organizer/dashboard") return "dashboard";
      if (pathname?.startsWith("/organizer/events/new")) return "new";
      if (pathname?.startsWith("/organizer/events")) return "events";
      if (pathname?.startsWith("/organizer/profile")) return "profile";
      return "dashboard";
    } else {
      if (pathname === "/dashboard") return "dashboard";
      if (pathname?.startsWith("/events")) return "discover";
      if (pathname?.startsWith("/my-events")) return "my-events";
      if (pathname === "/profile") return "profile";
      return "dashboard";
    }
  };

  const activeItem = getActiveItem();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center pb-4 pt-2">
      {/* Black background capsule container */}
      <div className="bg-text-primary rounded-full px-2 py-2 shadow-lg">
        <div className="flex items-center justify-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-medium text-sm border",
                activeItem === item.id
                  ? "bg-white text-text-primary border-white"
                  : "bg-transparent text-white border-white/30 hover:border-white/50"
              )}
              aria-label={item.label}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
