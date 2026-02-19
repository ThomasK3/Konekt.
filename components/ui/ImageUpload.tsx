"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  name: string;
  defaultImage?: string | null;
  onChange?: (file: File | null) => void;
}

export function ImageUpload({ name, defaultImage, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);

  function handleFile(file: File | null) {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    onChange?.(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0] ?? null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0] ?? null);
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    handleFile(null);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all overflow-hidden",
        preview
          ? "border-transparent p-0 h-56"
          : "border-darkblue/20 bg-input/50 p-12 hover:bg-input hover:border-coral/50"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt="Cover preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={clear}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-darkblue/60 text-white flex items-center justify-center hover:bg-darkblue/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      ) : (
        <>
          <ImagePlus className="w-10 h-10 text-darkblue/30" />
          <p className="text-base font-semibold text-darkblue/60">
            Nahrajte cover obrázek
          </p>
          <p className="text-sm text-darkblue/40">nebo přetáhněte sem</p>
        </>
      )}
    </div>
  );
}
