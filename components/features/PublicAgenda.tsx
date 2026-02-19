import { Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import type { AgendaItem } from "@/lib/actions/agenda";

function formatTime(time: string) {
  return time.slice(0, 5);
}

export function PublicAgenda({ items }: { items: AgendaItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-darkblue">Program události</h2>

      <div className="relative">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <div key={item.id} className="flex gap-4">
              {/* Time column */}
              <div className="w-24 shrink-0 pt-4 text-right">
                <p className="text-sm font-bold text-darkblue/70">
                  {formatTime(item.start_time)}
                </p>
                <p className="text-xs text-darkblue/40 font-medium">
                  {formatTime(item.end_time)}
                </p>
              </div>

              {/* Timeline axis */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-3 h-3 rounded-full bg-coral mt-5 shrink-0 ring-4 ring-coral/10" />
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-darkblue/10" />
                )}
              </div>

              {/* Content card */}
              <div className={`flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                <Card className="shadow-sm hover:-translate-y-0.5 transition-all">
                  <CardContent className="py-4 px-5 space-y-1.5">
                    <h3 className="text-sm font-bold text-darkblue">
                      {item.title}
                    </h3>
                    {item.speaker && (
                      <div className="flex items-center gap-1.5 text-xs text-darkblue/50 font-medium">
                        <Mic className="w-3.5 h-3.5" />
                        {item.speaker}
                      </div>
                    )}
                    {item.description && (
                      <p className="text-xs text-darkblue/60 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
