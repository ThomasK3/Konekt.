"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signInAction, signUpAction } from "@/lib/actions/auth";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const action = isLogin ? signInAction : signUpAction;
      const result = await action(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-darkblue">
          {isLogin ? "Vítejte zpět" : "Vytvořit účet"}
        </h1>
        <p className="text-darkblue/50 font-medium">
          {isLogin
            ? "Přihlaste se ke svému účtu."
            : "Zaregistrujte se a objevte nové eventy."}
        </p>
      </div>

      {/* Form */}
      <form action={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-darkblue/60">
            E-mail
          </label>
          <Input
            name="email"
            type="email"
            placeholder="vas@email.cz"
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-darkblue/60">
            Heslo
          </label>
          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>

        {error && (
          <p className="text-sm text-coral font-semibold bg-coral/10 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="w-full"
        >
          {pending
            ? "Načítání..."
            : isLogin
              ? "Přihlásit se"
              : "Zaregistrovat se"}
        </Button>
      </form>

      {/* Toggle */}
      <p className="text-sm text-darkblue/50 font-medium text-center">
        {isLogin ? "Nemáte účet?" : "Už máte účet?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsLogin((v) => !v);
            setError(null);
          }}
          className="text-coral font-bold hover:underline"
        >
          {isLogin ? "Zaregistrujte se" : "Přihlaste se"}
        </button>
      </p>
    </div>
  );
}
