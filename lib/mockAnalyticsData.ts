// lib/mockAnalyticsData.ts

export interface AnalyticsEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  status: "draft" | "published" | "completed";

  // Core Stats
  stats: {
    invited: number;
    linkClicks: number;
    registrationStarts: number;
    registered: number;
    checkedIn: number;
    noShows: number;
    attendanceRate: number;
  };

  // Timeline Data (for funnel)
  registrationTimeline: {
    date: string; // ISO date
    count: number; // cumulative registrations
  }[];

  // Check-in Timeline
  checkinTimeline: {
    time: string; // "18:00", "18:15", etc.
    count: number; // cumulative check-ins
  }[];

  // Channel Attribution
  channels: {
    channel: "LinkedIn" | "Email" | "WhatsApp" | "Direct" | "Twitter" | "QR Code";
    registrations: number;
    cost: number;
    cpa: number;
  }[];

  // Demographics
  demographics: {
    companies: { name: string; count: number }[];
    roles: { role: string; count: number }[];
    seniority: { level: string; count: number }[];
  };

  // Networking
  networking: {
    totalProfileViews: number;
    avgProfileViewsPerPerson: number;
    linkedinConnections: number;
    topNetworkers: { name: string; connections: number }[];
  };

  // Session Data
  sessions: {
    title: string;
    attendance: number;
    attendanceRate: number;
    rating?: number;
  }[];

  // Feedback
  feedback: {
    nps: number;
    venueRating: number;
    networkingRating: number;
    contentRating: number;
    likelyToReturn: number; // percentage
  };

  // Health Score
  healthScore: {
    overall: number; // 0-100
    registration: number;
    engagement: number;
    satisfaction: number;
  };
}

// Helper: Get date N days ago
function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

