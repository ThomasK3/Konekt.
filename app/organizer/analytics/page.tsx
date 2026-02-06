"use client";

import { useState, useEffect } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";
import {
  generateMockAnalyticsEvents,
  getAggregatedAnalytics,
  type AnalyticsEvent,
} from "@/lib/mockAnalyticsData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell as RechartsCell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Tab = "overview" | "funnel" | "marketing" | "engagement" | "trends";

// Data visualization colors matching playground
const dataColors = {
  coral: "#e66467",
  orange: "#f29639",
  darkBlue: "#315771",
  teal: "#409f9c",
};

// Left Sidebar for Analytics
function AnalyticsSidebar({
  activeTab,
  onTabClick,
  isOpen,
  onClose,
}: {
  activeTab: Tab;
  onTabClick: (id: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "funnel", label: "Funnel", icon: "🔄" },
    { id: "marketing", label: "Marketing", icon: "📢" },
    { id: "engagement", label: "Engagement", icon: "👥" },
    { id: "trends", label: "Trends", icon: "📈" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "sidebar-island fixed left-0",
          "top-0 md:top-1/2 md:-translate-y-1/2",
          "h-full md:h-auto md:max-h-[70vh]",
          "w-64 md:w-52 z-50 md:z-10",
          "transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <h2 className="sidebar-title">Analytics</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabClick(tab.id);
                if (window.innerWidth < 768) onClose();
              }}
              className={cn(
                "sidebar-item w-full",
                activeTab === tab.id && "active"
              )}
            >
              <span className="sidebar-item-icon text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default function AnalyticsDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const events = generateMockAnalyticsEvents();
  const aggregated = getAggregatedAnalytics(events);

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-sm border border-border-light flex items-center justify-center"
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="14" y2="14" />
            <line x1="14" y1="4" x2="4" y2="14" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="2" y1="9" x2="16" y2="9" />
            <line x1="2" y1="4" x2="16" y2="4" />
            <line x1="2" y1="14" x2="16" y2="14" />
          </svg>
        )}
      </button>

      {/* Left Sidebar */}
      <AnalyticsSidebar
        activeTab={activeTab}
        onTabClick={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="max-w-6xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-h1 font-bold text-text-primary mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-large text-text-secondary">
              Portfolio performance across {aggregated.totalEvents} events
            </p>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && <OverviewTab events={events} aggregated={aggregated} />}
          {activeTab === "funnel" && <FunnelTab events={events} aggregated={aggregated} />}
          {activeTab === "marketing" && <MarketingTab events={events} aggregated={aggregated} />}
          {activeTab === "engagement" && <EngagementTab events={events} aggregated={aggregated} />}
          {activeTab === "trends" && <TrendsTab events={events} />}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

// ============================================================================
// OVERVIEW TAB
// ============================================================================

