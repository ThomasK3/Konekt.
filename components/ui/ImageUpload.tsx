"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: File | string | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreview(null);
      onChange(null);
      return;
    }

    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    handleFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-bg-page">
          <img
            src={preview}
            alt="Event cover preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-button flex items-center justify-center hover:bg-bg-page transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "w-full aspect-[16/9] rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
            isDragging
              ? "border-text-primary bg-bg-page"
              : error
              ? "border-status-error bg-bg-surface"
              : "border-border-light bg-bg-surface hover:border-text-primary hover:bg-bg-page"
          )}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-secondary mb-3"
          >
            <rect x="6" y="6" width="36" height="36" rx="4" />
            <circle cx="16" cy="16" r="3" />
            <path d="M6 36L18 24L30 36" />
            <path d="M30 30L36 24L42 30" />
          </svg>
          <p className="text-base font-semibold text-text-primary mb-1">
            {isDragging ? "Drop image here" : "Upload cover image"}
          </p>
          <p className="text-small text-text-secondary">
            Drag & drop or click to browse
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      {error && (
        <p className="text-small text-status-error mt-2">{error}</p>
      )}
    </div>
  );
}
