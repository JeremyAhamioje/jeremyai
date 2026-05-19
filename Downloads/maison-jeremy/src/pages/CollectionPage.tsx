import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function CollectionPage() {
  return (
    <main className="min-h-screen theme-bg-primary pt-32 pb-24">
      <div className="section-pad">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="label-text mb-4">— Full Collection</p>
          <h1 className="font-display text-6xl md:text-8xl font-light theme-text-primary">
            MJ-01 Series
          </h1>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="aspect-square relative overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={product.images.hero}
                    alt={`${product.name} ${product.subtitle}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.limitedTo && (
                    <div className="absolute top-5 left-5 z-20 glass-panel px-3 py-1.5">
                      <p className="label-text text-[9px]">Limited — {product.limitedTo}</p>
                    </div>
                  )}
                  <div className="absolute bottom-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-10 h-10 bg-orange-surgical flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="label-text text-[10px] mb-1">{product.material}</p>
                    <p className="font-display text-3xl theme-text-primary">{product.name}</p>
                    <p className="font-display text-2xl italic theme-text-muted">{product.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="label-text text-[9px] mb-1">From</p>
                    <p className="font-display text-xl theme-text-primary">{product.price}</p>
                  </div>
                </div>

                <div className="mt-4 h-px theme-bg-primary/10 group-hover:bg-orange-surgical/40 transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
