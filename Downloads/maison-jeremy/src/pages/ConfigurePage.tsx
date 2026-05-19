import { motion } from 'framer-motion'
import Configurator from '../sections/Configurator'

export default function ConfigurePage() {
  return (
    <main className="min-h-screen theme-bg-primary">
      <div className="pt-24 pb-0 section-pad">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pt-8"
        >
          <p className="label-text mb-4">— Commission</p>
          <h1 className="font-display text-6xl md:text-8xl font-light theme-text-primary">
            Build your instrument.
          </h1>
        </motion.div>
      </div>
      <Configurator />
    </main>
  )
}
