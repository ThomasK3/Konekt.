"use client";

import { useState, useTransition } from "react";
import { Mic, Plus, X, Clock } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { addAgendaItem, type AgendaItem } from "@/lib/actions/agenda";

function formatTime(time: string) {
  // time comes as "HH:MM" or "HH:MM:SS"
  return time.slice(0, 5);
}

export function ProgramTab({
  items,
  eventId,
}: {
  items: AgendaItem[];
  eventId: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addAgendaItem(formData, eventId);
      if (result.success) {
        toast.success("Bod programu přidán!");
        setShowForm(false);
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Card>
      <CardContent className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-darkblue">
            Program události
          </h2>
          <Button
            size="sm"
            onClick={() => setShowForm((v) => !v)}
            className="gap-2"
          >
            {showForm ? (
              <>
                <X className="w-4 h-4" />
                Zrušit
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Přidat bod
              </>
            )}
          </Button>
        </div>

        {/* Inline form */}
        {showForm && (
          <form action={handleSubmit} className="space-y-4">
            <Card className="bg-background shadow-none">
              <CardContent className="space-y-3">
                <Input
                  name="title"
                  placeholder="Název bodu programu *"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input name="start_time" type="time" required />
                  <Input name="end_time" type="time" required />
                </div>
                <Input name="speaker" placeholder="Přednášející (volitelné)" />
                <Textarea
                  name="description"
                  placeholder="Popis (volitelné)"
                  className="min-h-[80px]"
                />
                <div className="flex justify-end">
                  <Button type="submit" size="sm" disabled={pending}>
                    {pending ? "Ukládám..." : "Uložit"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}

        {/* Timeline */}
        {items.length === 0 && !showForm ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 rounded-2xl bg-orange/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-orange" />
            </div>
            <p className="text-darkblue/40 font-medium">
              Zatím není vytvořen žádný program.
            </p>
            <p className="text-sm text-darkblue/30 font-medium mt-1">
              Přidejte první bod kliknutím na tlačítko výše.
            </p>
          </div>
        ) : (
          <div className="relative">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;

              return (
                <div key={item.id} className="flex gap-4">
                  {/* Time column */}
                  <div className="w-24 shrink-0 pt-4 text-right">
                    <p className="text-sm font-bold text-darkblue/70">
                      {formatTime(item.start_time)}
                    </p>
                    <p className="text-xs text-darkblue/40 font-medium">
                      {formatTime(item.end_time)}
                    </p>
                  </div>

                  {/* Timeline axis */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-coral mt-5 shrink-0 ring-4 ring-coral/10" />
                    {!isLast && (
                      <div className="w-0.5 flex-1 bg-darkblue/10" />
                    )}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                    <Card className="shadow-sm hover:-translate-y-0.5 transition-all">
                      <CardContent className="py-4 px-5 space-y-1.5">
                        <h3 className="text-sm font-bold text-darkblue">
                          {item.title}
                        </h3>
                        {item.speaker && (
                          <div className="flex items-center gap-1.5 text-xs text-darkblue/50 font-medium">
                            <Mic className="w-3.5 h-3.5" />
                            {item.speaker}
                          </div>
                        )}
                        {item.description && (
                          <p className="text-xs text-darkblue/60 font-medium leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
