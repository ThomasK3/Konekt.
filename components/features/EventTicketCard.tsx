"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, QrCode, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QRCodeModal } from "./QRCodeModal";

interface EventTicketCardProps {
  event: {
    id: string;
    name: string;
    date: string | null;
    location: string | null;
    cover_image_url: string | null;
  };
  qrCodeData: string;
  status: string;
}

export function EventTicketCard({
  event,
  qrCodeData,
  status,
}: EventTicketCardProps) {
  const [qrOpen, setQrOpen] = useState(false);

  const statusLabel =
    status === "checked_in" ? "Check-in OK" : "Registrováno";
  const statusColor =
    status === "checked_in" ? "bg-teal/20 text-teal" : "bg-coral/20 text-coral";

  return (
    <>
      <Card className="overflow-hidden hover:-translate-y-1 transition-all">
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
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${statusColor}`}
            >
              {statusLabel}
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

          <Button
            size="sm"
            onClick={() => setQrOpen(true)}
            className="w-full gap-2"
          >
            <QrCode className="w-4 h-4" />
            Zobrazit QR kód
          </Button>
        </CardContent>
      </Card>

      <QRCodeModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        eventName={event.name}
        qrCodeData={qrCodeData}
      />
    </>
  );
}
