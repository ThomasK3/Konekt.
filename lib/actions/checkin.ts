"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function processCheckIn(qrData: string, eventId: string) {
  const supabase = createClient();

  // Find registration by QR code for this specific event
  const { data: registration, error: fetchError } = await supabase
    .from("registrations")
    .select(
      `
      id,
      status,
      user_id,
      user:profiles!user_id (name)
    `
    )
    .eq("qr_code_data", qrData)
    .eq("event_id", eventId)
    .maybeSingle();

  if (fetchError || !registration) {
    return { error: "Neplatný QR kód pro tento event." };
  }

  const userName =
    (registration.user as any)?.name ?? "Neznámý účastník";

  if (registration.status === "checked_in") {
    return { error: `${userName} už byl odbaven!`, userName };
  }

  // Process check-in
  const { error: updateError } = await supabase
    .from("registrations")
    .update({
      status: "checked_in",
      checked_in_at: new Date().toISOString(),
    })
    .eq("id", registration.id);

  if (updateError) {
    return { error: `Chyba při odbavení: ${updateError.message}` };
  }

  revalidatePath(`/organizer/events/${eventId}`);
  return { success: true, userName };
}
