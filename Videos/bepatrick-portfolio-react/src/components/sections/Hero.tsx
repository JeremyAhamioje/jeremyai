import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { HERO_VIDEO_URL, MONTHS, SITE_NAME } from '@/lib/constants'

interface Props { ready: boolean }

export default function Hero({ ready }: Props) {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const textsRef  = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const now   = new Date()
  const day   = now.getDate()
  const month = MONTHS[now.getMonth()]

  /* ── Bulletproof native loop video ── */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const startPlayback = () => {
      video.play().catch(() => {
        setTimeout(() => video.play().catch(() => {}), 400)
      })
    }

    const onVisibility = () => {
      if (!document.hidden && video.paused) video.play().catch(() => {})
    }

    document.addEventListener('visibilitychange', onVisibility)

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      startPlayback()
    } else {
      video.addEventListener('loadedmetadata', startPlayback, { once: true })
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [])

  /* ── Hero text entrance after preloader ── */
  useEffect(() => {
    if (!ready || !textsRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-text-el', {
        opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: 'power3.out', delay: 0.05,
      })
      gsap.to(scrollRef.current, {
        opacity: 1, duration: 1, delay: 1.1, ease: 'power2.out',
      })
    }, textsRef.current)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="hero" className="hero-section">

      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        className="hero-video"
        muted
        playsInline
        loop
        preload="metadata"
      />
      <div className="hero-overlay" />

      {/* Date badge — top right */}
      <div
        className="hero-badge"
        style={{ position: 'absolute', top: 'calc(56px + 28px)', right: 'clamp(1.25rem,2.5vw,2.5rem)', textAlign: 'right', zIndex: 10 }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'rgba(245,240,232,.55)', display: 'block', marginBottom: 2 }}>
          {month}
        </span>
        <div
          className="hero-badge-day"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,13vw,10rem)', color: 'var(--text)', lineHeight: .85 }}
        >
          {day}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--volt)', marginTop: 6 }}>
          Ready for Work
        </div>
      </div>

      {/* Main content */}
      <div
        ref={textsRef}
        className="hero-content-wrap"
        style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: 'clamp(0px,0px,0px) clamp(1.25rem,2.5vw,2.5rem) clamp(3rem,5vw,5rem)' }}
      >
        <div style={{ flex: 1 }}>
          <p
            className="hero-text-el"
            style={{ opacity: 0, transform: 'translateY(60px)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(245,240,232,.52)', fontSize: 'clamp(1rem,2.4vw,1.5rem)', marginBottom: 6 }}
          >
            creative
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,11vw,11rem)', lineHeight: .9, display: 'flex', flexDirection: 'column' }}>
            <span className="hero-text-el" style={{ opacity: 0, transform: 'translateY(60px)' }}>DESIGNER</span>
            <span className="hero-text-el" style={{ opacity: 0, transform: 'translateY(60px)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--volt)', fontSize: '.44em', lineHeight: 1.5 }}>&amp;</span>
            <span className="hero-text-el" style={{ opacity: 0, transform: 'translateY(60px)' }}>DEVELOPER</span>
          </h1>
        </div>

        <div
          className="hero-text-el hero-desc-col"
          style={{ opacity: 0, transform: 'translateY(60px)', maxWidth: 300, marginLeft: 'clamp(1rem,4vw,4rem)', paddingBottom: 8 }}
        >
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(245,240,232,.58)', marginBottom: 22 }}>
            {SITE_NAME} builds digital experiences at the intersection of design, code, and culture. Based in Lagos. Available globally.
          </p>
          <a
            href="#contact"
            style={{ display: 'inline-block', padding: '10px 26px', border: '1px solid var(--text)', borderRadius: 100, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.08em', transition: 'all .22s' }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--volt)'; el.style.color = '#080808'; el.style.borderColor = 'var(--volt)' }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--text)'; el.style.borderColor = 'var(--text)' }}
          >
            CONTACT ME →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10, opacity: 0 }}
      >
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom,transparent,rgba(245,240,232,.35))' }} />
        <div style={{ width: 24, height: 38, border: '1px solid rgba(245,240,232,.28)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div className="scroll-dot-inner" style={{ width: 2, height: 8, background: 'var(--volt)', borderRadius: 2 }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.2em', color: 'rgba(245,240,232,.35)', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>
  )
}
