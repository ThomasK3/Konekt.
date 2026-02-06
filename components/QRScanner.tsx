"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
  isActive: boolean;
}

export function QRScanner({
  onScanSuccess,
  onScanError,
  isActive,
}: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const startScanner = async () => {
      if (!isActive) {
        // Stop scanner when not active
        if (scannerRef.current && isScanning) {
          try {
            await scannerRef.current.stop();
            await scannerRef.current.clear();
            if (isMountedRef.current) {
              setIsScanning(false);
            }
          } catch (err) {
            console.error("Error stopping scanner:", err);
          }
        }
        return;
      }

      // Don't initialize if already scanning
      if (isScanning) return;

      try {
        // Create scanner instance if it doesn't exist
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode("qr-reader");
        }

        // Get camera list
        const devices = await Html5Qrcode.getCameras();

        if (!devices || devices.length === 0) {
          if (isMountedRef.current) {
            setCameraError("No cameras found on this device");
            onScanError?.("No cameras found on this device");
          }
          return;
        }

        // Prefer back camera on mobile devices
        const backCamera = devices.find((device) =>
          device.label.toLowerCase().includes("back")
        );
        const cameraId = backCamera ? backCamera.id : devices[0].id;

        // Start scanning with configuration
        await scannerRef.current.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            // Success callback - QR code detected
            console.log("QR Code detected:", decodedText);
            onScanSuccess(decodedText);
          },
          (errorMessage) => {
            // This fires very frequently when no QR code is detected
            // We can safely ignore it
          }
        );

        if (isMountedRef.current) {
          setIsScanning(true);
          setCameraError(null);
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to access camera";

        console.error("Scanner error:", err);

        if (!isMountedRef.current) return;

        // Handle common errors
        if (errorMsg.includes("Permission") || errorMsg.includes("NotAllowed")) {
          setCameraError("Camera permission denied. Please allow camera access.");
        } else if (errorMsg.includes("NotFound")) {
          setCameraError("No camera found on this device");
        } else if (errorMsg.includes("NotReadable")) {
          setCameraError("Camera is already in use by another application");
        } else {
          setCameraError("Failed to start camera. Please try again.");
        }

        onScanError?.(errorMsg);
      }
    };

    startScanner();

    // Cleanup function
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current
          .stop()
          .then(() => {
            if (scannerRef.current) {
              scannerRef.current.clear();
            }
          })
          .catch((err) => console.error("Cleanup error:", err));
      }
    };
  }, [isActive]);

  return (
    <div className="w-full">
      {cameraError ? (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-3">⚠️</p>
          <p className="font-bold text-red-900 mb-2">Camera Error</p>
          <p className="text-red-700 text-sm">{cameraError}</p>
          <p className="text-red-600 text-xs mt-4">
            Make sure camera permissions are enabled in your browser settings
          </p>
        </div>
      ) : (
        <div className="relative w-full">
          {/* Scanner container - the library will inject video here */}
          <div
            id="qr-reader"
            className="w-full"
            style={{ minHeight: "350px" }}
          />

          {/* Scanning indicator */}
          {isScanning && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-900">
                  Camera active - Position QR code in frame
                </span>
              </div>
            </div>
          )}

          {!isScanning && !cameraError && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-blue-900">
                  Initializing camera...
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
