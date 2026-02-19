import { EventForm } from "@/components/features/EventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-darkblue">
          Nový event
        </h1>
        <p className="text-darkblue/60 font-medium mt-2">
          Vytvořte nezapomenutelný zážitek
        </p>
      </div>

      <EventForm />
    </div>
  );
}
