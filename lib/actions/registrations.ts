"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function generateQRCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "QR-";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function registerForEventAction(formData: FormData) {
  const supabase = createClient();

  const eventId = formData.get("event_id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string | null;
  const position = formData.get("position") as string | null;

  if (!eventId || !name || !email) {
    return { error: "Jméno a email jsou povinné." };
  }

  // Check event exists and has capacity
  const { data: event } = await supabase
    .from("events")
    .select("id, capacity")
    .eq("id", eventId)
    .single();

  if (!event) {
    return { error: "Event nenalezen." };
  }

  const { count } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", eventId)
    .in("status", ["registered", "checked_in"]);

  if (count !== null && event.capacity && count >= event.capacity) {
    return { error: "Event je bohužel plný." };
  }

  // Find or create profile (needed before duplicate check)
  let { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!profile) {
    const { data: newProfile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        name,
        email,
        role: "attendee",
        company: company || null,
        position: position || null,
      })
      .select("id")
      .single();

    if (profileError) {
      return { error: `Chyba při vytváření profilu: ${profileError.message}` };
    }
    profile = newProfile;
  } else {
    // Update existing profile with latest info
    await supabase
      .from("profiles")
      .update({
        name,
        ...(company ? { company } : {}),
        ...(position ? { position } : {}),
      })
      .eq("id", profile.id);
  }

  // Check for duplicate registration by user_id
  const { data: existingReg } = await supabase
    .from("registrations")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", profile.id)
    .maybeSingle();

  if (existingReg) {
    return { error: "Už jste na tento event registrováni." };
  }

  // Create registration (only columns that exist on registrations table)
  const { error: regError } = await supabase.from("registrations").insert({
    event_id: eventId,
    user_id: profile.id,
    qr_code_data: generateQRCode(),
    status: "registered",
  });

  if (regError) {
    return { error: `Chyba při registraci: ${regError.message}` };
  }

  revalidatePath(`/e/`);
  return { success: true };
}
