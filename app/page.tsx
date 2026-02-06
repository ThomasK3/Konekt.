import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-page">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            One platform instead of five.
            <br />
            <span className="text-text-secondary">Event management without fragmentation.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Stop juggling between registration systems, check-in apps, communication tools, and spreadsheets.
            Konekt. brings everything you need to organize successful events into one seamless platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/organizer/dashboard">
              <Button variant="primary">
                Organizer Dashboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary">
                Attendee Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">10K+</div>
              <div className="text-small md:text-base text-text-secondary">Events Organized</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">500K+</div>
              <div className="text-small md:text-base text-text-secondary">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">98%</div>
              <div className="text-small md:text-base text-text-secondary">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">24/7</div>
              <div className="text-small md:text-base text-text-secondary">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Everything you need in one place
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From registration to post-event analytics, Konekt. handles every aspect of event management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="card">
            <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">Event Creation</h3>
            <p className="text-base text-text-secondary">
              Create and customize events in minutes with our intuitive event builder. Add sessions, speakers, and schedules effortlessly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card">
            <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">Registration Management</h3>
            <p className="text-base text-text-secondary">
              Seamless registration experience for attendees. Collect custom data, manage capacity, and send automated confirmations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card">
            <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">Communication Tools</h3>
            <p className="text-base text-text-secondary">
              Keep attendees informed with automated emails, SMS notifications, and in-app messaging. Send updates before, during, and after events.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card">
            <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M7 2v20" />
                <path d="M17 2v20" />
                <path d="M2 12h20" />
                <path d="M2 7h5" />
                <path d="M2 17h5" />
                <path d="M17 17h5" />
                <path d="M17 7h5" />
              </svg>
            </div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">QR Check-in</h3>
            <p className="text-base text-text-secondary">
              Fast and contactless check-in with QR codes. Track attendance in real-time and eliminate long queues at the entrance.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="card">
            <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">Analytics & Insights</h3>
            <p className="text-base text-text-secondary">
              Understand your events with detailed analytics. Track registrations, attendance patterns, and engagement metrics in beautiful visualizations.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="card">
            <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="text-h3 font-semibold text-text-primary mb-2">Venue Management</h3>
            <p className="text-base text-text-secondary">
              Manage multiple venues, rooms, and capacities. Create floor plans, assign sessions, and optimize space utilization.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How Konekt. works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Get your first event up and running in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-text-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-h3 font-semibold text-text-primary mb-2">Create Your Event</h3>
              <p className="text-base text-text-secondary">
                Set up your event details, add sessions, upload materials, and customize the registration form to match your needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-text-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-h3 font-semibold text-text-primary mb-2">Invite Participants</h3>
              <p className="text-base text-text-secondary">
                Share your event page, send invitations via email, and watch registrations roll in. Automated confirmations handle the rest.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-text-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-h3 font-semibold text-text-primary mb-2">Manage & Analyze</h3>
              <p className="text-base text-text-secondary">
                Check attendees in with QR codes, monitor engagement in real-time, and review detailed analytics after your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Trusted by event organizers worldwide
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See what our customers have to say about their experience with Konekt..
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="card">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-text-primary">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-base text-text-secondary mb-4">
              "Konekt. transformed how we manage our monthly meetups. What used to take hours now takes minutes. The check-in feature alone saved us so much time!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-page flex items-center justify-center font-semibold">
                MK
              </div>
              <div>
                <div className="font-semibold text-text-primary">Martin Kovář</div>
                <div className="text-small text-text-secondary">Startup Meetup Prague</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="card">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-text-primary">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-base text-text-secondary mb-4">
              "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions about our events and improve attendance."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-page flex items-center justify-center font-semibold">
                JN
              </div>
              <div>
                <div className="font-semibold text-text-primary">Jana Nováková</div>
                <div className="text-small text-text-secondary">Tech Conference CZ</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="card">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-text-primary">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-base text-text-secondary mb-4">
              "We switched from using 5 different tools to just Konekt.. The cost savings alone were worth it, but the time savings are even better."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-page flex items-center justify-center font-semibold">
                PH
              </div>
              <div>
                <div className="font-semibold text-text-primary">Petr Horák</div>
                <div className="text-small text-text-secondary">Corporate Events Ltd.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-text-primary py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to simplify your event management?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust Konekt. to manage their events.
            Start free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/organizer/dashboard">
              <button className="px-7 py-3.5 bg-white text-text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Organizer Dashboard
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-7 py-3.5 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Attendee Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border-light py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-text-primary">Konekt..</div>
            <div className="flex gap-6 text-small text-text-secondary">
              <Link href="/playground" className="hover:text-text-primary transition-colors">Playground</Link>
              <Link href="/organizer/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
              <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
            </div>
            <div className="text-small text-text-secondary">
              © 2026 Konekt.. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
