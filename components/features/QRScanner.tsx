"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";
import { ScanLine, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { processCheckIn } from "@/lib/actions/checkin";

interface ScanResult {
  name: string;
  time: string;
  status: "ok" | "error";
  message: string;
}

export function QRScanner({ eventId }: { eventId: string }) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const processingRef = useRef(false);
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const scanConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

    const onScanSuccess = async (decodedText: string) => {
      if (processingRef.current || cancelled) return;
      processingRef.current = true;

      const now = new Date().toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const result = await processCheckIn(decodedText, eventId);

      if (cancelled) return;

      if (result.success) {
        toast.success(`${result.userName} odbaven!`);
        setRecentScans((prev) => [
          {
            name: result.userName ?? "Účastník",
            time: now,
            status: "ok",
            message: "Check-in OK",
          },
          ...prev,
        ]);
      } else {
        toast.error(result.error);
        setRecentScans((prev) => [
          {
            name: result.userName ?? "—",
            time: now,
            status: "error",
            message: result.error ?? "Chyba",
          },
          ...prev,
        ]);
      }

      setTimeout(() => {
        processingRef.current = false;
      }, 1500);
    };

    const onScanFailure = () => {};

    async function startCamera() {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cancelled) return;

        if (!cameras || cameras.length === 0) {
          setCameraError("Nebyla nalezena žádná kamera.");
          return;
        }

        // Prefer back camera, fallback to first available
        const backCamera = cameras.find(
          (c) =>
            c.label.toLowerCase().includes("back") ||
            c.label.toLowerCase().includes("environment") ||
            c.label.toLowerCase().includes("rear")
        );
        const cameraId = backCamera?.id ?? cameras[0].id;

        await scanner.start(cameraId, scanConfig, onScanSuccess, onScanFailure);
        started = true;
        if (!cancelled) setScanning(true);
      } catch {
        if (!cancelled) {
          setCameraError(
            "Kameru se nepodařilo spustit. Zkontrolujte oprávnění prohlížeče."
          );
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (started) {
        scanner
          .stop()
          .then(() => {
            try { scanner.clear(); } catch (e) { console.warn("Scanner clear ignored", e); }
          })
          .catch((e) => {
            console.warn("Scanner stop ignored", e);
            try { scanner.clear(); } catch { /* noop */ }
          });
      } else {
        try { scanner.clear(); } catch (e) { console.warn("Scanner clear ignored", e); }
      }
    };
  }, [eventId]);

  return (
    <div className="space-y-6">
      {/* Camera card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div
              id="qr-reader"
              className="w-full [&_video]:rounded-2xl [&_#qr-shaded-region]:rounded-2xl"
            />
            {!scanning && !cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-input rounded-2xl min-h-[300px]">
                <ScanLine className="w-10 h-10 text-darkblue/30 animate-pulse" />
                <p className="text-sm font-medium text-darkblue/50">
                  Spouštím kameru...
                </p>
              </div>
            )}
            {cameraError && (
              <div className="flex flex-col items-center justify-center gap-3 bg-input rounded-2xl min-h-[300px]">
                <XCircle className="w-10 h-10 text-coral/50" />
                <p className="text-sm font-medium text-darkblue/60 text-center px-6">
                  {cameraError}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent scans */}
      {recentScans.length > 0 && (
        <Card>
          <CardContent>
            <h3 className="text-base font-bold text-darkblue mb-4">
              Nedávné skeny
            </h3>
            <div className="space-y-3">
              {recentScans.slice(0, 10).map((scan, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-darkblue/5 last:border-0"
                >
                  {scan.status === "ok" ? (
                    <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-teal" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0">
                      <XCircle className="w-4 h-4 text-coral" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-darkblue truncate">
                      {scan.name}
                    </p>
                    <p className="text-xs text-darkblue/50 font-medium">
                      {scan.message}
                    </p>
                  </div>
                  <span className="text-xs text-darkblue/40 font-medium shrink-0">
                    {scan.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
