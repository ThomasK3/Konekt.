"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Cell } from "@/components/cells/Cell";
import { EventCard } from "@/components/cards/EventCard";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";

// Data colors for charts and visualizations
const dataColors = {
  coral: "#e66467",
  orange: "#f29639",
  darkBlue: "#315771",
  teal: "#409f9c",
};

// Sample data for charts
const eventData = [
  { month: "Jan", registrations: 45, checkIns: 42 },
  { month: "Feb", registrations: 67, checkIns: 61 },
  { month: "Mar", registrations: 89, checkIns: 85 },
  { month: "Apr", registrations: 120, checkIns: 110 },
  { month: "May", registrations: 98, checkIns: 92 },
  { month: "Jun", registrations: 145, checkIns: 138 },
];

const attendanceByType = [
  { type: "Conferences", value: 35, color: dataColors.coral },
  { type: "Workshops", value: 25, color: dataColors.orange },
  { type: "Meetups", value: 30, color: dataColors.darkBlue },
  { type: "Networking", value: 10, color: dataColors.teal },
];

// Bar Chart Component with Gradient
function BarChart({ data }: { data: typeof eventData }) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.registrations, d.checkIns)));

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-4 text-small">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: dataColors.coral }} />
          <span>Registrations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: dataColors.darkBlue }} />
          <span>Check-ins</span>
        </div>
      </div>

      <div className="relative" style={{ height: '280px' }}>
        <div className="absolute inset-0 flex items-end justify-between gap-3">
          {data.map((item, index) => {
            const regHeight = (item.registrations / maxValue) * 240;
            const checkInHeight = (item.checkIns / maxValue) * 240;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1.5" style={{ height: '240px' }}>
                  <div
                    className="w-full rounded-t-md transition-all hover:opacity-80 cursor-pointer"
                    style={{
                      height: `${regHeight}px`,
                      background: `linear-gradient(180deg, ${dataColors.coral}, ${dataColors.orange})`,
                    }}
                    title={`${item.registrations} registrations`}
                  />
                  <div
                    className="w-full rounded-t-md transition-all hover:opacity-80 cursor-pointer"
                    style={{
                      height: `${checkInHeight}px`,
                      background: `linear-gradient(180deg, ${dataColors.darkBlue}, ${dataColors.teal})`,
                    }}
                    title={`${item.checkIns} check-ins`}
                  />
                </div>
                <span className="text-small text-text-secondary font-medium mt-2">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Line Chart Component with Gradient "Worm" Style
function LineChart({ data }: { data: typeof eventData }) {
  const maxValue = Math.max(...data.map((d) => d.registrations));
  const width = 600;
  const height = 240;
  const padding = 40;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((item.registrations / maxValue) * (height - padding * 2));
    return { x, y, value: item.registrations };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Create area path for fill under the line
  const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        {/* Gradient for the line stroke */}
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={dataColors.coral} />
          <stop offset="33%" stopColor={dataColors.orange} />
          <stop offset="66%" stopColor={dataColors.darkBlue} />
          <stop offset="100%" stopColor={dataColors.teal} />
        </linearGradient>

        {/* Gradient for the area fill */}
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={dataColors.teal} stopOpacity="0.2" />
          <stop offset="100%" stopColor={dataColors.teal} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((percent) => {
        const y = height - padding - ((percent / 100) * (height - padding * 2));
        return (
          <line
            key={percent}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        );
      })}

      {/* Area fill under the line */}
      <path
        d={areaPath}
        fill="url(#areaGradient)"
      />

      {/* Thick line with gradient (the "worm") */}
      <path
        d={pathData}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Points with gradient border */}
      {points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="8"
            fill="white"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            className="cursor-pointer transition-all"
          />
          <text
            x={point.x}
            y={height - 15}
            textAnchor="middle"
            className="text-xs fill-text-secondary font-medium"
          >
            {data[index].month}
          </text>
          {/* Value labels above points */}
          <text
            x={point.x}
            y={point.y - 15}
            textAnchor="middle"
            className="text-xs fill-text-primary font-semibold"
          >
            {point.value}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Donut Chart Component
function DonutChart({ data }: { data: typeof attendanceByType }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const size = 200;
  const strokeWidth = 40;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentAngle = -90;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <svg width={size} height={size} className="flex-shrink-0">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const dashArray = (percentage / 100) * circumference;
          const dashOffset = -currentAngle * (circumference / 360);

          currentAngle += (percentage / 100) * 360;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArray} ${circumference}`}
              strokeDashoffset={dashOffset}
              transform={`rotate(0 ${size / 2} ${size / 2})`}
              className="transition-all hover:opacity-80 cursor-pointer"
            />
          );
        })}

        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-3xl font-bold fill-text-primary"
        >
          {total}
        </text>
        <text
          x={size / 2}
          y={size / 2 + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-text-secondary"
        >
          Events
        </text>
      </svg>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-small font-medium">{item.type}</span>
            <span className="text-small text-text-secondary ml-auto">
              {item.value} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-small">
        <span className="font-medium">{label}</span>
        <span className="text-text-secondary">{value} / {max}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// Separate Left Sidebar for Playground
function PlaygroundSidebar({ activeSection, onSectionClick, isOpen, onClose }: {
  activeSection: string;
  onSectionClick: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const sections = [
    { id: "typography", label: "Typography", icon: "T" },
    { id: "colors", label: "Colors", icon: "🎨" },
    { id: "data-viz", label: "Data Visualization", icon: "📊" },
    { id: "buttons", label: "Buttons", icon: "⬜" },
    { id: "badges", label: "Badges", icon: "🏷️" },
    { id: "event-cards", label: "Event Cards", icon: "🖼️" },
    { id: "simple-cards", label: "Simple Cards", icon: "📄" },
    { id: "inputs", label: "Inputs", icon: "📝" },
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
        {/* Sidebar Title */}
        <h2 className="sidebar-title">Components</h2>

        {/* Sidebar Items */}
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onSectionClick(section.id);
                if (window.innerWidth < 768) onClose();
              }}
              className={cn(
                "sidebar-item w-full",
                activeSection === section.id && "active"
              )}
            >
              <span className="sidebar-item-icon text-base">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default function PlaygroundPage() {
  const [favorited, setFavorited] = useState(false);
  const [activeSection, setActiveSection] = useState("typography");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  // Scroll to section
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const sectionIds = ["typography", "colors", "data-viz", "buttons", "badges", "event-cards", "simple-cards", "inputs"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: [0, 0.3, 0.5, 0.7, 1],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      {/* Mobile Menu Button - Right Side */}
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
      <PlaygroundSidebar
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="max-w-6xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-h1 font-bold text-text-primary mb-2">
              TripGlide Design System
            </h1>
            <p className="text-large text-text-secondary max-w-2xl">
              Image-first, bold dark buttons, minimalist monochrome UI + quality data visualization
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Typography */}
            <section id="typography">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Typography
              </h2>
              <div className="card space-y-4">
                <div>
                  <h1 className="text-display font-bold">Display - 48px Bold</h1>
                </div>
                <div>
                  <h1 className="text-h1 font-bold">Heading 1 - 32px Bold</h1>
                </div>
                <div>
                  <h2 className="text-h2 font-bold">Heading 2 - 28px Bold</h2>
                </div>
                <div>
                  <h3 className="text-h3 font-semibold">Heading 3 - 22px Semibold</h3>
                </div>
                <div>
                  <h4 className="text-h4 font-semibold">Heading 4 - 18px Semibold</h4>
                </div>
                <div>
                  <p className="text-large">Large - 17px Regular</p>
                </div>
                <div>
                  <p className="text-base">Body - 16px Regular</p>
                </div>
                <div>
                  <p className="text-small text-text-secondary">Small - 14px Regular</p>
                </div>
                <div>
                  <p className="text-tiny text-text-tertiary">Caption - 12px</p>
                </div>
              </div>
            </section>

            {/* Colors */}
            <section id="colors">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Color System
              </h2>
              <div className="space-y-6">
                {/* Monochrome */}
                <div className="card">
                  <div className="space-y-6">
                    <div>
                      <p className="text-small font-medium text-text-secondary mb-3 uppercase tracking-wide">
                        Monochrome Base
                      </p>
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-md bg-text-primary" />
                          <span className="text-tiny text-text-secondary">#212529</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-md bg-white border-2 border-border-light" />
                          <span className="text-tiny text-text-secondary">#FFFFFF</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-md bg-bg-page" />
                          <span className="text-tiny text-text-secondary">#F5F6F7</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Colors */}
                    <div>
                      <p className="text-small font-medium text-text-secondary mb-3 uppercase tracking-wide">
                        Status Colors (Badges Only)
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-md bg-status-success" />
                          <span className="text-tiny text-text-secondary">Success</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-md bg-status-warning" />
                          <span className="text-tiny text-text-secondary">Warning</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-md bg-status-info" />
                          <span className="text-tiny text-text-secondary">Info</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-md bg-status-error" />
                          <span className="text-tiny text-text-secondary">Error</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Visualization Colors */}
                <div className="card">
                  <div>
                    <p className="text-small font-medium text-text-secondary mb-3 uppercase tracking-wide">
                      Data Visualization Colors
                    </p>
                    <p className="text-small text-text-secondary mb-4">
                      Specially designed for charts, graphs, and data-rich interfaces
                    </p>
                    <div className="flex gap-3 flex-wrap mb-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-md" style={{ backgroundColor: dataColors.coral }} />
                        <span className="text-tiny font-medium text-text-primary">Coral</span>
                        <span className="text-tiny text-text-secondary">#e66467</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-md" style={{ backgroundColor: dataColors.orange }} />
                        <span className="text-tiny font-medium text-text-primary">Orange</span>
                        <span className="text-tiny text-text-secondary">#f29639</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-md" style={{ backgroundColor: dataColors.darkBlue }} />
                        <span className="text-tiny font-medium text-text-primary">Dark Blue</span>
                        <span className="text-tiny text-text-secondary">#315771</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-md" style={{ backgroundColor: dataColors.teal }} />
                        <span className="text-tiny font-medium text-text-primary">Teal</span>
                        <span className="text-tiny text-text-secondary">#409f9c</span>
                      </div>
                    </div>

                    {/* Linear Gradients */}
                    <div className="border-t border-border-light pt-6">
                      <p className="text-small font-medium text-text-secondary mb-3 uppercase tracking-wide">
                        Color Gradients
                      </p>
                      <div className="space-y-3">
                        {/* All colors gradient */}
                        <div>
                          <div
                            className="h-20 rounded-md"
                            style={{
                              background: `linear-gradient(90deg, ${dataColors.coral}, ${dataColors.orange}, ${dataColors.darkBlue}, ${dataColors.teal})`
                            }}
                          />
                          <p className="text-tiny text-text-secondary mt-2">Full spectrum (Coral → Orange → Dark Blue → Teal)</p>
                        </div>

                        {/* Warm gradient */}
                        <div>
                          <div
                            className="h-16 rounded-md"
                            style={{
                              background: `linear-gradient(90deg, ${dataColors.coral}, ${dataColors.orange})`
                            }}
                          />
                          <p className="text-tiny text-text-secondary mt-2">Warm gradient (Coral → Orange)</p>
                        </div>

                        {/* Cool gradient */}
                        <div>
                          <div
                            className="h-16 rounded-md"
                            style={{
                              background: `linear-gradient(90deg, ${dataColors.darkBlue}, ${dataColors.teal})`
                            }}
                          />
                          <p className="text-tiny text-text-secondary mt-2">Cool gradient (Dark Blue → Teal)</p>
                        </div>

                        {/* Diagonal gradient */}
                        <div>
                          <div
                            className="h-16 rounded-md"
                            style={{
                              background: `linear-gradient(135deg, ${dataColors.coral}, ${dataColors.teal})`
                            }}
                          />
                          <p className="text-tiny text-text-secondary mt-2">Diagonal gradient (Coral → Teal)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Visualization */}
            <section id="data-viz">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Data Visualization
              </h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="card text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: dataColors.coral }}>
                    564
                  </div>
                  <div className="text-small text-text-secondary uppercase tracking-wide">
                    Total Events
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: dataColors.orange }}>
                    12.4K
                  </div>
                  <div className="text-small text-text-secondary uppercase tracking-wide">
                    Participants
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: dataColors.darkBlue }}>
                    94%
                  </div>
                  <div className="text-small text-text-secondary uppercase tracking-wide">
                    Check-in Rate
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: dataColors.teal }}>
                    4.8
                  </div>
                  <div className="text-small text-text-secondary uppercase tracking-wide">
                    Avg Rating
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="card mb-8">
                <h3 className="text-h3 font-semibold mb-6">
                  Monthly Event Performance
                </h3>
                <BarChart data={eventData} />
              </div>

              {/* Line Chart */}
              <div className="card mb-8">
                <h3 className="text-h3 font-semibold mb-6">
                  Registration Trend
                </h3>
                <LineChart data={eventData} />
              </div>

              {/* Donut Chart */}
              <div className="card mb-8">
                <h3 className="text-h3 font-semibold mb-6">
                  Event Distribution by Type
                </h3>
                <DonutChart data={attendanceByType} />
              </div>

              {/* Progress Bars */}
              <div className="card">
                <h3 className="text-h3 font-semibold mb-6">
                  Capacity Tracking
                </h3>
                <div className="space-y-4">
                  <ProgressBar label="Conference Hall A" value={120} max={150} color={dataColors.coral} />
                  <ProgressBar label="Workshop Room B" value={45} max={50} color={dataColors.orange} />
                  <ProgressBar label="Networking Area" value={67} max={100} color={dataColors.darkBlue} />
                  <ProgressBar label="Exhibition Space" value={230} max={300} color={dataColors.teal} />
                </div>
              </div>

              {/* Gradient Progress Bars */}
              <div className="card">
                <h3 className="text-h3 font-semibold mb-6">
                  Gradient Progress Indicators
                </h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-small">
                      <span className="font-medium">Event Registration Goal</span>
                      <span className="text-text-secondary">145 / 200</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: '72.5%',
                          background: `linear-gradient(90deg, ${dataColors.coral}, ${dataColors.orange})`
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-small">
                      <span className="font-medium">Speaker Confirmations</span>
                      <span className="text-text-secondary">18 / 25</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: '72%',
                          background: `linear-gradient(90deg, ${dataColors.darkBlue}, ${dataColors.teal})`
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-small">
                      <span className="font-medium">Venue Setup Progress</span>
                      <span className="text-text-secondary">88%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: '88%',
                          background: `linear-gradient(90deg, ${dataColors.coral}, ${dataColors.orange}, ${dataColors.darkBlue}, ${dataColors.teal})`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <section id="buttons">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Buttons
              </h2>
              <div className="card">
                <div className="space-y-6">
                  {/* Variants */}
                  <div>
                    <p className="text-small text-text-secondary mb-3">Variants</p>
                    <div className="flex gap-3 flex-wrap">
                      <Button variant="primary">Primary (Dark)</Button>
                      <Button variant="secondary">Secondary (Outlined)</Button>
                      <Button variant="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-small text-text-secondary mb-3">Sizes</p>
                    <div className="flex gap-3 items-center flex-wrap">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>

                  {/* With Icons */}
                  <div>
                    <p className="text-small text-text-secondary mb-3">With Icons</p>
                    <div className="flex gap-3 flex-wrap">
                      <Button variant="primary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 5v10M5 10h10" />
                        </svg>
                        Create Event
                      </Button>
                      <Button variant="secondary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="10" cy="10" r="8" />
                          <path d="M10 6v4l3 2" />
                        </svg>
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Badges */}
            <section id="badges">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Status Badges
              </h2>
              <div className="card">
                <div className="flex gap-3 flex-wrap">
                  <span className="badge badge-success">Confirmed</span>
                  <span className="badge badge-warning">Pending</span>
                  <span className="badge badge-info">Info</span>
                  <span className="badge badge-error">Cancelled</span>
                  <span className="badge badge-subtle">Draft</span>
                </div>
              </div>
            </section>

            {/* Event Cards */}
            <section id="event-cards">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Event Cards (Image-First)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <EventCard
                  title="Startup Meetup Prague"
                  subtitle="📅 March 15, 2026 • ⏰ 18:00"
                  imageSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
                  imageAlt="Startup meetup event"
                  onFavorite={() => setFavorited(!favorited)}
                  isFavorited={favorited}
                  meta={
                    <div className="flex gap-4 text-small text-text-secondary">
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 14c0-2.21-2.686-4-6-4s-6 1.79-6 4M10 4a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        50 registered
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 14s-6-4.477-6-8a6 6 0 0112 0c0 3.523-6 8-6 8z" />
                        </svg>
                        Karlin Hall
                      </span>
                    </div>
                  }
                />

                <EventCard
                  title="Tech Conference 2026"
                  subtitle="📅 April 20-22 • ⏰ 09:00"
                  imageSrc="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop"
                  imageAlt="Tech conference"
                  meta={
                    <div className="flex gap-4 text-small text-text-secondary">
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 14c0-2.21-2.686-4-6-4s-6 1.79-6 4M10 4a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        200 registered
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 14s-6-4.477-6-8a6 6 0 0112 0c0 3.523-6 8-6 8z" />
                        </svg>
                        Prague Congress
                      </span>
                    </div>
                  }
                />

                <EventCard
                  title="Networking Evening"
                  subtitle="📅 May 10 • ⏰ 19:30"
                  imageSrc="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop"
                  imageAlt="Networking event"
                  meta={
                    <div className="flex gap-4 text-small text-text-secondary">
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 14c0-2.21-2.686-4-6-4s-6 1.79-6 4M10 4a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        35 registered
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 14s-6-4.477-6-8a6 6 0 0112 0c0 3.523-6 8-6 8z" />
                        </svg>
                        Café Imperial
                      </span>
                    </div>
                  }
                />
              </div>
            </section>

            {/* Simple Cards */}
            <section id="simple-cards">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Simple Cards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Cell
                  title="Event Information"
                  subtitle="Basic event details and settings"
                  icon={<span className="text-2xl">📅</span>}
                  actions={<Button size="sm" variant="secondary">Edit</Button>}
                  hover
                >
                  <p>
                    Minimalist white card with subtle shadow. Clean layout focused on content and readability.
                  </p>
                </Cell>

                <Cell
                  title="Participants"
                  subtitle="Attendee management"
                  icon={<span className="text-2xl">👥</span>}
                  footer={
                    <div className="flex justify-between items-center">
                      <span className="text-small text-text-secondary">47 registered</span>
                      <Button size="sm" variant="secondary">View All</Button>
                    </div>
                  }
                  hover
                >
                  <p>
                    Manage attendees, send invitations, and facilitate networking opportunities.
                  </p>
                </Cell>
              </div>
            </section>

            {/* Inputs */}
            <section id="inputs">
              <h2 className="text-h2 font-bold text-text-primary mb-6">
                Input Fields
              </h2>
              <div className="card max-w-md">
                <div className="space-y-4">
                  <Input label="Event Name" placeholder="Enter event name" required />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    helperText="We'll never share your email"
                  />
                  <Textarea
                    label="Event Description"
                    placeholder="Describe your event..."
                    maxLength={500}
                    showCharCount
                    rows={4}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeItem={activeNav}
        onItemClick={setActiveNav}
      />
    </div>
  );
}
