import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface PublicEventCardProps {
  event: {
    id: string;
    name: string;
    date: string | null;
    location: string | null;
    cover_image_url: string | null;
    invite_code: string;
  };
  registeredEventId?: string | null;
}

export function PublicEventCard({
  event,
  registeredEventId,
}: PublicEventCardProps) {
  const isRegistered = !!registeredEventId;

  return (
    <Card className="overflow-hidden hover:-translate-y-1 hover:shadow-float transition-all h-full flex flex-col">
      {/* Cover */}
      <div className="relative h-40">
        {event.cover_image_url ? (
          <Image
            src={event.cover_image_url}
            alt={event.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-cool flex items-center justify-center">
            <CalendarCheck className="w-8 h-8 text-white/30" />
          </div>
        )}
      </div>

      <CardContent className="flex flex-col flex-1 space-y-3">
        <h3 className="text-base font-bold text-darkblue leading-tight">
          {event.name}
        </h3>

        <div className="flex flex-col gap-1 text-sm text-darkblue/60 font-medium">
          {event.date && (
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {new Date(event.date).toLocaleDateString("cs-CZ", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2">
          {isRegistered ? (
            <Link href={`/my-events/${registeredEventId}`}>
              <Button
                size="sm"
                variant="secondary"
                className="w-full gap-2 bg-teal/10 text-teal hover:bg-teal/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                Už jste přihlášeni
              </Button>
            </Link>
          ) : (
            <Link href={`/e/${event.invite_code}`}>
              <Button size="sm" className="w-full gap-2">
                Zobrazit detail
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
