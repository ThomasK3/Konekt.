"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, ChevronDown, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { UserInfo } from "./OrganizerLayout";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getInitials(name: string | null, email: string | null) {
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return (email?.[0] ?? "?").toUpperCase();
}

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [ref, handler]);
}

export function TopBar({
  user,
  settingsHref = "/organizer/settings",
}: {
  user: UserInfo;
  settingsHref?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useClickOutside(profileRef, () => setProfileOpen(false));
  useClickOutside(notifRef, () => setNotifOpen(false));

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, i) => {
      if (i === 0) return "Konekt";
      if (UUID_RE.test(segment)) return "DETAIL";
      return segment.toUpperCase();
    });

  const initials = getInitials(user.name, user.email);
  const displayName = user.name || user.email || "Uživatel";

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const today = new Date().toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex items-center justify-between mb-8 pt-4">
      {/* Breadcrumb / Context */}
      <span className="text-sm font-semibold text-darkblue/50 uppercase tracking-wider">
        {crumbs.join(" / ")}
      </span>

      {/* Profile Island */}
      <div className="flex items-center gap-3 bg-surface pl-4 pr-2 py-2 rounded-full shadow-float border border-white/20">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative p-1 hover:bg-background/50 rounded-full transition-colors"
          >
            <Bell className="w-[18px] h-[18px] text-darkblue" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-coral rounded-full border-2 border-surface" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-3 w-80 bg-surface rounded-2xl shadow-float border border-white/20 overflow-hidden z-50">
              <div className="px-5 py-4 border-b border-darkblue/5">
                <h3 className="text-sm font-bold text-darkblue">
                  Upozornění
                </h3>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-3.5 h-3.5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-darkblue">
                      Vítejte v Konekt!
                    </p>
                    <p className="text-xs text-darkblue/50 font-medium">
                      Váš účet je připraven k použití.
                    </p>
                    <p className="text-[11px] text-darkblue/30 font-medium mt-1">
                      {today}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-darkblue/5">
                <p className="text-xs text-darkblue/30 font-medium text-center">
                  Zatím žádná další upozornění.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-darkblue/10" />

        {/* Profile dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 hover:bg-background/50 rounded-full pr-1 pl-0.5 py-0.5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-xs font-bold text-coral">
              {initials}
            </div>
            <ChevronDown
              className={`w-4 h-4 text-darkblue/50 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 bg-surface rounded-2xl shadow-float border border-white/20 overflow-hidden z-50">
              {/* User info header */}
              <div className="px-5 py-4 border-b border-darkblue/5">
                <p className="text-sm font-bold text-darkblue truncate">
                  {displayName}
                </p>
                {user.email && (
                  <p className="text-xs text-darkblue/50 font-medium truncate mt-0.5">
                    {user.email}
                  </p>
                )}
              </div>

              {/* Menu items */}
              <div className="py-2">
                <Link
                  href={settingsHref}
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-darkblue/70 hover:bg-background/50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Nastavení profilu
                </Link>
              </div>

              <div className="border-t border-darkblue/10 py-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-coral hover:bg-coral/5 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Odhlásit se
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
