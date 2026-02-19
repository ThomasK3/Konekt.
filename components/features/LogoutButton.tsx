"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors px-1 py-2"
    >
      <LogOut className="w-4 h-4" />
      Odhlásit se
    </button>
  );
}
