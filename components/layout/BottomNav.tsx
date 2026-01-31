"use client";

import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function BottomNav({ activeItem, onItemClick }: BottomNavProps) {
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 8l8-6 8 6v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
          <polyline points="7 18 7 10 13 10 13 18" />
        </svg>
      ),
    },
    {
      id: "events",
      label: "Events",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="16" height="16" rx="2" />
          <line x1="14" y1="1" x2="14" y2="5" />
          <line x1="6" y1="1" x2="6" y2="5" />
          <line x1="2" y1="9" x2="18" y2="9" />
        </svg>
      ),
    },
    {
      id: "new",
      label: "New Event",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="10" r="8" />
          <line x1="10" y1="6" x2="10" y2="14" />
          <line x1="6" y1="10" x2="14" y2="10" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 18v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
          <circle cx="10" cy="6" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={cn(
            "nav-item",
            activeItem === item.id && "active"
          )}
          aria-label={item.label}
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
}
