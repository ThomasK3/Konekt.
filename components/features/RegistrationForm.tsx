"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { registerForEventAction } from "@/lib/actions/registrations";

const schema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string().email("Zadejte platný email"),
  company: z.string().optional(),
  position: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface RegistrationFormProps {
  eventId: string;
  loggedInUser?: { name: string; email: string };
}

export function RegistrationForm({
  eventId,
  loggedInUser,
}: RegistrationFormProps) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: loggedInUser?.name ?? "",
      email: loggedInUser?.email ?? "",
      company: "",
      position: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setPending(true);

    const fd = new FormData();
    fd.set("event_id", eventId);
    fd.set("name", values.name);
    fd.set("email", values.email);
    fd.set("company", values.company ?? "");
    fd.set("position", values.position ?? "");

    const result = await registerForEventAction(fd);

    if (result.error) {
      toast.error(result.error);
      setPending(false);
      return;
    }

    setSuccess(true);
    toast.success("Registrace úspěšná!");
  }

  // Quick submit for logged-in users
  async function quickRegister() {
    if (!loggedInUser) return;
    setPending(true);

    const fd = new FormData();
    fd.set("event_id", eventId);
    fd.set("name", loggedInUser.name);
    fd.set("email", loggedInUser.email);

    const result = await registerForEventAction(fd);

    if (result.error) {
      toast.error(result.error);
      setPending(false);
      return;
    }

    setSuccess(true);
    toast.success("Registrace úspěšná!");
  }

  if (success) {
    return (
      <Card className="rounded-3xl">
        <CardContent className="flex flex-col items-center text-center py-12 gap-4">
          <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-teal" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-darkblue">
            Jste registrováni!
          </h2>
          <p className="text-darkblue/60 font-medium max-w-sm">
            Na email vám přijde potvrzení s QR kódem pro check-in. Těšíme se na
            vás!
          </p>
          <Link href="/my-events">
            <Button className="gap-2 mt-2">
              Přejít na Moje Eventy
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Logged-in user: one-click registration
  if (loggedInUser) {
    return (
      <Card className="rounded-3xl">
        <CardContent className="flex flex-col items-center text-center py-10 gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-warm flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-darkblue">
              Přihlášen jako {loggedInUser.name || loggedInUser.email}
            </h2>
            <p className="text-sm text-darkblue/50 font-medium mt-1">
              {loggedInUser.email}
            </p>
          </div>
          <Button
            size="lg"
            onClick={quickRegister}
            disabled={pending}
            className="w-full max-w-xs mt-2"
          >
            {pending ? "Registruji..." : "Registrovat se jedním klikem"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Guest registration form
  return (
    <Card className="rounded-3xl">
      <CardContent>
        <h2 className="text-xl font-extrabold tracking-tight text-darkblue mb-1">
          Registrace
        </h2>
        <p className="text-sm text-darkblue/50 font-medium mb-6">
          Vyplňte údaje a zajistěte si místo
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Input placeholder="Jméno a příjmení *" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-coral font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="email"
              placeholder="Email *"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-coral font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Společnost" {...register("company")} />
            <Input placeholder="Pozice" {...register("position")} />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="w-full mt-2"
          >
            {pending ? "Registruji..." : "Závazně se registrovat"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
