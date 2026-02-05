"use client";

import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

interface LeftSidebarProps {
  items?: SidebarItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function LeftSidebar({ items, activeItem, onItemClick, isOpen, onClose }: LeftSidebarProps) {
  const defaultSidebarItems: SidebarItem[] = [
    {
      id: "overview",
      label: "Overview",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="14" height="14" rx="2" />
          <line x1="2" y1="9" x2="16" y2="9" />
          <line x1="9" y1="9" x2="9" y2="16" />
        </svg>
      ),
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="9" r="6" />
          <polyline points="9 4 9 9 12 12" />
        </svg>
      ),
    },
    {
      id: "past",
      label: "Past Events",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 15a6 6 0 100-12 6 6 0 000 12z" />
          <polyline points="9 4 9 9 6 12" />
        </svg>
      ),
    },
    {
      id: "drafts",
      label: "Drafts",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2l3 3-8 8-4 1 1-4 8-8z" />
          <line x1="10" y1="5" x2="13" y2="8" />
        </svg>
      ),
    },
  ];

  const sidebarItems = items || defaultSidebarItems;

  const handleItemClick = (id: string) => {
    onItemClick(id);
    // Close drawer on mobile after selection
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "sidebar-island",
          // Mobile drawer animation
          "md:translate-x-0 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Positioning
          "fixed",
          "left-0",
          "top-0 md:top-1/2 md:-translate-y-1/2",
          "h-full md:h-auto md:max-h-[70vh]",
          "w-64 md:w-52",
          "z-50 md:z-10"
        )}
      >
        {/* Sidebar Title */}
        <h2 className="sidebar-title">Navigation</h2>

        {/* Sidebar Items */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "sidebar-item w-full",
                activeItem === item.id && "active"
              )}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && (
                <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-text-primary text-white">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
