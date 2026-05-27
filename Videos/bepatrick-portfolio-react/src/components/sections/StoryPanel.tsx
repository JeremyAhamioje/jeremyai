import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import type { ProjectPanel } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  panel: ProjectPanel
}

/**
 * StoryPanel — one full-viewport project panel.
 *
 * Cleanup: every tween + ScrollTrigger lives inside one gsap.context() scoped
 * to the section. On unmount we call ctx.revert() once. No manual trigger
 * tracking, no ScrollTrigger.getAll().kill().
 *
 * Videos use preload="none" and are gated behind IntersectionObserver so
 * 14+ panels don't all push frames into the GPU decoder simultaneously
 * (the cause of Chrome's STATUS_STACK_BUFFER_OVERRUN on Windows).
 */
export default function StoryPanel({ panel }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Parallax background
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: 0 },
          {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }

      // Left column reveal
      const leftEls = leftRef.current?.querySelectorAll('.p-reveal')
      if (leftEls?.length) {
        gsap.fromTo(
          leftEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 70%' },
          }
        )
      }

      // Right column reveal
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: panel.flip ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 70%' },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [panel.flip])

  // Lazy-play: only decode/play when the video is on-screen.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.25 }
    )

    io.observe(v)
    return () => io.disconnect()
  }, [])

  const Left = (
    <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <span
        className="p-reveal"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '.14em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        {panel.num} — {panel.super}
      </span>

      <h2
        className="p-reveal"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem,8vw,6rem)',
          lineHeight: 0.92,
          color: 'var(--text)',
          whiteSpace: 'pre-line',
        }}
      >
        {panel.title}
      </h2>

      <p
        className="p-reveal"
        style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          maxWidth: 460,
        }}
      >
        {panel.desc}
      </p>

      <div className="p-reveal" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {panel.tags.map(t => (
          <span
            key={t}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '.1em',
              padding: '4px 12px',
              border: '1px solid var(--border-mid)',
              borderRadius: 100,
              color: 'var(--text-muted)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <a
        className="p-reveal"
        href={panel.href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginTop: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '.08em',
          color: 'var(--text)',
          borderBottom: '1px solid var(--border-mid)',
          paddingBottom: 4,
          width: 'fit-content',
        }}
      >
        View Project <ArrowRight size={14} strokeWidth={1.5} />
      </a>
    </div>
  )

  const Right = (
    <div ref={rightRef}>
      <div
        style={{
          aspectRatio: '16/10',
          overflow: 'hidden',
          borderRadius: 12,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        {panel.video ? (
          <video
            ref={videoRef}
            src={panel.video}
            muted
            loop
            playsInline
            preload="none"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={panel.image}
            alt={panel.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  )

  return (
    <section ref={sectionRef} className="story-panel">
      <div
        ref={bgRef}
        className="panel-bg"
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dz6kxumoo/image/upload/v1778931827/Programmer_Cat_xc7ilj.jpg)',
        }}
      />

      <div className="panel-overlay" />

      <div
        className="panel-content-inner"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          padding: '120px clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        {panel.flip ? (
          <>
            {Right}
            {Left}
          </>
        ) : (
          <>
            {Left}
            {Right}
          </>
        )}
      </div>
    </section>
  )
}