// Helper: Get date N days ahead
function getDateDaysAhead(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

// Helper: Generate registration timeline
function generateRegistrationTimeline(
  total: number,
  daysBeforeEvent: number,
  isOngoing: boolean = false
): { date: string; count: number }[] {
  const timeline: { date: string; count: number }[] = [];

  // Distribution pattern: 40% first 3 days, 30% next week, 20% following, 10% last minute
  const day1 = Math.floor(total * 0.2);
  const day2 = Math.floor(total * 0.15);
  const day3 = Math.floor(total * 0.05);
  const week2 = Math.floor(total * 0.3);
  const week3 = Math.floor(total * 0.2);
  const lastMinute = total - (day1 + day2 + day3 + week2 + week3);

  let cumulative = 0;

  for (let i = daysBeforeEvent; i >= 0; i--) {
    if (i === daysBeforeEvent) cumulative += day1;
    else if (i === daysBeforeEvent - 1) cumulative += day2;
    else if (i === daysBeforeEvent - 2) cumulative += day3;
    else if (i <= daysBeforeEvent - 3 && i > daysBeforeEvent - 10) {
      cumulative += Math.floor(week2 / 7);
    } else if (i <= daysBeforeEvent - 10 && i > daysBeforeEvent - 20) {
      cumulative += Math.floor(week3 / 10);
    } else if (i <= 3) {
      cumulative += Math.floor(lastMinute / 3);
    }

    if (isOngoing && i < 7) {
      // Don't add future registrations for ongoing events
      break;
    }

    timeline.push({
      date: getDateDaysAgo(i),
      count: Math.min(cumulative, total),
    });
  }

  return timeline;
}

// Helper: Generate check-in timeline
function generateCheckinTimeline(
  total: number
): { time: string; count: number }[] {
  const timeline: { time: string; count: number }[] = [];

  // Check-in pattern: slow start, peak at event time, tail off
  const times = [
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
  ];

  const distribution = [0.05, 0.15, 0.35, 0.25, 0.1, 0.05, 0.03, 0.02];

  let cumulative = 0;
  times.forEach((time, idx) => {
    cumulative += Math.floor(total * distribution[idx]);
    timeline.push({
      time,
      count: Math.min(cumulative, total),
    });
  });

  return timeline;
}

// Helper: Generate random companies
function generateRandomCompanies(total: number) {
  return [
    { name: "Startup A", count: Math.floor(total * 0.1) },
    { name: "Tech B", count: Math.floor(total * 0.08) },
    { name: "Corp C", count: Math.floor(total * 0.06) },
    { name: "Others", count: Math.floor(total * 0.76) },
  ];
}

// Helper: Generate random roles
function generateRandomRoles(total: number) {
  return [
    { role: "Founder", count: Math.floor(total * 0.4) },
    { role: "Developer", count: Math.floor(total * 0.3) },
    { role: "Product", count: Math.floor(total * 0.15) },
    { role: "Business", count: Math.floor(total * 0.15) },
  ];
}

// Helper: Generate random seniority
function generateRandomSeniority(total: number) {
  return [
    { level: "C-Level", count: Math.floor(total * 0.25) },
    { level: "Senior", count: Math.floor(total * 0.35) },
    { level: "Mid", count: Math.floor(total * 0.3) },
    { level: "Junior", count: Math.floor(total * 0.1) },
  ];
}

// Helper: Generate historical event
function generateHistoricalEvent(
  config: {
    name: string;
    daysAgo: number;
    registered: number;
    checkedIn: number;
  },
  id: number
): AnalyticsEvent {
  const noShows = config.registered - config.checkedIn;
  const attendanceRate = Math.round(
    (config.checkedIn / config.registered) * 100
  );

  return {
    id: `analytics-${id}`,
    name: config.name,
    date: getDateDaysAgo(config.daysAgo),
    time: "18:00",
    location: "Prague",
    capacity: config.registered + 20,
    status: "completed",

    stats: {
      invited: config.registered * 6,
      linkClicks: Math.floor(config.registered * 2.5),
      registrationStarts: Math.floor(config.registered * 1.2),
      registered: config.registered,
      checkedIn: config.checkedIn,
      noShows,
      attendanceRate,
    },

    registrationTimeline: generateRegistrationTimeline(config.registered, 30),
    checkinTimeline: generateCheckinTimeline(config.checkedIn),

    channels: [
      {
        channel: "LinkedIn",
        registrations: Math.floor(config.registered * 0.45),
        cost: 0,
        cpa: 0,
      },
      {
        channel: "Email",
        registrations: Math.floor(config.registered * 0.3),
        cost: 50,
        cpa: 1.67,
      },
      {
        channel: "WhatsApp",
        registrations: Math.floor(config.registered * 0.15),
        cost: 0,
        cpa: 0,
      },
      {
        channel: "Direct",
        registrations: Math.floor(config.registered * 0.1),
        cost: 0,
        cpa: 0,
      },
    ],

    demographics: {
      companies: generateRandomCompanies(config.registered),
      roles: generateRandomRoles(config.registered),
      seniority: generateRandomSeniority(config.registered),
    },

    networking: {
      totalProfileViews: config.checkedIn * 5,
      avgProfileViewsPerPerson: 5,
      linkedinConnections: Math.floor(config.checkedIn * 1.5),
      topNetworkers: [
        { name: `Person ${id}A`, connections: 12 },
        { name: `Person ${id}B`, connections: 10 },
      ],
    },

    sessions: [
      {
        title: "Main Session",
        attendance: config.checkedIn,
        attendanceRate: 100,
        rating: 4.5,
      },
    ],

    feedback: {
      nps: 35 + Math.random() * 20,
      venueRating: 3.8 + Math.random() * 0.8,
      networkingRating: 4.0 + Math.random() * 0.8,
      contentRating: 4.2 + Math.random() * 0.6,
      likelyToReturn: 75 + Math.random() * 15,
    },

    healthScore: {
      overall: 75 + Math.random() * 15,
      registration: 80 + Math.random() * 15,
      engagement: 70 + Math.random() * 20,
      satisfaction: 75 + Math.random() * 15,
    },
  };
}

// Generate mock events
export function generateMockAnalyticsEvents(): AnalyticsEvent[] {
  const events: AnalyticsEvent[] = [];

  // Event 1: Recent completed event (2 weeks ago)
  events.push({
    id: "analytics-1",
    name: "Startup Meetup Prague - January",
    date: getDateDaysAgo(14),
    time: "18:00",
    location: "Karlin Hall, Prague",
    capacity: 80,
    status: "completed",

    stats: {
      invited: 500,
      linkClicks: 200, // 40% CTR
      registrationStarts: 100, // 50% of clicks
      registered: 85, // 85% completion
      checkedIn: 75, // 88% showed up
      noShows: 10,
      attendanceRate: 88,
    },

    registrationTimeline: generateRegistrationTimeline(85, 14),
    checkinTimeline: generateCheckinTimeline(75),

    channels: [
      { channel: "LinkedIn", registrations: 38, cost: 0, cpa: 0 },
      { channel: "Email", registrations: 25, cost: 50, cpa: 2 },
      { channel: "WhatsApp", registrations: 15, cost: 0, cpa: 0 },
      { channel: "Direct", registrations: 5, cost: 0, cpa: 0 },
      { channel: "Twitter", registrations: 2, cost: 0, cpa: 0 },
    ],

    demographics: {
      companies: [
        { name: "Startup A", count: 8 },
        { name: "Tech Corp B", count: 6 },
        { name: "Founder Labs", count: 5 },
        { name: "Innovation Hub", count: 4 },
        { name: "Digital Agency", count: 3 },
        { name: "Others", count: 59 },
      ],
      roles: [
        { role: "Founder/CEO", count: 34 },
        { role: "Developer", count: 25 },
        { role: "Product Manager", count: 12 },
        { role: "Marketing", count: 8 },
        { role: "Sales", count: 6 },
      ],
      seniority: [
        { level: "C-Level", count: 20 },
        { level: "Senior", count: 30 },
        { level: "Mid", count: 25 },
        { level: "Junior", count: 10 },
      ],
    },

    networking: {
      totalProfileViews: 450,
      avgProfileViewsPerPerson: 6,
      linkedinConnections: 120,
      topNetworkers: [
        { name: "John Smith", connections: 18 },
        { name: "Sarah Johnson", connections: 15 },
        { name: "Mike Davis", connections: 12 },
      ],
    },

    sessions: [
      {
        title: "Keynote: Future of Startups",
        attendance: 72,
        attendanceRate: 96,
        rating: 4.8,
      },
      {
        title: "Workshop: Growth Hacking",
        attendance: 45,
        attendanceRate: 60,
        rating: 4.5,
      },
      {
        title: "Panel: Fundraising in 2026",
        attendance: 60,
        attendanceRate: 80,
        rating: 4.6,
      },
    ],

    feedback: {
      nps: 45,
      venueRating: 4.2,
      networkingRating: 4.5,
      contentRating: 4.6,
      likelyToReturn: 85,
    },

    healthScore: {
      overall: 87,
      registration: 90,
      engagement: 85,
      satisfaction: 88,
    },
  });

  // Event 2: Upcoming event (in 1 week)
  events.push({
    id: "analytics-2",
    name: "Tech Conference 2026",
    date: getDateDaysAhead(7),
    time: "09:00",
    location: "Prague Congress Center",
    capacity: 300,
    status: "published",

    stats: {
      invited: 2000,
      linkClicks: 800,
      registrationStarts: 450,
      registered: 265,
      checkedIn: 0, // Not happened yet
      noShows: 0,
      attendanceRate: 0,
    },

    registrationTimeline: generateRegistrationTimeline(265, 30, true), // ongoing
    checkinTimeline: [], // Future event

    channels: [
      { channel: "LinkedIn", registrations: 120, cost: 200, cpa: 1.67 },
      { channel: "Email", registrations: 80, cost: 150, cpa: 1.88 },
      { channel: "Twitter", registrations: 40, cost: 100, cpa: 2.5 },
      { channel: "Direct", registrations: 15, cost: 0, cpa: 0 },
      { channel: "WhatsApp", registrations: 10, cost: 0, cpa: 0 },
    ],

    demographics: {
      companies: [
        { name: "Tech Giant A", count: 25 },
        { name: "Startup B", count: 20 },
        { name: "Consulting Firm", count: 18 },
        { name: "Scale-up C", count: 15 },
        { name: "Agency D", count: 12 },
        { name: "Others", count: 175 },
      ],
      roles: [
        { role: "Founder/CEO", count: 80 },
        { role: "CTO/VP Eng", count: 60 },
        { role: "Developer", count: 70 },
        { role: "Product", count: 30 },
        { role: "Business", count: 25 },
      ],
      seniority: [
        { level: "C-Level", count: 90 },
        { level: "Senior", count: 100 },
        { level: "Mid", count: 55 },
        { level: "Junior", count: 20 },
      ],
    },

    networking: {
      totalProfileViews: 0, // Event not happened
      avgProfileViewsPerPerson: 0,
      linkedinConnections: 0,
      topNetworkers: [],
    },

    sessions: [
      {
        title: "Keynote: AI Revolution",
        attendance: 0,
        attendanceRate: 0,
      },
      {
        title: "Track A: Infrastructure",
        attendance: 0,
        attendanceRate: 0,
      },
      { title: "Track B: Product", attendance: 0, attendanceRate: 0 },
    ],

    feedback: {
      nps: 0,
      venueRating: 0,
      networkingRating: 0,
      contentRating: 0,
      likelyToReturn: 0,
    },

    healthScore: {
      overall: 82,
      registration: 85,
      engagement: 78,
      satisfaction: 0, // No feedback yet
    },
  });

  // Event 3-10: Historical events (generate with variations)
  const historicalEvents = [
    {
      name: "Startup Meetup Prague - December",
      daysAgo: 44,
      registered: 70,
      checkedIn: 62,
    },
    {
      name: "Product Manager Meetup",
      daysAgo: 60,
      registered: 50,
      checkedIn: 45,
    },
    {
      name: "Developer Conference",
      daysAgo: 90,
      registered: 150,
      checkedIn: 135,
    },
    {
      name: "Marketing Meetup",
      daysAgo: 105,
      registered: 40,
      checkedIn: 38,
    },
    { name: "Founder Dinner", daysAgo: 120, registered: 30, checkedIn: 28 },
    {
      name: "Tech Talks November",
      daysAgo: 135,
      registered: 80,
      checkedIn: 72,
    },
    {
      name: "AI & ML Workshop",
      daysAgo: 150,
      registered: 60,
      checkedIn: 55,
    },
    {
      name: "Startup Meetup - October",
      daysAgo: 165,
      registered: 75,
      checkedIn: 68,
    },
  ];

  historicalEvents.forEach((evt, idx) => {
    events.push(generateHistoricalEvent(evt, idx + 3));
  });

  return events;
}

// Aggregated Analytics Interface
export interface AggregatedAnalytics {
  totalEvents: number;
  totalAttendees: number;
  avgAttendanceRate: number;
  totalNetworkingConnections: number;
  avgNPS: number;

  // Funnel metrics
  totalInvited: number;
  totalLinkClicks: number;
  totalRegistrationStarts: number;
  totalRegistrations: number;
  totalCheckedIn: number;

  // Marketing metrics
  totalMarketingSpend: number;
  avgCPA: number;

  // Engagement metrics
  avgProfileViews: number;
  totalLinkedInConnections: number;
  avgSessionRating: number;
  avgContentRating: number;
  avgVenueRating: number;
  avgNetworkingRating: number;

  growthMetrics: {
    registrationGrowth: number; // % change vs previous period
    attendanceGrowth: number;
    npsGrowth: number;
  };

  channelPerformance: {
    channel: string;
    totalRegistrations: number;
    avgCPA: number;
    conversionRate: number;
  }[];

  topPerformingEvents: {
    id: string;
    name: string;
    healthScore: number;
    attendees: number;
  }[];
}

// Get aggregated analytics
export function getAggregatedAnalytics(
  events: AnalyticsEvent[]
): AggregatedAnalytics {
  const completedEvents = events.filter((e) => e.status === "completed");

  // Funnel metrics
  const totalInvited = completedEvents.reduce(
    (sum, e) => sum + e.stats.invited,
    0
  );
  const totalLinkClicks = completedEvents.reduce(
    (sum, e) => sum + e.stats.linkClicks,
    0
  );
  const totalRegistrationStarts = completedEvents.reduce(
    (sum, e) => sum + e.stats.registrationStarts,
    0
  );
  const totalRegistrations = completedEvents.reduce(
    (sum, e) => sum + e.stats.registered,
    0
  );
  const totalCheckedIn = completedEvents.reduce(
    (sum, e) => sum + e.stats.checkedIn,
    0
  );

  const avgAttendanceRate =
    completedEvents.length > 0
      ? completedEvents.reduce((sum, e) => sum + e.stats.attendanceRate, 0) /
        completedEvents.length
      : 0;

  const avgNPS =
    completedEvents.length > 0
      ? completedEvents.reduce((sum, e) => sum + e.feedback.nps, 0) /
        completedEvents.length
      : 0;

  // Marketing metrics
  const channelMap = new Map<string, { regs: number; cost: number }>();
  completedEvents.forEach((event) => {
    event.channels.forEach((ch) => {
      const existing = channelMap.get(ch.channel) || { regs: 0, cost: 0 };
      channelMap.set(ch.channel, {
        regs: existing.regs + ch.registrations,
        cost: existing.cost + ch.cost,
      });
    });
  });

  const totalMarketingSpend = Array.from(channelMap.values()).reduce(
    (sum, ch) => sum + ch.cost,
    0
  );
  const avgCPA =
    totalRegistrations > 0 ? totalMarketingSpend / totalRegistrations : 0;

  const channelPerformance = Array.from(channelMap.entries()).map(
    ([channel, data]) => ({
      channel,
      totalRegistrations: data.regs,
      avgCPA: data.regs > 0 ? data.cost / data.regs : 0,
      conversionRate: 0,
    })
  );

  // Engagement metrics
  const totalProfileViews = completedEvents.reduce(
    (sum, e) => sum + e.networking.totalProfileViews,
    0
  );
  const avgProfileViews =
    totalCheckedIn > 0 ? totalProfileViews / totalCheckedIn : 0;

  const totalLinkedInConnections = completedEvents.reduce(
    (sum, e) => sum + e.networking.linkedinConnections,
    0
  );

  // Calculate average ratings from sessions and feedback
  const sessionsWithRatings = completedEvents.flatMap((e) =>
    e.sessions.filter((s) => s.rating)
  );
  const avgSessionRating =
    sessionsWithRatings.length > 0
      ? sessionsWithRatings.reduce((sum, s) => sum + (s.rating || 0), 0) /
        sessionsWithRatings.length
      : 0;

  const avgContentRating =
    completedEvents.length > 0
      ? completedEvents.reduce((sum, e) => sum + e.feedback.contentRating, 0) /
        completedEvents.length
      : 0;

  const avgVenueRating =
    completedEvents.length > 0
      ? completedEvents.reduce((sum, e) => sum + e.feedback.venueRating, 0) /
        completedEvents.length
      : 0;

  const avgNetworkingRating =
    completedEvents.length > 0
      ? completedEvents.reduce(
          (sum, e) => sum + e.feedback.networkingRating,
          0
        ) / completedEvents.length
      : 0;

  // Top events
  const topPerformingEvents = [...events]
    .sort((a, b) => b.healthScore.overall - a.healthScore.overall)
    .slice(0, 5)
    .map((e) => ({
      id: e.id,
      name: e.name,
      healthScore: e.healthScore.overall,
      attendees: e.stats.checkedIn,
    }));

  return {
    totalEvents: events.length,
    totalAttendees: totalCheckedIn,
    avgAttendanceRate: Math.round(avgAttendanceRate),
    totalNetworkingConnections: totalLinkedInConnections,
    avgNPS: Math.round(avgNPS),

    // Funnel
    totalInvited,
    totalLinkClicks,
    totalRegistrationStarts,
    totalRegistrations,
    totalCheckedIn,

    // Marketing
    totalMarketingSpend,
    avgCPA,

    // Engagement
    avgProfileViews,
    totalLinkedInConnections,
    avgSessionRating,
    avgContentRating,
    avgVenueRating,
    avgNetworkingRating,

    growthMetrics: {
      registrationGrowth: 15,
      attendanceGrowth: 8,
      npsGrowth: 5,
    },

    channelPerformance,
    topPerformingEvents,
  };
}
