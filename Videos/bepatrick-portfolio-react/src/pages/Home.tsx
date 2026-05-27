import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor      from '@/components/ui/Cursor'
import Preloader   from '@/components/ui/Preloader'
import Navbar      from '@/components/ui/Navbar'
import Hero        from '@/components/sections/Hero'
import About       from '@/components/sections/About'
import WorksScroll from '@/components/sections/WorksScroll'
import Tools       from '@/components/sections/Tools'
import Services    from '@/components/sections/Services'
import Affairs     from '@/components/sections/Affairs'
import Footer      from '@/components/sections/Footer'
import { usePageTransition } from '@/hooks/usePageTransition'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const { overlayRef, go } = usePageTransition()
  const bodyRef = useRef<HTMLDivElement>(null)

  // Guard against double-firing the label animation. Even though StrictMode
  // is removed, this ref provides defense-in-depth for any future re-mount.
  const didAnimateLabels = useRef(false)

  /* Fade body in after preloader */
  useEffect(() => {
    if (!preloaderDone || !bodyRef.current) return
    gsap.fromTo(
      bodyRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.55, ease: 'power2.out' }
    )
  }, [preloaderDone])

  /* Animate section labels on scroll — fires once preloader gone */
  useEffect(() => {
    if (!preloaderDone || didAnimateLabels.current) return
    didAnimateLabels.current = true

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.sec-label').forEach(el => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [preloaderDone])

  return (
    <>
      <Cursor />

      <div ref={overlayRef} className="page-overlay" />

      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}

      <div ref={bodyRef} style={{ opacity: 0 }}>
        <Navbar />

        <Hero ready={preloaderDone} />
        <About />
        <WorksScroll onViewAll={() => go('/projects')} />
        <Tools />
        <Services onViewAll={() => go('/services')} />
        <Affairs />
        <Footer />
      </div>
    </>
  )
}
