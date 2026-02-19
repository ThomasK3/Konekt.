"use client";

import { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  qrCodeData: string;
}

export function QRCodeModal({
  isOpen,
  onClose,
  eventName,
  qrCodeData,
}: QRCodeModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-darkblue/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-surface rounded-2xl shadow-float w-full max-w-sm p-8 flex flex-col items-center gap-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-input flex items-center justify-center text-darkblue/50 hover:text-darkblue transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-extrabold tracking-tight text-darkblue text-center">
          {eventName}
        </h2>

        <div className="bg-white p-5 rounded-2xl shadow-card">
          <QRCodeSVG
            value={qrCodeData}
            size={200}
            fgColor="#315771"
            bgColor="#FFFFFF"
          />
        </div>

        <p className="text-xs text-darkblue/40 font-medium text-center">
          Ukažte tento kód při check-inu
        </p>
      </div>
    </div>
  );
}
