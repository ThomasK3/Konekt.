"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { deleteEventAction } from "@/lib/actions/events";

export function DangerZone({
  eventId,
  eventName,
}: {
  eventId: string;
  eventName: string;
}) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteEventAction(eventId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Event smazán.");
        router.push("/organizer/dashboard");
      }
    });
  }

  return (
    <Card className="border border-coral/20">
      <CardContent className="space-y-4">
        <h3 className="text-base font-bold text-coral">Nebezpečná zóna</h3>
        <p className="text-sm text-darkblue/60 font-medium">
          Smazání eventu je nevratné. Budou odstraněny i všechny registrace a
          data programu.
        </p>

        {!confirm ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setConfirm(true)}
            className="gap-2 text-coral hover:bg-coral/10"
          >
            <Trash2 className="w-4 h-4" />
            Smazat event
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              onClick={handleDelete}
              disabled={pending}
              className="gap-2 bg-coral hover:bg-coral/90 shadow-none"
            >
              <Trash2 className="w-4 h-4" />
              {pending ? "Mažu..." : `Ano, smazat "${eventName}"`}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setConfirm(false)}
            >
              Zrušit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
