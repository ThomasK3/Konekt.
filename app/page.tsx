'use client'

import Link from 'next/link'

// Warm Community Edition Colors
const warmColors = {
  coral: "#E66467",
  orange: "#F29639",
  darkBlue: "#315771",
  teal: "#409F9C",
};

const gradients = {
  warm: `linear-gradient(135deg, ${warmColors.coral} 0%, ${warmColors.orange} 100%)`,
  cool: `linear-gradient(135deg, ${warmColors.teal} 0%, ${warmColors.darkBlue} 100%)`,
  full: `linear-gradient(90deg, ${warmColors.coral}, ${warmColors.orange}, ${warmColors.darkBlue}, ${warmColors.teal})`,
};

export default function LandingPage() {

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#FAFAFA' }}>
      {/* Floating background blobs */}
      <div
        className="fixed top-20 right-10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: warmColors.coral }}
      />
      <div
        className="fixed bottom-20 left-10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: warmColors.teal }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ background: warmColors.orange }}
      />

      <div className="relative z-10">
        {/* Top Navigation */}
        <nav className="backdrop-blur-md bg-white/80 border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: gradients.full }}>
              Konekt.
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-semibold transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-7 py-3 text-white rounded-[20px] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                style={{ background: gradients.warm }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradients.full }}>
                  One Platform
                </span>
                <br />
                <span className="text-gray-800">Instead of Five</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                Event management without fragmentation.
                No more juggling Eventee, Excel, WhatsApp, Notion, and Zoom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-10 py-5 text-white rounded-[24px] font-bold text-center shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:scale-105 transition-all"
                  style={{ background: gradients.warm }}
                >
                  Get Started Free →
                </Link>
                <Link
                  href="/login"
                  className="px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-800 rounded-[24px] font-bold border-2 border-gray-300 hover:border-gray-400 hover:bg-white text-center transition-all shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              </div>

              {/* Quick Access Demo */}
              <div className="mt-16 pt-8">
                <p className="text-xs text-gray-500 mb-4 font-semibold uppercase tracking-wider">
                  Quick Access (Demo)
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/organizer/dashboard"
                    className="px-6 py-4 bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-gray-200 rounded-[20px] hover:border-gray-400 hover:bg-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    📊 View Organizer Dashboard
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-6 py-4 bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-gray-200 rounded-[20px] hover:border-gray-400 hover:bg-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    🎫 View Attendee Dashboard
                  </Link>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Direct access to demo dashboards. No login required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                The Problem
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Event organizers waste 5+ hours per event coordinating multiple tools.
                Attendees are frustrated by app overload.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🔀',
                  title: 'Tool Chaos',
                  description: 'Managing one event requires 4-5 different tools. Excel, Eventee, WhatsApp, Notion...',
                  gradient: gradients.warm,
                },
                {
                  icon: '💸',
                  title: 'High Costs',
                  description: 'Eventee costs €500/event. Custom apps take 2-3 months and €10K+ to build.',
                  gradient: `linear-gradient(135deg, ${warmColors.orange} 0%, ${warmColors.coral} 100%)`,
                },
                {
                  icon: '📱',
                  title: 'App Overload',
                  description: 'Attendees download a different app for every event. Terrible user experience.',
                  gradient: gradients.cool,
                },
                {
                  icon: '📊',
                  title: 'No Insights',
                  description: 'Data scattered everywhere. No unified view of what\'s working.',
                  gradient: `linear-gradient(135deg, ${warmColors.darkBlue} 0%, ${warmColors.teal} 100%)`,
                },
              ].map((problem, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-[32px] p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
                >
                  <div className="text-5xl mb-4">{problem.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{problem.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
                  <div className="h-1 w-16 rounded-full mt-4" style={{ background: problem.gradient }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution - For Organizers & Attendees */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Built for Both Sides
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Organizers get powerful tools. Attendees get seamless experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* For Organizers */}
              <div className="bg-white/90 backdrop-blur-sm rounded-[32px] p-10 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all">
                <div className="w-16 h-16 rounded-[16px] flex items-center justify-center mb-6 shadow-lg" style={{ background: gradients.warm }}>
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">For Organizers</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Everything you need to run professional events in one place
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    { title: '10-Minute Setup', desc: 'Create event, build program, invite participants', color: warmColors.coral },
                    { title: 'QR Check-in', desc: 'Fast, professional entry experience', color: warmColors.orange },
                    { title: 'Real-time Analytics', desc: 'Event Health Score, registration trends', color: warmColors.darkBlue },
                    { title: 'Export Everything', desc: 'CSV exports for your CRM', color: warmColors.teal },
                  ].map((feature, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-bold text-xl flex-shrink-0" style={{ color: feature.color }}>✓</span>
                      <div>
                        <p className="font-bold text-gray-800 text-base">{feature.title}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="inline-block px-8 py-4 text-white rounded-[20px] font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  style={{ background: gradients.warm }}
                >
                  Start Organizing →
                </Link>
              </div>

              {/* For Attendees */}
              <div className="bg-white/90 backdrop-blur-sm rounded-[32px] p-10 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all">
                <div className="w-16 h-16 rounded-[16px] flex items-center justify-center mb-6 shadow-lg" style={{ background: gradients.cool }}>
                  <span className="text-3xl">🎫</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">For Attendees</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  One app for all events you attend
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    { title: 'Event Discovery', desc: 'Browse upcoming events in one place', color: warmColors.teal },
                    { title: 'One-Tap QR', desc: 'Your check-in code, always ready', color: warmColors.darkBlue },
                    { title: 'Easy Networking', desc: 'See who\'s attending, connect on LinkedIn', color: warmColors.orange },
                    { title: 'All Event Info', desc: 'Program, speakers, location - everything', color: warmColors.coral },
                  ].map((feature, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-bold text-xl flex-shrink-0" style={{ color: feature.color }}>✓</span>
                      <div>
                        <p className="font-bold text-gray-800 text-base">{feature.title}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="inline-block px-8 py-4 text-white rounded-[20px] font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  style={{ background: gradients.cool }}
                >
                  Find Events →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Quantifiable Impact
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '5+ hours', label: 'Saved per event', gradient: gradients.warm },
                { value: '60%', label: 'Cost reduction', gradient: `linear-gradient(135deg, ${warmColors.orange} 0%, ${warmColors.coral} 100%)` },
                { value: '3x faster', label: 'Setup time', gradient: gradients.cool },
                { value: '3x higher', label: 'Networking rate', gradient: `linear-gradient(135deg, ${warmColors.teal} 0%, ${warmColors.darkBlue} 100%)` },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-[32px] p-8 shadow-xl text-center hover:scale-105 transition-all">
                  <div
                    className="text-5xl font-bold mb-3 bg-clip-text text-transparent"
                    style={{ backgroundImage: stat.gradient }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-95"
            style={{ background: gradients.full }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Simplify Your Events?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Join organizers who've ditched the fragmentation.
              Create your first event in 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-10 py-5 bg-white text-gray-800 rounded-[24px] font-bold hover:bg-gray-50 text-center transition-all shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="px-10 py-5 bg-transparent text-white rounded-[24px] font-bold border-2 border-white hover:bg-white/20 text-center transition-all"
              >
                Sign In
              </Link>
            </div>
            <p className="text-sm text-white/80 mt-8">
              No credit card required. Free for events up to 30 people.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: gradients.full }}>
                  Konekt.
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Event management without fragmentation.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-base">Product</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/signup" className="text-white/60 hover:text-white transition-colors">Get Started</Link></li>
                  <li><Link href="/login" className="text-white/60 hover:text-white transition-colors">Sign In</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-base">Resources</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-base">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/60">
              <p>© 2026 Konekt. Built with ❤️ in Czechia.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
