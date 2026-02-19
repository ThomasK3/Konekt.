import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EventForm } from "@/components/features/EventForm";
import { DangerZone } from "@/components/features/DangerZone";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: event } = await supabase
    .from("events")
    .select("id, name, date, time, location, description, capacity, visibility, cover_image_url")
    .eq("id", params.id)
    .single();

  if (!event) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
          Úprava eventu
        </h1>
        <p className="text-darkblue/60 font-medium mt-2">
          Upravte detaily vašeho eventu
        </p>
      </div>

      <EventForm initialData={event} />

      <DangerZone eventId={event.id} eventName={event.name} />
    </div>
  );
}
