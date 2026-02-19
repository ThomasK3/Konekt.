"use server";

import { createClient } from "@/lib/supabase/server";

export interface Participant {
  id: string;
  status: string;
  created_at: string;
  checked_in_at: string | null;
  qr_code_data: string;
  user: {
    name: string | null;
    email: string | null;
    company: string | null;
    job_title: string | null; // Opraveno z 'position' na 'job_title'
  };
}

export async function getEventParticipants(
  eventId: string
): Promise<Participant[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("registrations")
    .select(
      `
      id,
      status,
      created_at,
      checked_in_at,
      qr_code_data,
      user:profiles!user_id (name, email, company, job_title)
    `
    )
    .eq("event_id", eventId)
    .in("status", ["registered", "checked_in"])
    .order("created_at", { ascending: false });

  // Bezpečné zalogování chyby přímo do konzole serveru
  if (error) {
    console.error("SUPABASE CHYBA PŘI NAČÍTÁNÍ ÚČASTNÍKŮ:", error.message);
    return [];
  }

  return (data as unknown as Participant[]) ?? [];
}