"use client";

import { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Link as LinkIcon, Hash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface ShareEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    name: string;
    invite_code: string;
  };
}

export function ShareEventModal({
  isOpen,
  onClose,
  event,
}: ShareEventModalProps) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/e/${event.invite_code}`
      : "";

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Odkaz zkopírován!");
  }

  async function copyCode() {
    await navigator.clipboard.writeText(event.invite_code);
    toast.success("Kód zkopírován!");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-darkblue/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative bg-surface rounded-2xl shadow-float w-full max-w-md p-8 space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-input flex items-center justify-center text-darkblue/50 hover:text-darkblue transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-darkblue">
            Sdílet event
          </h2>
          <p className="text-sm text-darkblue/60 font-medium mt-1">
            Pozvěte účastníky na váš event
          </p>
        </div>

        {/* Section A: Link */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-darkblue/50 uppercase tracking-wider">
            <LinkIcon className="w-3.5 h-3.5" />
            Odkaz
          </label>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 h-11 rounded-xl bg-input px-4 text-sm text-darkblue font-medium truncate border-none outline-none"
            />
            <Button size="sm" onClick={copyLink} className="shrink-0">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Section B: Code */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-darkblue/50 uppercase tracking-wider">
            <Hash className="w-3.5 h-3.5" />
            Kód pozvánky
          </label>
          <div className="flex items-center justify-between bg-input rounded-xl px-4 py-3">
            <span className="text-2xl font-extrabold tracking-[0.2em] text-darkblue">
              {event.invite_code}
            </span>
            <button
              onClick={copyCode}
              className="text-darkblue/40 hover:text-darkblue transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-darkblue/40 font-medium">
            Účastníci mohou zadat tento kód na hlavní stránce.
          </p>
        </div>

        {/* Section C: QR Code */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="bg-white p-4 rounded-2xl shadow-card">
            <QRCodeSVG
              value={shareUrl}
              size={160}
              fgColor="#315771"
              bgColor="#FFFFFF"
            />
          </div>
          <p className="text-xs text-darkblue/40 font-medium">
            Naskenujte pro rychlý přístup
          </p>
        </div>
      </div>
    </div>
  );
}
