"use client";

import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function TopBar() {
  const pathname = usePathname();

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, i) => {
      if (i === 0) return "Konekt";
      if (UUID_RE.test(segment)) return "DETAIL";
      return segment.toUpperCase();
    });

  return (
    <div className="flex items-center justify-between mb-8 pt-4">
      {/* Breadcrumb / Context */}
      <span className="text-sm font-semibold text-darkblue/50 uppercase tracking-wider">
        {crumbs.join(" / ")}
      </span>

      {/* Profile Island */}
      <div className="flex items-center gap-3 bg-surface pl-4 pr-2 py-2 rounded-full shadow-float border border-white/20">
        <Bell className="w-[18px] h-[18px] text-darkblue" />
        <div className="w-px h-5 bg-darkblue/10" />
        <div className="w-8 h-8 rounded-full bg-gradient-warm" />
        <ChevronDown className="w-4 h-4 text-darkblue/50" />
      </div>
    </div>
  );
}