function OverviewTab({
  events,
  aggregated,
}: {
  events: AnalyticsEvent[];
  aggregated: ReturnType<typeof getAggregatedAnalytics>;
}) {
  const completedEvents = events.filter((e) => e.status === "completed");
  const avgHealthScore =
    completedEvents.reduce((sum, e) => sum + e.healthScore.overall, 0) /
    completedEvents.length;

  return (
    <div className="space-y-8">
      {/* Health Score Card */}
      <div className="card text-center">
        <p className="text-small text-text-secondary mb-4 uppercase tracking-wide">Portfolio Health Score</p>
        <div className="relative inline-block">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={
                avgHealthScore >= 80
                  ? dataColors.teal
                  : avgHealthScore >= 60
                  ? dataColors.orange
                  : dataColors.coral
              }
              strokeWidth="8"
              strokeDasharray={`${(avgHealthScore / 100) * 283} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-text-primary">
              {avgHealthScore.toFixed(0)}
            </span>
          </div>
        </div>
        <p className="text-small text-text-secondary mt-4">
          {avgHealthScore >= 80
            ? "Excellent Performance"
            : avgHealthScore >= 60
            ? "Good Performance"
            : "Needs Attention"}
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-4xl font-bold mb-2" style={{ color: dataColors.coral }}>
            {aggregated.totalRegistrations.toLocaleString()}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">
            Total Registrations
          </p>
        </div>
        <div className="card text-center">
          <p className="text-4xl font-bold mb-2" style={{ color: dataColors.orange }}>
            {aggregated.avgAttendanceRate.toFixed(0)}%
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">
            Avg Attendance
          </p>
        </div>
        <div className="card text-center">
          <p className="text-4xl font-bold mb-2" style={{ color: dataColors.darkBlue }}>
            {aggregated.avgNPS.toFixed(0)}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">
            Average NPS
          </p>
        </div>
        <div className="card text-center">
          <p className="text-4xl font-bold mb-2" style={{ color: dataColors.teal }}>
            {aggregated.totalCheckedIn.toLocaleString()}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">
            Total Check-ins
          </p>
        </div>
      </div>

      {/* Top Events Table */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">Top Performing Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-small">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 text-text-secondary font-semibold uppercase tracking-wide">Event</th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">
                  Registered
                </th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">
                  Attended
                </th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">Rate</th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">NPS</th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">Health</th>
              </tr>
            </thead>
            <tbody>
              {completedEvents
                .sort((a, b) => b.healthScore.overall - a.healthScore.overall)
                .slice(0, 5)
                .map((event) => (
                  <tr key={event.id} className="border-b border-border-light last:border-0">
                    <td className="py-4 text-text-primary font-medium">{event.name}</td>
                    <td className="text-right text-text-primary font-medium">
                      {event.stats.registered}
                    </td>
                    <td className="text-right text-text-primary font-medium">
                      {event.stats.checkedIn}
                    </td>
                    <td className="text-right text-text-primary font-medium">
                      {event.stats.attendanceRate.toFixed(0)}%
                    </td>
                    <td className="text-right text-text-primary font-medium">{event.feedback.nps}</td>
                    <td className="text-right">
                      <span
                        className={`badge ${
                          event.healthScore.overall >= 80
                            ? "badge-success"
                            : event.healthScore.overall >= 60
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {event.healthScore.overall}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FUNNEL TAB
// ============================================================================

function FunnelTab({
  events,
  aggregated,
}: {
  events: AnalyticsEvent[];
  aggregated: ReturnType<typeof getAggregatedAnalytics>;
}) {
  const completedEvents = events.filter((e) => e.status === "completed");

  // Funnel data
  const funnelData = [
    { stage: "Invited", count: aggregated.totalInvited, percentage: 100 },
    {
      stage: "Clicked",
      count: aggregated.totalLinkClicks,
      percentage: (aggregated.totalLinkClicks / aggregated.totalInvited) * 100,
    },
    {
      stage: "Started Reg.",
      count: aggregated.totalRegistrationStarts,
      percentage: (aggregated.totalRegistrationStarts / aggregated.totalInvited) * 100,
    },
    {
      stage: "Registered",
      count: aggregated.totalRegistrations,
      percentage: (aggregated.totalRegistrations / aggregated.totalInvited) * 100,
    },
    {
      stage: "Checked In",
      count: aggregated.totalCheckedIn,
      percentage: (aggregated.totalCheckedIn / aggregated.totalInvited) * 100,
    },
  ];

  // Registration timeline
  const timelineMap = new Map<string, number>();
  completedEvents.forEach((event) => {
    event.registrationTimeline.forEach((point) => {
      timelineMap.set(point.date, (timelineMap.get(point.date) || 0) + point.count);
    });
  });
  const timelineData = Array.from(timelineMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30);

  return (
    <div className="space-y-8">
      {/* Conversion Rates */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.coral }}>
            {((aggregated.totalLinkClicks / aggregated.totalInvited) * 100).toFixed(1)}%
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Click Rate</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.orange }}>
            {((aggregated.totalRegistrations / aggregated.totalLinkClicks) * 100).toFixed(1)}%
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Reg. Conversion</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.darkBlue }}>
            {aggregated.avgAttendanceRate.toFixed(1)}%
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Show-up Rate</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.teal }}>
            {((aggregated.totalCheckedIn / aggregated.totalInvited) * 100).toFixed(1)}%
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Overall Conv.</p>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">Registration Funnel</h3>
        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={stage.stage}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-small font-semibold text-text-primary">{stage.stage}</span>
                <span className="text-small text-text-secondary">
                  {stage.count.toLocaleString()} ({stage.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-md h-10 relative overflow-hidden">
                <div
                  className="h-full rounded-md transition-all"
                  style={{
                    width: `${stage.percentage}%`,
                    background: `linear-gradient(to right, ${dataColors.coral}, ${dataColors.orange}, ${dataColors.darkBlue}, ${dataColors.teal})`,
                  }}
                />
                {index > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-small font-semibold text-white">
                    {((stage.count / funnelData[index - 1].count) * 100).toFixed(0)}% conversion
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Timeline */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">
          Registration Timeline (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              tickFormatter={(date) => {
                const d = new Date(date);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
            />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dataColors.coral} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={dataColors.orange} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="count"
              stroke={dataColors.coral}
              strokeWidth={3}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ============================================================================
// MARKETING TAB
// ============================================================================

function MarketingTab({
  events,
  aggregated,
}: {
  events: AnalyticsEvent[];
  aggregated: ReturnType<typeof getAggregatedAnalytics>;
}) {
  const completedEvents = events.filter((e) => e.status === "completed");

  // Aggregate channel data
  const channelMap = new Map<string, { registrations: number; cost: number }>();
  completedEvents.forEach((event) => {
    event.channels.forEach((ch) => {
      const existing = channelMap.get(ch.channel) || { registrations: 0, cost: 0 };
      channelMap.set(ch.channel, {
        registrations: existing.registrations + ch.registrations,
        cost: existing.cost + ch.cost,
      });
    });
  });

  const channelData = Array.from(channelMap.entries())
    .map(([channel, data]) => ({
      channel,
      registrations: data.registrations,
      cost: data.cost,
      cpa: data.cost / data.registrations,
    }))
    .sort((a, b) => b.registrations - a.registrations);

  const pieColors = [dataColors.coral, dataColors.orange, dataColors.darkBlue, dataColors.teal, "#9CA3AF", "#6B7280"];

  return (
    <div className="space-y-8">
      {/* Marketing Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.coral }}>
            ${aggregated.totalMarketingSpend.toLocaleString()}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Total Ad Spend</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.orange }}>
            ${aggregated.avgCPA.toFixed(2)}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Avg CPA</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.darkBlue }}>
            {aggregated.totalRegistrations.toLocaleString()}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Total Registrations</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.teal }}>
            {channelData[0]?.channel || "N/A"}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Best Channel</p>
        </div>
      </div>

      {/* Channel Performance Chart */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">
          Registrations by Channel
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={channelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="channel" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dataColors.coral} />
                <stop offset="100%" stopColor={dataColors.orange} />
              </linearGradient>
            </defs>
            <Bar dataKey="registrations" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Channel Distribution Pie */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">Channel Distribution</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ResponsiveContainer width="100%" height={300} className="flex-1">
            <PieChart>
              <Pie
                data={channelData}
                dataKey="registrations"
                nameKey="channel"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.channel}: ${entry.registrations}`}
              >
                {channelData.map((entry, index) => (
                  <RechartsCell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 flex-1">
            {channelData.map((ch, idx) => (
              <div key={ch.channel} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: pieColors[idx % pieColors.length] }}
                />
                <span className="text-small font-medium">{ch.channel}</span>
                <span className="text-small text-text-secondary ml-auto">
                  {ch.registrations} ({((ch.registrations / aggregated.totalRegistrations) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel ROI Table */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">Channel Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-small">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 text-text-secondary font-semibold uppercase tracking-wide">Channel</th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">
                  Registrations
                </th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">Cost</th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">CPA</th>
                <th className="text-right py-3 text-text-secondary font-semibold uppercase tracking-wide">Share</th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((ch) => (
                <tr key={ch.channel} className="border-b border-border-light last:border-0">
                  <td className="py-4 text-text-primary font-medium">{ch.channel}</td>
                  <td className="text-right text-text-primary font-medium">{ch.registrations}</td>
                  <td className="text-right text-text-primary font-medium">${ch.cost.toFixed(0)}</td>
                  <td className="text-right text-text-primary font-medium">${ch.cpa.toFixed(2)}</td>
                  <td className="text-right text-text-primary font-medium">
                    {((ch.registrations / aggregated.totalRegistrations) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ENGAGEMENT TAB
// ============================================================================

function EngagementTab({
  events,
  aggregated,
}: {
  events: AnalyticsEvent[];
  aggregated: ReturnType<typeof getAggregatedAnalytics>;
}) {
  const completedEvents = events.filter((e) => e.status === "completed");

  // Aggregate check-in timeline
  const checkinMap = new Map<string, number>();
  completedEvents.forEach((event) => {
    event.checkinTimeline.forEach((point) => {
      checkinMap.set(point.time, (checkinMap.get(point.time) || 0) + point.count);
    });
  });
  const checkinData = Array.from(checkinMap.entries())
    .map(([time, count]) => ({ time, count }))
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-8">
      {/* Networking Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.coral }}>
            {aggregated.avgProfileViews.toFixed(1)}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Avg Profile Views</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.orange }}>
            {aggregated.totalLinkedInConnections.toLocaleString()}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Total Connections</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.darkBlue }}>
            {aggregated.avgSessionRating.toFixed(1)} / 5
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Avg Session Rating</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.teal }}>
            {aggregated.avgContentRating.toFixed(1)} / 5
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Avg Content Rating</p>
        </div>
      </div>

      {/* Check-in Timeline */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">
          Check-in Pattern (Aggregate)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={checkinData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={dataColors.coral} />
                <stop offset="50%" stopColor={dataColors.orange} />
                <stop offset="100%" stopColor={dataColors.teal} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="count"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: dataColors.teal, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Session Performance */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">
          Top Rated Sessions (From Recent Events)
        </h3>
        <div className="space-y-3">
          {completedEvents
            .slice(0, 3)
            .flatMap((event) =>
              event.sessions.map((session) => ({ ...session, eventName: event.name }))
            )
            .filter((s) => s.rating)
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 5)
            .map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-bg-page rounded-md"
              >
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{session.title}</p>
                  <p className="text-tiny text-text-secondary">{session.eventName}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-text-primary">
                    ⭐ {session.rating?.toFixed(1)}
                  </p>
                  <p className="text-tiny text-text-secondary">
                    {session.attendanceRate.toFixed(0)}% attended
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Feedback Summary */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">Feedback Summary</h3>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-small font-medium">Venue Rating</span>
              <span className="text-small font-bold text-text-primary">
                {aggregated.avgVenueRating.toFixed(1)} / 5
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(aggregated.avgVenueRating / 5) * 100}%`,
                  background: `linear-gradient(90deg, ${dataColors.coral}, ${dataColors.orange})`,
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-small font-medium">Networking Rating</span>
              <span className="text-small font-bold text-text-primary">
                {aggregated.avgNetworkingRating.toFixed(1)} / 5
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(aggregated.avgNetworkingRating / 5) * 100}%`,
                  background: dataColors.teal,
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-small font-medium">Content Rating</span>
              <span className="text-small font-bold text-text-primary">
                {aggregated.avgContentRating.toFixed(1)} / 5
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(aggregated.avgContentRating / 5) * 100}%`,
                  background: `linear-gradient(90deg, ${dataColors.darkBlue}, ${dataColors.teal})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TRENDS TAB
// ============================================================================

function TrendsTab({ events }: { events: AnalyticsEvent[] }) {
  const completedEvents = events
    .filter((e) => e.status === "completed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Attendance trend over time
  const attendanceTrend = completedEvents.map((event) => ({
    name: event.name.substring(0, 20),
    date: event.date,
    rate: event.stats.attendanceRate,
    registered: event.stats.registered,
    checkedIn: event.stats.checkedIn,
  }));

  // NPS trend
  const npsTrend = completedEvents.map((event) => ({
    name: event.name.substring(0, 20),
    date: event.date,
    nps: event.feedback.nps,
  }));

  // Growth metrics
  const firstEvent = completedEvents[0];
  const lastEvent = completedEvents[completedEvents.length - 1];
  const registrationGrowth = firstEvent
    ? ((lastEvent.stats.registered - firstEvent.stats.registered) /
        firstEvent.stats.registered) *
      100
    : 0;
  const npsGrowth = firstEvent
    ? lastEvent.feedback.nps - firstEvent.feedback.nps
    : 0;

  return (
    <div className="space-y-8">
      {/* Growth Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.coral }}>
            {registrationGrowth > 0 ? "+" : ""}
            {registrationGrowth.toFixed(0)}%
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Registration Growth</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.orange }}>
            {npsGrowth > 0 ? "+" : ""}
            {npsGrowth.toFixed(0)}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">NPS Change</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.darkBlue }}>
            {completedEvents.length}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Total Events</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: dataColors.teal }}>
            {(
              completedEvents.reduce((sum, e) => sum + e.stats.registered, 0) /
              completedEvents.length
            ).toFixed(0)}
          </p>
          <p className="text-small text-text-secondary uppercase tracking-wide">Avg Event Size</p>
        </div>
      </div>

      {/* Attendance Trend */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">
          Attendance Rate Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={dataColors.darkBlue}
              strokeWidth={3}
              dot={{ fill: dataColors.darkBlue, r: 5 }}
              name="Attendance Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Registration vs Check-in Trend */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">
          Registration vs Check-in Volume
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <Legend />
            <Bar dataKey="registered" fill={dataColors.coral} name="Registered" radius={[4, 4, 0, 0]} />
            <Bar dataKey="checkedIn" fill={dataColors.teal} name="Checked In" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* NPS Trend */}
      <div className="card">
        <h3 className="text-h3 font-semibold mb-6">NPS Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={npsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} domain={[-100, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="nps"
              stroke={dataColors.orange}
              strokeWidth={3}
              dot={{ fill: dataColors.orange, r: 5 }}
              name="NPS Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
