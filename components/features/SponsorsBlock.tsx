import { Handshake, Building2, Gem, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

const PLACEHOLDER_SPONSORS = [
  { label: "Generální partner", icon: Gem, color: "text-orange bg-orange/10" },
  { label: "Hlavní partner", icon: Award, color: "text-coral bg-coral/10" },
  { label: "Mediální partner", icon: Building2, color: "text-teal bg-teal/10" },
];

export function SponsorsBlock() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Handshake className="w-5 h-5 text-darkblue/40" />
          <h2 className="text-lg font-bold text-darkblue">
            Partneři události
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {PLACEHOLDER_SPONSORS.map((sponsor) => (
          <Card key={sponsor.label} className="rounded-2xl">
            <CardContent className="flex flex-col items-center text-center py-5 px-3 gap-2">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${sponsor.color}`}
              >
                <sponsor.icon className="w-6 h-6" />
              </div>
              <p className="text-[11px] text-darkblue/40 font-semibold leading-tight">
                {sponsor.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
