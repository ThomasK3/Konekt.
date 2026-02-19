"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import type { EventAnalytics } from "@/lib/actions/analytics";

const COLORS = ["#E66467", "#409F9C", "#315771", "#F29639", "#7C8DB0", "#6BCABA", "#D4856B", "#5B7FA5"];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface shadow-card rounded-xl px-4 py-2.5 text-sm">
      {label && (
        <p className="font-bold text-darkblue mb-1">{label}</p>
      )}
      <p className="text-darkblue/70 font-medium">{payload[0].value}</p>
    </div>
  );
}

export function AnalyticsTab({ data }: { data: EventAnalytics }) {
  const { capacity, totalRegistered, totalCheckedIn, jobTitleStats, checkInFlow } =
    data;

  const showUpRate =
    totalRegistered > 0
      ? Math.round((totalCheckedIn / totalRegistered) * 100)
      : 0;

  const fillRate =
    capacity > 0 ? Math.round((totalRegistered / capacity) * 100) : 0;

  // Empty state
  if (totalRegistered === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center text-center py-16 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-darkblue/10 flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-darkblue/30" />
          </div>
          <p className="text-darkblue/40 font-medium">
            Zatím nemáme dostatek dat pro analýzu.
          </p>
          <p className="text-sm text-darkblue/30 font-medium">
            Data se zobrazí po prvních registracích.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Funnel row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="text-center py-6 space-y-1">
            <p className="text-3xl font-bold text-darkblue">{capacity}</p>
            <p className="text-sm text-darkblue/50 font-medium">Kapacita</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6 space-y-1">
            <p className="text-3xl font-bold text-teal">{totalRegistered}</p>
            <p className="text-sm text-darkblue/50 font-medium">
              Registrací{" "}
              <span className="text-teal font-bold">({fillRate} %)</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-6 space-y-1">
            <p className="text-3xl font-bold text-coral">{totalCheckedIn}</p>
            <p className="text-sm text-darkblue/50 font-medium">
              Check-inů{" "}
              <span className="text-coral font-bold">({showUpRate} %)</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job title pie chart */}
        {jobTitleStats.length > 0 && (
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-base font-bold text-darkblue">
                Zastoupení pozic
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobTitleStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                      stroke="none"
                    >
                      {jobTitleStats.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload as { name: string; value: number };
                        return (
                          <div className="bg-surface shadow-card rounded-xl px-4 py-2.5 text-sm">
                            <p className="font-bold text-darkblue">{d.name}</p>
                            <p className="text-darkblue/70 font-medium">
                              {d.value} účastník{d.value === 1 ? "" : d.value < 5 ? "i" : "ů"}
                            </p>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-3">
                {jobTitleStats.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs font-medium text-darkblue/60">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    {item.name} ({item.value})
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Check-in flow bar chart */}
        {checkInFlow.length > 0 && (
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-base font-bold text-darkblue">
                Průběh check-inů
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={checkInFlow}>
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12, fill: "#315771", opacity: 0.5 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#315771", opacity: 0.5 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="count"
                      fill="#409F9C"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
