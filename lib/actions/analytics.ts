"use server";

import { createClient } from "@/lib/supabase/server";

export interface JobTitleStat {
  name: string;
  value: number;
}

export interface CheckInTimeBucket {
  time: string;
  count: number;
}

export interface EventAnalytics {
  capacity: number;
  totalRegistered: number;
  totalCheckedIn: number;
  jobTitleStats: JobTitleStat[];
  checkInFlow: CheckInTimeBucket[];
}

export async function getEventAnalytics(
  eventId: string
): Promise<EventAnalytics> {
  const supabase = createClient();

  // Get event capacity
  const { data: event } = await supabase
    .from("events")
    .select("capacity")
    .eq("id", eventId)
    .single();

  const capacity = event?.capacity ?? 0;

  // Get all registrations with profile data
  const { data: registrations } = await supabase
    .from("registrations")
    .select("status, checked_in_at, user:profiles!user_id (job_title)")
    .eq("event_id", eventId)
    .in("status", ["registered", "checked_in"]);

  const regs = registrations ?? [];
  const totalRegistered = regs.length;
  const totalCheckedIn = regs.filter((r) => r.status === "checked_in").length;

  // Job title demographics
  const jobMap = new Map<string, number>();
  for (const r of regs) {
    const user = r.user as unknown as { job_title: string | null } | null;
    const title = user?.job_title || "Neuvedeno";
    jobMap.set(title, (jobMap.get(title) ?? 0) + 1);
  }

  const jobTitleStats: JobTitleStat[] = Array.from(jobMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Check-in flow (30-min buckets)
  const checkedInRegs = regs
    .filter(
      (r) => r.status === "checked_in" && r.checked_in_at
    )
    .map((r) => new Date(r.checked_in_at as string))
    .sort((a, b) => a.getTime() - b.getTime());

  const checkInFlow: CheckInTimeBucket[] = [];

  if (checkedInRegs.length > 0) {
    const bucketMs = 30 * 60 * 1000; // 30 minutes
    const firstTime = checkedInRegs[0].getTime();

    // Round down to nearest 30 min
    const bucketStart = firstTime - (firstTime % bucketMs);

    const lastTime = checkedInRegs[checkedInRegs.length - 1].getTime();
    const bucketEnd = lastTime - (lastTime % bucketMs) + bucketMs;

    for (let t = bucketStart; t < bucketEnd; t += bucketMs) {
      const bucketEndTime = t + bucketMs;
      const count = checkedInRegs.filter(
        (d) => d.getTime() >= t && d.getTime() < bucketEndTime
      ).length;

      const date = new Date(t);
      const label = date.toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
      });

      checkInFlow.push({ time: label, count });
    }
  }

  return {
    capacity,
    totalRegistered,
    totalCheckedIn,
    jobTitleStats,
    checkInFlow,
  };
}
