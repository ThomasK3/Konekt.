import { AuthForm } from "@/components/features/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Visual panel (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-coral via-orange to-darkblue relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-white/10 rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <h2 className="text-5xl font-extrabold text-white leading-tight">
            Konekt.
          </h2>
          <p className="text-xl text-white/80 font-medium mt-4 max-w-sm">
            Eventy, které lidé milují. Propojte se, sbírejte kontakty a
            budujte komunitu.
          </p>
          <div className="flex items-center gap-3 mt-10">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              +10
            </div>
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-sm">
              XP
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
              🏆
            </div>
          </div>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex-1 flex items-center justify-center bg-background px-6 py-12">
        {/* Mobile logo */}
        <div className="w-full max-w-md">
          <div className="md:hidden mb-10">
            <h2 className="text-2xl font-extrabold text-darkblue">Konekt.</h2>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
