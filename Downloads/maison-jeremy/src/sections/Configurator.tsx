import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'

const strapOptions = [
  { id: 'rubber-grey', label: 'Grey Rubber', color: '#6B7280' },
  { id: 'rubber-black', label: 'Black Rubber', color: '#1A1A1E' },
  { id: 'leather-black', label: 'Black Leather', color: '#2D1B0E' },
  { id: 'titanium-bracelet', label: 'Titanium Bracelet', color: '#8A8F99' },
]

export default function Configurator() {
  const [selectedModel, setSelectedModel] = useState(0)
  const [selectedStrap, setSelectedStrap] = useState(0)
  const { ref, isInView } = useScrollReveal(0.05)

  const product = products[selectedModel]

  return (
    <section ref={ref} className="py-24 md:py-40 theme-bg-primary relative">
      {/* Background detail */}
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="section-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <p className="label-text mb-4">— Configure</p>
          <h2 className="font-display text-5xl md:text-7xl font-light theme-text-primary">
            Make it yours.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Product preview */}
          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="aspect-square relative rounded-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-arch-mid/60 to-obsidian/80 z-10" />
                <img
                  src={product.images.hero}
                  alt={`${product.name} ${product.subtitle}`}
                  className="w-full h-full object-cover object-center"
                />
                {/* Config overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 glass-panel p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="label-text text-[9px] mb-1">{product.name} · {product.subtitle}</p>
                      <p className="font-mono text-xs theme-text-primary">{strapOptions[selectedStrap].label} Strap</p>
                    </div>
                    <p className="font-display text-xl text-orange-surgical">{product.price}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Config panel */}
          <div className="space-y-12">
            {/* Model selection */}
            <div>
              <p className="label-text mb-6">01 — Select Model</p>
              <div className="grid grid-cols-2 gap-3">
                {products.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedModel(i)}
                    className={`p-4 text-left transition-all duration-400 border ${
                      i === selectedModel
                        ? 'border-orange-surgical bg-orange-surgical/5'
                        : 'border-subtle-themed hover:border-arch-white/30'
                    }`}
                  >
                    <p className="font-mono text-[10px] tracking-ultra uppercase theme-text-muted mb-1">{p.material}</p>
                    <p className="font-display text-xl theme-text-primary">{p.name}</p>
                    <p className={`font-mono text-xs mt-0.5 ${i === selectedModel ? 'text-orange-surgical' : 'theme-text-muted'}`}>
                      {p.subtitle}
                    </p>
                    {p.limitedTo && (
                      <p className="font-mono text-[9px] text-orange-surgical/70 mt-2">
                        Ltd. {p.limitedTo}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Strap selection */}
            <div>
              <p className="label-text mb-6">02 — Select Strap</p>
              <div className="space-y-2">
                {strapOptions.map((strap, i) => (
                  <button
                    key={strap.id}
                    onClick={() => setSelectedStrap(i)}
                    className={`w-full flex items-center gap-4 p-4 text-left transition-all duration-400 border ${
                      i === selectedStrap
                        ? 'border-orange-surgical bg-orange-surgical/5'
                        : 'border-subtle-themed hover:border-mid-themed'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-sm flex-shrink-0 border border-mid-themed"
                      style={{ backgroundColor: strap.color }}
                    />
                    <span className="font-mono text-xs theme-text-primary">{strap.label}</span>
                    {i === selectedStrap && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-orange-surgical"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-subtle-themed pt-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="label-text text-[9px] mb-1">Configuration Total</p>
                  <p className="font-display text-4xl theme-text-primary">{product.price}</p>
                </div>
                <div className="text-right">
                  <p className="label-text text-[9px] mb-1">Delivery</p>
                  <p className="font-mono text-xs theme-text-primary">6–8 Weeks</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full btn-primary justify-center py-5">
                  Request Acquisition
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <button className="w-full btn-ghost justify-center py-5 text-[10px]">
                  Book Atelier Appointment
                </button>
              </div>

              <p className="font-mono text-[9px] theme-text-muted text-center mt-6 leading-relaxed">
                All timepieces are produced to order. A 30% deposit confirms your commission.
                <br />Balance due upon completion and inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
