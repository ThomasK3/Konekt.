"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { updateProfileAction } from "@/lib/actions/profile";

interface ProfileFormProps {
  initialData: {
    name: string;
    company: string;
    job_title: string;
    email: string;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (result.success) {
        toast.success("Profil uložen!");
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <Card>
        <CardContent className="space-y-6">
          {/* Email (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-darkblue/60">
              E-mail
            </label>
            <Input value={initialData.email} disabled className="opacity-60" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-darkblue/60">
              Jméno a příjmení
            </label>
            <Input
              name="name"
              placeholder="Jan Novák"
              defaultValue={initialData.name}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-darkblue/60">
              Společnost
            </label>
            <Input
              name="company"
              placeholder="Název společnosti"
              defaultValue={initialData.company}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-darkblue/60">
              Pozice
            </label>
            <Input
              name="job_title"
              placeholder="Např. CEO, Developer"
              defaultValue={initialData.job_title}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={pending}>
              {pending ? "Ukládám..." : "Uložit změny"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
