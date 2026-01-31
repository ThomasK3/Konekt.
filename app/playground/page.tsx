"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Cell } from "@/components/cells/Cell";
import { EventCard } from "@/components/cards/EventCard";
import { useState } from "react";

export default function PlaygroundPage() {
  const [favorited, setFavorited] = useState(false);

  return (
    <main className="min-h-screen p-6 md:p-12 bg-bg-page pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-h1 font-bold text-text-primary mb-2">
            TripGlide Design System
          </h1>
          <p className="text-large text-text-secondary max-w-2xl">
            Image-first, bold dark buttons, minimalist monochrome UI
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Typography */}
          <section>
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
          <section>
            <h2 className="text-h2 font-bold text-text-primary mb-6">
              Color System
            </h2>
            <div className="card">
              <div className="space-y-6">
                {/* Monochrome */}
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
          </section>

          {/* Buttons */}
          <section>
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
          <section>
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
          <section>
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
          <section>
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
          <section>
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

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <a href="#" className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </a>
        <a href="#" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </a>
        <a href="#" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </a>
      </nav>
    </main>
  );
}
