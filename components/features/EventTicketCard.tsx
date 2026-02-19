import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface EventTicketCardProps {
  event: {
    id: string;
    name: string;
    date: string | null;
    location: string | null;
    cover_image_url: string | null;
  };
  status: string;
}

export function EventTicketCard({ event, status }: EventTicketCardProps) {
  const isCheckedIn = status === "checked_in";

  return (
    <Link href={`/my-events/${event.id}`}>
      <Card className="overflow-hidden hover:-translate-y-1 hover:shadow-float transition-all cursor-pointer h-full">
        {/* Mini cover */}
        <div className="relative h-32">
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

        <CardContent className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-darkblue leading-tight">
              {event.name}
            </h3>
            <span
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${
                isCheckedIn
                  ? "bg-teal/20 text-teal"
                  : "bg-coral/20 text-coral"
              }`}
            >
              {isCheckedIn ? (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Odbaveno
                </span>
              ) : (
                "Registrováno"
              )}
            </span>
          </div>

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

          <Button size="sm" variant="secondary" className="w-full gap-2">
            Otevřít vstupenku
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
