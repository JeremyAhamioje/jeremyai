import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const pillars = [
  {
    number: '01',
    title: 'Material Science',
    body: 'We do not select materials for prestige. We select them for mechanical truth. Grade 5 titanium because it is stronger than steel at 45% of the weight. NTPT carbon because 600 filament layers at alternating 45° angles create anisotropic strength that no metal can replicate.',
  },
  {
    number: '02',
    title: 'Geometry',
    body: 'The squircle is not a design decision. It is an engineering resolution. A perfect circle creates stress concentrations at the crown and pusher positions. A perfect square creates corner failures under impact. The squircle distributes forces uniformly across the case perimeter.',
  },
  {
    number: '03',
    title: 'Craftsmanship',
    body: 'Each case is machined from a single billet in 23 operations across 11 days. Brushed surfaces are finished by hand with 1200-grit diamond lapping compound. Polished surfaces are brought to optical clarity — zero surface waviness within 0.1μm. This is not jewelry. It is instrument-grade manufacture.',
  },
]

export default function BrandStory() {
  const { ref, isInView } = useScrollReveal(0.05)

  return (
    <section ref={ref} className="py-24 md:py-40 theme-bg-primary relative">
      <div className="section-pad">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="label-text mb-4">— Maison</p>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-none">
              <span className="theme-text-primary">Built on</span>
              <br />
              <em className="not-italic text-orange-surgical">conviction.</em>
              <br />
              <span className="theme-text-muted">Not convention.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center"
          >
            <div>
              <p className="font-body text-base opacity-70 theme-text-primary leading-relaxed mb-6">
                Maison Jeremy was founded on the premise that a watch for architects, designers, and engineers should be built by the same principles they use to build everything else: resolve the structural problem first, then remove everything that does not serve that resolution.
              </p>
              <p className="font-body text-base opacity-70 theme-text-primary leading-relaxed">
                There are no decorative elements in any MJ timepiece. Every surface, every dimension, every material exists because it solves a specific engineering or ergonomic problem. This is not minimalism as aesthetic. It is minimalism as method.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
              className={`py-10 ${i < 2 ? 'md:border-r border-subtle-themed' : ''} ${i > 0 ? 'md:pl-12' : ''} ${
                i < 2 ? 'md:pr-12' : ''
              } border-t border-subtle-themed md:border-t-0`}
            >
              <span className="font-mono text-sm text-orange-surgical mb-6 block">{pillar.number}</span>
              <h3 className="font-display text-2xl theme-text-primary mb-4">{pillar.title}</h3>
              <p className="font-body text-sm theme-text-muted leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-24 md:mt-32 pt-16 border-t border-subtle-themed text-center"
          style={{ transformOrigin: 'left' }}
        >
          <blockquote className="font-display text-3xl md:text-5xl font-light theme-text-primary max-w-4xl mx-auto leading-relaxed">
            "Form follows function — that has been misunderstood. Form and function should be one, joined in a spiritual union."
          </blockquote>
          <p className="font-mono text-[10px] tracking-ultra uppercase theme-text-muted mt-6">
            Frank Lloyd Wright · Architect
          </p>
        </motion.div>
      </div>
    </section>
  )
}
