import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/features/ProfileForm";
import { LogoutButton } from "@/components/features/LogoutButton";

const AVATAR_COLORS = [
  "bg-coral/20 text-coral",
  "bg-teal/20 text-teal",
  "bg-darkblue/20 text-darkblue",
  "bg-orange/20 text-orange",
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default async function AttendeeProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, company, job_title, email")
    .eq("id", user.id)
    .maybeSingle();

  const displayName = profile?.name || user.email || "Účastník";
  const email = profile?.email ?? user.email ?? "";

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header with avatar */}
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${getColor(displayName)}`}
        >
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-darkblue">
            Můj Profil
          </h1>
          <p className="text-sm text-darkblue/40 font-medium">{email}</p>
        </div>
      </div>

      {/* Profile form (reused) */}
      <ProfileForm
        initialData={{
          name: profile?.name ?? "",
          company: profile?.company ?? "",
          job_title: profile?.job_title ?? "",
          email,
        }}
      />

      {/* Logout */}
      <LogoutButton />
    </div>
  );
}
