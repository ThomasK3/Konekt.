"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { cn } from "@/lib/utils";
import { createEventAction, updateEventAction } from "@/lib/actions/events";

const schema = z.object({
  name: z.string().min(3, "Název musí mít alespoň 3 znaky"),
  date: z.string().min(1, "Vyberte datum"),
  time: z.string().min(1, "Vyberte čas"),
  location: z.string().optional(),
  description: z.string().optional(),
  capacity: z.number().min(1, "Minimální kapacita je 1"),
  visibility: z.enum(["public", "private"]),
  is_public: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export interface EventInitialData {
  id: string;
  name: string;
  date: string | null;
  time: string | null;
  location: string | null;
  description: string | null;
  capacity: number | null;
  visibility: string | null;
  is_public: boolean | null;
  cover_image_url: string | null;
}

interface EventFormProps {
  initialData?: EventInitialData;
}

export function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const coverFileRef = useRef<File | null>(null);
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name ?? "",
      date: initialData?.date ?? "",
      time: initialData?.time ?? "",
      location: initialData?.location ?? "",
      description: initialData?.description ?? "",
      capacity: initialData?.capacity ?? 30,
      visibility: (initialData?.visibility as "public" | "private") ?? "public",
      is_public: initialData?.is_public ?? false,
    },
  });

  const visibility = watch("visibility");

  async function onSubmit(values: FormValues) {
    setPending(true);

    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("date", values.date);
    fd.set("time", values.time);
    fd.set("location", values.location ?? "");
    fd.set("description", values.description ?? "");
    fd.set("capacity", String(values.capacity));
    fd.set("visibility", values.visibility);
    fd.set("is_public", values.is_public ? "true" : "false");

    if (coverFileRef.current) {
      fd.set("cover_image", coverFileRef.current);
    }

    if (isEditing) {
      const result = await updateEventAction(initialData.id, fd);
      if (result.error) {
        toast.error(result.error);
        setPending(false);
        return;
      }
      toast.success("Event upraven!");
      router.push(`/organizer/events/${initialData.id}`);
    } else {
      const result = await createEventAction(fd);
      if (result.error) {
        toast.error(result.error);
        setPending(false);
        return;
      }
      toast.success("Event vytvořen!");
      router.push(`/organizer/events/${result.id}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Card 1: Visual & Basics */}
      <Card>
        <CardContent className="space-y-6">
          <ImageUpload
            name="cover_image"
            defaultImage={initialData?.cover_image_url}
            onChange={(file) => {
              coverFileRef.current = file;
            }}
          />
          <div className="space-y-1">
            <Input
              placeholder="Např. Startup Night 2026"
              className="text-xl h-14 font-semibold"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-coral font-medium">
                {errors.name.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Details */}
      <Card>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-darkblue/60">
                Datum
              </label>
              <Input type="date" {...register("date")} />
              {errors.date && (
                <p className="text-sm text-coral font-medium">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-darkblue/60">
                Čas
              </label>
              <Input type="time" {...register("time")} />
              {errors.time && (
                <p className="text-sm text-coral font-medium">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-darkblue/60">
              Místo konání
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-darkblue/40" />
              <Input
                placeholder="Např. Hub Hall, Praha"
                className="pl-12"
                {...register("location")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-darkblue/60">
              Popis eventu
            </label>
            <Textarea
              placeholder="Popište, co účastníky čeká..."
              {...register("description")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Settings */}
      <Card>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-darkblue/60">
                Kapacita
              </label>
              <Input
                type="number"
                placeholder="30"
                min={1}
                {...register("capacity", { valueAsNumber: true })}
              />
              {errors.capacity && (
                <p className="text-sm text-coral font-medium">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-darkblue/60">
                Viditelnost
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setValue("visibility", "public")}
                  className={cn(
                    "flex-1 h-12 rounded-xl font-semibold text-sm transition-all",
                    visibility === "public"
                      ? "bg-gradient-warm text-white shadow-glow"
                      : "bg-input text-darkblue/60 hover:bg-darkblue/5"
                  )}
                >
                  Veřejný
                </button>
                <button
                  type="button"
                  onClick={() => setValue("visibility", "private")}
                  className={cn(
                    "flex-1 h-12 rounded-xl font-semibold text-sm transition-all",
                    visibility === "private"
                      ? "bg-gradient-warm text-white shadow-glow"
                      : "bg-input text-darkblue/60 hover:bg-darkblue/5"
                  )}
                >
                  Soukromý
                </button>
              </div>
            </div>
          </div>

          {/* Public catalog toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("is_public")}
              />
              <div className="w-11 h-6 bg-darkblue/10 rounded-full peer-checked:bg-teal transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform" />
            </div>
            <div>
              <p className="text-sm font-semibold text-darkblue">
                Veřejný event
              </p>
              <p className="text-xs text-darkblue/40 font-medium">
                Zobrazit v katalogu eventů pro všechny účastníky
              </p>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex items-center justify-end gap-4 pb-8">
        <Link href={isEditing ? `/organizer/events/${initialData.id}` : "/organizer/events"}>
          <Button variant="ghost" type="button">
            Zrušit
          </Button>
        </Link>
        <Button size="lg" type="submit" disabled={pending}>
          {pending
            ? isEditing
              ? "Ukládám..."
              : "Vytvářím..."
            : isEditing
              ? "Uložit změny"
              : "Vytvořit event"}
        </Button>
      </div>
    </form>
  );
}
