"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateQRSecret(): string {
  return Math.random().toString(36).substring(2, 18);
}

export async function createEventAction(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Nejste přihlášeni." };
  }

  const name = formData.get("name") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const capacity = Number(formData.get("capacity")) || 30;
  const visibility = (formData.get("visibility") as string) || "public";
  const is_public = formData.get("is_public") === "true";
  const coverImage = formData.get("cover_image") as File | null;

  // Upload cover image if provided
  let cover_image_url: string | null = null;

  if (coverImage && coverImage.size > 0) {
    const ext = coverImage.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("event-covers")
      .upload(path, coverImage);

    if (uploadError) {
      return { error: `Chyba při nahrávání obrázku: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("event-covers").getPublicUrl(path);

    cover_image_url = publicUrl;
  }

  const { data, error } = await supabase
    .from("events")
    .insert({
      name,
      description,
      date,
      time,
      location,
      capacity,
      visibility,
      is_public,
      cover_image_url,
      organizer_id: user.id,
      invite_code: generateInviteCode(),
      qr_secret: generateQRSecret(),
      status: "draft",
    })
    .select()
    .single();

  if (error) {
    return { error: `Chyba při vytváření eventu: ${error.message}` };
  }

  revalidatePath("/organizer/events");
  return { id: data.id };
}

export async function updateEventAction(eventId: string, formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Nejste přihlášeni." };
  }

  // Verify ownership
  const { data: existing } = await supabase
    .from("events")
    .select("organizer_id, cover_image_url")
    .eq("id", eventId)
    .single();

  if (!existing || existing.organizer_id !== user.id) {
    return { error: "Nemáte oprávnění upravit tento event." };
  }

  const name = formData.get("name") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const capacity = Number(formData.get("capacity")) || 30;
  const visibility = (formData.get("visibility") as string) || "public";
  const is_public = formData.get("is_public") === "true";
  const coverImage = formData.get("cover_image") as File | null;

  // Keep existing image unless a new one is uploaded
  let cover_image_url: string | null = existing.cover_image_url;

  if (coverImage && coverImage.size > 0) {
    const ext = coverImage.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("event-covers")
      .upload(path, coverImage);

    if (uploadError) {
      return { error: `Chyba při nahrávání obrázku: ${uploadError.message}` };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("event-covers").getPublicUrl(path);

    cover_image_url = publicUrl;
  }

  const { error } = await supabase
    .from("events")
    .update({
      name,
      description,
      date,
      time,
      location,
      capacity,
      visibility,
      is_public,
      cover_image_url,
    })
    .eq("id", eventId);

  if (error) {
    return { error: `Chyba při úpravě eventu: ${error.message}` };
  }

  revalidatePath(`/organizer/events/${eventId}`);
  revalidatePath("/organizer/events");
  return { success: true };
}

export async function deleteEventAction(eventId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Nejste přihlášeni." };
  }

  // Verify ownership
  const { data: existing } = await supabase
    .from("events")
    .select("organizer_id")
    .eq("id", eventId)
    .single();

  if (!existing || existing.organizer_id !== user.id) {
    return { error: "Nemáte oprávnění smazat tento event." };
  }

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId);

  if (error) {
    return { error: `Chyba při mazání eventu: ${error.message}` };
  }

  revalidatePath("/organizer/events");
  revalidatePath("/organizer/dashboard");
  return { success: true };
}
