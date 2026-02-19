"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface AgendaItem {
  id: string;
  event_id: string;
  title: string;
  start_time: string;
  end_time: string;
  speaker: string | null;
  description: string | null;
  created_at: string;
}

export async function getAgendaItems(eventId: string): Promise<AgendaItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("agenda_items")
    .select("*")
    .eq("event_id", eventId)
    .order("start_time", { ascending: true });

  if (error) {
    console.error("SUPABASE CHYBA PŘI NAČÍTÁNÍ AGENDY:", error.message);
    return [];
  }

  return (data as AgendaItem[]) ?? [];
}

export async function addAgendaItem(formData: FormData, eventId: string) {
  const supabase = createClient();

  const title = formData.get("title") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const speaker = (formData.get("speaker") as string) || null;
  const description = (formData.get("description") as string) || null;

  if (!title || !start_time || !end_time) {
    return { success: false, error: "Vyplňte název, začátek a konec." };
  }

  const { error } = await supabase.from("agenda_items").insert({
    event_id: eventId,
    title,
    start_time,
    end_time,
    speaker,
    description,
  });

  if (error) {
    console.error("SUPABASE CHYBA PŘI PŘIDÁNÍ BODU AGENDY:", error.message);
    return { success: false, error: "Nepodařilo se uložit bod programu." };
  }

  revalidatePath(`/organizer/events/${eventId}`);
  return { success: true };
}
