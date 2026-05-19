import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden theme-bg-primary grid-lines">
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY, scale: imageScale }}>
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.6), transparent, var(--bg-primary))' }} />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent 60%)' }} />
        <img src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440054/Gemini_Generated_Image_brp0mjbrp0mjbrp0_gxztkh.png" alt="MJ-01 Monolith" className="w-full h-full object-cover object-center" loading="eager" />
      </motion.div>

      <motion.div className="relative z-20 section-pad w-full pt-32" style={{ y: textY, opacity }}>
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-orange-surgical" />
            <span className="label-text">MJ Collection 2024</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="font-display font-light text-6xl md:text-8xl xl:text-9xl leading-none mb-6" style={{ color: 'var(--text-primary)' }}>
            Maison<br /><em className="not-italic text-gradient-orange">Jeremy</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="label-text mb-12">Architecture for the Wrist</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="font-body text-lg max-w-md mb-14 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Where Swiss horology meets Brutalist geometry. Instruments forged for those who build.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }} className="flex flex-wrap gap-4">
            <Link to="/collection" className="btn-primary">Explore Collection <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></Link>
            <Link to="/story" className="btn-ghost">Our Philosophy</Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
        <span className="label-text text-[9px]">Scroll</span>
        <motion.div className="w-px h-12 bg-gradient-to-b from-orange-surgical to-transparent" animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: 'top' }} />
      </motion.div>

      <motion.div className="absolute bottom-10 left-6 md:left-12 z-20 hidden md:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <div className="flex items-center gap-6">
          {[{ label: 'Case', value: 'Grade 5 Ti' }, { label: 'WR', value: '300m' }, { label: 'Power', value: '72h' }].map(spec => (
            <div key={spec.label}>
              <p className="label-text text-[9px]">{spec.label}</p>
              <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-primary)' }}>{spec.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
