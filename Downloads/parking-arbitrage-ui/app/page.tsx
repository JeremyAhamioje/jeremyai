'use client'

import { Header } from '@/components/header'
import { MetricsGrid } from '@/components/metrics-grid'
import { PricingChart } from '@/components/pricing-chart'
import { TicketmasterEventsFeed } from '@/components/ticketmaster-events-feed'
import { SignalFeed } from '@/components/signal-feed'
import Link from 'next/link'

export default function Home() {
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

        {/* Discover More Section */}
        <section className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight mb-3">Discover More</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore all the tools and features available in the platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: SpotHero Collector */}
            <Link href="/spothero-data" className="group p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:shadow-lg transition-all">
              <div className="mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                SpotHero Data
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time metrics grid and price trends across all monitored venues
              </p>
            </Link>

            {/* Card 2: Change Detection */}
            <Link href="/alerts" className="group p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:shadow-lg transition-all">
              <div className="mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Change Detection
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                High-profile alerts for price spikes and inventory crunches
              </p>
            </Link>

            {/* Card 3: Venues */}
            <Link href="/venues" className="group p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:shadow-lg transition-all">
              <div className="mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Venues
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Browse all 50 monitored parking venues and their details
              </p>
            </Link>
          </div>

          {/* Explore All Tools */}
          <div className="text-center mt-12">
            <Link href="/explore" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
              Explore All Tools
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
