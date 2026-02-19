"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ShareEventModal } from "./ShareEventModal";

interface EventActionsProps {
  event: {
    id: string;
    name: string;
    invite_code: string;
  };
}

export function EventActions({ event }: EventActionsProps) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <div className="absolute top-4 right-4 flex gap-2">
        <Link href={`/organizer/events/${event.id}/edit`}>
          <Button variant="secondary" size="sm" className="gap-2">
            <Pencil className="w-4 h-4" />
            Upravit
          </Button>
        </Link>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => setShareOpen(true)}
        >
          <Share2 className="w-4 h-4" />
          Sdílet
        </Button>
      </div>

      <ShareEventModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        event={event}
      />
    </>
  );
}
