import { motion } from 'framer-motion'
import BrandStory from '../sections/BrandStory'

export default function StoryPage() {
  return (
    <main className="min-h-screen theme-bg-primary">
      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/20 to-obsidian z-10" />
          <img
            src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440071/Gemini_Generated_Image_y43p3my43p3my43p_njirwf.png"
            alt="Maison Jeremy Atelier"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-20 section-pad">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="label-text mb-4">— The Maison</p>
            <h1 className="font-display text-6xl md:text-8xl font-light theme-text-primary">
              Why we build.
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Brand story sections */}
      <BrandStory />

      {/* Founding section */}
      <section className="py-24 theme-bg-secondary section-pad">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-text mb-6">— Founded</p>
            <p className="font-body text-lg opacity-80 theme-text-primary leading-relaxed mb-6">
              Maison Jeremy was founded in Geneva in 2024 by a watchmaker and an architect who believed the watch industry had separated two things that should never have been separated: the intelligence of the instrument and the intelligence of the design.
            </p>
            <p className="font-body text-lg opacity-80 theme-text-primary leading-relaxed mb-6">
              Every watch brand claims to make instruments. Very few make decisions like instrument designers. We manufacture tolerances, not aesthetics. Our tolerances tell you everything about our aesthetics.
            </p>
            <p className="font-body text-lg opacity-80 theme-text-primary leading-relaxed">
              We produce fewer than 200 pieces per year. This is not marketing scarcity. It is production reality. Each watch takes eleven days to machine, fourteen hours to assemble, and six hours to regulate. There is no shortcut and no parallel process. One case, one watchmaker, one watch.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
