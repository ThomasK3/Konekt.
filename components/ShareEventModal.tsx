"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/Button";

interface ShareEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export function ShareEventModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
}: ShareEventModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Generate URLs and invite code
  const fullUrl = `https://konekt.app/events/${eventId}`;
  const shortUrl = `konekt.app/e/${eventId.substring(0, 8)}`;
  const inviteCode = eventId.substring(0, 6).toUpperCase();

  // Generate QR code
  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(fullUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: "#212529",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error("QR code generation failed:", err));
    }
  }, [isOpen, fullUrl]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = `konekt-event-${eventId}-qr.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-border-light px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-h3 font-semibold text-text-primary">
              Share Event
            </h2>
            <p className="text-small text-text-secondary mt-1">
              {eventTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            {qrCodeUrl ? (
              <div className="bg-white p-4 rounded-lg border border-border-light">
                <img
                  src={qrCodeUrl}
                  alt="Event QR Code"
                  className="w-64 h-64"
                />
              </div>
            ) : (
              <div className="w-64 h-64 bg-bg-light rounded-lg flex items-center justify-center">
                <span className="text-text-secondary">Generating QR...</span>
              </div>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={downloadQRCode}
              className="mt-4"
              disabled={!qrCodeUrl}
            >
              Download QR Code
            </Button>
          </div>

          {/* Short Link Section */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Short Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-4 py-2 border border-border-light rounded-md bg-bg-light text-text-primary text-small"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(shortUrl, "short")}
              >
                {copiedField === "short" ? "✓ Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Full URL Section */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Full URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={fullUrl}
                readOnly
                className="flex-1 px-4 py-2 border border-border-light rounded-md bg-bg-light text-text-primary text-small"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(fullUrl, "full")}
              >
                {copiedField === "full" ? "✓ Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Invite Code Section */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-2">
              Invite Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteCode}
                readOnly
                className="flex-1 min-w-0 px-4 py-2 border border-border-light rounded-md bg-bg-light text-text-primary text-center text-xl font-bold tracking-wider"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(inviteCode, "code")}
                className="flex-shrink-0"
              >
                {copiedField === "code" ? "✓" : "Copy"}
              </Button>
            </div>
            <p className="text-small text-text-secondary mt-2">
              Participants can use this code to find and register for your event
            </p>
          </div>

          {/* Social Share Buttons */}
          <div>
            <label className="block text-small font-semibold text-text-primary mb-3">
              Share on Social Media
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out ${eventTitle}!`
                    )}&url=${encodeURIComponent(fullUrl)}`,
                    "_blank"
                  )
                }
                className="flex items-center justify-center gap-2 px-4 py-3 border border-border-light rounded-md hover:bg-bg-light transition-colors"
              >
                <span className="text-xl">𝕏</span>
                <span className="text-small font-medium">Twitter</span>
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      fullUrl
                    )}`,
                    "_blank"
                  )
                }
                className="flex items-center justify-center gap-2 px-4 py-3 border border-border-light rounded-md hover:bg-bg-light transition-colors"
              >
                <span className="text-xl">📘</span>
                <span className="text-small font-medium">Facebook</span>
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      fullUrl
                    )}`,
                    "_blank"
                  )
                }
                className="flex items-center justify-center gap-2 px-4 py-3 border border-border-light rounded-md hover:bg-bg-light transition-colors"
              >
                <span className="text-xl">💼</span>
                <span className="text-small font-medium">LinkedIn</span>
              </button>
              <button
                onClick={() =>
                  window.open(
                    `mailto:?subject=${encodeURIComponent(
                      eventTitle
                    )}&body=${encodeURIComponent(
                      `Check out this event: ${fullUrl}`
                    )}`,
                    "_blank"
                  )
                }
                className="flex items-center justify-center gap-2 px-4 py-3 border border-border-light rounded-md hover:bg-bg-light transition-colors"
              >
                <span className="text-xl">✉️</span>
                <span className="text-small font-medium">Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border-light px-6 py-4 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
