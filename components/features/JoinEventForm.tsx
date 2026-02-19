"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function JoinEventForm() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      toast.error("Zadejte kód eventu.");
      return;
    }
    router.push(`/e/${trimmed}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Např. R1GKOH"
        className="flex-1 text-center text-lg font-bold tracking-widest uppercase h-14"
        maxLength={8}
      />
      <Button type="submit" size="lg" className="shrink-0">
        Vstoupit
      </Button>
    </form>
  );
}
