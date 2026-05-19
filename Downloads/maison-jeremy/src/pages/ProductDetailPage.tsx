import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { products } from '../data/products'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === id) ?? products[0]
  const [activeImage, setActiveImage] = useState<'hero' | 'side' | 'detail' | 'wrist'>('hero')

  const images = Object.entries(product.images).filter(([, src]) => src) as [string, string][]

  return (
    <main className="min-h-screen theme-bg-primary pt-24 pb-24">
      <div className="section-pad">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <Link to="/collection" className="label-text hover:theme-text-primary transition-colors">Collection</Link>
          <span className="theme-text-muted/40">—</span>
          <span className="label-text text-orange-surgical">{product.name} {product.subtitle}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image gallery */}
          <div>
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square relative overflow-hidden mb-4"
            >
              <img
                src={product.images[activeImage]}
                alt={`${product.name} ${product.subtitle}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {images.map(([key, src]) => (
                <button
                  key={key}
                  onClick={() => setActiveImage(key as typeof activeImage)}
                  className={`aspect-square overflow-hidden border transition-all duration-300 ${
                    activeImage === key ? 'border-orange-surgical' : 'border-subtle-themed'
                  }`}
                >
                  <img src={src} alt={key} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="label-text mb-3">{product.material}</p>
              <h1 className="font-display text-5xl md:text-6xl font-light theme-text-primary mb-1">
                {product.name}
              </h1>
              <p className="font-display text-4xl md:text-5xl italic text-orange-surgical mb-8">
                {product.subtitle}
              </p>

              {product.limitedTo && (
                <div className="inline-flex items-center gap-2 border border-orange-surgical/40 px-4 py-2 mb-8">
                  <div className="w-1.5 h-1.5 bg-orange-surgical rounded-full" />
                  <span className="label-text text-[10px] text-orange-surgical">
                    Limited Edition — {product.limitedTo}
                  </span>
                </div>
              )}

              <p className="font-body text-sm theme-text-muted leading-relaxed mb-10 max-w-lg">
                {product.description}
              </p>

              {/* Full specs */}
              <div className="border-t border-subtle-themed pt-8 mb-10">
                <p className="label-text mb-6">Technical Specifications</p>
                <div className="space-y-3">
                  {product.specs.map(spec => (
                    <div key={spec.label} className="flex justify-between items-center py-2 border-b border-arch-white/5">
                      <span className="font-mono text-[10px] tracking-wide uppercase theme-text-muted">{spec.label}</span>
                      <span className="font-mono text-xs theme-text-primary">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <p className="label-text text-[9px] mb-1">Price</p>
                  <p className="font-display text-3xl theme-text-primary">{product.price}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/configure" className="btn-primary w-full justify-center py-5">
                  Configure & Acquire
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <button className="btn-ghost w-full justify-center py-4">
                  Book Private Viewing
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
