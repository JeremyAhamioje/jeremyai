'use client'

import { Header } from '@/components/header'
import { MetricsGrid } from '@/components/metrics-grid'
import { PricingChart } from '@/components/pricing-chart'
import { TicketmasterEventsFeed } from '@/components/ticketmaster-events-feed'
import { SignalFeed } from '@/components/signal-feed'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-3">
            Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Real-time parking intelligence and event discovery. Spot opportunities instantly.
          </p>
        </div>

        {/* Pricing Monitor */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-6">Pricing Monitor</h2>
          <MetricsGrid />
          <div className="mt-8">
            <h3 className="text-xl font-light mb-6">Price Trends</h3>
            <PricingChart />
          </div>
        </section>

        {/* Signal Feed */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-6">Signal Feed</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">High-profile price spikes and inventory drops. Sorted by severity.</p>
          <SignalFeed />
        </section>

        {/* Ticketmaster Events Feed */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-6">Ticketmaster Events</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Detect new event announcements and on-sale dates automatically</p>
          <TicketmasterEventsFeed />
        </section>
      </div>
    </main>
  )
}
