import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, isInView } = useScrollReveal()

  const active = products[activeIndex]

  return (
    <section ref={ref} className="py-24 md:py-40 theme-bg-primary relative overflow-hidden">
      {/* Section header */}
      <div className="section-pad mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="label-text mb-4">— The Collection</p>
            <h2 className="font-display text-5xl md:text-7xl font-light theme-text-primary">
              Two instruments.<br />
              <em className="not-italic theme-text-muted">One philosophy.</em>
            </h2>
          </div>

          <div className="hidden md:flex gap-2">
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className={`px-5 py-2.5 font-mono text-[10px] tracking-ultra uppercase transition-all duration-400 ${
                  i === activeIndex
                    ? 'bg-orange-surgical text-obsidian'
                    : 'border border-mid-themed theme-text-muted hover:border-arch-white/50'
                }`}
              >
                {p.subtitle}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Product display */}
      <div className="section-pad">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Image */}
          <div className="relative aspect-square max-w-xl mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <div className="relative w-full h-full rounded-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-arch-grey/40 to-transparent z-10" />
                  <img
                    src={active.images.hero}
                    alt={`${active.name} ${active.subtitle}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Edition badge */}
                  {active.limitedTo && (
                    <div className="absolute top-5 left-5 z-20 glass-panel px-3 py-1.5">
                      <p className="label-text text-[9px]">Limited — {active.limitedTo}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Technical crosshair decoration */}
            <div className="absolute top-4 right-4 w-8 h-8 opacity-40 z-20">
              <div className="absolute top-0 left-1/2 w-px h-3 bg-orange-surgical" />
              <div className="absolute bottom-0 left-1/2 w-px h-3 bg-orange-surgical" />
              <div className="absolute left-0 top-1/2 h-px w-3 bg-orange-surgical" />
              <div className="absolute right-0 top-1/2 h-px w-3 bg-orange-surgical" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-orange-surgical rounded-full" />
            </div>
          </div>

          {/* Info */}
          <div className="lg:pl-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="label-text mb-3">{active.material}</p>
                <h3 className="font-display text-4xl md:text-6xl font-light theme-text-primary mb-1">
                  {active.name}
                </h3>
                <p className="font-display text-3xl md:text-5xl italic text-orange-surgical mb-6">
                  {active.subtitle}
                </p>

                <p className="font-body text-sm theme-text-muted leading-relaxed mb-10 max-w-sm">
                  {active.description}
                </p>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
                  {active.specs.slice(0, 6).map(spec => (
                    <div key={spec.label}>
                      <p className="font-mono text-[9px] theme-text-muted uppercase tracking-ultra">{spec.label}</p>
                      <p className="font-mono text-xs theme-text-primary mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center gap-8">
                  <div>
                    <p className="label-text text-[9px] mb-1">Starting from</p>
                    <p className="font-display text-2xl theme-text-primary">{active.price}</p>
                  </div>
                  <Link
                    to={`/product/${active.id}`}
                    className="btn-primary"
                  >
                    View Details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile model selector */}
        <div className="flex md:hidden gap-2 mt-10">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={`flex-1 py-2.5 font-mono text-[10px] tracking-ultra uppercase transition-all duration-400 ${
                i === activeIndex
                  ? 'bg-orange-surgical text-obsidian'
                  : 'border border-mid-themed theme-text-muted'
              }`}
            >
              {p.subtitle}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
