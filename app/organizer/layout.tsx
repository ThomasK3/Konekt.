import { createClient } from "@/lib/supabase/server";
import { OrganizerLayout } from "@/components/layout/OrganizerLayout";

export default async function Layout({
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
    <OrganizerLayout user={{ name: userName, email: userEmail }}>
      {children}
    </OrganizerLayout>
  );
}
