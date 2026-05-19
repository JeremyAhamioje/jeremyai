import { motion } from 'framer-motion'
import LifestyleGallery from '../sections/LifestyleGallery'

export default function AtelierPage() {
  return (
    <main className="min-h-screen theme-bg-primary">
      <div className="section-pad pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-text mb-4">— Atelier</p>
          <h1 className="font-display text-6xl md:text-8xl font-light theme-text-primary mb-8">
            The Workshop.
          </h1>
          <p className="font-body text-lg theme-text-muted max-w-xl leading-relaxed">
            All MJ timepieces are produced in our Geneva atelier by a team of four watchmakers.
            Private viewings are available by appointment.
          </p>
        </motion.div>
      </div>

      <LifestyleGallery />

      {/* Appointment */}
      <section className="py-24 theme-bg-primary section-pad">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="label-text mb-6">— Book</p>
          <h2 className="font-display text-4xl theme-text-primary mb-8">
            Request a private appointment.
          </h2>
          <p className="font-body text-sm theme-text-muted leading-relaxed mb-10">
            Visit our Geneva atelier to see the MJ-01 in person, meet our watchmakers,
            and begin your commission conversation.
          </p>
          <button className="btn-primary">
            Contact the Atelier
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </motion.div>
      </section>
    </main>
  )
}
