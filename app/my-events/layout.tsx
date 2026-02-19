import { createClient } from "@/lib/supabase/server";
import { AttendeeSidebar } from "@/components/layout/AttendeeSidebar";
import { AttendeeNav } from "@/components/layout/AttendeeNav";
import { TopBar } from "@/components/layout/TopBar";

export default async function MyEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userName: string | null = null;
  let userEmail: string | null = user?.email ?? null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .maybeSingle();

    userName = profile?.name ?? null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AttendeeSidebar />
      <AttendeeNav />

      {/* Main content area */}
      <main className="md:ml-72 mb-24 md:mb-0">
        <div className="max-w-7xl px-8 py-8">
          <TopBar
            user={{ name: userName, email: userEmail }}
            settingsHref="/my-events/profile"
          />
          {children}
        </div>
      </main>
    </div>
  );
}
