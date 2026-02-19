import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/features/ProfileForm";

export default async function SettingsPage() {
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

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
          Nastavení profilu
        </h1>
        <p className="text-darkblue/60 font-medium mt-2">
          Upravte své osobní údaje
        </p>
      </div>

      <ProfileForm
        initialData={{
          name: profile?.name ?? "",
          company: profile?.company ?? "",
          job_title: profile?.job_title ?? "",
          email: profile?.email ?? user.email ?? "",
        }}
      />
    </div>
  );
}
