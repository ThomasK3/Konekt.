"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function connectWithUser(
  connectedUserId: string,
  eventId: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Nepřihlášen" };

  if (user.id === connectedUserId) {
    return { success: false, error: "Nemůžete se propojit sami se sebou" };
  }

  // Insert connection (unique constraint on user_id + connected_user_id prevents duplicates)
  const { error } = await supabase.from("connections").insert({
    user_id: user.id,
    connected_user_id: connectedUserId,
    event_id: eventId,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Již propojeno" };
    }
    console.error("CONNECTION ERROR:", error.message);
    return { success: false, error: "Něco se pokazilo" };
  }

  // Increment networking_points by 10
  const { data: profile } = await supabase
    .from("profiles")
    .select("networking_points")
    .eq("id", user.id)
    .single();

  const currentPoints = profile?.networking_points ?? 0;

  await supabase
    .from("profiles")
    .update({ networking_points: currentPoints + 10 })
    .eq("id", user.id);

  revalidatePath("/my-events");
  revalidatePath(`/my-events/contacts`);

  return { success: true, points: currentPoints + 10 };
}

export interface Connection {
  id: string;
  connected_user_id: string;
  event_id: string;
  created_at: string;
  profile: {
    name: string | null;
    email: string | null;
    company: string | null;
    job_title: string | null;
  };
}

export async function getMyConnections(): Promise<Connection[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("connections")
    .select(
      `
      id,
      connected_user_id,
      event_id,
      created_at,
      profile:profiles!connected_user_id (name, email, company, job_title)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("CONNECTIONS FETCH ERROR:", error.message);
    return [];
  }

  return (data as unknown as Connection[]) ?? [];
}

export async function getMyConnectionIds(): Promise<string[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("connections")
    .select("connected_user_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("CONNECTION IDS ERROR:", error.message);
    return [];
  }

  return (data ?? []).map((c) => c.connected_user_id);
}

export async function getNetworkingPoints(): Promise<number> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { data } = await supabase
    .from("profiles")
    .select("networking_points")
    .eq("id", user.id)
    .single();

  return data?.networking_points ?? 0;
}
